// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/cors.ts";

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/gmail.send",
  "openid",
  "email",
  "profile",
].join(" ");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Unauthorized" }, 401);
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claimsData?.claims) return json({ error: "Unauthorized" }, 401);
    const userId = claimsData.claims.sub as string;

    // Check admin role
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    if (!roles?.some((r: any) => r.role === "admin")) {
      return json({ error: "Forbidden" }, 403);
    }

    const clientId = Deno.env.get("BookingappClientID");
    if (!clientId) return json({ error: "Missing GOOGLE_CLIENT_ID" }, 500);

    const projectId = Deno.env.get("SUPABASE_URL")!.split("//")[1].split(".")[0];
    const redirectUri = `https://${projectId}.supabase.co/functions/v1/google-oauth-callback`;

    // Validate origin against an allow-list so the callback cannot be tricked
    // into redirecting to an attacker-controlled host.
    const ALLOWED_ORIGINS = new Set<string>([
      "https://id-preview--77ebf12f-1901-496b-826b-4c99fb6e3670.lovable.app",
      "https://https-beaconattorneys-rw.lovable.app",
      "https://www.beaconattorneys.rw",
      "https://beaconattorneys.rw",
    ]);
    const reqBody = await req.json().catch(() => ({} as any));
    const requestedOrigin = (reqBody?.origin || req.headers.get("origin") || "").replace(/\/$/, "");
    const origin = ALLOWED_ORIGINS.has(requestedOrigin)
      ? requestedOrigin
      : "https://id-preview--77ebf12f-1901-496b-826b-4c99fb6e3670.lovable.app";

    // Generate a cryptographically random state and persist it server-side
    // so the callback can verify this OAuth flow was actually started by an
    // admin from this app (CSRF protection).
    const stateBytes = new Uint8Array(32);
    crypto.getRandomValues(stateBytes);
    const state = Array.from(stateBytes, (b) => b.toString(16).padStart(2, "0")).join("");

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString();
    const { error: stateErr } = await admin.from("google_oauth_states").insert({
      state,
      user_id: userId,
      origin,
      expires_at: expiresAt,
    });
    if (stateErr) {
      console.error("failed to persist oauth state", stateErr);
      return json({ error: "Could not start OAuth flow" }, 500);
    }
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: SCOPES,
      access_type: "offline",
      prompt: "consent",
      include_granted_scopes: "true",
      state,
    });
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    return json({ authUrl });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
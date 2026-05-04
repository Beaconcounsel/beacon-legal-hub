// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  // Use referer host for redirect; fall back to project preview.
  // We send users back to the Admin page on the originating site.
  const redirectBase = inferAppOrigin(req);

  if (error) return redirect(`${redirectBase}/admin?google=error&msg=${encodeURIComponent(error)}`);
  if (!code) return redirect(`${redirectBase}/admin?google=error&msg=no_code`);

  try {
    const clientId = Deno.env.get("BookingappClientID");
    const clientSecret = Deno.env.get("ClientSecret");
    if (!clientId || !clientSecret) {
      return redirect(`${redirectBase}/admin?google=error&msg=missing_credentials`);
    }

    const projectId = Deno.env.get("SUPABASE_URL")!.split("//")[1].split(".")[0];
    const redirectUri = `https://${projectId}.supabase.co/functions/v1/google-oauth-callback`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("token exchange failed", tokenJson);
      return redirect(`${redirectBase}/admin?google=error&msg=${encodeURIComponent(tokenJson.error || "token_exchange")}`);
    }

    const { access_token, refresh_token, expires_in, scope } = tokenJson;

    // Fetch user info to know which Google email connected
    const uiRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const userInfo = await uiRes.json();
    const googleEmail = userInfo.email as string;

    if (!refresh_token) {
      return redirect(`${redirectBase}/admin?google=error&msg=${encodeURIComponent("no_refresh_token_received_revoke_app_access_and_retry")}`);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const expiresAt = new Date(Date.now() + (expires_in ?? 3600) * 1000).toISOString();

    // Upsert by google_email
    const { data: existing } = await supabase
      .from("google_oauth_tokens")
      .select("id")
      .eq("google_email", googleEmail)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("google_oauth_tokens")
        .update({ refresh_token, access_token, expires_at: expiresAt, scope, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await supabase.from("google_oauth_tokens").insert({
        google_email: googleEmail,
        refresh_token,
        access_token,
        expires_at: expiresAt,
        scope,
      });
    }

    return redirect(`${redirectBase}/admin?google=success`);
  } catch (e) {
    return redirect(`${redirectBase}/admin?google=error&msg=${encodeURIComponent((e as Error).message)}`);
  }
});

function inferAppOrigin(req: Request): string {
  // Try referer
  const ref = req.headers.get("referer");
  if (ref) {
    try { return new URL(ref).origin; } catch { /* ignore */ }
  }
  // Last resort env override
  return Deno.env.get("APP_ORIGIN") || "https://id-preview--77ebf12f-1901-496b-826b-4c99fb6e3670.lovable.app";
}

function redirect(location: string) {
  return new Response(null, { status: 302, headers: { Location: location } });
}
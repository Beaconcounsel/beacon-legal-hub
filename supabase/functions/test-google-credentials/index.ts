// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ ok: false, error: "Unauthorized" }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claimsData?.claims) return json({ ok: false, error: "Unauthorized" }, 401);
    const userId = claimsData.claims.sub as string;

    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    if (!roles?.some((r: any) => r.role === "admin")) {
      return json({ ok: false, error: "Forbidden" }, 403);
    }

    const clientId = Deno.env.get("BookingappClientID");
    const clientSecret = Deno.env.get("ClientSecret");
    const projectId = Deno.env.get("SUPABASE_URL")!.split("//")[1].split(".")[0];
    const redirectUri = `https://${projectId}.supabase.co/functions/v1/google-oauth-callback`;

    const checks = {
      clientIdPresent: !!clientId,
      clientIdLooksValid: !!clientId && /\.apps\.googleusercontent\.com$/.test(clientId),
      clientSecretPresent: !!clientSecret,
      clientSecretLength: clientSecret?.length ?? 0,
      redirectUri,
    };

    if (!clientId || !clientSecret) {
      return json({ ok: false, error: "Missing client id or secret in environment", checks });
    }

    // Test the credentials with Google by hitting the token endpoint with an invalid grant.
    // - "invalid_client" => bad client id/secret
    // - "invalid_grant" => credentials are valid (Google accepted them, just rejected the fake code)
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: "test_invalid_code",
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });
    const body = await res.json().catch(() => ({}));
    const googleError = body?.error as string | undefined;

    let credentialsValid = false;
    let message = "";
    if (googleError === "invalid_grant") {
      credentialsValid = true;
      message = "Client ID and Secret are valid. Google accepted them.";
    } else if (googleError === "invalid_client") {
      message = "Google rejected the Client ID or Secret (invalid_client). Re-check the values.";
    } else if (googleError === "redirect_uri_mismatch") {
      message = `Redirect URI is not registered in Google Cloud Console. Add: ${redirectUri}`;
    } else {
      message = `Unexpected response from Google: ${googleError ?? "unknown"} - ${body?.error_description ?? ""}`;
    }

    return json({
      ok: credentialsValid,
      message,
      googleError,
      googleErrorDescription: body?.error_description,
      checks,
    });
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
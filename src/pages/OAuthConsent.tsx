import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Minimal typed shape for the beta `supabase.auth.oauth` namespace so
// TypeScript is happy without groveling through node_modules.
type OAuthClient = { name?: string; client_name?: string };
type AuthorizationDetails = {
  client?: OAuthClient;
  redirect_uri?: string;
  redirect_url?: string;
  redirect_to?: string;
  scope?: string;
  scopes?: string[];
};
type OAuthApi = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: { message: string } | null }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: { redirect_url?: string; redirect_to?: string } | null; error: { message: string } | null }>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        // Preserve the FULL consent URL so auth returns the user here.
        const next = window.location.pathname + window.location.search;
        window.location.href = "/auth?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <Layout hideBooking>
        <div className="container max-w-md py-16">
          <h1 className="text-2xl font-serif text-navy mb-2">Could not load this request</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </Layout>
    );
  }

  if (!details) {
    return (
      <Layout hideBooking>
        <div className="container py-16 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const clientName = details.client?.name ?? details.client?.client_name ?? "an app";

  return (
    <Layout hideBooking>
      <section className="pt-10 md:pt-12 pb-10">
        <div className="container max-w-md">
          <h1 className="text-2xl md:text-3xl font-serif text-navy mb-2">
            Connect {clientName} to Beacon Attorneyes
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            {clientName} will be able to call this site's booking tools while you are signed in.
            This does not bypass this app's permissions or backend policies.
          </p>
          <div className="bg-card border border-border rounded-xl p-5 space-y-2 text-sm mb-6">
            <div><strong className="text-navy">Share your basic profile</strong></div>
            <div><strong className="text-navy">Share your email address</strong></div>
            <div className="text-muted-foreground text-xs pt-1">
              Redirect URI: <code className="break-all">{details.redirect_uri ?? "—"}</code>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="gold" className="flex-1" disabled={busy} onClick={() => decide(true)}>
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Approve"}
            </Button>
            <Button variant="outline" className="flex-1" disabled={busy} onClick={() => decide(false)}>
              Cancel connection
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OAuthConsent;
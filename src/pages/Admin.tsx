import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, XCircle, Calendar, LogOut, ShieldCheck, Copy } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatAppointmentDisplay } from "@/lib/booking-slots";

type BookingRow = {
  id: string;
  slot_start: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  organization: string | null;
  matter_type: string | null;
  status: string;
  message: string | null;
};

const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tokenStatus, setTokenStatus] = useState<{ connected: boolean; email?: string } | null>(null);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [credCheck, setCredCheck] = useState<{
    ok: boolean;
    message?: string;
    googleError?: string;
    googleErrorDescription?: string;
    checks?: {
      clientIdPresent: boolean;
      clientIdLooksValid: boolean;
      clientSecretPresent: boolean;
      clientSecretLength: number;
      redirectUri: string;
    };
  } | null>(null);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth", { replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth", { replace: true });
        return;
      }
      setUser(data.session.user);
    });
    return () => {
      sub.data.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      const adminFlag = (roleData ?? []).some((r) => r.role === "admin");
      setIsAdmin(adminFlag);

      if (!adminFlag) {
        setLoading(false);
        return;
      }

      const { data: tokens } = await supabase
        .from("google_oauth_tokens")
        .select("google_email")
        .limit(1);
      if (tokens && tokens.length > 0) {
        setTokenStatus({ connected: true, email: tokens[0].google_email });
      } else {
        setTokenStatus({ connected: false });
      }

      const { data: rows } = await supabase
        .from("bookings")
        .select("id, slot_start, client_name, client_email, client_phone, organization, matter_type, status, message")
        .order("slot_start", { ascending: false })
        .limit(50);
      setBookings((rows as BookingRow[]) ?? []);
      setLoading(false);
    };
    load();
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("google");
    if (result === "success") {
      toast.success("Google Calendar connected!");
      window.history.replaceState({}, "", window.location.pathname);
    } else if (result === "error") {
      toast.error(`Google connection failed: ${params.get("msg") || "unknown error"}`);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleConnectGoogle = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("google-oauth-start", {
        body: { origin: window.location.origin },
      });
      if (error || !(data as { authUrl?: string })?.authUrl) {
        toast.error("Could not start Google sign-in. Make sure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are configured.");
        return;
      }
      window.location.href = (data as { authUrl: string }).authUrl;
    } catch {
      toast.error("Could not start Google sign-in.");
    }
  };

  const handleTestCredentials = async () => {
    setTesting(true);
    setCredCheck(null);
    try {
      const { data, error } = await supabase.functions.invoke("test-google-credentials");
      if (error) {
        toast.error("Test failed. See details below.");
        setCredCheck({ ok: false, message: error.message });
      } else {
        const result = data as NonNullable<typeof credCheck>;
        setCredCheck(result);
        if (result.ok) toast.success("Google credentials are valid.");
        else toast.error(result.message || "Credentials check failed.");
      }
    } catch (e) {
      toast.error("Could not run credential test.");
      setCredCheck({ ok: false, message: (e as Error).message });
    } finally {
      setTesting(false);
    }
  };

  const copyRedirectUri = () => {
    const uri = credCheck?.checks?.redirectUri;
    if (!uri) return;
    navigator.clipboard.writeText(uri);
    toast.success("Redirect URI copied");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-16 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (isAdmin === false) {
    return (
      <Layout>
        <div className="container py-16 max-w-xl">
          <h1 className="text-2xl font-serif text-navy mb-2">Not authorized</h1>
          <p className="text-sm text-muted-foreground mb-3">
            Your account does not have admin access. Sign in with the admin email
            (mutidan@gmail.com).
          </p>
          <Button onClick={handleSignOut} variant="outline">Sign out</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead titleKey="seo.bookingTitle" descKey="seo.bookingDesc" />
      <section className="pt-10 md:pt-12 pb-10 md:pb-12">
        <div className="container">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-navy">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h2 className="text-xl font-serif text-navy mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Google OAuth Credentials
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Your Client ID and Client Secret are stored securely as backend secrets
              (<code className="text-xs">BookingappClientID</code> and{" "}
              <code className="text-xs">ClientSecret</code>). Run a test to confirm
              Google accepts them before connecting.
            </p>
            <Button onClick={handleTestCredentials} variant="outline" size="sm" disabled={testing}>
              {testing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
              Test credentials
            </Button>

            {credCheck && (
              <div className="mt-4 border border-border rounded-lg p-4 text-sm space-y-2 bg-muted/30">
                <div className={`flex items-center gap-2 font-medium ${credCheck.ok ? "text-primary" : "text-destructive"}`}>
                  {credCheck.ok ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {credCheck.message || (credCheck.ok ? "Valid" : "Failed")}
                </div>
                {credCheck.checks && (
                  <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                    <li>Client ID present: {credCheck.checks.clientIdPresent ? "yes" : "no"}</li>
                    <li>Client ID format looks valid: {credCheck.checks.clientIdLooksValid ? "yes" : "no (should end in .apps.googleusercontent.com)"}</li>
                    <li>Client Secret present: {credCheck.checks.clientSecretPresent ? `yes (${credCheck.checks.clientSecretLength} chars)` : "no"}</li>
                    <li className="flex items-start gap-2 flex-wrap">
                      <span>Redirect URI to register in Google Cloud Console:</span>
                      <code className="text-[11px] bg-background px-2 py-1 rounded break-all">{credCheck.checks.redirectUri}</code>
                      <button onClick={copyRedirectUri} className="inline-flex items-center gap-1 text-primary hover:underline">
                        <Copy className="w-3 h-3" /> copy
                      </button>
                    </li>
                  </ul>
                )}
                {credCheck.googleErrorDescription && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Google said: <em>{credCheck.googleErrorDescription}</em>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <h2 className="text-xl font-serif text-navy mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Google Calendar Integration
            </h2>
            {tokenStatus?.connected ? (
              <div>
                <div className="flex items-center gap-2 text-sm text-primary mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Connected as <strong>{tokenStatus.email}</strong>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Bookings will block time on this Google Calendar and a confirmation
                  email will be sent from this Gmail account.
                </p>
                <Button onClick={handleConnectGoogle} variant="outline" size="sm">
                  Reconnect Google Account
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-sm text-justice mb-3">
                  <XCircle className="w-4 h-4" /> Not connected
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Connect your Google account (mutidan@gmail.com) to enable calendar sync
                  and send booking emails from your Gmail.
                </p>
                <Button onClick={handleConnectGoogle} variant="gold">
                  Connect Google Calendar
                </Button>
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-serif text-navy mb-3">Recent Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No bookings yet.</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="border border-border rounded-lg p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-2"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-navy">
                        {formatAppointmentDisplay(b.slot_start)}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <strong>{b.client_name}</strong> — {b.client_email}
                        {b.client_phone ? ` · ${b.client_phone}` : ""}
                      </div>
                      {b.organization && (
                        <div className="text-xs text-muted-foreground">{b.organization}</div>
                      )}
                      {b.matter_type && (
                        <div className="text-xs text-muted-foreground italic mt-1">{b.matter_type}</div>
                      )}
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider px-2 py-1 rounded-full ${
                        b.status === "confirmed"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminPage;
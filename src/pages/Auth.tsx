import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const getAuthErrorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error ?? "");
  const normalized = message.toLowerCase();

  if (
    normalized.includes("invalid login credentials") ||
    normalized.includes("invalid_credentials") ||
    normalized.includes("email not confirmed")
  ) {
    return "Email or password is incorrect.";
  }

  if (normalized.includes("failed to fetch") || normalized.includes("fetch")) {
    return "The preview sandbox blocked the sign-in request. Please retry, or test the same login on the published app.";
  }

  return "Sign-in failed. Please try again.";
};

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawNext = searchParams.get("next");
  // Only same-origin relative paths are safe as post-auth targets.
  const nextPath = rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : null;
  const postAuthTarget = nextPath ?? "/admin";
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        if (nextPath) window.location.href = nextPath;
        else navigate("/admin", { replace: true });
      }
    });
  }, [navigate, nextPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const cleanEmail = email.trim();
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}${postAuthTarget}` },
        });
        if (error) {
          toast.error(getAuthErrorMessage(error));
          return;
        }
        toast.success("Account created. Please sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (error) {
          toast.error(getAuthErrorMessage(error));
          return;
        }
        if (nextPath) window.location.href = nextPath;
        else navigate("/admin", { replace: true });
      }
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead titleKey="seo.bookingTitle" descKey="seo.bookingDesc" />
      <section className="pt-10 md:pt-12 pb-10">
        <div className="container max-w-md">
          <h1 className="text-2xl md:text-3xl font-serif text-navy mb-1">Admin Sign In</h1>
          <p className="text-sm text-muted-foreground mb-5">
            Daniel signs in here to manage Google Calendar integration and view bookings.
          </p>
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 space-y-3"
          >
            <div>
              <Label className="text-sm font-medium mb-2 block">Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={submitting}>
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-xs text-primary hover:underline w-full text-center"
            >
              {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default AuthPage;
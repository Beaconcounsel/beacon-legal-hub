import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"valid" | "already" | "invalid" | "error" | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      setLoading(false);
      return;
    }

    const validate = async () => {
      try {
        const response = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          {
            headers: { apikey: supabaseAnonKey },
          },
        );
        const data = await response.json().catch(() => ({}));
        if (response.ok && data.valid) {
          setStatus("valid");
        } else if (data.reason === "already_unsubscribed") {
          setStatus("already");
        } else {
          setStatus("invalid");
        }
      } catch (e) {
        console.error("Unsubscribe validation error", e);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };

    validate();
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) {
        console.error("Unsubscribe error", error);
        setStatus("error");
        return;
      }
      if (data?.success) {
        setDone(true);
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch (e) {
      console.error("Unsubscribe error", e);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-navy">Unsubscribe</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Manage your email preferences from Beacon Attorneyes & Consultants.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="text-center">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Checking your link…</span>
            </div>
          ) : done ? (
            <div className="space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <p className="text-foreground">
                You have been unsubscribed successfully. You will no longer receive app emails from us.
              </p>
            </div>
          ) : status === "already" ? (
            <div className="space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <p className="text-foreground">This email address is already unsubscribed.</p>
            </div>
          ) : status === "valid" ? (
            <div className="space-y-6 py-2">
              <p className="text-foreground">
                Please confirm that you want to unsubscribe from app emails sent by Beacon Attorneyes & Consultants.
              </p>
              <Button
                variant="gold"
                className="w-full"
                onClick={handleConfirm}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing…
                  </>
                ) : (
                  "Confirm unsubscribe"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
              <p className="text-foreground">
                {status === "invalid"
                  ? "This unsubscribe link is invalid or has expired."
                  : "We could not process your request. Please try again later or contact us."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatAppointmentDisplay } from "@/lib/booking-slots";

const schema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  reason: z.string().trim().max(1000).optional().or(z.literal("")),
});

type LookupResult = {
  ok: boolean;
  error?: string;
  booking?: {
    slotStartUtc: string;
    clientName: string;
    clientEmail: string;
    within24h: boolean;
  };
};

const CancelBookingPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [lookup, setLookup] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", reason: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  useEffect(() => {
    if (!token) {
      setLookup({ ok: false, error: "Missing cancellation token." });
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("lookup-booking", {
          body: { token },
        });
        if (error) {
          setLookup({ ok: false, error: "Could not look up booking." });
        } else {
          setLookup(data as LookupResult);
          if ((data as LookupResult)?.booking) {
            setForm((p) => ({
              ...p,
              fullName: (data as LookupResult).booking!.clientName,
              email: (data as LookupResult).booking!.clientEmail,
            }));
          }
        }
      } catch {
        setLookup({ ok: false, error: "Could not look up booking." });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const within24h = useMemo(() => lookup?.booking?.within24h ?? false, [lookup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof typeof form, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof typeof form;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("cancel-booking", {
        body: {
          token,
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          reason: parsed.data.reason || null,
        },
      });
      if (error) {
        toast.error("Cancellation failed. Please try again.");
        return;
      }
      const result = data as { ok?: boolean; error?: string };
      if (!result?.ok) {
        toast.error(result?.error || "Cancellation failed.");
        return;
      }
      toast.success("Cancellation submitted.");
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead titleKey="seo.bookingTitle" descKey="seo.bookingDesc" />
      <section className="pt-10 md:pt-12 pb-10 md:pb-12">
        <div className="container max-w-2xl">
          <span className="label-uppercase">Cancel Booking</span>
          <h1 className="text-3xl md:text-4xl font-serif text-navy mt-2 mb-5">
            Cancellation Request
          </h1>

          {loading ? (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Looking up your booking…
            </div>
          ) : !lookup?.ok ? (
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground">
                {lookup?.error || "This cancellation link is no longer valid."}
              </p>
            </div>
          ) : done ? (
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-serif text-navy mb-2">Cancellation submitted</h2>
              <p className="text-sm text-muted-foreground">
                A confirmation has been emailed to you. Daniel has also been notified.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-5"
              noValidate
            >
              <div>
                <p className="text-sm text-muted-foreground mb-1">Appointment</p>
                <p className="text-base font-medium text-navy">
                  {formatAppointmentDisplay(lookup.booking!.slotStartUtc)}
                </p>
              </div>

              {within24h && (
                <div className="flex gap-2 p-4 bg-justice/5 border border-justice/30 rounded-md">
                  <AlertTriangle className="w-5 h-5 text-justice flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-justice mb-1">Late cancellation notice</p>
                    <p className="text-muted-foreground">
                      This appointment is less than 24 hours away. Per our cancellation policy,
                      the <strong>full consultation fee</strong> will apply.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium mb-2 block">Full Name *</Label>
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  maxLength={100}
                />
                {errors.fullName && <p className="text-xs text-justice mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Email *</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  maxLength={255}
                />
                {errors.email && <p className="text-xs text-justice mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Reason for Cancellation</Label>
                <Textarea
                  value={form.reason}
                  onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
                  rows={4}
                  maxLength={1000}
                  placeholder="Optional"
                />
              </div>

              <Button type="submit" variant="gold" size="lg" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…
                  </>
                ) : (
                  "Submit Cancellation"
                )}
              </Button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CancelBookingPage;
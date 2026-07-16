import { useState } from "react";
import { z } from "zod";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
});

type FormState = { name: string; email: string; phone: string; message: string };

const initial: FormState = { name: "", email: "", phone: "", message: "" };

interface Props {
  sourcePage: string;
  compact?: boolean;
  onDone?: () => void;
}

const LeadForm = ({ sourcePage, compact = false, onDone }: Props) => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormState;
        if (k && !fe[k]) fe[k] = i.message;
      });
      setErrors(fe);
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-lead-email", {
        body: {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone || "",
          message: parsed.data.message,
          source_page: sourcePage,
        },
      });

      if (error) {
        // Try to read the underlying response body for the real message.
        const ctx = (error as { context?: Response }).context;
        let msg = (error as { message?: string }).message || "Something went wrong.";
        if (ctx && typeof ctx.text === "function") {
          try {
            const body = await ctx.text();
            if (body) msg = body;
          } catch {
            /* ignore */
          }
        }
        console.error("send-lead-email error", msg);
        setServerError("We couldn't send your message. Please try again in a moment, or email info@beaconattorneys.rw directly.");
        return;
      }

      const result = data as { ok?: boolean; error?: string } | null;
      if (!result?.ok) {
        setServerError(result?.error || "We couldn't send your message. Please try again.");
        return;
      }

      setSuccess(true);
      setForm(initial);
      onDone?.();
    } catch (err) {
      console.error(err);
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Message received</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Thank you. A member of our team will get back to you shortly — typically within one business day. A confirmation is on its way to your inbox.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSuccess(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={compact
        ? "space-y-4"
        : "bg-card border border-border rounded-xl p-6 md:p-8 space-y-5"}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lf-name" className="text-sm font-medium mb-2 block">Full name *</Label>
          <Input
            id="lf-name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={100}
            autoComplete="name"
            disabled={submitting}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="lf-email" className="text-sm font-medium mb-2 block">Email *</Label>
          <Input
            id="lf-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={255}
            autoComplete="email"
            disabled={submitting}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="lf-phone" className="text-sm font-medium mb-2 block">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
        <Input
          id="lf-phone"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          maxLength={30}
          autoComplete="tel"
          disabled={submitting}
        />
      </div>

      <div>
        <Label htmlFor="lf-message" className="text-sm font-medium mb-2 block">How can we help you? *</Label>
        <Textarea
          id="lf-message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="Briefly describe your matter or question."
          disabled={submitting}
        />
        <div className="flex justify-between mt-1">
          {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : <span />}
          <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
        </div>
      </div>

      {serverError && (
        <div className="flex items-start gap-2 p-3 border border-destructive/40 bg-destructive/5 rounded-lg text-sm text-destructive">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <Button type="submit" variant="gold" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
};

export default LeadForm;
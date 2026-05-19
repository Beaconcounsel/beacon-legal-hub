import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Check, Mail, MessageCircle, Pencil, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BookingCalendar from "@/components/booking/BookingCalendar";
import { formatAppointmentDisplay, type Slot } from "@/lib/booking-slots";
import { cn } from "@/lib/utils";

const MATTER_TYPES = [
  "Corporate & Commercial",
  "Mergers & Acquisitions",
  "Cross-Border Transactions & Market Entry",
  "Regulatory Compliance",
  "Corporate Governance",
  "Investment Advisory",
  "Dispute Resolution & Arbitration",
  "Other",
] as const;

const CHANNELS = ["Email", "WhatsApp"] as const;
type Channel = (typeof CHANNELS)[number];

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  matterType: z.enum(MATTER_TYPES, { errorMap: () => ({ message: "Select matter type" }) }),
  message: z.string().trim().min(10, "Please provide at least 10 characters").max(2000),
});

type InquiryForm = z.infer<typeof inquirySchema>;

const initialForm = {
  name: "",
  email: "",
  matterType: "" as InquiryForm["matterType"] | "",
  message: "",
};

const StepCard = ({
  index,
  title,
  state,
  summary,
  onEdit,
  children,
  stepLabel,
  editLabel,
}: {
  index: number;
  title: string;
  state: "active" | "done" | "locked";
  summary?: string;
  onEdit?: () => void;
  children?: React.ReactNode;
  stepLabel: string;
  editLabel: string;
}) => {
  const collapsed = state === "done";
  return (
    <div
      className={cn(
        "bg-background border rounded-xl transition-all",
        state === "active" && "border-primary/40 shadow-sm",
        state === "done" && "border-border",
        state === "locked" && "border-border opacity-60"
      )}
    >
      <div className="flex items-center justify-between gap-3 p-5 md:p-6">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border flex-shrink-0",
              state === "done"
                ? "bg-primary text-primary-foreground border-primary"
                : state === "active"
                ? "bg-primary/10 text-primary border-primary"
                : "bg-muted text-muted-foreground border-border"
            )}
          >
            {state === "done" ? <Check className="w-4 h-4" /> : index}
          </div>
          <div className="min-w-0">
            <p className={cn("text-sm font-semibold", state === "locked" ? "text-muted-foreground" : "text-foreground")}>
              {stepLabel} {index} — {title}
            </p>
            {collapsed && summary && (
              <p className="text-xs text-muted-foreground truncate">{summary}</p>
            )}
          </div>
        </div>
        {collapsed && onEdit && (
          <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="w-3.5 h-3.5 mr-1" /> {editLabel}
          </Button>
        )}
      </div>
      {!collapsed && state !== "locked" && <div className="px-5 md:px-6 pb-6">{children}</div>}
    </div>
  );
};

const BookConsultation = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryForm, string>>>({});
  const [channels, setChannels] = useState<Channel[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [calKey, setCalKey] = useState(0);

  // Auto-open on hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = () => {
      if (window.location.hash === "#book-consultation") {
        const el = document.getElementById("book-consultation");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    handler();
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const update = <K extends keyof typeof initialForm>(key: K, value: (typeof initialForm)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof InquiryForm]) {
      setErrors((prev) => ({ ...prev, [key as keyof InquiryForm]: undefined }));
    }
  };

  const submitStep1 = () => {
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InquiryForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof InquiryForm;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error(t("bookConsult.toastFields"));
      return;
    }
    setErrors({});
    setStep1Done(true);
    setCurrentStep(2);
  };

  const submitStep2 = () => {
    if (channels.length === 0) {
      toast.error(t("bookConsult.toastChannel"));
      return;
    }
    setStep2Done(true);
    setCurrentStep(3);
  };

  const toggleChannel = (c: Channel) => {
    setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const handleConfirmBooking = async () => {
    if (!slot) return;
    if (!acceptedTerms) {
      setTermsError(t("bookConsult.termsError"));
      return;
    }
    setTermsError(null);
    setSubmitting(true);
    try {
      const data = inquirySchema.parse(form);
      const { data: res, error } = await supabase.functions.invoke("create-booking", {
        body: {
          slotStartUtc: slot.startUtc,
          slotEndUtc: slot.endUtc,
          client: {
            name: data.name,
            email: data.email,
            matterType: data.matterType,
            message: `Preferred channels: ${channels.join(", ")}\n\n${data.message}`,
          },
        },
      });
      if (error) {
        toast.error((error as { message?: string }).message || t("bookConsult.toastFail"));
        return;
      }
      const result = res as { ok?: boolean; error?: string };
      if (!result?.ok) {
        toast.error(result?.error || t("bookConsult.toastFail"));
        return;
      }
      toast.success(t("bookConsult.toastSuccess"));
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      toast.error(t("bookConsult.toastError"));
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setChannels([]);
    setAcceptedTerms(false);
    setSlot(null);
    setConfirmed(false);
    setErrors({});
    setStep1Done(false);
    setStep2Done(false);
    setCurrentStep(1);
    setOpened(false);
    setCalKey((k) => k + 1);
  };

  const step1State = currentStep === 1 ? "active" : step1Done ? "done" : "locked";
  const step2State = currentStep === 2 ? "active" : step2Done ? "done" : "locked";
  const step3State = currentStep === 3 && step1Done && step2Done ? "active" : "locked";

  return (
    <section
      id="book-consultation"
      className="section-padding bg-card scroll-mt-24"
    >
      <div className="container">

        {confirmed ? (
          <div className="max-w-2xl mx-auto bg-background border border-border rounded-xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <p className="text-foreground mb-2 font-semibold">{t("bookConsult.bookedTitle")}</p>
            <p className="text-muted-foreground mb-6">
              {t("bookConsult.bookedDesc", { email: form.email, channels: channels.join(" / ") })}
            </p>
            <Button variant="outline" onClick={reset}>{t("bookConsult.bookAnother")}</Button>
          </div>
        ) : !opened ? (
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-4">{t("bookConsult.respondWithin24h")}</p>
            <Button
              variant="gold"
              size="lg"
              onClick={() => setOpened(true)}
              className="px-10 py-6 text-base shadow-[0_8px_40px_-6px_hsl(var(--primary)/0.55)] hover:shadow-[0_12px_50px_-6px_hsl(var(--primary)/0.75)] hover:-translate-y-1 transition-all duration-300 ring-1 ring-primary/40"
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              {t("bookConsult.ctaButton")}
            </Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={reset}>
                {t("bookConsult.close")}
              </Button>
            </div>
            {/* STEP 1 */}
            <StepCard
              index={1}
              title={t("bookConsult.legalInquiry")}
              state={step1State}
              summary={step1Done ? `${form.name} • ${form.matterType}` : undefined}
              onEdit={() => { setStep1Done(false); setStep2Done(false); setCurrentStep(1); }}
              stepLabel={t("bookConsult.step")}
              editLabel={t("bookConsult.edit")}
            >
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t("bookConsult.fullName")} *</Label>
                    <Input value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t("bookConsult.email")} *</Label>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t("bookConsult.areaOfLaw")} *</Label>
                  <Select value={form.matterType} onValueChange={(v) => update("matterType", v as InquiryForm["matterType"])}>
                    <SelectTrigger><SelectValue placeholder={t("bookConsult.selectArea")} /></SelectTrigger>
                    <SelectContent>
                      {MATTER_TYPES.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  {errors.matterType && <p className="text-xs text-destructive mt-1">{errors.matterType}</p>}
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">{t("bookConsult.describeLabel")} *</Label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                    maxLength={2000}
                    placeholder={t("bookConsult.describePlaceholder")}
                  />
                  <div className="flex justify-between mt-1">
                    {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : <span />}
                    <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
                  </div>
                </div>
                <Button type="button" variant="gold" onClick={submitStep1}>{t("bookConsult.continue")}</Button>
              </div>
            </StepCard>

            {/* STEP 2 */}
            <StepCard
              index={2}
              title={t("bookConsult.preferredChannel")}
              state={step2State}
              summary={step2Done ? channels.join(", ") : undefined}
              onEdit={() => { setStep2Done(false); setCurrentStep(2); }}
              stepLabel={t("bookConsult.step")}
              editLabel={t("bookConsult.edit")}
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{t("bookConsult.channelHint")}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {([
                    { key: "Email", icon: Mail, label: "Email" },
                    { key: "WhatsApp", icon: MessageCircle, label: "WhatsApp" },
                  ] as const).map(({ key, icon: Icon, label }) => {
                    const selected = channels.includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleChannel(key)}
                        aria-pressed={selected}
                        className={cn(
                          "flex items-center gap-3 text-left rounded-lg border p-4 transition-all",
                          selected ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                        )}
                      >
                        <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-foreground flex-1">{label}</p>
                        <div
                          className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center",
                            selected ? "bg-primary border-primary" : "border-border"
                          )}
                        >
                          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <Button type="button" variant="gold" onClick={submitStep2} disabled={channels.length === 0}>
                  {t("bookConsult.continue")}
                </Button>
              </div>
            </StepCard>

            {/* STEP 3 */}
            <StepCard
              index={3}
              title={t("bookConsult.pickSlot")}
              state={step3State}
              stepLabel={t("bookConsult.step")}
              editLabel={t("bookConsult.edit")}
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{t("bookConsult.slotHint")}</p>
                {slot ? (
                  <>
                    <div className="bg-card border border-primary/40 rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("bookConsult.selectedSlot")}</p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatAppointmentDisplay(slot.startUtc)}
                        </p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => setSlot(null)}>
                        {t("bookConsult.changeSlot")}
                      </Button>
                    </div>

                    <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                      <p className="text-sm font-semibold text-foreground">{t("bookConsult.cancellationPolicy")}</p>
                      <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                        <li>{t("bookConsult.policyLine1Pre")} <strong>{t("bookConsult.policyLine1Bold")}</strong> {t("bookConsult.policyLine1Post")}</li>
                        <li>{t("bookConsult.policyLine2Pre")} <strong>{t("bookConsult.policyLine2Bold")}</strong> {t("bookConsult.policyLine2Post")}</li>
                        <li>{t("bookConsult.policyLine3Pre")} <strong>{t("bookConsult.policyLine3Bold")}</strong> {t("bookConsult.policyLine3Post")}</li>
                      </ul>
                      <div className="flex items-start gap-3 pt-1">
                        <Checkbox
                          id="bc-accept"
                          checked={acceptedTerms}
                          onCheckedChange={(c) => {
                            setAcceptedTerms(c === true);
                            if (c === true) setTermsError(null);
                          }}
                        />
                        <Label htmlFor="bc-accept" className="text-sm leading-snug cursor-pointer">
                          {t("bookConsult.acceptTerms")}
                        </Label>
                      </div>
                      {termsError && <p className="text-xs text-destructive">{termsError}</p>}
                    </div>

                    <Button
                      type="button"
                      variant="gold"
                      size="lg"
                      onClick={handleConfirmBooking}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t("bookConsult.confirming")}</>
                      ) : (
                        t("bookConsult.confirmBooking")
                      )}
                    </Button>
                  </>
                ) : (
                  <BookingCalendar key={calKey} onSelect={setSlot} />
                )}
              </div>
            </StepCard>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookConsultation;

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
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
import { Loader2, Check, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import BookingCalendar from "@/components/booking/BookingCalendar";
import { formatAppointmentDisplay, type Slot } from "@/lib/booking-slots";
import { cn } from "@/lib/utils";

const ENTITY_TYPES = [
  "Individual",
  "Sole Proprietorship",
  "SME / Local Business",
  "Corporation",
  "Multinational",
  "Investor / Private Equity",
  "NGO / Non-Profit",
  "Government / Public Sector",
] as const;

const JURISDICTIONS = [
  "Rwanda",
  "East Africa (EAC)",
  "Pan-African",
  "International / Cross-Border",
  "Other",
] as const;

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
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  entityType: z.enum(ENTITY_TYPES, { errorMap: () => ({ message: "Select entity type" }) }),
  jurisdiction: z.enum(JURISDICTIONS, { errorMap: () => ({ message: "Select jurisdiction" }) }),
  matterType: z.enum(MATTER_TYPES, { errorMap: () => ({ message: "Select matter type" }) }),
  message: z.string().trim().min(10, "Please provide at least 10 characters").max(2000),
});

type InquiryForm = z.infer<typeof inquirySchema>;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  entityType: "" as InquiryForm["entityType"] | "",
  jurisdiction: "" as InquiryForm["jurisdiction"] | "",
  matterType: "" as InquiryForm["matterType"] | "",
  message: "",
};

const StepHeader = ({
  index,
  title,
  active,
  done,
  locked,
}: {
  index: number;
  title: string;
  active: boolean;
  done: boolean;
  locked: boolean;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border",
        done
          ? "bg-primary text-primary-foreground border-primary"
          : active
          ? "bg-primary/10 text-primary border-primary"
          : "bg-muted text-muted-foreground border-border"
      )}
    >
      {done ? <Check className="w-4 h-4" /> : index}
    </div>
    <div>
      <p
        className={cn(
          "text-sm font-semibold",
          locked ? "text-muted-foreground" : "text-foreground"
        )}
      >
        Step {index} — {title}
      </p>
    </div>
  </div>
);

const BookConsultation = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryForm, string>>>({});
  const [channels, setChannels] = useState<Channel[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [calKey, setCalKey] = useState(0);

  // Smooth scroll to section when hash matches
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

  const step1Valid = useMemo(() => inquirySchema.safeParse(form).success, [form]);
  const step2Valid = channels.length > 0;
  const slotsUnlocked = step1Valid && step2Valid;

  const validateStep1 = () => {
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InquiryForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof InquiryForm;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please complete the required fields.");
      return false;
    }
    setErrors({});
    return true;
  };

  const toggleChannel = (c: Channel) => {
    setChannels((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const handleConfirmBooking = async () => {
    if (!slot) return;
    if (!validateStep1()) return;
    if (!step2Valid) {
      toast.error("Select at least one preferred channel.");
      return;
    }
    if (!acceptedTerms) {
      setTermsError("You must accept the Terms & Conditions");
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
            phone: data.phone || null,
            organization: data.organization || null,
            entityType: data.entityType,
            jurisdiction: data.jurisdiction,
            matterType: data.matterType,
            message: `Preferred channels: ${channels.join(", ")}\n\n${data.message}`,
          },
        },
      });
      if (error) {
        toast.error((error as { message?: string }).message || "Booking failed");
        return;
      }
      const result = res as { ok?: boolean; error?: string };
      if (!result?.ok) {
        toast.error(result?.error || "Booking failed");
        return;
      }
      toast.success("Booking confirmed! Check your email for details.");
      setConfirmed(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
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
    setCalKey((k) => k + 1);
  };

  return (
    <section
      id="book-consultation"
      className="section-padding bg-card scroll-mt-24"
      aria-labelledby="book-consultation-title"
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2
            id="book-consultation-title"
            className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-3"
          >
            Book a Consultation
          </h2>
          <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-5" />
          <p className="text-muted-foreground leading-relaxed">
            Complete the three steps below to share your matter, choose how we should reach you,
            and pick a confidential consultation time.
          </p>
        </div>

        {confirmed ? (
          <div className="max-w-2xl mx-auto bg-background border border-border rounded-xl p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-serif text-foreground mb-2">Consultation booked</h3>
            <p className="text-muted-foreground mb-6">
              We've sent a confirmation to {form.email}. We'll reach out via{" "}
              {channels.join(" / ")} ahead of your session.
            </p>
            <Button variant="outline" onClick={reset}>Book another</Button>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* STEP 1 */}
            <div className="bg-background border border-border rounded-xl p-6 md:p-8">
              <StepHeader index={1} title="Legal Inquiry" active done={step1Valid} locked={false} />
              <div className="mt-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Full Name *</Label>
                    <Input value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} />
                    {errors.name && <p className="text-xs text-justice mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Email *</Label>
                    <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} />
                    {errors.email && <p className="text-xs text-justice mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Phone</Label>
                    <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={30} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Organization</Label>
                    <Input value={form.organization} onChange={(e) => update("organization", e.target.value)} maxLength={150} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Entity Type *</Label>
                    <Select value={form.entityType} onValueChange={(v) => update("entityType", v as InquiryForm["entityType"])}>
                      <SelectTrigger><SelectValue placeholder="Select entity type" /></SelectTrigger>
                      <SelectContent>
                        {ENTITY_TYPES.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    {errors.entityType && <p className="text-xs text-justice mt-1">{errors.entityType}</p>}
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Jurisdiction *</Label>
                    <Select value={form.jurisdiction} onValueChange={(v) => update("jurisdiction", v as InquiryForm["jurisdiction"])}>
                      <SelectTrigger><SelectValue placeholder="Select jurisdiction" /></SelectTrigger>
                      <SelectContent>
                        {JURISDICTIONS.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    {errors.jurisdiction && <p className="text-xs text-justice mt-1">{errors.jurisdiction}</p>}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Matter Type *</Label>
                  <Select value={form.matterType} onValueChange={(v) => update("matterType", v as InquiryForm["matterType"])}>
                    <SelectTrigger><SelectValue placeholder="Select matter type" /></SelectTrigger>
                    <SelectContent>
                      {MATTER_TYPES.map((opt) => (<SelectItem key={opt} value={opt}>{opt}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  {errors.matterType && <p className="text-xs text-justice mt-1">{errors.matterType}</p>}
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Describe your matter *</Label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                    maxLength={2000}
                    placeholder="Briefly describe your matter, timeline, and any specific questions."
                  />
                  <div className="flex justify-between mt-1">
                    {errors.message ? <p className="text-xs text-justice">{errors.message}</p> : <span />}
                    <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div
              className={cn(
                "bg-background border border-border rounded-xl p-6 md:p-8 transition-opacity",
                !step1Valid && "opacity-60"
              )}
            >
              <StepHeader
                index={2}
                title="Preferred Channel"
                active={step1Valid}
                done={step1Valid && step2Valid}
                locked={!step1Valid}
              />
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                Choose one or both — we'll only reach out through the channels you select.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {([
                  { key: "Email", icon: Mail, label: "Email", hint: "info@beaconattorneys.rw" },
                  { key: "WhatsApp", icon: MessageCircle, label: "WhatsApp", hint: "+250 788 55 96 03" },
                ] as const).map(({ key, icon: Icon, label, hint }) => {
                  const selected = channels.includes(key);
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={!step1Valid}
                      onClick={() => toggleChannel(key)}
                      aria-pressed={selected}
                      className={cn(
                        "flex items-start gap-3 text-left rounded-lg border p-4 transition-all",
                        selected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/40",
                        !step1Valid && "cursor-not-allowed"
                      )}
                    >
                      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{hint}</p>
                      </div>
                      <div
                        className={cn(
                          "w-5 h-5 rounded border flex items-center justify-center mt-1",
                          selected ? "bg-primary border-primary" : "border-border"
                        )}
                      >
                        {selected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3 */}
            <div
              className={cn(
                "bg-background border border-border rounded-xl p-6 md:p-8 transition-opacity",
                !slotsUnlocked && "opacity-60 pointer-events-none"
              )}
              aria-disabled={!slotsUnlocked}
            >
              <StepHeader
                index={3}
                title="Pick a Time Slot"
                active={slotsUnlocked}
                done={!!slot}
                locked={!slotsUnlocked}
              />
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                {slotsUnlocked
                  ? "Available 1-hour slots, Mon–Fri, Africa/Kigali (CAT, UTC+2)."
                  : "Complete Step 1 and Step 2 to unlock the calendar."}
              </p>
              {slotsUnlocked && (
                <>
                  {slot ? (
                    <div className="space-y-4">
                      <div className="bg-card border border-primary/40 rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-muted-foreground">Selected slot</p>
                          <p className="text-sm font-semibold text-foreground">
                            {formatAppointmentDisplay(slot.startUtc)}
                          </p>
                        </div>
                        <Button type="button" variant="outline" size="sm" onClick={() => setSlot(null)}>
                          Change slot
                        </Button>
                      </div>

                      <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
                        <h3 className="text-sm font-semibold text-foreground">
                          Cancellation Policy
                        </h3>
                        <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
                          <li>Cancellations made <strong>at least 24 hours</strong> in advance are free of charge.</li>
                          <li>Cancellations made <strong>less than 24 hours</strong> beforehand require the full consultation fee.</li>
                          <li><strong>No-shows</strong> are also subject to the consultation fee.</li>
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
                            I have read and accept the Terms & Conditions and cancellation policy. *
                          </Label>
                        </div>
                        {termsError && <p className="text-xs text-justice">{termsError}</p>}
                      </div>

                      <Button
                        type="button"
                        variant="gold"
                        size="lg"
                        onClick={handleConfirmBooking}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Confirming…
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
                    </div>
                  ) : (
                    <BookingCalendar key={calKey} onSelect={setSlot} />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookConsultation;
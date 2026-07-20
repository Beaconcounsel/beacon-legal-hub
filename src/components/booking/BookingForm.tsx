import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { formatAppointmentDisplay, type Slot } from "@/lib/booking-slots";

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

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  entityType: z.enum(ENTITY_TYPES, { errorMap: () => ({ message: "Select entity type" }) }),
  jurisdiction: z.enum(JURISDICTIONS, { errorMap: () => ({ message: "Select jurisdiction" }) }),
  matterType: z.enum(MATTER_TYPES, { errorMap: () => ({ message: "Select matter type" }) }),
  message: z.string().trim().min(10, "Please provide at least 10 characters").max(2000),
  acceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the Terms & Conditions" }),
  }),
});

type FormState = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  entityType: string;
  jurisdiction: string;
  matterType: string;
  message: string;
  acceptedTerms: boolean;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  entityType: "",
  jurisdiction: "",
  matterType: "",
  message: "",
  acceptedTerms: false,
};

interface Props {
  slot: Slot;
  onCancel: () => void;
  onBooked: () => void;
}

const BookingForm = ({ slot, onCancel, onBooked }: Props) => {
  const { i18n } = useTranslation();
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormState;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please complete the required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-booking", {
        body: {
          slotStartUtc: slot.startUtc,
          slotEndUtc: slot.endUtc,
          language: i18n.language,
          client: {
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone || null,
            organization: parsed.data.organization || null,
            entityType: parsed.data.entityType,
            jurisdiction: parsed.data.jurisdiction,
            matterType: parsed.data.matterType,
            message: parsed.data.message,
          },
        },
      });
      if (error) {
        const msg = (error as { message?: string }).message || "Booking failed";
        toast.error(msg);
        return;
      }
      const result = data as { ok?: boolean; error?: string };
      if (!result?.ok) {
        toast.error(result?.error || "Booking failed");
        return;
      }
      toast.success("Booking confirmed! Check your email for details.");
      setForm(initial);
      onBooked();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-card border border-border rounded-xl p-6 md:p-8 space-y-5"
    >
      <div>
        <span className="label-uppercase">Booking Request</span>
        <h2 className="text-2xl font-serif text-navy mt-2">
          {formatAppointmentDisplay(slot.startUtc)}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-primary hover:underline mt-1"
        >
          ← Choose a different slot
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Full Name *</Label>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} />
          {errors.name && <p className="text-xs text-justice mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">Email *</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={255}
          />
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
          <Input
            value={form.organization}
            onChange={(e) => update("organization", e.target.value)}
            maxLength={150}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Entity Type *</Label>
          <Select value={form.entityType} onValueChange={(v) => update("entityType", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select entity type" />
            </SelectTrigger>
            <SelectContent>
              {ENTITY_TYPES.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.entityType && <p className="text-xs text-justice mt-1">{errors.entityType}</p>}
        </div>
        <div>
          <Label className="text-sm font-medium mb-2 block">Jurisdiction *</Label>
          <Select value={form.jurisdiction} onValueChange={(v) => update("jurisdiction", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              {JURISDICTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.jurisdiction && <p className="text-xs text-justice mt-1">{errors.jurisdiction}</p>}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Matter Type *</Label>
        <Select value={form.matterType} onValueChange={(v) => update("matterType", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select matter type" />
          </SelectTrigger>
          <SelectContent>
            {MATTER_TYPES.map((opt) => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.matterType && <p className="text-xs text-justice mt-1">{errors.matterType}</p>}
      </div>

      <div>
        <Label className="text-sm font-medium mb-2 block">Message *</Label>
        <Textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="Briefly describe your matter and any specific questions."
        />
        <div className="flex justify-between mt-1">
          {errors.message ? (
            <p className="text-xs text-justice">{errors.message}</p>
          ) : <span />}
          <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-semibold text-navy">Terms & Conditions — Cancellation Policy</h3>
        <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5 leading-relaxed">
          <li>Cancellations made <strong>at least 24 hours</strong> before the scheduled appointment are <strong>free of charge</strong>.</li>
          <li>Cancellations made <strong>less than 24 hours</strong> before the appointment will require the client to pay the <strong>full consultation fee</strong>.</li>
          <li><strong>No-shows</strong> will also be subject to the consultation fee.</li>
        </ul>
        <div className="flex items-start gap-3 pt-1">
          <Checkbox
            id="accept-terms"
            checked={form.acceptedTerms}
            onCheckedChange={(checked) => update("acceptedTerms", checked === true)}
          />
          <Label htmlFor="accept-terms" className="text-sm leading-snug cursor-pointer">
            I have read and accept the Terms & Conditions and the cancellation policy above. *
          </Label>
        </div>
        {errors.acceptedTerms && (
          <p className="text-xs text-justice">{errors.acceptedTerms}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="gold" size="lg" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Confirming…
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onCancel} disabled={submitting}>
          Back
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
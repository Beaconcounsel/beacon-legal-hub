import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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

const CHANNELS = ["Email", "Phone", "WhatsApp"] as const;

const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  entityType: z.enum(ENTITY_TYPES, { errorMap: () => ({ message: "Select entity type" }) }),
  jurisdiction: z.enum(JURISDICTIONS, { errorMap: () => ({ message: "Select jurisdiction" }) }),
  matterType: z.enum(MATTER_TYPES, { errorMap: () => ({ message: "Select matter type" }) }),
  channel: z.enum(CHANNELS, { errorMap: () => ({ message: "Select preferred channel" }) }),
  message: z.string().trim().min(10, "Please provide at least 10 characters").max(2000),
});

type InquiryForm = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  entityType: string;
  jurisdiction: string;
  matterType: string;
  channel: string;
  message: string;
};

const FIRM_EMAIL = "info@beaconattorneys.rw";
const FIRM_WHATSAPP = "250788559603";

const initialForm: InquiryForm = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  entityType: "",
  jurisdiction: "",
  matterType: "",
  channel: "Email",
  message: "",
};

const ContactPage = () => {
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryForm, string>>>({});
  const revealRef = useScrollReveal();
  const { t } = useTranslation();

  const update = <K extends keyof InquiryForm>(key: K, value: InquiryForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const buildBody = (data: InquiryForm) =>
    [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.organization ? `Organization: ${data.organization}` : null,
      `Entity Type: ${data.entityType}`,
      `Jurisdiction: ${data.jurisdiction}`,
      `Matter Type: ${data.matterType}`,
      `Preferred Channel: ${data.channel}`,
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = inquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InquiryForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof InquiryForm;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please complete the required fields.");
      return;
    }

    const data = result.data as InquiryForm;
    const subject = `Legal Inquiry — ${data.matterType} (${data.jurisdiction})`;
    const body = buildBody(data);

    if (data.channel === "WhatsApp") {
      const text = `${subject}\n\n${body}`;
      window.open(
        `https://wa.me/${FIRM_WHATSAPP}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.location.href = `mailto:${FIRM_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }

    toast.success(t("contact.successMessage"));
    setForm(initialForm);
    setErrors({});
  };

  return (
    <Layout>
      <SEOHead titleKey="seo.contactTitle" descKey="seo.contactDesc" />
      <section className="pt-12 md:pt-16 pb-0">
        <div className="container">
          <div className="max-w-3xl mb-6">
            <p className="text-muted-foreground text-lg leading-relaxed">{t("contact.tagline")}</p>
          </div>
        </div>
      </section>

      <div ref={revealRef}>
        <section className="pt-6 pb-20 md:pb-28">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 reveal">
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 md:p-10 space-y-6" noValidate>
                  <div>
                    <span className="label-uppercase">Legal Inquiry</span>
                    <h2 className="text-2xl font-serif text-navy mt-2">Tell us about your matter</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">{t("contact.fullName")} *</Label>
                      <Input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        maxLength={100}
                        className="bg-background border-border focus:border-primary/50 transition-colors"
                      />
                      {errors.name && <p className="text-xs text-justice mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">{t("contact.email")} *</Label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        maxLength={255}
                        className="bg-background border-border focus:border-primary/50 transition-colors"
                      />
                      {errors.email && <p className="text-xs text-justice mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">{t("contact.phone")}</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        maxLength={30}
                        className="bg-background border-border focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Organization</Label>
                      <Input
                        value={form.organization}
                        onChange={(e) => update("organization", e.target.value)}
                        maxLength={150}
                        className="bg-background border-border focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Entity Type *</Label>
                      <Select value={form.entityType} onValueChange={(v) => update("entityType", v)}>
                        <SelectTrigger className="bg-background border-border">
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
                        <SelectTrigger className="bg-background border-border">
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
                      <SelectTrigger className="bg-background border-border">
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
                    <Label className="text-sm font-medium mb-3 block">Preferred Communication Channel *</Label>
                    <RadioGroup
                      value={form.channel}
                      onValueChange={(v) => update("channel", v)}
                      className="flex flex-wrap gap-4"
                    >
                      {CHANNELS.map((opt) => (
                        <div key={opt} className="flex items-center gap-2 border border-border rounded-md px-4 py-2 bg-background">
                          <RadioGroupItem value={opt} id={`channel-${opt}`} />
                          <Label htmlFor={`channel-${opt}`} className="text-sm cursor-pointer">{opt}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.channel && <p className="text-xs text-justice mt-1">{errors.channel}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t("contact.message")} *</Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      rows={5}
                      maxLength={2000}
                      placeholder="Briefly describe your matter, timeline, and any specific questions."
                      className="bg-background border-border focus:border-primary/50 transition-colors"
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message ? (
                        <p className="text-xs text-justice">{errors.message}</p>
                      ) : <span />}
                      <p className="text-xs text-muted-foreground">{form.message.length}/2000</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Submitting opens your {form.channel === "WhatsApp" ? "WhatsApp" : "email client"} with your inquiry pre-filled. No data is stored on this site.
                  </p>

                  <Button type="submit" variant="gold" size="lg">{t("contact.submit")}</Button>
                </form>
              </div>

              <div className="space-y-8 reveal">
                <div className="bg-card border border-border rounded-xl p-8">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">{t("contact.reachUs")}</span>
                  <h3 className="text-lg font-semibold font-serif mb-6">{t("contact.contactInfo")}</h3>
                  <ul className="space-y-5">
                    {[
                      { icon: MapPin, text: "KG 190 St, RIM House, 1st Floor, Kigali, Rwanda", href: "https://www.google.com/maps/search/KG+190+St,+RIM+House,+Kigali,+Rwanda" },
                      { icon: Phone, text: "+250 788 55 96 03", href: "tel:+250788559603" },
                      { icon: Mail, text: "info@beaconattorneys.rw", href: "mailto:info@beaconattorneys.rw" },
                      { icon: Clock, text: t("contact.hours"), href: undefined },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-4 text-sm group">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        {item.href ? (
                          <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors mt-2">{item.text}</a>
                        ) : (
                          <span className="text-muted-foreground mt-2">{item.text}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.06!3d-1.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42e5e7e8b7d%3A0x0!2sKG%20190%20St%2C%20Kigali!5e0!3m2!1sen!2srw!4v1700000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Beacon Attorneys location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;

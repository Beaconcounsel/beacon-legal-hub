import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import LeadForm from "@/components/LeadForm";
import WhatsAppLink from "@/components/WhatsAppLink";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const ContactPage = () => {
  const { t } = useTranslation();
  const revealRef = useScrollReveal();

  const items = [
    { icon: MapPin, text: "KG 190 St, RIM House, 1st Floor, Kigali, Rwanda", href: "https://www.google.com/maps/search/KG+190+St,+RIM+House,+Kigali,+Rwanda" },
    { icon: Phone, text: "+250 788 55 96 03", href: "tel:+250788559603" },
    { icon: Mail, text: "info@beaconattorneys.rw", href: "mailto:info@beaconattorneys.rw?subject=Inquiry%20from%20website" },
    { icon: Clock, text: t("contact.hours"), href: undefined as string | undefined },
  ];

  return (
    <Layout>
      <SEOHead titleKey="seo.contactTitle" descKey="seo.contactDesc" />
      <section className="pt-10 md:pt-12 pb-0">
        <div className="container">
          <div className="max-w-3xl mb-5">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
              {t("contact.reachUs")}
            </h1>
            <div className="h-1 w-16 bg-primary rounded-full mb-5" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("contact.tagline")}
            </p>
          </div>
        </div>
      </section>

      <div ref={revealRef}>
        <section className="pt-6 pb-10 md:pb-12">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl reveal">
              {items.map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href || "#"}
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
                  onClick={(e) => { if (!href) e.preventDefault(); }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{text}</p>
                </a>
              ))}
              <div className="flex items-start gap-3 bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <WhatsAppLink
                    source="contact_page"
                    variant="inline"
                    showIcon={false}
                    ariaLabel="Contact Beacon Attorneyes and Consultants on WhatsApp"
                    className="text-sm text-foreground leading-relaxed font-medium hover:text-primary"
                  >
                    {t("bookConsult.whatsappCta")}
                  </WhatsAppLink>
                  <a href="tel:+250788559603" className="mt-1 block text-xs text-muted-foreground hover:text-primary">
                    WhatsApp: {WHATSAPP_DISPLAY}
                  </a>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t("bookConsult.whatsappConfidence")}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t("bookConsult.businessHours")}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-4xl text-xs text-muted-foreground/80 leading-relaxed reveal">
              {t("bookConsult.clientIntakeNotice")}
            </p>

            <div className="mt-10 max-w-2xl reveal">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                Send us a message
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Prefer to write? Fill in the form below and we'll get back to you within one business day.
              </p>
              <LeadForm sourcePage="contact-page" />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;

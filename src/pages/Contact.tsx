import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;

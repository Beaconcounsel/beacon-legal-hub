import { useTranslation } from "react-i18next";
import { ArrowRight, Scale, Briefcase, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import heroImg from "@/assets/kigali-city.jpg";

const Landing = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "30+", label: t("landing.stats.experience") },
    { value: "5+", label: t("landing.stats.practiceAreas") },
    { value: "100+", label: t("landing.stats.clientsServed") },
  ];

  const highlights = [
    { icon: Scale, title: t("landing.highlights.complexLegal"), desc: t("landing.highlights.complexLegalDesc") },
    { icon: Briefcase, title: t("landing.highlights.businessAdvisory"), desc: t("landing.highlights.businessAdvisoryDesc") },
    { icon: Globe, title: t("landing.highlights.crossBorder"), desc: t("landing.highlights.crossBorderDesc") },
    { icon: Users, title: t("landing.highlights.partnerLed"), desc: t("landing.highlights.partnerLedDesc") },
  ];

  return (
    <Layout>
      <SEOHead titleKey="seo.landingTitle" descKey="seo.landingDesc" />
      {/* Hero — text anchored in the open sky area above the skyline */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Kigali skyline" className="w-full h-full object-cover scale-105" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        </div>
        {/* Top padding = navbar height (~72px) + 80px clearance on desktop; tighter on mobile (navbar ~62px + 80px) */}
        <div className="container relative z-10 pt-[142px] md:pt-[152px] pb-12">
          <div className="max-w-3xl text-left">
            <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {t("landing.heroTagline")}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-card/80 backdrop-blur-sm border-y border-border/50">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary font-serif">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-2 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-foreground">{t("landing.whyBeacon")}</h2>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-6" />
            <p className="text-muted-foreground leading-relaxed">{t("landing.whyBeaconDesc")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((h) => (
              <div key={h.title} className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <h.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
            <div className="relative bg-background border border-border rounded-xl p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-foreground">{t("landing.ctaTitle")}</h2>
              <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-8">{t("landing.ctaDesc")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <LocalizedLink to="/contact">
                  <Button variant="gold" size="lg" className="gap-2">
                    {t("landing.getInTouch")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </LocalizedLink>
                <LocalizedLink to="/">
                  <Button variant="outline" size="lg" className="gap-2">
                    {t("landing.exploreFirm")}
                  </Button>
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;

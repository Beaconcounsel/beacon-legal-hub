import { useTranslation } from "react-i18next";
import { ArrowRight, Scale, Briefcase, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import { kigaliCityImage } from "@/assets/optimized";
import ResponsiveImage from "@/components/ResponsiveImage";

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
      {/*
        Hero — Figma spec:
        - Frame heights: Mobile 520, Tablet 600, Desktop 720
        - Hero / Image: full-bleed (Left+Right+Top+Bottom)
        - Hero / Overlay: top 40%, dark→transparent linear gradient (sits ABOVE image, BELOW content)
        - Hero / Content: max-w 1200px, centered horizontally, top-aligned
          Top offset: Mobile 56px, Tablet 72px, Desktop 96px
        - Inner Auto Layout (Vertical): gap 16/24px, items hug content, left aligned
        - Tagline max-w 720px (640px on smaller wrap), 2–3 lines, sits in top-40% safe zone
      */}
      <section className="relative h-[420px] md:h-[480px] lg:h-[540px] overflow-hidden">
        {/* Hero / Image */}
        <ResponsiveImage
          source={kigaliCityImage}
          sizes="100vw"
          alt="Kigali skyline"
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        {/* Hero / Overlay — top 40%, fixed height, Left+Right+Top */}
        <div
          className="absolute inset-x-0 top-0 h-[40%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--navy) / 0.55), hsl(var(--navy) / 0))",
          }}
        />
        {/* Hero / Content — centered, top-aligned, max-w 1200 */}
        <div className="absolute inset-x-0 top-[32px] md:top-[48px] lg:top-[64px] z-10">
          <div className="mx-auto w-full max-w-[1100px] px-6 md:px-8">
            {/* Auto Layout (Vertical), gap-3 (12px) → md gap-4 (16px), items-start */}
            <div className="flex flex-col items-start gap-3 md:gap-4">
              <p className="max-w-[680px] text-lg md:text-xl lg:text-2xl font-medium leading-snug text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]">
                {t("landing.heroTagline")}
              </p>
            </div>
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
      <section className="section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif text-foreground">{t("landing.whyBeacon")}</h2>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-5" />
            <p className="text-muted-foreground leading-snug">{t("landing.whyBeaconDesc")}</p>
            <p className="text-muted-foreground leading-snug mt-4">{t("landing.whyBeaconDesc2")}</p>
          </div>
          <ul className="grid md:grid-cols-2 gap-6 list-none p-0 m-0">
            {highlights.map((h) => (
              <li
                key={h.title}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <h.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-serif grid grid-cols-[1em_1fr] gap-x-2 items-start">
                  <span
                    aria-hidden="true"
                    className="text-primary text-center leading-[1.35]"
                  >
                    •
                  </span>
                  <span className="leading-[1.35]">{h.title}</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-snug pl-[calc(1em+0.5rem)]">{h.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
            <div className="relative bg-background border border-border rounded-xl p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif text-foreground">{t("landing.ctaTitle")}</h2>
              <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-5" />
              <p className="text-muted-foreground leading-snug mb-6">{t("landing.ctaDesc")}</p>
              <div className="flex flex-wrap justify-center gap-4">
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

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText, Building2, ScrollText, ClipboardList, Zap, Landmark, Laptop, Wheat, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { practiceAreasHeroImage } from "@/assets/optimized";
import ResponsiveImage from "@/components/ResponsiveImage";

const PracticeAreasPage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const areaKeys = [
    "corporateCommercial", "contractAdvisory", "regulatoryCompliance", "employmentLabour",
    "oilGasEnergy", "bankingFinancial", "disputeResolution", "taxCorporate",
    "realEstate", "privateWealth", "ngoGovernance", "intellectualProperty",
    "techDataProtection", "migration", "insolvency", "insurance",
  ] as const;

  const serviceKeys = ["businessOperational", "representation", "whitePaper", "procedureCompliance", "transactionDoc", "estatePlanning"] as const;
  const serviceIcons = [Briefcase, Building2, FileText, ScrollText, ClipboardList, BookOpen];

  const industries = [
    { icon: Zap, label: t("practiceAreas.industries.energy") },
    { icon: Landmark, label: t("practiceAreas.industries.financial") },
    { icon: Building2, label: t("practiceAreas.industries.realEstate") },
    { icon: Laptop, label: t("practiceAreas.industries.technology") },
    { icon: Wheat, label: t("practiceAreas.industries.agriculture") },
    { icon: Building2, label: t("practiceAreas.industries.infrastructure") },
  ];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash]);

  return (
    <Layout>
      <SEOHead titleKey="seo.practiceAreasTitle" descKey="seo.practiceAreasDesc" />
      {/* Hero */}
      <section className="relative min-h-[480px] md:min-h-[560px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            source={practiceAreasHeroImage}
            sizes="100vw"
            alt="Kigali business district"
            className="w-full h-full object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl font-medium leading-relaxed text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-3">
              {t("practiceAreas.heroTagline1")}
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section id="expertise" className="section-padding scroll-mt-28">
        <div className="container">
          <div className="space-y-5">
            {areaKeys.map((key, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 md:p-6 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-justice font-serif text-lg font-bold mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 font-serif">{t(`practiceAreas.areas.${key}.title`)}</h3>
                    <p className="text-muted-foreground leading-snug mb-3">{t(`practiceAreas.areas.${key}.description`)}</p>
                    {t(`practiceAreas.areas.${key}.subsection`, { defaultValue: "" }) && (
                      <div className="bg-secondary/50 border border-border rounded-md p-4 mb-3">
                        <p className="text-sm text-foreground/80">{t(`practiceAreas.areas.${key}.subsection`)}</p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      <span className="text-primary">{t("practiceAreas.clientsLabel")}</span> {t(`practiceAreas.areas.${key}.clients`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <LocalizedLink to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                {t("practiceAreas.requestConsultation")} <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section id="industries" className="section-padding bg-card scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t("practiceAreas.industriesWeServe")}</h2>
          <div className="line-gold mb-8" />
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {industries.map((ind) => (
              <div key={ind.label} className="flex items-center gap-3 bg-background border border-border px-7 py-5 rounded-xl hover:border-primary/30 hover:bg-secondary/60 transition-all duration-300 group">
                <ind.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{ind.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <LocalizedLink to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                {t("practiceAreas.discussIndustry")} <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>

      {/* Our Services - Carousel */}
      <section id="services" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t("practiceAreas.ourServices")}</h2>
          <div className="line-gold mb-8" />
          <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/80 max-w-3xl mb-8">
            {t("practiceAreas.heroTagline2")}
          </p>
          <ServicesCarousel serviceKeys={serviceKeys} serviceIcons={serviceIcons} t={t} />
          <div className="text-center mt-10">
            <LocalizedLink to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                {t("practiceAreas.discussNeeds")} <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const ServicesCarousel = ({ serviceKeys, serviceIcons, t }: { serviceKeys: readonly string[]; serviceIcons: any[]; t: any }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // Group 6 services into 2 slides of 3 each
  const slides: { key: string; Icon: any }[][] = [];
  for (let i = 0; i < serviceKeys.length; i += 3) {
    slides.push(
      serviceKeys.slice(i, i + 3).map((key, idx) => ({ key, Icon: serviceIcons[i + idx] }))
    );
  }
  const total = slides.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  // Auto-advance every 5s on desktop only (>=768px); pause on hover
  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our services"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); next(); }
        else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.4s ease-in-out",
          }}
        >
          {slides.map((group, slideIdx) => (
            <div key={slideIdx} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
                {group.map(({ key, Icon }) => (
                  <div
                    key={key}
                    className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/40 transition-colors"
                  >
                    <Icon className="w-10 h-10 text-primary mb-4 mx-auto" />
                    <h3 className="text-xl md:text-2xl font-medium mb-2 font-serif">
                      {t(`practiceAreas.services.${key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-snug font-light">
                      {t(`practiceAreas.services.${key}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={`w-2.5 h-2.5 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                i === current ? "bg-primary" : "bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default PracticeAreasPage;

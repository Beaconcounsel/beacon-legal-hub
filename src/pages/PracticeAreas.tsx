import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText, Building2, ScrollText, ClipboardList, Zap, Landmark, Laptop, Wheat, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import practiceHeroImg from "@/assets/practice-areas-hero.jpg";

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
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={practiceHeroImg} alt="Kigali business district" className="w-full h-full object-cover scale-105" loading="eager" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 py-16">
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
          <div className="space-y-8">
            {areaKeys.map((key, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-8 md:p-10 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-justice font-serif text-lg font-bold mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 font-serif">{t(`practiceAreas.areas.${key}.title`)}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{t(`practiceAreas.areas.${key}.description`)}</p>
                    {t(`practiceAreas.areas.${key}.subsection`, { defaultValue: "" }) && (
                      <div className="bg-secondary/50 border border-border rounded-md p-4 mb-4">
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
          <div className="text-center mt-16">
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
          <div className="line-gold mb-12" />
          <div className="flex flex-wrap justify-center gap-5 mb-10">
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
          <div className="line-gold mb-12" />
          <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/80 max-w-3xl mb-12">
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
  // Group services into 2 slides of 3 cards each
  const slides = [serviceKeys.slice(0, 3), serviceKeys.slice(3, 6)];
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = slides.length;

  const next = () => setCurrent((c) => (c + 1) % totalSlides);
  const prev = () => setCurrent((c) => (c - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Do not auto-play on mobile
    if (paused || isMobile) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, isMobile]);

  // Touch swipe for mobile
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <div
      className="relative md:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-[400ms] ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slideKeys, slideIdx) => (
            <div key={slideIdx} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {slideKeys.map((key) => {
                  const globalIdx = serviceKeys.indexOf(key);
                  const Icon = serviceIcons[globalIdx];
                  return (
                    <div
                      key={key}
                      className="group relative bg-ivory border border-[hsl(var(--border))] rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 hover:border-l-4 hover:border-l-gold hover:shadow-lg"
                    >
                      <Icon className="w-9 h-9 text-justice mb-5" />
                      <h3 className="font-serif text-xl mb-3 text-navy" style={{ fontWeight: 500 }}>
                        {t(`practiceAreas.services.${key}.title`)}
                      </h3>
                      <p className="text-sm text-foreground/80 leading-relaxed font-light">
                        {t(`practiceAreas.services.${key}.desc`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — vertically centered, off-card */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-primary hover:text-gold transition-colors"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center text-primary hover:text-gold transition-colors"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current
                ? "bg-gold border border-gold"
                : "bg-transparent border border-[hsl(var(--border))] hover:border-gold/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PracticeAreasPage;

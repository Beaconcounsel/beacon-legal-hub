import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Search, GraduationCap, Briefcase, Users, Globe, Building2, Sprout, Scale } from "lucide-react";
import { researchHeroImage } from "@/assets/optimized";
import ResponsiveImage from "@/components/ResponsiveImage";

const ResearchPage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash]);

  const researchItems = [
    { icon: Scale, title: t("research.items.legalFramework.title"), desc: t("research.items.legalFramework.desc") },
    { icon: Globe, title: t("research.items.crossBorder.title"), desc: t("research.items.crossBorder.desc") },
    { icon: BookOpen, title: t("research.items.policyReview.title"), desc: t("research.items.policyReview.desc") },
  ];

  const trainingItems = [
    { icon: Users, title: t("research.trainingItems.youthLegal.title"), desc: t("research.trainingItems.youthLegal.desc") },
    { icon: Sprout, title: t("research.trainingItems.womenBusiness.title"), desc: t("research.trainingItems.womenBusiness.desc") },
    { icon: Building2, title: t("research.trainingItems.smeLegal.title"), desc: t("research.trainingItems.smeLegal.desc") },
    { icon: Globe, title: t("research.trainingItems.farmerCoops.title"), desc: t("research.trainingItems.farmerCoops.desc") },
    { icon: GraduationCap, title: t("research.trainingItems.ngoGovernance.title"), desc: t("research.trainingItems.ngoGovernance.desc") },
  ];

  const consultancyItems = [
    { icon: Briefcase, title: t("research.consultancyItems.businessEnv.title"), desc: t("research.consultancyItems.businessEnv.desc") },
    { icon: Search, title: t("research.consultancyItems.regulatoryImpact.title"), desc: t("research.consultancyItems.regulatoryImpact.desc") },
    { icon: Scale, title: t("research.consultancyItems.justiceSector.title"), desc: t("research.consultancyItems.justiceSector.desc") },
  ];

  return (
    <Layout>
      <SEOHead titleKey="seo.researchTitle" descKey="seo.researchDesc" />
      {/* Hero */}
      <section className="relative min-h-[480px] md:min-h-[560px] lg:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            source={researchHeroImage}
            sizes="100vw"
            alt="Legal professionals group photo"
            className="w-full h-full object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl font-medium leading-relaxed text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {t("research.heroTagline")}
            </p>
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t("research.research")}</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">{t("research.researchDesc")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {researchItems.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2 font-serif">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section id="training" className="section-padding bg-card scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t("research.training")}</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">{t("research.trainingDesc")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {trainingItems.map((item) => (
              <div key={item.title} className="bg-background border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2 font-serif">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultancy */}
      <section id="consultancy" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t("research.consultancy")}</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">{t("research.consultancyDesc")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {consultancyItems.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2 font-serif">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResearchPage;

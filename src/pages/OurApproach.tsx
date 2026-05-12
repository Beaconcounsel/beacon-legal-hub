import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, TrendingUp, Lightbulb, Handshake, Globe, Shield, MapPin, Scale, Heart } from "lucide-react";
import { ourApproachHeroImage, kigaliSkylineImage } from "@/assets/optimized";
import ResponsiveImage from "@/components/ResponsiveImage";

const OurApproachPage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const servePillars = [
    { icon: Target, title: t("approach.pillars.resultsDriven.title"), desc: t("approach.pillars.resultsDriven.desc") },
    { icon: Users, title: t("approach.pillars.executiveLevel.title"), desc: t("approach.pillars.executiveLevel.desc") },
    { icon: TrendingUp, title: t("approach.pillars.businessFirst.title"), desc: t("approach.pillars.businessFirst.desc") },
    { icon: Lightbulb, title: t("approach.pillars.strategicProblem.title"), desc: t("approach.pillars.strategicProblem.desc") },
    { icon: Handshake, title: t("approach.pillars.partnership.title"), desc: t("approach.pillars.partnership.desc") },
  ];

  const internationalServices = [
    { icon: Globe, title: t("approach.intlServices.marketEntry.title"), desc: t("approach.intlServices.marketEntry.desc") },
    { icon: Scale, title: t("approach.intlServices.crossBorder.title"), desc: t("approach.intlServices.crossBorder.desc") },
    { icon: MapPin, title: t("approach.intlServices.localRegulatory.title"), desc: t("approach.intlServices.localRegulatory.desc") },
    { icon: Shield, title: t("approach.intlServices.riskMitigation.title"), desc: t("approach.intlServices.riskMitigation.desc") },
    { icon: Handshake, title: t("approach.intlServices.jointVentures.title"), desc: t("approach.intlServices.jointVentures.desc") },
  ];

  const whyRwandaItems = t("approach.whyRwandaItems", { returnObjects: true }) as string[];
  const proBonoPartnersList = t("approach.proBonoPartnersList", { returnObjects: true }) as string[];

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
      <SEOHead titleKey="seo.approachTitle" descKey="seo.approachDesc" />
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            source={ourApproachHeroImage}
            sizes="100vw"
            alt="Kigali cityscape"
            className="w-full h-full object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 py-7">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-base md:text-lg font-medium leading-relaxed text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {t("approach.heroTagline")}
            </p>
          </div>
        </div>
      </section>

      {/* How We Serve You */}
      <section id="how-we-serve" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t("approach.howWeServe")}</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">{t("approach.howWeServeDesc")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {servePillars.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <p.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2 font-serif">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Clients */}
      <section id="international" className="scroll-mt-28">
        <div className="relative min-h-[40vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <ResponsiveImage
              source={kigaliSkylineImage}
              sizes="100vw"
              alt="Kigali skyline"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-transparent" />
          </div>
          <div className="container relative z-10 py-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{t("approach.internationalClients")}</h2>
            <div className="line-gold mb-6" />
            <p className="text-lg text-white/90 max-w-2xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{t("approach.internationalDesc")}</p>
          </div>
        </div>

        <div className="section-padding">
          <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-10">
              <div>
                <h3 className="text-2xl font-bold mb-5 font-serif">{t("approach.rwandaInvestment")}</h3>
                <div className="space-y-3 text-muted-foreground leading-snug">
                  <p>{t("approach.rwandaP1")}</p>
                  <p>{t("approach.rwandaP2")}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-5 font-serif text-primary">{t("approach.whyRwanda")}</h3>
                <ul className="space-y-3">
                  {whyRwandaItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
              {internationalServices.map((s) => (
                <div key={s.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                  <s.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-lg font-semibold mb-2 font-serif">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Pro Bono Services */}
      <section id="pro-bono" className="section-padding bg-card scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">{t("approach.proBono")}</h2>
          <div className="line-gold mb-6" />
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-8">
            <div className="space-y-3 text-muted-foreground leading-snug">
              <p>{t("approach.proBonoP1")}</p>
              <p>{t("approach.proBonoP2")}</p>
              <p>{t("approach.proBonoP3")}</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <Heart className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-xl font-bold mb-3 font-serif">{t("approach.proBonoPartners")}</h3>
              <ul className="space-y-2">
                {proBonoPartnersList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-snug">
                    <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OurApproachPage;

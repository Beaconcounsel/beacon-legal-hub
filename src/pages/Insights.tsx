import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const InsightsPage = () => {
  const { t } = useTranslation();

  const articleKeys = ["foreignInvestors", "structuringInvestments", "corporateGovernance", "dataProtection", "employmentLaw"] as const;

  return (
    <Layout>
      <SEOHead titleKey="seo.insightsTitle" descKey="seo.insightsDesc" />
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mb-8">
            <div className="line-gold mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("insights.title")}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("insights.tagline")}</p>
          </div>

          <div className="space-y-5">
            {articleKeys.map((key, i) => (
              <article key={i} className="bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary/30 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {t(`insights.articles.${key}.category`)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {t(`insights.articles.${key}.date`)}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 font-serif group-hover:text-primary transition-colors">{t(`insights.articles.${key}.title`)}</h2>
                <p className="text-muted-foreground leading-relaxed">{t(`insights.articles.${key}.excerpt`)}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <LocalizedLink to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                {t("insights.subscribe")} <ArrowRight className="w-4 h-4" />
              </Button>
            </LocalizedLink>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InsightsPage;

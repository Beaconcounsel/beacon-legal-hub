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
          <div className="max-w-3xl mb-6">
            <div className="line-gold mb-3" />
            <h1 className="text-4xl md:text-5xl font-bold mb-5">{t("insights.title")}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t("insights.tagline")}</p>
          </div>

          <div className="space-y-5">
            {articleKeys.map((key, i) => (
              <article key={i} className="bg-card border border-border rounded-lg p-5 md:p-6 hover:border-primary/30 transition-colors group cursor-pointer">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {t(`insights.articles.${key}.category`)}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {t(`insights.articles.${key}.date`)}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 font-serif group-hover:text-primary transition-colors">{t(`insights.articles.${key}.title`)}</h2>
                <p className="text-muted-foreground leading-snug">{t(`insights.articles.${key}.excerpt`)}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InsightsPage;

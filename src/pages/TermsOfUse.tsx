import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const TermsOfUse = () => {
  const { t } = useTranslation();

  const sections = [
    { title: t("termsOfUse.acceptance.title"), text: t("termsOfUse.acceptance.text") },
    { title: t("termsOfUse.useOfSite.title"), text: t("termsOfUse.useOfSite.text") },
    { title: t("termsOfUse.intellectualProperty.title"), text: t("termsOfUse.intellectualProperty.text") },
    { title: t("termsOfUse.noLegalAdvice.title"), text: t("termsOfUse.noLegalAdvice.text") },
    { title: t("termsOfUse.liability.title"), text: t("termsOfUse.liability.text") },
    { title: t("termsOfUse.governingLaw.title"), text: t("termsOfUse.governingLaw.text") },
    { title: t("termsOfUse.contact.title"), text: t("termsOfUse.contact.text") },
  ];

  return (
    <Layout>
      <SEOHead titleKey="termsOfUse.title" descKey="termsOfUse.acceptance.text" />
      <div className="bg-[#F8F9FB] min-h-screen">
        <div className="container max-w-3xl py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0d3d4a] mb-8 font-playfair">
            {t("termsOfUse.title")}
          </h1>
          <p className="text-xs text-[#1a5c6b]/50 mb-8">{t("termsOfUse.lastUpdated", { date: "April 2026" })}</p>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-[#0d3d4a] mb-2">{section.title}</h2>
                <p className="text-sm text-[#1a5c6b]/70 leading-relaxed whitespace-pre-line">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;

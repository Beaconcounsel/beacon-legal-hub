import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const CookiePolicy = () => {
  const { t } = useTranslation();

  const sections = [
    { title: t("cookiePolicy.whatAreCookies.title"), text: t("cookiePolicy.whatAreCookies.text") },
    { title: t("cookiePolicy.howWeUse.title"), text: t("cookiePolicy.howWeUse.text") },
    { title: t("cookiePolicy.categories.title"), text: t("cookiePolicy.categories.text") },
    { title: t("cookiePolicy.duration.title"), text: t("cookiePolicy.duration.text") },
    { title: t("cookiePolicy.manage.title"), text: t("cookiePolicy.manage.text") },
    { title: t("cookiePolicy.changes.title"), text: t("cookiePolicy.changes.text") },
  ];

  return (
    <Layout>
      <SEOHead titleKey="cookiePolicy.title" descKey="cookiePolicy.whatAreCookies.text" />
      <div className="bg-[#F8F9FB] min-h-screen">
        <div className="container max-w-3xl py-12 md:py-20">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0d3d4a] mb-6 font-playfair">
            {t("cookiePolicy.title")}
          </h1>
          <p className="text-xs text-[#1a5c6b]/50 mb-6">{t("cookiePolicy.lastUpdated", { date: "April 2026" })}</p>

          <div className="space-y-6">
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

export default CookiePolicy;

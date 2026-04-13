import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  const sections = [
    { title: t("privacyPolicy.infoWeCollect.title"), text: t("privacyPolicy.infoWeCollect.text") },
    { title: t("privacyPolicy.howWeUseInfo.title"), text: t("privacyPolicy.howWeUseInfo.text") },
    { title: t("privacyPolicy.analytics.title"), text: t("privacyPolicy.analytics.text") },
    { title: t("privacyPolicy.dataSecurity.title"), text: t("privacyPolicy.dataSecurity.text") },
    { title: t("privacyPolicy.yourRights.title"), text: t("privacyPolicy.yourRights.text") },
    { title: t("privacyPolicy.thirdParty.title"), text: t("privacyPolicy.thirdParty.text") },
    { title: t("privacyPolicy.changes.title"), text: t("privacyPolicy.changes.text") },
    { title: t("privacyPolicy.contact.title"), text: t("privacyPolicy.contact.text") },
  ];

  return (
    <Layout>
      <SEOHead page="privacyPolicy" />
      <div className="bg-[#F8F9FB] min-h-screen">
        <div className="container max-w-3xl py-16 md:py-24">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0d3d4a] mb-8 font-playfair">
            {t("privacyPolicy.title")}
          </h1>
          <p className="text-xs text-[#1a5c6b]/50 mb-8">{t("privacyPolicy.lastUpdated", { date: "April 2026" })}</p>

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

export default PrivacyPolicy;

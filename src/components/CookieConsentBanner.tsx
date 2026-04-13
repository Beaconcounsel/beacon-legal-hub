import { useTranslation } from "react-i18next";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Shield } from "lucide-react";

const CookieConsentBanner = () => {
  const { t } = useTranslation();
  const { showBanner, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
      <div className="container max-w-4xl mx-auto bg-white border border-[#1a5c6b]/10 rounded-xl shadow-2xl p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="w-5 h-5 text-[#1a5c6b] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-[#0d3d4a] mb-1">
              {t("cookies.bannerTitle")}
            </h3>
            <p className="text-xs text-[#1a5c6b]/70 leading-relaxed">
              {t("cookies.bannerText")}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
          <button
            onClick={rejectNonEssential}
            className="px-4 py-2 text-xs font-medium text-[#1a5c6b] border border-[#1a5c6b]/20 rounded-lg hover:bg-[#1a5c6b]/5 transition-colors"
          >
            {t("cookies.rejectNonEssential")}
          </button>
          <button
            onClick={openPreferences}
            className="px-4 py-2 text-xs font-medium text-[#1a5c6b] border border-[#1a5c6b]/20 rounded-lg hover:bg-[#1a5c6b]/5 transition-colors"
          >
            {t("cookies.customize")}
          </button>
          <button
            onClick={acceptAll}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1a5c6b] rounded-lg hover:bg-[#0d3d4a] transition-colors"
          >
            {t("cookies.acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;

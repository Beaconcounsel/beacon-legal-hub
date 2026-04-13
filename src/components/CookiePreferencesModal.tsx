import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCookieConsent, CookiePreferences } from "@/contexts/CookieConsentContext";
import { X, Lock } from "lucide-react";

const CookiePreferencesModal = () => {
  const { t } = useTranslation();
  const { showPreferences, closePreferences, savePreferences, preferences } = useCookieConsent();
  const [local, setLocal] = useState<CookiePreferences>(preferences);

  if (!showPreferences) return null;

  const categories = [
    {
      key: "necessary" as const,
      locked: true,
    },
    {
      key: "analytics" as const,
      locked: false,
    },
    {
      key: "marketing" as const,
      locked: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-[#1a5c6b]/10">
          <h2 className="text-base font-semibold text-[#0d3d4a]">{t("cookies.preferencesTitle")}</h2>
          <button onClick={closePreferences} className="text-[#1a5c6b]/40 hover:text-[#1a5c6b] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-[#1a5c6b]/70 leading-relaxed">{t("cookies.preferencesDesc")}</p>

          {categories.map(({ key, locked }) => (
            <div key={key} className="border border-[#1a5c6b]/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#0d3d4a]">{t(`cookies.categories.${key}.title`)}</span>
                  {locked && <Lock className="w-3.5 h-3.5 text-[#1a5c6b]/40" />}
                </div>
                {locked ? (
                  <span className="text-[10px] font-medium text-[#1a5c6b]/50 uppercase tracking-wider">{t("cookies.alwaysActive")}</span>
                ) : (
                  <button
                    onClick={() => setLocal(prev => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      local[key] ? "bg-[#1a5c6b]" : "bg-[#1a5c6b]/20"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        local[key] ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-[#1a5c6b]/60 leading-relaxed">{t(`cookies.categories.${key}.desc`)}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 p-5 border-t border-[#1a5c6b]/10">
          <button
            onClick={closePreferences}
            className="px-4 py-2 text-xs font-medium text-[#1a5c6b] border border-[#1a5c6b]/20 rounded-lg hover:bg-[#1a5c6b]/5 transition-colors"
          >
            {t("cookies.cancel")}
          </button>
          <button
            onClick={() => savePreferences(local)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#1a5c6b] rounded-lg hover:bg-[#0d3d4a] transition-colors"
          >
            {t("cookies.savePreferences")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;

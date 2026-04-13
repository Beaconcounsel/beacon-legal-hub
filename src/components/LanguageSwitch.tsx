import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isFr = i18n.language === "fr";

  const switchLanguage = () => {
    const currentPath = location.pathname;
    const hash = location.hash;
    if (isFr) {
      // Switch to EN: remove /fr prefix
      const newPath = currentPath.replace(/^\/fr/, "") || "/";
      i18n.changeLanguage("en");
      navigate(newPath + hash);
    } else {
      // Switch to FR: add /fr prefix
      const newPath = "/fr" + (currentPath === "/" ? "" : currentPath);
      i18n.changeLanguage("fr");
      navigate(newPath + hash);
    }
  };

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border text-xs font-bold uppercase tracking-wider hover:border-primary/50 hover:bg-primary/5 transition-colors"
      aria-label="Switch language"
    >
      <span className={isFr ? "text-muted-foreground" : "text-primary"}>EN</span>
      <span className="text-muted-foreground">/</span>
      <span className={isFr ? "text-primary" : "text-muted-foreground"}>FR</span>
    </button>
  );
};

export default LanguageSwitch;

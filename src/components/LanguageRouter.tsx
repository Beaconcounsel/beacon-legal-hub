import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LanguageRouter = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isFr = location.pathname.startsWith("/fr");
    const lang = isFr ? "fr" : "en";
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [location.pathname, i18n]);

  return <Outlet />;
};

export default LanguageRouter;

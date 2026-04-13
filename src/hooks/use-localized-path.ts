import { useTranslation } from "react-i18next";

export const useLocalizedPath = () => {
  const { i18n } = useTranslation();
  const prefix = i18n.language === "fr" ? "/fr" : "";

  const localePath = (path: string) => {
    if (path.startsWith("/fr")) return path;
    if (path === "/") return prefix || "/";
    return prefix + path;
  };

  return { localePath, prefix };
};

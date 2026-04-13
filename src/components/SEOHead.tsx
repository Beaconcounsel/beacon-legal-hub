import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  titleKey: string;
  descKey: string;
}

const SEOHead = ({ titleKey, descKey }: SEOHeadProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language;
  const basePath = location.pathname.replace(/^\/fr/, "") || "/";
  const enUrl = `https://beaconattorneys.rw${basePath}`;
  const frUrl = `https://beaconattorneys.rw/fr${basePath === "/" ? "" : basePath}`;

  useEffect(() => {
    document.title = t(titleKey);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t(descKey));

    document.documentElement.lang = lang;

    // Manage hreflang tags
    const existingHreflangs = document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach((el) => el.remove());

    const enLink = document.createElement("link");
    enLink.rel = "alternate";
    enLink.hreflang = "en";
    enLink.href = enUrl;
    document.head.appendChild(enLink);

    const frLink = document.createElement("link");
    frLink.rel = "alternate";
    frLink.hreflang = "fr";
    frLink.href = frUrl;
    document.head.appendChild(frLink);

    const defaultLink = document.createElement("link");
    defaultLink.rel = "alternate";
    defaultLink.hreflang = "x-default";
    defaultLink.href = enUrl;
    document.head.appendChild(defaultLink);

    return () => {
      document.querySelectorAll('link[hreflang]').forEach((el) => el.remove());
    };
  }, [t, titleKey, descKey, lang, enUrl, frUrl]);

  return null;
};

export default SEOHead;

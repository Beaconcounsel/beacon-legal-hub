import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.beaconattorneys.rw";
const OG_IMAGE = `${SITE_URL}/beacon-logo.png`;

interface SEOHeadProps {
  titleKey: string;
  descKey: string;
  noindex?: boolean;
  canonicalPath?: string;
}

const setMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
};

const SEOHead = ({ titleKey, descKey, noindex = false, canonicalPath }: SEOHeadProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const lang = i18n.language?.startsWith("fr") ? "fr" : "en";
  const basePath = canonicalPath ?? location.pathname.replace(/^\/fr/, "") || "/";
  const enUrl = `${SITE_URL}${basePath}`;
  const frUrl = `${SITE_URL}/fr${basePath === "/" ? "" : basePath}`;
  const canonical = lang === "fr" ? frUrl : enUrl;

  useEffect(() => {
    const title = t(titleKey);
    const description = t(descKey).replace(/\s+/g, " ").trim().slice(0, 158);

    document.title = title;
    document.documentElement.lang = lang;

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", lang === "fr" ? "fr_FR" : "en_US");
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", OG_IMAGE);

    if (noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }

    setLink("canonical", canonical);
    setLink("alternate", enUrl, "en");
    setLink("alternate", frUrl, "fr");
    setLink("alternate", enUrl, "x-default");
  }, [t, titleKey, descKey, lang, enUrl, frUrl, canonical, noindex]);

  return null;
};

export default SEOHead;

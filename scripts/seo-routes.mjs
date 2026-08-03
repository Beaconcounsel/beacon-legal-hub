// Single source of truth for public, indexable routes.
// Consumed by scripts/generate-sitemap.mjs and scripts/prerender.mjs.

export const SITE_URL = "https://www.beaconattorneys.rw";

// Safety cap so a route explosion can never blow past publish output limits.
export const MAX_PRERENDER_PAGES = 200;

/** Routes excluded from indexing and from prerendering. */
export const NON_INDEXABLE = [
  "/admin",
  "/auth",
  "/unsubscribe",
  "/booking/cancel",
  "/.lovable/",
];

const BASE_ROUTES = [
  { path: "/", titleKey: "seo.landingTitle", descKey: "seo.landingDesc", changefreq: "weekly", priority: "1.0" },
  { path: "/home", titleKey: "seo.homeTitle", descKey: "seo.homeDesc", changefreq: "weekly", priority: "0.9" },
  { path: "/practice-areas", titleKey: "seo.practiceAreasTitle", descKey: "seo.practiceAreasDesc", changefreq: "monthly", priority: "0.8" },
  { path: "/insights", titleKey: "seo.insightsTitle", descKey: "seo.insightsDesc", changefreq: "monthly", priority: "0.8" },
  { path: "/research", titleKey: "seo.researchTitle", descKey: "seo.researchDesc", changefreq: "monthly", priority: "0.8" },
  { path: "/our-approach", titleKey: "seo.approachTitle", descKey: "seo.approachDesc", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", titleKey: "seo.contactTitle", descKey: "seo.contactDesc", changefreq: "monthly", priority: "0.8" },
  { path: "/booking", titleKey: "seo.bookingTitle", descKey: "seo.bookingDesc", changefreq: "monthly", priority: "0.7" },
  { path: "/cookie-policy", titleKey: "cookiePolicy.title", descKey: "cookiePolicy.whatAreCookies.text", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy-policy", titleKey: "privacyPolicy.title", descKey: "privacyPolicy.infoWeCollect.text", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-of-use", titleKey: "termsOfUse.title", descKey: "termsOfUse.acceptance.text", changefreq: "yearly", priority: "0.3" },
];

/** Every public route in both languages. */
export const ROUTES = [
  ...BASE_ROUTES.map((r) => ({ ...r, lang: "en", url: r.path })),
  ...BASE_ROUTES.map((r) => ({
    ...r,
    lang: "fr",
    url: r.path === "/" ? "/fr" : `/fr${r.path}`,
  })),
];

export function absoluteUrl(pathname) {
  return `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
}

/** EN/FR alternates for a given base path. */
export function alternatesFor(basePath) {
  return {
    en: absoluteUrl(basePath),
    fr: absoluteUrl(basePath === "/" ? "/fr" : `/fr${basePath}`),
  };
}

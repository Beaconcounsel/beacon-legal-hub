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
  { path: "/", titleKey: "seo.landingTitle", descKey: "seo.landingDesc", expectedTextKey: "landing.whyBeacon", changefreq: "weekly", priority: "1.0" },
  { path: "/home", titleKey: "seo.homeTitle", descKey: "seo.homeDesc", expectedTextKey: "home.whoWeAre", changefreq: "weekly", priority: "0.9" },
  { path: "/practice-areas", titleKey: "seo.practiceAreasTitle", descKey: "seo.practiceAreasDesc", expectedTextKey: "practiceAreas.heroTagline1", changefreq: "monthly", priority: "0.8" },
  { path: "/insights", titleKey: "seo.insightsTitle", descKey: "seo.insightsDesc", expectedTextKey: "insights.title", changefreq: "monthly", priority: "0.8" },
  { path: "/research", titleKey: "seo.researchTitle", descKey: "seo.researchDesc", expectedTextKey: "research.research", changefreq: "monthly", priority: "0.8" },
  { path: "/our-approach", titleKey: "seo.approachTitle", descKey: "seo.approachDesc", expectedTextKey: "approach.heroTagline", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", titleKey: "seo.contactTitle", descKey: "seo.contactDesc", expectedTextKey: "contact.reachUs", changefreq: "monthly", priority: "0.8" },
  { path: "/booking", titleKey: "seo.bookingTitle", descKey: "seo.bookingDesc", expectedText: "Loading consultation booking", changefreq: "monthly", priority: "0.7" },
  { path: "/cookie-policy", titleKey: "cookiePolicy.title", descKey: "cookiePolicy.whatAreCookies.text", expectedTextKey: "cookiePolicy.title", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy-policy", titleKey: "privacyPolicy.title", descKey: "privacyPolicy.infoWeCollect.text", expectedTextKey: "privacyPolicy.title", changefreq: "yearly", priority: "0.3" },
  { path: "/terms-of-use", titleKey: "termsOfUse.title", descKey: "termsOfUse.acceptance.text", expectedTextKey: "termsOfUse.title", changefreq: "yearly", priority: "0.3" },
];

// Conventional discovery aliases are prerendered but omitted from the sitemap
// because their canonical destination is the authoritative /home page.
const BASE_ALIASES = [
  { path: "/about", section: "about", expectedTextKey: "home.whoWeAre" },
  { path: "/about-us", section: "about", expectedTextKey: "home.whoWeAre" },
  { path: "/team", section: "team", expectedText: "Daniel Mutiganda" },
  { path: "/our-people", section: "team", expectedText: "Daniel Mutiganda" },
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

export const ALIAS_ROUTES = [
  ...BASE_ALIASES.map((r) => ({
    ...r,
    lang: "en",
    url: r.path,
    titleKey: "seo.homeTitle",
    descKey: "seo.homeDesc",
    canonicalPath: "/home",
  })),
  ...BASE_ALIASES.map((r) => ({
    ...r,
    lang: "fr",
    url: `/fr${r.path}`,
    titleKey: "seo.homeTitle",
    descKey: "seo.homeDesc",
    canonicalPath: "/home",
  })),
];

export const PRERENDER_ROUTES = [...ROUTES, ...ALIAS_ROUTES];

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

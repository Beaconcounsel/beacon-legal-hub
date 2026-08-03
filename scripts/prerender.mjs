// Build-time prerendering: renders every public route to static HTML in dist/.
// Runs after `vite build` (client) + `vite build --ssr`.
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";
import { ROUTES, MAX_PRERENDER_PAGES, SITE_URL, absoluteUrl, alternatesFor } from "./seo-routes.mjs";

const OG_IMAGE = `${SITE_URL}/beacon-logo.png`;

// --- browser globals so client-oriented modules can be imported/rendered ---
const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
  url: SITE_URL,
  pretendToBeVisual: true,
});
const g = globalThis;
const define = (key, value) => {
  try {
    Object.defineProperty(g, key, { value, configurable: true, writable: true });
  } catch {
    /* read-only global in this runtime; the jsdom window still provides it */
  }
};
g.window = dom.window;
g.document = dom.window.document;
define("navigator", dom.window.navigator);
define("location", dom.window.location);
g.localStorage = dom.window.localStorage;
g.sessionStorage = dom.window.sessionStorage;
g.HTMLElement = dom.window.HTMLElement;
g.Element = dom.window.Element;
g.Node = dom.window.Node;
g.CustomEvent = dom.window.CustomEvent;
g.Event = dom.window.Event;
g.getComputedStyle = dom.window.getComputedStyle;
g.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
g.cancelAnimationFrame = (id) => clearTimeout(id);
g.matchMedia = () => ({
  matches: false,
  media: "",
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {
    return false;
  },
});
dom.window.matchMedia = g.matchMedia;
g.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};
dom.window.IntersectionObserver = g.IntersectionObserver;
g.ResizeObserver = g.IntersectionObserver;
dom.window.ResizeObserver = g.ResizeObserver;
g.scrollTo = () => {};
dom.window.scrollTo = g.scrollTo;

const translations = {
  en: JSON.parse(readFileSync(resolve("src/i18n/en.json"), "utf8")),
  fr: JSON.parse(readFileSync(resolve("src/i18n/fr.json"), "utf8")),
};

function tr(lang, key) {
  const lookup = (obj) => key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
  const value = lookup(translations[lang]) ?? lookup(translations.en);
  return typeof value === "string" ? value : "";
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function clamp(text, max = 158) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

const PEOPLE_JSONLD = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daniel Mutiganda",
    jobTitle: "Lead Partner",
    worksFor: { "@type": "LegalService", name: "Beacon Attorneyes and Consultants", url: SITE_URL },
    url: `${SITE_URL}/home#team`,
    knowsAbout: ["Corporate Law", "Transactions", "Cross-Border Advisory"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Moses Katusime",
    jobTitle: "Senior Partner",
    worksFor: { "@type": "LegalService", name: "Beacon Attorneyes and Consultants", url: SITE_URL },
    url: `${SITE_URL}/home#team`,
    knowsAbout: ["Legal & Corporate Governance", "Project Finance", "Construction Arbitration"],
  },
]);

function headFor(route) {
  const title = tr(route.lang, route.titleKey);
  const description = clamp(tr(route.lang, route.descKey));
  const canonical = absoluteUrl(route.url);
  const alt = alternatesFor(route.path);
  const tags = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="en" href="${alt.en}" />`,
    `<link rel="alternate" hreflang="fr" href="${alt.fr}" />`,
    `<link rel="alternate" hreflang="x-default" href="${alt.en}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${route.lang === "fr" ? "fr_FR" : "en_US"}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  if (route.path === "/home") {
    tags.push(`<script type="application/ld+json">${PEOPLE_JSONLD}</script>`);
  }
  return tags.join("\n    ");
}

function applyHead(template, route) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:(title|description|url|type|image|locale)"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:(card|title|description|image)"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");
  return html.replace("</head>", `  ${headFor(route)}\n  </head>`);
}

async function main() {
  const serverEntry = resolve("dist/server/entry-server.js");
  if (!existsSync(serverEntry)) {
    throw new Error("Missing dist/server/entry-server.js — run the SSR build first.");
  }
  const template = readFileSync(resolve("dist/index.html"), "utf8");
  const { render } = await import(pathToFileURL(serverEntry).href);

  const routes = ROUTES.slice(0, MAX_PRERENDER_PAGES);
  if (ROUTES.length > MAX_PRERENDER_PAGES) {
    console.warn(`[prerender] capped at ${MAX_PRERENDER_PAGES} of ${ROUTES.length} routes`);
  }

  for (const route of routes) {
    const appHtml = await render(route.url);
    const html = applyHead(template, route).replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );
    const outFile =
      route.url === "/" ? resolve("dist/index.html") : resolve(`dist${route.url}/index.html`);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html);
    console.log(`[prerender] ${route.url} -> ${outFile.replace(resolve("."), ".")}`);
  }
  // The SSR bundle is a build artefact only — keep it out of the published output.
  rmSync(resolve("dist/server"), { recursive: true, force: true });
  console.log(`[prerender] ${routes.length} pages written`);
}

main().catch((error) => {
  console.error("[prerender] failed:", error);
  process.exit(1);
});

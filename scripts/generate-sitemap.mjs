// Regenerates public/sitemap.xml from the shared route list.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROUTES, absoluteUrl } from "./seo-routes.mjs";

const urls = ROUTES.map((r) =>
  [
    "  <url>",
    `    <loc>${absoluteUrl(r.url)}</loc>`,
    `    <changefreq>${r.changefreq}</changefreq>`,
    `    <priority>${r.priority}</priority>`,
    "  </url>",
  ].join("\n"),
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`[sitemap] wrote ${ROUTES.length} entries`);

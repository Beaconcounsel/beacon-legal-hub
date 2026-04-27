import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import en from "../i18n/en.json";
import fr from "../i18n/fr.json";

/**
 * Brand naming guard.
 *
 * Source of truth: the firm name MUST be spelled "Beacon Attorneys"
 * (never "Attorneyes", "Beacon Attorney", "Beacon-Attorneys", etc.) in
 * every page title, meta description, OpenGraph field and translation
 * key — in both English and French.
 */

const BRAND = "Beacon Attorneys";
const FORBIDDEN_SPELLINGS = [
  /Attorneyes/i,        // legacy typo
  /Beacon\s+Attorney\b(?!s)/i, // singular
  /Beacon-Attorneys/i,  // hyphenated
  /BeaconAttorneys/,    // collapsed (excluding URLs/handles handled below)
];

type Dict = Record<string, unknown>;

/** Walk an i18n dictionary and return [keyPath, value] pairs for strings. */
function flatten(obj: Dict, prefix = ""): Array<[string, string]> {
  const out: Array<[string, string]> = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") out.push([path, v]);
    else if (v && typeof v === "object") out.push(...flatten(v as Dict, path));
  }
  return out;
}

/** Strings that legitimately use lowercase compact form (URLs, emails, handles). */
function isAllowedCompactUsage(value: string): boolean {
  return /beaconattorneys\.(rw|com)|@beaconattorneys|linkedin\.com\/company\/beaconattorneys|x\.com\/beaconattorneys|instagram\.com\/beaconattorneys/i.test(
    value,
  );
}

/** Assert that a single string never uses a forbidden spelling. */
function assertBrandSpelling(label: string, value: string) {
  for (const pattern of FORBIDDEN_SPELLINGS) {
    if (pattern.source === "BeaconAttorneys" && isAllowedCompactUsage(value)) {
      // Strip allowed compact usages before testing the collapsed pattern
      const stripped = value
        .replace(/beaconattorneys\.(rw|com)/gi, "")
        .replace(/@beaconattorneys/gi, "")
        .replace(/(linkedin\.com\/company|x\.com|instagram\.com)\/beaconattorneys/gi, "");
      if (pattern.test(stripped)) {
        throw new Error(`[${label}] forbidden spelling "${pattern}" in: ${value}`);
      }
      continue;
    }
    if (pattern.test(value)) {
      throw new Error(`[${label}] forbidden spelling matched ${pattern}: ${value}`);
    }
  }
}

describe("Brand naming — Beacon Attorneys", () => {
  describe.each([
    ["en", en as Dict],
    ["fr", fr as Dict],
  ])("%s translations", (lang, dict) => {
    const entries = flatten(dict);

    it("contains no forbidden spellings anywhere in the dictionary", () => {
      for (const [path, value] of entries) {
        assertBrandSpelling(`${lang}:${path}`, value);
      }
    });

    it("uses the canonical spelling in every SEO title and description", () => {
      const seo = (dict.seo ?? {}) as Record<string, string>;
      const seoKeys = Object.keys(seo);
      expect(seoKeys.length, `${lang}: seo block must not be empty`).toBeGreaterThan(0);

      for (const key of seoKeys) {
        const value = seo[key];
        expect(value, `${lang}.seo.${key} must be a non-empty string`).toBeTruthy();
        // Every SEO *title* must include the brand. Descriptions are
        // only spell-checked (some focus on services/keywords by design).
        if (/Title$/.test(key)) {
          expect(
            value.includes(BRAND),
            `${lang}.seo.${key} must contain "${BRAND}". Got: "${value}"`,
          ).toBe(true);
        }
        assertBrandSpelling(`${lang}.seo.${key}`, value);
      }
    });

    it("uses the canonical spelling in the footer copyright", () => {
      const copyright = (dict.footer as Record<string, string> | undefined)?.copyright;
      expect(copyright, `${lang}.footer.copyright is required`).toBeTruthy();
      expect(copyright!.includes(BRAND)).toBe(true);
      assertBrandSpelling(`${lang}.footer.copyright`, copyright!);
    });
  });

  describe("index.html static head tags", () => {
    const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");

    const pickContent = (tagRegex: RegExp): string | null => {
      const m = html.match(tagRegex);
      return m ? m[1] : null;
    };

    const fields: Array<[string, RegExp]> = [
      ["<title>", /<title>([^<]+)<\/title>/i],
      ["meta name=description", /<meta\s+name="description"\s+content="([^"]+)"/i],
      ["meta og:title", /<meta\s+property="og:title"\s+content="([^"]+)"/i],
      ["meta og:description", /<meta\s+property="og:description"\s+content="([^"]+)"/i],
    ];

    it.each(fields)("%s contains the canonical brand name", (label, regex) => {
      const value = pickContent(regex);
      expect(value, `${label} must be present in index.html`).toBeTruthy();
      assertBrandSpelling(`index.html ${label}`, value!);
      // og:description is a tagline and may omit the brand; the rest must include it.
      if (label !== "meta og:description") {
        expect(
          value!.includes(BRAND),
          `${label} must include "${BRAND}". Got: "${value}"`,
        ).toBe(true);
      }
    });
  });
});

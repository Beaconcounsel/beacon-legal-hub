# SEO + Prerendering Implementation

Goal: make every public page return real HTML with correct, page-specific metadata to crawlers, on one canonical hostname.

## 1. Build-time prerendering
- Add a post-build prerender script (`scripts/prerender.mjs`) that boots the built app in a headless DOM/browser, visits every public route (EN and FR), and writes a static `index.html` per route into `dist/`.
- Route list is generated from the same source used by the sitemap so the two never drift.
- Hard cap the number of generated files to stay well under publish limits (routes are ~22, so no risk).
- Wire it into `package.json` as part of `build`, after the existing WhatsApp audit.

## 2. Per-page head metadata
- Extend `SEOHead` so each route sets its own `<title>`, `<meta name="description">`, `<link rel="canonical">`, and `og:*`/`twitter:*` tags from the EN/FR translation files.
- Canonical and `og:url` self-reference the current page (with `/fr` prefix for French), and hreflang alternates stay in place.
- Remove the sitewide static title/description conflict in `index.html` by leaving it as fallback only.

## 3. Single canonical hostname
- Standardise on `https://www.beaconattorneys.rw` across canonical tags, og:url, sitemap, robots, and JSON-LD (currently a mix of apex and Lovable URLs).

## 4. robots.txt and sitemap.xml
- Fix the stale `Sitemap:` line in `robots.txt` (it points at `beacon-legal-hub.lovable.app`) and disallow non-indexable routes (`/admin`, `/auth`, `/unsubscribe`, `/booking/cancel`, `/.lovable/`).
- Regenerate `sitemap.xml` from the shared route list, keep EN/FR entries, and omit `lastmod` since there is no authoritative per-page timestamp.

## 5. Structured data
- Keep and correct the `LegalService` JSON-LD in `index.html` (canonical URL, opening hours matched to the site's 9:00–16:00 footer hours).
- Add `Person` JSON-LD for the attorneys listed on the Our People page, injected per-page.

## 6. Verification
- Run the build, then fetch several prerendered pages with a JS-less request (plain curl on the built output) and confirm each returns real body copy plus its own title, description, and canonical.
- Confirm the WhatsApp audit and existing tests still pass.

## Technical notes
- Prerendering runs against the Vite build output only; no framework migration and no changes to app routing or business logic.
- French routes prerender with the `/fr` prefix already defined in `App.tsx`.
- Note: this gives crawlers real HTML for static content; data loaded from the backend at runtime still hydrates client-side.

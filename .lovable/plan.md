# Make site content reliably accessible to non-JavaScript fetchers

## Confirmed current state

- The live homepage returns about 36 KB of HTML with visible firm content inside `#root` before JavaScript runs.
- The live `/practice-areas` page returns about 64 KB of HTML with its full visible copy inside `#root`.
- The build already prerenders the listed English and French routes and generates route-specific metadata.
- Conventional URLs a research tool may guess—such as `/about`, `/about-us`, `/team`, and `/our-people`—are not currently registered or prerendered.

## Implementation

1. **Add crawlable content aliases**
   - Support conventional About and Team/Our People URLs in English and French.
   - Render meaningful HTML at those URLs without requiring JavaScript.
   - Point their canonicals to the authoritative page so aliases do not create duplicate-content SEO issues.

2. **Improve machine-readable discovery**
   - Add the new accessible URLs to the centralized route/prerender configuration where appropriate.
   - Keep sitemap, canonical, alternate-language, and prerender output synchronized from the same route definitions.
   - Add a concise `llms.txt` discovery document linking to the authoritative About, Practice Areas, Our People, Research, Approach, and Contact content.

3. **Prevent regressions**
   - Add a build-time assertion that every public route produces a non-empty `#root` with a minimum amount of meaningful text—not just metadata or an app shell.
   - Check representative page-specific headings so an incorrect fallback page cannot pass the audit.

4. **Verify the deployed result**
   - Validate the built HTML for homepage, About, Practice Areas, Our People, and French equivalents with JavaScript disabled.
   - After publishing, fetch the custom-domain URLs directly and confirm status, canonical, response size, and visible body text.

## Technical notes

- Preserve the current React/Vite architecture and existing prerender pipeline.
- Do not rely on browser execution, delayed rendering, or client-side redirects for crawler-facing content.
- Keep `https://www.beaconattorneys.rw` as the sole canonical hostname.
- A third-party fetcher may cache an earlier response; the final verification will distinguish site output from tool-side caching or extraction limitations.
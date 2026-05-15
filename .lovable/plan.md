## Plan: Add sitemap.xml and update robots.txt

### Files to create/modify

1. **Create `public/sitemap.xml`** — static XML sitemap listing all public routes (English + French), using `https://beaconattorneys.rw` as the base URL.

2. **Update `public/robots.txt`** — keep existing `User-agent` blocks, append a `Sitemap:` directive pointing to `https://beaconattorneys.rw/sitemap.xml`.

### Routes to include

Public, indexable routes from `src/App.tsx` (omit `/auth`, `/admin`, `/booking/cancel`, and `*`):

English:
- `/`
- `/home`
- `/practice-areas`
- `/insights`
- `/research`
- `/our-approach`
- `/contact`
- `/booking`
- `/cookie-policy`
- `/privacy-policy`
- `/terms-of-use`

French equivalents:
- `/fr`, `/fr/home`, `/fr/practice-areas`, `/fr/insights`, `/fr/research`, `/fr/our-approach`, `/fr/contact`, `/fr/booking`, `/fr/cookie-policy`, `/fr/privacy-policy`, `/fr/terms-of-use`

### Notes

- Static file (no generator script) since routes are fully static.
- `/` gets priority 1.0 / weekly; legal pages get lower priority (0.3 / yearly); main content pages 0.8 / monthly.
- No code changes outside `public/`.

## Goal
Replace the partners landing/hero photo on the home/About section with the uploaded Scrabble "TEAMWORK" image, keeping all other content and styling untouched.

## Where it lives
- Rendered in `src/pages/Index.tsx` (top hero, ~lines 82–89) via `<ResponsiveImage source={partnersHeroImage} ... />`.
- `partnersHeroImage` is defined in `src/assets/optimized/index.ts` (line 107) and built from files named `partners-hero-{640,960,1280,1600,1920}.{avif,webp,jpg}` in `src/assets/optimized/`.
- Original source: `src/assets/partners-hero.jpg`.
- No other page imports `partnersHeroImage`.

## Steps
1. Copy `user-uploads://image-2.png` into the project as `src/assets/partners-hero.jpg` (overwriting), so all existing imports keep working with no code changes.
2. Use `sharp` to regenerate the responsive variants into `src/assets/optimized/`, overwriting the existing files:
   - Widths: 640, 960, 1280, 1600, 1920
   - Formats: AVIF (q≈55), WebP (q≈78), JPG (q≈82)
3. No edits to `Index.tsx`, `optimized/index.ts`, or any component — the bundle picks up the new bytes automatically.
4. Verify the preview shows the TEAMWORK photo at the top of `/`, responsive and crisp.

## Note on framing
The hero renders at ~35vw with `object-contain` against a navy background, so the landscape Scrabble photo will fit without crop or distortion. Alt text remains the current partners copy (no styling/copy changes per your instructions).
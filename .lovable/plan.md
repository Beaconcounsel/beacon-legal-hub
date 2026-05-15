## Plan: Replace favicon with Beacon logo circles

1. **Generate favicon image** using `imagegen--edit_image` on `src/assets/optimized/beacon-logo-380.png` with prompt to extract only the large dark teal circle (bottom) and small yellow dot (top), keeping clear space between them, no text/letters, on a transparent background. Save as `public/favicon.png` (square, optimized for 32×32 / 16×16 readability — bold simple shapes).
2. **Delete** the existing `public/favicon.ico` so it doesn't override the new one.
3. **Update `index.html`** `<link rel="icon">` to point to `/favicon.png` with `type="image/png"`.
4. **Verify** by viewing the generated PNG to confirm it shows just the two circles with proper spacing and renders clearly at small sizes.

No other site changes.
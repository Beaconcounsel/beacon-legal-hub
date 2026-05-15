The current `public/favicon.png` has the two circles small inside a large transparent canvas, so it renders tiny in the browser tab compared to Lovable's favicon, which fills its canvas edge-to-edge.

## Plan

1. Regenerate `public/favicon.png` via `imagegen--edit_image` from the existing favicon, instructing it to scale the two-circle composition up so the shapes fill the square canvas with only a small uniform margin (matching how the Lovable favicon fills its canvas). Keep transparent background, no text, clear gap between the dot and the large circle.
2. Verify visually that the circles now occupy the full canvas.
3. No other changes — `index.html` already points at `/favicon.png`.
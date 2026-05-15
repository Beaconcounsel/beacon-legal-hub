## Plan: Double the favicon shape size

The current favicon has ~6% transparent padding around the two circles. Doubling the shape size means removing that padding entirely so the artwork fills the canvas edge-to-edge (the large dark circle touches the bottom/sides; the gold dot sits at the top with the gap between them preserved).

1. Re-crop `public/favicon.png` tightly to the alpha bounding box (no padding) and re-export at 512×512.
2. Regenerate `public/favicon.ico` from the new PNG with sizes 16/32/48 so the bigger artwork carries through to small browser tab sizes.
3. Cache-bust in `index.html` by appending `?v=2` to the `<link rel="icon">` hrefs so browsers pick up the new files immediately.
4. Verify by zooming into the new 16/32 px renders.
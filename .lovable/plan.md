## Issue
The hero now uses `object-cover` with `object-center`, which crops the image to fill the 70vh × 100vw section. The "TEAMWORK" letters sit in the upper-left third of the photo, so center-cropping cuts them off at most viewports.

## Fix
Keep the image filling the section, but anchor the crop to the area that contains the Scrabble letters so they remain visible at every viewport.

In `src/pages/Index.tsx`, change the image className from:

```
w-full h-full object-cover object-center block
```

to:

```
w-full h-full object-cover object-[30%_30%] block
```

`object-[30%_30%]` shifts the focal point toward the upper-left where the TEAMWORK tiles live, so wide and narrow viewports both keep the word in frame.

No other layout, sizing, or content changes.
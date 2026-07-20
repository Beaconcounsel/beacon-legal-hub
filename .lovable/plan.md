Replace the old office address ("KG 190 St, RIM House, 1st Floor, Kigali, Rwanda") with the new one — **KK 698 St, 2nd Floor, Gikondo Business Center, Kigali, Rwanda** — everywhere it appears on the site.

## Files to update

1. `src/i18n/en.json`
   - `footer.address` → new address
   - Privacy Policy contact block (line ~582) → new address
2. `src/i18n/fr.json`
   - `footer.address` → `KK 698 St, 2e étage, Gikondo Business Center, Kigali, Rwanda`
   - Privacy Policy contact block → French version
3. `src/components/Footer.tsx` — update the Google Maps href to the new address
4. `src/pages/Contact.tsx` — update the visible MapPin text and Google Maps href

## Google Maps link format

`https://www.google.com/maps/search/KK+698+St,+Gikondo+Business+Center,+Kigali,+Rwanda`

## Out of scope

- Marketing copy that only mentions "Kigali, Rwanda" (city, not street) stays as is.
- No changes to booking timezone strings, SEO meta descriptions, or image assets.

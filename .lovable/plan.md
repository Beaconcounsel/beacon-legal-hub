# WhatsApp Integration Plan

Integrate WhatsApp into existing CTA sections and the footer only. No floating button, no popup, no chat bubble.

## Configuration

- **Number:** `250788559603` (same as footer phone)
- **Display:** `+250 788 55 96 03`
- **Pre-filled message:** `"Hello Beacon Attorneys and Consultants. I visited your website and would like to request a consultation regarding [briefly describe your legal matter]."` (URL-encoded)
- **Link format:** `https://wa.me/250788559603?text=<encoded>`
- **Opens:** new tab, `rel="noopener noreferrer"`

## New shared module

Create `src/lib/whatsapp.ts`:
- Exports `WHATSAPP_NUMBER`, `WHATSAPP_DISPLAY`, `buildWhatsAppUrl(customMessage?)`, `trackWhatsAppClick(source)`.
- `trackWhatsAppClick` fires `window.dataLayer.push({ event: 'whatsapp_cta_click', source })` if `dataLayer` exists, and a `gtag('event', ...)` fallback. No conversation content is captured.

Create `src/components/WhatsAppIcon.tsx` — a small SVG using the recognised WhatsApp glyph, `currentColor` fill, so it inherits existing footer/CTA colours (WhatsApp green `#25D366` used only on the icon fill where explicitly opted in).

Create `src/components/WhatsAppLink.tsx` — thin `<a>` wrapper that composes the URL, adds `aria-label`, calls `trackWhatsAppClick(source)` on click, and accepts `variant: "button" | "icon" | "inline"`.

## Files to edit

### 1. `src/components/Footer.tsx`
- Add WhatsApp icon to the existing social row (LinkedIn / X / Instagram) — same size (`w-4 h-4`), same hover (`text-ivory/70 hover:text-gold`), so it doesn't add a new row.
- Add a second WhatsApp line inside the Contact list under the phone entry: WhatsApp icon + `+250 788 55 96 03` linking to `wa.me/...`, matching the styling of the phone `<li>`. `source: "footer"`.
- Accessible label: `"Contact Beacon Attorneys on WhatsApp"`.

### 2. `src/components/BookConsultation.tsx` (the sitewide consultation CTA above the footer)
- Under the primary gold "Book a Consultation" button (initial collapsed state), add a secondary WhatsApp link: `Chat on WhatsApp` with the WhatsApp glyph, styled as a subtle outline/ghost link in brand colours (not green button). Small, secondary to the gold CTA. `source: "consultation_section"`.
- Add discreet disclaimer below the contact options: *"Sending a message does not create a lawyer-client relationship. Please do not send confidential or sensitive information until the firm confirms that it is able to act for you."* Small muted text.
- Add i18n keys for both strings (EN + FR) in `src/i18n/en.json` and `src/i18n/fr.json` under `bookConsult`.

### 3. `src/pages/Contact.tsx`
- Inside the existing contact methods block, add "Chat on WhatsApp" as a secondary CTA alongside the email/phone/form entries. `source: "contact_page"`.
- Include the same discreet disclaimer once at the bottom of the contact methods block.

### 4. `src/components/LeadFormDialog.tsx` (used across Practice Areas & other pages as the primary CTA)
- Inside the dialog, below the form's submit button, add a small "or Chat on WhatsApp" secondary link. `source: "lead_dialog"` (dynamically appended with the `sourcePage` prop when present, e.g. `lead_dialog:practice-areas`).

### 5. `src/components/Header.tsx` (mobile menu only)
- In the existing mobile nav sheet, add a "Chat on WhatsApp" row alongside existing menu items — not floating, part of the menu list. `source: "mobile_menu"`. Desktop header is untouched.

## Explicitly not doing

- No floating button, sticky bubble, popup, or standalone widget.
- No changes to existing phone `tel:` links, email links, contact form, or unrelated sections.
- No new footer row (icon slots into existing social row + one extra list item in the already-present contact list).
- Not replacing WhatsApp as the primary CTA anywhere — it is always secondary to the existing consultation/contact primary action.

## i18n keys added

```
bookConsult.whatsappCta        "Chat on WhatsApp" / "Discuter sur WhatsApp"
bookConsult.disclaimer         full disclaimer (EN + FR translation)
contact.whatsappCta            same
footer.whatsappLabel           "Contact Beacon Attorneys on WhatsApp"
```

## Verification

1. Build passes.
2. Playwright: load `/`, `/contact`, `/practice-areas`; assert one WhatsApp link per surface, `href` starts with `https://wa.me/250788559603?text=`, target `_blank`. Confirm no fixed/floating element with the WhatsApp icon in the DOM (`position: fixed` scan).
3. Screenshots at 1440 / 768 / 390 confirming footer icon alignment and secondary CTA placement.

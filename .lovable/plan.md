Apply the new WhatsApp message template across every WhatsApp CTA on the site.

- In `src/lib/whatsapp.ts`:
  - Replace `DEFAULT_WHATSAPP_MESSAGE` with:
    `Hello Beacon Attorneys, I visited your website, and would like guidance your on legal issue I have, when can you be available for discussion?`
  - Update all `WHATSAPP_MESSAGES` entries (`homepage`, `practiceAreas`, `corporateCommercial`, `employmentLaw`, `intellectualProperty`, `disputeResolution`, `contact`) to use the same new message template.
- Ensure `getWhatsAppMessage()` and `buildWhatsAppUrl()` / `buildWhatsAppDeepLink()` use the updated default message, so the footer, mobile menu, homepage, contact page, and practice-area CTAs all send the same pre-filled text.
- Run the build and the WhatsApp audit (`scripts/audit-whatsapp.mjs`) to verify no forbidden hosts are introduced and the project compiles.
- Verify the updated message appears on every WhatsApp CTA across the site.
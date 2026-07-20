## Plan

### Goal
Make the footer contact icons uniform and visually balanced, widen the contact section so it extends leftward and creates more space between the contacts list and legal resources, and remove the word “WhatsApp” from the WhatsApp contact row so only the icon and the number remain.

### What we know
- `src/components/Footer.tsx` uses a 4-column grid (`md:grid-cols-4 gap-5`).
- Columns: (1) social icons, (2) contact list, (3) legal resources, (4) careers.
- The WhatsApp row currently shows: `<WhatsAppIcon className="w-4 h-4 text-gold" />` + `<WhatsAppLink ...><span className="text-xs">WhatsApp {WHATSAPP_DISPLAY}</span></WhatsAppLink>`.
- `src/components/WhatsAppLink.tsx` defaults the icon to `w-5 h-5` unless overridden by `iconClassName`.

### Changes
1. **Remove the WhatsApp wording**
   - In the contact list, change the WhatsApp row label from `WhatsApp {WHATSAPP_DISPLAY}` to just `{WHATSAPP_DISPLAY}`.
   - Keep the WhatsApp icon and the clickable `WhatsAppLink` wrapper; do not change the deep-link or tracking behavior.

2. **Standardize icon sizing in the contact list**
   - Ensure MapPin, Phone, WhatsAppIcon, and Mail all use the same `w-4 h-4` class.
   - Verify each icon row uses `items-center` so every icon sits on the same baseline as its label text.
   - Ensure `WhatsAppLink` in the footer receives the same `iconClassName` size if it renders its own icon.

3. **Widen the contact column and add separation from legal resources**
   - Change the footer grid from `md:grid-cols-4 gap-5` to an asymmetric layout that gives the contact list more horizontal room.
   - Proposed option: `md:grid-cols-[1.25fr_1.75fr_1fr_1fr] gap-8` so the contact column extends leftward and the gap between it and legal resources grows.
   - Fallback if needed: keep 4 columns but give the contact list `md:col-span-2` and legal resources `md:col-span-1`, while moving the social icons above the contact heading on desktop.

4. **Keep functionality intact**
   - Preserve all existing links, WhatsApp tracking attributes, `LeadFormDialog`, `useLocalizedPath`, translations, and cookie-consent footer.
   - Do not touch the WhatsApp deep-link logic in `src/lib/whatsapp.ts` beyond the icon class override.

5. **Verify responsive layout**
   - Check mobile stack: icons and text remain aligned, no horizontal overflow.
   - Confirm the footer still passes the WhatsApp host audit and TypeScript build.

### Files to edit
- `src/components/Footer.tsx` (primary)
- `src/components/WhatsAppLink.tsx` (only if needed to harden icon override)

### Acceptance criteria
- The WhatsApp contact row shows only the WhatsApp icon followed by the phone number, with no “WhatsApp” text.
- All four contact icons look identical in size and are perfectly aligned with their text labels.
- Visible extra horizontal space between the contact list and the legal resources column.
- Layout is balanced and professional at 1440px, 768px, and 390px viewports.
- Build passes and WhatsApp audit passes with zero violations.
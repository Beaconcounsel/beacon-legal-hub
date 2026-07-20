Increase the size of all contact icons (location, WhatsApp, phone, email) so they are clearly visible, especially on the footer and Contact page.

Scope
- Footer contact list (MapPin, Phone, WhatsApp, Mail)
- WhatsAppLink default icon size
- Contact page contact-card icons
- Ensure the phone number remains a clickable link and visible alongside the WhatsApp icon

Plan
1. Audit existing contact icon sizes
   - Footer: `w-3.5 h-3.5` (14px)
   - WhatsAppLink default: `w-4 h-4` (16px)
   - Contact page: `w-5 h-5` (20px)

2. Increase sizes by ~30% and improve consistency
   - Footer icons: `w-4.5 h-4.5` (18px) with a slightly heavier stroke feel via the surrounding text
   - WhatsAppLink default icon: `w-5 h-5` (20px)
   - Contact page card icons: `w-6 h-6` (24px)
   - Keep icons aligned with their text baselines

3. Update the footer address link
   - Ensure the address text is clickable and uses the correct Google Maps query
   - Keep the phone number as a visible `tel:` link so it is not hidden only behind the icon

4. Verify the audit stays green
   - Run the WhatsApp host audit to make sure no forbidden strings are introduced
   - Build the project to catch any Tailwind/TypeScript errors

Files to edit
- `src/components/Footer.tsx`
- `src/components/WhatsAppLink.tsx`
- `src/pages/Contact.tsx`
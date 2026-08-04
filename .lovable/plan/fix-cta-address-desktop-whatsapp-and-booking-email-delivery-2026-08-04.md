# Fix CTA address, desktop WhatsApp, and booking email delivery

## 1. Wrong office address in email/CTA footers

The website footer and Contact page already use the correct address (KK 698 St, 2nd Floor, Gikondo Business Center, Kigali, Rwanda). The outdated "KG 190 St, RIM House, 1st Floor" still appears in the footers of the emails your CTA sends:

- Booking confirmation (EN and FR)
- Lead/inquiry confirmation (EN and FR)
- All six account/auth emails (signup, magic link, recovery, invite, email change, reauthentication)

Fix: replace every occurrence with the website address, then redeploy the affected email functions so live emails pick it up.

## 2. WhatsApp CTA works on phone but not on desktop

Cause: on desktop the link handler currently cancels the normal link and forces the `whatsapp://` app protocol. If WhatsApp Desktop is not installed (or the browser blocks the protocol), nothing happens — exactly the behaviour you see.

Fix:

- Let the link open normally in a new tab on desktop (wa.me handles the handoff to WhatsApp Web or the desktop app).
- Keep the app deep link only as a user-triggered fallback, not an automatic hijack.
- Add a small fallback line next to the desktop CTA ("Trouble opening WhatsApp? Copy +250 788 55 96 03") so a blocked handoff never leaves the visitor stuck.
- Mobile behaviour stays exactly as it is today.

## 3. Booking appointment emails not reaching Beacon mailboxes

Checked the send log: the latest booking on 4 Aug sent both emails successfully — the client confirmation and the notification to [mutidan@beaconattorneys.rw](mailto:mutidan@beaconattorneys.rw) are both recorded as sent with no errors, and neither address is on the suppression list. The emails are leaving the system; they are being filtered or landing somewhere other than the mailbox you are watching.

Actions:

- Send booking and inquiry notifications to both `mutidan@beaconattorneys.rw` and `mutidan@gmail.com` so they reach the shared firm inbox as well as the personal one.
- Run a live test booking after the change and report the exact delivery status per recipient.
- If a recipient still reports nothing while the log says sent, the message is being caught by mailbox-side spam/routing rules; I'll tell you exactly which sender to whitelist.

## Technical notes

- Templates: `supabase/functions/_shared/transactional-email-templates/*.tsx` and `_shared/email-templates/*.tsx` — address string swap only.
- Recipients: `ADMIN_EMAIL` in `create-booking`, `cancel-booking`, `send-lead-email` becomes a recipient list; one send per recipient with distinct idempotency keys.
- WhatsApp: `src/components/WhatsAppLink.tsx` — drop the desktop `preventDefault` deep-link override; the `wa.me` primary href stays, so the build-time WhatsApp host audit still passes.
- Redeploy `create-booking`, `cancel-booking`, `send-lead-email`, `send-transactional-email`, `auth-email-hook` after the edits.
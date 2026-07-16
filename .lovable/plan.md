# Finish Resend wiring

Domain is verified on your side. Two things left:

## 1. Add the Resend API key

I'll request `RESEND_API_KEY` via the secure secret form. You paste the key from Resend → API Keys (Sending access) once and it's stored server-side for the edge function. Nothing to copy into code.

## 2. Verify end-to-end

Once the key is saved I'll:

- Confirm the `send-lead-email` edge function is deployed with the latest code.
- Send a test submission through the live site (Contact page form) using Playwright.
- Check the `leads` table row was created with `email_status = 'sent'`.
- Check function logs for the Resend response.
- Confirm both the notification (to mutidan@gmail.com) and the auto-reply were accepted by Resend.

If anything fails (e.g. `from` domain mismatch, DNS not fully propagated), I'll surface the exact Resend error and fix it.

## Nothing else changes

No new features, no UI changes. The forms, table, and function are already in place from the previous step — this just activates delivery.
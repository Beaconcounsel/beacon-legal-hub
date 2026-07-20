
## Goal

Make the "Book a Consultation" and Contact form actually deliver email — to the visitor and to `mutidan@gmail.com` — from your own domain `beaconattorneys.rw`, replacing the currently-broken Resend path (Resend is returning 403 "domain not verified").

## What the user will see

Emails will arrive from:

```
Beacon Attorneyes & Consultants <noreply@beaconattorneys.rw>
```

Technically sent through a delegated subdomain (e.g. `notify.beaconattorneys.rw`) that Lovable manages. Your regular mailboxes on `beaconattorneys.rw` are untouched.

## Plan

### 1. Set up the email domain (one-time, requires you)

Open the email setup dialog and enter `beaconattorneys.rw`. Lovable will show a small set of **NS records** to add at your DNS provider (Cloudflare) for the delegated subdomain. You add them; DNS verification usually completes within minutes to a few hours.

You don't need Resend, SPF, or DKIM records — Lovable manages them inside the delegated subdomain.

### 2. Set up email infrastructure

Once the domain is added, Lovable provisions the sending queue, retry logic, delivery log, suppression list, and unsubscribe handling automatically. No action from you.

### 3. Migrate the lead form off Resend

- Scaffold app email templates (branded to Beacon: navy + gold, serif headings) for:
  - **Lead confirmation** — sent to the visitor who submitted the form.
  - **Lead notification** — sent to `mutidan@gmail.com` with the full submission.
- Update `supabase/functions/send-lead-email/index.ts` to enqueue via the Lovable send function instead of calling Resend directly. The lead row still gets inserted first (source of truth), then two emails are enqueued using an idempotency key derived from the lead ID.
- Keep the existing 200/400/500 response contract so `LeadForm.tsx` needs no changes.

### 4. Migrate booking notifications

- `supabase/functions/create-booking/index.ts` and `cancel-booking/index.ts` currently rely on Resend / Gmail-through-Google-OAuth. Switch the booking + cancellation notifications (to client and to admin) to Lovable Emails templates so delivery no longer depends on the Google OAuth connection or Resend verification.

### 5. Verify end-to-end

- Submit a real lead through the Contact form and Book a Consultation flow in the sandbox.
- Confirm the `leads` row is inserted, both emails show `sent` in the delivery log, and inboxes receive them.
- Test a booking + cancellation the same way.

## What you need to do vs what I do

**You:**
1. Click "Set up email domain" and enter `beaconattorneys.rw`.
2. Add the NS records Lovable shows you at Cloudflare (grey cloud / DNS only — no proxy on NS records).
3. Tell me when it's added — I'll pick up from there.

**Me (once DNS is added):**
- Scaffold branded templates, rewrite the three edge functions to use Lovable Emails, deploy, and verify delivery.

## Notes / trade-offs

- The current `RESEND_API_KEY` secret becomes unused after migration. We can leave it in place or delete it once everything is verified.
- If you'd rather keep Resend, the only fix is verifying `beaconattorneys.rw` inside the Resend workspace that owns your API key — that happens in the Resend dashboard, not in code. Lovable Emails is the more reliable option since everything is managed inside this project.

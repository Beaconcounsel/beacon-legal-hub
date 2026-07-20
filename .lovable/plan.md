Replace the notification destination address `mutidan@gmail.com` with `mutidan@beaconattorneys.rw` across all lead and booking flows.

## What will change

1. **Lead notifications** — `send-lead-email` edge function will send owner notifications to `mutidan@beaconattorneys.rw`.
2. **Booking notifications** — `create-booking` edge function will send new-booking owner alerts to `mutidan@beaconattorneys.rw`.
3. **Cancellation alerts** — `cancel-booking` edge function will send owner cancellation notices to `mutidan@beaconattorneys.rw` (note: the *From* address remains the connected Google Calendar account, because this function sends via Gmail; only the recipient changes).
4. **Admin page UI copy** — `src/pages/Admin.tsx` will display `mutidan@beaconattorneys.rw` as the expected admin email and Google account hint.

## Files to edit

- `supabase/functions/send-lead-email/index.ts` — change `ADMIN_EMAIL` constant.
- `supabase/functions/create-booking/index.ts` — change `ADMIN_EMAIL` constant.
- `supabase/functions/cancel-booking/index.ts` — change `ADMIN_EMAIL` constant.
- `src/pages/Admin.tsx` — update two UI strings.

## After edits

- Run the TypeScript build to confirm the UI change compiles.
- Deploy the three affected edge functions (`send-lead-email`, `create-booking`, `cancel-booking`).
- Optionally test a lead or booking submission and confirm the notification arrives at `mutidan@beaconattorneys.rw`.

## Note

The existing Google Calendar integration still connects to a Gmail account (for calendar event creation and cancellation email sending). If you also want that connected Google account to change, that requires reconnecting Google Calendar in the Admin page after updating the OAuth credentials stored in the backend.
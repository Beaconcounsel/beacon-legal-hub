## Goal
Verify that the booking flow now sends both emails via Resend from `noreply@beaconattorneys.rw`.

## Steps
1. Trigger `create-booking` with a test payload (test client email + your admin email) against the deployed edge function.
2. Read `send-lead-email`/`create-booking` edge function logs to confirm:
   - Resend HTTP 200 for the client confirmation
   - Resend HTTP 200 for the admin notification
3. Query the `bookings` table to confirm the row was inserted and check any email_status fields.
4. Report back:
   - Raw Resend status codes for both sends
   - Booking row ID
   - Whether Google Calendar step was skipped (expected, since Google not reconnected yet)
5. Clean up the test booking row so your calendar/admin view isn't polluted.

No code changes.
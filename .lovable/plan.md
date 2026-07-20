Test plan: verify that lead and booking notifications now land at `mutidan@beaconattorneys.rw` and that admin access still works.

What we already confirmed
- `ADMIN_EMAIL` is now `mutidan@beaconattorneys.rw` in:
  - `supabase/functions/send-lead-email/index.ts`
  - `supabase/functions/create-booking/index.ts`
  - `supabase/functions/cancel-booking/index.ts`
- `src/pages/Admin.tsx` copy was updated to the new address.
- No remaining `mutidan@gmail.com` references in the active code (only in two older migrations, noted below).

Tests to run
1. Lead form end-to-end
   - Open `/contact`.
   - Submit a test lead with a personal/secondary email address.
   - Verify the visitor auto-reply arrives at the address used in the form.
   - Verify the admin notification arrives at `mutidan@beaconattorneys.rw`.
   - Check the email log in Cloud → Emails to confirm status = `sent`.

2. Booking creation end-to-end
   - On the public site, go through the consultation flow and pick a time slot.
   - Submit a test booking with a secondary email address.
   - Verify the visitor confirmation email arrives.
   - Verify the admin booking notification arrives at `mutidan@beaconattorneys.rw`.
   - Confirm the Google Calendar event is created (if the calendar is still connected).

3. Booking cancellation end-to-end
   - Use the cancellation link from the visitor confirmation email or the admin page.
   - Cancel the test booking.
   - Verify the cancellation email arrives at the visitor's email and at `mutidan@beaconattorneys.rw`.
   - Confirm the Google Calendar event is removed.

4. Admin login check
   - Visit `/auth` and sign in with the admin account.
   - Confirm you can access `/admin` and see the bookings/leads list.

Pre-test fix needed
- Two older migrations still reference `mutidan@gmail.com`:
  - `20260504102042_bbbedf6d-2645-464d-b53f-06366acd723d.sql` auto-grants the `admin` role when a new auth user has email `mutidan@gmail.com`.
  - `20260505005757_7aa4ecec-db0f-4676-aa18-8dd266053c12.sql` sets the password for the `mutidan@gmail.com` account.
- If the admin account is now `mutidan@beaconattorneys.rw`, the role trigger must be updated or the new-email account will be treated as a normal user and `/admin` will be blocked.

Recommended plan before testing
- Create a new migration that:
  1. Updates `public.handle_new_user()` to grant admin for `mutidan@beaconattorneys.rw` instead of (or in addition to) `mutidan@gmail.com`.
  2. If the admin user already exists in `auth.users` with the new email, ensures the `admin` role is assigned in `public.user_roles`.
  3. Optionally sets/updates the password for `mutidan@beaconattorneys.rw` if you sign in with email+password.

After the migration is applied, run the four tests above and confirm the inbox receives all expected notifications.

Would you like me to implement the migration fix first, then run the tests in the sandbox? Or would you prefer to test the public flow first and then decide on the migration?
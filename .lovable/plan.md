# Booking requests reviewed before confirmation

Today a submitted booking is saved as `confirmed` immediately, a Google Calendar event is created, and the client gets a "Consultation confirmed" email. This changes it to a request-and-approve flow.

## New flow

1. Client completes the booking steps and submits.
2. The booking is saved as **pending**. The time slot is held so nobody else can take it while it is under review.
3. The client sees an on-screen message: the request has been received and will be reviewed and approved by a senior counsel, with confirmation to follow by email.
4. The client receives a "Consultation request received — under review" email (EN and FR) instead of a confirmation.
5. Both firm addresses receive a notification flagged as **Action required — pending approval**.
6. In the admin area, each pending booking gets **Approve** and **Decline** buttons.
   - Approve: status becomes confirmed, the Google Calendar event is created, and the existing confirmation email (with the cancel/reschedule link) is sent to the client.
   - Decline: status becomes declined, the slot is released, and the client receives a short, courteous email that the requested time is not available and inviting them to choose another.

## Technical details

- `bookings.status`: default changes to `pending`; allowed values `pending`, `confirmed`, `declined`, `cancelled`.
- `get_booked_slots` includes `pending` and `confirmed` so pending requests block the slot in availability.
- `create-booking` edge function: inserts with `pending`, skips calendar event creation, sends the new request-received template to the client and the pending-approval notification to the admins. Slot conflict checks stay as-is.
- New edge function `decide-booking` (admin-only, JWT + `has_role(admin)` verified in code): approves or declines a booking, creates the calendar event on approval, sends the appropriate email, and is idempotent.
- New templates in `_shared/transactional-email-templates/`: `booking-request-received`, `booking-request-received-fr`, `booking-declined`, `booking-declined-fr`; existing `booking-notification` gets a pending-approval heading. All registered in `registry.ts`.
- `src/pages/Admin.tsx`: status badge colours for pending/declined, plus Approve/Decline actions on pending rows.
- `src/components/BookConsultation.tsx` and both i18n files: success copy changes from "confirmed" to "submitted for review by a senior counsel".
- Affected edge functions redeployed after the changes.

// deno-lint-ignore-file no-explicit-any
import { corsHeaders } from "../_shared/cors.ts";
import {
  adminClient,
  getGoogleAccessToken,
  deleteCalendarEvent,
  sendGmail,
  isValidEmail,
  isSafeHeaderValue,
} from "../_shared/google.ts";

const ADMIN_EMAIL = "mutidan@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { token, fullName, email, reason } = await req.json();
    if (!token || !fullName || !email) {
      return json({ ok: false, error: "Missing required fields" }, 400);
    }
    if (!isValidEmail(email)) {
      return json({ ok: false, error: "Invalid email address" }, 400);
    }
    if (!isSafeHeaderValue(fullName, 200)) {
      return json({ ok: false, error: "Invalid name" }, 400);
    }

    const supabase = adminClient();
    const { data: rows } = await supabase
      .from("bookings")
      .select("id, slot_start, slot_end, client_name, client_email, google_event_id, status")
      .eq("cancellation_token", token)
      .limit(1);
    if (!rows || rows.length === 0) return json({ ok: false, error: "Booking not found." }, 404);
    const b = rows[0];
    if (b.status === "cancelled") return json({ ok: false, error: "Already cancelled." }, 409);

    // Ensure the submitted email matches the booking's real client_email so
    // outbound cancellation emails cannot be redirected by a caller who
    // guesses/leaks a cancellation token.
    if (String(b.client_email).toLowerCase() !== String(email).toLowerCase()) {
      return json({ ok: false, error: "Email does not match the booking." }, 403);
    }

    const within24h = new Date(b.slot_start).getTime() - Date.now() < 24 * 3600_000;

    // Mark booking cancelled
    await supabase
      .from("bookings")
      .update({
        status: "cancelled",
        cancellation_reason: reason ?? null,
        cancelled_at: new Date().toISOString(),
      })
      .eq("id", b.id);

    // Log cancellation request
    await supabase.from("cancellation_requests").insert({
      booking_id: b.id,
      full_name: fullName,
      email,
      appointment_at: b.slot_start,
      reason: reason ?? null,
      within_24h: within24h,
    });

    // Delete Google event + send emails
    let accessToken: string | null = null;
    let connectedEmail: string | null = null;
    try {
      const tok = await getGoogleAccessToken(supabase);
      if (tok) {
        accessToken = tok.accessToken;
        connectedEmail = tok.email;
        if (b.google_event_id) {
          await deleteCalendarEvent(tok.accessToken, b.google_event_id);
        }
      }
    } catch (e) {
      console.error("calendar cleanup failed (non-fatal)", e);
    }

    const apptDisplay = formatKigali(b.slot_start);

    if (accessToken && connectedEmail) {
      const lateNote = within24h
        ? `\n\nNote: Because this cancellation is within 24 hours of the appointment, the full consultation fee applies per our cancellation policy.`
        : "";

      // Email client
      await sendGmail(accessToken, {
        to: email,
        subject: `Cancellation confirmed — ${apptDisplay}`,
        text:
`Dear ${fullName},

Your consultation scheduled for ${apptDisplay} (Africa/Kigali) has been cancelled.${lateNote}

If this was a mistake, please book again from our website.

Beacon Attorneyes & Consultants`,
        fromEmail: connectedEmail,
        fromName: "Beacon Attorneyes & Consultants",
      });

      // Email admin
      await sendGmail(accessToken, {
        to: ADMIN_EMAIL,
        subject: `Cancellation — ${b.client_name} — ${apptDisplay}${within24h ? " (LATE — fee applies)" : ""}`,
        text:
`Cancellation received:

When: ${apptDisplay}
Client: ${fullName} <${email}>
Within 24h: ${within24h ? "YES — fee applies" : "no"}
Reason: ${reason ?? "—"}`,
        fromEmail: connectedEmail,
        fromName: "Beacon Bookings",
      });
    }

    return json({ ok: true, within24h });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: (e as Error).message }, 500);
  }
});

function formatKigali(iso: string): string {
  const d = new Date(iso);
  const local = new Date(d.getTime() + 2 * 3600_000);
  const dows = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const h = local.getUTCHours();
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${dows[local.getUTCDay()]}, ${months[local.getUTCMonth()]} ${local.getUTCDate()}, ${local.getUTCFullYear()} at ${h12}:00 ${ampm}`;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
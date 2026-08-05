// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "../_shared/cors.ts";
import { adminClient, getGoogleAccessToken, createCalendarEvent } from "../_shared/google.ts";

async function sendTransactionalEmail(
  supabase: any,
  templateName: string,
  recipientEmail: string,
  idempotencyKey: string,
  templateData: Record<string, any>,
) {
  const { data, error } = await supabase.functions.invoke("send-transactional-email", {
    body: { templateName, recipientEmail, idempotencyKey, templateData },
  });
  if (error) {
    console.error(`[decide-booking] ${templateName} invoke failed`, error);
    return { ok: false, error: error.message };
  }
  if (!data?.success) {
    console.error(`[decide-booking] ${templateName} send failed`, data);
    return { ok: false, error: data?.reason || "send failed" };
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ ok: false, error: "Unauthorized" }, 401);

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    const userId = claimsData?.claims?.sub as string | undefined;
    if (claimsError || !userId) return json({ ok: false, error: "Unauthorized" }, 401);

    const supabase = adminClient();
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (!isAdmin) return json({ ok: false, error: "Forbidden" }, 403);

    const body = await req.json();
    const bookingId = body?.bookingId;
    const decision = body?.decision;
    const note = typeof body?.note === "string" ? body.note.slice(0, 1000) : null;
    const language = body?.language === "fr" ? "fr" : "en";
    if (!bookingId || (decision !== "approve" && decision !== "decline")) {
      return json({ ok: false, error: "Invalid request" }, 400);
    }

    const { data: booking, error: fetchErr } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .maybeSingle();
    if (fetchErr || !booking) return json({ ok: false, error: "Booking not found" }, 404);

    if (booking.status !== "pending") {
      return json({ ok: true, alreadyDecided: true, status: booking.status });
    }

    const appOrigin = (req.headers.get("origin") || "").replace(/\/$/, "");
    const appBase = appOrigin || "https://beaconattorneys.rw";

    if (decision === "decline") {
      await supabase
        .from("bookings")
        .update({ status: "declined", cancelled_at: new Date().toISOString(), cancellation_reason: note })
        .eq("id", bookingId);

      await sendTransactionalEmail(
        supabase,
        language === "fr" ? "booking-declined-fr" : "booking-declined",
        booking.client_email,
        `booking-declined-${bookingId}`,
        {
          name: booking.client_name,
          appointmentTime: formatKigali(booking.slot_start, language),
          bookingUrl: `${appBase}/#book-consultation`,
          note,
        },
      );

      return json({ ok: true, status: "declined" });
    }

    // Approve
    let googleEventId: string | null = null;
    try {
      const tok = await getGoogleAccessToken(supabase);
      if (tok) {
        const description = [
          `Client: ${booking.client_name} <${booking.client_email}>`,
          booking.client_phone ? `Phone: ${booking.client_phone}` : null,
          booking.organization ? `Organization: ${booking.organization}` : null,
          booking.entity_type ? `Entity: ${booking.entity_type}` : null,
          booking.jurisdiction ? `Jurisdiction: ${booking.jurisdiction}` : null,
          booking.matter_type ? `Matter: ${booking.matter_type}` : null,
          ``,
          `Message:`,
          booking.message ?? "",
        ].filter(Boolean).join("\n");

        const evt = await createCalendarEvent(tok.accessToken, {
          summary: `Consultation — ${booking.client_name}`,
          description,
          startIso: new Date(booking.slot_start).toISOString(),
          endIso: new Date(booking.slot_end).toISOString(),
          attendeeEmail: booking.client_email,
          attendeeName: booking.client_name,
        });
        if (evt) googleEventId = evt.id;
      }
    } catch (e) {
      console.error("[decide-booking] calendar event failed (non-fatal)", e);
    }

    await supabase
      .from("bookings")
      .update({ status: "confirmed", google_event_id: googleEventId ?? booking.google_event_id })
      .eq("id", bookingId);

    await sendTransactionalEmail(
      supabase,
      language === "fr" ? "booking-confirmation-fr" : "booking-confirmation",
      booking.client_email,
      `booking-confirmation-${bookingId}`,
      {
        name: booking.client_name,
        appointmentTime: formatKigali(booking.slot_start, language),
        matterType: booking.matter_type ?? "—",
        cancelUrl: `${appBase}/booking/cancel?token=${booking.cancellation_token}`,
      },
    );

    return json({ ok: true, status: "confirmed" });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: (e as Error).message }, 500);
  }
});

function formatKigali(iso: string, lang: "en" | "fr" = "en"): string {
  const d = new Date(iso);
  const local = new Date(d.getTime() + 2 * 3600_000);

  if (lang === "fr") {
    const dows = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    const h = local.getUTCHours().toString().padStart(2, "0");
    return `${dows[local.getUTCDay()]} ${local.getUTCDate()} ${months[local.getUTCMonth()]} ${local.getUTCFullYear()} à ${h}:00`;
  }

  const dows = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

// deno-lint-ignore-file no-explicit-any
import { corsHeaders } from "../_shared/cors.ts";
import {
  adminClient,
  getGoogleAccessToken,
  getCalendarBusy,
  createCalendarEvent,
  isValidEmail,
  isSafeHeaderValue,
} from "../_shared/google.ts";

const ADMIN_EMAIL = "mutidan@beaconattorneys.rw";

async function sendTransactionalEmail(
  supabase: any,
  templateName: string,
  recipientEmail: string,
  idempotencyKey: string,
  templateData: Record<string, any>,
) {
  const { data, error } = await supabase.functions.invoke("send-transactional-email", {
    body: {
      templateName,
      recipientEmail,
      idempotencyKey,
      templateData,
    },
  });

  if (error) {
    console.error(`[create-booking] ${templateName} invoke failed`, error);
    return { ok: false, error: error.message };
  }

  if (!data?.success) {
    console.error(`[create-booking] ${templateName} send failed`, data);
    return { ok: false, error: data?.reason || "send failed" };
  }

  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { slotStartUtc, slotEndUtc, client, language = "en" } = body ?? {};
    if (!slotStartUtc || !slotEndUtc || !client?.name || !client?.email) {
      return json({ ok: false, error: "Missing required fields" }, 400);
    }
    if (language !== "en" && language !== "fr") {
      return json({ ok: false, error: "Invalid language" }, 400);
    }

    // Server-side validation of email/name to prevent email header injection
    // via directly-callable public edge function (bypasses client-side zod).
    if (!isValidEmail(client.email)) {
      return json({ ok: false, error: "Invalid email address" }, 400);
    }
    if (!isSafeHeaderValue(client.name, 200)) {
      return json({ ok: false, error: "Invalid name" }, 400);
    }
    if (client.phone && !isSafeHeaderValue(String(client.phone), 50)) {
      return json({ ok: false, error: "Invalid phone" }, 400);
    }

    const supabase = adminClient();

    // Server-side validation: not in past, within 8 weeks, working hour
    const start = new Date(slotStartUtc);
    const now = Date.now();
    if (start.getTime() < now + 30 * 60_000) {
      return json({ ok: false, error: "Slot is in the past" }, 400);
    }
    if (start.getTime() > now + 8 * 7 * 24 * 3600_000) {
      return json({ ok: false, error: "Slot beyond booking horizon" }, 400);
    }

    // Check DB conflicts
    const { data: conflicts } = await supabase
      .from("bookings")
      .select("id")
      .eq("status", "confirmed")
      .eq("slot_start", new Date(slotStartUtc).toISOString());
    if (conflicts && conflicts.length > 0) {
      return json({ ok: false, error: "This slot is no longer available." }, 409);
    }

    // Check Google Calendar conflicts (best-effort)
    let accessToken: string | null = null;
    let connectedEmail: string | null = null;
    try {
      const tok = await getGoogleAccessToken(supabase);
      if (tok) {
        accessToken = tok.accessToken;
        connectedEmail = tok.email;
        const blocks = await getCalendarBusy(tok.accessToken, slotStartUtc, slotEndUtc);
        if (blocks.some((b) => new Date(b.start).getTime() < new Date(slotEndUtc).getTime() && new Date(b.end).getTime() > start.getTime())) {
          return json({ ok: false, error: "This slot is no longer available." }, 409);
        }
      }
    } catch (e) {
      console.error("calendar precheck failed (non-fatal)", e);
    }

    // Insert booking
    const { data: inserted, error: insertErr } = await supabase
      .from("bookings")
      .insert({
        slot_start: slotStartUtc,
        slot_end: slotEndUtc,
        client_name: client.name,
        client_email: client.email,
        client_phone: client.phone ?? null,
        organization: client.organization ?? null,
        entity_type: client.entityType ?? null,
        jurisdiction: client.jurisdiction ?? null,
        matter_type: client.matterType ?? null,
        message: client.message ?? null,
        status: "confirmed",
      })
      .select("id, cancellation_token")
      .single();
    if (insertErr || !inserted) {
      console.error("insert failed", insertErr);
      return json({ ok: false, error: "Could not save booking." }, 500);
    }

    // Create Google Calendar event
    let googleEventId: string | null = null;
    if (accessToken) {
      const description = [
        `Client: ${client.name} <${client.email}>`,
        client.phone ? `Phone: ${client.phone}` : null,
        client.organization ? `Organization: ${client.organization}` : null,
        client.entityType ? `Entity: ${client.entityType}` : null,
        client.jurisdiction ? `Jurisdiction: ${client.jurisdiction}` : null,
        client.matterType ? `Matter: ${client.matterType}` : null,
        ``,
        `Message:`,
        client.message ?? "",
      ].filter(Boolean).join("\n");

      const evt = await createCalendarEvent(accessToken, {
        summary: `Consultation — ${client.name}`,
        description,
        startIso: slotStartUtc,
        endIso: slotEndUtc,
        attendeeEmail: client.email,
        attendeeName: client.name,
      });
      if (evt) {
        googleEventId = evt.id;
        await supabase.from("bookings").update({ google_event_id: googleEventId }).eq("id", inserted.id);
      }
    }

    // Send confirmation emails via Lovable Emails
    const appOrigin = (req.headers.get("origin") || req.headers.get("referer") || "").replace(/\/$/, "");
    const cancelUrl = appOrigin
      ? `${appOrigin}/booking/cancel?token=${inserted.cancellation_token}`
      : `https://id-preview--77ebf12f-1901-496b-826b-4c99fb6e3670.lovable.app/booking/cancel?token=${inserted.cancellation_token}`;

    const results = await Promise.allSettled([
      sendTransactionalEmail(
        supabase,
        language === "fr" ? "booking-confirmation-fr" : "booking-confirmation",
        client.email,
        `booking-confirmation-${inserted.id}`,
        {
          name: client.name,
          appointmentTime: formatKigali(slotStartUtc, language),
          matterType: client.matterType ?? "—",
          cancelUrl,
        },
      ),
      sendTransactionalEmail(
        supabase,
        "booking-notification",
        ADMIN_EMAIL,
        `booking-notification-${inserted.id}`,
        {
          clientName: client.name,
          clientEmail: client.email,
          clientPhone: client.phone ?? "—",
          organization: client.organization ?? "—",
          entityType: client.entityType ?? "—",
          jurisdiction: client.jurisdiction ?? "—",
          matterType: client.matterType ?? "—",
          message: client.message ?? "—",
          appointmentTime: formatKigali(slotStartUtc),
        },
      ),
    ]);

    results.forEach((r, i) => {
      if (r.status === "rejected" || (r.status === "fulfilled" && !r.value.ok)) {
        console.error(
          `[create-booking] email ${i === 0 ? "client" : "admin"} failed`,
          r.status === "rejected" ? r.reason?.toString?.() : r.value?.error,
        );
      }
    });

    return json({ ok: true, bookingId: inserted.id, cancellationToken: inserted.cancellation_token });
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

// deno-lint-ignore-file no-explicit-any
import { corsHeaders } from "../_shared/cors.ts";
import {
  adminClient,
  getGoogleAccessToken,
  getCalendarBusy,
  isValidEmail,
  isSafeHeaderValue,
} from "../_shared/google.ts";

const ADMIN_EMAILS = ["mutidan@beaconattorneys.rw", "mutidan@gmail.com"];

async function sendTransactionalEmail(
  supabase: any,
  templateName: string,
  recipientEmail: string,
  idempotencyKey: string,
  templateData: Record<string, any>,
  replyTo?: string,
) {
  const { data, error } = await supabase.functions.invoke("send-transactional-email", {
    body: {
      templateName,
      recipientEmail,
      idempotencyKey,
      templateData,
      replyTo,
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
      .in("status", ["confirmed", "pending"])
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
        status: "pending",
      })
      .select("id, cancellation_token")
      .single();
    if (insertErr || !inserted) {
      console.error("insert failed", insertErr);
      return json({ ok: false, error: "Could not save booking." }, 500);
    }

    // No calendar event is created yet — the request must first be approved
    // by a senior counsel via the admin dashboard (decide-booking).

    // Send confirmation emails via Lovable Emails
    const appOrigin = (req.headers.get("origin") || req.headers.get("referer") || "").replace(/\/$/, "");
    const cancelUrl = appOrigin
      ? `${appOrigin}/booking/cancel?token=${inserted.cancellation_token}`
      : `https://id-preview--77ebf12f-1901-496b-826b-4c99fb6e3670.lovable.app/booking/cancel?token=${inserted.cancellation_token}`;

    const results = await Promise.allSettled([
      sendTransactionalEmail(
        supabase,
        language === "fr" ? "booking-request-received-fr" : "booking-request-received",
        client.email,
        `booking-request-received-${inserted.id}`,
        {
          name: client.name,
          appointmentTime: formatKigali(slotStartUtc, language),
          matterType: client.matterType ?? "—",
        },
      ),
      ...ADMIN_EMAILS.map((adminEmail) =>
        sendTransactionalEmail(
          supabase,
          "booking-notification",
          adminEmail,
          `booking-notification-${inserted.id}-${adminEmail}`,
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
          client.email,
        ),
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

    return json({
      ok: true,
      status: "pending",
      bookingId: inserted.id,
      cancellationToken: inserted.cancellation_token,
    });
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

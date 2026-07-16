// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { z } from "npm:zod@3.23.8";
import { corsHeaders } from "../_shared/cors.ts";

const ADMIN_EMAIL = "mutidan@gmail.com";
const FROM_EMAIL = "Beacon Attorneyes <noreply@beaconattorneys.rw>";
const RESEND_API = "https://api.resend.com/emails";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")).transform((v) => (v ? v : null)),
  message: z.string().trim().min(10).max(2000),
  source_page: z.string().trim().min(1).max(120),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendResend(payload: Record<string, unknown>, apiKey: string) {
  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${text}`);
  }
  return text;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  console.log("[send-lead-email] RESEND_API_KEY diagnostics", {
    isMissing: RESEND_API_KEY == null,
    length: RESEND_API_KEY?.length ?? 0,
    first3: RESEND_API_KEY?.slice(0, 3) ?? null,
    last2: RESEND_API_KEY?.slice(-2) ?? null,
    hasWhitespace: RESEND_API_KEY == null ? null : /[ \t\n\r]/.test(RESEND_API_KEY),
  });
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Validation failed", fields: parsed.error.flatten().fieldErrors },
      400,
    );
  }
  const { name, email, phone, message, source_page } = parsed.data;

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1. Insert the lead FIRST — source of truth.
  const { data: inserted, error: insertErr } = await supabase
    .from("leads")
    .insert({
      name,
      email,
      phone,
      message,
      source_page,
      email_status: "pending",
    })
    .select("id, created_at")
    .single();

  if (insertErr || !inserted) {
    console.error("[send-lead-email] insert failed", insertErr);
    return json({ ok: false, error: "Could not save your submission. Please try again." }, 500);
  }

  const leadId = inserted.id as string;
  const createdAt = inserted.created_at as string;

  // If Resend key missing, keep lead but mark failed.
  if (!RESEND_API_KEY) {
    console.error("[send-lead-email] RESEND_API_KEY not configured — lead saved but no email sent", { leadId });
    await supabase.from("leads").update({ email_status: "failed" }).eq("id", leadId);
    return json({ ok: true, leadId, warning: "Saved. Email delivery pending configuration." });
  }

  // 2. Build emails.
  const subject = `New lead from ${name} — ${source_page}`;
  const notifyText = [
    `New lead submitted on beaconattorneys.rw`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone ?? "—"}`,
    `Source page: ${source_page}`,
    `Submitted: ${createdAt}`,
    `Lead ID: ${leadId}`,
    ``,
    `Message:`,
    message,
  ].join("\n");

  const notifyHtml = `
    <div style="font-family:Arial,sans-serif;color:#0f2d34;line-height:1.5;">
      <h2 style="margin:0 0 12px;color:#0f2d34;">New lead from ${escapeHtml(name)}</h2>
      <p style="margin:0 0 16px;color:#555;">Source page: <strong>${escapeHtml(source_page)}</strong></p>
      <table style="border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td>${escapeHtml(phone ?? "—")}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666;">Submitted</td><td>${escapeHtml(createdAt)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666;">Lead ID</td><td><code>${escapeHtml(leadId)}</code></td></tr>
      </table>
      <h3 style="margin:20px 0 8px;font-size:14px;color:#0f2d34;">Message</h3>
      <div style="background:#f6f4ee;border-left:3px solid #c9a84c;padding:12px 14px;white-space:pre-wrap;font-size:14px;">${escapeHtml(message)}</div>
      <p style="margin:20px 0 0;color:#888;font-size:12px;">Reply directly to this email to respond to the client.</p>
    </div>
  `;

  const autoReplyHtml = `
    <div style="font-family:Arial,sans-serif;color:#0f2d34;line-height:1.6;max-width:560px;">
      <h2 style="margin:0 0 12px;color:#0f2d34;">Thank you, ${escapeHtml(name)}.</h2>
      <p style="margin:0 0 12px;">We've received your message and a member of our team will get back to you shortly — typically within one business day.</p>
      <p style="margin:0 0 12px;">For reference, here is a copy of what you sent us:</p>
      <div style="background:#f6f4ee;border-left:3px solid #c9a84c;padding:12px 14px;white-space:pre-wrap;font-size:14px;color:#333;">${escapeHtml(message)}</div>
      <p style="margin:16px 0 4px;">Warm regards,</p>
      <p style="margin:0 0 16px;"><strong>Beacon Attorneyes &amp; Consultants</strong><br/>
      KG 190 St, RIM House, 1st Floor, Kigali, Rwanda<br/>
      +250 788 55 96 03 · info@beaconattorneys.rw</p>
      <p style="margin:24px 0 0;color:#999;font-size:11px;">This is an automated confirmation. Please do not reply to this address.</p>
    </div>
  `;
  const autoReplyText = `Thank you, ${name}.\n\nWe've received your message and a member of our team will get back to you shortly — typically within one business day.\n\nYour message:\n${message}\n\nBeacon Attorneyes & Consultants\nKG 190 St, RIM House, 1st Floor, Kigali, Rwanda\n+250 788 55 96 03 · info@beaconattorneys.rw`;

  // 3. Send both emails independently, in parallel.
  const [notifyResult, autoReplyResult] = await Promise.allSettled([
    sendResend(
      {
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        subject,
        text: notifyText,
        html: notifyHtml,
        reply_to: email,
      },
      RESEND_API_KEY,
    ),
    sendResend(
      {
        from: FROM_EMAIL,
        to: [email],
        subject: "We received your message — Beacon Attorneyes & Consultants",
        text: autoReplyText,
        html: autoReplyHtml,
      },
      RESEND_API_KEY,
    ),
  ]);

  const notifyOk = notifyResult.status === "fulfilled";
  const autoReplyOk = autoReplyResult.status === "fulfilled";

  if (!notifyOk) {
    console.error("[send-lead-email] notification email failed", {
      leadId,
      reason: (notifyResult as PromiseRejectedResult).reason?.toString?.(),
    });
  }
  if (!autoReplyOk) {
    console.error("[send-lead-email] auto-reply email failed", {
      leadId,
      reason: (autoReplyResult as PromiseRejectedResult).reason?.toString?.(),
    });
  }

  // email_status reflects the notification-to-owner outcome (the source of truth per spec).
  await supabase
    .from("leads")
    .update({ email_status: notifyOk ? "sent" : "failed" })
    .eq("id", leadId);

  return json({
    ok: true,
    leadId,
    emailStatus: notifyOk ? "sent" : "failed",
    autoReplySent: autoReplyOk,
  });
});
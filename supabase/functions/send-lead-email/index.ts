// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { z } from "npm:zod@3.23.8";
import { corsHeaders } from "../_shared/cors.ts";

const ADMIN_EMAILS = ["mutidan@beaconattorneys.rw", "mutidan@gmail.com"];

const bodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")).transform((v) => (v ? v : null)),
  message: z.string().trim().min(10).max(2000),
  source_page: z.string().trim().min(1).max(120),
  language: z.enum(["en", "fr"]).default("en"),
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

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
    console.error(`[send-lead-email] ${templateName} invoke failed`, error);
    return { ok: false, error: error.message };
  }

  if (!data?.success) {
    console.error(`[send-lead-email] ${templateName} send failed`, data);
    return { ok: false, error: data?.reason || "send failed" };
  }

  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405);

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
  const { name, email, phone, message, source_page, language } = parsed.data;

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

  // 2. Queue admin notification and visitor confirmation via Lovable Emails.
  const [notifyResult, autoReplyResult] = await Promise.allSettled([
    sendTransactionalEmail(
      supabase,
      "lead-notification",
      ADMIN_EMAIL,
      `lead-notification-${leadId}`,
      {
        name,
        email,
        phone,
        message,
        sourcePage: source_page,
        leadId,
        createdAt,
      },
      email,
    ),
    sendTransactionalEmail(
      supabase,
      language === "fr" ? "lead-confirmation-fr" : "lead-confirmation",
      email,
      `lead-confirmation-${leadId}`,
      { name, email, message },
    ),
  ]);

  const notifyOk = notifyResult.status === "fulfilled" && notifyResult.value.ok;
  const autoReplyOk = autoReplyResult.status === "fulfilled" && autoReplyResult.value.ok;

  if (!notifyOk) {
    console.error("[send-lead-email] notification email failed", {
      leadId,
      reason: (notifyResult as PromiseRejectedResult).reason?.toString?.() ||
        (notifyResult as PromiseFulfilledResult<any>).value?.error,
    });
  }
  if (!autoReplyOk) {
    console.error("[send-lead-email] auto-reply email failed", {
      leadId,
      reason: (autoReplyResult as PromiseRejectedResult).reason?.toString?.() ||
        (autoReplyResult as PromiseFulfilledResult<any>).value?.error,
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

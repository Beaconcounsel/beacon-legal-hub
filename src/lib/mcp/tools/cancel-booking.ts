import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export default defineTool({
  name: "cancel_booking",
  title: "Cancel a booking",
  description:
    "Cancel one of the signed-in user's consultation bookings. Look up the booking with list_my_bookings first to get its cancellation_token. Cancellations within 24 hours of the appointment are subject to the full consultation fee.",
  inputSchema: {
    cancellationToken: z
      .string()
      .describe("cancellation_token from list_my_bookings."),
    reason: z.string().optional().describe("Optional cancellation reason."),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async ({ cancellationToken, reason }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return { content: [{ type: "text", text: "No email on account" }], isError: true };
    }
    // Verify the booking belongs to the signed-in user via RLS-scoped read.
    const supabase = supabaseForUser(ctx);
    const { data: rows, error: lookupErr } = await supabase
      .from("bookings")
      .select("id, client_email, status")
      .eq("cancellation_token", cancellationToken)
      .limit(1);
    if (lookupErr) {
      return { content: [{ type: "text", text: lookupErr.message }], isError: true };
    }
    if (!rows || rows.length === 0 || rows[0].client_email !== email) {
      return {
        content: [{ type: "text", text: "Booking not found for this account." }],
        isError: true,
      };
    }

    const url = `${process.env.SUPABASE_URL}/functions/v1/cancel-booking`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_PUBLISHABLE_KEY!}`,
      },
      body: JSON.stringify({ token: cancellationToken, reason }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || (body as { ok?: boolean }).ok === false) {
      return {
        content: [{ type: "text", text: (body as { error?: string }).error ?? `HTTP ${res.status}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: "Booking cancelled." }],
      structuredContent: body as Record<string, unknown>,
    };
  },
});
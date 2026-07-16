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
  name: "list_my_bookings",
  title: "List my bookings",
  description:
    "List consultation bookings for the signed-in user (matched by their account email).",
  inputSchema: {
    includeCancelled: z
      .boolean()
      .optional()
      .describe("Include cancelled bookings. Defaults to false."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ includeCancelled }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return { content: [{ type: "text", text: "No email on account" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("bookings")
      .select("id, slot_start, slot_end, status, matter_type, message, cancellation_token")
      .eq("client_email", email)
      .order("slot_start", { ascending: false })
      .limit(50);
    if (!includeCancelled) query = query.neq("status", "cancelled");
    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { bookings: data ?? [] },
    };
  },
});
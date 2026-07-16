import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "create_booking",
  title: "Book a consultation",
  description:
    "Book a 1-hour consultation slot for the signed-in user. slotStartUtc must be an available working-hour slot returned by get_availability (Mon-Fri, 09:00/10:00/11:00/14:00/15:00 Kigali time). The booking is made under the signed-in user's account email.",
  inputSchema: {
    slotStartUtc: z.string().describe("ISO 8601 UTC start of the slot."),
    name: z.string().min(1).describe("Client full name."),
    phone: z.string().optional(),
    organization: z.string().optional(),
    entityType: z.string().optional().describe("Individual, Company, NGO, etc."),
    jurisdiction: z.string().optional().describe("Country or region of the matter."),
    matterType: z
      .string()
      .optional()
      .describe("Area of law (e.g. Corporate, Litigation, Tax)."),
    message: z.string().optional().describe("Short description of the matter."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const email = ctx.getUserEmail();
    if (!email) {
      return { content: [{ type: "text", text: "No email on account" }], isError: true };
    }
    const start = new Date(input.slotStartUtc);
    if (Number.isNaN(start.getTime())) {
      return { content: [{ type: "text", text: "Invalid slotStartUtc" }], isError: true };
    }
    const slotEndUtc = new Date(start.getTime() + 60 * 60_000).toISOString();

    const url = `${process.env.SUPABASE_URL}/functions/v1/create-booking`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_PUBLISHABLE_KEY!}`,
      },
      body: JSON.stringify({
        slotStartUtc: start.toISOString(),
        slotEndUtc,
        client: {
          name: input.name,
          email,
          phone: input.phone,
          organization: input.organization,
          entityType: input.entityType,
          jurisdiction: input.jurisdiction,
          matterType: input.matterType,
          message: input.message,
        },
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || (body as { ok?: boolean }).ok === false) {
      return {
        content: [{ type: "text", text: (body as { error?: string }).error ?? `HTTP ${res.status}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: `Booking confirmed for ${start.toISOString()}` }],
      structuredContent: body as Record<string, unknown>,
    };
  },
});
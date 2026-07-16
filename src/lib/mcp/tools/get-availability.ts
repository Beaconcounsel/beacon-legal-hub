import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_availability",
  title: "Get consultation availability",
  description:
    "Return the set of already-booked consultation slot start times (ISO UTC) between two dates. Any working-hour slot NOT in this list is available. Slots are 1 hour, Mon-Fri, Kigali time (CAT/UTC+2), at 09:00, 10:00, 11:00, 14:00, and 15:00 local.",
  inputSchema: {
    fromIso: z
      .string()
      .describe("Start of the range, ISO 8601 UTC (e.g. 2026-07-20T00:00:00Z)."),
    toIso: z
      .string()
      .describe("End of the range, ISO 8601 UTC. Must be within 8 weeks of now."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ fromIso, toIso }) => {
    const url = `${process.env.SUPABASE_URL}/functions/v1/get-availability`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_PUBLISHABLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_PUBLISHABLE_KEY!}`,
      },
      body: JSON.stringify({ fromIso, toIso }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        content: [{ type: "text", text: (body as { error?: string }).error ?? `HTTP ${res.status}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(body, null, 2) }],
      structuredContent: body as Record<string, unknown>,
    };
  },
});
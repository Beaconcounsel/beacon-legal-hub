// deno-lint-ignore-file no-explicit-any
import { corsHeaders } from "../_shared/cors.ts";
import { adminClient, getGoogleAccessToken, getCalendarBusy } from "../_shared/google.ts";

const SLOT_HOURS = [9, 10, 11, 14, 15];
const KIGALI_OFFSET_HOURS = 2;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { fromIso, toIso } = await req.json();
    if (!fromIso || !toIso) return json({ error: "fromIso/toIso required" }, 400);

    const supabase = adminClient();

    // 1) DB-confirmed bookings
    const { data: dbBusy } = await supabase.rpc("get_booked_slots", {
      _from: fromIso,
      _to: toIso,
    });

    const busyStarts = new Set<string>();
    (dbBusy ?? []).forEach((row: any) => {
      busyStarts.add(new Date(row.slot_start).toISOString());
    });

    // 2) Google Calendar busy blocks (if token connected)
    try {
      const tok = await getGoogleAccessToken(supabase);
      if (tok) {
        const blocks = await getCalendarBusy(tok.accessToken, fromIso, toIso);
        // For each slot in the range, mark busy if it overlaps any block
        const slotStarts = enumerateSlotStarts(fromIso, toIso);
        for (const s of slotStarts) {
          const sMs = new Date(s).getTime();
          const eMs = sMs + 60 * 60_000;
          for (const b of blocks) {
            const bs = new Date(b.start).getTime();
            const be = new Date(b.end).getTime();
            if (sMs < be && eMs > bs) {
              busyStarts.add(s);
              break;
            }
          }
        }
      }
    } catch (e) {
      console.error("calendar sync failed (non-fatal)", e);
    }

    return json({ busyStarts: Array.from(busyStarts) });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});

function enumerateSlotStarts(fromIso: string, toIso: string): string[] {
  const out: string[] = [];
  const from = new Date(fromIso);
  const to = new Date(toIso);
  // iterate days
  const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()));
  while (cursor.getTime() < to.getTime()) {
    const localKigali = new Date(cursor.getTime() + KIGALI_OFFSET_HOURS * 3600_000);
    const dow = localKigali.getUTCDay();
    if (dow >= 1 && dow <= 5) {
      const y = localKigali.getUTCFullYear();
      const m = localKigali.getUTCMonth();
      const d = localKigali.getUTCDate();
      for (const h of SLOT_HOURS) {
        const slot = new Date(Date.UTC(y, m, d, h - KIGALI_OFFSET_HOURS, 0, 0));
        if (slot >= from && slot < to) out.push(slot.toISOString());
      }
    }
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return out;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
import { corsHeaders } from "../_shared/cors.ts";
import { adminClient } from "../_shared/google.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { token } = await req.json();
    if (!token) return json({ ok: false, error: "Missing token" }, 400);

    const supabase = adminClient();
    const { data: rows } = await supabase
      .from("bookings")
      .select("id, slot_start, client_name, client_email, status")
      .eq("cancellation_token", token)
      .limit(1);

    if (!rows || rows.length === 0) {
      return json({ ok: false, error: "Booking not found." });
    }
    const b = rows[0];
    if (b.status === "cancelled") {
      return json({ ok: false, error: "This booking has already been cancelled." });
    }
    const within24h = new Date(b.slot_start).getTime() - Date.now() < 24 * 3600_000;
    return json({
      ok: true,
      booking: {
        slotStartUtc: b.slot_start,
        clientName: b.client_name,
        clientEmail: b.client_email,
        within24h,
      },
    });
  } catch (e) {
    return json({ ok: false, error: (e as Error).message }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
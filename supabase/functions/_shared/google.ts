// deno-lint-ignore-file no-explicit-any
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export function adminClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

/** Returns a valid access_token, refreshing if needed. Returns null if no token row. */
export async function getGoogleAccessToken(supabase: SupabaseClient): Promise<{ accessToken: string; email: string } | null> {
  const { data } = await supabase
    .from("google_oauth_tokens")
    .select("id, refresh_token, access_token, expires_at, google_email")
    .order("updated_at", { ascending: false })
    .limit(1);
  if (!data || data.length === 0) return null;
  const row = data[0];

  const expires = row.expires_at ? new Date(row.expires_at).getTime() : 0;
  if (row.access_token && expires - 60_000 > Date.now()) {
    return { accessToken: row.access_token, email: row.google_email };
  }

  // refresh
  const clientId = Deno.env.get("BookingappClientID")!;
  const clientSecret = Deno.env.get("ClientSecret")!;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: row.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error("token refresh failed", json);
    throw new Error(`Google token refresh failed: ${json.error || res.status}`);
  }
  const access_token = json.access_token as string;
  const expires_in = json.expires_in as number;
  const newExpiresAt = new Date(Date.now() + expires_in * 1000).toISOString();
  await supabase
    .from("google_oauth_tokens")
    .update({ access_token, expires_at: newExpiresAt, updated_at: new Date().toISOString() })
    .eq("id", row.id);
  return { accessToken: access_token, email: row.google_email };
}

/** List busy time blocks via Calendar freebusy API. */
export async function getCalendarBusy(accessToken: string, fromIso: string, toIso: string): Promise<Array<{ start: string; end: string }>> {
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timeMin: fromIso,
      timeMax: toIso,
      items: [{ id: "primary" }],
    }),
  });
  if (!res.ok) {
    console.error("freebusy failed", await res.text());
    return [];
  }
  const json = await res.json();
  return json?.calendars?.primary?.busy ?? [];
}

export async function createCalendarEvent(accessToken: string, payload: {
  summary: string;
  description: string;
  startIso: string;
  endIso: string;
  attendeeEmail: string;
  attendeeName: string;
}): Promise<{ id: string; htmlLink?: string } | null> {
  const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      summary: payload.summary,
      description: payload.description,
      start: { dateTime: payload.startIso, timeZone: "Africa/Kigali" },
      end: { dateTime: payload.endIso, timeZone: "Africa/Kigali" },
      attendees: [{ email: payload.attendeeEmail, displayName: payload.attendeeName }],
      reminders: { useDefault: true },
    }),
  });
  if (!res.ok) {
    console.error("create event failed", await res.text());
    return null;
  }
  const json = await res.json();
  return { id: json.id, htmlLink: json.htmlLink };
}

export async function deleteCalendarEvent(accessToken: string, eventId: string): Promise<void> {
  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}?sendUpdates=all`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok && res.status !== 404 && res.status !== 410) {
    console.error("delete event failed", await res.text());
  }
}

/** Send an email via Gmail send API. */
export async function sendGmail(accessToken: string, payload: {
  to: string;
  cc?: string;
  subject: string;
  text: string;
  html?: string;
  fromName?: string;
  fromEmail: string;
}): Promise<boolean> {
  const boundary = `boundary_${crypto.randomUUID()}`;
  const fromHeader = payload.fromName ? `${payload.fromName} <${payload.fromEmail}>` : payload.fromEmail;

  const headers = [
    `From: ${fromHeader}`,
    `To: ${payload.to}`,
    payload.cc ? `Cc: ${payload.cc}` : null,
    `Subject: ${encodeSubject(payload.subject)}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].filter(Boolean).join("\r\n");

  const htmlBody = payload.html ?? `<pre style="font-family:inherit">${escapeHtml(payload.text)}</pre>`;

  const body = [
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    payload.text,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    htmlBody,
    ``,
    `--${boundary}--`,
  ].join("\r\n");

  const raw = `${headers}\r\n\r\n${body}`;
  const encoded = base64UrlEncode(raw);

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: encoded }),
  });
  if (!res.ok) {
    console.error("gmail send failed", await res.text());
    return false;
  }
  return true;
}

function encodeSubject(s: string): string {
  // RFC 2047 encoded-word for safety with non-ASCII
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(s)) return s;
  return `=?UTF-8?B?${btoa(unescape(encodeURIComponent(s)))}?=`;
}

function base64UrlEncode(s: string): string {
  const b64 = btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
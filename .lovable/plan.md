# Lead pipeline — implementation plan

## 1. Database (migration)

Create `public.leads`:

- `id uuid pk default gen_random_uuid()`
- `created_at timestamptz not null default now()`
- `name text not null`
- `email text not null`
- `phone text`
- `message text not null`
- `source_page text not null`
- `email_status text not null default 'pending'` — one of `pending`, `sent`, `failed`

Grants + RLS:

- `GRANT INSERT ON public.leads TO anon, authenticated;`
- `GRANT ALL ON public.leads TO service_role;`
- Enable RLS.
- Policy: `anon` + `authenticated` can `INSERT` only (`WITH CHECK (true)`).
- **No SELECT policy** → nobody can read from the client. Admins read via edge function / dashboard.

## 2. Edge function `send-lead-email`

New file: `supabase/functions/send-lead-email/index.ts`.

Behavior:

1. CORS + POST-only.
2. Validate payload with zod: `name` (1–100), `email` (valid, ≤255), `phone` (optional, ≤30), `message` (10–2000), `source_page` (≤120). Return `400` with field errors on failure.
3. **Insert into `leads` first** using the service-role client with `email_status = 'pending'`. The insert is the source of truth. If it fails → return `500`.
4. Send two Resend emails **independently** (each in its own try/catch, run in parallel with `Promise.allSettled`):
   - **Notification to `mutidan@gmail.com`**
     - `from: "Beacon Website <noreply@beaconattorneys.rw>"`
     - `subject: "New lead from {name} — {source_page}"`
     - `reply_to: <client email>` so replies go straight back to the lead
     - Body (HTML + plaintext): name, email, phone, message, source_page, timestamp, lead id
   - **Auto-reply to the client**
     - `from: "Beacon Attorneyes & Consultants <noreply@beaconattorneys.rw>"`
     - Friendly confirmation matching the site's tone (thanks, we'll respond within one business day, contact info)
5. After both attempts:
   - Notification succeeded → `UPDATE leads SET email_status='sent'`.
   - Notification failed → `UPDATE leads SET email_status='failed'` and `console.error` full Resend response.
   - Auto-reply failure is logged but does **not** affect `email_status` (per spec, the source-of-truth email is the one to you).
6. Always return `200 { ok: true, leadId }` when the DB insert succeeded, even if emails failed. The lead is never lost.
7. Uses `RESEND_API_KEY` (server-only). Never returned to client.

## 3. Secret

Request `RESEND_API_KEY` via the secrets tool (opens a secure form). Do not hard-code.

## 4. Frontend — new shared component

New file: `src/components/LeadForm.tsx` — a compact form (name, email, phone optional, message) with:

- zod validation identical to server
- submit button disabled + `Loader2` spinner while submitting
- calls `supabase.functions.invoke("send-lead-email", { body: { ...fields, source_page } })`
- shows success state (thank-you card) only on genuine `data.ok === true`
- shows actual error text on failure — no fake success ever

Also add a lightweight `<LeadFormDialog trigger={...} sourcePage="..." />` wrapper that opens the form in a shadcn `Dialog` so we can plug it behind existing CTA buttons/links without redesigning them.

## 5. Wire every CTA surface

Replace / augment (styling unchanged — only the click handler and href are swapped):

- **`src/pages/Contact.tsx`** — add the full `<LeadForm sourcePage="contact-page" />` on the page below the info tiles. Keep the mailto/tel tiles as secondary options.
- **`src/components/Footer.tsx`** — the `info@beaconattorneys.rw` link becomes a button that opens `<LeadFormDialog sourcePage="footer" />`. `tel:` link stays as-is (calls are fine).
- **`src/pages/Index.tsx`** — the two hero/mid `mailto:` CTAs (lines 428, 560) become `<LeadFormDialog sourcePage="home-hero" />` / `sourcePage="home-mid"`. The `tel:` link (line 603) stays.
- **`src/components/BookConsultation.tsx`** — *left unchanged*. It already writes to `bookings` and sends Gmail confirmations via your connected Google account; that pipeline works. We won't disturb the booking flow.

## 6. What you'll need to do on your side

Told to you after implementation, but for planning visibility:

1. **Sign up at [resend.com](https://resend.com)** (free tier is enough to start).
2. **Add and verify the domain `beaconattorneys.rw`** in Resend → *Domains* → *Add Domain*.
3. **Add these DNS records** at your registrar for `beaconattorneys.rw` (Resend will show the exact values — copy them verbatim):
   - `TXT` — SPF (`v=spf1 include:_spf.resend.com ~all` or Resend's shown value)
   - `TXT` — DKIM (record name like `resend._domainkey`, long value from Resend)
   - `TXT` — DMARC (recommended, e.g. `v=DMARC1; p=none;`)
   - `MX` — for bounce handling (optional but recommended; Resend shows the exact host/priority)
4. Wait for Resend to mark the domain **Verified** (usually minutes, up to a few hours).
5. In Resend → *API Keys*, create a key with "Sending access". Copy it.
6. Paste it into the secure form Lovable opens for `RESEND_API_KEY`. Done.

Until DNS verifies, sends will fail — but leads will still be captured in the `leads` table with `email_status = 'failed'`, so nothing is ever lost. Once the domain verifies, retries for individual leads can be triggered by a follow-up admin action if desired.

## Technical summary of files touched

- `supabase/migrations/<new>.sql` — create `leads` + RLS + grants
- `supabase/functions/send-lead-email/index.ts` — new function
- `src/components/LeadForm.tsx` — new
- `src/components/LeadFormDialog.tsx` — new
- `src/pages/Contact.tsx` — add form section
- `src/components/Footer.tsx` — swap mailto link → dialog trigger
- `src/pages/Index.tsx` — swap two mailto CTAs → dialog triggers
- Secret: `RESEND_API_KEY` requested via secure form

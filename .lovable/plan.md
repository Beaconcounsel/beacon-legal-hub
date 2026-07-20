## Goal
Guarantee no link, redirect, or asset in the UI ever hits `api.whatsapp.com` (which triggers `ERR_BLOCKED_BY_RESPONSE` on some networks/browsers).

## Current state (verified)
- Only one file builds WhatsApp URLs: `src/lib/whatsapp.ts` via `buildWhatsAppUrl()`.
- All CTA components (`WhatsAppLink.tsx`, `Footer.tsx`, `BookConsultation.tsx`, `Contact`, `LeadFormDialog`, mobile menu) go through it.
- Current logic: mobile → `https://wa.me/<num>?text=...`, desktop → `https://web.whatsapp.com/send?...`.
- `wa.me` itself 301-redirects to `https://api.whatsapp.com/send/?...` on many clients — that is what's being blocked.
- No other file references `api.whatsapp.com`, `wa.me`, or `web.whatsapp.com`.

## Change
Rewrite `buildWhatsAppUrl` in `src/lib/whatsapp.ts` to always return a direct `https://web.whatsapp.com/send?phone=<num>&text=<encoded>` URL on every device. `web.whatsapp.com` itself detects mobile UAs and offers to open the native app via its own click-through, without ever routing the browser through `api.whatsapp.com`.

No component, i18n, or styling changes — every CTA already calls `buildWhatsAppUrl`, so this single change removes the redirect chain everywhere.

## Verification
1. `rg -n "api\.whatsapp|wa\.me"` across `src/`, `public/`, `index.html`, `supabase/` → expect zero matches (comments included).
2. `bun run build`, then `rg -n "api\.whatsapp|wa\.me" dist/` → expect zero matches in the built bundle.
3. Playwright: load `/`, `/contact`, open the consultation section and the lead dialog; assert every WhatsApp `<a>` has `href` starting with `https://web.whatsapp.com/send?phone=250788559603&text=`.
4. Playwright network intercept: click one WhatsApp CTA with a request listener attached to the new tab; assert no request URL contains `api.whatsapp.com`.

## Out of scope
- Analytics events, i18n strings, icon, button styles, and the disclaimer stay exactly as they are.
- No changes to `Footer` layout or the mobile menu.

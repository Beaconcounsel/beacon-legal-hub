Plan: Restore custom domain after DNS mismatch on Cloudflare

1. **Confirm current state**
   - Open **Project Settings → Project → Domains** and note the exact status for `beaconattorneys.rw` / `www.beaconattorneys.rw` (Offline, Verifying, Action required, etc.).
   - Open Cloudflare DNS and confirm whether the **orange cloud (proxy)** is on or off for the root (`@`) and `www` records.

2. **Choose the correct setup path based on Cloudflare proxy mode**
   - **Path A — Cloudflare proxy is OFF**: keep both A records pointing directly to `185.158.133.1` (Lovable IP) and ensure the TXT record `_lovable` with `lovable_verify=...` is present.
   - **Path B — Cloudflare proxy is ON**: go to **Project Settings → Domains → Configure** for the domain, expand **Advanced**, and enable **"Domain uses Cloudflare or a similar proxy"**. This switches Lovable to CNAME-based verification. Then replace the A records with the CNAME records Lovable provides for both `@` and `www`, and keep the TXT record as shown.

3. **Remove conflicting records**
   - In Cloudflare, delete any old A, CNAME, or ALIAS records for `@` or `www` that point to a different host or IP, leaving only the correct set from step 2.

4. **Wait and verify**
   - DNS propagation can take up to 72 hours. In Lovable, use the domain status check or **Retry** if it shows Failed. The site should return to Active once records match.

5. **Test the live site**
   - Visit `https://www.beaconattorneys.rw` and the Lovable `.lovable.app` URL to confirm the site loads with HTTPS. If the Lovable URL works but the custom domain does not, the issue is purely DNS-related.

6. **Plan outcome**
   - The custom domain returns to Active status and the site is reachable at `https://www.beaconattorneys.rw`.
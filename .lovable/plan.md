Plan: Fix the beaconattorneys.rw outage caused by Cloudflare Error 1000

Current state found:
- `https://www.beaconattorneys.rw` loads fine (HTTP 200).
- `https://beaconattorneys.rw` returns Cloudflare Error 1000: "DNS points to prohibited IP".
- Both root and `www` have A records pointing to Lovable's IP `185.158.133.1`.
- The `.lovable.app` published URL also redirects to `https://www.beaconattorneys.rw/`.
- Cloudflare is currently proxying (orange cloud) the domain, which is incompatible with the current A-record setup.

Recommended fix (fastest path to restore the site):

1. **Open Cloudflare DNS for beaconattorneys.rw**
   - Find the `@` (root) and `www` records.

2. **Turn off Cloudflare proxy for both records**
   - Click the orange cloud icon to make it grey for both `@` and `www`.
   - Keep the A records pointed to `185.158.133.1`.
   - Keep the `_lovable` TXT record as is: `lovable_verify=c4952dc804653fd622ceb0d88a1ec9593aeb6f2d7c38489937b1a80b464df6a9`.

3. **Remove any conflicting DNS records**
   - Delete any additional A/CNAME records for `@` or `www` that point elsewhere.

4. **Wait for DNS propagation**
   - Changes can take up to a few minutes to a few hours, rarely 72 hours.

5. **Verify the fix**
   - `https://beaconattorneys.rw` should stop returning Cloudflare Error 1000 and either load the site or redirect to `https://www.beaconattorneys.rw/`.
   - `https://www.beaconattorneys.rw` should continue loading with HTTP 200.

Optional alternative (if you need Cloudflare proxy features):

1. In **Lovable → Project Settings → Domains → Configure** for the domain, expand **Advanced**, and enable **"Domain uses Cloudflare or a similar proxy"**.
2. Lovable will switch to CNAME-based verification.
3. In Cloudflare, replace the A records for `@` and `www` with the CNAME records Lovable provides (Cloudflare supports CNAME flattening at the root).
4. Keep the TXT record as shown.

Plan outcome:
- The root domain `beaconattorneys.rw` no longer serves Cloudflare Error 1000.
- Both root and `www` resolve correctly to the live site.
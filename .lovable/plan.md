## Goal
Diagnose the current `RESEND_API_KEY` value and Resend failure without exposing the full secret, changing email logic, or asking for the key again.

## Plan
1. **Add temporary safe debug logging**
   - In `supabase/functions/send-lead-email/index.ts`, add a short log immediately after:
     ```ts
     Deno.env.get("RESEND_API_KEY")
     ```
   - The log will include only:
     - whether the value is missing/nullish
     - total character length
     - first 3 characters
     - last 2 characters
     - whether it contains a space, tab, newline, or carriage return
   - It will not log the full key or any middle characters.

2. **Confirm the exact secret lookup and backend location**
   - Report the exact `Deno.env.get(...)` string copied from the code.
   - Confirm this project is using Lovable Cloud.
   - Deploy the temporary function to the same Lovable Cloud backend where Cloud → Secrets are stored.

3. **Trigger the function and collect raw diagnostics**
   - Invoke `send-lead-email` with a test payload.
   - Read the edge function logs.
   - Report, in one message:
     - the safe secret diagnostics from the log
     - the exact `Deno.env.get(...)` string
     - Lovable Cloud/backend deployment confirmation
     - Resend HTTP status code and the complete raw JSON error body exactly as returned by Resend

4. **Stop before cleanup**
   - Make no auth/header/function-logic changes.
   - Do not request or re-enter the secret.
   - Wait for your confirmation.
   - After you confirm the diagnosis, remove the temporary debug logging and redeploy.
## Goal
Rewrite the automatic visitor auto-reply emails — lead confirmation and booking confirmation — so they sound like they come from a professional corporate law firm, not a generic app. Deliver both English and French versions, and route them automatically based on the user's selected language.

## Scope (from your answers)
- **Templates to rewrite:** `lead-confirmation` and `booking-confirmation` (visitor auto-replies only).
- **Admin notifications** (`lead-notification`, `booking-notification`) will remain as-is unless you change your mind.
- **Languages:** English + French.
- **Tone:** Formal corporate — reserved, precise, courteous, no exclamation marks or casual filler.

## Draft prompt

```text
You are a senior legal communications writer for Beacon Attorneyes & Consultants, a corporate law firm based in Kigali, Rwanda. Rewrite the following transactional email templates so they read as formal, precise, and professional — like a top-tier corporate law firm, not a generic SaaS app.

Brand voice rules:
- Use formal, courteous, and clear language.
- Avoid exclamation marks, emojis, slang, and overly casual phrases.
- Refer to the firm as "Beacon Attorneyes & Consultants".
- Include a short confidentiality / "not legal advice" notice where appropriate.
- Provide specific next steps, expectations, and contact details.
- Keep the tone reserved but accessible.

Firm details to include when relevant:
- Name: Beacon Attorneyes & Consultants
- Address: KG 190 St, RIM House, 1st Floor, Kigali, Rwanda
- Phone: +250 788 55 96 03
- General email: info@beaconattorneys.rw
- Consultation host: Daniel Mutiganda

For each template, provide:
1. English subject line
2. English body copy (plain text, suitable for a React Email template)
3. French subject line
4. French body copy (formal "vous", not "tu")

Templates to rewrite:

A. Lead confirmation (sent to a visitor after they submit the contact form)
Current tone: "Thank you, {name}. We have received your message and a member of our team will get back to you shortly — typically within one business day."
Required content:
- Acknowledge receipt of the inquiry.
- State that the firm will review the matter and respond within one business day.
- Mention that the appropriate legal team will be assigned.
- Include a brief confidentiality notice.
- Provide contact info for urgent matters.
- Use a professional sign-off.

B. Booking confirmation (sent to a visitor after they book a consultation)
Current tone: "Your consultation with Daniel Mutiganda is confirmed for {appointmentTime}. Need to cancel? ..."
Required content:
- Confirm the appointment is scheduled.
- Show the date, time, and host (Daniel Mutiganda).
- Mention the matter type if provided.
- Include the cancellation policy (24 hours = free; late cancellation / no-show = full fee).
- Provide a clear action to cancel or reschedule.
- Note that a calendar invitation may follow.
- Include a brief confidentiality / "not legal advice" disclaimer.
- Use a professional sign-off.

Formatting rules:
- Each body should be 4–7 short paragraphs.
- Subject lines should be concise and specific.
- French translations must match the formal corporate tone and use "vous".
- Do not include raw HTML, CSS, or design code — only copy.
```

## Implementation plan
1. **Capture language on the frontend**
   - Read the active `i18n.language` in `LeadForm` and `BookConsultation`.
   - Pass `language: "en" | "fr"` to the `send-lead-email` and `create-booking` Edge Functions.

2. **Update the Edge Functions**
   - Accept and validate the `language` field in `send-lead-email` and `create-booking`.
   - Choose the template name based on language: `lead-confirmation` / `lead-confirmation-fr`, and `booking-confirmation` / `booking-confirmation-fr`.

3. **Create French templates**
   - Add `lead-confirmation-fr.tsx` and `booking-confirmation-fr.tsx` under `supabase/functions/_shared/transactional-email-templates/`.
   - Register both in `registry.ts`.

4. **Rewrite the English templates**
   - Use the prompt above to generate the new English copy for `lead-confirmation.tsx` and `booking-confirmation.tsx`.
   - Apply the same professional structure: firm logo, header, body, disclaimer, footer.

5. **Apply design consistency**
   - Keep the existing navy/gold/white color palette and Georgia typography.
   - Optionally add a subtle "Confidentiality" box to make the legal context explicit.

6. **Deploy**
   - Deploy `send-lead-email`, `create-booking`, and `send-transactional-email` (registry changes) so the new templates are live.

7. **Test end-to-end**
   - Submit a contact form in English and in French; verify the correct auto-reply is received.
   - Book a consultation in English and in French; verify the correct confirmation is received.

## Notes
- Admin notifications will stay in English and keep their current factual tone; only client-facing auto-replies are being rewritten.
- The French variants will use the formal "vous" form, consistent with corporate legal communication in Rwanda and the broader Francophone market.
- Once you approve the prompt above, I will generate the new copy and implement it directly in the project.

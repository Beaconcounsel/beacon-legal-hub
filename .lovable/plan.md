## Goal

Wire the **Book a Consultation** CTA button and the **Legal Inquiry form** (inside `BookConsultation.tsx`) into the existing `react-i18next` system so they render French strings when the EN/FR toggle is set to FR. Keep all layout, styling, and brand colors unchanged.

## Findings

- The home-page CTA section in `src/pages/Index.tsx` ("Connect With Us Today" / "Call Now") is **already fully translated** in both `en.json` and `fr.json` — no fix needed there.
- The page header / nav "Get in Touch" link already resolves to "Nous Contacter" via `nav.getInTouch` in `fr.json`. We'll add the user-requested wording.
- The **only place** the listed English strings are still hard-coded is **`src/components/BookConsultation.tsx`** (the "Book a Consultation" gold button, the "Legal Inquiry" step card, and its form labels/buttons). This component currently does not import `useTranslation` at all — that is the actual bug.

## Changes

### 1. `src/i18n/en.json` and `src/i18n/fr.json`

Add a new `bookConsult` namespace used by the component. Example shape:

```json
"bookConsult": {
  "ctaButton": "Book a Consultation",          // FR: "Prendre un Rendez-vous"
  "close": "Close",                            // FR: "Fermer"
  "step": "Step",
  "edit": "Edit",                              // FR: "Modifier"
  "legalInquiry": "Legal Inquiry",             // FR: "Demande Juridique"
  "fullName": "Full Name",                     // FR: "Nom Complet"
  "email": "Email Address",                    // FR: "Adresse E-mail"
  "phone": "Phone Number",                     // FR: "Numéro de Téléphone"
  "areaOfLaw": "Area of Law",                  // FR: "Domaine Juridique"
  "selectArea": "Select area of law",          // FR placeholder
  "message": "Message",                        // FR: "Message"
  "describePlaceholder": "Briefly describe your matter…",
  "continue": "Continue",                      // FR: "Continuer"
  "sendMessage": "Send Message",               // FR: "Envoyer le Message"
  "submit": "Submit",                          // FR: "Envoyer"
  "preferredChannel": "Preferred Channel",     // FR: "Canal Préféré"
  "channelHint": "Choose one or both…",
  "pickSlot": "Pick a Time Slot",              // FR: "Choisir un Créneau"
  "slotHint": "Available 1-hour slots…",
  "selectedSlot": "Selected slot",
  "changeSlot": "Change slot",
  "cancellationPolicy": "Cancellation Policy",
  "policyLine1": "Cancellations made at least 24 hours…",
  "policyLine2": "Cancellations made less than 24 hours…",
  "policyLine3": "No-shows are also subject…",
  "acceptTerms": "I have read and accept the Terms & Conditions…",
  "termsError": "You must accept the Terms & Conditions",
  "confirming": "Confirming…",
  "confirmBooking": "Confirm Booking",
  "bookedTitle": "Consultation booked",
  "bookedDesc": "We've sent a confirmation to {{email}}…",
  "bookAnother": "Book another",
  "respondWithin24h": "Our team will get back to you within 24 hours" // FR: "Notre équipe vous répondra dans les 24 heures"
}
```

The French file mirrors the same keys with the translations specified in the user's brief (and natural French for the supporting strings).

### 2. `src/components/BookConsultation.tsx`

- Import `useTranslation` from `react-i18next` and call `const { t } = useTranslation();` inside the component.
- Replace every hard-coded English string (button label, "Close", "Step", "Edit", "Legal Inquiry", "Full Name *", "Email *", matter-type select label/placeholder, textarea label/placeholder, "Continue", "Preferred Channel" copy, "Pick a Time Slot" copy, cancellation policy text, "Confirm Booking", success state, etc.) with the matching `t("bookConsult.<key>")` call.
- Also translate the toast strings ("Please complete the required fields.", "Select at least one preferred channel.", "Booking confirmed! …", "Something went wrong…") using the same namespace.
- Add a small intro line above the gold button rendering `t("bookConsult.respondWithin24h")` so the "Our team will get back to you within 24 hours" copy exists and is translatable (it does not exist in the current UI). This is a tiny copy add directly above the CTA — no layout/section restructuring.

### 3. No other files touched

- No changes to `Header.tsx`, `Footer.tsx`, `Index.tsx`, `Contact.tsx`, or any routing/styling.
- No changes to `client.ts`, `types.ts`, `.env`, or `config.toml`.
- Brand tokens, gold variant, spacing, and responsiveness stay exactly as they are.

## Verification

1. Toggle EN → FR in the header on `/` and `/fr/`.
2. Confirm the gold "Book a Consultation" button reads **"Prendre un Rendez-vous"** in FR.
3. Open the form: step title shows **"Demande Juridique"**, labels show **Nom Complet / Adresse E-mail / Domaine Juridique / Message**, primary action shows **Envoyer**, secondary actions reflect FR.
4. Toggle back to EN — original English text returns.
5. Run the existing brand-name test to confirm nothing regressed.

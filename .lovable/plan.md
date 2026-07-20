Update the default WhatsApp message in `src/lib/whatsapp.ts` and ensure all page-specific templates (homepage, practice areas, contact, etc.) use the same new text, replacing the current message with:

"Hello Beacon Attorneys, I visited your website and appreciated your experience and focus on business law, I would like your guidance on legal issue I have, when can you be available to discuss it?"

Then run the WhatsApp audit and build to verify the change is applied correctly and passes CI checks.
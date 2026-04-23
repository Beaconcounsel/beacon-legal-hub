/**
 * WhatsApp deep-link helpers tuned for Kigali / Rwanda contacts.
 *
 * - Normalizes the phone to E.164-style digits (no '+', no spaces).
 * - Auto-prefixes the firm's default country code (Rwanda, 250) when the
 *   stored number is local (e.g. starts with "07" or is missing the code).
 * - On mobile, uses wa.me (best app handoff). On desktop, uses
 *   api.whatsapp.com/send which is more reliable for triggering WhatsApp Web.
 */

export const FIRM_COUNTRY_CODE = "250"; // Rwanda
export const FIRM_WHATSAPP_NUMBER = "788559603"; // National significant number for +250 788 55 96 03

export function normalizeWhatsAppNumber(
  raw: string,
  defaultCountryCode: string = FIRM_COUNTRY_CODE
): string {
  // Keep digits only.
  let digits = (raw || "").replace(/\D+/g, "");

  // Drop a single leading 0 (national trunk prefix used in Rwanda + many EAC countries).
  if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");

  // If the number doesn't already start with the country code, prepend it.
  if (!digits.startsWith(defaultCountryCode)) {
    // Guard against double-prefix when user typed e.g. "+250250..."
    digits = `${defaultCountryCode}${digits}`;
  }

  return digits;
}

function isMobileUA(): boolean {
  if (typeof navigator === "undefined") return false;
  return /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
}

export function buildWhatsAppLink(
  rawNumber: string,
  text: string,
  opts: { countryCode?: string } = {}
): string {
  const phone = normalizeWhatsAppNumber(rawNumber, opts.countryCode);
  const encoded = encodeURIComponent(text);
  return isMobileUA()
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
}

export function openWhatsApp(
  rawNumber: string,
  text: string,
  opts: { countryCode?: string } = {}
): void {
  const url = buildWhatsAppLink(rawNumber, text, opts);
  window.open(url, "_blank", "noopener,noreferrer");
}

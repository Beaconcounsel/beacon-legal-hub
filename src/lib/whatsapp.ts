export const WHATSAPP_NUMBER = "250788559603";
export const WHATSAPP_DISPLAY = "+250 788 55 96 03";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Beacon Attorneys and Consultants. I visited your website and would like to request a consultation regarding [briefly describe your legal matter].";

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function trackWhatsAppClick(source: string): void {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>;
      gtag?: (...args: unknown[]) => void;
    };
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: "whatsapp_cta_click", source });
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", "whatsapp_cta_click", { source });
    }
  } catch {
    // no-op
  }
}
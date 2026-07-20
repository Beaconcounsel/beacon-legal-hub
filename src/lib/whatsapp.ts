export const WHATSAPP_NUMBER = "250788559603";
export const WHATSAPP_DISPLAY = "+250 788 55 96 03";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Beacon Attorneys and Consultants. I visited your website and would like to request an initial consultation.";

const WHATSAPP_MESSAGES = {
  homepage: DEFAULT_WHATSAPP_MESSAGE,
  corporateCommercial:
    "Hello Beacon Attorneys and Consultants. I would like assistance regarding a corporate or commercial legal matter.",
  employmentLaw:
    "Hello Beacon Attorneys and Consultants. I would like assistance regarding an employment-law matter.",
  intellectualProperty:
    "Hello Beacon Attorneys and Consultants. I would like assistance regarding an intellectual-property matter.",
  disputeResolution:
    "Hello Beacon Attorneys and Consultants. I would like assistance regarding mediation, arbitration or dispute resolution.",
  contact:
    "Hello Beacon Attorneys and Consultants. I visited your Contact page and would like to speak with your legal team.",
} as const;

export type WhatsAppPracticeArea =
  | "corporate_commercial"
  | "employment_law"
  | "intellectual_property"
  | "dispute_resolution"
  | "general";

export type WhatsAppCtaLocation =
  | "homepage_cta"
  | "practice_area_cta"
  | "contact_page"
  | "footer"
  | "mobile_menu"
  | string;

export function getWhatsAppPracticeArea(pathname = "", hash = ""): WhatsAppPracticeArea {
  const route = `${pathname} ${hash}`.toLowerCase();
  if (route.includes("corporate") || route.includes("commercial")) return "corporate_commercial";
  if (route.includes("employment") || route.includes("labour") || route.includes("labor")) return "employment_law";
  if (route.includes("intellectual") || route.includes("ip")) return "intellectual_property";
  if (route.includes("dispute") || route.includes("arbitration") || route.includes("mediation")) return "dispute_resolution";
  return "general";
}

export function getWhatsAppMessage(pathname = "", hash = ""): string {
  const normalizedPath = pathname.toLowerCase();
  if (normalizedPath.includes("/contact")) return WHATSAPP_MESSAGES.contact;

  const practiceArea = getWhatsAppPracticeArea(pathname, hash);
  if (practiceArea === "corporate_commercial") return WHATSAPP_MESSAGES.corporateCommercial;
  if (practiceArea === "employment_law") return WHATSAPP_MESSAGES.employmentLaw;
  if (practiceArea === "intellectual_property") return WHATSAPP_MESSAGES.intellectualProperty;
  if (practiceArea === "dispute_resolution") return WHATSAPP_MESSAGES.disputeResolution;

  return WHATSAPP_MESSAGES.homepage;
}

export function getWhatsAppCtaLocation(source: string, pathname = ""): WhatsAppCtaLocation {
  if (source === "footer" || source === "footer_social") return "footer";
  if (source === "mobile_menu") return "mobile_menu";
  if (pathname.includes("/contact")) return "contact_page";
  if (pathname.includes("/practice-areas")) return "practice_area_cta";
  if (pathname === "/" || pathname === "/fr" || pathname.includes("/home")) return "homepage_cta";
  return source;
}

function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildWhatsAppFallbackUrl(customMessage?: string): string {
  const text = encodeURIComponent(customMessage ?? DEFAULT_WHATSAPP_MESSAGE);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`;
}

export function trackWhatsAppClick({
  ctaLocation,
  practiceArea = "general",
}: {
  ctaLocation: WhatsAppCtaLocation;
  practiceArea?: WhatsAppPracticeArea;
}): void {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as {
      dataLayer?: Array<Record<string, unknown>>;
      gtag?: (...args: unknown[]) => void;
    };
    const payload = {
      page_path: `${window.location.pathname}${window.location.hash}`,
      page_title: document.title,
      cta_location: ctaLocation,
      practice_area: practiceArea,
      device_type: getDeviceType(),
    };

    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: "whatsapp_click", ...payload });
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", "whatsapp_click", payload);
    }
  } catch {
    // no-op
  }
}
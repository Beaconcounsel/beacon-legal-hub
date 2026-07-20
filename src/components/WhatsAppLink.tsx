import { forwardRef, MouseEvent, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  buildWhatsAppUrl,
  buildWhatsAppDeepLink,
  getWhatsAppCtaLocation,
  getWhatsAppMessage,
  getWhatsAppPracticeArea,
  trackWhatsAppClick,
} from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

type Variant = "button" | "icon" | "inline";

interface Props {
  source: string;
  variant?: Variant;
  className?: string;
  iconClassName?: string;
  children?: ReactNode;
  ariaLabel?: string;
  customMessage?: string;
  showIcon?: boolean;
}

const WhatsAppLink = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      source,
      variant = "inline",
      className,
      iconClassName,
      children,
      ariaLabel,
      customMessage,
      showIcon = true,
    },
    ref,
  ) => {
    const location = useLocation();
    const message = customMessage ?? getWhatsAppMessage(location.pathname, location.hash);
    // Primary href = wa.me (works everywhere, and on mobile opens the app directly
    // without hitting api.whatsapp.com). On desktop, wa.me would 302 to api.whatsapp.com
    // which is blocked on some networks — so on click we swap to the whatsapp:// scheme,
    // which the OS hands to the installed WhatsApp Desktop / phone app with no HTTP hop.
    const href = buildWhatsAppUrl(message);
    const deepLink = buildWhatsAppDeepLink(message);
    const ctaLocation = getWhatsAppCtaLocation(source, location.pathname);
    const practiceArea = getWhatsAppPracticeArea(location.pathname, location.hash);

    const base =
      variant === "button"
        ? "inline-flex items-center justify-center gap-2 rounded-md border border-primary/40 bg-transparent px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        : variant === "icon"
        ? "inline-flex items-center justify-center transition-colors"
        : "inline-flex items-center gap-1.5 text-sm font-medium transition-colors";

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      trackWhatsAppClick({ ctaLocation, practiceArea });
      // On desktop, prefer the whatsapp:// deep link to avoid the wa.me → api.whatsapp.com
      // redirect (blocked on some corporate/ISP networks). Mobile keeps wa.me for the
      // smoothest in-app handoff.
      if (typeof window === "undefined") return;
      const isMobile = /android|iphone|ipad|ipod/i.test(window.navigator.userAgent);
      if (isMobile) return;
      e.preventDefault();
      window.location.href = deepLink;
    };

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel ?? "Contact Beacon Attorneyes and Consultants on WhatsApp"}
        onClick={handleClick}
        data-analytics="whatsapp_click"
        data-cta-location={ctaLocation}
        data-practice-area={practiceArea}
        data-whatsapp-primary-url={href}
        className={cn(base, className)}
      >
        {showIcon && (
          <WhatsAppIcon className={cn(variant === "icon" ? "w-4 h-4" : "w-4 h-4", iconClassName)} />
        )}
        {children}
      </a>
    );
  },
);

WhatsAppLink.displayName = "WhatsAppLink";

export default WhatsAppLink;
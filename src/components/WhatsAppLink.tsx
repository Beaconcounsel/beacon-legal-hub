import { forwardRef, MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, trackWhatsAppClick } from "@/lib/whatsapp";
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
    const href = buildWhatsAppUrl(customMessage);

    const base =
      variant === "button"
        ? "inline-flex items-center justify-center gap-2 rounded-md border border-primary/40 bg-transparent px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        : variant === "icon"
        ? "inline-flex items-center justify-center transition-colors"
        : "inline-flex items-center gap-1.5 text-sm font-medium transition-colors";

    const handleClick = (_e: MouseEvent<HTMLAnchorElement>) => {
      trackWhatsAppClick(source);
    };

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel ?? "Contact Beacon Attorneys on WhatsApp"}
        onClick={handleClick}
        data-analytics="whatsapp_cta_click"
        data-source={source}
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
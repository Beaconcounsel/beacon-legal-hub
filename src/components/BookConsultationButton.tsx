import { forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLocalizedPath } from "@/hooks/use-localized-path";

interface Props extends Omit<ButtonProps, "onClick"> {
  showArrow?: boolean;
  label?: string;
}

export const scrollToBooking = () => {
  const el = document.getElementById("book-consultation");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `${window.location.pathname}#book-consultation`);
  }
};

const BookConsultationButton = forwardRef<HTMLButtonElement, Props>(
  ({ showArrow = true, label, variant = "gold", size = "lg", className, children, ...rest }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { localePath } = useLocalizedPath();
    const text = label ?? children ?? t("nav.bookConsultation");

    const handleClick = () => {
      const homePath = localePath("/");
      const onHome = location.pathname === homePath || location.pathname === `${homePath}home` || location.pathname.endsWith("/home");
      const target = document.getElementById("book-consultation");
      if (target) {
        scrollToBooking();
      } else {
        navigate(`${onHome ? location.pathname : homePath}#book-consultation`);
        setTimeout(scrollToBooking, 200);
      }
    };

    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size={size}
        className={className ? `${className} gap-2` : "gap-2"}
        onClick={handleClick}
        {...rest}
      >
        {text}
        {showArrow && <ArrowRight className="w-4 h-4" />}
      </Button>
    );
  }
);

BookConsultationButton.displayName = "BookConsultationButton";

export default BookConsultationButton;
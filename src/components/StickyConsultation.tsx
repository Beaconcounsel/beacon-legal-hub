import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const StickyConsultation = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    const el = document.getElementById("book-consultation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#book-consultation";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Button
        type="button"
        variant="gold"
        onClick={handleClick}
        className="rounded-full shadow-lg shadow-primary/20 px-6"
      >
        {t("sticky.consult")}
      </Button>
    </div>
  );
};

export default StickyConsultation;

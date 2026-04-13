import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useLocalizedPath } from "@/hooks/use-localized-path";
import { Link } from "react-router-dom";

const StickyConsultation = () => {
  const { t } = useTranslation();
  const { localePath } = useLocalizedPath();

  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Link to={localePath("/contact")}>
        <Button variant="gold" className="rounded-full shadow-lg shadow-primary/20 px-6">
          {t("sticky.consult")}
        </Button>
      </Link>
    </div>
  );
};

export default StickyConsultation;

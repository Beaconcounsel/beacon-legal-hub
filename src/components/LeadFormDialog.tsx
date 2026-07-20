import { useState, cloneElement, isValidElement, ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "./LeadForm";
import WhatsAppLink from "@/components/WhatsAppLink";
import { useTranslation } from "react-i18next";

interface Props {
  sourcePage: string;
  trigger: ReactElement;
  title?: string;
  description?: string;
}

const LeadFormDialog = ({ sourcePage, trigger, title, description }: Props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  // Ensure the trigger doesn't submit any outer form
  const wrappedTrigger = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<{ type?: string }>, { type: "button" })
    : trigger;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{wrappedTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title ?? "Get in touch"}</DialogTitle>
          <DialogDescription>
            {description ?? "Send us a message and we'll respond within one business day."}
          </DialogDescription>
        </DialogHeader>
        <LeadForm sourcePage={sourcePage} compact />
        <div className="mt-4 flex flex-col items-center gap-2 border-t border-border pt-4">
          <WhatsAppLink
            source={`lead_dialog:${sourcePage}`}
            variant="inline"
            ariaLabel="Contact Beacon Attorneys and Consultants on WhatsApp"
            className="text-primary hover:text-primary/80"
          >
            {t("bookConsult.orWhatsapp")}
          </WhatsAppLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;
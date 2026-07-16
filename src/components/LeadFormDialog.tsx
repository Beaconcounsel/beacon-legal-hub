import { useState, cloneElement, isValidElement, ReactElement } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "./LeadForm";

interface Props {
  sourcePage: string;
  trigger: ReactElement;
  title?: string;
  description?: string;
}

const LeadFormDialog = ({ sourcePage, trigger, title, description }: Props) => {
  const [open, setOpen] = useState(false);

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
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormDialog;
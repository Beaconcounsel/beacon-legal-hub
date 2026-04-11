import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StickyConsultation = () => (
  <div className="fixed bottom-6 right-6 z-40 md:hidden">
    <Link to="/contact">
      <Button variant="gold" className="rounded-full shadow-lg shadow-primary/20 px-6">
        Consult
      </Button>
    </Link>
  </div>
);

export default StickyConsultation;

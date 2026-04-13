import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/beacon-logo.png";

const Footer = () => (
  <footer className="bg-background text-foreground border-t border-border">
    <div className="container py-8">
      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <img src={logo} alt="Beacon Attorneyes & Consultants" className="h-24 md:h-28 w-auto mb-2" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            A Law Firm for Individuals, Businesses, Institutions, and International Investors.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-2">Practice Areas</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {["Corporate & Commercial", "Banking & Finance", "Dispute Resolution", "Real Estate", "Energy & Infrastructure", "Tax & Structuring"].map((a) => (
              <li key={a}><Link to="/practice-areas" className="hover:text-foreground transition-colors">{a}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-2">Firm</h4>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li><Link to="/#about" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link></li>
            <li><Link to="/international" className="hover:text-foreground transition-colors">International Clients</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground mb-2">Contact</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 text-foreground" />
              <span>Kigali, Rwanda</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-foreground" />
              <a href="tel:+250780000000" className="hover:text-foreground transition-colors">+250 780 000 000</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-foreground" />
              <a href="mailto:info@beaconlaw.rw" className="hover:text-foreground transition-colors">info@beaconlaw.rw</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-muted-foreground">© {new Date().getFullYear()} Beacon Attorneyes & Consultants. All rights reserved.</p>
        <p className="text-[11px] text-muted-foreground">Kigali, Rwanda</p>
      </div>
    </div>
  </footer>
);

export default Footer;

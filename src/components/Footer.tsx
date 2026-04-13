import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/bac-logo.jpg";

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container section-padding">
      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <img src={logo} alt="Beacon Attorneys & Consultants" className="h-12 w-auto mb-3" />
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            A Law Firm for Individuals, Businesses, Institutions, and International Investors.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-sans font-semibold uppercase tracking-wider text-foreground mb-4">Practice Areas</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["Corporate & Commercial", "Banking & Finance", "Dispute Resolution", "Real Estate", "Energy & Infrastructure", "Tax & Structuring"].map((a) => (
              <li key={a}><Link to="/practice-areas" className="hover:text-primary transition-colors">{a}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-sans font-semibold uppercase tracking-wider text-foreground mb-4">Firm</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
            
            <li><Link to="/insights" className="hover:text-primary transition-colors">Insights</Link></li>
            <li><Link to="/international" className="hover:text-primary transition-colors">International Clients</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-sans font-semibold uppercase tracking-wider text-foreground mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 text-primary" />
              <span>Kigali, Rwanda</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+250780000000" className="hover:text-primary transition-colors">+250 780 000 000</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <a href="mailto:info@beaconlaw.rw" className="hover:text-primary transition-colors">info@beaconlaw.rw</a>
            </li>
          </ul>
        </div>
      </div>


      <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Beacon Attorneys & Consultants. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Kigali, Rwanda</p>
      </div>
    </div>
  </footer>
);

export default Footer;

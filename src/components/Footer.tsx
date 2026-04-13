import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/beacon-logo.png";

const Footer = () => (
  <footer className="bg-[#F8F9FB] text-[#1a5c6b] border-t border-[#1a5c6b]/10">
    <div className="container py-8">
      <div className="grid md:grid-cols-4 gap-6">
        <div>
          <img src={logo} alt="Beacon Attorneyes & Consultants" className="h-24 md:h-28 w-auto mb-2" />
          <p className="text-xs text-[#1a5c6b]/60 leading-relaxed">
            A Law Firm for Individuals, Businesses, Institutions, and International Investors.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1a5c6b] mb-2">Practice Areas</h4>
          <ul className="space-y-1 text-xs text-[#1a5c6b]/60">
            {["Corporate & Commercial", "Banking & Finance", "Dispute Resolution", "Real Estate", "Energy & Infrastructure", "Tax & Structuring"].map((a) => (
              <li key={a}><Link to="/practice-areas" className="hover:text-[#1a5c6b] transition-colors">{a}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1a5c6b] mb-2">Firm</h4>
          <ul className="space-y-1 text-xs text-[#1a5c6b]/60">
            <li><Link to="/#about" className="hover:text-[#1a5c6b] transition-colors">About Us</Link></li>
            <li><Link to="/insights" className="hover:text-[#1a5c6b] transition-colors">Insights</Link></li>
            <li><Link to="/international" className="hover:text-[#1a5c6b] transition-colors">International Clients</Link></li>
            <li><Link to="/contact" className="hover:text-[#1a5c6b] transition-colors">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-[#1a5c6b] transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1a5c6b] mb-2">Contact</h4>
          <ul className="space-y-2 text-xs text-[#1a5c6b]/60">
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#1a5c6b]" />
              <span>Kigali, Rwanda</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#1a5c6b]" />
              <a href="tel:+250780000000" className="hover:text-[#1a5c6b] transition-colors">+250 780 000 000</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#1a5c6b]" />
              <a href="mailto:info@beaconlaw.rw" className="hover:text-[#1a5c6b] transition-colors">info@beaconlaw.rw</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#1a5c6b]/10 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-[#1a5c6b]/40">© {new Date().getFullYear()} Beacon Attorneys & Consultants. All rights reserved.</p>
        <p className="text-[11px] text-[#1a5c6b]/40">Kigali, Rwanda</p>
      </div>
    </div>
  </footer>
);

export default Footer;

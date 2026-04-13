import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/beacon-logo.png";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => (
  <footer className="bg-[#F8F9FB] text-[#1a5c6b] border-t border-[#1a5c6b]/10">
    <div className="container py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <img src={logo} alt="Beacon Attorneys & Consultants" className="h-24 md:h-28 w-auto mb-2" />
          <p className="text-xs text-[#1a5c6b]/60 leading-relaxed">
            A Law Firm for Individuals, Businesses, Institutions, and International Investors.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <a href="https://www.linkedin.com/company/beaconattorneys" target="_blank" rel="noopener noreferrer" className="text-[#1a5c6b]/60 hover:text-[#1a5c6b] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://x.com/beaconattorneys" target="_blank" rel="noopener noreferrer" className="text-[#1a5c6b]/60 hover:text-[#1a5c6b] transition-colors">
              <XIcon className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/beaconattorneys" target="_blank" rel="noopener noreferrer" className="text-[#1a5c6b]/60 hover:text-[#1a5c6b] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0d3d4a] mb-2">Contact</h4>
          <ul className="space-y-2 text-xs text-[#1a5c6b]/60">
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#1a5c6b]" />
              <a href="https://www.google.com/maps/search/KG+190+St,+RIM+House,+Kigali,+Rwanda" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">
                KG 190 St, RIM House, 1st Floor, Kigali, Rwanda
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#1a5c6b]" />
              <a href="tel:+250788559603" className="hover:text-[#1a5c6b] transition-colors">+250 788 55 96 03</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#1a5c6b]" />
              <a href="mailto:info@beaconattorneys.rw" className="hover:text-[#1a5c6b] transition-colors">info@beaconattorneys.rw</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0d3d4a] mb-2">Careers</h4>
          <ul className="space-y-1 text-xs text-[#1a5c6b]/60">
            <li><Link to="/contact" className="hover:text-[#1a5c6b] transition-colors">Join Our Team</Link></li>
            <li><Link to="/contact" className="hover:text-[#1a5c6b] transition-colors">Internship Programme</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#1a5c6b]/10 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-[#1a5c6b]/40">© {new Date().getFullYear()} Beacon Attorneys & Consultants. All rights reserved.</p>
        <p className="text-[11px] text-[#1a5c6b]/40">KG 190 St, RIM House, 1st Floor, Kigali, Rwanda</p>
      </div>
    </div>
  </footer>
);

export default Footer;

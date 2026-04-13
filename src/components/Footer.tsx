import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/beacon-logo.png";
import { useLocalizedPath } from "@/hooks/use-localized-path";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const { t } = useTranslation();
  const { localePath } = useLocalizedPath();

  return (
    <footer className="bg-[#F8F9FB] text-[#1a5c6b] border-t border-[#1a5c6b]/10">
      <div className="container py-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <img src={logo} alt="Beacon Attorneys & Consultants" className="h-24 md:h-28 w-auto mb-2" />
            <p className="text-xs text-[#1a5c6b]/60 leading-relaxed">
              {t("footer.tagline")}
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
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0d3d4a] mb-2">{t("footer.contact")}</h4>
            <ul className="space-y-2 text-xs text-[#1a5c6b]/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#1a5c6b]" />
                <a href="https://www.google.com/maps/search/KG+190+St,+RIM+House,+Kigali,+Rwanda" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">
                  {t("footer.address")}
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
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0d3d4a] mb-2">{t("footer.legalResources")}</h4>
            <ul className="space-y-1 text-xs text-[#1a5c6b]/60">
              <li><a href="https://www.minijust.gov.rw" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">{t("footer.resources.minijust")}</a></li>
              <li><a href="https://www.judiciary.gov.rw" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">{t("footer.resources.judiciary")}</a></li>
              <li><a href="https://www.rwandabar.org.rw" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">{t("footer.resources.bar")}</a></li>
              <li><a href="https://www.rdb.rw" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">{t("footer.resources.rdb")}</a></li>
              <li><a href="https://www.rgb.rw" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">{t("footer.resources.rgb")}</a></li>
              <li><a href="https://www.rra.gov.rw" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">{t("footer.resources.rra")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0d3d4a] mb-2">{t("footer.careers")}</h4>
            <ul className="space-y-1 text-xs text-[#1a5c6b]/60">
              <li><Link to={localePath("/contact")} className="hover:text-[#1a5c6b] transition-colors">{t("footer.joinTeam")}</Link></li>
              <li><Link to={localePath("/contact")} className="hover:text-[#1a5c6b] transition-colors">{t("footer.internship")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a5c6b]/10 mt-6 pt-4 space-y-2">
          <p className="text-[11px] text-[#1a5c6b]/40 italic">{t("footer.disclaimer")}</p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-[#1a5c6b]/40">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
            <div className="flex items-center gap-2 text-[11px] text-[#1a5c6b]/40">
              <span>{t("footer.privacyPolicy")}</span>
              <span>·</span>
              <span>{t("footer.termsOfUse")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

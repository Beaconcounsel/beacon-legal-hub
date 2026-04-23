import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/beacon-logo.png";
import { useLocalizedPath } from "@/hooks/use-localized-path";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const { t } = useTranslation();
  const { localePath } = useLocalizedPath();
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="relative overflow-hidden bg-[#F8F9FB] text-[#1a5c6b] border-t border-[#1a5c6b]/10">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full h-32 md:h-40 z-0"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          @keyframes footerFloatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(0,-10px); } }
          @keyframes footerFloatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(6px,8px); } }
          @keyframes footerFloatC { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-8px,-6px); } }
          @keyframes footerFloatD { 0%,100% { transform: translate(0,0); } 50% { transform: translate(5px,-5px); } }
          @keyframes footerDot { 0%,100% { transform: translate(0,0); opacity: var(--dot-o, 0.8); } 50% { transform: translate(0,-4px); opacity: 1; } }
          .footer-float-a { animation: footerFloatA 9s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .footer-float-b { animation: footerFloatB 11s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .footer-float-c { animation: footerFloatC 13s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .footer-float-d { animation: footerFloatD 10s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .footer-dot { animation: footerDot 7s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          @media (prefers-reduced-motion: reduce) {
            .footer-float-a, .footer-float-b, .footer-float-c, .footer-float-d, .footer-dot { animation: none; }
          }
        `}</style>
        {/* Dominant deep teal — bottom-left, fully contained */}
        <g className="footer-float-a">
          <circle cx="90" cy="330" r="55" fill="#1d535e" opacity="0.4" />
          <circle cx="90" cy="330" r="55" fill="none" stroke="#3a7886" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>

        {/* Vibrant gold */}
        <g className="footer-float-b">
          <circle cx="650" cy="320" r="28" fill="#f5c400" opacity="1" />
          <circle cx="650" cy="320" r="28" fill="none" stroke="#fde27a" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>

        {/* Coral accent */}
        <g className="footer-float-c">
          <circle cx="740" cy="350" r="32" fill="#e05c4b" opacity="0.95" />
          <circle cx="740" cy="350" r="32" fill="none" stroke="#f08a7c" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>

        {/* Blue contrast */}
        <g className="footer-float-d">
          <circle cx="420" cy="360" r="20" fill="#2e7ec4" opacity="0.95" />
          <circle cx="420" cy="360" r="20" fill="none" stroke="#6aa8de" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>

        {/* Scattered decorative dots — kept low in the band */}
        <circle className="footer-dot" style={{ animationDelay: "0s" }} cx="220" cy="370" r="4" fill="#f5c400" opacity="0.95" />
        <circle className="footer-dot" style={{ animationDelay: "0.6s" }} cx="300" cy="345" r="3" fill="#1d535e" opacity="0.8" />
        <circle className="footer-dot" style={{ animationDelay: "1.2s" }} cx="370" cy="380" r="4" fill="#e05c4b" opacity="0.9" />
        <circle className="footer-dot" style={{ animationDelay: "1.8s" }} cx="500" cy="340" r="3" fill="#2e7ec4" opacity="0.9" />
        <circle className="footer-dot" style={{ animationDelay: "2.4s" }} cx="180" cy="385" r="3" fill="#1d535e" opacity="0.7" />
        <circle className="footer-dot" style={{ animationDelay: "0.9s" }} cx="560" cy="380" r="3" fill="#f5c400" opacity="0.9" />
        <circle className="footer-dot" style={{ animationDelay: "2.1s" }} cx="700" cy="370" r="3" fill="#e05c4b" opacity="0.85" />
      </svg>

      <div className="container py-8 relative z-10">
        <p className="text-xs text-[#1a5c6b]/60 leading-relaxed mb-6">
          {t("footer.tagline")}
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-3 mt-1">
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
              <li><a href="https://kifc.rw" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a5c6b] transition-colors">{t("footer.resources.kifc")}</a></li>
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

        <div className="border-t border-[#1a5c6b]/10 mt-6 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-[#1a5c6b]/40">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
            <div className="flex items-center gap-2 text-[11px] text-[#1a5c6b]/40">
              <Link to={localePath("/privacy-policy")} className="hover:text-[#1a5c6b] transition-colors">{t("footer.privacyPolicy")}</Link>
              <span>·</span>
              <Link to={localePath("/terms-of-use")} className="hover:text-[#1a5c6b] transition-colors">{t("footer.termsOfUse")}</Link>
              <span>·</span>
              <Link to={localePath("/cookie-policy")} className="hover:text-[#1a5c6b] transition-colors">{t("footer.cookiePolicy")}</Link>
              <span>·</span>
              <button onClick={openPreferences} className="hover:text-[#1a5c6b] transition-colors">
                {t("footer.cookieSettings")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

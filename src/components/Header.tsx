import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { beaconLogoImage } from "@/assets/optimized";
import ResponsiveImage from "@/components/ResponsiveImage";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";
import { useLocalizedPath } from "@/hooks/use-localized-path";
import WhatsAppLink from "@/components/WhatsAppLink";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { localePath } = useLocalizedPath();

  const aboutDropdownItems = [
    { label: t("nav.whoWeAre"), path: "/home#about" },
    { label: t("nav.ourPeople"), path: "/home#team" },
    { label: t("nav.getInTouch"), path: "/contact" },
  ];

  const approachDropdownItems = [
    { label: t("nav.howWeServe"), path: "/our-approach#how-we-serve" },
    { label: t("nav.internationalClients"), path: "/our-approach#international" },
    { label: t("nav.proBonoServices"), path: "/our-approach#pro-bono" },
  ];

  const practiceDropdownItems = [
    { label: t("nav.areasOfExpertise"), path: "/practice-areas#expertise" },
    { label: t("nav.industriesWeServe"), path: "/practice-areas#industries" },
    { label: t("nav.ourServices"), path: "/practice-areas#services" },
  ];

  const researchDropdownItems = [
    { label: t("nav.research"), path: "/research#research" },
    { label: t("nav.training"), path: "/research#training" },
    { label: t("nav.consultancy"), path: "/research#consultancy" },
  ];

  const navLinks = [
    { label: t("nav.aboutUs"), path: "/", dropdown: aboutDropdownItems },
    { label: t("nav.ourPracticeAreas"), path: "/practice-areas", dropdown: practiceDropdownItems },
    { label: t("nav.ourApproach"), path: "/our-approach", dropdown: approachDropdownItems },
    { label: t("nav.researchDev"), path: "/research", dropdown: researchDropdownItems },
  ];

  const handleSectionClick = useCallback((path: string) => {
    setOpenDropdown(null);
    setMobileOpen(false);

    if (!path.includes("#")) return;

    const localizedPath = localePath(path);
    const [pathname] = localizedPath.split("#");
    const baseCurrent = location.pathname;
    if (baseCurrent === pathname) {
      navigate(localizedPath, { replace: true });
    } else {
      navigate(localizedPath);
    }
  }, [location.pathname, navigate, localePath]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileDropdown(null);
  }, [location.pathname, location.hash]);

  // Scroll elevation — add subtle shadow once user scrolls past hero edge
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active route detection (matches base path of nav link)
  const isActiveRoute = (linkPath: string) => {
    const localized = localePath(linkPath);
    if (linkPath === "/") {
      // "About Us" maps to home — active on / or /home (and locale-prefixed)
      const p = location.pathname.replace(/^\/(en|fr)/, "") || "/";
      return p === "/" || p === "/home";
    }
    return location.pathname === localized || location.pathname.startsWith(localized + "/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F8F9FB] backdrop-blur-md border-b border-border/50 transition-shadow duration-300 ${
        scrolled ? "header-scrolled" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-[100px] md:h-[120px]">
        <Link to={localePath("/")} className="flex items-center leading-none flex-shrink-0 min-w-[94px] md:min-w-[110px]">
          <ResponsiveImage
            source={beaconLogoImage}
            sizes="(max-width: 768px) 188px, 218px"
            alt="Beacon Attorneyes & Consultants"
            className="h-[94px] md:h-[110px] w-auto flex-shrink-0"
            priority
          />
        </Link>

        <nav ref={dropdownRef} className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className={`relative flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
                      openDropdown === link.label || isActiveRoute(link.path)
                        ? "text-[#0d3d4a] after:content-[''] after:absolute after:left-2.5 after:right-2.5 after:-bottom-0.5 after:h-[2px] after:bg-gold"
                        : "text-[#0d3d4a]/80 hover:text-[#0d3d4a]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 animate-fade-in">
                      {link.dropdown.map((item) =>
                        item.path.includes("#") ? (
                          <button
                            key={item.path}
                            onClick={() => handleSectionClick(item.path)}
                            className="block w-full text-left px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            key={item.path}
                            to={localePath(item.path)}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors"
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={localePath(link.path)}
                  className={`relative px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
                    isActiveRoute(link.path)
                      ? "text-[#0d3d4a] after:content-[''] after:absolute after:left-2.5 after:right-2.5 after:-bottom-0.5 after:h-[2px] after:bg-gold"
                      : "text-[#0d3d4a]/80 hover:text-[#0d3d4a]"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          <div className="ml-2">
            <LanguageSwitch />
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <LanguageSwitch />
          </div>
          <button
            className="lg:hidden text-[#1a5c6b]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#F8F9FB] border-t border-border">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === link.label ? null : link.label)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-md text-sm font-medium transition-colors text-[#1a5c6b]/70 hover:text-[#1a5c6b] hover:bg-[#1a5c6b]/5"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdown === link.label ? "rotate-180" : ""}`} />
                    </button>
                    {mobileDropdown === link.label && (
                      <div className="ml-4 border-l border-border/50 pl-4 flex flex-col gap-1">
                        {link.dropdown.map((item) =>
                          item.path.includes("#") ? (
                            <button
                              key={item.path}
                              onClick={() => handleSectionClick(item.path)}
                              className="w-full text-left px-4 py-2.5 rounded-md text-sm text-foreground/60 hover:text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              {item.label}
                            </button>
                          ) : (
                            <Link
                              key={item.path}
                              to={localePath(item.path)}
                              onClick={() => setMobileOpen(false)}
                              className="px-4 py-2.5 rounded-md text-sm text-foreground/60 hover:text-foreground hover:bg-secondary/50 transition-colors"
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={localePath(link.path)}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-md text-sm font-medium transition-colors text-[#1a5c6b]/70 hover:text-[#1a5c6b] hover:bg-[#1a5c6b]/5"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <WhatsAppLink
              source="mobile_menu"
              variant="inline"
              className="mt-2 px-4 py-3 rounded-md text-sm font-medium text-[#1a5c6b] hover:bg-[#1a5c6b]/5"
            >
              {t("bookConsult.whatsappCta")}
            </WhatsAppLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

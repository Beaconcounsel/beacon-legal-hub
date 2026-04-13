import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/beacon-logo.png";
import { Menu, X, ChevronDown } from "lucide-react";

const aboutDropdownItems = [
  { label: "Who We Are", path: "/home#about" },
  { label: "Our People", path: "/home#team" },
  { label: "Industries We Serve", path: "/home#industries" },
  { label: "How to Get in Touch", path: "/contact" },
];

const approachDropdownItems = [
  { label: "How We Serve You", path: "/our-approach#how-we-serve" },
  { label: "International Clients", path: "/our-approach#international" },
  { label: "Pro Bono Services", path: "/our-approach#pro-bono" },
];

const practiceDropdownItems = [
  { label: "Areas of Expertise", path: "/practice-areas#expertise" },
  { label: "Industries We Serve", path: "/practice-areas#industries" },
  { label: "Our Services", path: "/practice-areas#services" },
];

const researchDropdownItems = [
  { label: "Research", path: "/research#research" },
  { label: "Training", path: "/research#training" },
  { label: "Consultancy", path: "/research#consultancy" },
];

const navLinks = [
  { label: "About Us", path: "/", dropdown: aboutDropdownItems },
  { label: "Our Practice Areas", path: "/practice-areas", dropdown: practiceDropdownItems },
  { label: "Our Approach", path: "/our-approach", dropdown: approachDropdownItems },
  { label: "Research & Development", path: "/research", dropdown: researchDropdownItems },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = useCallback((path: string) => {
    setOpenDropdown(null);
    setMobileOpen(false);

    if (!path.includes("#")) return;

    const [pathname] = path.split("#");
    if (location.pathname === pathname) {
      navigate(path, { replace: true });
    } else {
      navigate(path);
    }
  }, [location.pathname, navigate]);

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F9FB] backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-24 md:h-28">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Beacon Attorneyes & Consultants" className="h-24 md:h-28 w-auto" />
        </Link>

        <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                      location.pathname === link.path || openDropdown === link.label
                        ? "text-[#1a5c6b]"
                        : "text-[#1a5c6b]/70 hover:text-[#1a5c6b]"
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
                            to={item.path}
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
                  to={link.path}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
                    location.pathname === link.path
                      ? "text-[#1a5c6b]"
                      : "text-[#1a5c6b]/70 hover:text-[#1a5c6b]"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        location.pathname === link.path
                          ? "text-[#1a5c6b] bg-[#1a5c6b]/10"
                          : "text-[#1a5c6b]/70 hover:text-[#1a5c6b] hover:bg-[#1a5c6b]/5"
                      }`}
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
                              to={item.path}
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
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "text-[#1a5c6b] bg-[#1a5c6b]/10"
                        : "text-[#1a5c6b]/70 hover:text-[#1a5c6b] hover:bg-[#1a5c6b]/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const aboutDropdownItems = [
  { label: "About Beacon Attorneys", path: "/home#about" },
  { label: "Our People", path: "/home#team" },
  { label: "Industries We Serve", path: "/home#industries" },
  { label: "How to Get in Touch", path: "/contact" },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Practice Areas", path: "/practice-areas" },
  { label: "International Clients", path: "/international" },
  { label: "Consultancy & Training", path: "/research" },
  { label: "Contact Us", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = useCallback((path: string) => {
    setAboutOpen(false);
    setMobileOpen(false);

    if (!path.includes("#")) return;

    if (location.pathname === "/home") {
      navigate(path, { replace: true });
    } else {
      navigate(path);
    }
  }, [location.pathname, navigate]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setAboutOpen(false);
    setMobileAboutOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex flex-col items-start">
          <span className="text-gradient-gold font-serif text-xl md:text-2xl font-bold tracking-tight leading-none">
            Beacon
          </span>
          <span className="text-foreground/70 text-[7px] md:text-[9px] font-sans italic normal-case tracking-[0.1em] leading-none mt-0.5">
            Attorneys & Consultants
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {/* Home with Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setAboutOpen(!aboutOpen)}
              className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/" || aboutOpen
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Home
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
            </button>
            {aboutOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 animate-fade-in">
                {aboutDropdownItems.map((item) =>
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
                      onClick={() => setAboutOpen(false)}
                      className="block px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* Rest of nav links (skip Home) */}
          {navLinks.filter(l => l.label !== "Home").map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container py-4 flex flex-col gap-1">
            {/* Home with sub-items */}
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className={`flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-primary bg-secondary"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Home
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileAboutOpen && (
              <div className="ml-4 border-l border-border/50 pl-4 flex flex-col gap-1">
                {aboutDropdownItems.map((item) =>
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

            {/* Rest of nav links (skip Home) */}
            {navLinks.filter(l => l.label !== "Home").map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-secondary"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText, Building2, ScrollText, ClipboardList, Zap, Landmark, Laptop, Wheat, ChevronLeft, ChevronRight } from "lucide-react";

const practiceAreas = [
  {
    title: "Corporate & Commercial Law",
    description: "We advise businesses on formation, governance, mergers, acquisitions, and day-to-day commercial operations. Our team structures transactions that protect interests and drive growth.",
    clients: "Corporations, SMEs, multinationals, joint ventures",
  },
  {
    title: "Contract Advisory & Negotiation",
    description: "We draft, review, and negotiate complex commercial contracts—from supply agreements to multi-party frameworks—ensuring enforceability and risk mitigation at every stage.",
    clients: "All business entities, procurement teams, government agencies",
  },
  {
    title: "Regulatory Compliance & Advisory",
    description: "We navigate Rwanda's evolving regulatory landscape, advising on licensing, permits, sector-specific compliance, and government relations to ensure seamless operations.",
    clients: "Financial institutions, energy companies, healthcare providers, fintechs",
  },
  {
    title: "Employment & Labour Law",
    description: "We advise on employment contracts, workplace policies, dispute resolution, and compliance with Rwanda's labour code. Our Leadership Recruitment practice supports executive hiring, compensation structuring, and governance alignment for boards and C-suite positions.",
    clients: "Employers, HR departments, boards of directors",
    subsection: "Leadership Recruitment: We advise on executive search strategy, compensation structures, non-compete frameworks, and governance alignment for senior appointments.",
  },
  {
    title: "Oil, Gas & Energy Law",
    description: "We act for energy companies, governments, and investors on exploration agreements, production-sharing contracts, regulatory approvals, and environmental compliance across the energy value chain.",
    clients: "Energy companies, infrastructure developers, government agencies, investors",
  },
  {
    title: "Banking & Financial Services",
    description: "We structure and advise on project finance, banking regulations, securities, fund formation, and cross-border investment transactions with precision and speed.",
    clients: "Banks, investment funds, private equity, institutional investors",
  },
  {
    title: "Dispute Resolution & Arbitration",
    description: "We represent clients in complex commercial disputes through litigation, arbitration, and mediation—both domestically and in international fora—with a focus on strategic, outcome-driven resolution.",
    clients: "Corporations, investors, government entities, international organizations",
  },
  {
    title: "Tax & Corporate Structuring",
    description: "We advise on tax-efficient structures, transfer pricing, VAT compliance, and cross-border tax planning to minimize exposure and optimize corporate architecture.",
    clients: "Multinational companies, holding structures, HNWIs, family offices",
  },
  {
    title: "Real Estate & Property Law",
    description: "We handle land acquisition, due diligence, development agreements, leasing, and property disputes—supporting clients from site selection through project completion.",
    clients: "Real estate developers, investors, hospitality groups, institutions",
  },
  {
    title: "Private Wealth & Succession Planning",
    description: "We advise high-net-worth individuals and family business owners on asset protection, estate planning, succession strategies, and cross-border wealth considerations with the utmost discretion.",
    clients: "HNWIs, family business owners, trusts, estates",
  },
  {
    title: "NGO, Institutional & Governance Advisory",
    description: "We advise NGOs, international organizations, and public institutions on governance structures, regulatory compliance, donor agreements, and institutional best practices.",
    clients: "International NGOs, development agencies, foundations, public institutions",
  },
  {
    title: "Intellectual Property Law",
    description: "We protect brands, inventions, and creative works through trademark registration, patent advisory, licensing agreements, and IP enforcement strategies.",
    clients: "Technology companies, creatives, manufacturers, pharmaceutical firms",
  },
  {
    title: "Technology & Data Protection Law",
    description: "We advise on data privacy compliance, cybersecurity frameworks, technology licensing, and digital commerce regulations in Rwanda's rapidly evolving tech landscape.",
    clients: "Tech startups, fintechs, e-commerce platforms, data processors",
  },
  {
    title: "Migration Law",
    description: "We advise individuals and organizations on work permits, residence visas, investor permits, and immigration compliance for expatriate employees and international personnel.",
    clients: "Expatriates, multinational employers, international organizations",
  },
  {
    title: "Insolvency & Restructuring Law",
    description: "We represent creditors and debtors in insolvency proceedings, corporate restructuring, and turnaround strategies—protecting value and managing complex stakeholder dynamics.",
    clients: "Distressed companies, creditors, banks, investors",
  },
  {
    title: "Insurance Law",
    description: "We advise insurers and policyholders on regulatory compliance, policy disputes, claims management, and reinsurance arrangements across all lines of coverage.",
    clients: "Insurance companies, brokers, corporate policyholders",
  },
];

const industries = [
  { icon: Zap, label: "Energy & Infrastructure" },
  { icon: Landmark, label: "Financial Services" },
  { icon: Building2, label: "Real Estate & Development" },
  { icon: Laptop, label: "Technology & Innovation" },
  { icon: Wheat, label: "Agriculture & Agribusiness" },
];

const ourServices = [
  { icon: Briefcase, title: "Business & Operational Advisory", desc: "Strategic counsel on business operations, corporate governance, and commercial decision-making to help organizations achieve their objectives within a sound legal framework." },
  { icon: Building2, title: "Representation Before Regulatory Bodies & Courts", desc: "We represent clients before regulatory authorities, tribunals, and courts of law—advocating for their interests with precision and authority across all levels of jurisdiction." },
  { icon: FileText, title: "White Paper & Policy Consultancy", desc: "We draft and advise on white papers, policy documents, and position papers that shape industry standards and inform regulatory development." },
  { icon: ScrollText, title: "Procedure & Compliance Development", desc: "We design internal procedures, compliance frameworks, and operational manuals that ensure organizations meet regulatory requirements and industry best practices." },
  { icon: ClipboardList, title: "Legal Transaction Documentation", desc: "We prepare, review, and negotiate all forms of legal transaction documents—including agreements, memoranda of understanding, term sheets, and closing documentation." },
];

const ServicesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = ourServices.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 12000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {ourServices.map((s) => (
            <div key={s.title} className="w-full flex-shrink-0 px-2">
              <div className="bg-card border border-border rounded-xl p-10 md:p-14 text-center max-w-2xl mx-auto">
                <s.icon className="w-12 h-12 text-primary mb-6 mx-auto" />
                <h3 className="text-xl md:text-2xl font-semibold mb-4 font-serif">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mt-8">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex gap-2">
          {ourServices.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border hover:bg-primary/40"}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

const PracticeAreasPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">Areas of Expertise</h1>
            <div className="line-gold mb-6" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              We are a business law firm. We advise and represent across the full spectrum of business law with a focus on strategic value, risk management, and client-centered solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Explore our practice areas, the industries we serve, and the range of services we deliver to clients across Rwanda and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section id="expertise" className="section-padding scroll-mt-28">
        <div className="container">
          <div className="space-y-8">
            {practiceAreas.map((area, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-8 md:p-10 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-primary font-serif text-lg font-bold mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 font-serif">{area.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{area.description}</p>
                    {area.subsection && (
                      <div className="bg-secondary/50 border border-border rounded-md p-4 mb-4">
                        <p className="text-sm text-foreground/80">{area.subsection}</p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      <span className="text-primary">Clients:</span> {area.clients}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                Request a Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section id="industries" className="section-padding bg-card scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Industries We Serve</h2>
          <div className="line-gold mb-12" />
          <div className="flex flex-wrap justify-center gap-5 mb-10">
            {industries.map((ind) => (
              <div key={ind.label} className="flex items-center gap-3 bg-background border border-border px-7 py-5 rounded-xl hover:border-primary/30 hover:bg-secondary/60 transition-all duration-300 group">
                <ind.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">{ind.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                Discuss Your Industry Needs <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services - Carousel */}
      <section id="services" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Our Services</h2>
          <div className="line-gold mb-12" />
          <ServicesCarousel />
          <div className="text-center mt-10">
            <Link to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                Discuss Your Needs <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PracticeAreasPage;

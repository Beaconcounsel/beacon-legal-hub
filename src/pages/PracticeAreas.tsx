import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, FileText, Building2, ScrollText, ClipboardList } from "lucide-react";

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
    title: "Banking, Finance & Investment Law",
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

const ourServices = [
  { icon: Briefcase, title: "Business & Operational Advisory", desc: "Strategic counsel on business operations, corporate governance, and commercial decision-making to help organizations achieve their objectives within a sound legal framework." },
  { icon: Building2, title: "Representation Before Regulatory Bodies & Courts", desc: "We represent clients before regulatory authorities, tribunals, and courts of law—advocating for their interests with precision and authority across all levels of jurisdiction." },
  { icon: FileText, title: "White Paper & Policy Consultancy", desc: "We draft and advise on white papers, policy documents, and position papers that shape industry standards and inform regulatory development." },
  { icon: ScrollText, title: "Procedure & Compliance Development", desc: "We design internal procedures, compliance frameworks, and operational manuals that ensure organizations meet regulatory requirements and industry best practices." },
  { icon: ClipboardList, title: "Legal Transaction Documentation", desc: "We prepare, review, and negotiate all forms of legal transaction documents—including agreements, memoranda of understanding, term sheets, and closing documentation." },
];

const PracticeAreasPage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">Practice Areas</h1>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            We advise across the full spectrum of business law with a focus on strategic value, risk management, and client-centered solutions.
          </p>
        </div>
      </div>
    </section>

    {/* Our Services */}
    <section className="section-padding bg-card">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Our Services</h2>
        <div className="line-gold mb-12" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {ourServices.map((s) => (
            <div key={s.title} className="bg-background border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
              <s.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-3 font-serif">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <Link to="/contact">
          <Button variant="gold" size="lg" className="gap-2">
            Discuss Your Needs <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>

    {/* Practice Areas */}
    <section className="section-padding">
      <div className="container">
        <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Areas of Expertise</h2>
        <div className="line-gold mb-12" />
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
              Discuss Your Legal Needs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default PracticeAreasPage;

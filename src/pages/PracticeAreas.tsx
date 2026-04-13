import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

const PracticeAreasPage = () => (
  <Layout>
    <section className="pt-8 md:pt-12 pb-20 md:pb-28 lg:pb-32">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="line-gold mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Practice Areas</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We advise across the full spectrum of business law with a focus on strategic value, risk management, and client-centered solutions for complex legal matters.
          </p>
        </div>

        <div className="space-y-8">
          {practiceAreas.map((area, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-8 md:p-10 hover:border-primary/30 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-primary font-heading text-lg font-bold mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3 font-heading">{area.title}</h2>
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

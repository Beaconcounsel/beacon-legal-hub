import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Linkedin, Globe, Award, Briefcase, GraduationCap, MapPin, Users, Shield, BookOpen } from "lucide-react";
import danielPhoto from "@/assets/daniel-mutiganda.jpg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const TeamPage = () => {
  const revealRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pb-0">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">Our People</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Team</h1>
            <div className="line-gold mt-4 mb-6" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every engagement at Beacon Attorneys is led by a partner with deep expertise and a personal commitment to client success. Our team combines international training with unmatched local knowledge.
            </p>
          </div>
        </div>
      </section>

    <div ref={revealRef}>
    {/* Partners */}
    <section className="section-padding pt-0">
      <div className="container space-y-6">

        {/* Daniel Mutiganda */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 border-b border-border p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full flex-shrink-0 border-4 border-primary/30 overflow-hidden shadow-lg shadow-primary/10">
                <img src={danielPhoto} alt="Daniel Mutiganda" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Lead Partner</p>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">Daniel Mutiganda</h2>
                <p className="text-foreground/80 text-lg mb-4">Corporate, Transactions & Cross-Border Advisory</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  Advising on legal risk and business strategy, and representing clients in transactions and regulatory matters in Rwanda and across emerging markets.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Rwanda Bar Association</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">East African Law Society</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">CIArb, UK</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-6">
            {/* Overview */}
            <div className="max-w-3xl">
              <p className="text-foreground/80 leading-snug">
                Daniel Mutiganda is a seasoned corporate lawyer and executive with over 18 years of experience advising and representing international investors, corporations, financial institutions, and local business leaders. He delivers commercially sound legal and strategic solutions across complex and regulated environments.
              </p>
              <p className="text-foreground/80 leading-snug mt-3">
                He works with clients to align legal risk, business strategy, and growth objectives, with a strong focus on structuring compliant investments, negotiating transactions, and representing client interests in regulatory and commercial engagements.
              </p>
            </div>

            {/* What Sets Him Apart */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">What Sets Him Apart</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Combines legal, executive, and public sector experience",
                  "Strong track record across regulated and high-growth sectors",
                  "Deep understanding of Rwanda's legal, regulatory, and business environment",
                  "Aligns legal frameworks with commercial strategy and growth",
                  "Advises on and represents clients in transactions and regulatory engagements",
                  "Strong cross-cultural capability across international and local stakeholder environments",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-muted/30 rounded-lg p-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground/80 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Disciplinary Experience */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">Multi-Disciplinary Experience</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 ml-8 leading-snug">
                Daniel brings experience across key sectors, enabling practical, business-oriented advice and effective representation.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { sector: "Government & Public Sector", desc: "Legislative advisory, policy, and regulatory frameworks" },
                  { sector: "Financial Services", desc: "Banking, compliance, risk, and governance" },
                  { sector: "International Development", desc: "Advisory to NGOs, donors, and global institutions" },
                  { sector: "Health & Social Impact", desc: "Support to large-scale, mission-driven programs" },
                  { sector: "Corporate & Private Sector", desc: "Structuring, transactions, and business growth" },
                  { sector: "Consultancy & Legal Advisory", desc: "Cross-sector strategic advisory and representation" },
                ].map((item) => (
                  <div key={item.sector} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                    <p className="font-semibold text-sm mb-1">{item.sector}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* International Perspective */}
            <div className="bg-muted/20 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">International Perspective, Local Execution</h3>
              </div>
              <p className="text-foreground/80 text-sm leading-snug mb-4">
                Daniel advises and represents international clients entering Rwanda while supporting local businesses to structure, scale, and transact effectively.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Structuring compliant and scalable investments",
                  "Managing legal and regulatory risk",
                  "Representing clients in negotiations and regulatory processes",
                  "Bridging international and local stakeholders",
                  "Translating complexity into clear business decisions",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground/70 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Practice Areas & Sector Focus */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Core Practice Areas</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Cross-Border Transactions & Market Entry",
                    "Mergers & Acquisitions (M&A)",
                    "Corporate Structuring & Restructuring",
                    "Regulatory Compliance & Government Relations",
                    "Corporate Governance & Board Advisory",
                    "Investment & Institutional Advisory",
                    "Commercial Contracts, Negotiation & Representation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Sector Focus</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { sector: "Financial Services & Fintech", desc: "Banking, digital finance, compliance, and licensing" },
                    { sector: "Energy & Infrastructure", desc: "Project structuring, PPPs, and regulatory approvals" },
                    { sector: "Investment & Private Equity", desc: "Deal structuring, due diligence, and execution" },
                    { sector: "International Development & ESG", desc: "Governance, compliance, and sustainable investment" },
                    { sector: "Government & Public Sector", desc: "Regulatory frameworks and institutional advisory" },
                    { sector: "Corporate & Commercial", desc: "M&A, structuring, and business expansion" },
                  ].map((item) => (
                    <div key={item.sector}>
                      <p className="text-sm font-semibold">{item.sector}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Representative Experience */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">Representative Experience</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Advised on and represented clients in cross-border investment transactions in regulated sectors",
                  "Led corporate restructuring and shareholder transitions",
                  "Supported market entry, licensing, and regulatory approvals for international investors",
                  "Negotiated and represented clients in commercial agreements with international partners",
                  "Strengthened governance frameworks, reducing legal and regulatory exposure",
                  "Advised and represented boards and executive teams on risk, compliance, and strategic decision-making",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground/70 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients & Geographic Focus */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Clients & Engagements</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "International investors and private equity firms",
                    "Development finance institutions and global organizations",
                    "Multinational corporations",
                    "Financial institutions and regulated entities",
                    "Local enterprises and high-growth businesses",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Geographic Focus</h3>
                </div>
                <div className="space-y-3">
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">Rwanda</p>
                    <p className="text-xs text-muted-foreground leading-snug">Core market</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">East Africa</p>
                    <p className="text-xs text-muted-foreground leading-snug">Regional advisory and transactions</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">Cross-Border</p>
                    <p className="text-xs text-muted-foreground leading-snug">Investment structuring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership & Board Advisory */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold font-serif mb-4">Board & Regulatory Advisory</h3>
                <ul className="space-y-2">
                  {[
                    "Advises and represents boards and executive teams on governance, compliance, and risk",
                    "Experience engaging regulators and navigating licensing frameworks",
                    "Company secretarial and board-level advisory experience",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif mb-4">Leadership & Institutional Experience</h3>
                <ul className="space-y-2">
                  {[
                    "Led organizational growth from under 1,000 to over 3,500 employees",
                    "Managed large operational teams and budgets",
                    "Strengthened governance, compliance, and internal systems",
                    "Worked closely with international leadership and investors",
                    "Advised and represented executive teams on risk, strategy, and growth",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">Education & Professional Foundation</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[
                    { degree: "Master of Business Administration (MBA)", school: "Oklahoma Christian University, USA" },
                    { degree: "Postgraduate Diploma in Legal Practice", school: "Institute of Legal Practice and Development" },
                    { degree: "Bachelor of Laws (LL.B)", school: "University of Rwanda" },
                  ].map((item) => (
                    <div key={item.degree} className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">{item.degree}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{item.school}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Certifications</p>
                  <div className="space-y-3">
                    <div className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">Certified Arbitrator (Associate)</p>
                      <p className="text-xs text-muted-foreground leading-snug">Chartered Institute of Arbitrators</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">Certified Human Resources Manager</p>
                      <p className="text-xs text-muted-foreground leading-snug">IABFM</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 mt-6">Languages</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">English</span>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">French</span>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Kinyarwanda</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Positioning Statement */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
              <blockquote className="text-lg md:text-xl font-serif italic text-foreground/90 leading-snug">
                "I advise and represent clients on legally sound business operations in Rwanda, structuring compliant investment transactions while combining international perspective with deep local insight to manage risk, drive growth, and deliver results with integrity."
              </blockquote>
              <p className="text-primary text-sm font-semibold mt-3">— Daniel Mutiganda</p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/contact">
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:contact@beaconlaw.rw">
                <Button variant="gold-outline" size="lg" className="gap-2 w-full sm:w-auto">
                  <Mail className="w-4 h-4" /> Email Daniel
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Moses Katusime */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 border-b border-border p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-32 h-32 md:w-44 md:h-44 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-primary/30 shadow-lg shadow-primary/10">
                <span className="text-primary font-serif text-4xl md:text-5xl font-bold">MK</span>
              </div>
              <div className="flex-1">
                <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Senior Partner</p>
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">Moses Katusime</h2>
                <p className="text-foreground/80 text-lg mb-4">Corporate, Infrastructure, Asset Management & Dispute Resolution</p>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                  Advising corporations, investors, and public institutions on complex legal, commercial, and regulatory matters across Rwanda and the region, with deep specialization in international arbitration and construction dispute management.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Fellow Chartered Arbitrator (FCIArb)</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Advocate, High Court of Rwanda</span>
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">East African Law Society</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-6">
            {/* Overview */}
            <div className="max-w-3xl">
              <p className="text-foreground/80 leading-snug">
                Moses Katusime is a highly experienced legal practitioner with over 18 years of expertise advising corporations, investors, and public institutions on complex legal, commercial, and regulatory matters across Rwanda and the region. As a Senior Partner, he provides strategic, business-oriented legal counsel that supports investment, safeguards assets, and enables sustainable growth.
              </p>
              <p className="text-foreground/80 leading-snug mt-3">
                His practice spans corporate and commercial law, construction and infrastructure, asset management, project financing, and dispute resolution. He is particularly recognized for his ability to structure and deliver legally robust frameworks for large-scale projects, aligning legal strategy with financial and operational objectives.
              </p>
            </div>

            {/* What Sets Him Apart */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">What Sets Him Apart</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Over 18 years advising corporations, investors, and public institutions",
                  "Deep specialization in international arbitration and construction disputes",
                  "Fellow Chartered Arbitrator (FCIArb) with globally recognized credentials",
                  "Proven ability to structure legally robust frameworks for large-scale projects",
                  "Aligns legal strategy with financial and operational objectives",
                  "Advanced training in financial and investment management",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-muted/30 rounded-lg p-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground/80 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Disciplinary Experience */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">Multi-Disciplinary Experience</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 ml-8 leading-snug">
                Moses brings experience across key practice areas, enabling practical, business-oriented advice and effective representation in complex engagements.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { sector: "Corporate & Commercial Law", desc: "Transactions, advisory, and regulatory compliance" },
                  { sector: "Construction & Infrastructure", desc: "EPC and FIDIC-based contracts, project structuring" },
                  { sector: "Asset Management", desc: "Investment portfolios, vehicles, and regulatory frameworks" },
                  { sector: "Project Finance", desc: "Financing agreements, risk allocation, bankability" },
                  { sector: "Dispute Resolution", desc: "International arbitration, mediation, and claims" },
                  { sector: "Real Estate & Land", desc: "Acquisitions, due diligence, and development" },
                ].map((item) => (
                  <div key={item.sector} className="border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                    <p className="font-semibold text-sm mb-1">{item.sector}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* International Arbitration Expertise */}
            <div className="bg-muted/20 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">International Arbitration Expertise, Regional Execution</h3>
              </div>
              <p className="text-foreground/80 text-sm leading-snug mb-4">
                Moses brings internationally recognized arbitration credentials combined with deep regional expertise, acting for employers and contractors in high-value construction disputes across East Africa.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Fellow Chartered Arbitrator with global dispute resolution credentials",
                  "Structures bankable projects aligned with international standards",
                  "Advises regional and international investors on Rwanda market entry",
                  "Navigates complex regulatory frameworks across East Africa",
                  "Aligns legal frameworks with financial and operational objectives",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground/70 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Practice Areas & Sector Focus */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Core Practice Areas</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "Project Finance & Infrastructure Development",
                    "Construction Arbitration & Claims Management",
                    "Corporate Structuring & Market Entry",
                    "Asset & Investment Structuring",
                    "Real Estate Transactions & Land Development",
                    "Corporate Governance Advisory",
                    "Facilities Management & Operational Contracts",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Sector Focus</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { sector: "Infrastructure & Construction", desc: "EPC contracts, FIDIC, PPPs, and dispute resolution" },
                    { sector: "Real Estate & Property", desc: "Acquisitions, development, and title diligence" },
                    { sector: "Financial Services & Investment", desc: "Structuring, portfolio management, and compliance" },
                    { sector: "Corporate & Commercial", desc: "M&A, joint ventures, and regulatory compliance" },
                    { sector: "Energy & Natural Resources", desc: "Project structuring and financing agreements" },
                    { sector: "Public Sector & Institutions", desc: "Governance, compliance, and risk frameworks" },
                  ].map((item) => (
                    <div key={item.sector}>
                      <p className="text-sm font-semibold">{item.sector}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Transactions & Experience */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">Key Transactions & Experience</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Advised on structuring and legal documentation of infrastructure and real estate projects, including EPC and FIDIC-based contracts",
                  "Acted for employers and contractors in high-value construction disputes, including arbitration proceedings and mediation",
                  "Advised on establishment and management of real estate and infrastructure investment portfolios",
                  "Structured and negotiated facilities management agreements, including SLAs and performance-based frameworks",
                  "Led legal advisory on complex land acquisitions, title due diligence, and large-scale development projects",
                  "Advised regional and international investors on corporate structuring, joint ventures, and regulatory compliance",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-sm text-foreground/70 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients & Geographic Focus */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Clients & Engagements</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    "International investors and private equity firms",
                    "Construction and infrastructure contractors",
                    "Real estate developers and asset managers",
                    "Public institutions and government agencies",
                    "Regional and multinational corporations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Geographic Focus</h3>
                </div>
                <div className="space-y-3">
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">Rwanda</p>
                    <p className="text-xs text-muted-foreground leading-snug">Core market</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">East Africa</p>
                    <p className="text-xs text-muted-foreground leading-snug">Regional advisory and transactions</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">Cross-Border</p>
                    <p className="text-xs text-muted-foreground leading-snug">Arbitration and international projects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Governance & Leadership */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold font-serif mb-4">Governance & Advisory</h3>
                <ul className="space-y-2">
                  {[
                    "Advises boards on governance frameworks and compliance systems",
                    "Supports risk management strategies aligned with international best practices",
                    "Experience engaging regulators on large-scale projects",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif mb-4">Leadership & Approach</h3>
                <ul className="space-y-2">
                  {[
                    "Senior Partner with strategic oversight of complex engagements",
                    "Structures and delivers legally robust frameworks for large-scale projects",
                    "Strong cross-sector capability across regulated and high-growth sectors",
                    "Business-oriented counsel that supports investment and safeguards assets",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">Education & Professional Foundation</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {[
                    { degree: "Master of Laws (LL.M)", school: "University of Groningen" },
                    { degree: "Bachelor of Laws (LL.B)", school: "National University of Rwanda" },
                    { degree: "Advanced Diploma in Legal Practice", school: "Institute of Legal Practice and Development" },
                  ].map((item) => (
                    <div key={item.degree} className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">{item.degree}</p>
                      {item.school && <p className="text-xs text-muted-foreground leading-snug">{item.school}</p>}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Certifications</p>
                  <div className="space-y-3">
                    <div className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">Fellow Chartered Arbitrator (FCIArb)</p>
                      <p className="text-xs text-muted-foreground leading-snug">Chartered Institute of Arbitrators</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">Financial Industry Management (FICP)</p>
                      <p className="text-xs text-muted-foreground leading-snug">Luxembourg School of Business</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 mt-6">Languages</p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">English</span>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">French</span>
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Kinyarwanda</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Positioning Statement */}
            <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
              <blockquote className="text-lg md:text-xl font-serif italic text-foreground/90 leading-snug">
                "I provide strategic, business-oriented legal counsel that supports investment, safeguards assets, and enables sustainable growth—combining deep arbitration expertise with a practical understanding of corporate, infrastructure, and real estate transactions across Rwanda and the region."
              </blockquote>
              <p className="text-primary text-sm font-semibold mt-3">— Moses Katusime</p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/contact">
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  Book a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:contact@beaconlaw.rw">
                <Button variant="gold-outline" size="lg" className="gap-2 w-full sm:w-auto">
                  <Mail className="w-4 h-4" /> Email Moses
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 reveal relative max-w-2xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
          <div className="relative bg-card border border-border rounded-xl p-10 text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">Careers</span>
            <h3 className="text-2xl font-bold font-serif mb-3">Join Beacon Attorneys</h3>
            <div className="line-gold mx-auto mt-4 mb-5" />
            <p className="text-muted-foreground leading-snug mb-6">
              We are always looking for exceptional legal talent who share our commitment to strategic excellence, integrity, and client service.
            </p>
            <Link to="/contact">
              <Button variant="gold" className="gap-2">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  </Layout>
  );
};

export default TeamPage;

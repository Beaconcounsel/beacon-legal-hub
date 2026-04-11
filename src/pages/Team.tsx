import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Linkedin, Globe, Award, Briefcase, GraduationCap, MapPin, Users, Shield, BookOpen } from "lucide-react";

const TeamPage = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding pb-0">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="line-gold mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every engagement at Beacon is led by a partner with deep expertise and a personal commitment to client success. Our team combines international training with unmatched local knowledge.
          </p>
        </div>
      </div>
    </section>

    {/* Lead Partner Feature */}
    <section className="section-padding pt-0">
      <div className="container">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 border-b border-border p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                <span className="text-primary font-serif text-3xl md:text-4xl font-bold">DM</span>
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

          <div className="p-8 md:p-12 space-y-12">
            {/* Overview */}
            <div className="max-w-3xl">
              <p className="text-foreground/80 leading-relaxed">
                Daniel Mutiganda is a seasoned corporate lawyer and executive with over 18 years of experience advising and representing international investors, corporations, financial institutions, and local business leaders. He delivers commercially sound legal and strategic solutions across complex and regulated environments.
              </p>
              <p className="text-foreground/80 leading-relaxed mt-4">
                He works with clients to align legal risk, business strategy, and growth objectives, with a strong focus on structuring compliant investments, negotiating transactions, and representing client interests in regulatory and commercial engagements.
              </p>
            </div>

            {/* What Sets Him Apart */}
            <div>
              <div className="flex items-center gap-3 mb-6">
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
                    <p className="text-sm text-foreground/80">{item}</p>
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
              <p className="text-muted-foreground text-sm mb-6 ml-8">
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
                  <div key={item.sector} className="border border-border rounded-lg p-5 hover:border-primary/30 transition-colors">
                    <p className="font-semibold text-sm mb-1">{item.sector}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* International Perspective */}
            <div className="bg-muted/20 rounded-xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">International Perspective, Local Execution</h3>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">
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
                    <p className="text-sm text-foreground/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Practice Areas & Sector Focus */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Core Practice Areas</h3>
                </div>
                <ul className="space-y-3">
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
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Sector Focus</h3>
                </div>
                <div className="space-y-4">
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
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Representative Experience */}
            <div>
              <div className="flex items-center gap-3 mb-6">
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
                    <p className="text-sm text-foreground/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients & Geographic Focus */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Clients & Engagements</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "International investors and private equity firms",
                    "Development finance institutions and global organizations",
                    "Multinational corporations",
                    "Financial institutions and regulated entities",
                    "Local enterprises and high-growth businesses",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold font-serif">Geographic Focus</h3>
                </div>
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">Rwanda</p>
                    <p className="text-xs text-muted-foreground">Core market</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">East Africa</p>
                    <p className="text-xs text-muted-foreground">Regional advisory and transactions</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-semibold text-sm">Cross-Border</p>
                    <p className="text-xs text-muted-foreground">Investment structuring</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership & Board Advisory */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold font-serif mb-6">Board & Regulatory Advisory</h3>
                <ul className="space-y-3">
                  {[
                    "Advises and represents boards and executive teams on governance, compliance, and risk",
                    "Experience engaging regulators and navigating licensing frameworks",
                    "Company secretarial and board-level advisory experience",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif mb-6">Leadership & Institutional Experience</h3>
                <ul className="space-y-3">
                  {[
                    "Led organizational growth from under 1,000 to over 3,500 employees",
                    "Managed large operational teams and budgets",
                    "Strengthened governance, compliance, and internal systems",
                    "Worked closely with international leadership and investors",
                    "Advised and represented executive teams on risk, strategy, and growth",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold font-serif">Education & Professional Foundation</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  {[
                    { degree: "Master of Business Administration (MBA)", school: "Oklahoma Christian University, USA" },
                    { degree: "Postgraduate Diploma in Legal Practice", school: "Institute of Legal Practice and Development" },
                    { degree: "Bachelor of Laws (LL.B)", school: "University of Rwanda" },
                  ].map((item) => (
                    <div key={item.degree} className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">{item.degree}</p>
                      <p className="text-xs text-muted-foreground">{item.school}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Certifications</p>
                  <div className="space-y-3">
                    <div className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">Certified Arbitrator (Associate)</p>
                      <p className="text-xs text-muted-foreground">Chartered Institute of Arbitrators</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <p className="font-semibold text-sm">Certified Human Resources Manager</p>
                      <p className="text-xs text-muted-foreground">IABFM</p>
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
            <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-8 border border-primary/20">
              <blockquote className="text-lg md:text-xl font-serif italic text-foreground/90 leading-relaxed">
                "I advise and represent clients on legally sound business operations in Rwanda, structuring compliant investment transactions while combining international perspective with deep local insight to manage risk, drive growth, and deliver results with integrity."
              </blockquote>
              <p className="text-primary text-sm font-semibold mt-4">— Daniel Mutiganda</p>
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
      </div>
    </section>

    {/* Additional Team Members */}
    <section className="section-padding pt-0">
      <div className="container">
        <div className="mb-12">
          <div className="line-gold mb-4" />
          <h2 className="text-3xl font-bold font-serif mb-4">Our Legal Team</h2>
          <p className="text-muted-foreground max-w-2xl">
            Our team of dedicated legal professionals brings diverse expertise across practice areas, delivering strategic counsel with precision and integrity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              initials: "KM",
              name: "Katusime Mbombo Moses",
              role: "Partner",
              focus: "Legal & Corporate Governance, Compliance",
              desc: "Experienced legal and governance practitioner with over 18 years of expertise in corporate governance, compliance, stakeholder management, and strategic legal advisory. Skilled in developing governance frameworks, negotiating complex legal documentation, and mitigating legal risks to enhance operational efficiency and transparency.",
              memberships: ["Advocate, High Court of Rwanda", "East African Law Society"],
              education: "LL.B, University of Rwanda",
              languages: ["English", "French", "Kinyarwanda"],
            },
            {
              initials: "AN",
              name: "Aline Niyonzima",
              role: "Senior Associate",
              focus: "Corporate & Commercial Law",
              desc: "Advises on corporate transactions, regulatory compliance, and commercial agreements for local and international clients.",
              memberships: ["Rwanda Bar Association"],
              education: "LL.B, University of Rwanda",
              languages: ["English", "French", "Kinyarwanda"],
            },
            {
              initials: "JH",
              name: "Jean-Pierre Habimana",
              role: "Senior Associate",
              focus: "Banking, Finance & Investment",
              desc: "Specialises in banking regulations, investment structuring, and financial services advisory for institutions and private equity firms.",
              memberships: ["Rwanda Bar Association", "East African Law Society"],
              education: "LL.M, University of Cape Town",
              languages: ["English", "French", "Kinyarwanda"],
            },
            {
              initials: "CU",
              name: "Claire Uwimana",
              role: "Associate",
              focus: "Dispute Resolution & Arbitration",
              desc: "Represents clients in complex commercial disputes, arbitration proceedings, and regulatory enforcement matters.",
              memberships: ["Rwanda Bar Association"],
              education: "LL.B, University of Rwanda",
              languages: ["English", "Kinyarwanda"],
            },
            {
              initials: "EM",
              name: "Eric Mugisha",
              role: "Associate",
              focus: "Real Estate & Property Law",
              desc: "Advises on property transactions, land rights, development agreements, and real estate investment structuring.",
              memberships: ["Rwanda Bar Association"],
              education: "LL.B, University of Rwanda",
              languages: ["English", "French", "Kinyarwanda"],
            },
            {
              initials: "GK",
              name: "Grace Kamikazi",
              role: "Associate",
              focus: "Employment & Labour Law",
              desc: "Counsels businesses on employment contracts, labour compliance, executive recruitment structures, and workplace governance.",
              memberships: ["Rwanda Bar Association"],
              education: "LL.M, University of London",
              languages: ["English", "French", "Kinyarwanda"],
            },
            {
              initials: "PN",
              name: "Patrick Ndayisaba",
              role: "Associate",
              focus: "Tax & Corporate Structuring",
              desc: "Provides strategic tax advisory, corporate structuring guidance, and compliance support for businesses operating in Rwanda and the region.",
              memberships: ["Rwanda Bar Association"],
              education: "LL.B, University of Rwanda; CPA",
              languages: ["English", "French", "Kinyarwanda"],
            },
          ].map((member) => (
            <div key={member.name} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border border-primary/20 group-hover:border-primary/40 transition-colors">
                  <span className="text-primary font-serif text-lg font-bold">{member.initials}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif">{member.name}</h3>
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-foreground/90 mb-2">{member.focus}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{member.desc}</p>

              <div className="space-y-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Memberships</p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.memberships.map((m) => (
                      <span key={m} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Education</p>
                  <p className="text-xs text-foreground/70">{member.education}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Languages</p>
                  <div className="flex gap-1.5">
                    {member.languages.map((l) => (
                      <span key={l} className="text-xs bg-muted/50 text-foreground/70 px-2 py-1 rounded-full">{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <div className="mt-16 bg-card border border-border rounded-lg p-10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold font-serif mb-4">Join Beacon Attorneyes</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We are always looking for exceptional legal talent who share our commitment to strategic excellence, integrity, and client service.
          </p>
          <Link to="/contact">
            <Button variant="gold" className="gap-2">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default TeamPage;

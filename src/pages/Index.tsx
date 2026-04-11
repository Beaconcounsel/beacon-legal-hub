import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Users, Building2, Briefcase, Zap, Landmark, Wheat, Laptop, Phone, Target, Eye, Award, Mail, GraduationCap, MapPin, BookOpen } from "lucide-react";
import heroImg from "@/assets/hero-kigali.jpg";
import teamImg from "@/assets/team-meeting.jpg";
import danielPhoto from "@/assets/daniel-mutiganda.jpg";

import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const trustItems = [
  { icon: Shield, label: "30+ Years Combined Experience" },
  { icon: Globe, label: "Trusted by International Clients" },
  { icon: Building2, label: "Based in Kigali, Rwanda" },
];

const clientCategories = [
  {
    title: "Businesses & Corporations",
    description: "We advise on corporate structuring, regulatory compliance, mergers, and commercial strategy to protect your interests and accelerate growth.",
    icon: Building2,
  },
  {
    title: "Investors & Entrepreneurs",
    description: "We structure investments, negotiate joint ventures, and navigate Rwanda's regulatory landscape to secure your capital and maximize returns.",
    icon: Briefcase,
  },
  {
    title: "International Clients & Organizations",
    description: "We act as trusted local counsel for cross-border transactions, providing seamless legal coordination between jurisdictions.",
    icon: Globe,
  },
  {
    title: "NGOs & Development Organizations",
    description: "We advise on governance frameworks, regulatory compliance, employment matters, and institutional structuring for development-sector entities.",
    icon: Users,
  },
  {
    title: "Small & Medium Enterprises",
    description: "We support SMEs with practical legal guidance on contracts, compliance, employment law, and dispute prevention to help them grow with confidence.",
    icon: Briefcase,
  },
];

const practiceAreas = [
  "Corporate & Commercial Law",
  "Banking, Finance & Investment",
  "Dispute Resolution & Arbitration",
  "Real Estate & Property",
  "Energy & Infrastructure",
];

const industries = [
  { icon: Zap, label: "Energy & Infrastructure" },
  { icon: Landmark, label: "Financial Services" },
  { icon: Building2, label: "Real Estate & Development" },
  { icon: Laptop, label: "Technology & Innovation" },
  { icon: Wheat, label: "Agriculture & Agribusiness" },
];

const values = [
  { icon: Target, title: "Strategic Excellence", desc: "Every engagement is approached with the rigour and strategic thinking that complex matters demand." },
  { icon: Eye, title: "Discretion & Confidentiality", desc: "We handle sensitive matters with absolute discretion, earning the trust of clients who value privacy." },
  { icon: Shield, title: "Long-Term Partnerships", desc: "We invest in lasting relationships, serving as trusted advisors through every stage of our clients' growth." },
];

const HomePage = () => {
  const revealRef = useScrollReveal();
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroImgRef.current) {
        const scrollY = window.scrollY;
        heroImgRef.current.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            ref={heroImgRef}
            src={heroImg}
            alt="Kigali skyline"
            className="w-full h-full object-cover hero-parallax scale-105 blur-[2px]"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="line-gold mb-6 animate-fade-in" />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6 animate-fade-up text-foreground" style={{ animationDelay: "0.1s" }}>
              Law Firm for Individuals, Businesses, Institutions, and International Investors
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.25s" }}>
              With over 30 years of combined experience, Beacon Attorneys & Consultants advises on complex legal and business matters with the precision and discretion that high-stakes engagements demand.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Link to="/contact">
                <Button variant="gold" size="lg" className="gap-2">
                  Request a Private Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+250780000000">
                <Button variant="ghost" size="lg" className="gap-2 text-primary">
                  <Phone className="w-4 h-4" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative bg-card/80 backdrop-blur-sm border-y border-border/50">
        <div className="container py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium tracking-wide text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div ref={revealRef}>
        {/* About Section */}
        <section id="about" className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center reveal">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">About Us</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 font-serif text-primary">About Beacon Attorneyes</h2>
                <div className="line-gold mt-4 mb-6" />
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Beacon Attorneyes & Consultants is a premier law firm based in Kigali, Rwanda, advising businesses, institutions, and international clients on complex legal and commercial matters.</p>
                  <p>With over 30 years of combined experience across our partnership, we bring deep sector expertise, a rigorous advisory approach, and the discretion that high-stakes engagements require.</p>
                  <p>Our partner-led model ensures that every client receives direct access to senior counsel who understand both the legal intricacies and the commercial realities of their business.</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                <img src={teamImg} alt="Beacon Attorneyes team" className="relative rounded-xl shadow-2xl" loading="lazy" width={1024} height={1024} />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-primary">What Drives Us</h2>
              <div className="line-gold mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="reveal text-center bg-card border border-border rounded-xl p-10 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/15 transition-colors">
                    <v.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 font-serif">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Clients</h2>
              <div className="line-gold mx-auto mt-4 mb-6" />
              <p className="text-muted-foreground leading-relaxed">We act for our clientele across industries and borders, delivering partner-led advisory at every stage.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {clientCategories.map((cat) => (
                <div key={cat.title} className="reveal bg-card border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <cat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 font-serif">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practice Areas Teaser */}
        <section className="section-padding bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Practice Areas</h2>
              <div className="line-gold mx-auto mt-4 mb-6" />
              <p className="text-muted-foreground leading-relaxed">We advise across the full spectrum of business law, structured to address the complex needs of sophisticated clients.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-10 reveal">
              {practiceAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 bg-secondary/40 border border-border px-6 py-4 rounded-xl text-sm font-medium text-foreground/80">
                  <div className="w-2 h-2 rounded-full bg-primary/70" />
                  {area}
                </div>
              ))}
            </div>
            <div className="text-center reveal">
              <Link to="/practice-areas">
                <Button variant="gold-outline" className="gap-2">
                  View All 16 Practice Areas <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section id="team" className="section-padding">
          <div className="container">
            <div className="max-w-3xl mb-16 reveal">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">Our People</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-serif">Our Team</h2>
              <div className="line-gold mt-4 mb-6" />
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every engagement at Beacon Attorneyes is led by a partner with deep expertise and a personal commitment to client success. Our team combines international training with unmatched local knowledge.
              </p>
            </div>

            <div className="space-y-8">
              {/* Daniel Mutiganda */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 border-b border-border p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full flex-shrink-0 border-4 border-primary/30 overflow-hidden shadow-lg shadow-primary/10">
                      <img src={danielPhoto} alt="Daniel Mutiganda" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Lead Partner</p>
                      <h3 className="text-3xl md:text-4xl font-bold font-serif mb-2">Daniel Mutiganda</h3>
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
                  <div className="max-w-3xl">
                    <p className="text-foreground/80 leading-relaxed">
                      Daniel Mutiganda is a seasoned corporate lawyer and executive with over 18 years of experience advising and representing international investors, corporations, financial institutions, and local business leaders. He delivers commercially sound legal and strategic solutions across complex and regulated environments.
                    </p>
                    <p className="text-foreground/80 leading-relaxed mt-4">
                      He works with clients to align legal risk, business strategy, and growth objectives, with a strong focus on structuring compliant investments, negotiating transactions, and representing client interests in regulatory and commercial engagements.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="w-5 h-5 text-primary" />
                      <h4 className="text-xl font-bold font-serif">What Sets Him Apart</h4>
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

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <h4 className="text-xl font-bold font-serif">Multi-Disciplinary Experience</h4>
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

                  <div className="bg-muted/20 rounded-xl p-8 border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <h4 className="text-xl font-bold font-serif">International Perspective, Local Execution</h4>
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

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-5 h-5 text-primary" />
                        <h4 className="text-xl font-bold font-serif">Core Practice Areas</h4>
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
                        <h4 className="text-xl font-bold font-serif">Sector Focus</h4>
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

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h4 className="text-xl font-bold font-serif">Representative Experience</h4>
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

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Users className="w-5 h-5 text-primary" />
                        <h4 className="text-xl font-bold font-serif">Clients & Engagements</h4>
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
                        <h4 className="text-xl font-bold font-serif">Geographic Focus</h4>
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

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-bold font-serif mb-6">Board & Regulatory Advisory</h4>
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
                      <h4 className="text-xl font-bold font-serif mb-6">Leadership & Institutional Experience</h4>
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

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h4 className="text-xl font-bold font-serif">Education & Professional Foundation</h4>
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

                  <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-8 border border-primary/20">
                    <blockquote className="text-lg md:text-xl font-serif italic text-foreground/90 leading-relaxed">
                      "I advise and represent clients on legally sound business operations in Rwanda, structuring compliant investment transactions while combining international perspective with deep local insight to manage risk, drive growth, and deliver results with integrity."
                    </blockquote>
                    <p className="text-primary text-sm font-semibold mt-4">— Daniel Mutiganda</p>
                  </div>

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

              {/* Moses Katusime Mbombo */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-primary/5 border-b border-border p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="w-32 h-32 md:w-44 md:h-44 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-primary/30 shadow-lg shadow-primary/10">
                      <span className="text-primary font-serif text-4xl md:text-5xl font-bold">KM</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Partner</p>
                      <h3 className="text-3xl md:text-4xl font-bold font-serif mb-2">Katusime Mbombo Moses</h3>
                      <p className="text-foreground/80 text-lg mb-4">Legal & Corporate Governance, Compliance</p>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        Experienced legal and governance practitioner with over 18 years of expertise in corporate governance, compliance, stakeholder management, and strategic legal advisory. Skilled in developing governance frameworks, negotiating complex legal documentation, and mitigating legal risks to enhance operational efficiency and transparency.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-6">
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Advocate, High Court of Rwanda</span>
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">East African Law Society</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      <h4 className="text-xl font-bold font-serif">Education & Certifications</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { degree: "Master of Laws (LL.M)", school: "University of Groningen" },
                        { degree: "Bachelor of Laws (LL.B)", school: "National University of Rwanda" },
                        { degree: "Postgraduate Diploma in Legal Practice", school: "Institute of Legal Practice and Development" },
                        { degree: "Financial Industry Management (FICP)", school: "Luxembourg School of Business" },
                      ].map((item) => (
                        <div key={item.degree} className="border border-border rounded-lg p-4">
                          <p className="font-semibold text-sm">{item.degree}</p>
                          <p className="text-xs text-muted-foreground">{item.school}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Languages</p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">English</span>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">French</span>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Kinyarwanda</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Careers */}
              <div className="mt-8 reveal relative max-w-2xl mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
                <div className="relative bg-card border border-border rounded-xl p-12 text-center">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">Careers</span>
                  <h3 className="text-2xl font-bold font-serif mb-4">Join Beacon Attorneyes</h3>
                  <div className="line-gold mx-auto mt-4 mb-6" />
                  <p className="text-muted-foreground leading-relaxed mb-8">
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
          </div>
        </section>

        {/* Industries */}
        <section className="section-padding bg-card">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Industries We Serve</h2>
              <div className="line-gold mx-auto mt-4" />
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {industries.map((ind) => (
                <div key={ind.label} className="reveal flex items-center gap-3 bg-secondary/40 border border-border px-7 py-5 rounded-xl hover:border-primary/30 hover:bg-secondary/60 transition-all duration-300 group">
                  <ind.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{ind.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding">
          <div className="container">
            <div className="reveal relative max-w-2xl mx-auto text-center">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-primary">Our Purpose</h2>
                <div className="line-gold mx-auto mt-4 mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  To pursue justice through strategic legal counsel that empowers businesses, protects interests, and drives sustainable growth across Rwanda and the region.
                </p>
                <Link to="/contact">
                  <Button variant="gold" className="gap-2">
                    Work With Us <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
          <div className="container relative">
            <div className="text-center max-w-2xl mx-auto reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Engage Experienced Legal Counsel Today</h2>
              <div className="line-gold mx-auto mt-4 mb-6" />
              <p className="text-muted-foreground mb-10 leading-relaxed">Whether you are navigating a complex transaction, entering a new market, or protecting your business interests, our partners are ready to advise.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button variant="gold" size="lg" className="gap-2">
                    Request a Private Consultation <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+250780000000">
                  <Button variant="gold-outline" size="lg" className="gap-2">
                    <Phone className="w-4 h-4" /> Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Users, Building2, Briefcase, Zap, Landmark, Wheat, Laptop, Phone } from "lucide-react";
import heroImg from "@/assets/hero-kigali.jpg";
import teamImg from "@/assets/team-meeting.jpg";
import Layout from "@/components/Layout";

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
    title: "State-Owned Enterprises",
    description: "We represent SOEs in complex procurement, governance, and regulatory matters with the discretion and rigor these engagements demand.",
    icon: Landmark,
  },
];

const practiceAreas = [
  "Corporate & Commercial Law",
  "Banking, Finance & Investment",
  "Dispute Resolution & Arbitration",
  "Real Estate & Property",
  "Energy & Infrastructure",
  "Tax & Corporate Structuring",
  "Private Wealth & Succession",
  "Regulatory Compliance",
];

const transactions = [
  "Advised a multinational consortium on a $120M cross-border investment into Rwandan infrastructure",
  "Structured a multi-jurisdictional corporate reorganization for an East African financial services group",
  "Acted as local counsel for international investors in a large-scale real estate development",
  "Provided regulatory advisory for a government-backed energy project",
  "Represented institutional investors in complex dispute resolution proceedings",
];

const industries = [
  { icon: Zap, label: "Energy & Infrastructure" },
  { icon: Landmark, label: "Financial Services" },
  { icon: Building2, label: "Real Estate & Development" },
  { icon: Laptop, label: "Technology & Innovation" },
  { icon: Wheat, label: "Agriculture & Agribusiness" },
];

const HomePage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Kigali professional office" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      </div>
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          <div className="line-gold mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Strategic Legal Counsel for Businesses, Institutions, and{" "}
            <span className="text-gradient-gold">Global Investors</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            With over 30 years of combined experience, With over 30 years of combined experience, Beacon Attorneyes & Consultants advises on complex legal and business matters with the precision and discretion that high-stakes engagements demand. on complex legal and business matters with the precision and discretion that high-stakes engagements demand.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                Request a Private Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/team">
              <Button variant="gold-outline" size="lg">Speak with a Partner</Button>
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

    {/* Trust */}
    <section className="bg-card border-y border-border">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Who We Serve */}
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="line-gold mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
          <p className="text-muted-foreground">We act for a select clientele across industries and borders, delivering partner-led advisory at every stage.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientCategories.map((cat) => (
            <div key={cat.title} className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors group">
              <cat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3 font-serif">{cat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Practice Areas Preview */}
    <section className="section-padding bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="line-gold mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Practice Areas</h2>
            <p className="text-muted-foreground mb-8">We advise across the full spectrum of business law, structured to address the complex needs of sophisticated clients.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {practiceAreas.map((area) => (
                <div key={area} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-foreground/80">{area}</span>
                </div>
              ))}
            </div>
            <Link to="/practice-areas" className="inline-block mt-8">
              <Button variant="gold-outline" className="gap-2">
                View All Practice Areas <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img src={teamImg} alt="Beacon legal team" className="rounded-lg shadow-2xl" loading="lazy" width={1024} height={1024} />
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-semibold">
              Partner-Led Advisory
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Representative Experience */}
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="line-gold mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Representative Experience</h2>
          <p className="text-muted-foreground">Selected transactions reflecting the scope and complexity of our advisory work.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {transactions.map((t, i) => (
            <div key={i} className="flex gap-4 items-start bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
              <span className="text-primary font-serif text-lg font-bold mt-0.5">0{i + 1}</span>
              <p className="text-foreground/80 text-sm leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Industries */}
    <section className="section-padding bg-card">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="line-gold mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {industries.map((ind) => (
            <div key={ind.label} className="flex items-center gap-3 bg-secondary/50 border border-border px-6 py-4 rounded-lg">
              <ind.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">{ind.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Engage Experienced Legal Counsel Today</h2>
          <p className="text-muted-foreground mb-8">Whether you are navigating a complex transaction, entering a new market, or protecting your business interests, our partners are ready to advise.</p>
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
  </Layout>
);

export default HomePage;

import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Globe, Users, Building2, Briefcase, Zap, Landmark, Wheat, Laptop, Phone } from "lucide-react";
import heroImg from "@/assets/hero-kigali.jpg";
import teamImg from "@/assets/team-meeting.jpg";
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

const HomePage = () => {
  const revealRef = useScrollReveal();
  const heroImgRef = useRef<HTMLImageElement>(null);

  // Subtle parallax on hero image
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
              With over 30 years of combined experience, Beacon Attorneyes & Consultants advises on complex legal and business matters with the precision and discretion that high-stakes engagements demand.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
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

        {/* Practice Areas */}
        <section className="section-padding bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="reveal">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary">Practice Areas</h2>
                <div className="line-gold mt-4 mb-6" />
                <p className="text-muted-foreground mb-10 leading-relaxed">We advise across the full spectrum of business law, structured to address the complex needs of sophisticated clients.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {practiceAreas.map((area) => (
                    <div key={area} className="flex items-center gap-3 text-sm group">
                      <div className="w-2 h-2 rounded-full bg-primary/70 group-hover:bg-primary transition-colors" />
                      <span className="text-foreground/80 group-hover:text-foreground transition-colors">{area}</span>
                    </div>
                  ))}
                </div>
                <Link to="/practice-areas" className="inline-block mt-10">
                  <Button variant="gold-outline" className="gap-2">
                    View All Practice Areas <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative reveal">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
                <img src={teamImg} alt="Beacon legal team" className="relative rounded-xl shadow-2xl" loading="lazy" width={1024} height={1024} />
                <div className="absolute -bottom-5 -left-5 bg-primary text-primary-foreground px-7 py-4 rounded-xl text-sm font-semibold shadow-lg">
                  Partner-Led Advisory
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Representative Experience */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Representative Experience</h2>
              <div className="line-gold mx-auto mt-4 mb-6" />
              <p className="text-muted-foreground leading-relaxed">Selected transactions reflecting the scope and complexity of our advisory work.</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-5">
              {transactions.map((t, i) => (
                <div key={i} className="reveal flex gap-5 items-start bg-card border border-border rounded-xl p-7 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(43_76%_55%/0.04)] transition-all duration-300">
                  <span className="text-primary font-serif text-xl font-bold mt-0.5 shrink-0">0{i + 1}</span>
                  <p className="text-foreground/80 text-sm leading-relaxed">{t}</p>
                </div>
              ))}
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

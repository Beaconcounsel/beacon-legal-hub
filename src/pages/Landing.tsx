import { Link } from "react-router-dom";
import { ArrowRight, Phone, Scale, Briefcase, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImg from "@/assets/kigali-city.jpg";

const stats = [
  { value: "30+", label: "Years Combined Experience" },
  { value: "5+", label: "Practice Areas" },
  { value: "100+", label: "Clients Served" },
];

const highlights = [
  { icon: Scale, title: "Complex Legal Matters", desc: "Precision counsel for high-stakes disputes, transactions, and regulatory challenges." },
  { icon: Briefcase, title: "Business Advisory", desc: "Strategic guidance on corporate structuring, compliance, and commercial growth." },
  { icon: Globe, title: "Cross-Border Expertise", desc: "Trusted local counsel for international investors entering Rwanda and the region." },
  { icon: Users, title: "Partner-Led Service", desc: "Direct access to senior counsel who understand your legal and commercial realities." },
];

const Landing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Kigali skyline"
            className="w-full h-full object-cover scale-105"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 pt-20 md:pt-24 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-4">
              Welcome to Beacon Attorneys
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium mb-10 leading-relaxed text-foreground/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              With global experience and a sharp understanding of Rwanda's legal and business landscape, we deliver legal solutions that work—locally and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="gold" size="lg" className="gap-2 text-base">
                  Request a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="tel:+250780000000">
                <Button variant="ghost" size="lg" className="gap-2 text-primary text-base">
                  <Phone className="w-4 h-4" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-card/80 backdrop-blur-sm border-y border-border/50">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-primary font-serif">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-2 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-primary">Why Beacon Attorneys</h2>
            <div className="h-1 w-16 bg-primary rounded-full mx-auto mt-4 mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              A trusted partner for legal matters that demand expertise, discretion, and a deep understanding of Rwanda's commercial landscape.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <h.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3 font-serif">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container">
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
            <div className="relative bg-background border border-border rounded-xl p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif text-primary">Ready to Discuss Your Matter?</h2>
              <div className="h-1 w-16 bg-primary rounded-full mx-auto mt-4 mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-8">
                Contact us for a confidential consultation. Our partners are ready to advise on your most complex legal and business challenges.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button variant="gold" size="lg" className="gap-2">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="lg" className="gap-2">
                    Explore Our Firm
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;

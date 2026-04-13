import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Search, GraduationCap, Briefcase, Users, Globe, Building2, Sprout, Scale } from "lucide-react";
import researchHeroImg from "@/assets/research-hero.jpg";

const ResearchPage = () => {
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
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={researchHeroImg} alt="Legal professionals group photo" className="w-full h-full object-cover scale-105" loading="eager" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 pt-20 md:pt-24 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Beacon Attorneys advances justice and promotes doing business through targeted research, professional training, and strategic consultancy that strengthen legal capacity across Rwanda.
            </p>
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Research</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-12">
            Our research practice generates actionable insights that shape policy, inform business strategy, and advance the rule of law. We contribute to the legal and commercial knowledge base through rigorous analysis of emerging issues.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Scale, title: "Legal Framework Analysis", desc: "In-depth studies of Rwanda's evolving regulatory environment, identifying opportunities and compliance requirements for businesses and investors." },
              { icon: Globe, title: "Cross-Border Investment Research", desc: "Comparative analysis of investment frameworks across East Africa, helping businesses understand market entry requirements and regulatory harmonization." },
              { icon: BookOpen, title: "Policy & Legislative Review", desc: "Critical assessment of proposed legislation and policy changes, providing stakeholders with evidence-based perspectives on potential business impact." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 font-serif">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Commission Research <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Training */}
      <section id="training" className="section-padding bg-card scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Training</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-12">
            We design and deliver practical training programmes that equip professionals, communities, and organizations with the legal knowledge needed to operate confidently and compliantly.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Users, title: "Youth Legal Literacy & Entrepreneurship", desc: "Empowering young Rwandans with foundational legal knowledge and entrepreneurial skills to build compliant, sustainable businesses." },
              { icon: Sprout, title: "Women in Business Law", desc: "Targeted programmes covering business registration, contract negotiation, property rights, and financial literacy for women entrepreneurs." },
              { icon: Building2, title: "SME Legal Structuring", desc: "Practical workshops on business structuring, tax compliance, employment law, and regulatory requirements for growing enterprises." },
              { icon: Globe, title: "Farmer Cooperatives", desc: "Training on land rights, agricultural contracts, cooperative governance, and compliance for farming communities." },
              { icon: GraduationCap, title: "NGO Governance & Compliance", desc: "Capacity building for NGOs on governance frameworks, donor compliance, regulatory filings, and organizational best practices." },
            ].map((item) => (
              <div key={item.title} className="bg-background border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 font-serif">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Inquire About Training Programmes <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Consultancy */}
      <section id="consultancy" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Consultancy</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-12">
            Our consultancy practice provides strategic advisory services to organizations seeking to navigate complex legal, regulatory, and business environments with confidence.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Briefcase, title: "Business Environment Advisory", desc: "Guiding investors and enterprises through Rwanda's business landscape, from market entry strategy to operational compliance and growth planning." },
              { icon: Search, title: "Regulatory Impact Assessment", desc: "Evaluating how regulatory changes affect business operations, and developing compliance strategies that minimize disruption." },
              { icon: Scale, title: "Justice Sector Strengthening", desc: "Partnering with institutions to improve access to justice, strengthen dispute resolution mechanisms, and promote the rule of law for all." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 font-serif">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Request a Consultancy Engagement <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ResearchPage;

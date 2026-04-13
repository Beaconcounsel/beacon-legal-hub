import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, TrendingUp, Lightbulb, Handshake, Globe, Shield, MapPin, Scale, Heart } from "lucide-react";
import kigaliImg from "@/assets/kigali-skyline.jpg";

const servePillars = [
  { icon: Target, title: "Results-Driven Counsel", desc: "We don't stop at recommendations. Our team drives toward actionable outcomes that create tangible value for your business." },
  { icon: Users, title: "Executive-Level Understanding", desc: "Having held executive business and legal leadership roles, our partners understand the pressures, priorities, and pace of decision-making at the highest levels." },
  { icon: TrendingUp, title: "Business-First Mindset", desc: "We translate complex legal frameworks into clear business strategies. Every piece of advice is shaped by commercial reality, not just legal theory." },
  { icon: Lightbulb, title: "Strategic Problem Solving", desc: "We anticipate challenges before they arise and design solutions that protect your interests while advancing your objectives." },
  { icon: Handshake, title: "Partnership, Not Just Representation", desc: "We embed ourselves in your operations, becoming an extension of your leadership team to deliver sustained, measurable impact." },
];

const internationalServices = [
  { icon: Globe, title: "Market Entry Advisory", desc: "We guide international investors through Rwanda's regulatory requirements, company registration, licensing, and sector-specific compliance for seamless market entry." },
  { icon: Scale, title: "Cross-Border Legal Coordination", desc: "We coordinate with international law firms to ensure alignment across jurisdictions, managing multi-party transactions with precision." },
  { icon: MapPin, title: "Local Regulatory Expertise", desc: "Our deep understanding of Rwanda's legal framework ensures compliance with investment codes, tax incentives, and sector regulations." },
  { icon: Shield, title: "Risk Mitigation", desc: "We identify and address legal, regulatory, and business risks to protect your investment and ensure long-term sustainability." },
  { icon: Handshake, title: "Joint Ventures & Partnerships", desc: "We structure partnerships with local entities, negotiate JV agreements, and ensure governance frameworks that protect all stakeholders." },
];

const OurApproachPage = () => {
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
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-foreground">Our Approach</h1>
            <div className="line-gold mx-auto mb-6" />
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Beacon Attorneys, we bring more than legal expertise—we bring executive insight. Our founding partners have held senior business and legal leadership roles across multiple industries and jurisdictions.
            </p>
          </div>
        </div>
      </section>

      {/* How We Serve You */}
      <section id="how-we-serve" className="section-padding scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">How We Serve You</h2>
          <div className="line-gold mb-6" />
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-12">
            We combine rigorous legal analysis with strategic business thinking to deliver outcomes, not just recommendations.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {servePillars.map((p) => (
              <div key={p.title} className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
                <p.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 font-serif">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* International Clients */}
      <section id="international" className="scroll-mt-28">
        <div className="relative min-h-[40vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={kigaliImg} alt="Kigali skyline" className="w-full h-full object-cover scale-105" loading="lazy" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent" />
          </div>
          <div className="container relative z-10 py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-foreground">International Clients</h2>
            <div className="line-gold mb-6" />
            <p className="text-lg text-foreground/90 max-w-2xl leading-relaxed">
              We bridge international expectations with local legal execution for global investors and multinational organizations operating in Rwanda and East Africa.
            </p>
          </div>
        </div>

        <div className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-6 font-serif">Rwanda as an Investment Destination</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Rwanda has emerged as one of Africa's most attractive investment destinations, recognized globally for political stability, regulatory transparency, and a business-friendly environment.</p>
                  <p>Ranked among the easiest places to do business in Africa, Rwanda offers streamlined company registration, investor-friendly tax incentives, and a commitment to innovation that has positioned Kigali as a regional hub for finance, technology, and infrastructure development.</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-bold mb-6 font-serif text-primary">Why Rwanda?</h3>
                <ul className="space-y-4">
                  {["Ranked 1st in Africa for ease of doing business in 2025", "Stable political, security, and governance environments", "Strategic access to East and Central African markets", "A premier MICE destination, ranked 2nd in Africa by ICCA", "Growing tech and financial services hub", "Investor protection and incentive frameworks"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {internationalServices.map((s) => (
                <div key={s.title} className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
                  <s.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-3 font-serif">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/contact">
              <Button variant="gold" size="lg" className="gap-2">
                Schedule an International Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pro Bono Services */}
      <section id="pro-bono" className="section-padding bg-card scroll-mt-28">
        <div className="container">
          <h2 className="text-3xl font-bold mb-4 font-serif text-foreground">Pro Bono Services</h2>
          <div className="line-gold mb-6" />
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-10">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Beacon Attorneys is committed to ensuring that access to justice is not limited by financial circumstances. We dedicate a meaningful portion of our practice to pro bono work, serving individuals and communities who face difficult conditions and cannot afford legal representation.
              </p>
              <p>
                In partnership with the Rwanda Bar Association, Legal Aid Forum, and other national and international organizations that support the needy, we provide free legal counsel to vulnerable populations—including victims of gender-based violence, refugees, indigent defendants, and marginalized communities.
              </p>
              <p>
                Our pro bono practice reflects our belief that every person deserves competent legal representation, regardless of their economic standing. We work alongside civil society organizations to advance systemic justice and strengthen the rule of law across Rwanda.
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-8">
              <Heart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4 font-serif">Our Pro Bono Partners</h3>
              <ul className="space-y-3">
                {[
                  "Rwanda Bar Association – Legal Aid Programme",
                  "Legal Aid Forum (LAF)",
                  "UNHCR – Refugee Legal Assistance",
                  "Haguruka – Women & Children's Rights",
                  "International Justice Mission (IJM)",
                  "Other national and international access-to-justice organizations",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Partner With Us on Pro Bono <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default OurApproachPage;

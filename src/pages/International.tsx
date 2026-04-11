import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, MapPin, Scale, Handshake } from "lucide-react";
import kigaliImg from "@/assets/kigali-skyline.jpg";

const services = [
  { icon: Globe, title: "Market Entry Advisory", desc: "We guide international investors through Rwanda's regulatory requirements, company registration, licensing, and sector-specific compliance for seamless market entry." },
  { icon: Scale, title: "Cross-Border Legal Coordination", desc: "We coordinate with international counsel to ensure alignment across jurisdictions, managing multi-party transactions with precision." },
  { icon: MapPin, title: "Local Regulatory Expertise", desc: "Our deep understanding of Rwanda's legal framework ensures compliance with investment codes, tax incentives, and sector regulations." },
  { icon: Shield, title: "Risk Mitigation", desc: "We identify and address legal, regulatory, and political risks to protect your investment and ensure long-term sustainability." },
  { icon: Handshake, title: "Joint Ventures & Partnerships", desc: "We structure partnerships with local entities, negotiate JV agreements, and ensure governance frameworks that protect all stakeholders." },
];

const InternationalPage = () => (
  <Layout>
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img src={kigaliImg} alt="Kigali skyline" className="w-full h-full object-cover" loading="lazy" width={1200} height={600} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/70" />
      </div>
      <div className="container relative z-10 section-padding">
        <div className="max-w-2xl">
          <div className="line-gold mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">International Clients</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We bridge international expectations with local legal execution. For global investors and multinational organizations, Beacon Attorneys provides the strategic counsel and on-the-ground expertise required to operate confidently in Rwanda and the East African region.
          </p>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-serif">Rwanda as an Investment Destination</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Rwanda has emerged as one of Africa's most attractive investment destinations, recognized globally for political stability, regulatory transparency, and a business-friendly environment.</p>
              <p>Ranked the top easiest places to do business in Africa, Rwanda offers streamlined company registration, investor-friendly tax incentives, and a commitment to innovation that has positioned Kigali as a regional hub for finance, sports, technology, and infrastructure development.</p>
              <p>Our firm provides the local expertise and strategic perspective to help international clients capitalize on these opportunities while navigating the nuances of the Rwandan legal system.</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-bold mb-6 font-serif text-primary">Why Rwanda?</h3>
            <ul className="space-y-4">
              {["Ranked 1st in Africa for ease of doing business in 2025", "Stable Political, Security, Public governance environments", "Strategic access to East and Central African markets", "A premier destination for MICE (Meetings, Incentives, Conferences, and Exhibitions), ranked 2nd in Africa by ICCA", "Growing tech and financial services hub", "Investor protection and incentive frameworks"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <div className="line-gold mb-4" />
          <h2 className="text-3xl font-bold mb-12 font-serif">How We Support International Clients</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
                <s.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-3 font-serif">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2 whitespace-normal">
              Schedule a Consultation <ArrowRight className="w-4 h-4 shrink-0" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default InternationalPage;

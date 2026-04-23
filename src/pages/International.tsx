import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, MapPin, Scale, Handshake } from "lucide-react";
import kigaliImg from "@/assets/kigali-skyline.jpg";

const services = [
  { icon: Globe, title: "Market Entry Advisory", desc: "We guide international investors through Rwanda's regulatory requirements, company registration, licensing, and sector-specific compliance for seamless market entry." },
  { icon: Scale, title: "Cross-Border Legal Coordination", desc: "We coordinate with international Law firms to ensure alignment across jurisdictions, managing multi-party transactions with precision." },
  { icon: MapPin, title: "Local Regulatory Expertise", desc: "Our deep understanding of Rwanda's legal framework ensures compliance with investment codes, tax incentives, and sector regulations." },
  { icon: Shield, title: "Risk Mitigation", desc: "We identify and address legal, regulatory, and business risks to protect your investment and ensure long-term sustainability." },
  { icon: Handshake, title: "Joint Ventures & Partnerships", desc: "We structure partnerships with local entities, negotiate JV agreements, and ensure governance frameworks that protect all stakeholders." },
];

const InternationalPage = () => (
  <Layout>
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={kigaliImg} alt="Kigali skyline" className="w-full h-full object-cover scale-105" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
      </div>
      <div className="container relative z-10 pt-16 md:pt-20 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-1 w-16 bg-primary rounded-full mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-6">International Clients</h1>
          <p className="text-lg md:text-xl font-medium leading-relaxed text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            We bridge international expectations with local legal execution. For global investors and multinational organizations, Beacon Attorneys provides the strategic counsel and on-the-ground expertise required to operate confidently in Rwanda and the East African region.
          </p>
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-5 font-serif">Rwanda as an Investment Destination</h2>
            <div className="space-y-3 text-muted-foreground leading-snug">
              <p>Rwanda has emerged as one of Africa's most attractive investment destinations, recognized globally for political stability, regulatory transparency, and a business-friendly environment.</p>
              <p>Ranked the top easiest places to do business in Africa, Rwanda offers streamlined company registration, investor-friendly tax incentives, and a commitment to innovation that has positioned Kigali as a regional hub for finance, sports, technology, and infrastructure development.</p>
              <p>Our firm provides the local expertise and strategic perspective to help international clients capitalize on these opportunities while navigating the nuances of the Rwandan legal system.</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold mb-5 font-serif text-primary">Why Rwanda?</h3>
            <ul className="space-y-3">
              {["Ranked 1st in Africa for ease of doing business in 2025", "Stable Political, Security, Public governance environments", "Strategic access to East and Central African markets", "A premier destination for MICE (Meetings, Incentives, Conferences, and Exhibitions), ranked 2nd in Africa by ICCA", "Growing tech and financial services hub", "Investor protection and incentive frameworks"].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground/80 leading-snug">
                  <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <div className="line-gold mb-4" />
          <h2 className="text-3xl font-bold mb-10 font-serif">How We Support International Clients</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
                <s.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-lg font-semibold mb-2 font-serif">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug">{s.desc}</p>
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

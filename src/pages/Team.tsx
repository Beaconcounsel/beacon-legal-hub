import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Linkedin, Mail } from "lucide-react";

const partners = [
  {
    name: "Jean-Pierre Mugabo",
    title: "Managing Partner",
    expertise: "Corporate & Commercial Law, Cross-Border Transactions, Energy & Infrastructure",
    experience: "Over 15 years advising multinational corporations, sovereign entities, and international investors on complex transactions across East Africa. Previously served as senior counsel at a leading regional firm.",
    education: "LL.M., University of London · LL.B., National University of Rwanda",
  },
  {
    name: "Amina Uwimana",
    title: "Senior Partner",
    expertise: "Banking & Finance, Private Wealth, Tax & Corporate Structuring",
    experience: "Over 12 years of experience in financial services regulation, investment structuring, and private wealth advisory. Recognized for her strategic approach to complex financial transactions and cross-border tax planning.",
    education: "LL.M., Harvard Law School · LL.B., University of Rwanda",
  },
  {
    name: "David Nkurunziza",
    title: "Partner",
    expertise: "Dispute Resolution, Arbitration, Regulatory Compliance",
    experience: "Over 10 years representing clients in high-value commercial disputes, international arbitration proceedings, and regulatory investigations. Known for his litigation strategy and client advocacy.",
    education: "LL.M., Columbia Law School · LL.B., University of Rwanda",
  },
  {
    name: "Grace Kamanzi",
    title: "Partner",
    expertise: "Real Estate, Technology & Data Protection, Intellectual Property",
    experience: "Advises on complex real estate developments, technology transactions, and IP portfolio management. Brings a unique perspective combining property law expertise with deep understanding of Rwanda's digital economy.",
    education: "LL.M., University of Cape Town · LL.B., University of Rwanda",
  },
];

const TeamPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="line-gold mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Every engagement at Beacon is led by a partner with deep expertise and a personal commitment to client success. Our team combines international training with unmatched local knowledge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {partners.map((p) => (
            <div key={p.name} className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary font-serif text-xl font-bold">
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <h2 className="text-2xl font-bold font-serif mb-1">{p.name}</h2>
              <p className="text-primary text-sm font-medium mb-4">{p.title}</p>
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Expertise</p>
                  <p className="text-sm text-foreground/80">{p.expertise}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{p.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Education</p>
                  <p className="text-sm text-foreground/80">{p.education}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="w-4 h-4" /></a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Speak with a Partner <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default TeamPage;

import Layout from "@/components/Layout";
import { Target, Users, TrendingUp, Lightbulb, Handshake } from "lucide-react";

const pillars = [
  { icon: Target, title: "Results-Driven Counsel", desc: "We don't stop at recommendations. Our team drives toward actionable outcomes that create tangible value for your business." },
  { icon: Users, title: "Executive-Level Understanding", desc: "Having held executive business and legal leadership roles, our partners understand the pressures, priorities, and pace of decision-making at the highest levels." },
  { icon: TrendingUp, title: "Business-First Mindset", desc: "We translate complex legal frameworks into clear business strategies. Every piece of advice is shaped by commercial reality, not just legal theory." },
  { icon: Lightbulb, title: "Strategic Problem Solving", desc: "We anticipate challenges before they arise and design solutions that protect your interests while advancing your objectives." },
  { icon: Handshake, title: "Partnership, Not Just Representation", desc: "We embed ourselves in your operations, becoming an extension of your leadership team to deliver sustained, measurable impact." },
];

const OurApproachPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="line-gold mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Approach</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Beacon Attorneyes, we bring more than legal expertise—we bring executive insight. Our founding partners have held senior business and legal leadership roles across multiple industries and jurisdictions, giving us a unique ability to understand your business needs from the inside out.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            This means we don't just advise—we drive for results. We combine rigorous legal analysis with strategic business thinking to deliver outcomes, not just recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="bg-card border border-border rounded-xl p-8 hover:border-primary/30 transition-colors">
              <p.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-3 font-heading">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default OurApproachPage;

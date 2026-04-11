import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Shield } from "lucide-react";
import teamImg from "@/assets/team-meeting.jpg";

const values = [
  { icon: Target, title: "Strategic Excellence", desc: "Every engagement is approached with the rigour and strategic thinking that complex matters demand." },
  { icon: Eye, title: "Discretion & Confidentiality", desc: "We handle sensitive matters with absolute discretion, earning the trust of clients who value privacy." },
  { icon: Shield, title: "Long-Term Partnerships", desc: "We invest in lasting relationships, serving as trusted advisors through every stage of our clients' growth." },
];

const AboutPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="line-gold mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Beacon</h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p><p>Beacon Attorneyes & Consultants is a premier law firm based in Kigali, Rwanda, advising businesses, institutions, and international clients on complex legal and commercial matters.</p> law firm based in Kigali, Rwanda, advising businesses, institutions, and international clients on complex legal and commercial matters.</p>
              <p>With over 30 years of combined experience across our partnership, we bring deep sector expertise, a rigorous advisory approach, and the discretion that high-stakes engagements require.</p>
              <p>Our partner-led model ensures that every client receives direct access to senior counsel who understand both the legal intricacies and the commercial realities of their business.</p>
            </div>
          </div>
          <div>
            <img src={teamImg} alt="Beacon Attorneyes team" className="rounded-lg shadow-2xl" loading="lazy" width={1024} height={1024} />
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 font-serif">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <v.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 font-serif">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-10 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 font-serif">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            To deliver strategic, partner-led legal counsel that empowers businesses, protects interests, and drives sustainable growth across Rwanda and the region.
          </p>
          <Link to="/contact">
            <Button variant="gold" className="gap-2">
              Work With Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default AboutPage;

import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Shield } from "lucide-react";
import teamImg from "@/assets/team-meeting.jpg";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const values = [
  { icon: Target, title: "Strategic Excellence", desc: "Every engagement is approached with the rigour and strategic thinking that complex matters demand." },
  { icon: Eye, title: "Discretion & Confidentiality", desc: "We handle sensitive matters with absolute discretion, earning the trust of clients who value privacy." },
  { icon: Shield, title: "Long-Term Partnerships", desc: "We invest in lasting relationships, serving as trusted advisors through every stage of our clients' growth." },
];

const AboutPage = () => {
  const revealRef = useScrollReveal();

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pb-0">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">About Us</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">About Beacon</h1>
              <div className="line-gold mt-4 mb-6" />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Beacon Attorneyes & Consultants is a premier law firm based in Kigali, Rwanda, advising businesses, institutions, and international clients on complex legal and commercial matters.</p>
                <p>With over 30 years of combined experience across our partnership, we bring deep sector expertise, a rigorous advisory approach, and the discretion that high-stakes engagements require.</p>
                <p>Our partner-led model ensures that every client receives direct access to senior counsel who understand both the legal intricacies and the commercial realities of their business.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl" />
              <img src={teamImg} alt="Beacon Attorneyes team" className="relative rounded-xl shadow-2xl" loading="lazy" width={1024} height={1024} />
            </div>
          </div>
        </div>
      </section>

      <div ref={revealRef}>
        {/* Values */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16 reveal">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">What Drives Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Our Values</h2>
              <div className="line-gold mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="reveal text-center bg-card border border-border rounded-xl p-10 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/15 transition-colors">
                    <v.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 font-serif">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-card">
          <div className="container">
            <div className="reveal relative max-w-2xl mx-auto text-center">
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
              <div className="relative bg-card border border-border rounded-xl p-12">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">Our Purpose</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif">Our Mission</h2>
                <div className="line-gold mx-auto mt-4 mb-6" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  To deliver strategic, partner-led legal counsel that empowers businesses, protects interests, and drives sustainable growth across Rwanda and the region.
                </p>
                <Link to="/contact">
                  <Button variant="gold" className="gap-2">
                    Work With Us <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;

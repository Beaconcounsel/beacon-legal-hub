import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Sprout, Building2, Globe } from "lucide-react";

const programs = [
  { icon: Users, title: "Youth Legal Literacy & Entrepreneurship", desc: "Empowering young Rwandans with foundational legal knowledge and entrepreneurial skills to build compliant, sustainable businesses." },
  { icon: Sprout, title: "Women in Business Law", desc: "Targeted programs covering business registration, contract negotiation, property rights, and financial literacy for women entrepreneurs." },
  { icon: Globe, title: "Farmer Cooperatives", desc: "Training on land rights, agricultural contracts, cooperative governance, and compliance for farming communities and cooperatives." },
  { icon: Building2, title: "SME Legal Structuring", desc: "Practical workshops on business structuring, tax compliance, employment law, and regulatory requirements for growing enterprises." },
  { icon: BookOpen, title: "NGO Governance & Compliance", desc: "Capacity building for NGOs on governance frameworks, donor compliance, regulatory filings, and organizational best practices." },
];

const ResearchPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="line-gold mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal Research & Training</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Beacon is committed to strengthening legal capacity across Rwanda. Through targeted research, education programs, and practical training, we simplify complex legal concepts and empower communities, organizations, and businesses to operate within a clear legal framework.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {programs.map((p) => (
            <div key={p.title} className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors">
              <p.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-3 font-serif">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-10 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4 font-serif">Our Approach</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Every training program is designed with practical application in mind. We translate complex legal frameworks into actionable knowledge, ensuring participants can immediately apply what they learn.</p>
            <p>Our programs contribute to Rwanda's sustainable development goals by building legal awareness, promoting compliance culture, and strengthening institutional capacity at every level.</p>
          </div>
        </div>

        <div className="mt-16">
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Inquire About Training Programs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default ResearchPage;

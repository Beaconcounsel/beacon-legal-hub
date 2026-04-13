import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const articles = [
  {
    title: "Legal Considerations for Foreign Investors in Rwanda",
    excerpt: "An overview of Rwanda's investment code, regulatory requirements, and strategic considerations for international investors seeking to establish or expand operations in the country.",
    date: "March 2026",
    category: "Investment",
  },
  {
    title: "Structuring Investments in Emerging Markets",
    excerpt: "Key legal and tax structuring considerations for cross-border investments into East African markets, including holding structures, treaty planning, and risk allocation.",
    date: "February 2026",
    category: "Corporate",
  },
  {
    title: "Corporate Governance Best Practices for Rwandan Entities",
    excerpt: "A practical guide to board composition, shareholder agreements, conflict of interest policies, and governance frameworks aligned with international standards.",
    date: "January 2026",
    category: "Governance",
  },
  {
    title: "Data Protection Compliance in Rwanda's Digital Economy",
    excerpt: "An analysis of Rwanda's data protection framework, cross-border data transfer requirements, and compliance strategies for technology companies.",
    date: "December 2025",
    category: "Technology",
  },
  {
    title: "Navigating Employment Law in Rwanda: A Guide for Employers",
    excerpt: "Essential considerations for employment contracts, workplace policies, termination procedures, and compliance with Rwanda's labour code.",
    date: "November 2025",
    category: "Employment",
  },
];

const InsightsPage = () => (
  <Layout>
    <section className="section-padding">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="line-gold mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights & Publications</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our thought leadership reflects the depth of our expertise and our commitment to keeping clients informed on critical legal and regulatory developments.
          </p>
        </div>

        <div className="space-y-8">
          {articles.map((article, i) => (
            <article key={i} className="bg-card border border-border rounded-lg p-8 md:p-10 hover:border-primary/30 transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" /> {article.date}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">{article.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/contact">
            <Button variant="gold" size="lg" className="gap-2">
              Subscribe to Our Updates <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default InsightsPage;

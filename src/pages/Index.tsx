import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Shield, Globe, Users, Building2, Briefcase, Zap, Landmark, Wheat, Laptop, Phone, Target, Eye, Award, Mail, GraduationCap, MapPin, BookOpen, ChevronDown, Clock, DollarSign, FileText, Navigation, UserPlus, Monitor } from "lucide-react";
import heroImg from "@/assets/hero-kigali.jpg";
import teamImg from "@/assets/team-meeting.jpg";
import danielPhoto from "@/assets/daniel-mutiganda.jpg";
import mosesPhoto from "@/assets/moses-katusime.jpg";
import teamHeroPhoto from "@/assets/team-hero.jpg";
import Layout from "@/components/Layout";
import LocalizedLink from "@/components/LocalizedLink";
import SEOHead from "@/components/SEOHead";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useLocalizedPath } from "@/hooks/use-localized-path";

const HomePage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { localePath } = useLocalizedPath();

  const trustItems = [
    { icon: Shield, label: t("home.trust.experience") },
    { icon: Globe, label: t("home.trust.international") },
    { icon: Building2, label: t("home.trust.basedKigali") },
  ];

  const clientCategories = [
    { title: t("home.clients.businesses"), description: t("home.clients.businessesDesc"), icon: Building2 },
    { title: t("home.clients.investors"), description: t("home.clients.investorsDesc"), icon: Briefcase },
    { title: t("home.clients.international"), description: t("home.clients.internationalDesc"), icon: Globe },
    { title: t("home.clients.ngos"), description: t("home.clients.ngosDesc"), icon: Users },
    { title: t("home.clients.smes"), description: t("home.clients.smesDesc"), icon: Briefcase },
  ];

  const values = [
    { icon: Target, title: t("home.values.excellence"), desc: t("home.values.excellenceDesc") },
    { icon: Eye, title: t("home.values.discretion"), desc: t("home.values.discretionDesc") },
    { icon: Shield, title: t("home.values.partnerships"), desc: t("home.values.partnershipsDesc") },
  ];

  const industries = [
    { icon: Zap, label: t("practiceAreas.industries.energy") },
    { icon: Landmark, label: t("practiceAreas.industries.financial") },
    { icon: Building2, label: t("practiceAreas.industries.realEstate") },
    { icon: Laptop, label: t("practiceAreas.industries.technology") },
    { icon: Wheat, label: t("practiceAreas.industries.agriculture") },
  ];

  const activeSection = useMemo(() => {
    const hash = location.hash.replace("#", "");
    if (["about", "team", "industries"].includes(hash)) return hash;
    return null;
  }, [location.hash]);

  const revealRef = useScrollReveal([activeSection]);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const show = (section: string) => !activeSection || activeSection === section;

  useEffect(() => {
    if (activeSection && revealRef.current) {
      const timer = setTimeout(() => {
        revealRef.current?.querySelectorAll(".reveal:not(.revealed)").forEach((el) => {
          el.classList.add("revealed");
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [activeSection, revealRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (heroImgRef.current) {
        const scrollY = window.scrollY;
        heroImgRef.current.style.transform = `translateY(${scrollY * 0.15}px) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [location.hash]);

  return (
    <Layout>
      <SEOHead titleKey="seo.homeTitle" descKey="seo.homeDesc" />
      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[500px] lg:min-h-[540px] flex items-start overflow-hidden">
        <div className="absolute inset-0">
          <img ref={heroImgRef} src={heroImg} alt="Kigali skyline" className="w-full h-full object-cover hero-parallax scale-105 blur-[2px]" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" />
        </div>
        <div className="container relative z-10 pt-[64px] md:pt-[72px] lg:pt-[80px] pb-10">
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-3 md:gap-4">
            <p className="text-lg md:text-xl font-medium text-white/95 leading-snug animate-fade-up drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{t("home.heroTagline")}</p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="relative bg-card/80 backdrop-blur-sm border-y border-border/50">
        <div className="container py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium tracking-wide text-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div ref={revealRef} className={activeSection ? "force-reveal" : ""}>
        {show("about") && (<>
          {/* About Section */}
          <section id="about" className="section-padding scroll-mt-24">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center reveal">
                <div className="flex lg:justify-start order-1">
                  <div className="w-full md:w-[480px] lg:w-[600px] max-w-full aspect-[2400/2477] overflow-hidden rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                    <img
                      src={teamHeroPhoto}
                      alt="Beacon Attorneyes partners – Daniel Mutiganda and Moses Katusime"
                      className="w-full h-full object-cover object-[center_top]"
                      fetchPriority="high"
                      decoding="async"
                      width={2400}
                      height={2477}
                    />
                  </div>
                </div>
                <div className="order-2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-foreground">{t("home.whoWeAre")}</h2>
                  <div className="line-gold mb-6" />
                  <div className="space-y-3 text-muted-foreground leading-snug">
                    <p>{t("home.whoWeAreP1")}</p>
                    <p>{t("home.whoWeAreP2")}</p>
                    <p>{t("home.whoWeAreP3")}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="section-padding bg-card">
            <div className="container">
              <div className="text-center max-w-2xl mx-auto mb-8 reveal">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif text-foreground">{t("home.whatDrivesUs")}</h2>
                <div className="line-gold mx-auto" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((v) => (
                  <div key={v.title} className="reveal text-center bg-card border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                      <v.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-serif">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission */}
          <section className="section-padding">
            <div className="container">
              <div className="reveal relative max-w-2xl mx-auto text-center">
                <div className="absolute -inset-6 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 rounded-2xl" />
                <div className="relative bg-card border border-border rounded-xl p-10">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 font-serif text-foreground">{t("home.ourPurpose")}</h2>
                  <div className="line-gold mx-auto mb-5" />
                  <p className="text-muted-foreground leading-snug mb-6">{t("home.ourPurposeDesc")}</p>
                  <LocalizedLink to="/contact">
                    <Button variant="gold" className="gap-2">
                      {t("home.workWithUs")} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="section-padding">
            <div className="container">
              <div className="text-center max-w-2xl mx-auto mb-10 reveal">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("home.ourClients")}</h2>
                <div className="line-gold mx-auto mb-6" />
                <p className="text-muted-foreground leading-snug">{t("home.ourClientsDesc")}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clientCategories.map((cat) => (
                  <div key={cat.title} className="reveal bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(43_76%_55%/0.06)] transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-justice/10 flex items-center justify-center mb-4 group-hover:bg-justice/15 transition-colors">
                      <cat.icon className="w-6 h-6 text-justice group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 font-serif">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{cat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>)}

        {show("team") && (
          <section id="team" className="section-padding scroll-mt-24">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
                <div className="reveal">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-foreground">{t("home.ourPeople")}</h2>
                  <div className="line-gold mb-6" />
                  <p className="text-muted-foreground text-lg leading-relaxed">{t("home.ourPeopleDesc")}</p>
                </div>
                <div className="flex md:justify-end reveal">
                  <div className="w-full md:w-[480px] lg:w-[600px] max-w-full aspect-[2400/2477] overflow-hidden rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                    <img
                      src={teamHeroPhoto}
                      alt="Beacon Attorneyes partners – Daniel Mutiganda and Moses Katusime"
                      className="w-full h-full object-cover object-[center_top]"
                    />
                  </div>
                </div>
              </div>

              <Accordion type="multiple" className="space-y-6">
                {/* Daniel Mutiganda */}
                <AccordionItem value="daniel" className="border-0 group/daniel">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <AccordionTrigger className="hover:no-underline p-0 [&>svg]:hidden">
                      <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 md:p-10 w-full text-left">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                          <div className="w-[320px] md:w-[420px] lg:w-[520px] max-w-full aspect-[1578/1973] flex-shrink-0 overflow-hidden rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                            <img
                              src={danielPhoto}
                              alt="Daniel Mutiganda – Lead Partner, Corporate, Transactions & Cross-Border Advisory"
                              className="w-full h-full object-cover object-[center_top]"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">{t("home.leadPartner")}</p>
                            <h3 className="text-3xl md:text-4xl font-bold font-serif mb-2">Daniel Mutiganda</h3>
                            <p className="text-foreground/80 text-lg mb-4">{t("home.danielRole")}</p>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl">{t("home.danielSummary")}</p>
                            <div className="flex flex-wrap gap-3 mt-6">
                              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Rwanda Bar Association</span>
                              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">East African Law Society</span>
                              <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">CIArb, UK</span>
                            </div>
                            <div className="flex items-center gap-2 mt-6 text-primary text-sm font-medium">
                              <span className="group-data-[state=open]/daniel:hidden">{t("home.viewFullProfile")}</span>
                              <span className="hidden group-data-[state=open]/daniel:inline">{t("home.hideProfile")}</span>
                              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]/daniel:rotate-180" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="p-6 md:p-10 space-y-8 border-t border-border">
                        <div className="max-w-3xl">
                          <p className="text-foreground/80 leading-relaxed">{t("home.danielBio1")}</p>
                          <p className="text-foreground/80 leading-relaxed mt-4">{t("home.danielBio2")}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <Award className="w-5 h-5 text-primary" />
                            <h4 className="text-xl font-bold font-serif">{t("home.whatSetsHimApart")}</h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            {["Combines legal, executive, and public sector experience", "Strong track record across regulated and high-growth sectors", "Deep understanding of Rwanda's legal, regulatory, and business environment", "Aligns legal frameworks with commercial strategy and growth", "Advises on and represents clients in transactions and regulatory engagements", "Strong cross-cultural capability across international and local stakeholder environments"].map((item) => (
                              <div key={item} className="flex items-start gap-3 bg-muted/30 rounded-lg p-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 flex-shrink-0" />
                                <p className="text-sm text-foreground/80">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <Briefcase className="w-5 h-5 text-primary" />
                            <h4 className="text-xl font-bold font-serif">{t("home.multiDisciplinary")}</h4>
                          </div>
                          <p className="text-muted-foreground text-sm mb-6 ml-8">{t("home.internationalPerspectiveDesc").split(".")[0]}.</p>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[{ sector: "Government & Public Sector", desc: "Legislative advisory, policy, and regulatory frameworks" }, { sector: "Financial Services", desc: "Banking, compliance, risk, and governance" }, { sector: "International Development", desc: "Advisory to NGOs, donors, and global institutions" }, { sector: "Health & Social Impact", desc: "Support to large-scale, mission-driven programs" }, { sector: "Corporate & Private Sector", desc: "Structuring, transactions, and business growth" }, { sector: "Consultancy & Legal Advisory", desc: "Cross-sector strategic advisory and representation" }].map((item) => (
                              <div key={item.sector} className="border border-border rounded-lg p-5 hover:border-primary/30 transition-colors">
                                <p className="font-semibold text-sm mb-1">{item.sector}</p>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-muted/20 rounded-xl p-8 border border-border">
                          <div className="flex items-center gap-3 mb-3">
                            <Globe className="w-5 h-5 text-primary" />
                            <h4 className="text-xl font-bold font-serif">{t("home.internationalPerspective")}</h4>
                          </div>
                          <p className="text-foreground/80 text-sm leading-relaxed mb-6">{t("home.internationalPerspectiveDesc")}</p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {["Structuring compliant and scalable investments", "Managing legal and regulatory risk", "Representing clients in negotiations and regulatory processes", "Bridging international and local stakeholders", "Translating complexity into clear business decisions"].map((item) => (
                              <div key={item} className="flex items-start gap-2">
                                <div className="w-1 h-1 rounded-full bg-justice mt-2 flex-shrink-0" />
                                <p className="text-sm text-foreground/70">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <Shield className="w-5 h-5 text-primary" />
                              <h4 className="text-xl font-bold font-serif">{t("home.corePracticeAreas")}</h4>
                            </div>
                            <ul className="space-y-3">
                              {["Cross-Border Transactions & Market Entry", "Mergers & Acquisitions (M&A)", "Corporate Structuring & Restructuring", "Regulatory Compliance & Government Relations", "Corporate Governance & Board Advisory", "Investment & Institutional Advisory", "Commercial Contracts, Negotiation & Representation"].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <Briefcase className="w-5 h-5 text-primary" />
                              <h4 className="text-xl font-bold font-serif">{t("home.sectorFocus")}</h4>
                            </div>
                            <div className="space-y-4">
                              {[{ sector: "Financial Services & Fintech", desc: "Banking, digital finance, compliance, and licensing" }, { sector: "Energy & Infrastructure", desc: "Project structuring, PPPs, and regulatory approvals" }, { sector: "Investment & Private Equity", desc: "Deal structuring, due diligence, and execution" }, { sector: "International Development & ESG", desc: "Governance, compliance, and sustainable investment" }, { sector: "Government & Public Sector", desc: "Regulatory frameworks and institutional advisory" }, { sector: "Corporate & Commercial", desc: "M&A, structuring, and business expansion" }].map((item) => (
                                <div key={item.sector}>
                                  <p className="text-sm font-semibold">{item.sector}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <h4 className="text-xl font-bold font-serif">{t("home.representativeExperience")}</h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-3">
                            {["Advised on and represented clients in cross-border investment transactions in regulated sectors", "Led corporate restructuring and shareholder transitions", "Supported market entry, licensing, and regulatory approvals for international investors", "Negotiated and represented clients in commercial agreements with international partners", "Strengthened governance frameworks, reducing legal and regulatory exposure", "Advised and represented boards and executive teams on risk, compliance, and strategic decision-making"].map((item) => (
                              <div key={item} className="flex items-start gap-3 p-4 bg-muted/20 rounded-lg">
                                <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 flex-shrink-0" />
                                <p className="text-sm text-foreground/70">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <Users className="w-5 h-5 text-primary" />
                              <h4 className="text-xl font-bold font-serif">{t("home.clientsEngagements")}</h4>
                            </div>
                            <ul className="space-y-3">
                              {["International investors and private equity firms", "Development finance institutions and global organizations", "Multinational corporations", "Financial institutions and regulated entities", "Local enterprises and high-growth businesses"].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <MapPin className="w-5 h-5 text-primary" />
                              <h4 className="text-xl font-bold font-serif">{t("home.geographicFocus")}</h4>
                            </div>
                            <div className="space-y-4">
                              {[{ name: "Rwanda", desc: "Core market" }, { name: "East Africa", desc: "Regional advisory and transactions" }, { name: "Cross-Border", desc: "Investment structuring" }].map((item) => (
                                <div key={item.name} className="border border-border rounded-lg p-4">
                                  <p className="font-semibold text-sm">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xl font-bold font-serif mb-6">{t("home.boardRegulatory")}</h4>
                            <ul className="space-y-3">
                              {["Advises and represents boards and executive teams on governance, compliance, and risk", "Experience engaging regulators and navigating licensing frameworks", "Company secretarial and board-level advisory experience"].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold font-serif mb-6">{t("home.leadershipInstitutional")}</h4>
                            <ul className="space-y-3">
                              {["Led organizational growth from under 1,000 to over 3,500 employees", "Managed large operational teams and budgets", "Strengthened governance, compliance, and internal systems", "Worked closely with international leadership and investors", "Advised and represented executive teams on risk, strategy, and growth"].map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-justice mt-2 flex-shrink-0" />
                                  <span className="text-sm text-foreground/80">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <GraduationCap className="w-5 h-5 text-primary" />
                            <h4 className="text-xl font-bold font-serif">{t("home.educationFoundation")}</h4>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                              {[{ degree: "Master of Business Administration (MBA)", school: "Oklahoma Christian University, USA" }, { degree: "Postgraduate Diploma in Legal Practice", school: "Institute of Legal Practice and Development" }, { degree: "Bachelor of Laws (LL.B)", school: "University of Rwanda" }].map((item) => (
                                <div key={item.degree} className="border border-border rounded-lg p-4">
                                  <p className="font-semibold text-sm">{item.degree}</p>
                                  <p className="text-xs text-muted-foreground">{item.school}</p>
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{t("home.certifications")}</p>
                              <div className="space-y-3">
                                <div className="border border-border rounded-lg p-4">
                                  <p className="font-semibold text-sm">Certified Arbitrator (Associate)</p>
                                  <p className="text-xs text-muted-foreground">Chartered Institute of Arbitrators</p>
                                </div>
                                <div className="border border-border rounded-lg p-4">
                                  <p className="font-semibold text-sm">Certified Human Resources Manager</p>
                                  <p className="text-xs text-muted-foreground">IABFM</p>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 mt-6">{t("home.languages")}</p>
                              <div className="flex gap-2">
                                <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">English</span>
                                <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">French</span>
                                <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full">Kinyarwanda</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-6 border border-primary/20">
                          <blockquote className="text-lg md:text-xl font-serif italic text-foreground/90 leading-relaxed">
                            {t("home.danielQuote")}
                          </blockquote>
                          <p className="text-primary text-sm font-semibold mt-4">— Daniel Mutiganda</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <LocalizedLink to="/contact">
                            <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                              {t("home.bookConsultation")} <ArrowRight className="w-4 h-4" />
                            </Button>
                          </LocalizedLink>
                          <a href="mailto:info@beaconattorneys.rw">
                            <Button variant="gold-outline" size="lg" className="gap-2 w-full sm:w-auto">
                              <Mail className="w-4 h-4" /> {t("home.emailDaniel")}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>

                {/* Moses Katusime Mbombo */}
                <AccordionItem value="moses" className="border-0 group/moses">
                  <div className="bg-card border border-border rounded-2xl overflow-hidden">
                    <AccordionTrigger className="hover:no-underline p-0 [&>svg]:hidden">
                      <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 md:p-10 w-full text-left">
                        <div className="flex flex-col md:flex-row items-start gap-6">
                          <div className="w-[320px] md:w-[420px] lg:w-[520px] max-w-full aspect-[1578/1973] flex-shrink-0 overflow-hidden rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
                            <img
                              src={mosesPhoto}
                              alt="Moses Katusime – Senior Partner, Legal & Corporate Governance"
                              className="w-full h-full object-cover object-[center_top]"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="inline-block text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold uppercase tracking-wider mb-3">Senior Partner</span>
                            <h3 className="text-3xl md:text-4xl font-bold font-serif mb-2">Moses Katusime</h3>
                            <p className="text-muted-foreground leading-snug max-w-2xl mb-4">
                              Strategic legal counsel for corporations, investors, and public institutions across Rwanda and the region.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs border border-border text-foreground/80 px-3 py-1.5 rounded-full">FCIArb — Fellow Chartered Arbitrator</span>
                              <span className="text-xs border border-border text-foreground/80 px-3 py-1.5 rounded-full">LSB — FICP Designation</span>
                              <span className="text-xs border border-border text-foreground/80 px-3 py-1.5 rounded-full">18+ Years Experience</span>
                            </div>
                            <div className="flex items-center gap-2 mt-5 text-primary text-sm font-medium">
                              <span className="group-data-[state=open]/moses:hidden">{t("home.viewFullProfile")}</span>
                              <span className="hidden group-data-[state=open]/moses:inline">{t("home.hideProfile")}</span>
                              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]/moses:rotate-180" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <div className="p-6 md:p-10 space-y-8 border-t border-border">
                        {/* Stat tiles */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { stat: "18+", label: "Years of legal practice" },
                            { stat: "FCIArb", label: "Chartered Arbitrator Fellow" },
                            { stat: "LLM", label: "Master of Laws" },
                          ].map((item) => (
                            <div key={item.label} className="bg-muted/40 rounded-lg p-6 text-center">
                              <p className="font-serif text-3xl md:text-4xl font-bold mb-1">{item.stat}</p>
                              <p className="text-xs text-muted-foreground">{item.label}</p>
                            </div>
                          ))}
                        </div>

                        <p className="text-foreground/80 leading-snug">
                          Moses Katusime is a highly experienced legal practitioner advising corporations, investors, and public institutions on complex legal, commercial, and regulatory matters. He provides strategic, business-oriented counsel that supports investment, safeguards assets, and enables sustainable growth. Particularly recognised for structuring legally robust frameworks for large-scale projects — aligning legal strategy with financial and operational objectives.
                        </p>

                        {/* Practice Areas */}
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">Practice Areas</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              "Corporate & Commercial Law",
                              "Construction & Infrastructure",
                              "Asset Management",
                              "Project Financing",
                              "Dispute Resolution",
                              "International Arbitration",
                              "Real Estate Transactions",
                              "Corporate Governance",
                            ].map((area) => (
                              <div key={area} className="border border-border rounded-lg px-4 py-3 text-sm leading-snug">
                                {area}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Transactions & Experience */}
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">Key Transactions & Experience</p>
                          <div className="space-y-3">
                            {[
                              { icon: Building2, title: "Project Finance & Infrastructure Development", desc: "Advised on structuring and legal documentation for infrastructure and real estate projects, including EPC and FIDIC-based contracts, financing agreements, and risk allocation mechanisms." },
                              { icon: Clock, title: "Construction Arbitration & Claims Management", desc: "Acts for employers and contractors in high-value construction disputes, including arbitration proceedings and mediation, with a focus on claims strategy and dispute avoidance." },
                              { icon: DollarSign, title: "Asset & Investment Structuring", desc: "Advised on establishment and management of real estate and infrastructure investment portfolios, including legal structuring of investment vehicles and regulatory compliance." },
                              { icon: FileText, title: "Facilities Management & Operational Contracts", desc: "Structured and negotiated facilities management agreements, outsourcing contracts, SLAs, and performance-based frameworks for commercial and institutional assets." },
                              { icon: Navigation, title: "Real Estate Transactions & Land Development", desc: "Led legal advisory on complex land acquisitions, title due diligence, property transfers, and large-scale development projects." },
                              { icon: UserPlus, title: "Corporate Structuring & Market Entry", desc: "Advised regional and international investors on corporate structuring, joint ventures, and regulatory compliance for entry into the Rwandan market." },
                              { icon: Monitor, title: "Corporate Governance Advisory", desc: "Supported boards and executive management in establishing governance frameworks, compliance systems, and risk management strategies aligned with international best practices." },
                            ].map((item) => (
                              <div key={item.title} className="border border-border rounded-lg p-4 flex items-start gap-4 text-left">
                                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <item.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                                  <p className="text-sm text-muted-foreground leading-snug">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Education & Qualifications */}
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-3">Education & Qualifications</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                              { title: "Master of Laws (LLM)", sub: "University of Groningen" },
                              { title: "Bachelor of Laws (LLB)", sub: "National University of Rwanda" },
                              { title: "Advanced Diploma in Legal Practice", sub: "Institute of Legal Practice and Development" },
                              { title: "FICP Designation", sub: "Luxembourg School of Business" },
                              { title: "Fellow Chartered Arbitrator", sub: "FCIArb — Chartered Institute of Arbitrators" },
                            ].map((item) => (
                              <div key={item.title} className="border border-border rounded-lg p-4">
                                <p className="font-semibold text-sm mb-1 leading-snug">{item.title}</p>
                                <p className="text-xs text-muted-foreground leading-snug">{item.sub}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <LocalizedLink to="/contact">
                            <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                              {t("home.bookConsultation")} <ArrowRight className="w-4 h-4" />
                            </Button>
                          </LocalizedLink>
                          <a href="mailto:info@beaconattorneys.rw">
                            <Button variant="gold-outline" size="lg" className="gap-2 w-full sm:w-auto">
                              <Mail className="w-4 h-4" /> {t("home.workWithUs")}
                            </Button>
                          </a>
                        </div>
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        )}

        {show("industries") && (
          <section id="industries" className="section-padding bg-card scroll-mt-20">
            <div className="container">
              <div className="text-center max-w-2xl mx-auto mb-10 reveal">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("home.industriesWeServe")}</h2>
                <div className="line-gold mx-auto" />
              </div>
              <div className="flex flex-wrap justify-center gap-5">
                {industries.map((ind) => (
                  <div key={ind.label} className="reveal flex items-center gap-3 bg-secondary/40 border border-border px-7 py-5 rounded-xl hover:border-primary/30 hover:bg-secondary/60 transition-all duration-300 group">
                    <ind.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{ind.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
          <div className="container relative">
            <div className="text-center max-w-2xl mx-auto reveal">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{t("home.connectWithUs")}</h2>
              <div className="line-gold mx-auto mt-4 mb-6" />
              <p className="text-muted-foreground mb-10 leading-relaxed">{t("home.connectDesc")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <LocalizedLink to="/contact">
                  <Button variant="gold" size="lg" className="gap-2">
                    {t("home.requestConsultation")} <ArrowRight className="w-4 h-4" />
                  </Button>
                </LocalizedLink>
                <a href="tel:+250788559603">
                  <Button variant="gold-outline" size="lg" className="gap-2">
                    <Phone className="w-4 h-4" /> {t("home.callNow")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

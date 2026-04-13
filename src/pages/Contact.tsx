import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const revealRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you. We will be in touch shortly.");
    setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pb-0">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3 block">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Request a Consultation</h1>
            <div className="line-gold mt-4 mb-4" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our partners are ready to discuss your needs in confidence.
            </p>
          </div>
        </div>
      </section>

      <div ref={revealRef}>
        <section className="section-padding pt-0">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 reveal">
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 md:p-10 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-background border-border focus:border-primary/50 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email *</label>
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-background border-border focus:border-primary/50 transition-colors" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background border-border focus:border-primary/50 transition-colors" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company / Organization</label>
                      <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-background border-border focus:border-primary/50 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject *</label>
                    <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="bg-background border-border focus:border-primary/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">How can we assist you? *</label>
                    <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="bg-background border-border focus:border-primary/50 transition-colors" />
                  </div>
                  <Button type="submit" variant="gold" size="lg">Submit Inquiry</Button>
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-8 reveal">
                <div className="bg-card border border-border rounded-xl p-8">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4 block">Reach Us</span>
                  <h3 className="text-lg font-semibold font-serif mb-6">Contact Information</h3>
                  <ul className="space-y-5">
                    {[
                      { icon: MapPin, text: "KG 190 St, RIM House, 1st Floor, Kigali, Rwanda", href: "https://www.google.com/maps/search/KG+190+St,+RIM+House,+Kigali,+Rwanda" },
                      { icon: Phone, text: "+250 788 55 96 03", href: "tel:+250788559603" },
                      { icon: Mail, text: "info@beaconattorneys.rw", href: "mailto:info@beaconattorneys.rw" },
                      { icon: Clock, text: "Mon – Fri: 8:00 AM – 6:00 PM", href: undefined },
                    ].map((item) => (
                      <li key={item.text} className="flex items-start gap-4 text-sm group">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        {item.href ? (
                          <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors mt-2">{item.text}</a>
                        ) : (
                          <span className="text-muted-foreground mt-2">{item.text}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5!2d30.06!3d-1.95!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca42e5e7e8b7d%3A0x0!2sKG%20190%20St%2C%20Kigali!5e0!3m2!1sen!2srw!4v1700000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Beacon Attorneyes location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;

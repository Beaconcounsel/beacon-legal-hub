import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you. We will be in touch shortly.");
    setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <div className="line-gold mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Request a Private Consultation</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you require strategic counsel on a complex transaction or ongoing advisory for your business, our partners are ready to discuss your needs in confidence.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name *</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="bg-card border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="bg-card border-border" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-card border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company / Organization</label>
                    <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-card border-border" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject *</label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="bg-card border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">How can we assist you? *</label>
                  <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="bg-card border-border" />
                </div>
                <Button type="submit" variant="gold" size="lg">Submit Inquiry</Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold font-serif mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Kigali, Rwanda</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href="tel:+250780000000" className="hover:text-primary transition-colors">+250 780 000 000</a>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href="mailto:info@beaconlaw.rw" className="hover:text-primary transition-colors">info@beaconlaw.rw</a>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mt-0.5 text-primary" />
                    <span>Mon – Fri: 8:00 AM – 6:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63800.41!2d29.83!3d-1.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8e797%3A0x1234567890abcdef!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Beacon Attorneys location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

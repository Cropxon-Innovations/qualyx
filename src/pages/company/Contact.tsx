import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Mail, 
  MessageSquare, 
  Headphones, 
  MapPin,
  ArrowRight,
  Send,
  CheckCircle2,
  Clock,
  Building2,
  Phone
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureCard, 
  FeatureSection, 
  StatCard
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactMethods = [
  {
    icon: Mail,
    title: "Sales",
    description: "Talk to our sales team about enterprise plans",
    contact: "sales@qualyx.io",
    responseTime: "< 2 hours"
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Get help with technical issues",
    contact: "support@qualyx.io",
    responseTime: "< 4 hours"
  },
  {
    icon: Building2,
    title: "Partnerships",
    description: "Explore partnership opportunities",
    contact: "partners@qualyx.io",
    responseTime: "< 24 hours"
  },
  {
    icon: MessageSquare,
    title: "General",
    description: "General inquiries and feedback",
    contact: "hello@qualyx.io",
    responseTime: "< 24 hours"
  },
];

// Contact Form Demo
const ContactFormDemo = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Quick Contact</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          Fast Response
        </span>
      </div>

      {/* Response Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl border border-success/30 bg-success/10 text-center">
          <div className="text-lg font-bold text-success">&lt;2h</div>
          <div className="text-xs text-muted-foreground">Sales Response</div>
        </div>
        <div className="p-3 rounded-xl border border-primary/30 bg-primary/10 text-center">
          <div className="text-lg font-bold text-primary">&lt;4h</div>
          <div className="text-xs text-muted-foreground">Support Response</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-3 rounded-lg bg-muted/20 border border-border/40">
        <div className="text-xs text-muted-foreground mb-2">Recent Responses</div>
        <div className="space-y-2">
          {[
            { message: "Pricing inquiry answered", time: "2 min ago" },
            { message: "Technical issue resolved", time: "15 min ago" },
            { message: "Demo scheduled", time: "1 hour ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-3 h-3 text-success" />
              <span className="text-foreground flex-1">{item.message}</span>
              <span className="text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Global Presence */}
      <div className="flex flex-wrap gap-2">
        {["🇺🇸 San Francisco", "🇬🇧 London", "🇮🇳 Bangalore"].map((loc) => (
          <span key={loc} className="text-xs px-2 py-1 rounded-full bg-muted/30 text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {loc}
          </span>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Contact - QUALYX</title>
        <meta name="description" content="Get in touch with the QUALYX team. We are here to help with sales, support, and partnerships." />
      </Helmet>

      <FeatureHero
        badge="Get in Touch"
        subtitle="Company"
        title="Contact Us"
        description="We'd love to hear from you. Whether you have a question about features, pricing, or anything else, our team is ready to help."
        primaryCta={{ label: "Email Us", href: "mailto:hello@qualyx.io" }}
        secondaryCta={{ label: "Book a Demo", href: "/demo" }}
      >
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/70" />
              <div className="w-3 h-3 rounded-full bg-warning/70" />
              <div className="w-3 h-3 rounded-full bg-success/70" />
            </div>
            <div className="flex-1 mx-4 h-6 rounded-lg bg-muted/30 flex items-center px-3">
              <span className="text-xs text-muted-foreground font-mono">QUALYX Contact</span>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <ContactFormDemo />
          </div>
        </div>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="<2h" label="Sales Response" />
          <StatCard value="<4h" label="Support Response" />
          <StatCard value="24/7" label="Availability" />
          <StatCard value="98%" label="Satisfaction" />
        </div>
      </section>

      {/* Contact Methods */}
      <FeatureSection
        title="Ways to Reach Us"
        description="Choose the best way to get in touch"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={`mailto:${method.contact}`}
              className="group p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <method.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{method.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
              <p className="text-sm text-primary font-medium mb-2">{method.contact}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Response: {method.responseTime}
              </p>
            </a>
          ))}
        </div>
      </FeatureSection>

      {/* Contact Form */}
      <FeatureSection
        title="Send a Message"
        description="Fill out the form and we'll get back to you"
        className="bg-muted/10"
      >
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-border/40 bg-card/30 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input 
                  placeholder="Your name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input 
                  type="email" 
                  placeholder="you@company.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <Input 
                placeholder="How can we help?" 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <Textarea 
                placeholder="Tell us more about your needs..." 
                rows={5} 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="bg-background/50 resize-none"
              />
            </div>
            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full group"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </FeatureSection>

      {/* Offices */}
      <FeatureSection
        title="Our Offices"
        description="We're a remote-first company with team members worldwide"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { city: "San Francisco", country: "United States", address: "548 Market St, Suite 95123", timezone: "PST (UTC-8)" },
            { city: "London", country: "United Kingdom", address: "1 Canada Square, Canary Wharf", timezone: "GMT (UTC+0)" },
            { city: "Bangalore", country: "India", address: "WeWork Embassy Golf Links", timezone: "IST (UTC+5:30)" },
          ].map((office) => (
            <div key={office.city} className="p-6 rounded-2xl border border-border/40 bg-card/30">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground">{office.city}</h3>
              <p className="text-sm text-muted-foreground mb-2">{office.country}</p>
              <p className="text-sm text-muted-foreground mb-3">{office.address}</p>
              <p className="text-xs text-primary">{office.timezone}</p>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Ready to get started?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using QUALYX.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#waitlist">
              <Button variant="hero" size="lg" className="group">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="/demo">
              <Button variant="outline" size="lg">
                Book a Demo
              </Button>
            </a>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Contact;

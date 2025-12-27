import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Mail, MessageSquare, FileText, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Contact - QUALYX</title>
        <meta name="description" content="Get in touch with the QUALYX team. We are here to help with sales, support, and partnerships." />
      </Helmet>

      <DocPage
        title="Contact Us"
        description="We would love to hear from you. Reach out for sales, support, or just to say hi."
        breadcrumbs={[
          { label: "Company", href: "/company/contact" },
          { label: "Contact" },
        ]}
      >
        <DocSection title="Get in Touch">
          <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
            <div className="glass-card p-6 rounded-xl">
              <Mail className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Sales</h3>
              <p className="text-sm text-muted-foreground mb-3">Talk to our sales team about enterprise plans.</p>
              <a href="mailto:sales@qualyx.io" className="text-primary text-sm hover:underline">sales@qualyx.io</a>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Headphones className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Get help with technical issues.</p>
              <a href="mailto:support@qualyx.io" className="text-primary text-sm hover:underline">support@qualyx.io</a>
            </div>
          </div>
        </DocSection>

        <DocSection title="Send a Message">
          <form className="glass-card p-6 rounded-xl space-y-4 not-prose">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <Input placeholder="Your name" className="bg-background/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input type="email" placeholder="you@company.com" className="bg-background/50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <Input placeholder="How can we help?" className="bg-background/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <Textarea placeholder="Your message..." rows={4} className="bg-background/50 resize-none" />
            </div>
            <Button variant="default" className="w-full">Send Message</Button>
          </form>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default Contact;

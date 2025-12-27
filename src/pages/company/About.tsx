import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Target, Users, Zap, Globe } from "lucide-react";

const About = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>About - QUALYX</title>
        <meta name="description" content="Learn about QUALYX, our mission, and the team building the future of autonomous QA." />
      </Helmet>

      <DocPage
        title="About QUALYX"
        description="Building the future of autonomous quality assurance."
        breadcrumbs={[
          { label: "Company", href: "/company/about" },
          { label: "About" },
        ]}
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX was founded with a simple mission: make quality assurance effortless. We believe 
            that teams should spend their time building great products, not maintaining fragile tests.
          </p>
        </DocSection>

        <DocSection title="Our Mission">
          <div className="glass-card-glow p-8 rounded-2xl not-prose text-center">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Autonomous QA for Every Team
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are building AI-powered testing tools that eliminate manual test maintenance, 
              reduce flaky tests to zero, and give engineering teams confidence to ship faster.
            </p>
          </div>
        </DocSection>

        <DocSection title="Our Values">
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="glass-card p-6 rounded-xl">
              <Zap className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Developer First</h3>
              <p className="text-sm text-muted-foreground">
                We build tools that developers love to use. Every feature is designed with 
                developer experience in mind.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Customer Obsessed</h3>
              <p className="text-sm text-muted-foreground">
                We succeed when our customers succeed. We listen, learn, and iterate based 
                on real feedback.
              </p>
            </div>
          </div>
        </DocSection>

        <DocSection title="Company">
          <div className="glass-card p-6 rounded-xl not-prose">
            <Globe className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Cropxon Innovations Pvt. Ltd.</h3>
            <p className="text-sm text-muted-foreground">
              QUALYX is a product of Cropxon Innovations, focused on building next-generation 
              developer tools powered by AI.
            </p>
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default About;

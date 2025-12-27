import { Helmet } from "react-helmet";
import { Target, Users, Zap, Globe, ArrowRight, Sparkles } from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureCard, 
  FeatureSection 
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QualyxLogo } from "@/components/QualyxLogo";

const About = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>About - QUALYX</title>
        <meta name="description" content="Learn about QUALYX, our mission, and the team building the future of autonomous QA." />
      </Helmet>

      <FeatureHero
        subtitle="Company"
        title="About QUALYX"
        description="We're building the future of autonomous quality assurance. Our mission is to make testing effortless so teams can focus on what matters — building great products."
        primaryCta={{ label: "Join the Waitlist", href: "/#waitlist" }}
        secondaryCta={{ label: "View Careers", href: "/company/careers" }}
      >
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
            <QualyxLogo size="large" className="relative w-40 h-40" />
          </div>
        </div>
      </FeatureHero>

      {/* Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <Target className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Our Mission</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe that teams should spend their time building great products, not maintaining fragile tests. 
            QUALYX is building AI-powered testing tools that eliminate manual test maintenance, 
            reduce flaky tests to zero, and give engineering teams confidence to ship faster.
          </p>
        </div>
      </section>

      {/* Values */}
      <FeatureSection
        title="Our Values"
        description="The principles that guide everything we do"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Zap}
            title="Developer First"
            description="We build tools that developers love to use. Every feature is designed with developer experience in mind."
          />
          <FeatureCard
            icon={Users}
            title="Customer Obsessed"
            description="We succeed when our customers succeed. We listen, learn, and iterate based on real feedback."
          />
          <FeatureCard
            icon={Sparkles}
            title="AI-Native"
            description="We embrace AI as a core technology, not an afterthought. It's woven into everything we build."
          />
          <FeatureCard
            icon={Target}
            title="Quality Obsessed"
            description="We eat our own dog food. Our platform is tested with QUALYX, ensuring the highest quality."
          />
          <FeatureCard
            icon={Globe}
            title="Remote First"
            description="We're building a distributed team that works across time zones, united by our mission."
          />
          <FeatureCard
            icon={Users}
            title="Transparent"
            description="We share our roadmap, our challenges, and our wins. Transparency builds trust."
          />
        </div>
      </FeatureSection>

      {/* Company */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl border border-border/40 bg-card/30 text-center">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Cropxon Innovations Pvt. Ltd.</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              QUALYX is a product of Cropxon Innovations, focused on building next-generation 
              developer tools powered by AI. We're backed by a passionate team of engineers 
              who've experienced the pain of test maintenance firsthand.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/company/careers">
                <Button variant="outline">
                  View Open Roles
                </Button>
              </Link>
              <Link to="/company/contact">
                <Button variant="default">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Ready to join the QA revolution?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be among the first to experience autonomous testing.
          </p>
          <Link to="/#waitlist">
            <Button variant="hero" size="lg" className="group">
              Join the Waitlist
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default About;

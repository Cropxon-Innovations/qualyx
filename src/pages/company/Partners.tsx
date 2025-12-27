import { Helmet } from "react-helmet";
import { 
  Handshake, 
  Building2, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureCard, 
  FeatureSection 
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const partners = [
  {
    tier: "Technology Partners",
    description: "Deep integrations with leading platforms",
    companies: [
      { name: "GitHub", type: "CI/CD Integration" },
      { name: "GitLab", type: "CI/CD Integration" },
      { name: "Jira", type: "Issue Tracking" },
      { name: "Slack", type: "Notifications" },
      { name: "AWS", type: "Cloud Infrastructure" },
      { name: "Azure", type: "Cloud Infrastructure" },
    ]
  },
  {
    tier: "Solution Partners",
    description: "Expert implementation and consulting",
    companies: [
      { name: "QA Consulting Group", type: "Implementation" },
      { name: "DevOps Pro", type: "CI/CD Setup" },
      { name: "TestOps Solutions", type: "Training" },
    ]
  }
];

const Partners = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Partners - QUALYX</title>
        <meta name="description" content="Join the QUALYX partner ecosystem. Technology integrations and solution partners." />
      </Helmet>

      <FeatureHero
        subtitle="Company"
        title="Partner Ecosystem"
        description="QUALYX integrates with the tools you already use. Join our partner program to extend the platform and grow your business."
        primaryCta={{ label: "Become a Partner", href: "/company/contact" }}
        secondaryCta={{ label: "View Integrations", href: "/platform/integrations" }}
      >
        <div className="grid grid-cols-3 gap-4">
          {["GitHub", "Slack", "AWS", "Jira", "GitLab", "Azure"].map((partner, i) => (
            <div 
              key={partner}
              className="p-4 rounded-xl border border-border/40 bg-card/30 text-center hover:border-primary/40 transition-colors"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-muted/50 mx-auto mb-2 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{partner}</span>
            </div>
          ))}
        </div>
      </FeatureHero>

      {/* Partner Tiers */}
      {partners.map((tier) => (
        <FeatureSection
          key={tier.tier}
          title={tier.tier}
          description={tier.description}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tier.companies.map((company) => (
              <div 
                key={company.name}
                className="p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{company.name}</h3>
                    <p className="text-xs text-muted-foreground">{company.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-success text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Partner</span>
                </div>
              </div>
            ))}
          </div>
        </FeatureSection>
      ))}

      {/* Partner Benefits */}
      <FeatureSection
        title="Partner Benefits"
        description="Why partner with QUALYX"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Handshake}
            title="Co-Marketing"
            description="Joint marketing initiatives, case studies, and event sponsorships to grow together."
          />
          <FeatureCard
            icon={Award}
            title="Partner Portal"
            description="Dedicated resources, training materials, and sales enablement tools."
          />
          <FeatureCard
            icon={Globe}
            title="Global Reach"
            description="Access to our global customer base and enterprise accounts."
          />
        </div>
      </FeatureSection>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Ready to partner with us?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our growing partner ecosystem and help teams ship quality software faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/company/contact">
              <Button variant="hero" size="lg" className="group">
                Apply to Partner Program
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/platform/integrations">
              <Button variant="outline" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Integrations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Partners;

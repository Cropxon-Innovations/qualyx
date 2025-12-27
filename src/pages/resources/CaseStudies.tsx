import { Helmet } from "react-helmet";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  ArrowRight,
  Building2,
  CheckCircle2,
  BarChart3,
  Zap
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureSection, 
  StatCard,
  Testimonial
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    company: "TechCorp SaaS",
    industry: "Enterprise Software",
    logo: "TC",
    challenge: "Maintaining 2,000+ E2E tests across multiple products with a small QA team",
    solution: "Implemented QUALYX AI-powered test generation and self-healing to automate test maintenance",
    result: "90% reduction in test maintenance time, allowing team to focus on exploratory testing",
    metrics: [
      { label: "Time Saved", value: "40hrs/week" },
      { label: "Test Coverage", value: "+35%" },
      { label: "Flaky Tests", value: "-95%" },
    ],
  },
  {
    company: "FinanceFlow",
    industry: "FinTech",
    logo: "FF",
    challenge: "Meeting strict compliance requirements while maintaining fast deployment velocity",
    solution: "Deployed hybrid execution with on-premise runners for sensitive tests and cloud for the rest",
    result: "Achieved SOC 2 compliance with 3x faster deployment cycles",
    metrics: [
      { label: "Compliance", value: "100%" },
      { label: "Deploy Speed", value: "3x faster" },
      { label: "Security Score", value: "A+" },
    ],
  },
  {
    company: "HealthBridge",
    industry: "Healthcare",
    logo: "HB",
    challenge: "HIPAA-compliant testing without exposing patient data to third-party services",
    solution: "On-premise runners with data masking and secure credential management",
    result: "Zero data exposure incidents with comprehensive test coverage",
    metrics: [
      { label: "Data Exposure", value: "Zero" },
      { label: "Test Speed", value: "2x faster" },
      { label: "Coverage", value: "98%" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Case Studies - QUALYX</title>
        <meta name="description" content="See how leading companies use QUALYX to transform their QA processes." />
      </Helmet>

      <FeatureHero
        badge="Success Stories"
        subtitle="Resources"
        title="Customer Case Studies"
        description="See how leading companies across industries are transforming their QA processes with QUALYX."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Book Demo", href: "/demo" }}
      >
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl p-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {caseStudies.map((study) => (
              <div key={study.company} className="p-3 rounded-xl border border-border/40 bg-muted/20 text-center">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-2 text-primary font-bold text-sm">
                  {study.logo}
                </div>
                <div className="text-xs text-foreground font-medium truncate">{study.company}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
              <div className="text-lg font-bold text-success">90%</div>
              <div className="text-[10px] text-muted-foreground">Less Maintenance</div>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-center">
              <div className="text-lg font-bold text-primary">3x</div>
              <div className="text-[10px] text-muted-foreground">Faster Deploys</div>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/30 text-center">
              <div className="text-lg font-bold text-warning">98%</div>
              <div className="text-[10px] text-muted-foreground">Coverage</div>
            </div>
          </div>
        </div>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="500+" label="Companies" />
          <StatCard value="10M+" label="Tests Run" />
          <StatCard value="85%" label="Time Saved" />
          <StatCard value="4.9/5" label="Satisfaction" />
        </div>
      </section>

      {/* Case Studies */}
      <FeatureSection title="Featured Case Studies" description="Real results from real teams">
        <div className="space-y-8">
          {caseStudies.map((study) => (
            <div key={study.company} className="p-8 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {study.logo}
                  </div>
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{study.industry}</span>
                    <h3 className="text-2xl font-bold text-foreground">{study.company}</h3>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 rounded-xl bg-muted/20">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Challenge
                  </h4>
                  <p className="text-foreground text-sm">{study.challenge}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Solution
                  </h4>
                  <p className="text-foreground text-sm">{study.solution}</p>
                </div>
                <div className="p-4 rounded-xl bg-success/10">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" /> Result
                  </h4>
                  <p className="text-success text-sm font-medium">{study.result}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Ready to write your success story?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">Join hundreds of companies transforming their QA.</p>
          <Link to="/#waitlist">
            <Button variant="hero" size="lg" className="group">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default CaseStudies;

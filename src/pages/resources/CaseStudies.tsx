import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { TrendingUp, Clock, Users } from "lucide-react";

const caseStudies = [
  {
    company: "TechCorp SaaS",
    industry: "Enterprise Software",
    challenge: "Maintaining 2,000+ E2E tests across multiple products",
    result: "90% reduction in test maintenance time",
    metrics: [
      { label: "Time Saved", value: "40hrs/week" },
      { label: "Test Coverage", value: "+35%" },
      { label: "Flaky Tests", value: "-95%" },
    ],
  },
  {
    company: "FinanceFlow",
    industry: "FinTech",
    challenge: "Meeting compliance requirements while maintaining test velocity",
    result: "Achieved SOC 2 compliance with hybrid execution",
    metrics: [
      { label: "Compliance", value: "100%" },
      { label: "Deploy Speed", value: "3x faster" },
      { label: "Security Score", value: "A+" },
    ],
  },
  {
    company: "HealthBridge",
    industry: "Healthcare",
    challenge: "HIPAA-compliant testing without exposing patient data",
    result: "Zero data exposure with on-premise execution",
    metrics: [
      { label: "Data Exposure", value: "Zero" },
      { label: "Test Speed", value: "2x faster" },
      { label: "Coverage", value: "98%" },
    ],
  },
];

const CaseStudies = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Case Studies - QUALYX</title>
        <meta name="description" content="See how leading companies use QUALYX to transform their QA processes." />
      </Helmet>

      <DocPage
        title="Case Studies"
        description="Real results from teams using QUALYX to transform their testing workflows."
        breadcrumbs={[
          { label: "Resources", href: "/resources/case-studies" },
          { label: "Case Studies" },
        ]}
      >
        <DocSection>
          <div className="space-y-8 not-prose">
            {caseStudies.map((study) => (
              <div key={study.company} className="glass-card-glow p-8 rounded-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">{study.industry}</span>
                    <h3 className="text-2xl font-bold text-foreground mt-1">{study.company}</h3>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Challenge</h4>
                    <p className="text-foreground">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Result</h4>
                    <p className="text-success font-medium">{study.result}</p>
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
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default CaseStudies;

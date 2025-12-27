import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Layers, Cloud, Server, Database, Shield, Zap } from "lucide-react";

const Architecture = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Architecture - QUALYX Platform</title>
        <meta name="description" content="Technical architecture overview of the QUALYX platform. Learn how our distributed system works." />
      </Helmet>

      <DocPage
        title="Architecture"
        description="A deep dive into the technical architecture that powers QUALYX autonomous testing."
        breadcrumbs={[
          { label: "Platform", href: "/platform/architecture" },
          { label: "Architecture" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX is built on a modern, distributed architecture designed for reliability, 
            scalability, and security. This page provides an overview of the key components.
          </p>
        </DocSection>

        <DocSection title="System Overview">
          <div className="glass-card-glow p-8 rounded-2xl not-prose">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <Cloud className="w-12 h-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground">Control Plane</h4>
                <p className="text-xs text-muted-foreground mt-1">API, Dashboard, Orchestration</p>
              </div>
              <div>
                <Server className="w-12 h-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground">Execution Layer</h4>
                <p className="text-xs text-muted-foreground mt-1">Cloud & On-Prem Runners</p>
              </div>
              <div>
                <Database className="w-12 h-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground">Data Layer</h4>
                <p className="text-xs text-muted-foreground mt-1">Results, Sessions, Assets</p>
              </div>
              <div>
                <Shield className="w-12 h-12 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground">Security Layer</h4>
                <p className="text-xs text-muted-foreground mt-1">Auth, Encryption, Audit</p>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection title="Key Components">
          <div className="space-y-4 not-prose">
            {[
              { title: "API Gateway", description: "RESTful API with GraphQL support. Rate limiting, authentication, and request routing." },
              { title: "Test Orchestrator", description: "Manages test execution, parallelization, and result aggregation across runners." },
              { title: "AI Engine", description: "Powers test generation, self-healing, and intelligent assertions." },
              { title: "Session Recorder", description: "Captures browser sessions with DOM snapshots, network logs, and console output." },
            ].map((component) => (
              <div key={component.title} className="p-4 rounded-xl border border-border bg-card/30">
                <h4 className="font-semibold text-foreground">{component.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{component.description}</p>
              </div>
            ))}
          </div>
        </DocSection>

        <DocCallout type="info" title="99.9% Uptime SLA">
          QUALYX cloud infrastructure is designed for high availability with multi-region redundancy.
        </DocCallout>
      </DocPage>
    </DocsLayout>
  );
};

export default Architecture;

import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout, DocCard } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Cloud, Server, Shield, Zap, Lock, Eye } from "lucide-react";

const HybridExecution = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Hybrid Execution - QUALYX Platform</title>
        <meta name="description" content="Run tests in the cloud or on your own infrastructure. Full flexibility with centralized management." />
      </Helmet>

      <DocPage
        title="Hybrid Execution"
        description="The best of both worlds — cloud convenience with on-premise security and control."
        breadcrumbs={[
          { label: "Platform", href: "/platform/hybrid-execution" },
          { label: "Hybrid Execution" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX Hybrid Execution gives you complete control over where your tests run. Use our cloud 
            infrastructure for convenience, or deploy runners on your own infrastructure for maximum 
            security and compliance.
          </p>
        </DocSection>

        <DocSection title="Execution Options">
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="glass-card-glow p-6 rounded-xl">
              <Cloud className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Cloud Execution</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Run tests on QUALYX managed infrastructure. Zero setup, automatic scaling, 
                and global distribution.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Instant provisioning</li>
                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Auto-scaling</li>
                <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Global regions</li>
              </ul>
            </div>
            
            <div className="glass-card-glow p-6 rounded-xl border-success/20">
              <Server className="w-10 h-10 text-success mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">On-Premise Execution</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Deploy runners in your own environment. Data never leaves your network, 
                full compliance control.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-success" /> Data sovereignty</li>
                <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-success" /> Network isolation</li>
                <li className="flex items-center gap-2"><Lock className="w-4 h-4 text-success" /> Compliance ready</li>
              </ul>
            </div>
          </div>
        </DocSection>

        <DocCallout type="success" title="Outbound-Only Connections">
          On-premise runners use outbound-only connections. No inbound ports need to be opened, 
          maintaining your security posture.
        </DocCallout>

        <DocSection title="Why Hybrid?">
          <div className="grid md:grid-cols-3 gap-4 not-prose">
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Security</h4>
              <p className="text-sm text-muted-foreground">Keep sensitive test data and credentials within your network</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <Eye className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Observability</h4>
              <p className="text-sm text-muted-foreground">Centralized dashboard regardless of where tests execute</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <Zap className="w-8 h-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Flexibility</h4>
              <p className="text-sm text-muted-foreground">Mix and match execution environments per test suite</p>
            </div>
          </div>
        </DocSection>

        <DocSection title="Get Started">
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <DocCard
              title="Hybrid Runner Setup"
              description="Install and configure the on-premise runner"
              icon={Server}
              href="/docs/hybrid-runner"
            />
            <DocCard
              title="Security & Compliance"
              description="Learn about our security architecture"
              icon={Shield}
              href="/platform/security"
            />
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default HybridExecution;

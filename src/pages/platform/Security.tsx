import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Shield, Lock, Key, Eye, FileCheck, Users } from "lucide-react";

const Security = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Security & Compliance - QUALYX Platform</title>
        <meta name="description" content="Enterprise-grade security with SOC 2 compliance, encryption, RBAC, and comprehensive audit logging." />
      </Helmet>

      <DocPage
        title="Security & Compliance"
        description="Enterprise-grade security designed for teams that take data protection seriously."
        breadcrumbs={[
          { label: "Platform", href: "/platform/security" },
          { label: "Security & Compliance" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX is built with security at its core. From encryption at rest and in transit to 
            comprehensive audit logging, we provide the controls enterprises need to meet their 
            compliance requirements.
          </p>
        </DocSection>

        <DocSection title="Security Features">
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="glass-card p-6 rounded-xl">
              <Lock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Encryption</h3>
              <p className="text-sm text-muted-foreground">
                AES-256 encryption at rest, TLS 1.3 in transit. Your data is protected at every layer.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Users className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">RBAC</h3>
              <p className="text-sm text-muted-foreground">
                Fine-grained role-based access control. Define who can view, edit, and execute tests.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Audit Logging</h3>
              <p className="text-sm text-muted-foreground">
                Complete audit trail of all actions. Track who did what and when for compliance.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Key className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Secret Management</h3>
              <p className="text-sm text-muted-foreground">
                Secure vault for credentials with automatic masking in logs and recordings.
              </p>
            </div>
          </div>
        </DocSection>

        <DocCallout type="info" title="SOC 2 Type II">
          QUALYX is pursuing SOC 2 Type II certification. Contact us for our current security documentation.
        </DocCallout>

        <DocSection title="Compliance">
          <div className="grid md:grid-cols-3 gap-4 not-prose">
            {["SOC 2", "GDPR", "HIPAA Ready", "ISO 27001", "CCPA", "PCI DSS"].map((cert) => (
              <div key={cert} className="p-4 rounded-xl border border-border bg-card/30 text-center">
                <FileCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default Security;

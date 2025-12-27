import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  FileCheck, 
  Users,
  ArrowRight,
  Play,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Server
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureCard, 
  FeatureSection, 
  LivePreview,
  StatCard,
  Testimonial
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Security Dashboard Demo
const SecurityDashboardDemo = () => {
  const [securityScore, setSecurityScore] = useState(98);
  const [events, setEvents] = useState([
    { type: "success", action: "Access granted", user: "john@company.com", time: "now" },
    { type: "info", action: "Secret rotated", user: "system", time: "2m" },
    { type: "success", action: "MFA verified", user: "sarah@company.com", time: "5m" },
  ]);

  const complianceItems = [
    { name: "SOC 2 Type II", status: "certified" },
    { name: "GDPR", status: "compliant" },
    { name: "HIPAA", status: "ready" },
    { name: "ISO 27001", status: "certified" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityScore((prev) => Math.min(100, Math.max(95, prev + Math.random() * 2 - 1)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Security Center</span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
          Protected
        </span>
      </div>

      {/* Security Score */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-primary/10 border border-success/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Security Score</span>
          <span className="text-xs text-success">Excellent</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-foreground">{securityScore.toFixed(0)}</span>
          <span className="text-sm text-muted-foreground mb-1">/100</span>
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-success transition-all duration-500"
            style={{ width: `${securityScore}%` }}
          />
        </div>
      </div>

      {/* Compliance Badges */}
      <div className="grid grid-cols-2 gap-2">
        {complianceItems.map((item) => (
          <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg border border-border/40 bg-card/30">
            <FileCheck className="w-4 h-4 text-success" />
            <div>
              <div className="text-xs font-medium text-foreground">{item.name}</div>
              <div className="text-[10px] text-success capitalize">{item.status}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Log */}
      <div className="p-3 rounded-lg bg-muted/20 border border-border/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Audit Log</span>
          <Eye className="w-3 h-3 text-muted-foreground" />
        </div>
        <div className="space-y-1.5">
          {events.map((event, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-3 h-3 text-success mt-0.5" />
              <span className="text-foreground">{event.action}</span>
              <span className="text-muted-foreground flex-1 truncate">{event.user}</span>
              <span className="text-muted-foreground">{event.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Security = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Security & Compliance - QUALYX Platform</title>
        <meta name="description" content="Enterprise-grade security with SOC 2 compliance, encryption, RBAC, and comprehensive audit logging." />
      </Helmet>

      <FeatureHero
        badge="Enterprise Ready"
        subtitle="Platform"
        title="Security & Compliance"
        description="Enterprise-grade security designed for teams that take data protection seriously. SOC 2 certified, GDPR compliant, HIPAA ready."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Security Docs", href: "/docs/security" }}
      >
        <LivePreview title="QUALYX Security Center — Live">
          <SecurityDashboardDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="SOC 2" label="Type II Certified" />
          <StatCard value="AES-256" label="Encryption" />
          <StatCard value="99.99%" label="Uptime SLA" />
          <StatCard value="0" label="Data Breaches" />
        </div>
      </section>

      {/* Security Features */}
      <FeatureSection
        title="Security Features"
        description="Comprehensive protection at every layer"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Lock}
            title="End-to-End Encryption"
            description="AES-256 encryption at rest, TLS 1.3 in transit. Your data is protected at every layer."
          />
          <FeatureCard
            icon={Users}
            title="Role-Based Access"
            description="Fine-grained RBAC with custom roles. Define who can view, edit, and execute tests."
          />
          <FeatureCard
            icon={Eye}
            title="Complete Audit Trail"
            description="Every action logged and searchable. Track who did what and when for compliance."
          />
          <FeatureCard
            icon={Key}
            title="Secret Management"
            description="Secure vault for credentials with automatic masking in logs and session replays."
          />
          <FeatureCard
            icon={Fingerprint}
            title="SSO & MFA"
            description="Enterprise SSO with SAML/OIDC. Multi-factor authentication for all accounts."
          />
          <FeatureCard
            icon={Server}
            title="Data Residency"
            description="Choose where your data lives. US, EU, or on-premise deployment options."
          />
        </div>
      </FeatureSection>

      {/* Compliance Certifications */}
      <FeatureSection
        title="Compliance & Certifications"
        description="Meeting the highest industry standards"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "SOC 2 Type II", status: "Certified" },
            { name: "GDPR", status: "Compliant" },
            { name: "HIPAA", status: "Ready" },
            { name: "ISO 27001", status: "Certified" },
            { name: "CCPA", status: "Compliant" },
            { name: "PCI DSS", status: "Level 1" },
          ].map((cert) => (
            <div key={cert.name} className="p-4 rounded-xl border border-border/40 bg-card/30 text-center hover:border-primary/40 transition-colors">
              <FileCheck className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">{cert.name}</div>
              <div className="text-xs text-success mt-1">{cert.status}</div>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Security Architecture */}
      <FeatureSection
        title="Security Architecture"
        description="Defense in depth at every layer"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              layer: "Network",
              items: ["WAF Protection", "DDoS Mitigation", "VPN Access"]
            },
            {
              layer: "Application",
              items: ["Input Validation", "CSRF Protection", "XSS Prevention"]
            },
            {
              layer: "Data",
              items: ["Encryption", "Tokenization", "Data Masking"]
            },
            {
              layer: "Access",
              items: ["SSO/MFA", "RBAC", "Session Management"]
            }
          ].map((section) => (
            <div key={section.layer} className="p-5 rounded-2xl border border-border/40 bg-card/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">{section.layer} Layer</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="QUALYX passed our security review with flying colors. Their SOC 2 compliance and on-premise option made it an easy choice for our regulated industry."
            author="Jennifer Walsh"
            role="CISO"
            company="SecureHealth"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Security you can trust</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enterprise-grade security for teams of all sizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#waitlist">
              <Button variant="hero" size="lg" className="group">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/company/contact">
              <Button variant="outline" size="lg">
                Request Security Review
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Security;

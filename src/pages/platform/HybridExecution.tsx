import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Cloud, 
  Server, 
  Shield, 
  Zap, 
  Lock, 
  Eye,
  ArrowRight,
  Play,
  CheckCircle2,
  Globe,
  Building2,
  Activity
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

// Hybrid Architecture Demo
const HybridArchitectureDemo = () => {
  const [activeRunner, setActiveRunner] = useState<"cloud" | "onprem">("cloud");
  const [testFlow, setTestFlow] = useState(0);

  const cloudStats = { tests: 156, runners: 8, regions: 3 };
  const onPremStats = { tests: 42, runners: 2, regions: 1 };

  useEffect(() => {
    const interval = setInterval(() => {
      setTestFlow((prev) => (prev + 1) % 5);
      setActiveRunner((prev) => prev === "cloud" ? "onprem" : "cloud");
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Hybrid Execution</span>
        </div>
        <div className="flex gap-1">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Cloud</span>
          <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">On-Prem</span>
        </div>
      </div>

      {/* Cloud vs On-Prem */}
      <div className="grid grid-cols-2 gap-3">
        {/* Cloud */}
        <div className={`p-3 rounded-xl border transition-all ${
          activeRunner === "cloud" 
            ? "border-primary/50 bg-primary/10" 
            : "border-border/40 bg-card/30"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Cloud</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tests</span>
              <span className="text-foreground font-medium">{cloudStats.tests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Runners</span>
              <span className="text-foreground font-medium">{cloudStats.runners}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Regions</span>
              <span className="text-foreground font-medium">{cloudStats.regions}</span>
            </div>
          </div>
          {activeRunner === "cloud" && (
            <div className="mt-2 flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-1 rounded bg-primary/40 animate-pulse" />
              ))}
            </div>
          )}
        </div>

        {/* On-Prem */}
        <div className={`p-3 rounded-xl border transition-all ${
          activeRunner === "onprem" 
            ? "border-success/50 bg-success/10" 
            : "border-border/40 bg-card/30"
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-foreground">On-Prem</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tests</span>
              <span className="text-foreground font-medium">{onPremStats.tests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Runners</span>
              <span className="text-foreground font-medium">{onPremStats.runners}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network</span>
              <span className="text-success font-medium">Private</span>
            </div>
          </div>
          {activeRunner === "onprem" && (
            <div className="mt-2 flex gap-1">
              {[1, 2].map((i) => (
                <div key={i} className="flex-1 h-1 rounded bg-success/40 animate-pulse" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="p-3 rounded-lg border border-border/40 bg-muted/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Secure Connection</span>
          <Lock className="w-3 h-3 text-success" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-foreground">Outbound-only • TLS 1.3 • Zero Trust</span>
        </div>
      </div>

      {/* Data Flow */}
      <div className="flex items-center justify-center gap-2 py-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              testFlow >= i ? "bg-primary scale-110" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <Shield className="w-4 h-4 text-success mx-auto mb-1" />
          <div className="text-[10px] text-muted-foreground">Data Safe</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <Globe className="w-4 h-4 text-primary mx-auto mb-1" />
          <div className="text-[10px] text-muted-foreground">Global</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <Zap className="w-4 h-4 text-warning mx-auto mb-1" />
          <div className="text-[10px] text-muted-foreground">Flexible</div>
        </div>
      </div>
    </div>
  );
};

const HybridExecution = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Hybrid Execution - QUALYX Platform</title>
        <meta name="description" content="Run tests in the cloud or on your own infrastructure. Full flexibility with centralized management." />
      </Helmet>

      <FeatureHero
        badge="Best of Both Worlds"
        subtitle="Platform"
        title="Hybrid Execution"
        description="Complete control over where your tests run. Use our cloud infrastructure for convenience, or deploy runners on your own infrastructure for maximum security."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Hybrid Docs", href: "/docs/hybrid-runner" }}
      >
        <LivePreview title="QUALYX Hybrid — Live">
          <HybridArchitectureDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="5 min" label="Runner Setup" />
          <StatCard value="Outbound" label="Only Connections" />
          <StatCard value="Zero" label="Inbound Ports" />
          <StatCard value="100%" label="Data Control" />
        </div>
      </section>

      {/* Execution Options */}
      <FeatureSection
        title="Execution Options"
        description="Choose the right execution model for each test suite"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cloud */}
          <div className="p-8 rounded-2xl border border-primary/30 bg-primary/5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
              <Cloud className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Cloud Execution</h3>
            <p className="text-muted-foreground mb-6">
              Run tests on QUALYX managed infrastructure. Zero setup, automatic scaling, and global distribution.
            </p>
            <ul className="space-y-3">
              {["Instant provisioning", "Auto-scaling to demand", "5 global regions", "No infrastructure to manage"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <Zap className="w-4 h-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* On-Premise */}
          <div className="p-8 rounded-2xl border border-success/30 bg-success/5">
            <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center mb-6">
              <Server className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">On-Premise Execution</h3>
            <p className="text-muted-foreground mb-6">
              Deploy runners in your own environment. Data never leaves your network with full compliance control.
            </p>
            <ul className="space-y-3">
              {["Complete data sovereignty", "Network isolation", "Compliance ready", "Access internal apps"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <Lock className="w-4 h-4 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </FeatureSection>

      {/* Why Hybrid */}
      <FeatureSection
        title="Why Hybrid?"
        description="The flexibility enterprises need"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Shield}
            title="Data Security"
            description="Keep sensitive test data and credentials within your network while using cloud for everything else."
          />
          <FeatureCard
            icon={Eye}
            title="Unified Observability"
            description="Single dashboard for all test results regardless of where tests execute."
          />
          <FeatureCard
            icon={Zap}
            title="Maximum Flexibility"
            description="Mix and match execution environments per test suite, project, or even individual tests."
          />
          <FeatureCard
            icon={Building2}
            title="Internal Apps"
            description="Test internal applications behind firewalls without exposing them to the internet."
          />
          <FeatureCard
            icon={Globe}
            title="Geo Distribution"
            description="Run tests from multiple geographic locations for accurate performance testing."
          />
          <FeatureCard
            icon={Lock}
            title="Compliance Ready"
            description="Meet regulatory requirements with on-premise execution for sensitive workloads."
          />
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="Simple setup, powerful execution"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Install Runner", description: "Docker container or binary, 5-minute setup" },
            { step: "02", title: "Register", description: "Runner connects outbound to QUALYX control plane" },
            { step: "03", title: "Configure", description: "Assign test suites to cloud or on-prem runners" },
            { step: "04", title: "Execute", description: "Tests run automatically with unified reporting" }
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 mb-4">
                <span className="text-xl font-bold text-primary">{item.step}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="Hybrid execution was a game-changer. We test our customer-facing apps in the cloud but run HIPAA-regulated tests on-premise. Same dashboard, same experience."
            author="Lisa Chen"
            role="Head of QA"
            company="MedTech Solutions"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Your infrastructure. Your control.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Run tests where it makes sense. One platform, unlimited flexibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#waitlist">
              <Button variant="hero" size="lg" className="group">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/docs/hybrid-runner">
              <Button variant="outline" size="lg">
                Setup Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default HybridExecution;

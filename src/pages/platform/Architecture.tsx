import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Layers, 
  Cloud, 
  Server, 
  Database, 
  Shield, 
  Zap,
  ArrowRight,
  Play,
  CheckCircle2,
  Cpu,
  Globe,
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

// Architecture Visualization Demo
const ArchitectureDemo = () => {
  const [activeLayer, setActiveLayer] = useState(0);
  const [dataFlow, setDataFlow] = useState(false);

  const layers = [
    { name: "Control Plane", icon: Cloud, color: "primary", items: ["API Gateway", "Dashboard", "Orchestrator"] },
    { name: "Execution Layer", icon: Server, color: "success", items: ["Cloud Runners", "On-Prem Runners", "Browser Pool"] },
    { name: "Data Layer", icon: Database, color: "warning", items: ["Results DB", "Session Store", "Asset CDN"] },
    { name: "Security Layer", icon: Shield, color: "destructive", items: ["Auth", "Encryption", "Audit Logs"] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 4);
      setDataFlow(true);
      setTimeout(() => setDataFlow(false), 500);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">System Architecture</span>
        </div>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Activity className="w-3 h-3 text-success animate-pulse" />
          Live
        </span>
      </div>

      {/* Architecture Layers */}
      <div className="space-y-2">
        {layers.map((layer, index) => (
          <div
            key={layer.name}
            className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
              activeLayer === index
                ? `border-${layer.color}/50 bg-${layer.color}/10`
                : "border-border/40 bg-card/30 hover:border-border"
            }`}
            onClick={() => setActiveLayer(index)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activeLayer === index ? `bg-${layer.color}/20` : "bg-muted/30"
              }`}>
                <layer.icon className={`w-4 h-4 ${activeLayer === index ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{layer.name}</div>
                <div className="flex gap-2 mt-1">
                  {layer.items.map((item) => (
                    <span key={item} className="text-[10px] px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {activeLayer === index && (
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Data Flow Indicator */}
      <div className={`p-3 rounded-lg border border-border/40 transition-all ${dataFlow ? "bg-primary/10" : "bg-muted/20"}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Data Flow</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  dataFlow ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">5</div>
          <div className="text-[10px] text-muted-foreground">Regions</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">99.9%</div>
          <div className="text-[10px] text-muted-foreground">Uptime</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">&lt;50ms</div>
          <div className="text-[10px] text-muted-foreground">Latency</div>
        </div>
      </div>
    </div>
  );
};

const Architecture = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Architecture - QUALYX Platform</title>
        <meta name="description" content="Technical architecture overview of the QUALYX platform. Learn how our distributed system works." />
      </Helmet>

      <FeatureHero
        badge="Enterprise Scale"
        subtitle="Platform"
        title="Platform Architecture"
        description="A modern, distributed architecture designed for reliability, scalability, and security. Built to handle millions of tests."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Technical Docs", href: "/docs/architecture" }}
      >
        <LivePreview title="QUALYX Architecture — Interactive">
          <ArchitectureDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="5 Regions" label="Global Coverage" />
          <StatCard value="99.99%" label="Uptime SLA" />
          <StatCard value="<50ms" label="API Latency" />
          <StatCard value="10M+" label="Tests/Day Capacity" />
        </div>
      </section>

      {/* System Layers */}
      <FeatureSection
        title="System Overview"
        description="Four layers working in harmony"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-border/40 bg-card/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Control Plane</h3>
            <p className="text-sm text-muted-foreground">API, Dashboard, Orchestration</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/40 bg-card/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-4">
              <Server className="w-7 h-7 text-success" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Execution Layer</h3>
            <p className="text-sm text-muted-foreground">Cloud & On-Prem Runners</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/40 bg-card/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-warning/10 border border-warning/30 flex items-center justify-center mx-auto mb-4">
              <Database className="w-7 h-7 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Data Layer</h3>
            <p className="text-sm text-muted-foreground">Results, Sessions, Assets</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/40 bg-card/30 text-center">
            <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Security Layer</h3>
            <p className="text-sm text-muted-foreground">Auth, Encryption, Audit</p>
          </div>
        </div>
      </FeatureSection>

      {/* Key Components */}
      <FeatureSection
        title="Key Components"
        description="The building blocks of QUALYX"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Zap}
            title="API Gateway"
            description="RESTful API with GraphQL support. Rate limiting, authentication, and intelligent request routing."
          />
          <FeatureCard
            icon={Cpu}
            title="Test Orchestrator"
            description="Manages test execution, parallelization, and result aggregation across all runners."
          />
          <FeatureCard
            icon={Layers}
            title="AI Engine"
            description="Powers test generation, self-healing selectors, and intelligent assertions."
          />
          <FeatureCard
            icon={Activity}
            title="Session Recorder"
            description="Captures browser sessions with DOM snapshots, network logs, and console output."
          />
          <FeatureCard
            icon={Globe}
            title="Global CDN"
            description="Assets and test artifacts served from edge locations worldwide for low latency."
          />
          <FeatureCard
            icon={Database}
            title="Distributed Storage"
            description="Horizontally scalable storage for results, sessions, and test data."
          />
        </div>
      </FeatureSection>

      {/* Reliability Features */}
      <FeatureSection
        title="Built for Reliability"
        description="Enterprise-grade infrastructure"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "High Availability",
              items: ["Multi-region deployment", "Automatic failover", "Zero-downtime updates", "Health monitoring"]
            },
            {
              title: "Scalability",
              items: ["Horizontal auto-scaling", "Load balancing", "Queue-based processing", "Elastic compute"]
            },
            {
              title: "Disaster Recovery",
              items: ["Continuous backups", "Point-in-time recovery", "Cross-region replication", "RTO < 15 min"]
            }
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-2xl border border-border/40 bg-card/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
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
            quote="The architecture is rock solid. We've been running 50,000+ tests daily for 6 months with zero platform issues. That's unheard of."
            author="Robert Kim"
            role="VP Engineering"
            company="CloudScale"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Built for scale. Designed for reliability.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Infrastructure that grows with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#waitlist">
              <Button variant="hero" size="lg" className="group">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Architecture;

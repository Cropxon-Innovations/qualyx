import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  MonitorPlay, 
  MousePointer, 
  Eye, 
  Zap, 
  Shield, 
  History, 
  Code2, 
  CheckCircle2, 
  Loader2,
  ArrowRight,
  Play
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

// Live demo component
const UITestDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 40 });
  
  const steps = [
    { name: "Navigate to login", status: "done", duration: "0.4s" },
    { name: "Enter credentials", status: "done", duration: "1.2s" },
    { name: "Click submit", status: "running", duration: "—" },
    { name: "Verify dashboard", status: "pending", duration: "—" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((p) => (p + 1) % steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const positions = [
      { x: 50, y: 40 },
      { x: 45, y: 55 },
      { x: 55, y: 65 },
      { x: 50, y: 50 },
    ];
    setCursorPos(positions[activeStep]);
  }, [activeStep]);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Steps */}
      <div className="p-4 rounded-xl bg-muted/20 border border-border/40">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Test Steps</span>
        </div>
        <div className="space-y-2">
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;
            const isDone = idx < activeStep;
            return (
              <div
                key={step.name}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-primary/10 border border-primary/40" : "border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border/50" />
                  )}
                  <span className={`text-sm ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {step.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground/60 font-mono">
                  {isDone ? step.duration : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview */}
      <div className="relative h-[200px] rounded-xl bg-background/80 border border-border/50 overflow-hidden">
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Browser chrome */}
        <div className="absolute top-0 inset-x-0 h-6 bg-muted/50 border-b border-border/50 flex items-center px-2 gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="flex-1 mx-2 h-3.5 rounded bg-background/80 flex items-center px-2">
            <span className="text-[9px] text-muted-foreground/60 font-mono">app.example.com/login</span>
          </div>
        </div>
        
        {/* Mock form */}
        <div className="absolute top-6 inset-x-0 bottom-0 p-4 flex items-center justify-center">
          <div className="w-32 space-y-2">
            <div className="h-2 w-16 bg-muted/60 rounded mx-auto" />
            <div className="h-6 bg-muted/40 rounded border border-border/40" />
            <div className="h-6 bg-muted/40 rounded border border-border/40" />
            <div className="h-6 bg-primary/20 rounded border border-primary/40 flex items-center justify-center">
              <span className="text-[9px] text-primary font-medium">Sign In</span>
            </div>
          </div>
        </div>
        
        {/* Cursor */}
        <div 
          className="absolute w-4 h-4 transition-all duration-700 ease-out pointer-events-none"
          style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <MousePointer className="w-4 h-4 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
        </div>
      </div>
    </div>
  );
};

const UIAutomation = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>UI Automation - QUALYX</title>
        <meta name="description" content="Autonomous UI testing with AI-powered recording, self-healing selectors, and visual validation." />
      </Helmet>

      <FeatureHero
        badge="Most Popular"
        subtitle="Product"
        title="UI Automation"
        description="Record, generate, and execute UI tests with AI-powered automation that adapts to your application. Self-healing selectors ensure your tests never break."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX Test Runner — Live Execution">
          <UITestDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="90%" label="Less Maintenance" trend="+12% this month" />
          <StatCard value="10x" label="Faster Test Creation" />
          <StatCard value="99.9%" label="Selector Stability" />
          <StatCard value="<2min" label="Avg. Setup Time" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="Key Features"
        description="Everything you need for reliable UI test automation"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={MonitorPlay}
            title="Smart Recording"
            description="Capture user interactions with intelligent event detection. QUALYX understands user intent, not just clicks."
          />
          <FeatureCard
            icon={MousePointer}
            title="Self-Healing Selectors"
            description="When UI elements change, QUALYX automatically finds new selectors using AI-powered element matching."
          />
          <FeatureCard
            icon={Eye}
            title="Visual Validation"
            description="Beyond functional testing, validate visual appearance with pixel-perfect screenshot comparison."
          />
          <FeatureCard
            icon={History}
            title="Session Replay"
            description="Debug failures with full session recordings. Replay every interaction exactly as it happened."
          />
          <FeatureCard
            icon={Code2}
            title="Export to Playwright"
            description="Own your tests. Export clean, maintainable Playwright or Selenium scripts anytime."
          />
          <FeatureCard
            icon={Shield}
            title="Enterprise Security"
            description="SOC 2 compliant with hybrid execution options. Keep sensitive data on your infrastructure."
          />
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="Get started in three simple steps"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Record",
              description: "Use our browser extension to record your user flows. Every click, scroll, and input is captured intelligently."
            },
            {
              step: "02",
              title: "Generate",
              description: "QUALYX AI analyzes your recording and generates robust, maintainable test scripts automatically."
            },
            {
              step: "03",
              title: "Run & Monitor",
              description: "Execute tests in cloud or on-prem. Get real-time results, session replays, and actionable insights."
            }
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6">
                <span className="text-2xl font-bold text-primary">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Supported Browsers */}
      <FeatureSection title="Cross-Browser Support">
        <div className="flex flex-wrap justify-center gap-4">
          {["Chrome", "Firefox", "Safari", "Edge", "Mobile Chrome", "Mobile Safari"].map((browser) => (
            <div
              key={browser}
              className="px-6 py-3 rounded-xl bg-card/40 border border-border/40 text-foreground font-medium hover:border-primary/40 transition-colors"
            >
              {browser}
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="QUALYX cut our test maintenance time by 90%. The self-healing selectors are a game-changer—we haven't had a single flaky test in months."
            author="Sarah Chen"
            role="Engineering Lead"
            company="TechCorp"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Ready to automate your UI tests?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of teams using QUALYX to ship faster with confidence.
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

export default UIAutomation;

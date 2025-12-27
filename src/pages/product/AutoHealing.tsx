import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Wand2, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles,
  Shield,
  Target,
  Layers,
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

// Auto-Healing Demo Component
const AutoHealingDemo = () => {
  const [phase, setPhase] = useState<"broken" | "healing" | "healed">("broken");
  
  useEffect(() => {
    const cycle = () => {
      setPhase("broken");
      setTimeout(() => setPhase("healing"), 2000);
      setTimeout(() => setPhase("healed"), 4000);
    };
    
    cycle();
    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, []);

  const strategies = [
    { label: "Attribute matching", status: phase === "healing" ? "checking" : phase === "healed" ? "done" : "pending" },
    { label: "Text content analysis", status: phase === "healing" ? "checking" : phase === "healed" ? "done" : "pending" },
    { label: "Visual position", status: phase === "healed" ? "done" : "pending" },
    { label: "DOM structure", status: phase === "healed" ? "done" : "pending" },
  ];

  return (
    <div className="space-y-4">
      {/* Status indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Self-Healing Status</span>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          phase === "broken" ? "bg-destructive/20 text-destructive" :
          phase === "healing" ? "bg-yellow-500/20 text-yellow-500" :
          "bg-success/20 text-success"
        }`}>
          {phase === "broken" ? "Selector Broken" :
           phase === "healing" ? "AI Analyzing..." :
           "Healed ✓"}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Original Selector */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original Selector</h4>
          <div className={`p-3 rounded-lg border font-mono text-sm transition-all ${
            phase === "broken" ? "border-destructive/50 bg-destructive/5" : "border-border bg-muted/30"
          }`}>
            <span className="text-muted-foreground">#submit-button-v1</span>
          </div>
          {phase === "broken" && (
            <div className="flex items-center gap-2 text-destructive text-xs animate-fade-in">
              <AlertTriangle className="w-3 h-3" />
              <span>Element not found in DOM</span>
            </div>
          )}
        </div>

        {/* Healed Selector */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Healed Selector</h4>
          <div className={`p-3 rounded-lg border font-mono text-sm transition-all ${
            phase === "healed" ? "border-success/50 bg-success/5" : 
            phase === "healing" ? "border-yellow-500/50 bg-yellow-500/5" :
            "border-border bg-muted/30"
          }`}>
            {phase === "healing" ? (
              <span className="text-yellow-500 flex items-center gap-2">
                <RefreshCw className="w-3 h-3 animate-spin" />
                Searching...
              </span>
            ) : phase === "healed" ? (
              <span className="text-success">button[data-testid="submit"]</span>
            ) : (
              <span className="text-muted-foreground/50">—</span>
            )}
          </div>
          {phase === "healed" && (
            <div className="flex items-center gap-2 text-success text-xs animate-fade-in">
              <CheckCircle2 className="w-3 h-3" />
              <span>98% confidence match</span>
            </div>
          )}
        </div>
      </div>

      {/* Strategies */}
      <div className="p-3 rounded-lg bg-muted/20 border border-border/40">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">AI Analysis</h4>
        <div className="grid grid-cols-2 gap-2">
          {strategies.map((strategy) => (
            <div key={strategy.label} className="flex items-center gap-2">
              {strategy.status === "checking" ? (
                <RefreshCw className="w-3 h-3 text-yellow-500 animate-spin" />
              ) : strategy.status === "done" ? (
                <CheckCircle2 className="w-3 h-3 text-success" />
              ) : (
                <div className="w-3 h-3 rounded-full border border-border/50" />
              )}
              <span className="text-xs text-muted-foreground">{strategy.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AutoHealing = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Auto-Healing - QUALYX</title>
        <meta name="description" content="Self-healing selectors that automatically adapt to UI changes. Reduce test maintenance by 90%." />
      </Helmet>

      <FeatureHero
        badge="Zero Maintenance"
        subtitle="Product"
        title="Auto-Healing"
        description="AI-powered self-healing selectors that automatically adapt when your UI changes, eliminating test maintenance overhead."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX Auto-Healing — Live">
          <AutoHealingDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="90%" label="Less Maintenance" trend="Verified" />
          <StatCard value="98%" label="Healing Accuracy" />
          <StatCard value="<100ms" label="Healing Time" />
          <StatCard value="0" label="Flaky Tests" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="Healing Strategies"
        description="Multiple AI-powered approaches to find the right element"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Target}
            title="Attribute Matching"
            description="Match by ID, data-testid, name, or other stable attributes. Prioritizes attributes that are less likely to change."
          />
          <FeatureCard
            icon={Layers}
            title="Text Content"
            description="Match by visible text content or aria-label. Great for buttons and links with stable text."
          />
          <FeatureCard
            icon={Wand2}
            title="Visual Position"
            description="Use relative position on the page when other strategies fail. Understands layout changes."
          />
          <FeatureCard
            icon={Shield}
            title="DOM Structure"
            description="Analyze parent and sibling relationships to locate elements in changed DOM trees."
          />
          <FeatureCard
            icon={Sparkles}
            title="AI Vision"
            description="Visual recognition of element appearance when all other methods fail. Last resort but powerful."
          />
          <FeatureCard
            icon={RefreshCw}
            title="Confidence Scoring"
            description="Each strategy contributes to a confidence score. Only high-confidence matches are applied."
          />
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="Intelligent healing in real-time"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Fingerprint",
              description: "Creates multi-attribute fingerprint of each element"
            },
            {
              step: "02",
              title: "Detect",
              description: "Identifies when a selector fails to find its element"
            },
            {
              step: "03",
              title: "Analyze",
              description: "AI searches DOM for matching candidates"
            },
            {
              step: "04",
              title: "Heal",
              description: "Updates selector and continues test execution"
            }
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
            quote="We went from spending 20 hours a week fixing broken selectors to almost zero. Auto-healing is like having an extra engineer on the team."
            author="David Kim"
            role="Test Automation Lead"
            company="ShopBase"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Say goodbye to flaky tests</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let AI handle the maintenance while you focus on coverage.
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

export default AutoHealing;

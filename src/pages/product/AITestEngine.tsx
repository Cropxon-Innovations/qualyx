import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Brain, 
  Sparkles, 
  Target, 
  FileCode, 
  Zap,
  Lightbulb,
  ArrowRight,
  Play,
  CheckCircle2
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

// AI Test Generation Demo
const AIGenerationDemo = () => {
  const [phase, setPhase] = useState(0);
  const phases = [
    { label: "Analyzing application...", progress: 20 },
    { label: "Identifying user flows...", progress: 40 },
    { label: "Generating test cases...", progress: 60 },
    { label: "Optimizing coverage...", progress: 80 },
    { label: "Complete!", progress: 100 },
  ];

  const generatedTests = [
    { name: "User registration flow", priority: "High" },
    { name: "Login with valid credentials", priority: "High" },
    { name: "Login with invalid password", priority: "Medium" },
    { name: "Password reset request", priority: "Medium" },
    { name: "Profile update", priority: "Low" },
    { name: "Session timeout handling", priority: "Low" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % (phases.length + 2));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">
            {phase < phases.length ? phases[phase].label : "Generation complete"}
          </span>
          <span className="text-sm text-primary font-mono">
            {phase < phases.length ? phases[phase].progress : 100}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: `${phase < phases.length ? phases[phase].progress : 100}%` }}
          />
        </div>
      </div>

      {/* Generated Tests */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {generatedTests.map((test, index) => {
          const isVisible = phase > 2 && index <= (phase - 2);
          return (
            <div 
              key={test.name}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-300 ${
                isVisible 
                  ? "border-success/30 bg-success/5 opacity-100" 
                  : "border-border bg-muted/30 opacity-40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isVisible ? "bg-success text-success-foreground" : "bg-muted"
                }`}>
                  {isVisible && <CheckCircle2 className="w-3 h-3" />}
                </div>
                <span className={`text-sm ${isVisible ? "text-foreground" : "text-muted-foreground"}`}>
                  {test.name}
                </span>
              </div>
              {isVisible && (
                <span className={`text-xs px-2 py-0.5 rounded ${
                  test.priority === "High" ? "bg-destructive/20 text-destructive" :
                  test.priority === "Medium" ? "bg-yellow-500/20 text-yellow-500" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {test.priority}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {phase >= phases.length && (
        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <span className="text-sm font-semibold text-foreground">6 tests generated</span>
              <span className="text-sm text-muted-foreground ml-2">• 94% flow coverage</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AITestEngine = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>AI Test Engine - QUALYX</title>
        <meta name="description" content="AI-powered test generation that creates comprehensive test suites by analyzing your application." />
      </Helmet>

      <FeatureHero
        badge="AI Powered"
        subtitle="Product"
        title="AI Test Engine"
        description="Harness the power of AI to automatically generate, optimize, and maintain comprehensive test suites. Write tests in minutes, not days."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX AI Engine — Generating Tests">
          <AIGenerationDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="10x" label="Faster Test Creation" />
          <StatCard value="94%" label="Flow Coverage" trend="Average" />
          <StatCard value="<2min" label="Generation Time" />
          <StatCard value="∞" label="Test Variations" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="AI Capabilities"
        description="Intelligent testing that learns and adapts"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Target}
            title="Smart Test Generation"
            description="AI analyzes your application structure, identifies user flows, and generates tests covering critical paths and edge cases."
          />
          <FeatureCard
            icon={Brain}
            title="Intelligent Assertions"
            description="Automatically determines what to assert based on element types, content, and expected behavior patterns."
          />
          <FeatureCard
            icon={FileCode}
            title="Code Understanding"
            description="Analyzes your source code to understand component relationships and generate more meaningful tests."
          />
          <FeatureCard
            icon={Lightbulb}
            title="Edge Case Discovery"
            description="AI identifies potential edge cases and boundary conditions you might have missed."
          />
          <FeatureCard
            icon={Sparkles}
            title="Continuous Learning"
            description="The AI learns from your feedback and test results to improve future test generation quality."
          />
          <FeatureCard
            icon={Zap}
            title="Priority Ranking"
            description="Tests are ranked by importance and risk, helping you focus on what matters most."
          />
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="From analysis to test suite in minutes"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Analyze",
              description: "Point QUALYX at your app. AI scans pages, understands flows, and maps user journeys."
            },
            {
              step: "02",
              title: "Generate",
              description: "AI creates comprehensive tests for each flow, including assertions and data variations."
            },
            {
              step: "03",
              title: "Review & Run",
              description: "Review AI suggestions, customize as needed, and add to your test suite with one click."
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

      {/* Human in the loop */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-2xl border border-primary/20 bg-primary/5 text-center">
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">Human-in-the-Loop</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              AI-generated tests are suggestions that you can review, modify, and approve before adding 
              to your test suite. You stay in control — the AI is your assistant, not your replacement.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="The AI generated 50+ test cases in minutes that would have taken our team weeks. And the quality is impressive — it found edge cases we hadn't considered."
            author="Lisa Chen"
            role="VP Engineering"
            company="CloudScale"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Let AI write your tests</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Focus on building features. Let QUALYX handle test coverage.
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

export default AITestEngine;

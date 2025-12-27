import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Cpu, Sparkles, Brain, Zap, Target, FileCode } from "lucide-react";
import { useState, useEffect } from "react";

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
    "User registration flow",
    "Login with valid credentials", 
    "Login with invalid password",
    "Password reset request",
    "Profile update",
    "Session timeout handling",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % (phases.length + 2));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card-glow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <Brain className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">AI Test Generator</span>
        </div>
      </div>

      <div className="p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
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
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground mb-3">Generated Test Cases</h4>
          {generatedTests.map((test, index) => {
            const isVisible = phase > 2 && index <= (phase - 3) * 2;
            return (
              <div 
                key={test}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                  isVisible 
                    ? "border-success/30 bg-success/5 opacity-100 translate-x-0" 
                    : "border-border bg-muted/30 opacity-30"
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isVisible ? "bg-success text-success-foreground" : "bg-muted"
                }`}>
                  {isVisible && <Sparkles className="w-3 h-3" />}
                </div>
                <span className={`text-sm ${isVisible ? "text-foreground" : "text-muted-foreground"}`}>
                  {test}
                </span>
                {isVisible && (
                  <span className="ml-auto text-xs text-success">AI Generated</span>
                )}
              </div>
            );
          })}
        </div>

        {phase >= phases.length && (
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-semibold text-foreground">6 tests generated</span>
                <span className="text-sm text-muted-foreground ml-2">covering 94% of user flows</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AITestEngine = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>AI Test Engine - QUALYX</title>
        <meta name="description" content="AI-powered test generation that creates comprehensive test suites by analyzing your application." />
      </Helmet>

      <DocPage
        title="AI Test Engine"
        description="Harness the power of AI to automatically generate, optimize, and maintain comprehensive test suites."
        breadcrumbs={[
          { label: "Product", href: "/product/ai-test-engine" },
          { label: "AI Test Engine" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The QUALYX AI Test Engine analyzes your application to automatically generate test cases, 
            identify edge cases, and optimize test coverage — all without manual test writing.
          </p>
        </DocSection>

        <DocSection title="Live Demo: AI Test Generation">
          <p className="text-muted-foreground mb-6">
            Watch as AI analyzes your application and generates a comprehensive test suite automatically.
          </p>
          <AIGenerationDemo />
        </DocSection>

        <DocSection title="AI Capabilities">
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="glass-card p-6 rounded-xl">
              <Target className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Test Generation</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes your application structure, identifies user flows, and generates tests 
                that cover critical paths and edge cases.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Brain className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Intelligent Assertions</h3>
              <p className="text-sm text-muted-foreground">
                Automatically determines what to assert based on element types, content, and 
                expected behavior patterns.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <FileCode className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Code Understanding</h3>
              <p className="text-sm text-muted-foreground">
                Analyzes your source code to understand component relationships and generate 
                more meaningful tests.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Sparkles className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Continuous Learning</h3>
              <p className="text-sm text-muted-foreground">
                The AI learns from your feedback and test results to improve future test 
                generation quality.
              </p>
            </div>
          </div>
        </DocSection>

        <DocCallout type="info" title="Human-in-the-Loop">
          AI-generated tests are suggestions that you can review, modify, and approve before adding 
          to your test suite. You stay in control.
        </DocCallout>
      </DocPage>
    </DocsLayout>
  );
};

export default AITestEngine;

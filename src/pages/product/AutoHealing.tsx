import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Wand2, AlertTriangle, CheckCircle2, RefreshCw, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

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

  return (
    <div className="glass-card-glow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <Wand2 className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Self-Healing in Action</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          phase === "broken" ? "bg-destructive/20 text-destructive" :
          phase === "healing" ? "bg-yellow-500/20 text-yellow-500" :
          "bg-success/20 text-success"
        }`}>
          {phase === "broken" ? "Selector Broken" :
           phase === "healing" ? "AI Analyzing..." :
           "Healed ✓"}
        </span>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Original Selector */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Original Selector</h4>
            <div className={`p-4 rounded-lg border font-mono text-sm transition-all ${
              phase === "broken" ? "border-destructive/50 bg-destructive/5" : "border-border bg-muted/30"
            }`}>
              <span className="text-muted-foreground">#submit-button-v1</span>
            </div>
            {phase === "broken" && (
              <div className="flex items-center gap-2 text-destructive text-sm animate-fade-in">
                <AlertTriangle className="w-4 h-4" />
                <span>Element not found in DOM</span>
              </div>
            )}
          </div>

          {/* Healed Selector */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Healed Selector</h4>
            <div className={`p-4 rounded-lg border font-mono text-sm transition-all ${
              phase === "healed" ? "border-success/50 bg-success/5" : 
              phase === "healing" ? "border-yellow-500/50 bg-yellow-500/5" :
              "border-border bg-muted/30"
            }`}>
              {phase === "healing" ? (
                <span className="text-yellow-500 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Searching for match...
                </span>
              ) : phase === "healed" ? (
                <span className="text-success">button[data-testid=&quot;submit&quot;]</span>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </div>
            {phase === "healed" && (
              <div className="flex items-center gap-2 text-success text-sm animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>98% confidence match</span>
              </div>
            )}
          </div>
        </div>

        {/* Healing Strategy */}
        {phase === "healing" && (
          <div className="mt-6 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 animate-fade-in">
            <h4 className="text-sm font-semibold text-foreground mb-3">AI Analysis</h4>
            <div className="space-y-2">
              {[
                { label: "Attribute matching", status: "checking" },
                { label: "Text content analysis", status: "checking" },
                { label: "Visual position", status: "pending" },
                { label: "DOM structure", status: "pending" },
              ].map((strategy, i) => (
                <div key={strategy.label} className="flex items-center gap-3">
                  {strategy.status === "checking" ? (
                    <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border" />
                  )}
                  <span className="text-sm text-muted-foreground">{strategy.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === "healed" && (
          <div className="mt-6 p-4 rounded-lg bg-success/5 border border-success/20 animate-fade-in">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">Healing Applied</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Found matching element using data-testid attribute. Test will continue with updated selector.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AutoHealing = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Auto-Healing - QUALYX</title>
        <meta name="description" content="Self-healing selectors that automatically adapt to UI changes. Reduce test maintenance by 90%." />
      </Helmet>

      <DocPage
        title="Auto-Healing"
        description="AI-powered self-healing selectors that automatically adapt when your UI changes, eliminating test maintenance overhead."
        breadcrumbs={[
          { label: "Product", href: "/product/auto-healing" },
          { label: "Auto-Healing" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When your application&apos;s UI changes, traditional tests break. QUALYX Auto-Healing uses 
            AI to automatically find and update selectors, keeping your tests running without manual intervention.
          </p>
        </DocSection>

        <DocSection title="Live Demo: Self-Healing in Action">
          <p className="text-muted-foreground mb-6">
            Watch how QUALYX automatically heals broken selectors in real-time using AI-powered element matching.
          </p>
          <AutoHealingDemo />
        </DocSection>

        <DocSection title="How It Works">
          <div className="space-y-4 not-prose">
            {[
              {
                step: 1,
                title: "Element Fingerprinting",
                description: "QUALYX creates a multi-attribute fingerprint of each element including ID, classes, text, position, and surrounding context.",
              },
              {
                step: 2,
                title: "Change Detection",
                description: "When a selector fails, the AI analyzes the DOM to find elements matching the original fingerprint.",
              },
              {
                step: 3,
                title: "Confidence Scoring",
                description: "Multiple matching strategies are combined to produce a confidence score for each candidate element.",
              },
              {
                step: 4,
                title: "Automatic Update",
                description: "If confidence exceeds the threshold, the selector is automatically updated and the test continues.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 p-4 rounded-xl border border-border bg-card/30">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-primary">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </DocSection>

        <DocCallout type="success" title="90% Reduction in Maintenance">
          Teams using Auto-Healing spend 90% less time fixing broken selectors, freeing them to focus on new test coverage.
        </DocCallout>

        <DocSection title="Healing Strategies">
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Strategy</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Weight</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Attribute Match</td>
                  <td className="py-3 px-4">Match by ID, data-testid, name, or other attributes</td>
                  <td className="py-3 px-4">High</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Text Content</td>
                  <td className="py-3 px-4">Match by visible text or aria-label</td>
                  <td className="py-3 px-4">High</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Visual Position</td>
                  <td className="py-3 px-4">Match by relative position on the page</td>
                  <td className="py-3 px-4">Medium</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">DOM Structure</td>
                  <td className="py-3 px-4">Match by parent/sibling relationships</td>
                  <td className="py-3 px-4">Medium</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">AI Vision</td>
                  <td className="py-3 px-4">Visual recognition of element appearance</td>
                  <td className="py-3 px-4">Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default AutoHealing;

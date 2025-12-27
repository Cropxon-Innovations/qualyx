import { Helmet } from "react-helmet";
import { CheckCircle2, Circle, Clock, ArrowRight, Sparkles, Target } from "lucide-react";
import { FeaturePageLayout, FeatureHero, FeatureSection, StatCard } from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const roadmapItems = [
  { quarter: "Q4 2024", status: "completed", items: [{ title: "UI Recorder & Player", status: "completed" }, { title: "API Automation Studio", status: "completed" }, { title: "Session Replay", status: "completed" }, { title: "Self-Healing Selectors", status: "completed" }] },
  { quarter: "Q1 2025", status: "in-progress", items: [{ title: "AI Test Generation", status: "in-progress" }, { title: "Hybrid Runner GA", status: "in-progress" }, { title: "GitHub Integration", status: "completed" }, { title: "Playwright Export", status: "in-progress" }] },
  { quarter: "Q2 2025", status: "planned", items: [{ title: "Visual Testing", status: "planned" }, { title: "Mobile Testing", status: "planned" }, { title: "Performance Testing", status: "planned" }, { title: "SOC 2 Certification", status: "planned" }] },
  { quarter: "Q3 2025", status: "planned", items: [{ title: "Accessibility Testing", status: "planned" }, { title: "Load Testing", status: "planned" }, { title: "Custom AI Models", status: "planned" }, { title: "Enterprise SSO", status: "planned" }] },
];

const Roadmap = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Roadmap - QUALYX</title>
        <meta name="description" content="See what we are building next. Our public roadmap for upcoming QUALYX features." />
      </Helmet>

      <FeatureHero badge="Public Roadmap" subtitle="Resources" title="Product Roadmap" description="Transparency is core to how we build. See what we're working on and what's coming next." primaryCta={{ label: "Request Feature", href: "/company/contact" }} secondaryCta={{ label: "Join Waitlist", href: "/#waitlist" }}>
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Target className="w-4 h-4 text-primary" /><span className="text-sm font-medium text-foreground">Current Focus</span></div>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Q1 2025</span>
          </div>
          <div className="space-y-2">
            {roadmapItems[1].items.map((item) => (
              <div key={item.title} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                {item.status === "completed" ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Clock className="w-4 h-4 text-primary animate-pulse" />}
                <span className="text-sm text-foreground">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </FeatureHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="16" label="Features Planned" />
          <StatCard value="8" label="Completed" />
          <StatCard value="4" label="In Progress" />
          <StatCard value="Weekly" label="Updates" />
        </div>
      </section>

      <FeatureSection title="Full Roadmap" description="Our quarterly development plan">
        <div className="grid md:grid-cols-2 gap-6">
          {roadmapItems.map((quarter) => (
            <div key={quarter.quarter} className="p-6 rounded-2xl border border-border/40 bg-card/30">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-foreground">{quarter.quarter}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${quarter.status === "completed" ? "bg-success/20 text-success" : quarter.status === "in-progress" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {quarter.status === "completed" ? "Completed" : quarter.status === "in-progress" ? "In Progress" : "Planned"}
                </span>
              </div>
              <div className="space-y-2">
                {quarter.items.map((item) => (
                  <div key={item.title} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    {item.status === "completed" ? <CheckCircle2 className="w-5 h-5 text-success" /> : item.status === "in-progress" ? <Clock className="w-5 h-5 text-primary" /> : <Circle className="w-5 h-5 text-muted-foreground" />}
                    <span className={`text-sm ${item.status === "completed" ? "text-foreground" : "text-muted-foreground"}`}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FeatureSection>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6"><span className="gradient-text-white">Have a feature request?</span></h2>
          <p className="text-lg text-muted-foreground mb-8">We'd love to hear what you need.</p>
          <Link to="/company/contact"><Button variant="hero" size="lg" className="group">Submit Request<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Roadmap;

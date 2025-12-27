import { Helmet } from "react-helmet";
import { Sparkles, Bug, Zap, ArrowRight, Tag, Calendar } from "lucide-react";
import { FeaturePageLayout, FeatureHero, FeatureSection, StatCard } from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const releases = [
  { version: "1.2.0", date: "December 20, 2024", changes: [{ type: "feature", text: "AI-powered test generation from recordings" }, { type: "feature", text: "Session replay with network inspection" }, { type: "improvement", text: "50% faster test execution" }, { type: "fix", text: "Fixed selector healing for dynamic IDs" }] },
  { version: "1.1.0", date: "December 5, 2024", changes: [{ type: "feature", text: "Hybrid runner support" }, { type: "feature", text: "GitHub Actions integration" }, { type: "improvement", text: "Improved error messages" }, { type: "fix", text: "Fixed timezone handling in reports" }] },
  { version: "1.0.0", date: "November 15, 2024", changes: [{ type: "feature", text: "Initial release" }, { type: "feature", text: "UI Recorder & Player" }, { type: "feature", text: "API Automation Studio" }, { type: "feature", text: "Self-healing selectors" }] },
];

const Changelog = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Changelog - QUALYX</title>
        <meta name="description" content="Latest updates and releases for QUALYX." />
      </Helmet>

      <FeatureHero badge="What's New" subtitle="Resources" title="Changelog" description="All the latest updates, improvements, and fixes in each QUALYX release." primaryCta={{ label: "Join Waitlist", href: "/#waitlist" }} secondaryCta={{ label: "RSS Feed", href: "/rss" }}>
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /><span className="text-sm font-medium text-foreground">Latest Release</span></div>
            <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">v{releases[0].version}</span>
          </div>
          <div className="space-y-2">
            {releases[0].changes.slice(0, 3).map((change, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {change.type === "feature" ? <Sparkles className="w-4 h-4 text-primary" /> : change.type === "improvement" ? <Zap className="w-4 h-4 text-yellow-500" /> : <Bug className="w-4 h-4 text-destructive" />}
                <span className="text-foreground">{change.text}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{releases[0].date}</div>
        </div>
      </FeatureHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="3" label="Releases" />
          <StatCard value="12" label="New Features" />
          <StatCard value="4" label="Improvements" />
          <StatCard value="2" label="Bug Fixes" />
        </div>
      </section>

      <FeatureSection title="Release History" description="Every update we've shipped">
        <div className="space-y-6">
          {releases.map((release) => (
            <div key={release.version} className="p-6 rounded-2xl border border-border/40 bg-card/30">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-bold text-foreground">v{release.version}</h3>
                <span className="text-sm text-muted-foreground">{release.date}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {release.changes.map((change, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                    {change.type === "feature" ? <Sparkles className="w-4 h-4 text-primary" /> : change.type === "improvement" ? <Zap className="w-4 h-4 text-yellow-500" /> : <Bug className="w-4 h-4 text-destructive" />}
                    <span className="text-sm text-foreground">{change.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FeatureSection>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6"><span className="gradient-text-white">Stay updated</span></h2>
          <p className="text-lg text-muted-foreground mb-8">Be the first to know about new features.</p>
          <Link to="/#waitlist"><Button variant="hero" size="lg" className="group">Join Waitlist<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Changelog;

import { Helmet } from "react-helmet";
import { 
  Rocket, 
  Bug, 
  Sparkles, 
  Zap,
  ArrowRight,
  Calendar,
  Tag,
  ChevronRight
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureSection 
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const releases = [
  {
    version: "0.9.0",
    date: "December 20, 2024",
    type: "Major",
    title: "AI Test Generation 2.0",
    description: "Completely redesigned AI engine with 10x better test coverage and smarter assertions.",
    highlights: [
      "New transformer-based model for understanding user flows",
      "Automatic edge case detection and test generation",
      "Improved natural language test descriptions",
      "Support for complex multi-step workflows",
    ],
    breaking: [],
    fixes: [
      "Fixed memory leak in long-running test sessions",
      "Resolved issue with Safari mobile viewport detection",
    ]
  },
  {
    version: "0.8.5",
    date: "December 10, 2024",
    type: "Minor",
    title: "Performance Improvements",
    description: "Significant performance improvements across the platform.",
    highlights: [
      "50% faster test execution on cloud runners",
      "Reduced memory footprint for large test suites",
      "Improved parallel execution scheduling",
    ],
    breaking: [],
    fixes: [
      "Fixed flaky selector detection false positives",
      "Resolved WebSocket reconnection issues",
      "Fixed timezone handling in scheduled runs",
    ]
  },
  {
    version: "0.8.0",
    date: "November 28, 2024",
    type: "Major",
    title: "Session Replay Launch",
    description: "Full session replay capability for debugging test failures.",
    highlights: [
      "Complete visual recording of test execution",
      "Network traffic capture with request/response details",
      "Console log synchronization with timeline",
      "One-click reproduction of failed tests",
    ],
    breaking: [
      "Minimum Node.js version increased to 18.0",
    ],
    fixes: [
      "Fixed authentication token refresh during long sessions",
    ]
  },
  {
    version: "0.7.5",
    date: "November 15, 2024",
    type: "Minor",
    title: "Export Improvements",
    description: "Enhanced Playwright and Selenium export capabilities.",
    highlights: [
      "Page Object Model export option",
      "Custom selector strategy configuration",
      "Improved TypeScript type generation",
    ],
    breaking: [],
    fixes: [
      "Fixed Python Selenium export syntax errors",
      "Resolved async/await handling in Playwright exports",
    ]
  },
];

const ReleaseNotes = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Release Notes - QUALYX</title>
        <meta name="description" content="Detailed release notes for QUALYX. See what's new, improved, and fixed in each version." />
      </Helmet>

      <FeatureHero
        subtitle="Resources"
        title="Release Notes"
        description="Detailed information about each QUALYX release, including new features, improvements, and bug fixes."
        primaryCta={{ label: "View Changelog", href: "/resources/changelog" }}
        secondaryCta={{ label: "View Roadmap", href: "/resources/roadmap" }}
      >
        <div className="p-6 rounded-2xl border border-border/40 bg-card/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
              Latest
            </div>
            <span className="text-lg font-semibold text-foreground">v{releases[0].version}</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{releases[0].title}</h3>
          <p className="text-muted-foreground mb-4">{releases[0].description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{releases[0].date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              <span>{releases[0].type} Release</span>
            </div>
          </div>
        </div>
      </FeatureHero>

      {/* All Releases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">All Releases</h2>
          
          <div className="space-y-8">
            {releases.map((release, index) => (
              <div 
                key={release.version}
                className="relative pl-8 pb-8 border-l-2 border-border last:border-transparent"
              >
                {/* Version badge */}
                <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                
                <div className="p-6 rounded-2xl border border-border/40 bg-card/20 hover:bg-card/40 transition-colors">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-foreground">v{release.version}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      release.type === "Major" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {release.type}
                    </span>
                    <span className="text-sm text-muted-foreground">{release.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">{release.title}</h3>
                  <p className="text-muted-foreground mb-4">{release.description}</p>
                  
                  {/* Highlights */}
                  {release.highlights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Highlights
                      </h4>
                      <ul className="space-y-1">
                        {release.highlights.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Breaking Changes */}
                  {release.breaking.length > 0 && (
                    <div className="mb-4">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-destructive mb-2">
                        <Zap className="w-4 h-4" />
                        Breaking Changes
                      </h4>
                      <ul className="space-y-1">
                        {release.breaking.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-destructive">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Bug Fixes */}
                  {release.fixes.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <Bug className="w-4 h-4 text-success" />
                        Bug Fixes
                      </h4>
                      <ul className="space-y-1">
                        {release.fixes.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-success">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Stay updated</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get notified when we release new features and improvements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#waitlist">
              <Button variant="hero" size="lg" className="group">
                Join the Waitlist
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/resources/roadmap">
              <Button variant="outline" size="lg">
                <Rocket className="w-4 h-4 mr-2" />
                View Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default ReleaseNotes;

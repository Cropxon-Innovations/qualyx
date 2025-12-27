import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Plug, 
  GitBranch, 
  MessageSquare, 
  Bell, 
  Cloud,
  ArrowRight,
  Play,
  CheckCircle2,
  Zap,
  Link2,
  Webhook,
  Settings
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

const integrationCategories = [
  { 
    category: "CI/CD", 
    icon: GitBranch,
    items: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "Azure DevOps", "Bitbucket Pipelines"] 
  },
  { 
    category: "Communication", 
    icon: MessageSquare,
    items: ["Slack", "Microsoft Teams", "Discord", "Email", "PagerDuty", "Opsgenie"] 
  },
  { 
    category: "Issue Tracking", 
    icon: Bell,
    items: ["Jira", "Linear", "GitHub Issues", "Asana", "Monday.com", "Trello"] 
  },
  { 
    category: "Cloud", 
    icon: Cloud,
    items: ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify", "Heroku"] 
  },
];

// Integration Hub Demo
const IntegrationHubDemo = () => {
  const [activeConnections, setActiveConnections] = useState([
    { name: "GitHub Actions", status: "connected", lastSync: "2s ago" },
    { name: "Slack", status: "connected", lastSync: "5s ago" },
    { name: "Jira", status: "connected", lastSync: "12s ago" },
  ]);
  
  const [events, setEvents] = useState([
    { type: "success", message: "Test results sent to Slack #qa-alerts", time: "now" },
    { type: "sync", message: "GitHub Action triggered on push", time: "2s" },
    { type: "create", message: "Jira issue QUAL-142 created", time: "5s" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents((prev) => {
        const newEvents = [...prev];
        newEvents.pop();
        newEvents.unshift({
          type: ["success", "sync", "create"][Math.floor(Math.random() * 3)],
          message: [
            "Test results sent to Slack #qa-alerts",
            "GitHub Action triggered on push",
            "Jira issue created automatically",
            "Teams notification sent",
            "CI pipeline completed"
          ][Math.floor(Math.random() * 5)],
          time: "now"
        });
        return newEvents;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plug className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Integration Hub</span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
          3 Active
        </span>
      </div>

      {/* Connected Services */}
      <div className="space-y-2">
        {activeConnections.map((conn) => (
          <div
            key={conn.name}
            className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Link2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{conn.name}</div>
                <div className="text-xs text-muted-foreground">Synced {conn.lastSync}</div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
        ))}
      </div>

      {/* Event Stream */}
      <div className="p-3 rounded-lg bg-muted/20 border border-border/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Live Events</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="space-y-1.5">
          {events.map((event, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-3 h-3 text-success mt-0.5" />
              <span className="text-foreground flex-1 truncate">{event.message}</span>
              <span className="text-muted-foreground">{event.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">50+</div>
          <div className="text-[10px] text-muted-foreground">Integrations</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">2-way</div>
          <div className="text-[10px] text-muted-foreground">Sync</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">API</div>
          <div className="text-[10px] text-muted-foreground">Webhooks</div>
        </div>
      </div>
    </div>
  );
};

const Integrations = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Integrations - QUALYX Platform</title>
        <meta name="description" content="Connect QUALYX with your favorite tools. Native integrations for CI/CD, communication, and issue tracking." />
      </Helmet>

      <FeatureHero
        badge="50+ Integrations"
        subtitle="Platform"
        title="Seamless Integrations"
        description="Connect QUALYX with the tools you already use. Native integrations for CI/CD, communication, issue tracking, and cloud platforms."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "View All", href: "/demo" }}
      >
        <LivePreview title="QUALYX Integration Hub — Live">
          <IntegrationHubDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="50+" label="Native Integrations" />
          <StatCard value="2-way" label="Data Sync" />
          <StatCard value="<1min" label="Setup Time" />
          <StatCard value="∞" label="Custom Webhooks" />
        </div>
      </section>

      {/* Integration Categories */}
      <FeatureSection
        title="Integration Ecosystem"
        description="Native integrations across your entire toolchain"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {integrationCategories.map((cat) => (
            <div key={cat.category} className="p-6 rounded-2xl border border-border/40 bg-card/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{cat.category}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cat.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors cursor-pointer">
                    <CheckCircle2 className="w-3 h-3 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Features Grid */}
      <FeatureSection
        title="Integration Features"
        description="Powerful features for seamless connectivity"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Zap}
            title="One-Click Setup"
            description="Connect your tools in seconds with OAuth. No API keys to manage."
          />
          <FeatureCard
            icon={Link2}
            title="Bi-directional Sync"
            description="Data flows both ways. Test results update tickets, CI triggers tests."
          />
          <FeatureCard
            icon={Webhook}
            title="Custom Webhooks"
            description="Build custom integrations with our webhook API for any service."
          />
          <FeatureCard
            icon={Bell}
            title="Smart Notifications"
            description="Get alerts where you work. Slack, Teams, email, or custom channels."
          />
          <FeatureCard
            icon={GitBranch}
            title="CI/CD Native"
            description="First-class support for all major CI/CD platforms with parallel execution."
          />
          <FeatureCard
            icon={Settings}
            title="Granular Control"
            description="Configure exactly what syncs and when. Filter by project, environment, or severity."
          />
        </div>
      </FeatureSection>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="QUALYX plugged into our GitHub Actions workflow in minutes. Now every PR has automated test results before review."
            author="David Park"
            role="Engineering Lead"
            company="DevFlow"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Connect your entire stack</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            50+ integrations. Infinite possibilities.
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

export default Integrations;

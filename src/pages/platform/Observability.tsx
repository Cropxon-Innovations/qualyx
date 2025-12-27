import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Activity, 
  Eye, 
  AlertTriangle,
  Bell,
  LineChart,
  Terminal,
  ArrowRight,
  Play,
  CheckCircle2,
  XCircle,
  Clock
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

// Observability Dashboard Demo
const ObservabilityDemo = () => {
  const [metrics, setMetrics] = useState({
    passRate: 94,
    avgDuration: 2.3,
    activeTests: 12,
    alerts: 1
  });

  const events = [
    { time: "10:42:15", type: "success", message: "Test suite 'auth' completed (24 passed)" },
    { time: "10:41:58", type: "error", message: "Test 'checkout-flow' failed on assertion" },
    { time: "10:41:32", type: "success", message: "Runner 'us-east-1' scaled to 8 instances" },
    { time: "10:40:45", type: "info", message: "Test suite 'profile' started (12 tests)" },
  ];

  const chartData = [65, 72, 68, 85, 78, 92, 88, 95, 91, 94];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        passRate: Math.min(100, prev.passRate + Math.random() * 2 - 0.5),
        activeTests: Math.floor(Math.random() * 20) + 5
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Live Monitoring</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Real-time</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-2">
        <div className="p-2 rounded-lg bg-success/10 border border-success/30 text-center">
          <div className="text-lg font-bold text-success">{metrics.passRate.toFixed(1)}%</div>
          <div className="text-[10px] text-muted-foreground">Pass Rate</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/20 border border-border/40 text-center">
          <div className="text-lg font-bold text-foreground">{metrics.avgDuration.toFixed(1)}s</div>
          <div className="text-[10px] text-muted-foreground">Avg Duration</div>
        </div>
        <div className="p-2 rounded-lg bg-primary/10 border border-primary/30 text-center">
          <div className="text-lg font-bold text-primary">{metrics.activeTests}</div>
          <div className="text-[10px] text-muted-foreground">Running</div>
        </div>
        <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
          <div className="text-lg font-bold text-destructive">{metrics.alerts}</div>
          <div className="text-[10px] text-muted-foreground">Alerts</div>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="p-3 rounded-lg bg-muted/20 border border-border/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Pass Rate (24h)</span>
          <span className="text-xs text-success">↑ 2.3%</span>
        </div>
        <div className="flex items-end gap-1 h-12">
          {chartData.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/60 rounded-t transition-all"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>

      {/* Event Log */}
      <div className="space-y-1.5 max-h-[100px] overflow-y-auto">
        {events.map((event, i) => (
          <div key={i} className="flex items-start gap-2 p-1.5 rounded text-xs">
            {event.type === "success" ? (
              <CheckCircle2 className="w-3 h-3 text-success mt-0.5" />
            ) : event.type === "error" ? (
              <XCircle className="w-3 h-3 text-destructive mt-0.5" />
            ) : (
              <Clock className="w-3 h-3 text-muted-foreground mt-0.5" />
            )}
            <span className="text-muted-foreground font-mono">{event.time}</span>
            <span className="text-foreground flex-1 truncate">{event.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Observability = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Observability - QUALYX</title>
        <meta name="description" content="Real-time monitoring, alerting, and insights for your test infrastructure." />
      </Helmet>

      <FeatureHero
        badge="Real-time"
        subtitle="Platform"
        title="Observability"
        description="Complete visibility into your test infrastructure. Real-time metrics, intelligent alerting, and deep insights to keep your tests healthy."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX Observability — Live">
          <ObservabilityDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="<1s" label="Metric Latency" />
          <StatCard value="30 days" label="Log Retention" />
          <StatCard value="50+" label="Metrics Tracked" />
          <StatCard value="24/7" label="Monitoring" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="Observability Features"
        description="Everything you need to monitor test health"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Activity}
            title="Real-time Metrics"
            description="Live dashboards showing test execution, pass rates, and infrastructure health with sub-second updates."
          />
          <FeatureCard
            icon={Bell}
            title="Smart Alerting"
            description="Get notified when pass rates drop, tests slow down, or infrastructure issues occur. Slack, email, or webhook."
          />
          <FeatureCard
            icon={LineChart}
            title="Trend Analysis"
            description="Identify patterns over time. Catch slow degradation before it becomes a problem."
          />
          <FeatureCard
            icon={Terminal}
            title="Log Aggregation"
            description="All test logs in one place. Search, filter, and correlate across test runs and infrastructure."
          />
          <FeatureCard
            icon={Eye}
            title="Flaky Test Detection"
            description="Automatically identify tests that fail intermittently. Get recommendations for fixes."
          />
          <FeatureCard
            icon={AlertTriangle}
            title="Anomaly Detection"
            description="AI-powered detection of unusual patterns in test behavior or infrastructure metrics."
          />
        </div>
      </FeatureSection>

      {/* Metrics Types */}
      <FeatureSection
        title="What We Track"
        description="Comprehensive metrics for complete visibility"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              category: "Test Metrics",
              items: ["Pass/fail rates", "Execution time", "Flakiness score", "Coverage trends"]
            },
            {
              category: "Infrastructure",
              items: ["Runner health", "Queue depth", "Resource usage", "Scaling events"]
            },
            {
              category: "Business Metrics",
              items: ["Deployment confidence", "Time to feedback", "Cost per test", "ROI tracking"]
            }
          ].map((group) => (
            <div key={group.category} className="p-6 rounded-2xl border border-border/40 bg-card/30">
              <h3 className="text-lg font-semibold text-foreground mb-4">{group.category}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
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
            quote="The observability dashboard is our single pane of glass for test health. We caught a flaky test issue that had been hurting our team for months."
            author="Maria Santos"
            role="Engineering Manager"
            company="DataFlow"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">See everything. Fix faster.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete visibility into your test infrastructure.
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

export default Observability;

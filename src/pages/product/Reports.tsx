import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  FileText,
  Download,
  Share2,
  Calendar,
  Filter,
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

// Reports Dashboard Demo
const ReportsDashboardDemo = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  
  const testResults = [
    { name: "Login Flow", passed: 24, failed: 1, duration: "2.3s" },
    { name: "Checkout", passed: 18, failed: 0, duration: "4.1s" },
    { name: "User Profile", passed: 12, failed: 2, duration: "1.8s" },
    { name: "Search", passed: 30, failed: 0, duration: "1.2s" },
  ];

  const chartBars = [85, 92, 88, 95, 91, 98, 96];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Test Analytics</span>
        </div>
        <div className="flex gap-1">
          {["24h", "7d", "30d"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                selectedPeriod === period
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-muted/20 border border-border/40 text-center">
          <div className="text-lg font-bold text-foreground">156</div>
          <div className="text-xs text-muted-foreground">Total Tests</div>
        </div>
        <div className="p-3 rounded-lg bg-success/10 border border-success/30 text-center">
          <div className="text-lg font-bold text-success">94%</div>
          <div className="text-xs text-muted-foreground">Pass Rate</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/20 border border-border/40 text-center">
          <div className="text-lg font-bold text-foreground">2.1s</div>
          <div className="text-xs text-muted-foreground">Avg Duration</div>
        </div>
        <div className="p-3 rounded-lg bg-muted/20 border border-border/40 text-center">
          <div className="text-lg font-bold text-foreground">12</div>
          <div className="text-xs text-muted-foreground">Test Suites</div>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4 rounded-lg bg-muted/20 border border-border/40">
        <div className="flex items-end justify-between h-20 gap-2">
          {chartBars.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="w-full bg-primary/80 rounded-t transition-all duration-500"
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] text-muted-foreground">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Test Results */}
      <div className="space-y-2 max-h-[120px] overflow-y-auto">
        {testResults.map((test) => (
          <div
            key={test.name}
            className="flex items-center justify-between p-2 rounded-lg bg-muted/10 border border-border/30"
          >
            <div className="flex items-center gap-2">
              {test.failed === 0 ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : (
                <XCircle className="w-4 h-4 text-destructive" />
              )}
              <span className="text-sm text-foreground">{test.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-success">{test.passed} passed</span>
              {test.failed > 0 && (
                <span className="text-xs text-destructive">{test.failed} failed</span>
              )}
              <span className="text-xs text-muted-foreground font-mono">{test.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Reports = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Reports & Analytics - QUALYX</title>
        <meta name="description" content="Comprehensive test analytics and reporting. Track pass rates, performance trends, and identify flaky tests." />
      </Helmet>

      <FeatureHero
        badge="Insights"
        subtitle="Product"
        title="Reports & Analytics"
        description="Comprehensive test analytics that help you understand test health, identify flaky tests, and track performance trends over time."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX Analytics Dashboard">
          <ReportsDashboardDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="Real-time" label="Test Results" />
          <StatCard value="30 days" label="History Retention" />
          <StatCard value="PDF/CSV" label="Export Formats" />
          <StatCard value="Slack" label="Integrations" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="Analytics Features"
        description="Everything you need to understand your test suite"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={BarChart3}
            title="Pass Rate Tracking"
            description="Monitor test pass rates over time. Identify trends and catch regressions before they become problems."
          />
          <FeatureCard
            icon={TrendingUp}
            title="Performance Trends"
            description="Track test execution time trends. Get alerted when tests slow down significantly."
          />
          <FeatureCard
            icon={PieChart}
            title="Flaky Test Detection"
            description="Automatically identify tests that fail intermittently. Prioritize fixes by impact."
          />
          <FeatureCard
            icon={Calendar}
            title="Scheduled Reports"
            description="Get daily, weekly, or monthly reports delivered to your inbox or Slack channel."
          />
          <FeatureCard
            icon={Download}
            title="Export Options"
            description="Export reports as PDF, CSV, or JSON. Perfect for stakeholder presentations."
          />
          <FeatureCard
            icon={Share2}
            title="Team Sharing"
            description="Share dashboards with your team. Role-based access controls included."
          />
        </div>
      </FeatureSection>

      {/* Report Types */}
      <FeatureSection
        title="Report Types"
        description="Multiple views for different needs"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Executive Summary",
              description: "High-level overview of test health for stakeholders",
              metrics: ["Pass rate", "Coverage", "Trends"]
            },
            {
              name: "Detailed Analysis",
              description: "Deep dive into individual test results and failures",
              metrics: ["Error logs", "Screenshots", "Timelines"]
            },
            {
              name: "Performance Report",
              description: "Execution time analysis and bottleneck identification",
              metrics: ["Duration", "Parallelization", "Resources"]
            }
          ].map((report) => (
            <div key={report.name} className="relative p-6 rounded-2xl border border-border/40 bg-card/30">
              <FileText className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{report.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex flex-wrap gap-2">
                {report.metrics.map((metric) => (
                  <span key={metric} className="px-2 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground">
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="The analytics dashboard gives us visibility we never had before. We can now show stakeholders exactly how our test coverage has improved over time."
            author="Rachel Kim"
            role="QA Manager"
            company="RetailMax"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Get insights that matter</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Understand your test suite like never before.
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

export default Reports;

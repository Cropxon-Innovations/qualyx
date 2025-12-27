import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Server, 
  Cpu, 
  Layers,
  GitBranch,
  Gauge,
  Settings,
  ArrowRight,
  Play,
  CheckCircle2,
  Clock,
  Zap
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

// Runner Orchestration Demo
const RunnerOrchestrationDemo = () => {
  const [runningTests, setRunningTests] = useState<number[]>([]);
  
  const runners = [
    { id: 1, name: "runner-us-east-1", status: "active", tests: 24, load: 75 },
    { id: 2, name: "runner-eu-west-1", status: "active", tests: 18, load: 60 },
    { id: 3, name: "runner-ap-south-1", status: "active", tests: 12, load: 40 },
    { id: 4, name: "runner-on-prem-01", status: "idle", tests: 0, load: 0 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRunningTests((prev) => {
        const newTests = [...prev];
        if (newTests.length < 6) {
          newTests.push(Date.now());
        } else {
          newTests.shift();
          newTests.push(Date.now());
        }
        return newTests;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Runner Fleet</span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
          4 Active
        </span>
      </div>

      {/* Runners Grid */}
      <div className="grid grid-cols-2 gap-3">
        {runners.map((runner) => (
          <div
            key={runner.id}
            className={`p-3 rounded-lg border transition-all ${
              runner.status === "active" 
                ? "border-primary/30 bg-primary/5" 
                : "border-border/40 bg-muted/20"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-foreground truncate">{runner.name}</span>
              <span className={`w-2 h-2 rounded-full ${
                runner.status === "active" ? "bg-success animate-pulse" : "bg-muted-foreground"
              }`} />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{runner.tests} tests</span>
              <span>{runner.load}% load</span>
            </div>
            {runner.status === "active" && (
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${runner.load}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Tests */}
      <div className="p-3 rounded-lg bg-muted/20 border border-border/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Parallel Execution</span>
          <span className="text-xs text-primary">{runningTests.length} running</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((slot) => (
            <div
              key={slot}
              className={`flex-1 h-6 rounded transition-all duration-300 flex items-center justify-center ${
                runningTests.length >= slot 
                  ? "bg-primary/20 border border-primary/40" 
                  : "bg-muted/30 border border-border/30"
              }`}
            >
              {runningTests.length >= slot && (
                <Zap className="w-3 h-3 text-primary animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">54</div>
          <div className="text-[10px] text-muted-foreground">Tests/min</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">6x</div>
          <div className="text-[10px] text-muted-foreground">Parallelism</div>
        </div>
        <div className="p-2 rounded-lg bg-muted/10 text-center">
          <div className="text-sm font-bold text-foreground">99.9%</div>
          <div className="text-[10px] text-muted-foreground">Uptime</div>
        </div>
      </div>
    </div>
  );
};

const Runners = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Runners & Orchestration - QUALYX</title>
        <meta name="description" content="Distributed test execution with intelligent orchestration. Scale from 1 to 1000 parallel tests." />
      </Helmet>

      <FeatureHero
        badge="Scale Infinitely"
        subtitle="Platform"
        title="Runners & Orchestration"
        description="Distributed test execution that scales with your needs. Run tests in parallel across multiple regions with intelligent load balancing."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX Runner Fleet — Live">
          <RunnerOrchestrationDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="1000+" label="Parallel Tests" />
          <StatCard value="5 Regions" label="Global Coverage" />
          <StatCard value="<50ms" label="Scheduling Latency" />
          <StatCard value="99.9%" label="Uptime SLA" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="Orchestration Features"
        description="Intelligent test distribution and execution"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Layers}
            title="Auto-Scaling"
            description="Runner fleet scales automatically based on test queue depth. Never wait for capacity."
          />
          <FeatureCard
            icon={Gauge}
            title="Smart Load Balancing"
            description="Tests are distributed based on historical execution time for optimal parallelization."
          />
          <FeatureCard
            icon={GitBranch}
            title="Priority Queues"
            description="Critical tests run first. Configure priorities for different test suites or environments."
          />
          <FeatureCard
            icon={Cpu}
            title="Resource Optimization"
            description="Tests are matched to runners based on browser, device, and resource requirements."
          />
          <FeatureCard
            icon={Server}
            title="On-Premise Runners"
            description="Deploy runners in your own infrastructure for sensitive tests or internal applications."
          />
          <FeatureCard
            icon={Settings}
            title="Custom Configuration"
            description="Configure browser versions, screen sizes, network conditions, and more per test."
          />
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="From test queue to results in seconds"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Queue",
              description: "Tests are queued with priority and requirements"
            },
            {
              step: "02",
              title: "Match",
              description: "Orchestrator finds optimal runner based on capabilities"
            },
            {
              step: "03",
              title: "Execute",
              description: "Runner executes test with real-time streaming"
            },
            {
              step: "04",
              title: "Report",
              description: "Results flow back to dashboard instantly"
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
            quote="We run 2000+ tests in under 10 minutes thanks to QUALYX orchestration. Our deployment pipeline went from 45 minutes to under 15."
            author="Alex Thompson"
            role="Platform Engineer"
            company="ScaleUp"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Scale without limits</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Run thousands of tests in parallel across the globe.
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

export default Runners;

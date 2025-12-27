import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { 
  Code2, 
  Link2, 
  FileJson, 
  Zap, 
  Shield, 
  Database,
  CheckCircle2, 
  Loader2,
  ArrowRight,
  Play,
  Send,
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

// Live demo component
const APITestDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const requests = [
    { name: "POST /api/users", status: "done", duration: "124ms", statusCode: 201 },
    { name: "GET /api/users/123", status: "done", duration: "45ms", statusCode: 200 },
    { name: "PUT /api/users/123", status: "running", duration: "—", statusCode: null },
    { name: "DELETE /api/users/123", status: "pending", duration: "—", statusCode: null },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((p) => (p + 1) % requests.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Request Steps */}
      <div className="p-4 rounded-xl bg-muted/20 border border-border/40">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">API Requests</span>
        </div>
        <div className="space-y-2">
          {requests.map((req, idx) => {
            const isActive = idx === activeStep;
            const isDone = idx < activeStep;
            return (
              <div
                key={req.name}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-primary/10 border border-primary/40" : "border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-success" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-border/50" />
                  )}
                  <span className={`text-sm font-mono ${isActive ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {req.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isDone && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-success/20 text-success font-mono">
                      {req.statusCode}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground/60 font-mono">
                    {isDone ? req.duration : "—"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Response Preview */}
      <div className="relative h-[200px] rounded-xl bg-background/80 border border-border/50 overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 inset-x-0 h-8 bg-muted/50 border-b border-border/50 flex items-center justify-between px-3">
          <span className="text-xs text-muted-foreground font-mono">Response</span>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-mono">
              {activeStep > 0 ? requests[activeStep - 1]?.duration || "—" : "—"}
            </span>
          </div>
        </div>
        
        {/* JSON Response */}
        <div className="absolute top-8 inset-x-0 bottom-0 p-3 overflow-auto">
          <pre className="text-xs text-muted-foreground font-mono">
            <code>
{`{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z"
}`}
            </code>
          </pre>
        </div>
        
        {/* Send indicator */}
        <div className="absolute bottom-3 right-3">
          <Send className={`w-4 h-4 ${activeStep > 0 ? "text-success" : "text-muted-foreground/30"}`} />
        </div>
      </div>
    </div>
  );
};

const APIAutomation = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>API Automation - QUALYX</title>
        <meta name="description" content="Comprehensive API testing for REST, GraphQL, and WebSocket endpoints with automatic schema validation." />
      </Helmet>

      <FeatureHero
        badge="Enterprise Ready"
        subtitle="Product"
        title="API Automation"
        description="Build, run, and maintain API tests with intelligent request chaining, schema validation, and comprehensive assertions for REST, GraphQL, and WebSocket."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX API Runner — Live Execution">
          <APITestDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="50ms" label="Avg Response Time" trend="Monitored" />
          <StatCard value="100%" label="Schema Coverage" />
          <StatCard value="3" label="Protocols Supported" />
          <StatCard value="∞" label="Request Chaining" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="Key Features"
        description="Everything you need for comprehensive API testing"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Code2}
            title="Visual Request Builder"
            description="Build API tests visually with an intuitive interface. Define headers, body, and authentication without writing code."
          />
          <FeatureCard
            icon={Link2}
            title="Request Chaining"
            description="Extract values from responses and use them in subsequent requests. Build complex multi-step API workflows."
          />
          <FeatureCard
            icon={FileJson}
            title="Schema Validation"
            description="Automatically validate responses against JSON Schema, OpenAPI specs, or custom validation rules."
          />
          <FeatureCard
            icon={Zap}
            title="Performance Testing"
            description="Set response time thresholds and track API performance over time. Catch regressions early."
          />
          <FeatureCard
            icon={Database}
            title="Data-Driven Tests"
            description="Run the same test with different data sets. CSV, JSON, or database-driven test execution."
          />
          <FeatureCard
            icon={Shield}
            title="Auth Support"
            description="OAuth 2.0, API keys, JWT, Basic Auth — all authentication methods supported out of the box."
          />
        </div>
      </FeatureSection>

      {/* Supported Protocols */}
      <FeatureSection
        title="Supported Protocols"
        description="Test any API regardless of protocol"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "REST",
              methods: "GET, POST, PUT, PATCH, DELETE",
              description: "Full REST API support with all HTTP methods"
            },
            {
              name: "GraphQL",
              methods: "Queries, Mutations, Subscriptions",
              description: "Native GraphQL testing with schema introspection"
            },
            {
              name: "WebSocket",
              methods: "Real-time messaging",
              description: "Test real-time connections and message flows"
            }
          ].map((protocol) => (
            <div key={protocol.name} className="relative text-center p-6 rounded-2xl border border-border/40 bg-card/30">
              <h3 className="text-xl font-semibold text-foreground mb-2">{protocol.name}</h3>
              <p className="text-xs text-primary font-mono mb-3">{protocol.methods}</p>
              <p className="text-sm text-muted-foreground">{protocol.description}</p>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="Get started in three simple steps"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Import or Build",
              description: "Import OpenAPI/Swagger specs or build requests visually with our intuitive builder."
            },
            {
              step: "02",
              title: "Add Assertions",
              description: "Define status codes, schema validation, response time limits, and custom assertions."
            },
            {
              step: "03",
              title: "Run & Monitor",
              description: "Execute tests in CI/CD or scheduled runs. Get alerts on failures and performance issues."
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

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="QUALYX API testing caught a breaking change in our payment API before it hit production. The schema validation alone has saved us countless hours."
            author="Michael Park"
            role="Backend Lead"
            company="FinanceFlow"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Ready to test your APIs?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join teams shipping reliable APIs with confidence.
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

export default APIAutomation;

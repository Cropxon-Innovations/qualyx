import { useEffect, useState, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MonitorPlay, Code2, GitBranch, CheckCircle2, Clock, Terminal, Play, Pause, ChevronLeft, ChevronRight, Keyboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

type Scenario = "ui" | "api" | "ci";

const scenarios: { id: Scenario; label: string; icon: React.ElementType; description: string }[] = [
  { id: "ui", label: "UI Automation", icon: MonitorPlay, description: "Record & replay user flows with AI-powered selectors." },
  { id: "api", label: "API Testing", icon: Code2, description: "Validate REST and GraphQL endpoints in seconds." },
  { id: "ci", label: "CI/CD Pipeline", icon: GitBranch, description: "Seamless GitHub Actions, GitLab CI, Jenkins integration." },
];

const stepsData: Record<Scenario, { name: string; duration: string }[]> = {
  ui: [
    { name: "Open login page", duration: "0.6s" },
    { name: "Fill email & password", duration: "1.1s" },
    { name: "Click sign in", duration: "0.3s" },
    { name: "Assert dashboard visible", duration: "1.8s" },
  ],
  api: [
    { name: "POST /auth/login", duration: "0.4s" },
    { name: "GET /users/me", duration: "0.2s" },
    { name: "Validate JSON schema", duration: "0.1s" },
    { name: "Assert status 200", duration: "—" },
  ],
  ci: [
    { name: "Checkout repo", duration: "2.1s" },
    { name: "Install deps", duration: "8.4s" },
    { name: "Run QUALYX tests", duration: "12.3s" },
    { name: "Upload report", duration: "1.0s" },
  ],
};

const logsData: Record<Scenario, string[]> = {
  ui: [
    "[INFO] Launching browser…",
    "[DEBUG] page.goto('https://app.example.com')",
    "[INFO] Filling email field",
    "[DEBUG] click(button[type=submit])",
    "[INFO] Dashboard loaded ✔",
  ],
  api: [
    "[INFO] Sending POST /auth/login",
    "[DEBUG] Response 200 in 84ms",
    "[INFO] Token received",
    "[DEBUG] GET /users/me",
    "[INFO] Schema valid ✔",
  ],
  ci: [
    "[INFO] Pipeline started",
    "[DEBUG] Node v18.17.0",
    "[INFO] Installing dependencies…",
    "[DEBUG] qualyx run --headless",
    "[INFO] 24/24 tests passed ✔",
  ],
};

const Demo = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  const scenario = scenarios[scenarioIndex].id;
  const steps = stepsData[scenario];
  const logs = logsData[scenario];

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setScenarioIndex((p) => (p - 1 + scenarios.length) % scenarios.length);
    } else if (e.key === "ArrowRight") {
      setScenarioIndex((p) => (p + 1) % scenarios.length);
    } else if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset on scenario change
  useEffect(() => {
    setActiveStep(0);
    setVisibleLogs([logs[0]]);
  }, [scenario, logs]);

  // Animate steps
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setActiveStep((p) => (p + 1) % steps.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [playing, steps.length]);

  // Animate logs
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = logs[prev.length % logs.length];
        return [...prev.slice(-4), next];
      });
    }, 700);
    return () => clearInterval(timer);
  }, [playing, logs]);

  const goToPrev = () => setScenarioIndex((p) => (p - 1 + scenarios.length) % scenarios.length);
  const goToNext = () => setScenarioIndex((p) => (p + 1) % scenarios.length);

  // Calculate overall progress
  const overallProgress = ((scenarioIndex * steps.length + activeStep + 1) / (scenarios.length * steps.length)) * 100;

  return (
    <>
      <Helmet>
        <title>Live Demo — QUALYX</title>
        <meta name="description" content="Experience QUALYX autonomous QA in action. Watch real-time UI, API, and CI/CD test automation scenarios." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-16 px-4 sm:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <ScrollReveal>
              <header className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text-white">
                  See QUALYX in Action
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto mb-4">
                  Explore how QUALYX runs autonomous tests across UI, API, and CI/CD scenarios.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Use arrow keys to navigate • Space to play/pause</span>
                </div>
              </header>
            </ScrollReveal>

            {/* Progress bar */}
            <ScrollReveal delay={50}>
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Demo Progress</span>
                  <span>{Math.round(overallProgress)}% Complete</span>
                </div>
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                {/* Scenario indicators */}
                <div className="flex justify-between mt-2">
                  {scenarios.map((s, idx) => (
                    <div 
                      key={s.id}
                      className={`flex items-center gap-1.5 text-[10px] transition-colors ${
                        idx === scenarioIndex ? "text-primary font-medium" : idx < scenarioIndex ? "text-success" : "text-muted-foreground/50"
                      }`}
                    >
                      {idx < scenarioIndex ? (
                        <CheckCircle2 className="w-3 h-3 text-success" />
                      ) : idx === scenarioIndex ? (
                        <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-border/50" />
                      )}
                      <span className="hidden sm:inline">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Scenario navigation */}
            <ScrollReveal delay={100}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrev}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex gap-2">
                  {scenarios.map((s, idx) => {
                    const Icon = s.icon;
                    const isActive = idx === scenarioIndex;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setScenarioIndex(idx)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-secondary/20 text-foreground border border-secondary/40 shadow-lg shadow-secondary/10"
                            : "bg-card/40 text-muted-foreground border border-border/30 hover:border-border hover:bg-muted/30"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? "text-secondary" : ""}`} />
                        <span className="hidden sm:inline">{s.label}</span>
                      </button>
                    );
                  })}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </ScrollReveal>

            {/* Demo panel */}
            <ScrollReveal delay={150}>
              <div className="relative glass-card-glow rounded-2xl overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-border/30 bg-card/40">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/70" />
                      <div className="w-3 h-3 rounded-full bg-warning/70" />
                      <div className="w-3 h-3 rounded-full bg-success/70" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{scenarios[scenarioIndex].label} Demo</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setPlaying((p) => !p)}
                      className="gap-2"
                    >
                      {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {playing ? "Pause" : "Play"}
                    </Button>
                    
                    {/* Step counter */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-muted/20 text-xs text-muted-foreground">
                      <span>Step {activeStep + 1}/{steps.length}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">00:12:48</span>
                  </div>
                </header>

                {/* Body grid */}
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/25 min-h-[350px]">
                  {/* Steps */}
                  <section className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Test Steps</span>
                    </div>
                    <div className="space-y-2">
                      {steps.map((step, idx) => {
                        const isActive = idx === activeStep;
                        const isDone = idx < activeStep;
                        return (
                          <div
                            key={step.name}
                            className={`flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-300 ${
                              isActive
                                ? "bg-secondary/15 border border-secondary/40 shadow-md"
                                : "border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-success" />
                              ) : isActive ? (
                                <div className="w-4 h-4 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-border/50" />
                              )}
                              <span className={`text-sm truncate ${isActive ? "text-foreground font-medium" : isDone ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                                {step.name}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground/60 font-mono">{isDone ? step.duration : "—"}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Step progress bar */}
                    <div className="mt-6 pt-4 border-t border-border/20">
                      <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500"
                          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Console */}
                  <section className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Console</span>
                    </div>
                    <div className="font-mono text-xs leading-relaxed space-y-1 min-h-[200px] bg-card/30 rounded-lg p-4 border border-border/20">
                      {visibleLogs.map((log, i) => (
                        <div
                          key={`${log}-${i}`}
                          className={`transition-all duration-300 ${i === visibleLogs.length - 1 ? "text-foreground" : "text-muted-foreground/70"}`}
                        >
                          {log}
                        </div>
                      ))}
                      <span className="text-muted-foreground/50 animate-pulse">▋</span>
                    </div>
                  </section>

                  {/* Preview */}
                  <section className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MonitorPlay className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preview</span>
                    </div>
                    <div className="relative aspect-video rounded-xl bg-muted/20 border border-border/25 overflow-hidden group">
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="text-center transition-transform duration-300 group-hover:scale-105">
                          {(() => {
                            const Icon = scenarios[scenarioIndex].icon;
                            return (
                              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-primary/70" />
                              </div>
                            );
                          })()}
                          <div className="text-sm font-medium text-foreground">{scenarios[scenarioIndex].label}</div>
                          <div className="mt-1 text-xs text-muted-foreground">Near-live execution</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -inset-10 bg-primary/8 blur-2xl animate-glow-pulse" />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Description */}
                <div className="px-6 py-4 border-t border-border/25 bg-muted/10">
                  <p className="text-sm text-muted-foreground text-center">
                    {scenarios[scenarioIndex].description}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={200}>
              <div className="flex justify-center mt-12">
                <Link to="/#waitlist">
                  <Button variant="hero" size="lg" className="gap-2">
                    Join the Waitlist
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Demo;

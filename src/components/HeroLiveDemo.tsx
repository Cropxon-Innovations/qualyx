import { useEffect, useState, useRef } from "react";
import { CheckCircle2, Clock, Terminal, MonitorPlay, Cpu, TrendingUp, Zap, Shield, Brain, Target, Activity } from "lucide-react";

const steps = [
  { name: "Navigate to login page", duration: "0.8s", status: "done" },
  { name: "Enter credentials", duration: "1.2s", status: "done" },
  { name: "Click submit button", duration: "0.4s", status: "active" },
  { name: "Verify dashboard loads", duration: "2.1s", status: "pending" },
  { name: "Capture session replay", duration: "—", status: "pending" },
];

const logs = [
  { type: "info", text: "Starting test run…" },
  { type: "info", text: "Recording user flow" },
  { type: "debug", text: "Playwright: click(button)" },
  { type: "success", text: "Screenshot captured ✓" },
  { type: "success", text: "Assertion passed ✓" },
  { type: "info", text: "Generating report…" },
];

const insights = [
  { icon: Brain, label: "AI Confidence", value: "98.4%", trend: "+2.1%" },
  { icon: Target, label: "Element Match", value: "Exact", trend: null },
  { icon: Activity, label: "Stability", value: "99.1%", trend: "+0.3%" },
];

const journeySteps = [
  { label: "Input", status: "done" },
  { label: "Action", status: "active" },
  { label: "Assert", status: "pending" },
  { label: "Report", status: "pending" },
];

export const HeroLiveDemo = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<typeof logs>([logs[0], logs[1]]);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [previewFrame, setPreviewFrame] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const previewFrames = ["Login Form", "Dashboard View", "Test Results"];

  useEffect(() => {
    const stepTimer = setInterval(() => setActiveStep((p) => (p + 1) % steps.length), 2500);
    const logTimer = setInterval(() => {
      setVisibleLogs((prev) => {
        const nextIdx = prev.length % logs.length;
        return [...prev.slice(-4), logs[nextIdx]];
      });
    }, 1100);
    const frameTimer = setInterval(() => setPreviewFrame((p) => (p + 1) % previewFrames.length), 3500);
    return () => {
      clearInterval(stepTimer);
      clearInterval(logTimer);
      clearInterval(frameTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full group"
    >
      {/* Cursor trail glow */}
      <div
        className="pointer-events-none absolute w-40 h-40 rounded-full bg-primary/15 blur-3xl transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 z-0"
        style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: "translate(-50%, -50%)" }}
      />

      {/* Main container */}
      <div className="relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_0_60px_hsl(var(--primary)/0.12)]">
        
        {/* Header bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70 hover:scale-125 transition-transform cursor-pointer" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/70 hover:scale-125 transition-transform cursor-pointer" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/70 hover:scale-125 transition-transform cursor-pointer" />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Cpu className="w-4 h-4 text-primary" />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm animate-pulse" />
            </div>
            <span className="text-xs font-medium text-foreground">QUALYX Engine</span>
            <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-[10px] font-medium">LIVE</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">00:04:32</span>
          </div>
        </header>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] min-h-[340px]">
          
          {/* LEFT: Steps panel */}
          <section className="p-4 border-b lg:border-b-0 lg:border-r border-border/25 bg-card/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Test Steps</span>
            </div>
            <div className="space-y-1.5">
              {steps.map((s, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;
                const isHovered = idx === hoveredStep;
                return (
                  <div
                    key={s.name}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "bg-secondary/15 border border-secondary/50 shadow-[0_0_15px_hsl(var(--secondary)/0.2)]"
                        : isHovered
                        ? "bg-muted/30 border border-border/40"
                        : "border border-transparent hover:bg-muted/20"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-success flex-shrink-0" />
                    ) : isActive ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-secondary border-t-transparent animate-spin flex-shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-border/50 flex-shrink-0" />
                    )}
                    <span
                      className={`text-[10px] leading-tight transition-colors ${
                        isActive ? "text-foreground font-medium" : isDone ? "text-muted-foreground" : "text-muted-foreground/60"
                      }`}
                    >
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step progress */}
            <div className="mt-4 pt-3 border-t border-border/20">
              <div className="flex items-center justify-between text-[9px] text-muted-foreground/60 mb-1.5">
                <span>Progress</span>
                <span>{Math.round((activeStep / steps.length) * 100)}%</span>
              </div>
              <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500 ease-out"
                  style={{ width: `${(activeStep / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </section>

          {/* MIDDLE: Preview + Console stacked */}
          <section className="flex flex-col border-b lg:border-b-0 lg:border-r border-border/25">
            
            {/* Preview area */}
            <div className="flex-1 p-4">
              <div className="flex items-center gap-2 mb-3">
                <MonitorPlay className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Live Preview</span>
              </div>
              
              <div className="relative h-[140px] rounded-xl border border-border/30 bg-gradient-to-br from-muted/10 to-muted/5 overflow-hidden group/preview">
                {/* Animated selection highlight */}
                <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover/preview:border-primary/40 rounded-xl transition-all duration-300" />
                
                {/* Simulated browser chrome */}
                <div className="absolute top-0 inset-x-0 h-6 bg-card/50 border-b border-border/20 flex items-center px-2 gap-1">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-warning/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-success/50" />
                  </div>
                  <div className="flex-1 mx-2 h-3 rounded bg-muted/30 flex items-center px-2">
                    <span className="text-[8px] text-muted-foreground/50 font-mono">app.example.com</span>
                  </div>
                </div>

                {/* Preview content */}
                <div className="absolute inset-0 pt-6 grid place-items-center">
                  <div className="text-center transition-all duration-500 group-hover/preview:scale-105">
                    <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shadow-lg shadow-primary/10">
                      <MonitorPlay className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-xs font-medium text-foreground">{previewFrames[previewFrame]}</div>
                    <div className="mt-1 text-[9px] text-muted-foreground">Near-live execution</div>
                  </div>
                </div>

                {/* Pulsing glow */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -inset-8 bg-primary/5 blur-3xl animate-glow-pulse" />
                </div>

                {/* Frame indicator */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {previewFrames.map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === previewFrame ? "bg-primary" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Console at bottom of middle column */}
            <div className="p-4 border-t border-border/25 bg-card/20">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Console</span>
              </div>
              <div className="font-mono text-[9px] leading-relaxed space-y-0.5 h-[72px] overflow-hidden">
                {visibleLogs.map((log, i) => (
                  <div
                    key={`${log.text}-${i}`}
                    className={`flex items-start gap-1.5 transition-all duration-300 ${
                      i === visibleLogs.length - 1 ? "text-foreground" : "text-muted-foreground/60"
                    }`}
                  >
                    <span className={`font-semibold ${
                      log.type === "success" ? "text-success" : 
                      log.type === "debug" ? "text-muted-foreground/50" : 
                      "text-primary/70"
                    }`}>
                      [{log.type.toUpperCase()}]
                    </span>
                    <span>{log.text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-muted-foreground/40">
                  <span className="animate-pulse">▋</span>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: Insights & Journey */}
          <section className="p-4 bg-card/20">
            {/* AI Insights */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">AI Insights</span>
              </div>
              <div className="space-y-2">
                {insights.map((insight, idx) => {
                  const Icon = insight.icon;
                  return (
                    <div
                      key={insight.label}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-sm cursor-pointer group/insight"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover/insight:text-primary transition-colors" />
                        <span className="text-[10px] text-muted-foreground">{insight.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-foreground">{insight.value}</span>
                        {insight.trend && (
                          <span className="flex items-center text-[9px] text-success">
                            <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                            {insight.trend}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Journey Map */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-3.5 h-3.5 text-secondary" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Journey</span>
              </div>
              <div className="flex items-center justify-between">
                {journeySteps.map((step, idx) => {
                  const isActive = step.status === "active";
                  const isDone = step.status === "done";
                  return (
                    <div key={step.label} className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${
                          isDone
                            ? "bg-success/20 text-success border border-success/30"
                            : isActive
                            ? "bg-secondary/20 text-secondary border border-secondary/50 shadow-[0_0_10px_hsl(var(--secondary)/0.3)]"
                            : "bg-muted/20 text-muted-foreground/50 border border-border/30"
                        }`}
                      >
                        {isDone ? "✓" : idx + 1}
                      </div>
                      <span className={`text-[8px] mt-1 ${isActive ? "text-foreground font-medium" : "text-muted-foreground/60"}`}>
                        {step.label}
                      </span>
                      {idx < journeySteps.length - 1 && (
                        <div className="absolute" style={{ left: `${25 + idx * 25}%` }}>
                          {/* connector line would go here if needed */}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Journey connector */}
              <div className="relative mt-2 h-0.5 mx-3">
                <div className="absolute inset-0 bg-muted/30 rounded-full" />
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-success via-secondary to-transparent rounded-full transition-all duration-500"
                  style={{ width: '50%' }}
                />
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-4 pt-3 border-t border-border/20 grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded-lg bg-muted/10">
                <div className="text-[10px] text-muted-foreground/60">Tests</div>
                <div className="text-sm font-bold text-foreground">24</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/10">
                <div className="text-[10px] text-muted-foreground/60">Passed</div>
                <div className="text-sm font-bold text-success">23</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

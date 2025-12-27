import { useEffect, useState, useRef } from "react";
import { CheckCircle2, Clock, Terminal, Image, MonitorPlay } from "lucide-react";

const steps = [
  { name: "Navigate to login page", duration: "0.8s" },
  { name: "Enter credentials", duration: "1.2s" },
  { name: "Click submit button", duration: "0.4s" },
  { name: "Verify dashboard loads", duration: "2.1s" },
  { name: "Replay failure snapshot", duration: "—" },
];

const logs = [
  "[INFO] Starting run…",
  "[INFO] Recording user flow",
  "[DEBUG] Playwright step: click(button)",
  "[INFO] Screenshot captured",
  "[INFO] Assertion passed",
  "[INFO] Report generated",
];

const frames = ["Login Page", "Dashboard", "Failure Replay"];

export const HeroLiveDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([logs[0]]);
  const [frame, setFrame] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Cycle steps, logs, frames
  useEffect(() => {
    const stepTimer = setInterval(() => setActiveStep((p) => (p + 1) % steps.length), 2200);
    const logTimer = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = logs[(prev.length + 1) % logs.length];
        return [...prev.slice(-5), next];
      });
    }, 900);
    const frameTimer = setInterval(() => setFrame((p) => (p + 1) % frames.length), 3200);
    return () => {
      clearInterval(stepTimer);
      clearInterval(logTimer);
      clearInterval(frameTimer);
    };
  }, []);

  // Cursor trail follows mouse within container
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
      className="relative w-full h-[300px] sm:h-[340px] md:h-[380px] group"
    >
      {/* Cursor trail glow */}
      <div
        className="pointer-events-none absolute w-32 h-32 rounded-full bg-primary/20 blur-2xl transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"
        style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: "translate(-50%, -50%)" }}
      />

      {/* Shimmering sheen */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -inset-x-24 -top-20 h-40 rotate-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent bg-[length:200%_100%] animate-shimmer" />
      </div>

      <div className="relative h-full rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)]">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/30">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60 hover:scale-125 transition-transform" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60 hover:scale-125 transition-transform" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60 hover:scale-125 transition-transform" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MonitorPlay className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono">Live Demo</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">00:04:32</span>
          </div>
        </header>

        <div className="grid h-[calc(100%-49px)] grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/25">
          {/* Steps */}
          <section className="p-4 overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Steps</span>
            </div>
            <div className="space-y-1">
              {steps.map((s, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;
                const isHovered = idx === hoveredStep;
                return (
                  <div
                    key={s.name}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-secondary/15 border border-secondary/40 shadow-[0_0_12px_hsl(var(--secondary)/0.15)]"
                        : isHovered
                        ? "bg-muted/40 border border-border/50"
                        : "border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : isActive ? (
                        <div className="w-4 h-4 rounded-full border-2 border-secondary border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-border/50" />
                      )}
                      <span
                        className={`text-[11px] truncate transition-colors ${
                          isActive ? "text-foreground font-medium" : isDone ? "text-muted-foreground" : "text-muted-foreground/70"
                        }`}
                      >
                        {s.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">{isDone ? s.duration : "—"}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Console */}
          <section className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Console</span>
            </div>
            <div className="h-full max-h-[170px] sm:max-h-none overflow-hidden font-mono text-[10px] leading-relaxed space-y-1">
              {visibleLogs.map((l, i) => (
                <div
                  key={`${l}-${i}`}
                  className={`transition-colors duration-300 ${
                    i === visibleLogs.length - 1 ? "text-foreground" : "text-muted-foreground/70"
                  }`}
                >
                  {l}
                </div>
              ))}
              <div className="flex items-center gap-1 text-muted-foreground/60">
                <span className="animate-pulse">▋</span>
              </div>
            </div>
          </section>

          {/* Preview */}
          <section className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Image className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Preview</span>
            </div>

            <div className="relative aspect-video rounded-lg border border-border/25 bg-muted/20 overflow-hidden group/preview">
              {/* Animated selection highlight */}
              <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover/preview:border-primary/30 rounded-lg transition-colors duration-300" />

              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center transition-transform duration-300 group-hover/preview:scale-105">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <MonitorPlay className="w-5 h-5 text-primary/70" />
                  </div>
                  <div className="text-[11px] font-medium text-foreground">{frames[frame]}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">Near-live execution</div>
                </div>
              </div>

              {/* Subtle pulsing glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -inset-10 bg-primary/8 blur-2xl animate-glow-pulse" />
              </div>

              <div className="absolute bottom-2 right-2 rounded bg-background/70 backdrop-blur-sm px-2 py-0.5">
                <span className="text-[9px] text-muted-foreground">{frames[frame]}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Terminal, Image } from "lucide-react";

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
  const [visibleLogs, setVisibleLogs] = useState<string[]>([logs[0]]);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveStep((p) => (p + 1) % steps.length);
    }, 2200);

    const logTimer = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = logs[(prev.length + 1) % logs.length];
        return [...prev.slice(-5), next];
      });
    }, 900);

    const frameTimer = setInterval(() => {
      setFrame((p) => (p + 1) % frames.length);
    }, 3200);

    return () => {
      clearInterval(stepTimer);
      clearInterval(logTimer);
      clearInterval(frameTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[340px] md:h-[380px]">
      {/* Subtle animated sheen */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -inset-x-24 -top-20 h-40 rotate-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent bg-[length:200%_100%] animate-shimmer" />
      </div>

      <div className="relative h-full rounded-xl border border-border/30 bg-card/20 backdrop-blur-sm overflow-hidden">
        {/* Window chrome */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-card/30">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">Live Demo</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">00:04:32</span>
          </div>
        </header>

        <div className="grid h-[calc(100%-49px)] grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/25">
          {/* Steps */}
          <section className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Steps</span>
            </div>
            <div className="space-y-2">
              {steps.map((s, idx) => {
                const isActive = idx === activeStep;
                const isDone = idx < activeStep;
                return (
                  <div
                    key={s.name}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-300 ${
                      isActive ? "bg-secondary/10 border border-secondary/30" : "border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-success/70" />
                      ) : isActive ? (
                        <div className="w-4 h-4 rounded-full border-2 border-secondary/60 border-t-transparent animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-border/40" />
                      )}
                      <span
                        className={`text-[11px] truncate ${
                          isActive ? "text-foreground" : isDone ? "text-muted-foreground/80" : "text-muted-foreground/60"
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
                  className={i === visibleLogs.length - 1 ? "text-foreground/80" : "text-muted-foreground/70"}
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

            <div className="relative aspect-video rounded-lg border border-border/25 bg-muted/20 overflow-hidden">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-primary/10 border border-primary/20" />
                  <div className="text-[11px] font-medium text-foreground">{frames[frame]}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">Near-live execution</div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -inset-10 bg-primary/10 blur-2xl animate-glow-pulse" />
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

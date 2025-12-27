import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Terminal, Image } from "lucide-react";

const testSteps = [
  { id: 1, name: "Navigate to login page", status: "passed", duration: "0.8s" },
  { id: 2, name: "Enter credentials", status: "passed", duration: "1.2s" },
  { id: 3, name: "Click submit button", status: "passed", duration: "0.4s" },
  { id: 4, name: "Verify dashboard loads", status: "passed", duration: "2.1s" },
  { id: 5, name: "Check user profile data", status: "running", duration: "—" },
  { id: 6, name: "Validate sidebar navigation", status: "pending", duration: "—" },
];

const logMessages = [
  "[INFO] Starting test execution...",
  "[INFO] Browser launched: Chrome 120",
  "[INFO] Navigating to https://app.example.com/login",
  "[DEBUG] Page loaded in 842ms",
  "[INFO] Filling email field",
  "[INFO] Filling password field",
  "[INFO] Clicking login button",
  "[DEBUG] Network request: POST /api/auth/login",
  "[INFO] Login successful, redirecting...",
  "[DEBUG] Dashboard rendered in 1.2s",
  "[INFO] Verifying user profile...",
];

const screenshots = [
  { label: "Login Page", state: "initial" },
  { label: "Credentials Entered", state: "filled" },
  { label: "Dashboard View", state: "dashboard" },
];

export const TestPreviewSimulation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  useEffect(() => {
    // Animate through steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % testSteps.length);
    }, 2500);

    // Add logs progressively
    const logInterval = setInterval(() => {
      setVisibleLogs((prev) => {
        if (prev.length >= logMessages.length) {
          return [logMessages[0]];
        }
        return [...prev.slice(-6), logMessages[prev.length % logMessages.length]];
      });
    }, 1200);

    // Cycle screenshots
    const screenshotInterval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % screenshots.length);
    }, 3500);

    return () => {
      clearInterval(stepInterval);
      clearInterval(logInterval);
      clearInterval(screenshotInterval);
    };
  }, []);

  return (
    <section className="py-28 md:py-36 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg-subtle opacity-10" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            <span className="gradient-text-white">Live Test Execution</span>
          </h2>
          <p className="text-base text-muted-foreground/70 max-w-xl mx-auto">
            Watch autonomous tests run with real-time logs and visual feedback
          </p>
        </div>

        {/* Preview Panel */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-secondary/20 via-transparent to-primary/20 blur-md opacity-50" />
          
          <div className="relative rounded-2xl bg-card/40 backdrop-blur-lg border border-border/30 overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/30 bg-card/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <span className="text-xs text-muted-foreground/60 font-mono">QUALYX Test Runner</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                <Clock className="w-3 h-3" />
                <span>00:04:32</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/20">
              {/* Test Steps */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Test Steps</span>
                </div>
                <div className="space-y-2">
                  {testSteps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isPassed = index < currentStep;
                    return (
                      <div
                        key={step.id}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-500 ${
                          isActive 
                            ? "bg-secondary/10 border border-secondary/30" 
                            : "bg-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-success/70" />
                          ) : isActive ? (
                            <div className="w-4 h-4 rounded-full border-2 border-secondary/60 border-t-transparent animate-spin" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-border/40" />
                          )}
                          <span className={`text-xs transition-colors duration-300 ${
                            isActive ? "text-foreground/90" : isPassed ? "text-muted-foreground/70" : "text-muted-foreground/40"
                          }`}>
                            {step.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground/40 font-mono">
                          {isPassed ? step.duration : "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Console Logs */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="w-3.5 h-3.5 text-muted-foreground/60" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Console</span>
                </div>
                <div className="h-48 overflow-hidden font-mono text-[10px] leading-relaxed space-y-1">
                  {visibleLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-300 ${
                        index === visibleLogs.length - 1 ? "text-foreground/70" : "text-muted-foreground/40"
                      }`}
                    >
                      {log}
                    </div>
                  ))}
                  <div className="flex items-center gap-1 text-muted-foreground/30">
                    <span className="animate-pulse">▋</span>
                  </div>
                </div>
              </div>

              {/* Screenshot Preview */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Image className="w-3.5 h-3.5 text-muted-foreground/60" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Screenshot</span>
                </div>
                <div className="relative aspect-video rounded-lg bg-muted/20 border border-border/20 overflow-hidden">
                  {/* Simulated screenshot content */}
                  <div className="absolute inset-0 flex flex-col">
                    {/* Fake browser chrome */}
                    <div className="h-6 bg-muted/30 border-b border-border/20 flex items-center px-2 gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/20" />
                      <div className="flex-1 mx-2 h-3 rounded bg-muted/40" />
                    </div>
                    {/* Content area */}
                    <div className="flex-1 p-3 flex flex-col gap-2">
                      {currentScreenshot === 0 && (
                        <>
                          <div className="w-16 h-3 bg-muted/30 rounded" />
                          <div className="w-full h-6 bg-muted/20 rounded border border-border/20" />
                          <div className="w-full h-6 bg-muted/20 rounded border border-border/20" />
                          <div className="w-20 h-5 bg-secondary/20 rounded mt-1" />
                        </>
                      )}
                      {currentScreenshot === 1 && (
                        <>
                          <div className="w-16 h-3 bg-muted/30 rounded" />
                          <div className="w-full h-6 bg-secondary/10 rounded border border-secondary/30 flex items-center px-2">
                            <div className="w-20 h-2 bg-secondary/30 rounded" />
                          </div>
                          <div className="w-full h-6 bg-muted/20 rounded border border-border/20 flex items-center px-2">
                            <div className="w-12 h-2 bg-muted/40 rounded" />
                          </div>
                          <div className="w-20 h-5 bg-secondary/30 rounded mt-1" />
                        </>
                      )}
                      {currentScreenshot === 2 && (
                        <>
                          <div className="flex gap-2">
                            <div className="w-12 h-full bg-muted/20 rounded" />
                            <div className="flex-1 space-y-2">
                              <div className="w-24 h-4 bg-muted/30 rounded" />
                              <div className="grid grid-cols-3 gap-1">
                                <div className="h-8 bg-muted/20 rounded" />
                                <div className="h-8 bg-muted/20 rounded" />
                                <div className="h-8 bg-success/10 rounded border border-success/20" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Screenshot label */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-background/80 backdrop-blur-sm">
                    <span className="text-[9px] text-muted-foreground/60">{screenshots[currentScreenshot].label}</span>
                  </div>
                </div>
                
                {/* Pass/Fail indicator */}
                <div className="flex items-center justify-between mt-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-success/70" />
                    <span className="text-[10px] text-muted-foreground/50">{currentStep} passed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3 h-3 text-muted-foreground/30" />
                    <span className="text-[10px] text-muted-foreground/50">0 failed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

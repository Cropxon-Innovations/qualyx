import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Loader2,
  Monitor,
  Globe,
  MousePointer,
  Type,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TestStep {
  id: number;
  action: string;
  target: string;
  status: "pending" | "running" | "passed" | "failed";
  duration?: number;
  icon: React.ComponentType<{ className?: string }>;
}

const uiTestSteps: TestStep[] = [
  { id: 1, action: "Navigate", target: "https://app.example.com/login", status: "pending", icon: Globe },
  { id: 2, action: "Click", target: "input#email", status: "pending", icon: MousePointer },
  { id: 3, action: "Type", target: "user@example.com", status: "pending", icon: Type },
  { id: 4, action: "Click", target: "input#password", status: "pending", icon: MousePointer },
  { id: 5, action: "Type", target: "••••••••", status: "pending", icon: Type },
  { id: 6, action: "Click", target: "button[type=submit]", status: "pending", icon: MousePointer },
  { id: 7, action: "Assert", target: "Dashboard visible", status: "pending", icon: Eye },
];

export const UIDashboardPreview = () => {
  const [steps, setSteps] = useState<TestStep[]>(uiTestSteps);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [browserUrl, setBrowserUrl] = useState("about:blank");

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= steps.length) {
      setTimeout(() => {
        setSteps(uiTestSteps);
        setCurrentStep(0);
        setBrowserUrl("about:blank");
      }, 2000);
      return;
    }

    const timer = setTimeout(() => {
      setSteps(prev => prev.map((step, idx) => {
        if (idx === currentStep) {
          return { ...step, status: "running" };
        }
        if (idx < currentStep) {
          return { ...step, status: "passed", duration: Math.floor(Math.random() * 500) + 100 };
        }
        return step;
      }));

      // Update browser preview
      if (currentStep === 0) setBrowserUrl("https://app.example.com/login");
      if (currentStep === 6) setBrowserUrl("https://app.example.com/dashboard");

      setTimeout(() => {
        setSteps(prev => prev.map((step, idx) => {
          if (idx === currentStep) {
            return { ...step, status: "passed", duration: Math.floor(Math.random() * 500) + 100 };
          }
          return step;
        }));
        setCurrentStep(prev => prev + 1);
      }, 800);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, steps.length]);

  const getStatusIcon = (status: TestStep["status"]) => {
    switch (status) {
      case "running":
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case "passed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="glass-card-glow rounded-2xl overflow-hidden">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
          </div>
          <span className="text-sm font-medium text-foreground">UI Test Runner</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Play className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 divide-x divide-border">
        {/* Browser Preview */}
        <div className="p-4">
          <div className="rounded-lg border border-border overflow-hidden bg-background">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 border-b border-border">
              <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-background/50 rounded text-xs text-muted-foreground">
                <Globe className="w-3 h-3" />
                <span className="truncate">{browserUrl}</span>
              </div>
            </div>
            
            {/* Browser content */}
            <div className="aspect-video bg-muted/20 relative overflow-hidden">
              {browserUrl.includes("login") && (
                <div className="absolute inset-0 flex items-center justify-center p-6 animate-fade-in">
                  <div className="w-full max-w-xs space-y-4">
                    <div className="text-center mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 mx-auto mb-3" />
                      <div className="h-4 bg-muted rounded w-24 mx-auto" />
                    </div>
                    <div className={cn(
                      "h-10 rounded-lg border transition-all duration-300",
                      currentStep === 1 || currentStep === 2 ? "border-primary bg-primary/5" : "border-border bg-muted/30"
                    )} />
                    <div className={cn(
                      "h-10 rounded-lg border transition-all duration-300",
                      currentStep === 3 || currentStep === 4 ? "border-primary bg-primary/5" : "border-border bg-muted/30"
                    )} />
                    <div className={cn(
                      "h-10 rounded-lg transition-all duration-300",
                      currentStep === 5 ? "bg-primary glow-cyan" : "bg-primary/50"
                    )} />
                  </div>
                </div>
              )}
              
              {browserUrl.includes("dashboard") && (
                <div className="absolute inset-0 p-4 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-muted rounded w-32" />
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-20 rounded-lg bg-muted/50 border border-border" />
                    ))}
                  </div>
                  <div className="h-32 rounded-lg bg-muted/30 border border-border" />
                </div>
              )}

              {browserUrl === "about:blank" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Monitor className="w-12 h-12 text-muted-foreground/30" />
                </div>
              )}

              {/* Cursor animation */}
              {steps[currentStep]?.action === "Click" && (
                <div 
                  className="absolute w-6 h-6 pointer-events-none animate-bounce"
                  style={{ 
                    top: currentStep === 1 ? "40%" : currentStep === 3 ? "50%" : "60%",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}
                >
                  <MousePointer className="w-6 h-6 text-primary drop-shadow-lg" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Test Steps */}
        <div className="p-4">
          <div className="space-y-2">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all duration-300",
                    step.status === "running" 
                      ? "border-primary/50 bg-primary/5" 
                      : step.status === "passed"
                      ? "border-success/30 bg-success/5"
                      : "border-border bg-card/30"
                  )}
                >
                  {getStatusIcon(step.status)}
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground">{step.action}</span>
                    <span className="text-xs text-muted-foreground ml-2 truncate">{step.target}</span>
                  </div>
                  {step.duration && (
                    <span className="text-xs text-muted-foreground">{step.duration}ms</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

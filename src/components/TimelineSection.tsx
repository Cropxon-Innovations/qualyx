import { useEffect, useRef, useState } from "react";
import { 
  MonitorPlay, 
  Braces, 
  PlayCircle, 
  ShieldCheck, 
  RotateCcw, 
  FolderDown
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const steps = [
  {
    id: "record",
    icon: MonitorPlay,
    label: "Record",
    caption: "Capture real user flows directly inside the browser.",
    tooltip: "QUALYX records every click, scroll, and input — then converts them into reliable test steps.",
    animation: "cursor"
  },
  {
    id: "generate",
    icon: Braces,
    label: "Generate",
    caption: "QUALYX converts recordings into clean Playwright code.",
    tooltip: "Generate: QUALYX writes Playwright tests automatically — clean, modular, readable.",
    animation: "code"
  },
  {
    id: "run",
    icon: PlayCircle,
    label: "Run",
    caption: "Execute tests across environments and browsers.",
    tooltip: "Run tests in parallel across Chrome, Firefox, Safari — locally or in CI/CD pipelines.",
    animation: "pipeline"
  },
  {
    id: "heal",
    icon: ShieldCheck,
    label: "Auto-Heal",
    caption: "Selectors adapt automatically when UI shifts.",
    tooltip: "When UI changes break selectors, QUALYX detects and repairs them automatically.",
    animation: "heal"
  },
  {
    id: "replay",
    icon: RotateCcw,
    label: "Replay",
    caption: "Review every execution with snapshots and session replay.",
    tooltip: "Time-travel through test executions with frame-by-frame screenshots and video replay.",
    animation: "replay"
  },
  {
    id: "export",
    icon: FolderDown,
    label: "Export",
    caption: "Download test scripts — run anywhere, own your code.",
    tooltip: "Export clean Playwright or Selenium scripts. No vendor lock-in. Your code, your control.",
    animation: "export"
  },
];

// Mini animation components for each step
const StepAnimation = ({ type, isActive }: { type: string; isActive: boolean }) => {
  if (!isActive) return null;
  
  switch (type) {
    case "cursor":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute w-3 h-3 bg-secondary/60 rounded-full blur-[2px] animate-cursor-move" />
          <div className="absolute top-1/3 left-1/4 w-16 h-2 bg-secondary/20 rounded animate-highlight-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-1/2 left-1/3 w-12 h-2 bg-secondary/15 rounded animate-highlight-pulse" style={{ animationDelay: "1s" }} />
        </div>
      );
    case "code":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-lg flex flex-col justify-center px-3 gap-1">
          <div className="h-1 bg-secondary/30 rounded animate-code-line w-3/4" style={{ animationDelay: "0s" }} />
          <div className="h-1 bg-secondary/20 rounded animate-code-line w-1/2" style={{ animationDelay: "0.3s" }} />
          <div className="h-1 bg-secondary/25 rounded animate-code-line w-2/3" style={{ animationDelay: "0.6s" }} />
          <div className="h-1 bg-secondary/15 rounded animate-code-line w-1/3" style={{ animationDelay: "0.9s" }} />
        </div>
      );
    case "pipeline":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/30 -translate-y-1/2" />
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-success/70 rounded-full animate-flow-right" />
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-success/50 rounded-full animate-flow-right" style={{ animationDelay: "0.8s" }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-success/60 rounded-full animate-flow-right" style={{ animationDelay: "1.6s" }} />
        </div>
      );
    case "heal":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border border-destructive/50 rounded animate-heal-fix">
            <div className="w-full h-full bg-success/20 rounded animate-heal-success" />
          </div>
        </div>
      );
    case "replay":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute bottom-2 left-2 right-2 h-1 bg-border/40 rounded">
            <div className="h-full bg-secondary/50 rounded animate-timeline-scrub" />
          </div>
          <div className="absolute top-1/3 left-1/4 w-6 h-4 bg-muted/30 rounded animate-frame-flash" />
          <div className="absolute top-1/3 left-1/2 w-6 h-4 bg-muted/20 rounded animate-frame-flash" style={{ animationDelay: "0.5s" }} />
        </div>
      );
    case "export":
      return (
        <div className="absolute inset-0 overflow-hidden rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 border border-secondary/40 rounded bg-card/50 animate-export-fly" />
          <FolderDown className="absolute w-4 h-4 text-success/60 animate-folder-appear" />
        </div>
      );
    default:
      return null;
  }
};

export const TimelineSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <TooltipProvider delayDuration={200}>
      <section ref={sectionRef} className="py-28 md:py-36 px-4 md:px-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 grid-bg-subtle opacity-10" />
        
        {/* Ambient glow - follows active step */}
        <div 
          className="absolute top-1/2 h-[400px] w-[400px] bg-primary/10 rounded-full blur-[120px] transition-all duration-1000 ease-out -translate-y-1/2"
          style={{ 
            left: `${15 + (activeStep / (steps.length - 1)) * 70}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
              <span className="gradient-text-white">The Complete QA Lifecycle</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground/60 max-w-2xl mx-auto">
              From recording to deployment — QUALYX automates every step of your testing pipeline.
            </p>
          </div>

          {/* Horizontal Timeline - Desktop */}
          <div className="hidden lg:block">
            {/* Connecting lines container */}
            <div className="relative mx-8 mb-6">
              {/* Base line */}
              <div className="absolute top-1/2 left-[8%] right-[8%] h-px bg-border/20 -translate-y-1/2" />
              
              {/* Active progress line with glow */}
              <div 
                className="absolute top-1/2 left-[8%] h-px -translate-y-1/2 transition-all duration-700 ease-out"
                style={{ 
                  width: `${(activeStep / (steps.length - 1)) * 84}%`,
                  background: 'linear-gradient(90deg, hsl(var(--secondary) / 0.55), hsl(var(--success) / 0.55))',
                  boxShadow: '0 0 12px hsl(var(--secondary) / 0.28)'
                }}
              />
              
              {/* Animated particle on the line */}
              <div 
                className="absolute top-1/2 w-2 h-2 bg-secondary rounded-full -translate-y-1/2 transition-all duration-700 ease-out shadow-[0_0_10px_hsl(var(--secondary)/0.45)]"
                style={{ 
                  left: `calc(8% + ${(activeStep / (steps.length - 1)) * 84}%)`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-6 gap-4 xl:gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                const isHovered = hoveredStep === index;

                return (
                  <Tooltip key={step.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={`
                          relative flex flex-col items-center text-center cursor-pointer group
                          transition-all duration-300 ease-out
                          ${isVisible 
                            ? "opacity-100 translate-y-0" 
                            : "opacity-0 translate-y-8"
                          }
                          ${isHovered ? "translate-y-[-2px]" : ""}
                        `}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        onClick={() => setActiveStep(index)}
                        onMouseEnter={() => setHoveredStep(index)}
                        onMouseLeave={() => setHoveredStep(null)}
                      >
                        {/* Card container */}
                        <div
                          className={`
                            relative w-full px-4 py-5 rounded-xl 
                            bg-card/25 backdrop-blur-md border 
                            transition-all duration-300 ease-out
                            ${isActive
                              ? "border-secondary/50 shadow-lg"
                              : isPast
                                ? "border-success/25 shadow-md"
                                : "border-border/25 shadow-sm"
                            }
                            ${isHovered && !isActive
                              ? "border-secondary/30 shadow-md"
                              : ""
                            }
                          `}
                        >
                          {/* Mini animation area */}
                          <div className="relative h-12 mb-4 rounded-lg bg-background/20 overflow-hidden">
                            <StepAnimation type={step.animation} isActive={isActive} />
                            
                            {/* Icon overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Icon 
                                className={`w-6 h-6 transition-all duration-300 ${
                                  isActive 
                                    ? "text-secondary opacity-80" 
                                    : isPast 
                                      ? "text-success/60" 
                                      : "text-muted-foreground/40"
                                }`} 
                                strokeWidth={1.5}
                              />
                            </div>
                          </div>

                          {/* Label */}
                          <h3 
                            className={`text-sm font-semibold mb-2 transition-colors duration-300 ${
                              isActive ? "text-foreground" : "text-muted-foreground/70"
                            }`}
                          >
                            {step.label}
                          </h3>

                          {/* Caption */}
                          <p 
                            className={`text-[11px] leading-relaxed transition-all duration-300 ${
                              isActive 
                                ? "text-muted-foreground/70" 
                                : "text-muted-foreground/40"
                            }`}
                          >
                            {step.caption}
                          </p>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="bottom" 
                      className="max-w-[260px] bg-card/95 backdrop-blur-xl border-border/40 text-xs"
                    >
                      {step.tooltip}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Timeline - Vertical cards */}
          <div className="lg:hidden space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <Tooltip key={step.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                        relative px-5 py-4 rounded-xl 
                        bg-card/25 backdrop-blur-md border 
                        transition-all duration-300 ease-out cursor-pointer
                        ${isActive 
                          ? "border-secondary/50 shadow-[0_0_25px_hsl(217,91%,60%,0.12)]" 
                          : isPast
                            ? "border-success/25"
                            : "border-border/20"
                        }
                        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                      `}
                      style={{ transitionDelay: `${index * 80}ms` }}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon container with animation */}
                        <div className="relative">
                          <div 
                            className={`
                              w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                              transition-all duration-300 overflow-hidden
                              ${isActive 
                                ? "bg-secondary/15 border border-secondary/40" 
                                : isPast
                                  ? "bg-success/10 border border-success/30"
                                  : "bg-muted/30 border border-border/30"
                              }
                            `}
                          >
                            <StepAnimation type={step.animation} isActive={isActive} />
                            <Icon 
                              className={`relative z-10 w-5 h-5 transition-colors duration-300 ${
                                isActive 
                                  ? "text-secondary" 
                                  : isPast
                                    ? "text-success/70"
                                    : "text-muted-foreground/50"
                              }`} 
                              strokeWidth={1.5}
                            />
                          </div>
                          
                          {/* Step number */}
                          <div className={`
                            absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold
                            flex items-center justify-center transition-colors duration-300
                            ${isActive 
                              ? "bg-secondary text-secondary-foreground" 
                              : isPast
                                ? "bg-success/80 text-success-foreground"
                                : "bg-muted text-muted-foreground"
                            }
                          `}>
                            {index + 1}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-sm font-semibold transition-colors duration-300 ${
                            isActive ? "text-foreground" : "text-muted-foreground/70"
                          }`}>
                            {step.label}
                          </h3>
                          <p className="text-xs text-muted-foreground/50 mt-1 leading-relaxed">
                            {step.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right" 
                    className="max-w-[240px] bg-card/95 backdrop-blur-xl border-border/40 text-xs"
                  >
                    {step.tooltip}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          {/* Step indicator dots */}
          <div className="flex justify-center gap-2 mt-10">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`
                  h-1.5 rounded-full transition-all duration-300 ease-out
                  ${index === activeStep 
                    ? "bg-secondary w-8" 
                    : index < activeStep
                      ? "bg-success/50 w-1.5"
                      : "bg-muted-foreground/20 hover:bg-muted-foreground/40 w-1.5"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Custom animations */}
        <style>{`
          @keyframes cursor-move {
            0%, 100% { top: 20%; left: 15%; }
            25% { top: 40%; left: 60%; }
            50% { top: 60%; left: 30%; }
            75% { top: 35%; left: 70%; }
          }
          .animate-cursor-move {
            animation: cursor-move 4s ease-in-out infinite;
          }
          
          @keyframes highlight-pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.5; }
          }
          .animate-highlight-pulse {
            animation: highlight-pulse 2s ease-in-out infinite;
          }
          
          @keyframes code-line {
            0% { transform: translateX(-100%); opacity: 0; }
            20% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-code-line {
            animation: code-line 3s ease-out infinite;
          }
          
          @keyframes flow-right {
            0% { left: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }
          .animate-flow-right {
            animation: flow-right 2.5s ease-in-out infinite;
          }
          
          @keyframes heal-fix {
            0%, 40% { border-color: hsl(var(--destructive) / 0.5); transform: scale(1); }
            50% { transform: scale(1.1); }
            60%, 100% { border-color: hsl(var(--success) / 0.5); transform: scale(1); }
          }
          .animate-heal-fix {
            animation: heal-fix 3s ease-in-out infinite;
          }
          
          @keyframes heal-success {
            0%, 50% { opacity: 0; }
            70%, 100% { opacity: 1; }
          }
          .animate-heal-success {
            animation: heal-success 3s ease-in-out infinite;
          }
          
          @keyframes timeline-scrub {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-timeline-scrub {
            animation: timeline-scrub 3s ease-in-out infinite;
          }
          
          @keyframes frame-flash {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.6; }
          }
          .animate-frame-flash {
            animation: frame-flash 1.5s ease-in-out infinite;
          }
          
          @keyframes export-fly {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            50% { transform: translate(4px, 4px) scale(0.8); opacity: 0.5; }
            100% { transform: translate(8px, 8px) scale(0.6); opacity: 0; }
          }
          .animate-export-fly {
            animation: export-fly 2s ease-in-out infinite;
          }
          
          @keyframes folder-appear {
            0%, 40% { opacity: 0; transform: scale(0.8); }
            60%, 100% { opacity: 1; transform: scale(1); }
          }
          .animate-folder-appear {
            animation: folder-appear 2s ease-in-out infinite;
          }
        `}</style>
      </section>
    </TooltipProvider>
  );
};
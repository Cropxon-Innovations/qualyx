import { useEffect, useRef, useState } from "react";
import { 
  MonitorPlay, 
  Braces, 
  PlayCircle, 
  ShieldCheck, 
  RotateCcw, 
  FolderDown,
  ChevronRight
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
  },
  {
    id: "generate",
    icon: Braces,
    label: "Generate",
    caption: "QUALYX converts recordings into clean Playwright code.",
    tooltip: "Generate: QUALYX writes Playwright tests automatically — clean, modular, readable.",
  },
  {
    id: "run",
    icon: PlayCircle,
    label: "Run",
    caption: "Execute tests across environments and browsers.",
    tooltip: "Run tests in parallel across Chrome, Firefox, Safari — locally or in CI/CD pipelines.",
  },
  {
    id: "heal",
    icon: ShieldCheck,
    label: "Auto-Heal",
    caption: "Selectors adapt automatically when UI shifts.",
    tooltip: "When UI changes break selectors, QUALYX detects and repairs them automatically.",
  },
  {
    id: "replay",
    icon: RotateCcw,
    label: "Replay",
    caption: "Review every execution with snapshots and session replay.",
    tooltip: "Time-travel through test executions with frame-by-frame screenshots and video replay.",
  },
  {
    id: "export",
    icon: FolderDown,
    label: "Export",
    caption: "Download test scripts — run anywhere, own your code.",
    tooltip: "Export clean Playwright or Selenium scripts. No vendor lock-in. Your code, your control.",
  },
];

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
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Ambient glow - follows active step */}
        <div 
          className="absolute top-1/2 h-[400px] w-[400px] rounded-full blur-[120px] transition-all duration-1000 ease-out -translate-y-1/2"
          style={{ 
            left: `${15 + (activeStep / (steps.length - 1)) * 70}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 70%)'
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

          {/* Horizontal Timeline with Arrows - Desktop */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-6 gap-2 xl:gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                const isHovered = hoveredStep === index;

                return (
                  <div key={step.id} className="relative flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`
                            relative flex-1 flex flex-col items-center text-center cursor-pointer group
                            transition-all duration-300 ease-out
                            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                            ${isHovered ? "translate-y-[-4px]" : ""}
                          `}
                          style={{ transitionDelay: `${index * 100}ms` }}
                          onClick={() => setActiveStep(index)}
                          onMouseEnter={() => setHoveredStep(index)}
                          onMouseLeave={() => setHoveredStep(null)}
                        >
                          {/* Step number badge */}
                          <div className={`
                            absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full 
                            flex items-center justify-center text-[10px] font-bold z-10
                            transition-all duration-300
                            ${isActive 
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                              : isPast 
                                ? "bg-success text-success-foreground"
                                : "bg-muted text-muted-foreground"
                            }
                          `}>
                            {isPast ? "✓" : index + 1}
                          </div>

                          {/* Card container */}
                          <div
                            className={`
                              relative w-full px-3 py-6 pt-8 rounded-xl 
                              backdrop-blur-sm border transition-all duration-300 ease-out
                              ${isActive
                                ? "bg-card/40 border-primary/40 shadow-lg shadow-primary/10"
                                : isPast
                                  ? "bg-card/30 border-success/20"
                                  : "bg-card/20 border-border/20"
                              }
                              ${isHovered && !isActive ? "border-primary/30 bg-card/30" : ""}
                            `}
                          >
                            {/* Icon */}
                            <div className={`
                              mx-auto w-12 h-12 rounded-xl flex items-center justify-center mb-4
                              transition-all duration-300
                              ${isActive 
                                ? "bg-primary/15 border border-primary/30" 
                                : isPast
                                  ? "bg-success/10 border border-success/20"
                                  : "bg-muted/30 border border-border/20"
                              }
                            `}>
                              <Icon 
                                className={`w-6 h-6 transition-all duration-300 ${
                                  isActive 
                                    ? "text-primary" 
                                    : isPast 
                                      ? "text-success/70" 
                                      : "text-muted-foreground/40"
                                }`} 
                                strokeWidth={1.5}
                              />
                            </div>

                            {/* Label */}
                            <h3 className={`text-sm font-semibold mb-2 transition-colors duration-300 ${
                              isActive ? "text-foreground" : "text-muted-foreground/70"
                            }`}>
                              {step.label}
                            </h3>

                            {/* Caption */}
                            <p className={`text-[11px] leading-relaxed transition-all duration-300 ${
                              isActive ? "text-muted-foreground/70" : "text-muted-foreground/40"
                            }`}>
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

                    {/* Arrow connector between steps */}
                    {index < steps.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
                        <div className={`
                          flex items-center justify-center w-6 h-6 rounded-full
                          transition-all duration-500
                          ${index < activeStep 
                            ? "bg-success/20 text-success" 
                            : index === activeStep 
                              ? "bg-primary/20 text-primary animate-pulse"
                              : "bg-muted/30 text-muted-foreground/30"
                          }
                        `}>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress line below cards */}
            <div className="relative mt-8 mx-12">
              <div className="h-1 rounded-full bg-muted/20 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-success transition-all duration-700 ease-out"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Timeline - Vertical with arrows */}
          <div className="lg:hidden space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <div key={step.id} className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`
                          relative px-4 py-4 rounded-xl 
                          backdrop-blur-sm border transition-all duration-300 ease-out cursor-pointer
                          ${isActive 
                            ? "bg-card/40 border-primary/40 shadow-lg shadow-primary/10" 
                            : isPast
                              ? "bg-card/30 border-success/20"
                              : "bg-card/20 border-border/20"
                          }
                          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                        `}
                        style={{ transitionDelay: `${index * 80}ms` }}
                        onClick={() => setActiveStep(index)}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon container */}
                          <div className="relative">
                            <div className={`
                              w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                              transition-all duration-300
                              ${isActive 
                                ? "bg-primary/15 border border-primary/40" 
                                : isPast
                                  ? "bg-success/10 border border-success/30"
                                  : "bg-muted/30 border border-border/30"
                              }
                            `}>
                              <Icon 
                                className={`w-5 h-5 transition-colors duration-300 ${
                                  isActive 
                                    ? "text-primary" 
                                    : isPast
                                      ? "text-success/70"
                                      : "text-muted-foreground/50"
                                }`} 
                                strokeWidth={1.5}
                              />
                            </div>
                            
                            {/* Step number */}
                            <div className={`
                              absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold
                              flex items-center justify-center transition-colors duration-300
                              ${isActive 
                                ? "bg-primary text-primary-foreground" 
                                : isPast
                                  ? "bg-success text-success-foreground"
                                  : "bg-muted text-muted-foreground"
                              }
                            `}>
                              {isPast ? "✓" : index + 1}
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

                  {/* Arrow between mobile steps */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className={`
                        w-6 h-6 rounded-full flex items-center justify-center rotate-90
                        transition-all duration-300
                        ${index < activeStep 
                          ? "bg-success/20 text-success" 
                          : index === activeStep 
                            ? "bg-primary/20 text-primary"
                            : "bg-muted/20 text-muted-foreground/30"
                        }
                      `}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
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
                    ? "bg-primary w-8" 
                    : index < activeStep
                      ? "bg-success/60 w-3"
                      : "bg-muted/40 w-3 hover:bg-muted/60"
                  }
                `}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

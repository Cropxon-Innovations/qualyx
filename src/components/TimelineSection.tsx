import { useEffect, useRef, useState } from "react";
import { 
  CircleDot, 
  Sparkles, 
  Play, 
  Wrench, 
  RotateCcw, 
  FileOutput
} from "lucide-react";

const steps = [
  {
    id: "record",
    icon: CircleDot,
    label: "Record",
    caption: "Capture interactions",
  },
  {
    id: "generate",
    icon: Sparkles,
    label: "Generate",
    caption: "AI creates tests",
  },
  {
    id: "run",
    icon: Play,
    label: "Run",
    caption: "Execute anywhere",
  },
  {
    id: "heal",
    icon: Wrench,
    label: "Auto-Heal",
    caption: "Self-repair selectors",
  },
  {
    id: "replay",
    icon: RotateCcw,
    label: "Replay",
    caption: "Time-travel debug",
  },
  {
    id: "export",
    icon: FileOutput,
    label: "Export",
    caption: "Generate scripts",
  },
];

export const TimelineSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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
    }, 2500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-32 md:py-40 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[hsl(220,15%,5%)]" />
      <div className="absolute inset-0 grid-bg-subtle opacity-10" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[hsl(217,91%,60%,0.03)] rounded-full blur-[100px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            <span className="gradient-text-white">What QUALYX Does</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/70 max-w-xl mx-auto">
            A complete autonomous QA lifecycle — from recording to deployment
          </p>
        </div>

        {/* Horizontal Timeline - Desktop */}
        <div className="hidden lg:block">
          {/* Progress line background */}
          <div className="relative mx-12 mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border/30 -translate-y-1/2" />
            {/* Active progress */}
            <div 
              className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-secondary to-success -translate-y-1/2 transition-all duration-700 ease-out"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-6 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              const isPast = index < activeStep;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col items-center text-center transition-all duration-700 ease-out cursor-pointer group ${
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Icon node */}
                  <div className="relative mb-5">
                    {/* Glow ring for active */}
                    {isActive && (
                      <div className="absolute -inset-3 rounded-full bg-secondary/20 blur-md animate-pulse" />
                    )}
                    
                    <div
                      className={`
                        relative w-14 h-14 rounded-xl flex items-center justify-center 
                        transition-all duration-500 ease-out
                        ${isActive
                          ? "bg-secondary/20 border border-secondary/50 shadow-[0_0_30px_hsl(217,91%,60%,0.2)] scale-110"
                          : isPast
                            ? "bg-success/10 border border-success/30"
                            : "bg-card/50 border border-border/40 group-hover:border-secondary/30"
                        }
                      `}
                    >
                      <Icon 
                        className={`w-6 h-6 transition-colors duration-500 ${
                          isActive 
                            ? "text-secondary" 
                            : isPast 
                              ? "text-success/70" 
                              : "text-muted-foreground/50 group-hover:text-muted-foreground"
                        }`} 
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <h3 
                    className={`text-sm font-semibold mb-1.5 transition-colors duration-500 ${
                      isActive ? "text-foreground" : "text-muted-foreground/70"
                    }`}
                  >
                    {step.label}
                  </h3>

                  {/* Caption */}
                  <p 
                    className={`text-xs transition-all duration-500 ${
                      isActive 
                        ? "text-muted-foreground/80 opacity-100" 
                        : "text-muted-foreground/40 opacity-70"
                    }`}
                  >
                    {step.caption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline - Vertical cards */}
        <div className="lg:hidden space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;

            return (
              <div
                key={step.id}
                className={`
                  relative px-5 py-4 rounded-xl 
                  bg-card/30 backdrop-blur-sm border 
                  transition-all duration-500 ease-out cursor-pointer
                  ${isActive 
                    ? "border-secondary/40 shadow-[0_0_25px_hsl(217,91%,60%,0.1)]" 
                    : "border-border/20"
                  }
                  ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                `}
                style={{ transitionDelay: `${index * 60}ms` }}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                      transition-all duration-500
                      ${isActive 
                        ? "bg-secondary/20 border border-secondary/40" 
                        : "bg-muted/50 border border-border/30"
                      }
                    `}
                  >
                    <Icon 
                      className={`w-5 h-5 transition-colors duration-500 ${
                        isActive ? "text-secondary" : "text-muted-foreground/50"
                      }`} 
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors duration-500 ${
                      isActive ? "text-foreground" : "text-muted-foreground/70"
                    }`}>
                      {step.label}
                    </h3>
                    <p className="text-xs text-muted-foreground/50 mt-0.5">{step.caption}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step indicator dots */}
        <div className="flex justify-center gap-2 mt-12">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-300
                ${index === activeStep 
                  ? "bg-secondary w-6" 
                  : "bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

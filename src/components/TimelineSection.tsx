import { useEffect, useRef, useState } from "react";
import { 
  Circle, 
  Sparkles, 
  Play, 
  Wrench, 
  RotateCcw, 
  Download,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    id: "record",
    icon: Circle,
    label: "Record",
    description: "Capture user interactions with intelligent session recording",
    color: "primary",
  },
  {
    id: "generate",
    icon: Sparkles,
    label: "Generate",
    description: "AI creates comprehensive test suites automatically",
    color: "primary",
  },
  {
    id: "run",
    icon: Play,
    label: "Run",
    description: "Execute tests in cloud or on-premise environments",
    color: "primary",
  },
  {
    id: "heal",
    icon: Wrench,
    label: "Auto-heal",
    description: "Self-repairing selectors adapt to UI changes",
    color: "primary",
  },
  {
    id: "replay",
    icon: RotateCcw,
    label: "Replay",
    description: "Time-travel debugging with full session replay",
    color: "primary",
  },
  {
    id: "export",
    icon: Download,
    label: "Export",
    description: "Generate Playwright, Selenium, or custom scripts",
    color: "success",
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
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg-subtle opacity-20" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-white">What QUALYX Does</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete autonomous QA lifecycle — from recording to deployment
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Progress line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-border/50">
              <div 
                className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Steps */}
            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                const isLast = index === steps.length - 1;

                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center text-center transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Node */}
                    <div className="relative mb-4 cursor-pointer group">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-primary-foreground glow-cyan scale-110"
                            : isPast
                            ? "bg-primary/20 text-primary border border-primary/30"
                            : "bg-card border border-border text-muted-foreground group-hover:border-primary/50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {isActive && (
                        <div className="absolute -inset-2 rounded-2xl border border-primary/30 animate-pulse" />
                      )}
                    </div>

                    {/* Label */}
                    <h3 className={`font-semibold mb-2 transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs leading-relaxed transition-all duration-300 ${
                      isActive ? "text-muted-foreground opacity-100" : "opacity-60"
                    }`}>
                      {step.description}
                    </p>

                    {/* Arrow between steps */}
                    {!isLast && (
                      <ArrowRight className="absolute top-6 -right-4 w-4 h-4 text-border hidden xl:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;

              return (
                <div
                  key={step.id}
                  className={`glass-card p-4 rounded-xl transition-all duration-300 ${
                    isActive ? "border-primary/50 glow-cyan" : "border-border/30"
                  } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{step.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

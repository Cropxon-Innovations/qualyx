import { useRef } from "react";
import { Cpu, Sparkles, Zap } from "lucide-react";

export const BrandMotionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 px-4 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg-subtle opacity-10" />

      {/* Floating glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[180px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "1s" }} />

      {/* Parallax orbs container */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-primary/30 blur-[1px] animate-float" />
        <div className="absolute top-[65%] left-[8%] w-2 h-2 rounded-full bg-secondary/25 blur-[1px] animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[25%] right-[12%] w-4 h-4 rounded-full bg-primary/20 blur-[2px] animate-float" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-[70%] right-[15%] w-2 h-2 rounded-full bg-secondary/20 blur-[1px] animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Central illustration */}
        <div className="relative mx-auto w-36 h-36 md:w-44 md:h-44 mb-10">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border border-secondary/20 animate-rotate-slow" />
          {/* Inner ring */}
          <div className="absolute inset-4 rounded-full border border-primary/15" style={{ animation: "spin 30s linear infinite reverse" }} />
          {/* Pulsing glow */}
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-glow-pulse" />
          {/* Core */}
          <div className="absolute inset-8 rounded-full bg-card/50 border border-border/40 flex items-center justify-center shadow-lg">
            <Cpu className="w-10 h-10 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
          </div>

          {/* Orbiting icons */}
          <div className="absolute w-8 h-8 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center" style={{ top: "-0.5rem", left: "50%", transform: "translateX(-50%)" }}>
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>
          <div className="absolute w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center" style={{ bottom: "0", left: "15%" }}>
            <Zap className="w-3.5 h-3.5 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
          <span className="gradient-text">Powered by AI, Built for Engineers</span>
        </h2>

        <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          QUALYX combines intelligent test generation, self-healing selectors, and deterministic execution — so your team ships with confidence.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
          {[
            { value: "10×", label: "Faster coverage" },
            { value: "85%", label: "Less maintenance" },
            { value: "Zero", label: "Lock-in" },
          ].map((stat) => (
            <div key={stat.label} className="group">
              <div className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

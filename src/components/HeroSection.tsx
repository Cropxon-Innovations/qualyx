import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { PipelineAnimation } from "./PipelineAnimation";
import { FloatingParticles, useParallax } from "./FloatingParticles";

export const HeroSection = () => {
  const parallaxBg = useParallax(0.01);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Charcoal background base */}
      <div className="absolute inset-0 bg-[hsl(220,15%,6%)]" />
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-15" />
      
      {/* Floating particles with parallax */}
      <FloatingParticles count={40} />
      
      {/* Parallax ambient glow effects */}
      <div ref={parallaxBg} className="absolute inset-0 transition-transform duration-1000 ease-out pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-[hsl(217,91%,60%,0.06)] rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-[hsl(190,100%,50%,0.04)] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[hsl(217,91%,60%,0.03)] rounded-full blur-[200px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/30 bg-card/20 backdrop-blur-md mb-8 opacity-0 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground/70 font-medium tracking-wide">Now accepting early access requests</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in delay-100">
              <span className="gradient-text-white">QUALYX</span>
              <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl text-muted-foreground/70 font-medium leading-tight">
                Autonomous QA you can trust
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-base sm:text-lg text-muted-foreground/60 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed opacity-0 animate-fade-in delay-200">
              AI-powered automation with session replay, hybrid execution, and enterprise-grade security.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in delay-300">
              <Button variant="hero" size="lg" className="group">
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button variant="hero-secondary" size="lg" className="group">
                <Play className="w-4 h-4 mr-1" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 pt-8 border-t border-border/20 opacity-0 animate-fade-in delay-500">
              <p className="text-[11px] text-muted-foreground/40 mb-5 uppercase tracking-[0.2em] font-medium">Trusted by engineering teams</p>
              <div className="flex items-center gap-10 justify-center lg:justify-start">
                {["Enterprise", "Startup", "Agency", "SaaS"].map((company) => (
                  <span key={company} className="text-sm font-medium text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors duration-300">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Pipeline Animation */}
          <div className="relative opacity-0 animate-fade-in delay-300">
            <PipelineAnimation />
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </section>
  );
};

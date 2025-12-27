import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { PipelineAnimation } from "./PipelineAnimation";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-glow-pulse delay-1000" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-6 opacity-0 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium">Now accepting early access requests</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in delay-100">
              <span className="gradient-text-white">QUALYX</span>
              <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl text-muted-foreground font-medium">
                Autonomous QA you can trust
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 opacity-0 animate-fade-in delay-200">
              AI-powered automation with session replay, hybrid execution, and enterprise-grade security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in delay-300">
              <Button variant="hero" size="lg" className="group">
                Join Waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="hero-secondary" size="lg" className="group">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/50 opacity-0 animate-fade-in delay-500">
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Trusted by engineering teams at</p>
              <div className="flex items-center gap-8 justify-center lg:justify-start opacity-50">
                {["Enterprise", "Startup", "Agency", "SaaS"].map((company) => (
                  <span key={company} className="text-sm font-medium text-muted-foreground">
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

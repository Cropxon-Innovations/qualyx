import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { PipelineAnimation } from "./PipelineAnimation";
import { FloatingParticles } from "./FloatingParticles";
import { VideoModal } from "./VideoModal";

export const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-8" />
      
      {/* Floating particles - reduced */}
      <FloatingParticles count={15} />
      
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[280px] h-[280px] bg-primary/4 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm mb-8 opacity-0 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground font-medium tracking-wide">Now accepting early access requests</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in delay-100">
              <span className="gradient-text-white">QUALYX</span>
              <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium leading-tight">
                Autonomous QA you can trust
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed opacity-0 animate-fade-in delay-200">
              AI-powered automation with session replay, hybrid execution, and enterprise-grade security.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in delay-300">
              <Button variant="hero" size="lg" className="group">
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="hero-secondary" 
                size="lg" 
                className="group"
                onClick={() => setIsVideoOpen(true)}
              >
                <Play className="w-4 h-4 mr-1" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-border/30 opacity-0 animate-fade-in delay-500">
              <p className="text-[11px] text-muted-foreground/50 mb-5 uppercase tracking-[0.2em] font-medium">Trusted by engineering teams</p>
              <div className="flex items-center gap-8 justify-center lg:justify-start flex-wrap">
                {["Enterprise", "Startup", "Agency", "SaaS"].map((company) => (
                  <span key={company} className="text-sm font-medium text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors duration-300">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Pipeline Animation */}
          <div className="relative opacity-0 animate-fade-in delay-200">
            <div className="relative rounded-2xl border border-border/25 bg-card/15 backdrop-blur-sm p-3 sm:p-5">
              <PipelineAnimation />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};
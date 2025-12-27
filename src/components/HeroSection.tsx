import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { HeroLiveDemo } from "./HeroLiveDemo";
import { FloatingParticles } from "./FloatingParticles";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-5" />
      
      {/* Floating particles */}
      <FloatingParticles count={12} />
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-secondary/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-primary/3 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm mb-6 sm:mb-8 opacity-0 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] sm:text-xs text-muted-foreground font-medium tracking-wide">Now accepting early access requests</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 opacity-0 animate-fade-in delay-100">
              <span className="gradient-text-white">QUALYX</span>
              <span className="block mt-2 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium leading-tight">
                Autonomous QA you can trust
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed opacity-0 animate-fade-in delay-200">
              AI-powered automation with session replay, hybrid execution, and enterprise-grade security.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start opacity-0 animate-fade-in delay-300">
              <Button variant="hero" size="lg" className="group text-sm sm:text-base">
                Join Waitlist
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Link to="/demo">
                <Button 
                  variant="hero-secondary" 
                  size="lg" 
                  className="group text-sm sm:text-base w-full"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Watch Demo
                </Button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border/30 opacity-0 animate-fade-in delay-500">
              <p className="text-[10px] sm:text-[11px] text-muted-foreground/50 mb-4 sm:mb-5 uppercase tracking-[0.2em] font-medium">Trusted by engineering teams</p>
              <div className="flex items-center gap-6 sm:gap-8 justify-center lg:justify-start flex-wrap">
                {["Enterprise", "Startup", "Agency", "SaaS"].map((company) => (
                  <span key={company} className="text-xs sm:text-sm font-medium text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors duration-300">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right: Live demo preview */}
          <div className="relative opacity-0 animate-fade-in delay-200 order-1 lg:order-2">
            <div className="glass-card-glow p-3 sm:p-4 md:p-5">
              <HeroLiveDemo />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
import { useState, useEffect, useRef } from "react";
import { Cloud, Server, Lock, Eye, Shield, ArrowLeftRight } from "lucide-react";

const features = [
  { icon: Lock, label: "Nothing sensitive leaves your network" },
  { icon: Server, label: "Tests execute locally" },
  { icon: ArrowLeftRight, label: "Reports sync securely" },
  { icon: Eye, label: "Full observability, zero exposure" },
];

export const HybridSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-white">Hybrid Architecture</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The best of both worlds — cloud convenience with on-premise security
          </p>
        </div>

        {/* Diagram */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Cloud */}
          <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="glass-card-glow p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">Cloud Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Central management & analytics</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {["Test orchestration", "Results aggregation", "Team collaboration", "CI/CD integrations"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: On-prem */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <div className="glass-card-glow p-8 rounded-2xl border-success/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                  <Server className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">On-Prem Runner</h3>
                  <p className="text-sm text-muted-foreground">Your infrastructure, your control</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {["Test execution", "Data processing", "Network isolation", "Credential vault"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Connection indicator */}
        <div className="hidden lg:flex items-center justify-center -mt-8 mb-8">
          <div className="flex items-center gap-4 glass-card px-6 py-3 rounded-full">
            <span className="text-sm text-muted-foreground">Outbound-only connection</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <div className="w-8 h-0.5 bg-gradient-to-r from-success to-primary" />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-sm text-muted-foreground">Secure sync</span>
          </div>
        </div>

        {/* Feature pills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeFeature;
            return (
              <div
                key={feature.label}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "glass-card-glow border-primary/30" 
                    : "glass-card hover:border-primary/20"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { 
  Monitor, 
  Code, 
  GitBranch, 
  Cpu, 
  FileText, 
  CheckCircle2,
  Activity,
  Database,
  Shield
} from "lucide-react";

const inputNodes = [
  { id: "ui", icon: Monitor, label: "UI Tests", delay: 0 },
  { id: "api", icon: Code, label: "API Tests", delay: 200 },
  { id: "ci", icon: GitBranch, label: "CI Pipeline", delay: 400 },
];

const outputNodes = [
  { id: "report", icon: FileText, label: "Reports", delay: 800 },
  { id: "logs", icon: Activity, label: "Logs", delay: 1000 },
  { id: "check", icon: CheckCircle2, label: "Validated", delay: 1200 },
];

export const PipelineAnimation = () => {
  const [activeInput, setActiveInput] = useState(0);
  const [coreActive, setCoreActive] = useState(false);
  const [outputsVisible, setOutputsVisible] = useState(false);
  const [dataFlowing, setDataFlowing] = useState(false);

  useEffect(() => {
    // Cycle through input nodes
    const inputCycle = setInterval(() => {
      setActiveInput((prev) => (prev + 1) % inputNodes.length);
    }, 2500);

    // Animate core activation
    const coreTimer = setTimeout(() => setCoreActive(true), 1200);
    const flowTimer = setTimeout(() => setDataFlowing(true), 800);
    const outputTimer = setTimeout(() => setOutputsVisible(true), 2000);

    return () => {
      clearInterval(inputCycle);
      clearTimeout(coreTimer);
      clearTimeout(flowTimer);
      clearTimeout(outputTimer);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto">
      {/* Ambient glow layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-primary/15 rounded-full blur-[80px] animate-pulse-glow" />
        <div className="absolute w-48 h-48 bg-secondary/10 rounded-full blur-[60px] animate-pulse-glow delay-500" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg-subtle rounded-2xl opacity-20" />

      {/* SVG Connection Lines & Particles */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 600 450"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Input line gradient */}
          <linearGradient id="inputLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.1" />
          </linearGradient>
          
          {/* Output line gradient */}
          <linearGradient id="outputLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--success))" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Input connection paths */}
        <path
          d="M 100 130 C 180 130, 220 225, 300 225"
          stroke="url(#inputLineGrad)"
          strokeWidth="1.5"
          fill="none"
          className={`transition-opacity duration-700 ${dataFlowing ? 'opacity-70' : 'opacity-30'}`}
        />
        <path
          d="M 100 225 L 300 225"
          stroke="url(#inputLineGrad)"
          strokeWidth="1.5"
          fill="none"
          className={`transition-opacity duration-700 ${dataFlowing ? 'opacity-70' : 'opacity-30'}`}
        />
        <path
          d="M 100 320 C 180 320, 220 225, 300 225"
          stroke="url(#inputLineGrad)"
          strokeWidth="1.5"
          fill="none"
          className={`transition-opacity duration-700 ${dataFlowing ? 'opacity-70' : 'opacity-30'}`}
        />

        {/* Output connection paths */}
        <path
          d="M 300 225 C 380 225, 420 130, 500 130"
          stroke="url(#outputLineGrad)"
          strokeWidth="1.5"
          fill="none"
          className={`transition-opacity duration-700 ${outputsVisible ? 'opacity-70' : 'opacity-0'}`}
        />
        <path
          d="M 300 225 L 500 225"
          stroke="url(#outputLineGrad)"
          strokeWidth="1.5"
          fill="none"
          className={`transition-opacity duration-700 ${outputsVisible ? 'opacity-70' : 'opacity-0'}`}
        />
        <path
          d="M 300 225 C 380 225, 420 320, 500 320"
          stroke="url(#outputLineGrad)"
          strokeWidth="1.5"
          fill="none"
          className={`transition-opacity duration-700 ${outputsVisible ? 'opacity-70' : 'opacity-0'}`}
        />

        {/* Animated data particles - Input */}
        {dataFlowing && (
          <>
            <circle r="4" fill="hsl(var(--neon-cyan))" filter="url(#glow)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 100 130 C 180 130, 220 225, 300 225" />
            </circle>
            <circle r="4" fill="hsl(var(--neon-cyan))" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 100 225 L 300 225" begin="0.3s" />
            </circle>
            <circle r="4" fill="hsl(var(--neon-cyan))" filter="url(#glow)">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M 100 320 C 180 320, 220 225, 300 225" begin="0.6s" />
            </circle>
          </>
        )}

        {/* Animated data particles - Output */}
        {outputsVisible && (
          <>
            <circle r="4" fill="hsl(var(--success))" filter="url(#glow)">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 300 225 C 380 225, 420 130, 500 130" />
            </circle>
            <circle r="4" fill="hsl(var(--success))" filter="url(#glow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 300 225 L 500 225" begin="0.4s" />
            </circle>
            <circle r="4" fill="hsl(var(--success))" filter="url(#glow)">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 300 225 C 380 225, 420 320, 500 320" begin="0.8s" />
            </circle>
          </>
        )}
      </svg>

      {/* Input Nodes */}
      <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 sm:gap-10">
        {inputNodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeInput === index;
          return (
            <div
              key={node.id}
              className={`glass-card p-3 sm:p-4 rounded-xl transition-all duration-500 ${
                isActive ? "border-primary/60 shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)]" : "border-border/30"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Core - Central Processing */}
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${coreActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl opacity-60 animate-pulse" />
          
          {/* Rotating outer ring */}
          <div 
            className="absolute -inset-8 border border-primary/20 rounded-full"
            style={{ animation: "spin 25s linear infinite" }}
          />
          <div 
            className="absolute -inset-12 border border-primary/10 rounded-full"
            style={{ animation: "spin 35s linear infinite reverse" }}
          />
          
          {/* Core card */}
          <div className="relative glass-card-glow p-5 sm:p-6 rounded-2xl bg-card/60">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                <div className="absolute inset-0 animate-ping opacity-30">
                  <Cpu className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm sm:text-base font-semibold gradient-text block">AI Core</span>
                <span className="text-xs text-muted-foreground">Processing</span>
              </div>
            </div>
          </div>

          {/* Processing indicators */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            <Database className="w-3 h-3 text-muted-foreground" />
            <Shield className="w-3 h-3 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Output Nodes */}
      <div className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-6 sm:gap-10 transition-all duration-700 ${outputsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
        {outputNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="glass-card p-3 sm:p-4 rounded-xl border-success/30 hover:border-success/50 transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--success)/0.2)]"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">{node.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom labels */}
      <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] sm:text-xs text-muted-foreground/70 uppercase tracking-wider">
        <span>Inputs</span>
        <span>AI Engine</span>
        <span>Outputs</span>
      </div>
    </div>
  );
};

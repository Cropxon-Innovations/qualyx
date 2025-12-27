import { useEffect, useState } from "react";
import { 
  Monitor, 
  Code, 
  GitBranch, 
  FileText, 
  CheckCircle2,
  Activity,
  Hexagon
} from "lucide-react";

const inputNodes = [
  { id: "ui", icon: Monitor, label: "UI Tests" },
  { id: "api", icon: Code, label: "API Tests" },
  { id: "ci", icon: GitBranch, label: "CI Pipeline" },
];

const outputNodes = [
  { id: "report", icon: FileText, label: "Reports" },
  { id: "logs", icon: Activity, label: "Logs" },
  { id: "check", icon: CheckCircle2, label: "Validated" },
];

export const PipelineAnimation = () => {
  const [activeInput, setActiveInput] = useState(0);
  const [engineActive, setEngineActive] = useState(false);
  const [outputsVisible, setOutputsVisible] = useState(false);

  useEffect(() => {
    // Slow, deliberate cycling through input nodes
    const inputCycle = setInterval(() => {
      setActiveInput((prev) => (prev + 1) % inputNodes.length);
    }, 3000);

    // Staggered activation
    const engineTimer = setTimeout(() => setEngineActive(true), 1500);
    const outputTimer = setTimeout(() => setOutputsVisible(true), 2500);

    return () => {
      clearInterval(inputCycle);
      clearTimeout(engineTimer);
      clearTimeout(outputTimer);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] max-w-xl mx-auto">
      {/* Ambient glow - subtle blue */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 bg-[hsl(217,91%,60%,0.1)] rounded-full blur-[100px]" />
      </div>

      {/* Glassmorphism container */}
      <div className="absolute inset-4 rounded-2xl border border-border/20 bg-card/20 backdrop-blur-sm overflow-hidden">
        {/* Subtle inner grid */}
        <div className="absolute inset-0 grid-bg-subtle opacity-30" />
      </div>

      {/* SVG Connection Lines & Data Particles */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 560 420"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle blue gradient for input lines */}
          <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217,91%,60%)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="hsl(217,91%,60%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(217,91%,60%)" stopOpacity="0.05" />
          </linearGradient>
          
          {/* Success gradient for output lines */}
          <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142,76%,45%)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="hsl(142,76%,45%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(142,76%,45%)" stopOpacity="0.05" />
          </linearGradient>

          {/* Subtle glow filter */}
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Input paths - smooth curves */}
        <path
          d="M 90 115 C 160 115, 200 210, 280 210"
          stroke="url(#inputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1000"
          opacity={engineActive ? 0.8 : 0.3}
        />
        <path
          d="M 90 210 L 280 210"
          stroke="url(#inputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1000"
          opacity={engineActive ? 0.8 : 0.3}
        />
        <path
          d="M 90 305 C 160 305, 200 210, 280 210"
          stroke="url(#inputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1000"
          opacity={engineActive ? 0.8 : 0.3}
        />

        {/* Output paths */}
        <path
          d="M 280 210 C 360 210, 400 115, 470 115"
          stroke="url(#outputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1000"
          opacity={outputsVisible ? 0.8 : 0}
        />
        <path
          d="M 280 210 L 470 210"
          stroke="url(#outputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1000"
          opacity={outputsVisible ? 0.8 : 0}
        />
        <path
          d="M 280 210 C 360 210, 400 305, 470 305"
          stroke="url(#outputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1000"
          opacity={outputsVisible ? 0.8 : 0}
        />

        {/* Slow-moving data particles - Input */}
        {engineActive && (
          <>
            <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 90 115 C 160 115, 200 210, 280 210" />
            </circle>
            <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 90 210 L 280 210" begin="0.5s" />
            </circle>
            <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="4.2s" repeatCount="indefinite" path="M 90 305 C 160 305, 200 210, 280 210" begin="1s" />
            </circle>
          </>
        )}

        {/* Slow-moving data particles - Output */}
        {outputsVisible && (
          <>
            <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M 280 210 C 360 210, 400 115, 470 115" />
            </circle>
            <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 280 210 L 470 210" begin="0.7s" />
            </circle>
            <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8" filter="url(#softGlow)">
              <animateMotion dur="3.8s" repeatCount="indefinite" path="M 280 210 C 360 210, 400 305, 470 305" begin="1.2s" />
            </circle>
          </>
        )}
      </svg>

      {/* Input Nodes - Glassmorphism cards */}
      <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex flex-col gap-8 sm:gap-12">
        {inputNodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeInput === index;
          return (
            <div
              key={node.id}
              className={`
                relative px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg 
                bg-card/40 backdrop-blur-md border 
                transition-all duration-700 ease-out
                ${isActive 
                  ? "border-secondary/50 shadow-[0_0_25px_hsl(217,91%,60%,0.15)]" 
                  : "border-border/30"
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${
                    isActive ? "text-secondary" : "text-muted-foreground/60"
                  }`} 
                />
                <span 
                  className={`text-xs sm:text-sm font-medium transition-colors duration-500 ${
                    isActive ? "text-foreground/90" : "text-muted-foreground/60"
                  }`}
                >
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUALYX Engine - Central core */}
      <div 
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          transition-all duration-1000 ease-out
          ${engineActive ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        <div className="relative">
          {/* Outer subtle glow */}
          <div className="absolute -inset-8 bg-[hsl(217,91%,60%,0.08)] rounded-full blur-2xl" />
          
          {/* Rotating rings - very slow, subtle */}
          <div 
            className="absolute -inset-6 border border-secondary/10 rounded-full"
            style={{ animation: "spin 40s linear infinite" }}
          />
          <div 
            className="absolute -inset-10 border border-secondary/5 rounded-full"
            style={{ animation: "spin 60s linear infinite reverse" }}
          />
          
          {/* Core glassmorphism card */}
          <div className="relative px-5 py-4 sm:px-6 sm:py-5 rounded-xl bg-card/50 backdrop-blur-lg border border-border/40 shadow-[0_0_40px_hsl(217,91%,60%,0.1)]">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Hexagon className="w-8 h-8 sm:w-10 sm:h-10 text-secondary/80" strokeWidth={1.5} />
                {/* Inner subtle pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-secondary/60 rounded-full animate-pulse" />
                </div>
              </div>
              <div className="text-center">
                <span className="text-xs sm:text-sm font-semibold text-foreground/90 tracking-wide">QUALYX Engine</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Output Nodes */}
      <div 
        className={`
          absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-8 sm:gap-12
          transition-all duration-1000 ease-out
          ${outputsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
        `}
      >
        {outputNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="relative px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-card/40 backdrop-blur-md border border-success/20 transition-all duration-300 hover:border-success/40 hover:shadow-[0_0_20px_hsl(142,76%,45%,0.1)]"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-success/80" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground/70">{node.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom labels - minimal */}
      <div className="absolute bottom-6 left-8 right-8 flex justify-between text-[10px] text-muted-foreground/40 uppercase tracking-[0.15em] font-medium">
        <span>Input</span>
        <span>Processing</span>
        <span>Output</span>
      </div>
    </div>
  );
};

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
    const inputCycle = setInterval(() => {
      setActiveInput((prev) => (prev + 1) % inputNodes.length);
    }, 3000);

    const engineTimer = setTimeout(() => setEngineActive(true), 1000);
    const outputTimer = setTimeout(() => setOutputsVisible(true), 2000);

    return () => {
      clearInterval(inputCycle);
      clearTimeout(engineTimer);
      clearTimeout(outputTimer);
    };
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px]">
      {/* SVG for connection lines */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGradIn" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(217,91%,60%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(217,91%,60%)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="lineGradOut" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142,76%,45%)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(142,76%,45%)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Input lines */}
        <line 
          x1="22%" y1="18%" x2="42%" y2="50%" 
          stroke="url(#lineGradIn)" 
          strokeWidth="1.5"
          className={`transition-opacity duration-700 ${engineActive ? 'opacity-100' : 'opacity-20'}`}
        />
        <line 
          x1="22%" y1="50%" x2="42%" y2="50%" 
          stroke="url(#lineGradIn)" 
          strokeWidth="1.5"
          className={`transition-opacity duration-700 ${engineActive ? 'opacity-100' : 'opacity-20'}`}
        />
        <line 
          x1="22%" y1="82%" x2="42%" y2="50%" 
          stroke="url(#lineGradIn)" 
          strokeWidth="1.5"
          className={`transition-opacity duration-700 ${engineActive ? 'opacity-100' : 'opacity-20'}`}
        />
        
        {/* Output lines */}
        <line 
          x1="58%" y1="50%" x2="78%" y2="18%" 
          stroke="url(#lineGradOut)" 
          strokeWidth="1.5"
          className={`transition-opacity duration-700 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`}
        />
        <line 
          x1="58%" y1="50%" x2="78%" y2="50%" 
          stroke="url(#lineGradOut)" 
          strokeWidth="1.5"
          className={`transition-opacity duration-700 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`}
        />
        <line 
          x1="58%" y1="50%" x2="78%" y2="82%" 
          stroke="url(#lineGradOut)" 
          strokeWidth="1.5"
          className={`transition-opacity duration-700 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Animated particles on input lines */}
        {engineActive && (
          <>
            <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8">
              <animate attributeName="cx" values="22%;42%" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="18%;50%" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8">
              <animate attributeName="cx" values="22%;42%" dur="2.2s" repeatCount="indefinite" begin="0.4s" />
              <animate attributeName="cy" values="50%;50%" dur="2.2s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8">
              <animate attributeName="cx" values="22%;42%" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
              <animate attributeName="cy" values="82%;50%" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
            </circle>
          </>
        )}
        
        {/* Animated particles on output lines */}
        {outputsVisible && (
          <>
            <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8">
              <animate attributeName="cx" values="58%;78%" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="50%;18%" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8">
              <animate attributeName="cx" values="58%;78%" dur="2.2s" repeatCount="indefinite" begin="0.4s" />
              <animate attributeName="cy" values="50%;50%" dur="2.2s" repeatCount="indefinite" begin="0.4s" />
            </circle>
            <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8">
              <animate attributeName="cx" values="58%;78%" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
              <animate attributeName="cy" values="50%;82%" dur="2.4s" repeatCount="indefinite" begin="0.8s" />
            </circle>
          </>
        )}
      </svg>

      {/* Input Nodes - Left side */}
      <div className="absolute left-0 top-0 bottom-0 w-[22%] flex flex-col justify-between py-4">
        {inputNodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeInput === index;
          return (
            <div
              key={node.id}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg
                bg-card/50 backdrop-blur-sm border transition-all duration-300
                ${isActive 
                  ? "border-secondary/50 shadow-[0_0_15px_hsl(217,91%,60%,0.2)]" 
                  : "border-border/30"
                }
              `}
            >
              <Icon 
                className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                  isActive ? "text-secondary" : "text-muted-foreground/50"
                }`} 
                strokeWidth={1.5}
              />
              <span className={`text-[11px] sm:text-xs font-medium transition-colors duration-300 ${
                isActive ? "text-foreground" : "text-muted-foreground/60"
              }`}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Engine */}
      <div 
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          transition-all duration-500 ease-out z-10
          ${engineActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        {/* Glow background */}
        <div className="absolute -inset-6 bg-secondary/10 rounded-full blur-2xl" />
        
        {/* Rotating ring */}
        <div 
          className="absolute -inset-4 border border-secondary/20 rounded-full"
          style={{ animation: "spin 30s linear infinite" }}
        />
        
        {/* Core */}
        <div className="relative px-4 py-3 rounded-xl bg-card/60 backdrop-blur-md border border-border/40 shadow-[0_0_25px_hsl(217,91%,60%,0.1)]">
          <div className="flex flex-col items-center gap-1.5">
            <Hexagon className="w-7 h-7 text-secondary/70" strokeWidth={1} />
            <span className="text-[11px] sm:text-xs font-semibold text-foreground/80">QUALYX</span>
          </div>
        </div>
      </div>

      {/* Output Nodes - Right side */}
      <div 
        className={`
          absolute right-0 top-0 bottom-0 w-[22%] flex flex-col justify-between py-4
          transition-all duration-500 ease-out
          ${outputsVisible ? "opacity-100" : "opacity-0 translate-x-4"}
        `}
      >
        {outputNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-success/30 transition-all duration-300 hover:border-success/50 hover:shadow-[0_0_12px_hsl(142,76%,45%,0.15)]"
            >
              <Icon className="w-4 h-4 flex-shrink-0 text-success/70" strokeWidth={1.5} />
              <span className="text-[11px] sm:text-xs font-medium text-muted-foreground/70">
                {node.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Flow label */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/30">
        <span className="text-[9px] uppercase tracking-widest">Input</span>
        <span className="text-[10px]">→</span>
        <span className="text-[9px] uppercase tracking-widest">AI</span>
        <span className="text-[10px]">→</span>
        <span className="text-[9px] uppercase tracking-widest">Output</span>
      </div>
    </div>
  );
};
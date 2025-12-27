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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const inputNodes = [
  { 
    id: "ui", 
    icon: Monitor, 
    label: "UI Tests",
    caption: "Record & replay real user flows",
    tooltip: "QUALYX records UI behavior and converts it into real Playwright scripts."
  },
  { 
    id: "api", 
    icon: Code, 
    label: "API Tests",
    caption: "Validate requests, responses and contracts",
    tooltip: "Test REST and GraphQL endpoints with automatic contract validation."
  },
  { 
    id: "ci", 
    icon: GitBranch, 
    label: "CI Pipeline",
    caption: "Execute automatically inside DevOps",
    tooltip: "Seamless integration with GitHub Actions, GitLab CI, and Jenkins."
  },
];

const outputNodes = [
  { 
    id: "report", 
    icon: FileText, 
    label: "Reports",
    caption: "Clear execution insights",
    tooltip: "Comprehensive test reports with screenshots, videos, and metrics."
  },
  { 
    id: "logs", 
    icon: Activity, 
    label: "Logs",
    caption: "Full debugging visibility",
    tooltip: "Complete execution logs with timeline and error traces."
  },
  { 
    id: "check", 
    icon: CheckCircle2, 
    label: "Validated",
    caption: "Reliable pass/fail decisions",
    tooltip: "Deterministic test results you can trust in production."
  },
];

export const PipelineAnimation = () => {
  const [activeInput, setActiveInput] = useState(0);
  const [engineActive, setEngineActive] = useState(false);
  const [outputsVisible, setOutputsVisible] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const inputCycle = setInterval(() => {
      setActiveInput((prev) => (prev + 1) % inputNodes.length);
    }, 3000);

    const engineTimer = setTimeout(() => setEngineActive(true), 800);
    const outputTimer = setTimeout(() => setOutputsVisible(true), 1600);

    return () => {
      clearInterval(inputCycle);
      clearTimeout(engineTimer);
      clearTimeout(outputTimer);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative w-full h-[340px] sm:h-[400px]">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 bg-secondary/8 rounded-full blur-[80px]" />
        </div>

        {/* SVG Connection Lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="inputLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(217,91%,60%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(217,91%,60%)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="outputLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(142,76%,45%)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(142,76%,45%)" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          
          {/* Input connection lines */}
          <line x1="28" y1="20" x2="44" y2="50" stroke="url(#inputLine)" strokeWidth="0.3" 
            className={`transition-opacity duration-500 ${engineActive ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="28" y1="50" x2="44" y2="50" stroke="url(#inputLine)" strokeWidth="0.3"
            className={`transition-opacity duration-500 ${engineActive ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="28" y1="80" x2="44" y2="50" stroke="url(#inputLine)" strokeWidth="0.3"
            className={`transition-opacity duration-500 ${engineActive ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Output connection lines */}
          <line x1="56" y1="50" x2="72" y2="20" stroke="url(#outputLine)" strokeWidth="0.3"
            className={`transition-opacity duration-500 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="56" y1="50" x2="72" y2="50" stroke="url(#outputLine)" strokeWidth="0.3"
            className={`transition-opacity duration-500 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="56" y1="50" x2="72" y2="80" stroke="url(#outputLine)" strokeWidth="0.3"
            className={`transition-opacity duration-500 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`} />
        </svg>

        {/* Animated particles on lines */}
        {engineActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Input particles */}
            <div className="absolute w-1.5 h-1.5 bg-secondary rounded-full blur-[1px] animate-particle-in-1" />
            <div className="absolute w-1.5 h-1.5 bg-secondary rounded-full blur-[1px] animate-particle-in-2" />
            <div className="absolute w-1.5 h-1.5 bg-secondary rounded-full blur-[1px] animate-particle-in-3" />
            
            {/* Output particles */}
            {outputsVisible && (
              <>
                <div className="absolute w-1.5 h-1.5 bg-success rounded-full blur-[1px] animate-particle-out-1" />
                <div className="absolute w-1.5 h-1.5 bg-success rounded-full blur-[1px] animate-particle-out-2" />
                <div className="absolute w-1.5 h-1.5 bg-success rounded-full blur-[1px] animate-particle-out-3" />
              </>
            )}
          </div>
        )}

        {/* INPUT NODES - Left Column */}
        <div className="absolute left-0 top-0 bottom-0 w-[28%] flex flex-col justify-center gap-4 sm:gap-5 py-6">
          {inputNodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeInput === index;
            const isHovered = hoveredNode === node.id;
            
            return (
              <Tooltip key={node.id}>
                <TooltipTrigger asChild>
                  <div
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`
                      relative px-3 py-2.5 rounded-xl cursor-pointer
                      bg-card/50 backdrop-blur-sm border transition-all duration-300 ease-out
                      ${isActive || isHovered
                        ? "border-secondary/50 shadow-[0_0_20px_hsl(217,91%,60%,0.15)]" 
                        : "border-border/30"
                      }
                      ${isHovered ? "scale-[1.02]" : "scale-100"}
                    `}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        transition-colors duration-300
                        ${isActive || isHovered ? "bg-secondary/15" : "bg-muted/30"}
                      `}>
                        <Icon 
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isActive || isHovered ? "text-secondary" : "text-muted-foreground/50"
                          }`} 
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs sm:text-sm font-medium block transition-colors duration-300 ${
                          isActive || isHovered ? "text-foreground" : "text-muted-foreground/70"
                        }`}>
                          {node.label}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground/50 leading-tight block mt-0.5">
                          {node.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="left" 
                  className="max-w-[200px] bg-card/95 backdrop-blur-xl border-border/50 text-xs"
                >
                  {node.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* AI CORE - Center */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              onMouseEnter={() => setHoveredNode("engine")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10
                transition-all duration-500 ease-out
                ${engineActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                ${hoveredNode === "engine" ? "scale-[1.02]" : ""}
              `}
            >
              {/* Outer glow */}
              <div className={`
                absolute -inset-8 rounded-full blur-2xl transition-all duration-500
                ${hoveredNode === "engine" ? "bg-secondary/15" : "bg-secondary/8"}
              `} />
              
              {/* Orbiting particles */}
              <div className="absolute -inset-6 pointer-events-none">
                <div className="absolute w-1 h-1 bg-secondary/50 rounded-full animate-orbit-1" />
                <div className="absolute w-1.5 h-1.5 bg-secondary/40 rounded-full animate-orbit-2" />
                <div className="absolute w-1 h-1 bg-secondary/30 rounded-full animate-orbit-3" />
              </div>
              
              {/* Rotating rings */}
              <div 
                className={`absolute -inset-5 border rounded-full transition-colors duration-500 ${
                  hoveredNode === "engine" ? "border-secondary/25" : "border-secondary/10"
                }`}
                style={{ animation: "spin 40s linear infinite" }}
              />
              <div 
                className={`absolute -inset-8 border rounded-full transition-colors duration-500 ${
                  hoveredNode === "engine" ? "border-secondary/15" : "border-secondary/5"
                }`}
                style={{ animation: "spin 60s linear infinite reverse" }}
              />
              
              {/* Core card */}
              <div className={`
                relative px-5 py-4 rounded-xl bg-card/60 backdrop-blur-md border transition-all duration-300
                ${hoveredNode === "engine" 
                  ? "border-secondary/40 shadow-[0_0_30px_hsl(217,91%,60%,0.15)]"
                  : "border-border/40 shadow-[0_0_20px_hsl(217,91%,60%,0.08)]"
                }
              `}>
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <Hexagon className="w-10 h-10 text-secondary/60" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-secondary/50 rounded-full animate-pulse-slow" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-foreground/90 block">QUALYX Engine</span>
                    <span className="text-[9px] text-muted-foreground/50 block mt-0.5 max-w-[120px]">
                      AI-assisted, deterministic automation core
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="max-w-[220px] bg-card/95 backdrop-blur-xl border-border/50 text-xs"
          >
            The QUALYX Engine processes test inputs using AI-assisted analysis to produce reliable, deterministic automation results.
          </TooltipContent>
        </Tooltip>

        {/* OUTPUT NODES - Right Column */}
        <div className={`
          absolute right-0 top-0 bottom-0 w-[28%] flex flex-col justify-center gap-4 sm:gap-5 py-6
          transition-all duration-500 ease-out
          ${outputsVisible ? "opacity-100" : "opacity-0 translate-x-4"}
        `}>
          {outputNodes.map((node) => {
            const Icon = node.icon;
            const isHovered = hoveredNode === node.id;
            
            return (
              <Tooltip key={node.id}>
                <TooltipTrigger asChild>
                  <div
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className={`
                      relative px-3 py-2.5 rounded-xl cursor-pointer
                      bg-card/50 backdrop-blur-sm border transition-all duration-300 ease-out
                      ${isHovered 
                        ? "border-success/50 shadow-[0_0_20px_hsl(142,76%,45%,0.15)] scale-[1.02]" 
                        : "border-success/25"
                      }
                    `}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        transition-colors duration-300
                        ${isHovered ? "bg-success/15" : "bg-success/5"}
                      `}>
                        <Icon 
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isHovered ? "text-success" : "text-success/60"
                          }`} 
                          strokeWidth={1.5} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs sm:text-sm font-medium block transition-colors duration-300 ${
                          isHovered ? "text-foreground" : "text-muted-foreground/70"
                        }`}>
                          {node.label}
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground/50 leading-tight block mt-0.5">
                          {node.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  className="max-w-[200px] bg-card/95 backdrop-blur-xl border-border/50 text-xs"
                >
                  {node.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Flow indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 text-muted-foreground/35">
          <span className="text-[9px] uppercase tracking-[0.15em] font-medium">Input</span>
          <div className="w-6 h-px bg-gradient-to-r from-secondary/40 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.15em] font-medium">AI Core</span>
          <div className="w-6 h-px bg-gradient-to-r from-transparent to-success/40" />
          <span className="text-[9px] uppercase tracking-[0.15em] font-medium">Output</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        @keyframes orbit-1 {
          from { transform: rotate(0deg) translateX(24px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(24px) rotate(-360deg); }
        }
        .animate-orbit-1 {
          animation: orbit-1 15s linear infinite;
          top: 50%; left: 50%;
        }
        
        @keyframes orbit-2 {
          from { transform: rotate(120deg) translateX(28px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(28px) rotate(-480deg); }
        }
        .animate-orbit-2 {
          animation: orbit-2 20s linear infinite reverse;
          top: 50%; left: 50%;
        }
        
        @keyframes orbit-3 {
          from { transform: rotate(240deg) translateX(20px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(20px) rotate(-600deg); }
        }
        .animate-orbit-3 {
          animation: orbit-3 25s linear infinite;
          top: 50%; left: 50%;
        }
        
        @keyframes particle-in-1 {
          0% { top: 15%; left: 24%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 48%; left: 42%; opacity: 0; }
        }
        .animate-particle-in-1 {
          animation: particle-in-1 3s ease-in-out infinite;
        }
        
        @keyframes particle-in-2 {
          0% { top: 48%; left: 24%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 48%; left: 42%; opacity: 0; }
        }
        .animate-particle-in-2 {
          animation: particle-in-2 3.5s ease-in-out infinite 0.5s;
        }
        
        @keyframes particle-in-3 {
          0% { top: 80%; left: 24%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 48%; left: 42%; opacity: 0; }
        }
        .animate-particle-in-3 {
          animation: particle-in-3 4s ease-in-out infinite 1s;
        }
        
        @keyframes particle-out-1 {
          0% { top: 48%; left: 56%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 15%; left: 74%; opacity: 0; }
        }
        .animate-particle-out-1 {
          animation: particle-out-1 3s ease-in-out infinite 0.3s;
        }
        
        @keyframes particle-out-2 {
          0% { top: 48%; left: 56%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 48%; left: 74%; opacity: 0; }
        }
        .animate-particle-out-2 {
          animation: particle-out-2 3.5s ease-in-out infinite 0.8s;
        }
        
        @keyframes particle-out-3 {
          0% { top: 48%; left: 56%; opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { top: 80%; left: 74%; opacity: 0; }
        }
        .animate-particle-out-3 {
          animation: particle-out-3 4s ease-in-out infinite 1.3s;
        }
      `}</style>
    </TooltipProvider>
  );
};
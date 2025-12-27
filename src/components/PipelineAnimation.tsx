import { useEffect, useState } from "react";
import { 
  Monitor, 
  Code, 
  GitBranch, 
  FileText, 
  CheckCircle2,
  Activity,
  Cpu
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
      <div className="relative w-full h-[300px] sm:h-[340px] md:h-[380px]">
        {/* SVG Connection Lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="inputLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(217,91%,60%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(217,91%,60%)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="outputLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(142,76%,45%)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(142,76%,45%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Input lines */}
          <line x1="30" y1="20" x2="44" y2="50" stroke="url(#inputLine)" strokeWidth="0.25" 
            className={`transition-opacity duration-500 ${engineActive ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="30" y1="50" x2="44" y2="50" stroke="url(#inputLine)" strokeWidth="0.25"
            className={`transition-opacity duration-500 ${engineActive ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="30" y1="80" x2="44" y2="50" stroke="url(#inputLine)" strokeWidth="0.25"
            className={`transition-opacity duration-500 ${engineActive ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Output lines */}
          <line x1="56" y1="50" x2="70" y2="20" stroke="url(#outputLine)" strokeWidth="0.25"
            className={`transition-opacity duration-500 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="56" y1="50" x2="70" y2="50" stroke="url(#outputLine)" strokeWidth="0.25"
            className={`transition-opacity duration-500 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`} />
          <line x1="56" y1="50" x2="70" y2="80" stroke="url(#outputLine)" strokeWidth="0.25"
            className={`transition-opacity duration-500 ${outputsVisible ? 'opacity-100' : 'opacity-0'}`} />
        </svg>

        {/* Animated particles */}
        {engineActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-1.5 h-1.5 bg-secondary/60 rounded-full blur-[1px] animate-particle-in-1" />
            <div className="absolute w-1.5 h-1.5 bg-secondary/60 rounded-full blur-[1px] animate-particle-in-2" />
            <div className="absolute w-1.5 h-1.5 bg-secondary/60 rounded-full blur-[1px] animate-particle-in-3" />
            {outputsVisible && (
              <>
                <div className="absolute w-1.5 h-1.5 bg-success/60 rounded-full blur-[1px] animate-particle-out-1" />
                <div className="absolute w-1.5 h-1.5 bg-success/60 rounded-full blur-[1px] animate-particle-out-2" />
                <div className="absolute w-1.5 h-1.5 bg-success/60 rounded-full blur-[1px] animate-particle-out-3" />
              </>
            )}
          </div>
        )}

        {/* INPUT NODES */}
        <div className="absolute left-0 top-0 bottom-0 w-[30%] flex flex-col justify-center gap-3 sm:gap-4 py-4">
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
                      relative px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg cursor-pointer
                      bg-card/40 backdrop-blur-sm border transition-all duration-300 ease-out
                      ${isActive || isHovered
                        ? "border-secondary/40 shadow-[0_0_15px_hsl(217,91%,60%,0.12)]" 
                        : "border-border/25"
                      }
                      ${isHovered ? "scale-[1.02]" : "scale-100"}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`
                        w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center flex-shrink-0
                        transition-colors duration-300
                        ${isActive || isHovered ? "bg-secondary/15" : "bg-muted/20"}
                      `}>
                        <Icon 
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors duration-300 ${
                            isActive || isHovered ? "text-secondary" : "text-muted-foreground/50"
                          }`} 
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] sm:text-xs font-medium block transition-colors duration-300 ${
                          isActive || isHovered ? "text-foreground" : "text-muted-foreground/70"
                        }`}>
                          {node.label}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-muted-foreground/40 leading-tight block mt-0.5 hidden sm:block">
                          {node.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="left" 
                  className="max-w-[180px] bg-card/95 backdrop-blur-xl border-border/50 text-[11px]"
                >
                  {node.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* AI CORE - Clean chip design */}
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
              {/* Outer glow - no box */}
              <div className={`
                absolute -inset-10 rounded-full blur-3xl transition-all duration-500 pointer-events-none
                ${hoveredNode === "engine" ? "bg-secondary/12" : "bg-secondary/6"}
              `} />
              
              {/* Orbiting particles */}
              <div className="absolute -inset-8 pointer-events-none">
                <div className="absolute w-1 h-1 bg-secondary/40 rounded-full animate-orbit-1" />
                <div className="absolute w-1 h-1 bg-secondary/30 rounded-full animate-orbit-2" />
                <div className="absolute w-0.5 h-0.5 bg-secondary/25 rounded-full animate-orbit-3" />
              </div>
              
              {/* Rotating ring */}
              <div 
                className={`absolute -inset-6 border rounded-full transition-colors duration-500 ${
                  hoveredNode === "engine" ? "border-secondary/20" : "border-secondary/8"
                }`}
                style={{ animation: "spin 50s linear infinite" }}
              />
              
              {/* Core - Clean chip style */}
              <div className={`
                relative px-4 py-3 sm:px-5 sm:py-4 rounded-xl transition-all duration-300
                bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md
                border ${hoveredNode === "engine" 
                  ? "border-secondary/35 shadow-[0_0_25px_hsl(217,91%,60%,0.12)]"
                  : "border-border/30 shadow-[0_0_15px_hsl(217,91%,60%,0.06)]"
                }
              `}>
                <div className="flex flex-col items-center gap-2">
                  {/* Chip icon */}
                  <div className="relative">
                    <div className={`
                      w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center
                      bg-gradient-to-br from-secondary/20 to-secondary/5
                      border transition-colors duration-300
                      ${hoveredNode === "engine" ? "border-secondary/40" : "border-secondary/20"}
                    `}>
                      <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-secondary/80" strokeWidth={1.5} />
                      {/* Pulse indicator */}
                      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    </div>
                    {/* Circuit lines */}
                    <div className="absolute -left-2 top-1/2 w-2 h-px bg-secondary/20" />
                    <div className="absolute -right-2 top-1/2 w-2 h-px bg-secondary/20" />
                    <div className="absolute left-1/2 -top-2 w-px h-2 bg-secondary/20" />
                    <div className="absolute left-1/2 -bottom-2 w-px h-2 bg-secondary/20" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs sm:text-sm font-semibold text-foreground/90 block">QUALYX Engine</span>
                    <span className="text-[8px] sm:text-[9px] text-muted-foreground/50 block mt-0.5 max-w-[100px] sm:max-w-[120px] leading-tight">
                      AI-assisted automation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="max-w-[200px] bg-card/95 backdrop-blur-xl border-border/50 text-[11px]"
          >
            The QUALYX Engine processes test inputs using AI-assisted analysis to produce reliable, deterministic automation.
          </TooltipContent>
        </Tooltip>

        {/* OUTPUT NODES */}
        <div className={`
          absolute right-0 top-0 bottom-0 w-[30%] flex flex-col justify-center gap-3 sm:gap-4 py-4
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
                      relative px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg cursor-pointer
                      bg-card/40 backdrop-blur-sm border transition-all duration-300 ease-out
                      ${isHovered 
                        ? "border-success/40 shadow-[0_0_15px_hsl(142,76%,45%,0.12)] scale-[1.02]" 
                        : "border-success/20"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`
                        w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center flex-shrink-0
                        transition-colors duration-300
                        ${isHovered ? "bg-success/15" : "bg-success/5"}
                      `}>
                        <Icon 
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors duration-300 ${
                            isHovered ? "text-success" : "text-success/60"
                          }`} 
                          strokeWidth={1.5} 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] sm:text-xs font-medium block transition-colors duration-300 ${
                          isHovered ? "text-foreground" : "text-muted-foreground/70"
                        }`}>
                          {node.label}
                        </span>
                        <span className="text-[8px] sm:text-[9px] text-muted-foreground/40 leading-tight block mt-0.5 hidden sm:block">
                          {node.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  className="max-w-[180px] bg-card/95 backdrop-blur-xl border-border/50 text-[11px]"
                >
                  {node.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Flow label */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground/30">
          <span className="text-[8px] uppercase tracking-widest font-medium">Input</span>
          <div className="w-4 h-px bg-gradient-to-r from-secondary/30 to-transparent" />
          <span className="text-[8px] uppercase tracking-widest font-medium">AI</span>
          <div className="w-4 h-px bg-gradient-to-r from-transparent to-success/30" />
          <span className="text-[8px] uppercase tracking-widest font-medium">Output</span>
        </div>
      </div>

      <style>{`
        @keyframes orbit-1 {
          from { transform: rotate(0deg) translateX(28px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
        }
        .animate-orbit-1 { animation: orbit-1 20s linear infinite; top: 50%; left: 50%; }
        
        @keyframes orbit-2 {
          from { transform: rotate(120deg) translateX(32px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(32px) rotate(-480deg); }
        }
        .animate-orbit-2 { animation: orbit-2 28s linear infinite reverse; top: 50%; left: 50%; }
        
        @keyframes orbit-3 {
          from { transform: rotate(240deg) translateX(24px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(24px) rotate(-600deg); }
        }
        .animate-orbit-3 { animation: orbit-3 35s linear infinite; top: 50%; left: 50%; }
        
        @keyframes particle-in-1 {
          0% { top: 18%; left: 26%; opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { top: 48%; left: 42%; opacity: 0; }
        }
        .animate-particle-in-1 { animation: particle-in-1 3.5s ease-in-out infinite; }
        
        @keyframes particle-in-2 {
          0% { top: 48%; left: 26%; opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { top: 48%; left: 42%; opacity: 0; }
        }
        .animate-particle-in-2 { animation: particle-in-2 4s ease-in-out infinite 0.6s; }
        
        @keyframes particle-in-3 {
          0% { top: 78%; left: 26%; opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { top: 48%; left: 42%; opacity: 0; }
        }
        .animate-particle-in-3 { animation: particle-in-3 4.5s ease-in-out infinite 1.2s; }
        
        @keyframes particle-out-1 {
          0% { top: 48%; left: 56%; opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { top: 18%; left: 72%; opacity: 0; }
        }
        .animate-particle-out-1 { animation: particle-out-1 3.5s ease-in-out infinite 0.4s; }
        
        @keyframes particle-out-2 {
          0% { top: 48%; left: 56%; opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { top: 48%; left: 72%; opacity: 0; }
        }
        .animate-particle-out-2 { animation: particle-out-2 4s ease-in-out infinite 1s; }
        
        @keyframes particle-out-3 {
          0% { top: 48%; left: 56%; opacity: 0; }
          15% { opacity: 0.7; }
          85% { opacity: 0.7; }
          100% { top: 78%; left: 72%; opacity: 0; }
        }
        .animate-particle-out-3 { animation: particle-out-3 4.5s ease-in-out infinite 1.6s; }
      `}</style>
    </TooltipProvider>
  );
};
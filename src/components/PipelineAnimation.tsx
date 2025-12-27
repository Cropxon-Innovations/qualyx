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
import { useParallax } from "./FloatingParticles";
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
  const parallaxRef = useParallax(0.015);

  useEffect(() => {
    // Slow, deliberate cycling - cinematic pacing
    const inputCycle = setInterval(() => {
      setActiveInput((prev) => (prev + 1) % inputNodes.length);
    }, 4000);

    // Staggered activation
    const engineTimer = setTimeout(() => setEngineActive(true), 2000);
    const outputTimer = setTimeout(() => setOutputsVisible(true), 3500);

    return () => {
      clearInterval(inputCycle);
      clearTimeout(engineTimer);
      clearTimeout(outputTimer);
    };
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="relative w-full aspect-[4/3] max-w-xl mx-auto">
        {/* Parallax ambient glow */}
        <div ref={parallaxRef} className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out">
          <div className="w-80 h-80 bg-[hsl(217,91%,60%,0.08)] rounded-full blur-[100px]" />
        </div>

        {/* Glassmorphism container */}
        <div className="absolute inset-4 rounded-2xl border border-border/15 bg-card/15 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 grid-bg-subtle opacity-20" />
        </div>

        {/* SVG Connection Lines & Data Particles - Cinematic motion */}
        <svg 
          className="absolute inset-0 w-full h-full" 
          viewBox="0 0 560 420"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(217,91%,60%)" stopOpacity="0.05" />
              <stop offset="50%" stopColor="hsl(217,91%,60%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(217,91%,60%)" stopOpacity="0.05" />
            </linearGradient>
            
            <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(142,76%,45%)" stopOpacity="0.05" />
              <stop offset="50%" stopColor="hsl(142,76%,45%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(142,76%,45%)" stopOpacity="0.05" />
            </linearGradient>

            <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Input paths - smooth curves with glow */}
          <path
            d="M 95 100 C 165 100, 205 210, 280 210"
            stroke="url(#inputGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lineGlow)"
            className="transition-opacity duration-1000"
            opacity={engineActive ? 0.8 : 0.2}
          />
          <path
            d="M 95 210 L 280 210"
            stroke="url(#inputGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lineGlow)"
            className="transition-opacity duration-1000"
            opacity={engineActive ? 0.8 : 0.2}
          />
          <path
            d="M 95 320 C 165 320, 205 210, 280 210"
            stroke="url(#inputGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lineGlow)"
            className="transition-opacity duration-1000"
            opacity={engineActive ? 0.8 : 0.2}
          />

          {/* Output paths */}
          <path
            d="M 280 210 C 355 210, 395 100, 465 100"
            stroke="url(#outputGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lineGlow)"
            className="transition-opacity duration-1000"
            opacity={outputsVisible ? 0.8 : 0}
          />
          <path
            d="M 280 210 L 465 210"
            stroke="url(#outputGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lineGlow)"
            className="transition-opacity duration-1000"
            opacity={outputsVisible ? 0.8 : 0}
          />
          <path
            d="M 280 210 C 355 210, 395 320, 465 320"
            stroke="url(#outputGrad)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lineGlow)"
            className="transition-opacity duration-1000"
            opacity={outputsVisible ? 0.8 : 0}
          />

          {/* Slow-moving data particles - cinematic easing */}
          {engineActive && (
            <>
              <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8" filter="url(#softGlow)">
                <animateMotion 
                  dur="5s" 
                  repeatCount="indefinite" 
                  path="M 95 100 C 165 100, 205 210, 280 210" 
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
              <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8" filter="url(#softGlow)">
                <animateMotion 
                  dur="4.5s" 
                  repeatCount="indefinite" 
                  path="M 95 210 L 280 210" 
                  begin="0.8s" 
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
              <circle r="3" fill="hsl(217,91%,60%)" opacity="0.8" filter="url(#softGlow)">
                <animateMotion 
                  dur="5.5s" 
                  repeatCount="indefinite" 
                  path="M 95 320 C 165 320, 205 210, 280 210" 
                  begin="1.5s" 
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
            </>
          )}

          {/* Output particles - green validation */}
          {outputsVisible && (
            <>
              <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8" filter="url(#softGlow)">
                <animateMotion 
                  dur="4.5s" 
                  repeatCount="indefinite" 
                  path="M 280 210 C 355 210, 395 100, 465 100" 
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
              <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8" filter="url(#softGlow)">
                <animateMotion 
                  dur="4s" 
                  repeatCount="indefinite" 
                  path="M 280 210 L 465 210" 
                  begin="1s" 
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
              <circle r="3" fill="hsl(142,76%,45%)" opacity="0.8" filter="url(#softGlow)">
                <animateMotion 
                  dur="5s" 
                  repeatCount="indefinite" 
                  path="M 280 210 C 355 210, 395 320, 465 320" 
                  begin="1.8s" 
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
            </>
          )}
        </svg>

        {/* Input Nodes - Glassmorphism cards with captions */}
        <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 sm:gap-12">
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
                      relative px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg cursor-pointer
                      bg-card/35 backdrop-blur-md border 
                      transition-all duration-300 ease-out
                      ${isActive || isHovered
                        ? "border-secondary/50 shadow-[0_0_25px_hsl(217,91%,60%,0.15)]" 
                        : "border-border/25"
                      }
                      ${isHovered ? "scale-[1.02]" : "scale-100"}
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon 
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                          isActive || isHovered ? "text-secondary" : "text-muted-foreground/50"
                        }`} 
                        strokeWidth={1.5}
                      />
                      <div className="flex flex-col">
                        <span 
                          className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                            isActive || isHovered ? "text-foreground" : "text-muted-foreground/60"
                          }`}
                        >
                          {node.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-muted-foreground/40 max-w-[120px] sm:max-w-[140px] leading-tight">
                          {node.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="left" 
                  className="max-w-[220px] bg-card/95 backdrop-blur-xl border-border/40 text-xs"
                >
                  {node.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* QUALYX Engine - AI Orb */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              onMouseEnter={() => setHoveredNode("engine")}
              onMouseLeave={() => setHoveredNode(null)}
              className={`
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer
                transition-all duration-500 ease-out
                ${engineActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                ${hoveredNode === "engine" ? "scale-[1.02]" : ""}
              `}
            >
              <div className="relative">
                {/* Outer glow orb */}
                <div 
                  className={`absolute -inset-12 rounded-full blur-3xl transition-all duration-500 ${
                    hoveredNode === "engine" 
                      ? "bg-[hsl(217,91%,60%,0.12)]" 
                      : "bg-[hsl(217,91%,60%,0.06)]"
                  }`}
                />
                
                {/* Orbiting particles */}
                <div className="absolute -inset-8">
                  <div 
                    className="absolute w-1.5 h-1.5 bg-secondary/40 rounded-full blur-[1px]"
                    style={{ 
                      animation: "orbit 12s linear infinite",
                      top: "50%",
                      left: "0%"
                    }}
                  />
                  <div 
                    className="absolute w-1 h-1 bg-secondary/30 rounded-full blur-[1px]"
                    style={{ 
                      animation: "orbit 16s linear infinite reverse",
                      top: "20%",
                      right: "10%"
                    }}
                  />
                  <div 
                    className="absolute w-1.5 h-1.5 bg-secondary/35 rounded-full blur-[1px]"
                    style={{ 
                      animation: "orbit 20s linear infinite",
                      bottom: "15%",
                      left: "20%"
                    }}
                  />
                </div>
                
                {/* Rotating rings - very slow */}
                <div 
                  className={`absolute -inset-7 border rounded-full transition-colors duration-500 ${
                    hoveredNode === "engine" ? "border-secondary/20" : "border-secondary/10"
                  }`}
                  style={{ animation: "spin 50s linear infinite" }}
                />
                <div 
                  className={`absolute -inset-11 border rounded-full transition-colors duration-500 ${
                    hoveredNode === "engine" ? "border-secondary/12" : "border-secondary/5"
                  }`}
                  style={{ animation: "spin 70s linear infinite reverse" }}
                />
                
                {/* Core card */}
                <div 
                  className={`relative px-4 py-3 sm:px-5 sm:py-4 rounded-xl bg-card/45 backdrop-blur-lg border transition-all duration-300 ${
                    hoveredNode === "engine" 
                      ? "border-secondary/40 shadow-[0_0_40px_hsl(217,91%,60%,0.12)]"
                      : "border-border/35 shadow-[0_0_30px_hsl(217,91%,60%,0.08)]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                      <Hexagon className="w-8 h-8 sm:w-10 sm:h-10 text-secondary/70" strokeWidth={1} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="w-2.5 h-2.5 bg-secondary/60 rounded-full" 
                          style={{ animation: "pulse 3s ease-in-out infinite" }} 
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs sm:text-sm font-semibold text-foreground/85 tracking-wide block">
                        QUALYX Engine
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground/45 block mt-0.5">
                        AI-assisted, deterministic automation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="max-w-[240px] bg-card/95 backdrop-blur-xl border-border/40 text-xs"
          >
            The QUALYX Engine processes test inputs using AI-assisted analysis to produce reliable, deterministic automation results.
          </TooltipContent>
        </Tooltip>

        {/* Output Nodes */}
        <div 
          className={`
            absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 sm:gap-12
            transition-all duration-700 ease-out
            ${outputsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
          `}
        >
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
                      relative px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg cursor-pointer
                      bg-card/35 backdrop-blur-md border transition-all duration-300 ease-out
                      ${isHovered 
                        ? "border-success/40 shadow-[0_0_20px_hsl(142,76%,45%,0.12)] scale-[1.02]" 
                        : "border-success/25"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon 
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                          isHovered ? "text-success" : "text-success/60"
                        }`} 
                        strokeWidth={1.5} 
                      />
                      <div className="flex flex-col">
                        <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                          isHovered ? "text-foreground" : "text-muted-foreground/60"
                        }`}>
                          {node.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-muted-foreground/40 max-w-[120px] sm:max-w-[140px] leading-tight">
                          {node.caption}
                        </span>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  className="max-w-[220px] bg-card/95 backdrop-blur-xl border-border/40 text-xs"
                >
                  {node.tooltip}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Flow indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 text-muted-foreground/25">
          <span className="text-[10px] uppercase tracking-[0.15em] font-medium">Input</span>
          <div className="w-8 h-px bg-gradient-to-r from-secondary/30 to-success/30" />
          <span className="text-[10px] uppercase tracking-[0.15em] font-medium">AI Core</span>
          <div className="w-8 h-px bg-gradient-to-r from-secondary/30 to-success/30" />
          <span className="text-[10px] uppercase tracking-[0.15em] font-medium">Output</span>
        </div>
      </div>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(32px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(32px) rotate(-360deg); }
        }
      `}</style>
    </TooltipProvider>
  );
};
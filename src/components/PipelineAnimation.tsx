import { useEffect, useState } from "react";
import { 
  Monitor, 
  Code, 
  GitBranch, 
  FileText, 
  CheckCircle2,
  Activity,
  Hexagon,
  ArrowRight
} from "lucide-react";
import { useParallax } from "./FloatingParticles";

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
            <stop offset="50%" stopColor="hsl(217,91%,60%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(217,91%,60%)" stopOpacity="0.05" />
          </linearGradient>
          
          <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(142,76%,45%)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="hsl(142,76%,45%)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(142,76%,45%)" stopOpacity="0.05" />
          </linearGradient>

          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
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
          className="transition-opacity duration-1500"
          opacity={engineActive ? 0.7 : 0.2}
        />
        <path
          d="M 90 210 L 280 210"
          stroke="url(#inputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1500"
          opacity={engineActive ? 0.7 : 0.2}
        />
        <path
          d="M 90 305 C 160 305, 200 210, 280 210"
          stroke="url(#inputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1500"
          opacity={engineActive ? 0.7 : 0.2}
        />

        {/* Output paths */}
        <path
          d="M 280 210 C 360 210, 400 115, 470 115"
          stroke="url(#outputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1500"
          opacity={outputsVisible ? 0.7 : 0}
        />
        <path
          d="M 280 210 L 470 210"
          stroke="url(#outputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1500"
          opacity={outputsVisible ? 0.7 : 0}
        />
        <path
          d="M 280 210 C 360 210, 400 305, 470 305"
          stroke="url(#outputGrad)"
          strokeWidth="1"
          fill="none"
          className="transition-opacity duration-1500"
          opacity={outputsVisible ? 0.7 : 0}
        />

        {/* Slow-moving data particles - cinematic easing */}
        {engineActive && (
          <>
            <circle r="2.5" fill="hsl(217,91%,60%)" opacity="0.7" filter="url(#softGlow)">
              <animateMotion 
                dur="5s" 
                repeatCount="indefinite" 
                path="M 90 115 C 160 115, 200 210, 280 210" 
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
            <circle r="2.5" fill="hsl(217,91%,60%)" opacity="0.7" filter="url(#softGlow)">
              <animateMotion 
                dur="4.5s" 
                repeatCount="indefinite" 
                path="M 90 210 L 280 210" 
                begin="0.8s" 
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
            <circle r="2.5" fill="hsl(217,91%,60%)" opacity="0.7" filter="url(#softGlow)">
              <animateMotion 
                dur="5.5s" 
                repeatCount="indefinite" 
                path="M 90 305 C 160 305, 200 210, 280 210" 
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
            <circle r="2.5" fill="hsl(142,76%,45%)" opacity="0.7" filter="url(#softGlow)">
              <animateMotion 
                dur="4.5s" 
                repeatCount="indefinite" 
                path="M 280 210 C 360 210, 400 115, 470 115" 
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
            <circle r="2.5" fill="hsl(142,76%,45%)" opacity="0.7" filter="url(#softGlow)">
              <animateMotion 
                dur="4s" 
                repeatCount="indefinite" 
                path="M 280 210 L 470 210" 
                begin="1s" 
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
            <circle r="2.5" fill="hsl(142,76%,45%)" opacity="0.7" filter="url(#softGlow)">
              <animateMotion 
                dur="5s" 
                repeatCount="indefinite" 
                path="M 280 210 C 360 210, 400 305, 470 305" 
                begin="1.8s" 
                calcMode="spline"
                keySplines="0.4 0 0.2 1"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Input Nodes - Glassmorphism cards */}
      <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex flex-col gap-10 sm:gap-14">
        {inputNodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeInput === index;
          return (
            <div
              key={node.id}
              className={`
                relative px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg 
                bg-card/30 backdrop-blur-md border 
                transition-all duration-1000 ease-out
                ${isActive 
                  ? "border-secondary/40 shadow-[0_0_20px_hsl(217,91%,60%,0.12)]" 
                  : "border-border/20"
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-700 ${
                    isActive ? "text-secondary/80" : "text-muted-foreground/40"
                  }`} 
                  strokeWidth={1.5}
                />
                <span 
                  className={`text-xs sm:text-sm font-medium transition-colors duration-700 ${
                    isActive ? "text-foreground/80" : "text-muted-foreground/40"
                  }`}
                >
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* QUALYX Engine - AI Orb */}
      <div 
        className={`
          absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          transition-all duration-1500 ease-out
          ${engineActive ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        <div className="relative">
          {/* Outer glow orb */}
          <div className="absolute -inset-10 bg-[hsl(217,91%,60%,0.06)] rounded-full blur-2xl" />
          
          {/* Rotating rings - very slow */}
          <div 
            className="absolute -inset-7 border border-secondary/10 rounded-full"
            style={{ animation: "spin 50s linear infinite" }}
          />
          <div 
            className="absolute -inset-11 border border-secondary/5 rounded-full"
            style={{ animation: "spin 70s linear infinite reverse" }}
          />
          
          {/* Core card */}
          <div className="relative px-5 py-4 sm:px-6 sm:py-5 rounded-xl bg-card/40 backdrop-blur-lg border border-border/30 shadow-[0_0_35px_hsl(217,91%,60%,0.08)]">
            <div className="flex flex-col items-center gap-2.5">
              <div className="relative">
                <Hexagon className="w-9 h-9 sm:w-11 sm:h-11 text-secondary/70" strokeWidth={1} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-secondary/50 rounded-full" style={{ animation: "pulse 3s ease-in-out infinite" }} />
                </div>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-foreground/80 tracking-wide">QUALYX Engine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output Nodes */}
      <div 
        className={`
          absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex flex-col gap-10 sm:gap-14
          transition-all duration-1500 ease-out
          ${outputsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
        `}
      >
        {outputNodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="relative px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg bg-card/30 backdrop-blur-md border border-success/20 transition-all duration-500 hover:border-success/30 hover:shadow-[0_0_15px_hsl(142,76%,45%,0.08)]"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-success/60" strokeWidth={1.5} />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground/50">{node.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Directional arrows */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-muted-foreground/20">
        <ArrowRight className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-[0.2em]">Data Flow</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};

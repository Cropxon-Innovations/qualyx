import { useEffect, useState } from "react";
import { 
  Monitor, 
  Code, 
  GitBranch, 
  Cpu, 
  FileText, 
  CheckCircle2,
  Zap
} from "lucide-react";

const nodes = [
  { id: "ui", icon: Monitor, label: "UI", delay: 0 },
  { id: "api", icon: Code, label: "API", delay: 200 },
  { id: "ci", icon: GitBranch, label: "CI/CD", delay: 400 },
];

const outputs = [
  { id: "report", icon: FileText, label: "Reports", delay: 800 },
  { id: "logs", icon: Zap, label: "Logs", delay: 1000 },
  { id: "check", icon: CheckCircle2, label: "Passed", delay: 1200 },
];

export const PipelineAnimation = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [showCore, setShowCore] = useState(false);
  const [showOutputs, setShowOutputs] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 2000);

    const coreTimeout = setTimeout(() => setShowCore(true), 1500);
    const outputTimeout = setTimeout(() => setShowOutputs(true), 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(coreTimeout);
      clearTimeout(outputTimeout);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 bg-primary/20 rounded-full blur-[60px] animate-pulse-glow" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg-subtle rounded-3xl opacity-30" />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        {/* Input to core lines */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--neon-cyan))" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="outputGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(var(--success))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Input lines */}
        <path
          d="M 80 120 Q 150 120 200 200"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="opacity-60"
        />
        <path
          d="M 80 200 L 200 200"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="opacity-60"
        />
        <path
          d="M 80 280 Q 150 280 200 200"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          fill="none"
          className="opacity-60"
        />

        {/* Output lines */}
        {showOutputs && (
          <>
            <path
              d="M 200 200 Q 250 120 320 120"
              stroke="url(#outputGradient)"
              strokeWidth="2"
              fill="none"
              className="opacity-60"
            />
            <path
              d="M 200 200 L 320 200"
              stroke="url(#outputGradient)"
              strokeWidth="2"
              fill="none"
              className="opacity-60"
            />
            <path
              d="M 200 200 Q 250 280 320 280"
              stroke="url(#outputGradient)"
              strokeWidth="2"
              fill="none"
              className="opacity-60"
            />
          </>
        )}

        {/* Animated data particles */}
        <circle r="3" fill="hsl(var(--neon-cyan))">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M 80 120 Q 150 120 200 200"
          />
        </circle>
        <circle r="3" fill="hsl(var(--neon-cyan))">
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path="M 80 200 L 200 200"
          />
        </circle>
        <circle r="3" fill="hsl(var(--neon-cyan))">
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M 80 280 Q 150 280 200 200"
          />
        </circle>

        {showOutputs && (
          <>
            <circle r="3" fill="hsl(var(--success))">
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path="M 200 200 Q 250 120 320 120"
              />
            </circle>
            <circle r="3" fill="hsl(var(--success))">
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                path="M 200 200 L 320 200"
              />
            </circle>
            <circle r="3" fill="hsl(var(--success))">
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M 200 200 Q 250 280 320 280"
              />
            </circle>
          </>
        )}
      </svg>

      {/* Input nodes */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-8">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isActive = activeNode === index;
          return (
            <div
              key={node.id}
              className={`glass-card p-4 rounded-xl transition-all duration-500 ${
                isActive ? "border-primary/50 glow-cyan" : "border-border/30"
              }`}
              style={{ animationDelay: `${node.delay}ms` }}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs text-muted-foreground mt-2 block">{node.label}</span>
            </div>
          );
        })}
      </div>

      {/* AI Core */}
      <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${showCore ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-xl opacity-50 animate-pulse" />
          <div className="relative glass-card-glow p-6 rounded-2xl">
            <div className="flex flex-col items-center gap-2">
              <Cpu className="w-10 h-10 text-primary" />
              <span className="text-sm font-semibold gradient-text">AI Core</span>
            </div>
          </div>
          {/* Rotating ring */}
          <div className="absolute -inset-4 border border-primary/20 rounded-3xl animate-rotate-slow" style={{ animationDuration: "20s" }} />
          <div className="absolute -inset-8 border border-primary/10 rounded-[2rem] animate-rotate-slow" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
        </div>
      </div>

      {/* Output nodes */}
      <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-8 transition-all duration-700 ${showOutputs ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
        {outputs.map((output, index) => {
          const Icon = output.icon;
          return (
            <div
              key={output.id}
              className="glass-card p-4 rounded-xl border-success/30 hover:border-success/50 transition-colors"
              style={{ animationDelay: `${output.delay}ms` }}
            >
              <Icon className="w-6 h-6 text-success" />
              <span className="text-xs text-muted-foreground mt-2 block">{output.label}</span>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-muted-foreground">
        <span>Inputs</span>
        <span>Processing</span>
        <span>Outputs</span>
      </div>
    </div>
  );
};

import { useEffect, useState, useRef } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Terminal, 
  MonitorPlay, 
  Zap, 
  AlertTriangle,
  Workflow,
  MousePointer2,
  Keyboard,
  CheckSquare,
  Loader2,
  Network,
  FileCheck
} from "lucide-react";

// Test steps data
const steps = [
  { id: 1, name: "Navigate to /login", duration: "0.42s", status: "done" as const },
  { id: 2, name: "Enter email credential", duration: "0.89s", status: "done" as const },
  { id: 3, name: "Enter password", duration: "0.76s", status: "done" as const },
  { id: 4, name: "Click 'Sign In' button", duration: "—", status: "running" as const },
  { id: 5, name: "Assert dashboard visible", duration: "—", status: "pending" as const },
  { id: 6, name: "Capture session snapshot", duration: "—", status: "pending" as const },
];

// Console logs with types
const consoleLogs = [
  { type: "info", text: "Test suite initialized", time: "00:00:01" },
  { type: "info", text: "Browser context created", time: "00:00:02" },
  { type: "debug", text: "page.goto('https://app.example.com/login')", time: "00:00:02" },
  { type: "info", text: "Page loaded in 420ms", time: "00:00:03" },
  { type: "debug", text: "fill('#email', 'user@example.com')", time: "00:00:04" },
  { type: "debug", text: "fill('#password', '********')", time: "00:00:04" },
  { type: "info", text: "Clicking submit button...", time: "00:00:05" },
  { type: "success", text: "Login successful ✓", time: "00:00:06" },
];

// Network requests
const networkLogs = [
  { method: "GET", url: "/login", status: 200, time: "42ms" },
  { method: "POST", url: "/api/auth/login", status: 200, time: "234ms" },
  { method: "GET", url: "/api/user/me", status: 200, time: "89ms" },
];

// Assertions
const assertionLogs = [
  { name: "Page title matches", status: "pass" as const },
  { name: "Email field visible", status: "pass" as const },
  { name: "Login button enabled", status: "pass" as const },
  { name: "Dashboard loaded", status: "running" as const },
];

// AI Insights
const suggestedAssertions = [
  "Verify session cookie is set",
  "Check localStorage token",
  "Assert redirect to /dashboard",
];

const flakyWarnings = [
  { selector: "#submit-btn", risk: "medium", reason: "Dynamic class names detected" },
];

const reusableFlows = [
  { name: "Login Flow", steps: 4, reused: 12 },
  { name: "Logout Flow", steps: 2, reused: 8 },
];

type ConsoleTab = "logs" | "network" | "assertions";

export const HeroLiveDemo = () => {
  const [activeStep, setActiveStep] = useState(3);
  const [visibleLogs, setVisibleLogs] = useState(consoleLogs.slice(0, 4));
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("logs");
  const [previewAction, setPreviewAction] = useState<string | null>("Click detected");
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 60 });
  const containerRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Cycle through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((p) => (p + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Add logs progressively
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLogs((prev) => {
        const nextIdx = prev.length % consoleLogs.length;
        const newLogs = [...prev.slice(-6), consoleLogs[nextIdx]];
        return newLogs;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll console
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  // Cycle preview actions
  useEffect(() => {
    const actions = ["Click detected", "Typing...", "Assertion running", "Waiting...", null];
    let idx = 0;
    const timer = setInterval(() => {
      setPreviewAction(actions[idx % actions.length]);
      idx++;
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Animate cursor in preview
  useEffect(() => {
    const positions = [
      { x: 50, y: 60 },
      { x: 45, y: 45 },
      { x: 55, y: 70 },
      { x: 48, y: 55 },
    ];
    let idx = 0;
    const timer = setInterval(() => {
      setCursorPos(positions[idx % positions.length]);
      idx++;
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const getStepIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "running":
        return <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />;
      case "failed":
        return <XCircle className="w-3.5 h-3.5 text-red-400" />;
      default:
        return <div className="w-3.5 h-3.5 rounded-full border border-slate-600" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Main cockpit container */}
      <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-500/5">
        
        {/* Top header bar */}
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/50 bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="w-px h-4 bg-slate-700 mx-2" />
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <div className="absolute -inset-1 bg-cyan-400/20 rounded-full blur-sm animate-pulse" />
              </div>
              <span className="text-[11px] font-medium text-slate-200">QUALYX Engine</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-emerald-400">RECORDING</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              <span className="font-mono">00:05:32</span>
            </div>
          </div>
        </header>

        {/* Main 3-column + bottom layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_200px]">
          
          {/* LEFT: Steps Timeline */}
          <section className="p-3 border-b lg:border-b-0 lg:border-r border-slate-700/40 bg-slate-900/50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-1 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Steps</span>
            </div>
            
            <div className="space-y-1">
              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isDone = step.status === "done" || idx < activeStep;
                const isRunning = idx === activeStep;
                
                return (
                  <div
                    key={step.id}
                    className={`relative flex items-start gap-2 px-2 py-1.5 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-500/10 border border-cyan-500/30"
                        : "border border-transparent hover:bg-slate-800/50"
                    }`}
                  >
                    {/* Timeline connector */}
                    {idx < steps.length - 1 && (
                      <div 
                        className={`absolute left-[17px] top-6 w-px h-[calc(100%+4px)] transition-colors duration-300 ${
                          isDone ? "bg-emerald-500/40" : "bg-slate-700/50"
                        }`}
                      />
                    )}
                    
                    <div className="relative z-10 mt-0.5">
                      {getStepIcon(isDone ? "done" : isRunning ? "running" : "pending")}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] leading-tight block transition-colors ${
                        isActive ? "text-slate-100 font-medium" : isDone ? "text-slate-400" : "text-slate-500"
                      }`}>
                        {step.name}
                      </span>
                      {isDone && (
                        <span className="text-[9px] text-slate-500 font-mono">{step.duration}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Progress indicator */}
            <div className="mt-3 pt-3 border-t border-slate-700/40">
              <div className="flex justify-between text-[9px] text-slate-500 mb-1">
                <span>Progress</span>
                <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </section>

          {/* CENTER + BOTTOM: Preview and Console stacked */}
          <section className="flex flex-col border-b lg:border-b-0 lg:border-r border-slate-700/40">
            
            {/* Live Preview */}
            <div className="flex-1 p-3">
              <div className="flex items-center gap-2 mb-2">
                <MonitorPlay className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Live Preview</span>
              </div>
              
              <div className="relative h-[130px] rounded-lg border border-slate-700/50 bg-slate-950/80 overflow-hidden">
                {/* Subtle grid background */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />
                
                {/* Browser chrome */}
                <div className="absolute top-0 inset-x-0 h-5 bg-slate-800/80 border-b border-slate-700/50 flex items-center px-2 gap-1">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <div className="flex-1 mx-2 h-3 rounded bg-slate-900/80 flex items-center px-2">
                    <span className="text-[8px] text-slate-500 font-mono">app.example.com/login</span>
                  </div>
                </div>
                
                {/* Simulated app content */}
                <div className="absolute top-5 inset-x-0 bottom-0 p-3">
                  <div className="max-w-[140px] mx-auto space-y-2">
                    <div className="h-2 w-16 bg-slate-700/40 rounded mx-auto" />
                    <div className="h-5 bg-slate-800/60 rounded border border-slate-700/40" />
                    <div className="h-5 bg-slate-800/60 rounded border border-slate-700/40" />
                    <div className="h-5 bg-cyan-500/20 rounded border border-cyan-500/40 flex items-center justify-center">
                      <span className="text-[8px] text-cyan-400 font-medium">Sign In</span>
                    </div>
                  </div>
                </div>
                
                {/* Animated cursor */}
                <div 
                  className="absolute w-3 h-3 transition-all duration-700 ease-out pointer-events-none"
                  style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <MousePointer2 className="w-3 h-3 text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
                </div>
                
                {/* Action indicator */}
                {previewAction && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/90 border border-cyan-500/30 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                      {previewAction === "Click detected" && <MousePointer2 className="w-2.5 h-2.5 text-cyan-400" />}
                      {previewAction === "Typing..." && <Keyboard className="w-2.5 h-2.5 text-amber-400" />}
                      {previewAction === "Assertion running" && <CheckSquare className="w-2.5 h-2.5 text-emerald-400" />}
                      {previewAction === "Waiting..." && <Loader2 className="w-2.5 h-2.5 text-slate-400 animate-spin" />}
                      <span className="text-[9px] text-slate-300">{previewAction}</span>
                    </div>
                  </div>
                )}
                
                {/* Highlight overlay when action occurs */}
                {previewAction === "Click detected" && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div 
                      className="absolute w-8 h-8 rounded-full border-2 border-cyan-400/50 animate-ping"
                      style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Console - Full width bottom of center column */}
            <div className="border-t border-slate-700/40 bg-slate-950/60">
              {/* Console tabs */}
              <div className="flex items-center gap-1 px-3 py-1.5 border-b border-slate-700/30">
                {[
                  { id: "logs" as ConsoleTab, label: "Logs", icon: Terminal },
                  { id: "network" as ConsoleTab, label: "Network", icon: Network },
                  { id: "assertions" as ConsoleTab, label: "Assertions", icon: FileCheck },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = consoleTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setConsoleTab(tab.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[9px] font-medium transition-all ${
                        isActive
                          ? "bg-slate-800 text-slate-200"
                          : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              
              {/* Console content */}
              <div 
                ref={consoleRef}
                className="h-[72px] overflow-y-auto px-3 py-2 font-mono text-[9px] leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
              >
                {consoleTab === "logs" && (
                  <div className="space-y-0.5">
                    {visibleLogs.map((log, i) => (
                      <div
                        key={`${log.text}-${i}`}
                        className={`flex items-start gap-2 ${
                          i === visibleLogs.length - 1 ? "text-slate-200" : "text-slate-500"
                        }`}
                      >
                        <span className="text-slate-600 flex-shrink-0">{log.time}</span>
                        <span className={`flex-shrink-0 ${
                          log.type === "success" ? "text-emerald-400" :
                          log.type === "debug" ? "text-slate-500" :
                          "text-cyan-400"
                        }`}>
                          [{log.type.toUpperCase()}]
                        </span>
                        <span className="break-all">{log.text}</span>
                      </div>
                    ))}
                    <div className="text-slate-600 animate-pulse">▋</div>
                  </div>
                )}
                
                {consoleTab === "network" && (
                  <div className="space-y-1">
                    {networkLogs.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-400">
                        <span className={`px-1 py-0.5 rounded text-[8px] font-bold ${
                          req.method === "GET" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {req.method}
                        </span>
                        <span className="flex-1 truncate text-slate-300">{req.url}</span>
                        <span className={`${req.status === 200 ? "text-emerald-400" : "text-red-400"}`}>{req.status}</span>
                        <span className="text-slate-600">{req.time}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {consoleTab === "assertions" && (
                  <div className="space-y-1">
                    {assertionLogs.map((assertion, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {assertion.status === "pass" ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
                        )}
                        <span className={assertion.status === "pass" ? "text-slate-300" : "text-cyan-300"}>
                          {assertion.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* RIGHT: AI Insights Panel */}
          <section className="p-3 bg-slate-900/50">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">AI Insights</span>
            </div>
            
            <div className="space-y-4">
              {/* Suggested Assertions */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckSquare className="w-3 h-3 text-emerald-400" />
                  <span className="text-[9px] font-medium text-slate-300">Suggested Assertions</span>
                </div>
                <div className="space-y-1">
                  {suggestedAssertions.map((assertion, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded bg-slate-800/50 border border-slate-700/30 text-[9px] text-slate-400 hover:text-slate-200 hover:border-cyan-500/30 transition-all cursor-pointer"
                    >
                      {assertion}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Flaky Selector Warnings */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span className="text-[9px] font-medium text-slate-300">Flaky Warnings</span>
                </div>
                <div className="space-y-1">
                  {flakyWarnings.map((warning, i) => (
                    <div
                      key={i}
                      className="px-2 py-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-[9px]"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <code className="text-amber-300">{warning.selector}</code>
                        <span className={`px-1 py-0.5 rounded text-[8px] font-medium ${
                          warning.risk === "high" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {warning.risk}
                        </span>
                      </div>
                      <p className="text-slate-500">{warning.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reusable Flows */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Workflow className="w-3 h-3 text-cyan-400" />
                  <span className="text-[9px] font-medium text-slate-300">Detected Flows</span>
                </div>
                <div className="space-y-1">
                  {reusableFlows.map((flow, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-2 py-1.5 rounded bg-slate-800/50 border border-slate-700/30 text-[9px] hover:border-cyan-500/30 transition-all cursor-pointer"
                    >
                      <span className="text-slate-300">{flow.name}</span>
                      <div className="flex items-center gap-2 text-slate-500">
                        <span>{flow.steps} steps</span>
                        <span className="text-cyan-400">×{flow.reused}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mini Journey Map */}
              <div className="pt-2 border-t border-slate-700/40">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-[9px] font-medium text-slate-300">Journey</span>
                </div>
                <div className="flex items-center justify-between px-1">
                  {["Login", "Navigate", "Assert", "Done"].map((label, i) => (
                    <div key={label} className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                        i < 2 
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" 
                          : i === 2 
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                            : "bg-slate-800 text-slate-600 border border-slate-700"
                      }`}>
                        {i < 2 ? "✓" : i + 1}
                      </div>
                      <span className="text-[7px] text-slate-500 mt-1">{label}</span>
                    </div>
                  ))}
                </div>
                {/* Journey connector line */}
                <div className="relative h-px mx-4 mt-2">
                  <div className="absolute inset-0 bg-slate-700" />
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

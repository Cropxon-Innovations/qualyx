import { useEffect, useState, useRef, useCallback } from "react";
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
  FileCheck,
  GripVertical,
  Maximize2,
  X,
  Copy,
  Trash2,
  Plus,
  MousePointerClick,
  FormInput,
  Eye,
  Navigation,
  Timer
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface Step {
  id: number;
  name: string;
  duration: string;
  status: "done" | "running" | "pending";
  type: string;
}

// Step templates for drag and drop
const stepTemplates = [
  { type: "click", name: "Click Element", icon: MousePointerClick, color: "text-primary" },
  { type: "input", name: "Fill Input", icon: FormInput, color: "text-secondary" },
  { type: "assert", name: "Assert Visible", icon: Eye, color: "text-success" },
  { type: "navigate", name: "Navigate To", icon: Navigation, color: "text-warning" },
  { type: "wait", name: "Wait For", icon: Timer, color: "text-muted-foreground" },
];

// Initial test steps data
const initialSteps: Step[] = [
  { id: 1, name: "Navigate to /login", duration: "0.42s", status: "done", type: "navigate" },
  { id: 2, name: "Enter email credential", duration: "0.89s", status: "done", type: "input" },
  { id: 3, name: "Enter password", duration: "0.76s", status: "done", type: "input" },
  { id: 4, name: "Click 'Sign In' button", duration: "—", status: "running", type: "click" },
  { id: 5, name: "Assert dashboard visible", duration: "—", status: "pending", type: "assert" },
  { id: 6, name: "Capture session snapshot", duration: "—", status: "pending", type: "wait" },
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

interface HeroLiveDemoProps {
  isFullscreen?: boolean;
  onClose?: () => void;
}

export const HeroLiveDemo = ({ isFullscreen = false, onClose }: HeroLiveDemoProps) => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [activeStep, setActiveStep] = useState(3);
  const [visibleLogs, setVisibleLogs] = useState(consoleLogs.slice(0, 4));
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("logs");
  const [previewAction, setPreviewAction] = useState<string | null>("Click detected");
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 60 });
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedTemplate, setDraggedTemplate] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [nextId, setNextId] = useState(7);
  const containerRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Drag and drop handlers for steps
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    setDraggedTemplate(null);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  }, []);

  const handleTemplateDragStart = useCallback((e: React.DragEvent, templateType: string) => {
    setDraggedTemplate(templateType);
    setDraggedIndex(null);
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", templateType);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = draggedTemplate ? "copy" : "move";
    setDragOverIndex(index);
  }, [draggedTemplate]);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    // Handle template drop
    if (draggedTemplate) {
      const template = stepTemplates.find(t => t.type === draggedTemplate);
      if (template) {
        const newStep: Step = {
          id: nextId,
          name: `${template.name} (new)`,
          duration: "—",
          status: "pending",
          type: template.type
        };
        setNextId(prev => prev + 1);
        
        const newSteps = [...steps];
        newSteps.splice(dropIndex, 0, newStep);
        setSteps(newSteps);
      }
      setDraggedTemplate(null);
      setDragOverIndex(null);
      return;
    }

    // Handle step reorder
    const dragIndex = draggedIndex;
    if (dragIndex === null || dragIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newSteps = [...steps];
    const [draggedStep] = newSteps.splice(dragIndex, 1);
    newSteps.splice(dropIndex, 0, draggedStep);
    
    const updatedSteps = newSteps.map((step, idx) => ({
      ...step,
      status: idx < activeStep ? "done" as const : idx === activeStep ? "running" as const : "pending" as const
    }));
    
    setSteps(updatedSteps);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [draggedIndex, draggedTemplate, steps, activeStep, nextId]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDraggedTemplate(null);
  }, []);

  // Context menu actions
  const duplicateStep = useCallback((index: number) => {
    const stepToDuplicate = steps[index];
    const newStep: Step = {
      ...stepToDuplicate,
      id: nextId,
      name: `${stepToDuplicate.name} (copy)`,
      status: "pending"
    };
    setNextId(prev => prev + 1);
    
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, newStep);
    setSteps(newSteps);
  }, [steps, nextId]);

  const deleteStep = useCallback((index: number) => {
    if (steps.length <= 1) return;
    const newSteps = steps.filter((_, idx) => idx !== index);
    setSteps(newSteps);
    if (activeStep >= newSteps.length) {
      setActiveStep(newSteps.length - 1);
    }
  }, [steps, activeStep]);

  // Cycle through steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((p) => (p + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  // Update step statuses when activeStep changes
  useEffect(() => {
    setSteps(prev => prev.map((step, idx) => ({
      ...step,
      status: idx < activeStep ? "done" as const : idx === activeStep ? "running" as const : "pending" as const
    })));
  }, [activeStep]);

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

  const getStepIcon = (status: string, type: string) => {
    if (status === "done") {
      return <CheckCircle2 className="w-3.5 h-3.5 text-success" />;
    }
    if (status === "running") {
      return <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />;
    }
    if (status === "failed") {
      return <XCircle className="w-3.5 h-3.5 text-destructive" />;
    }
    
    const template = stepTemplates.find(t => t.type === type);
    if (template) {
      const IconComponent = template.icon;
      return <IconComponent className={`w-3.5 h-3.5 ${template.color} opacity-50`} />;
    }
    return <div className="w-3.5 h-3.5 rounded-full border border-border" />;
  };

  const renderContent = () => (
    <div ref={containerRef} className="relative w-full">
      {/* Main cockpit container - Theme aware */}
      <div className={`relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5 ${isFullscreen ? 'h-full' : ''}`}>
        
        {/* Top header bar */}
        <header className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-card/90">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
            </div>
            <div className="w-px h-4 bg-border mx-2" />
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm animate-pulse" />
              </div>
              <span className="text-[11px] font-medium text-foreground">QUALYX Engine</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/15 border border-success/30">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] font-medium text-success">RECORDING</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="font-mono">00:05:32</span>
            </div>
            {isFullscreen ? (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            ) : (
              <button
                onClick={() => setIsMaximized(true)}
                className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
                title="Maximize"
              >
                <Maximize2 className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </header>

        {/* Main layout */}
        <div className={`grid grid-cols-1 ${isFullscreen ? 'lg:grid-cols-[220px_1fr_240px]' : 'lg:grid-cols-[180px_1fr_200px]'}`}>
          
          {/* LEFT: Steps Timeline + Templates */}
          <section className={`p-3 border-b lg:border-b-0 lg:border-r border-border/40 bg-muted/20 ${isFullscreen ? 'overflow-y-auto max-h-[calc(100vh-200px)]' : ''}`}>
            {/* Step Templates */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Plus className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest">Templates</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {stepTemplates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <div
                      key={template.type}
                      draggable
                      onDragStart={(e) => handleTemplateDragStart(e, template.type)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md bg-card/60 border border-border/40 cursor-grab active:cursor-grabbing hover:border-primary/40 hover:bg-primary/5 transition-all ${
                        draggedTemplate === template.type ? 'opacity-50 scale-95' : ''
                      }`}
                      title={`Drag to add: ${template.name}`}
                    >
                      <IconComponent className={`w-3 h-3 ${template.color}`} />
                      <span className="text-[8px] text-muted-foreground">{template.name.split(' ')[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Steps */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Steps</span>
              </div>
              <span className="text-[8px] text-muted-foreground/60">Right-click for options</span>
            </div>
            
            <div className="space-y-1">
              {steps.map((step, idx) => {
                const isActive = idx === activeStep;
                const isDone = step.status === "done";
                const isDragging = draggedIndex === idx;
                const isDragOver = dragOverIndex === idx;
                
                return (
                  <ContextMenu key={step.id}>
                    <ContextMenuTrigger>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragOver={(e) => handleDragOver(e, idx)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, idx)}
                        onDragEnd={handleDragEnd}
                        className={`relative flex items-start gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
                          isDragging
                            ? "opacity-50 scale-95"
                            : isDragOver
                              ? "bg-primary/20 border-2 border-dashed border-primary/50"
                              : isActive
                                ? "bg-primary/10 border border-primary/30"
                                : "border border-transparent hover:bg-muted/50"
                        }`}
                      >
                        <GripVertical className="w-3 h-3 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                        
                        {idx < steps.length - 1 && (
                          <div 
                            className={`absolute left-[21px] top-6 w-px h-[calc(100%+4px)] transition-colors duration-300 ${
                              isDone ? "bg-success/40" : "bg-border/50"
                            }`}
                          />
                        )}
                        
                        <div className="relative z-10 mt-0.5">
                          {getStepIcon(step.status, step.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <span className={`text-[10px] leading-tight block transition-colors ${
                            isActive ? "text-foreground font-medium" : isDone ? "text-muted-foreground" : "text-muted-foreground/60"
                          }`}>
                            {step.name}
                          </span>
                          {isDone && (
                            <span className="text-[9px] text-muted-foreground/60 font-mono">{step.duration}</span>
                          )}
                        </div>
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-40">
                      <ContextMenuItem onClick={() => duplicateStep(idx)} className="gap-2 text-xs">
                        <Copy className="w-3.5 h-3.5" />
                        Duplicate
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem 
                        onClick={() => deleteStep(idx)} 
                        className="gap-2 text-xs text-destructive focus:text-destructive"
                        disabled={steps.length <= 1}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                );
              })}
            </div>
            
            {/* Progress indicator */}
            <div className="mt-3 pt-3 border-t border-border/40">
              <div className="flex justify-between text-[9px] text-muted-foreground/60 mb-1">
                <span>Progress</span>
                <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="h-1 rounded-full bg-muted/50 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </section>

          {/* CENTER + BOTTOM: Preview and Console stacked */}
          <section className="flex flex-col border-b lg:border-b-0 lg:border-r border-border/40">
            
            {/* Live Preview */}
            <div className={`flex-1 p-3 ${isFullscreen ? 'p-6' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <MonitorPlay className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Live Preview</span>
              </div>
              
              <div className={`relative rounded-lg border border-border/50 bg-background/80 overflow-hidden ${isFullscreen ? 'h-[300px]' : 'h-[130px]'}`}>
                {/* Subtle grid background */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(to right, hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}
                />
                
                {/* Browser chrome */}
                <div className="absolute top-0 inset-x-0 h-6 bg-muted/50 border-b border-border/50 flex items-center px-2 gap-1">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                  </div>
                  <div className="flex-1 mx-2 h-3.5 rounded bg-background/80 flex items-center px-2">
                    <span className="text-[9px] text-muted-foreground/60 font-mono">app.example.com/login</span>
                  </div>
                </div>
                
                {/* Simulated app content */}
                <div className="absolute top-6 inset-x-0 bottom-0 p-4">
                  <div className={`mx-auto space-y-2 ${isFullscreen ? 'max-w-[200px]' : 'max-w-[140px]'}`}>
                    <div className="h-3 w-20 bg-muted/60 rounded mx-auto" />
                    <div className={`bg-muted/40 rounded border border-border/40 ${isFullscreen ? 'h-8' : 'h-5'}`} />
                    <div className={`bg-muted/40 rounded border border-border/40 ${isFullscreen ? 'h-8' : 'h-5'}`} />
                    <div className={`bg-primary/20 rounded border border-primary/40 flex items-center justify-center ${isFullscreen ? 'h-8' : 'h-5'}`}>
                      <span className={`text-primary font-medium ${isFullscreen ? 'text-sm' : 'text-[8px]'}`}>Sign In</span>
                    </div>
                  </div>
                </div>
                
                {/* Animated cursor */}
                <div 
                  className="absolute transition-all duration-700 ease-out pointer-events-none"
                  style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <MousePointer2 className={`text-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)] ${isFullscreen ? 'w-5 h-5' : 'w-3 h-3'}`} />
                </div>
                
                {/* Action indicator */}
                {previewAction && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-card/90 border border-primary/30 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-2">
                      {previewAction === "Click detected" && <MousePointerClick className="w-3.5 h-3.5 text-primary" />}
                      {previewAction === "Typing..." && <Keyboard className="w-3.5 h-3.5 text-warning" />}
                      {previewAction === "Assertion running" && <CheckSquare className="w-3.5 h-3.5 text-success" />}
                      {previewAction === "Waiting..." && <Loader2 className="w-3.5 h-3.5 text-muted-foreground animate-spin" />}
                      <span className={`text-foreground ${isFullscreen ? 'text-sm' : 'text-[10px]'}`}>{previewAction}</span>
                    </div>
                  </div>
                )}
                
                {/* Click highlight */}
                {previewAction === "Click detected" && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div 
                      className="absolute w-10 h-10 rounded-full border-2 border-primary/50 animate-ping"
                      style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Console */}
            <div className="border-t border-border/40 bg-muted/10">
              <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border/30">
                {[
                  { id: "logs" as ConsoleTab, label: "Logs", icon: Terminal },
                  { id: "network" as ConsoleTab, label: "Network", icon: Network },
                  { id: "assertions" as ConsoleTab, label: "Assertions", icon: FileCheck },
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = consoleTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setConsoleTab(tab.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[9px] font-medium transition-all ${
                        isActive
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <IconComponent className="w-3 h-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
              
              <div 
                ref={consoleRef}
                className={`overflow-y-auto px-3 py-2 font-mono text-[9px] leading-relaxed ${isFullscreen ? 'h-[120px]' : 'h-[72px]'}`}
              >
                {consoleTab === "logs" && (
                  <div className="space-y-0.5">
                    {visibleLogs.map((log, i) => (
                      <div
                        key={`${log.text}-${i}`}
                        className={`flex items-start gap-2 ${
                          i === visibleLogs.length - 1 ? "text-foreground" : "text-muted-foreground/70"
                        }`}
                      >
                        <span className="text-muted-foreground/50 flex-shrink-0">{log.time}</span>
                        <span className={`flex-shrink-0 ${
                          log.type === "success" ? "text-success" :
                          log.type === "debug" ? "text-muted-foreground/50" :
                          "text-primary"
                        }`}>
                          [{log.type.toUpperCase()}]
                        </span>
                        <span className="break-all">{log.text}</span>
                      </div>
                    ))}
                    <div className="text-muted-foreground/50 animate-pulse">▋</div>
                  </div>
                )}
                
                {consoleTab === "network" && (
                  <div className="space-y-1">
                    {networkLogs.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted-foreground">
                        <span className={`px-1 py-0.5 rounded text-[8px] font-bold ${
                          req.method === "GET" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                        }`}>
                          {req.method}
                        </span>
                        <span className="flex-1 truncate text-foreground/80">{req.url}</span>
                        <span className={`${req.status === 200 ? "text-success" : "text-destructive"}`}>{req.status}</span>
                        <span className="text-muted-foreground/50">{req.time}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {consoleTab === "assertions" && (
                  <div className="space-y-1">
                    {assertionLogs.map((assertion, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {assertion.status === "pass" ? (
                          <CheckCircle2 className="w-3 h-3 text-success" />
                        ) : (
                          <Loader2 className="w-3 h-3 text-primary animate-spin" />
                        )}
                        <span className={assertion.status === "pass" ? "text-foreground/80" : "text-primary"}>
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
          <section className={`p-3 bg-muted/10 ${isFullscreen ? 'overflow-y-auto max-h-[calc(100vh-200px)]' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">AI Insights</span>
            </div>
            
            <div className="space-y-4">
              {/* Suggested Assertions */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <CheckSquare className="w-3 h-3 text-success" />
                  <span className="text-[9px] font-medium text-foreground/80">Suggested Assertions</span>
                </div>
                <div className="space-y-1">
                  {suggestedAssertions.map((assertion, i) => (
                    <div
                      key={i}
                      className="px-2 py-1.5 rounded bg-muted/50 border border-border/30 text-[9px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-pointer"
                    >
                      {assertion}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Flaky Selector Warnings */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3 h-3 text-warning" />
                  <span className="text-[9px] font-medium text-foreground/80">Flaky Warnings</span>
                </div>
                <div className="space-y-1">
                  {flakyWarnings.map((warning, i) => (
                    <div
                      key={i}
                      className="px-2 py-1.5 rounded bg-warning/10 border border-warning/20 text-[9px]"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <code className="text-warning">{warning.selector}</code>
                        <span className={`px-1 py-0.5 rounded text-[8px] font-medium ${
                          warning.risk === "high" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
                        }`}>
                          {warning.risk}
                        </span>
                      </div>
                      <p className="text-muted-foreground/70">{warning.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reusable Flows */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Workflow className="w-3 h-3 text-primary" />
                  <span className="text-[9px] font-medium text-foreground/80">Detected Flows</span>
                </div>
                <div className="space-y-1">
                  {reusableFlows.map((flow, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-2 py-1.5 rounded bg-muted/50 border border-border/30 text-[9px] hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <span className="text-foreground/80">{flow.name}</span>
                      <div className="flex items-center gap-2 text-muted-foreground/60">
                        <span>{flow.steps} steps</span>
                        <span className="text-primary">×{flow.reused}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mini Journey Map */}
              <div className="pt-2 border-t border-border/40">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[9px] font-medium text-foreground/80">Journey</span>
                </div>
                <div className="flex items-center justify-between px-1">
                  {["Login", "Navigate", "Assert", "Done"].map((label, i) => (
                    <div key={label} className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-all ${
                        i < 2 
                          ? "bg-success/20 text-success border border-success/40" 
                          : i === 2 
                            ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                            : "bg-muted text-muted-foreground/50 border border-border"
                      }`}>
                        {i < 2 ? "✓" : i + 1}
                      </div>
                      <span className="text-[7px] text-muted-foreground/60 mt-1">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="relative h-px mx-4 mt-2">
                  <div className="absolute inset-0 bg-border" />
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-success to-primary" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderContent()}
      
      {/* Maximize Modal */}
      <Dialog open={isMaximized} onOpenChange={setIsMaximized}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 overflow-hidden">
          <HeroLiveDemo isFullscreen onClose={() => setIsMaximized(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

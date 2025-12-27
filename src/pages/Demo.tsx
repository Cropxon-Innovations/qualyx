import { useEffect, useState, useCallback, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  MonitorPlay, 
  Code2, 
  GitBranch, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  Keyboard,
  MousePointerClick,
  FormInput,
  Eye,
  Timer,
  GripVertical,
  Copy,
  Trash2,
  Plus,
  Loader2,
  Zap,
  AlertTriangle,
  Workflow,
  CheckSquare,
  Network,
  FileCheck,
  MousePointer2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type Scenario = "ui" | "api" | "ci";

interface Step {
  id: number;
  name: string;
  duration: string;
  type: string;
}

const scenarios: { id: Scenario; label: string; icon: React.ElementType; description: string }[] = [
  { id: "ui", label: "UI Automation", icon: MonitorPlay, description: "Record & replay user flows with AI-powered selectors." },
  { id: "api", label: "API Testing", icon: Code2, description: "Validate REST and GraphQL endpoints in seconds." },
  { id: "ci", label: "CI/CD Pipeline", icon: GitBranch, description: "Seamless GitHub Actions, GitLab CI, Jenkins integration." },
];

const stepTemplates = [
  { type: "click", name: "Click Element", icon: MousePointerClick, color: "text-primary" },
  { type: "input", name: "Fill Input", icon: FormInput, color: "text-secondary" },
  { type: "assert", name: "Assert Visible", icon: Eye, color: "text-success" },
  { type: "navigate", name: "Navigate To", icon: AlertTriangle, color: "text-warning" },
  { type: "wait", name: "Wait For", icon: Timer, color: "text-muted-foreground" },
];

const initialStepsData: Record<Scenario, Step[]> = {
  ui: [
    { id: 1, name: "Open login page", duration: "0.6s", type: "navigate" },
    { id: 2, name: "Fill email & password", duration: "1.1s", type: "input" },
    { id: 3, name: "Click sign in", duration: "0.3s", type: "click" },
    { id: 4, name: "Assert dashboard visible", duration: "1.8s", type: "assert" },
  ],
  api: [
    { id: 1, name: "POST /auth/login", duration: "0.4s", type: "click" },
    { id: 2, name: "GET /users/me", duration: "0.2s", type: "click" },
    { id: 3, name: "Validate JSON schema", duration: "0.1s", type: "assert" },
    { id: 4, name: "Assert status 200", duration: "—", type: "assert" },
  ],
  ci: [
    { id: 1, name: "Checkout repo", duration: "2.1s", type: "navigate" },
    { id: 2, name: "Install deps", duration: "8.4s", type: "wait" },
    { id: 3, name: "Run QUALYX tests", duration: "12.3s", type: "click" },
    { id: 4, name: "Upload report", duration: "1.0s", type: "navigate" },
  ],
};

const logsData: Record<Scenario, { type: string; text: string; time: string }[]> = {
  ui: [
    { type: "info", text: "Launching browser…", time: "00:00:01" },
    { type: "debug", text: "page.goto('https://app.example.com')", time: "00:00:02" },
    { type: "info", text: "Filling email field", time: "00:00:03" },
    { type: "debug", text: "click(button[type=submit])", time: "00:00:04" },
    { type: "success", text: "Dashboard loaded ✔", time: "00:00:05" },
  ],
  api: [
    { type: "info", text: "Sending POST /auth/login", time: "00:00:01" },
    { type: "debug", text: "Response 200 in 84ms", time: "00:00:02" },
    { type: "info", text: "Token received", time: "00:00:03" },
    { type: "debug", text: "GET /users/me", time: "00:00:04" },
    { type: "success", text: "Schema valid ✔", time: "00:00:05" },
  ],
  ci: [
    { type: "info", text: "Pipeline started", time: "00:00:01" },
    { type: "debug", text: "Node v18.17.0", time: "00:00:02" },
    { type: "info", text: "Installing dependencies…", time: "00:00:03" },
    { type: "debug", text: "qualyx run --headless", time: "00:00:04" },
    { type: "success", text: "24/24 tests passed ✔", time: "00:00:05" },
  ],
};

const networkLogs = [
  { method: "GET", url: "/login", status: 200, time: "42ms" },
  { method: "POST", url: "/api/auth/login", status: 200, time: "234ms" },
  { method: "GET", url: "/api/user/me", status: 200, time: "89ms" },
];

const assertionLogs = [
  { name: "Page title matches", status: "pass" },
  { name: "Email field visible", status: "pass" },
  { name: "Login button enabled", status: "pass" },
  { name: "Dashboard loaded", status: "running" },
];

const suggestedAssertions = [
  "Verify session cookie is set",
  "Check localStorage token",
  "Assert redirect to /dashboard",
];

const flakyWarnings = [
  { selector: "#submit-btn", risk: "medium", reason: "Dynamic class names" },
];

const reusableFlows = [
  { name: "Login Flow", steps: 4, reused: 12 },
  { name: "Logout Flow", steps: 2, reused: 8 },
];

type ConsoleTab = "logs" | "network" | "assertions";

const Demo = () => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState<typeof logsData.ui>([]);
  const [steps, setSteps] = useState<Step[]>(initialStepsData.ui);
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("logs");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [draggedTemplate, setDraggedTemplate] = useState<string | null>(null);
  const [nextId, setNextId] = useState(10);
  const [previewAction, setPreviewAction] = useState<string | null>("Click detected");
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const consoleRef = useRef<HTMLDivElement>(null);

  const scenario = scenarios[scenarioIndex].id;
  const logs = logsData[scenario];

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setScenarioIndex((p) => (p - 1 + scenarios.length) % scenarios.length);
    } else if (e.key === "ArrowRight") {
      setScenarioIndex((p) => (p + 1) % scenarios.length);
    } else if (e.key === " ") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset on scenario change
  useEffect(() => {
    setActiveStep(0);
    setVisibleLogs([logs[0]]);
    setSteps(initialStepsData[scenario].map((s, i) => ({ ...s, id: i + 1 })));
  }, [scenario, logs]);

  // Animate steps
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setActiveStep((p) => (p + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [playing, steps.length]);

  // Animate logs
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = logs[prev.length % logs.length];
        return [...prev.slice(-5), next];
      });
    }, 800);
    return () => clearInterval(timer);
  }, [playing, logs]);

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

  // Animate cursor
  useEffect(() => {
    const positions = [{ x: 50, y: 50 }, { x: 45, y: 40 }, { x: 55, y: 60 }, { x: 48, y: 45 }];
    let idx = 0;
    const timer = setInterval(() => {
      setCursorPos(positions[idx % positions.length]);
      idx++;
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Drag handlers
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    setDraggedTemplate(null);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const handleTemplateDragStart = useCallback((e: React.DragEvent, templateType: string) => {
    setDraggedTemplate(templateType);
    setDraggedIndex(null);
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedTemplate) {
      const template = stepTemplates.find(t => t.type === draggedTemplate);
      if (template) {
        const newStep: Step = {
          id: nextId,
          name: `${template.name} (new)`,
          duration: "—",
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

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newSteps = [...steps];
      const [draggedStep] = newSteps.splice(draggedIndex, 1);
      newSteps.splice(dropIndex, 0, draggedStep);
      setSteps(newSteps);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [draggedIndex, draggedTemplate, steps, nextId]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
    setDraggedTemplate(null);
  }, []);

  const duplicateStep = useCallback((index: number) => {
    const stepToDuplicate = steps[index];
    const newStep: Step = {
      ...stepToDuplicate,
      id: nextId,
      name: `${stepToDuplicate.name} (copy)`
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

  const getStepIcon = (status: string, type: string) => {
    if (status === "done") return <CheckCircle2 className="w-4 h-4 text-success" />;
    if (status === "running") return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
    const template = stepTemplates.find(t => t.type === type);
    if (template) {
      const IconComponent = template.icon;
      return <IconComponent className={`w-4 h-4 ${template.color} opacity-50`} />;
    }
    return <div className="w-4 h-4 rounded-full border border-border/50" />;
  };

  const goToPrev = () => setScenarioIndex((p) => (p - 1 + scenarios.length) % scenarios.length);
  const goToNext = () => setScenarioIndex((p) => (p + 1) % scenarios.length);
  const overallProgress = ((scenarioIndex * steps.length + activeStep + 1) / (scenarios.length * steps.length)) * 100;

  return (
    <>
      <Helmet>
        <title>Interactive Test Builder — QUALYX</title>
        <meta name="description" content="Build and customize your test automation flows with QUALYX's interactive test builder." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-16 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <ScrollReveal>
              <header className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 gradient-text-white">
                  Interactive Test Builder
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto mb-4">
                  Drag templates to add steps, reorder with drag & drop, right-click for actions.
                </p>
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/60">
                  <span className="flex items-center gap-1"><Keyboard className="w-3.5 h-3.5" /> Arrow keys to switch</span>
                  <span>•</span>
                  <span>Space to play/pause</span>
                </div>
              </header>
            </ScrollReveal>

            {/* Progress bar */}
            <ScrollReveal delay={50}>
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Demo Progress</span>
                  <span>{Math.round(overallProgress)}% Complete</span>
                </div>
                <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary via-secondary to-success rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Scenario navigation */}
            <ScrollReveal delay={100}>
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={goToPrev} className="rounded-full">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex gap-2">
                  {scenarios.map((s, idx) => {
                    const IconComponent = s.icon;
                    const isActive = idx === scenarioIndex;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setScenarioIndex(idx)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-secondary/20 text-foreground border border-secondary/40 shadow-lg"
                            : "bg-card/40 text-muted-foreground border border-border/30 hover:border-border"
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${isActive ? "text-secondary" : ""}`} />
                        <span className="hidden sm:inline">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
                <Button variant="ghost" size="icon" onClick={goToNext} className="rounded-full">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </ScrollReveal>

            {/* Main Demo Panel */}
            <ScrollReveal delay={150}>
              <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-card/90">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-destructive/70" />
                      <div className="w-3 h-3 rounded-full bg-warning/70" />
                      <div className="w-3 h-3 rounded-full bg-success/70" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{scenarios[scenarioIndex].label} Demo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="ghost" onClick={() => setPlaying((p) => !p)} className="gap-2">
                      {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {playing ? "Pause" : "Play"}
                    </Button>
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-muted/20 text-xs text-muted-foreground">
                      Step {activeStep + 1}/{steps.length}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">00:12:48</span>
                  </div>
                </header>

                {/* Body */}
                <div className="grid lg:grid-cols-[240px_1fr_260px] min-h-[500px]">
                  {/* LEFT: Steps + Templates */}
                  <section className="p-4 border-b lg:border-b-0 lg:border-r border-border/40 bg-muted/20 overflow-y-auto max-h-[600px]">
                    {/* Templates */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Plus className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Step Templates</span>
                      </div>
                      <p className="text-[9px] text-muted-foreground/60 mb-2">Drag to add to timeline</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {stepTemplates.map((template) => {
                          const IconComponent = template.icon;
                          return (
                            <div
                              key={template.type}
                              draggable
                              onDragStart={(e) => handleTemplateDragStart(e, template.type)}
                              onDragEnd={handleDragEnd}
                              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-card/60 border border-border/40 cursor-grab active:cursor-grabbing hover:border-primary/40 hover:bg-primary/5 transition-all ${
                                draggedTemplate === template.type ? 'opacity-50 scale-95' : ''
                              }`}
                            >
                              <IconComponent className={`w-3.5 h-3.5 ${template.color}`} />
                              <span className="text-[9px] text-muted-foreground truncate">{template.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Test Steps</span>
                      </div>
                      <span className="text-[8px] text-muted-foreground/60">Right-click for options</span>
                    </div>

                    <div className="space-y-1.5">
                      {steps.map((step, idx) => {
                        const isActive = idx === activeStep;
                        const isDone = idx < activeStep;
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
                                className={`relative flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-grab active:cursor-grabbing select-none ${
                                  isDragging ? "opacity-50 scale-95"
                                    : isDragOver ? "bg-primary/20 border-2 border-dashed border-primary/50"
                                    : isActive ? "bg-primary/10 border border-primary/40 shadow-md"
                                    : "border border-transparent hover:bg-muted/50"
                                }`}
                              >
                                <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
                                {getStepIcon(isDone ? "done" : isActive ? "running" : "pending", step.type)}
                                <div className="flex-1 min-w-0">
                                  <span className={`text-xs block truncate ${isActive ? "text-foreground font-medium" : isDone ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                                    {step.name}
                                  </span>
                                  {isDone && <span className="text-[9px] text-muted-foreground/50 font-mono">{step.duration}</span>}
                                </div>
                              </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent className="w-44">
                              <ContextMenuItem onClick={() => duplicateStep(idx)} className="gap-2 text-xs">
                                <Copy className="w-3.5 h-3.5" /> Duplicate Step
                              </ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuItem 
                                onClick={() => deleteStep(idx)} 
                                className="gap-2 text-xs text-destructive focus:text-destructive"
                                disabled={steps.length <= 1}
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Delete Step
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenu>
                        );
                      })}
                    </div>

                    {/* Progress */}
                    <div className="mt-4 pt-4 border-t border-border/40">
                      <div className="flex justify-between text-[9px] text-muted-foreground/60 mb-1">
                        <span>Step Progress</span>
                        <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500"
                          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </section>

                  {/* CENTER: Preview + Console */}
                  <section className="flex flex-col border-b lg:border-b-0 lg:border-r border-border/40">
                    {/* Preview */}
                    <div className="flex-1 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <MonitorPlay className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Live Preview</span>
                      </div>
                      <div className="relative h-[240px] rounded-xl border border-border/50 bg-background/80 overflow-hidden">
                        <div 
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `linear-gradient(to right, hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                          }}
                        />
                        <div className="absolute top-0 inset-x-0 h-7 bg-muted/50 border-b border-border/50 flex items-center px-3 gap-1.5">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                          </div>
                          <div className="flex-1 mx-2 h-4 rounded bg-background/80 flex items-center px-2">
                            <span className="text-[10px] text-muted-foreground/60 font-mono">app.example.com/login</span>
                          </div>
                        </div>
                        <div className="absolute top-7 inset-x-0 bottom-0 p-6">
                          <div className="max-w-[180px] mx-auto space-y-3">
                            <div className="h-4 w-24 bg-muted/60 rounded mx-auto" />
                            <div className="h-9 bg-muted/40 rounded-lg border border-border/40" />
                            <div className="h-9 bg-muted/40 rounded-lg border border-border/40" />
                            <div className="h-9 bg-primary/20 rounded-lg border border-primary/40 flex items-center justify-center">
                              <span className="text-sm text-primary font-medium">Sign In</span>
                            </div>
                          </div>
                        </div>
                        <div 
                          className="absolute transition-all duration-700 ease-out pointer-events-none"
                          style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <MousePointer2 className="w-5 h-5 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
                        </div>
                        {previewAction && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-lg bg-card/90 border border-primary/30 backdrop-blur-sm shadow-lg">
                            <div className="flex items-center gap-2">
                              {previewAction === "Click detected" && <MousePointerClick className="w-4 h-4 text-primary" />}
                              {previewAction === "Typing..." && <Keyboard className="w-4 h-4 text-warning" />}
                              {previewAction === "Assertion running" && <CheckSquare className="w-4 h-4 text-success" />}
                              {previewAction === "Waiting..." && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />}
                              <span className="text-sm text-foreground">{previewAction}</span>
                            </div>
                          </div>
                        )}
                        {previewAction === "Click detected" && (
                          <div 
                            className="absolute w-12 h-12 rounded-full border-2 border-primary/50 animate-ping pointer-events-none"
                            style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Console */}
                    <div className="border-t border-border/40 bg-muted/10">
                      <div className="flex items-center gap-1 px-4 py-2 border-b border-border/30">
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
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                                isActive ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              }`}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                              {tab.label}
                            </button>
                          );
                        })}
                      </div>
                      <div ref={consoleRef} className="h-[100px] overflow-y-auto px-4 py-3 font-mono text-[10px] leading-relaxed">
                        {consoleTab === "logs" && (
                          <div className="space-y-1">
                            {visibleLogs.map((log, i) => (
                              <div key={`${log.text}-${i}`} className={`flex gap-2 ${i === visibleLogs.length - 1 ? "text-foreground" : "text-muted-foreground/70"}`}>
                                <span className="text-muted-foreground/50">{log.time}</span>
                                <span className={log.type === "success" ? "text-success" : log.type === "debug" ? "text-muted-foreground/50" : "text-primary"}>
                                  [{log.type.toUpperCase()}]
                                </span>
                                <span>{log.text}</span>
                              </div>
                            ))}
                            <span className="text-muted-foreground/50 animate-pulse">▋</span>
                          </div>
                        )}
                        {consoleTab === "network" && (
                          <div className="space-y-1.5">
                            {networkLogs.map((req, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${req.method === "GET" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                                  {req.method}
                                </span>
                                <span className="flex-1 truncate text-foreground/80">{req.url}</span>
                                <span className="text-success">{req.status}</span>
                                <span className="text-muted-foreground/50">{req.time}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {consoleTab === "assertions" && (
                          <div className="space-y-1.5">
                            {assertionLogs.map((a, i) => (
                              <div key={i} className="flex items-center gap-2">
                                {a.status === "pass" ? <CheckCircle2 className="w-3.5 h-3.5 text-success" /> : <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />}
                                <span className={a.status === "pass" ? "text-foreground/80" : "text-primary"}>{a.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* RIGHT: AI Insights */}
                  <section className="p-4 bg-muted/10 overflow-y-auto max-h-[600px]">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">AI Insights</span>
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <CheckSquare className="w-3.5 h-3.5 text-success" />
                          <span className="text-[10px] font-medium text-foreground/80">Suggested Assertions</span>
                        </div>
                        <div className="space-y-1.5">
                          {suggestedAssertions.map((a, i) => (
                            <div key={i} className="px-3 py-2 rounded-lg bg-muted/50 border border-border/30 text-[10px] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all cursor-pointer">
                              {a}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                          <span className="text-[10px] font-medium text-foreground/80">Flaky Warnings</span>
                        </div>
                        {flakyWarnings.map((w, i) => (
                          <div key={i} className="px-3 py-2 rounded-lg bg-warning/10 border border-warning/20 text-[10px]">
                            <div className="flex items-center justify-between mb-1">
                              <code className="text-warning">{w.selector}</code>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-warning/20 text-warning">{w.risk}</span>
                            </div>
                            <p className="text-muted-foreground/70">{w.reason}</p>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Workflow className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-medium text-foreground/80">Detected Flows</span>
                        </div>
                        <div className="space-y-1.5">
                          {reusableFlows.map((f, i) => (
                            <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/50 border border-border/30 text-[10px] hover:border-primary/30 transition-all cursor-pointer">
                              <span className="text-foreground/80">{f.name}</span>
                              <div className="flex items-center gap-2 text-muted-foreground/60">
                                <span>{f.steps} steps</span>
                                <span className="text-primary">×{f.reused}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-border/40">
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-[10px] font-medium text-foreground/80">Journey Map</span>
                        </div>
                        <div className="flex items-center justify-between px-2">
                          {["Start", "Auth", "Test", "Done"].map((label, i) => (
                            <div key={label} className="flex flex-col items-center">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                i < 2 ? "bg-success/20 text-success border border-success/40"
                                  : i === 2 ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_8px_hsl(var(--primary)/0.3)]"
                                  : "bg-muted text-muted-foreground/50 border border-border"
                              }`}>
                                {i < 2 ? "✓" : i + 1}
                              </div>
                              <span className="text-[8px] text-muted-foreground/60 mt-1">{label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="relative h-px mx-5 mt-2">
                          <div className="absolute inset-0 bg-border" />
                          <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-success to-primary" />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="px-6 py-4 border-t border-border/40 bg-muted/10">
                  <p className="text-sm text-muted-foreground text-center">{scenarios[scenarioIndex].description}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex justify-center mt-12">
                <Link to="/#waitlist">
                  <Button variant="hero" size="lg" className="gap-2">Join the Waitlist</Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Demo;

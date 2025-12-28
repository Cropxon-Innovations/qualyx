import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Play, 
  Pause, 
  Square,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Loader2,
  Terminal,
  Camera,
  Network,
  ChevronRight,
  Filter,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface TestStep {
  id: number;
  name: string;
  status: "pending" | "running" | "passed" | "failed" | "skipped";
  duration: string;
}

interface ConsoleLog {
  type: "info" | "success" | "error" | "step" | "warning";
  message: string;
  time: string;
}

interface NetworkRequest {
  id: number;
  method: string;
  url: string;
  status: number;
  duration: string;
  size: string;
}

const initialSteps: TestStep[] = [
  { id: 1, name: "Navigate to /login", status: "pending", duration: "-" },
  { id: 2, name: "Enter email", status: "pending", duration: "-" },
  { id: 3, name: "Enter password", status: "pending", duration: "-" },
  { id: 4, name: "Click login button", status: "pending", duration: "-" },
  { id: 5, name: "Wait for navigation", status: "pending", duration: "-" },
  { id: 6, name: "Assert dashboard visible", status: "pending", duration: "-" },
  { id: 7, name: "Check user profile", status: "pending", duration: "-" },
  { id: 8, name: "Verify welcome message", status: "pending", duration: "-" },
];

const browserStates = [
  { url: "https://app.example.com/login", content: "Login Page - Form visible" },
  { url: "https://app.example.com/login", content: "Entering credentials..." },
  { url: "https://app.example.com/login", content: "Submitting form..." },
  { url: "https://app.example.com/dashboard", content: "Redirecting..." },
  { url: "https://app.example.com/dashboard", content: "Dashboard loaded" },
];

const getTimeString = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0];
};

export const RunCenter = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [steps, setSteps] = useState<TestStep[]>(initialSteps);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [networkRequests, setNetworkRequests] = useState<NetworkRequest[]>([]);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [browserState, setBrowserState] = useState(browserStates[0]);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const consoleRef = useRef<HTMLDivElement>(null);
  const executionRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const progress = steps.filter(s => s.status === "passed" || s.status === "failed").length / steps.length * 100;
  const passedCount = steps.filter(s => s.status === "passed").length;
  const failedCount = steps.filter(s => s.status === "failed").length;
  const runningCount = steps.filter(s => s.status === "running").length;
  const pendingCount = steps.filter(s => s.status === "pending").length;

  const addLog = useCallback((type: ConsoleLog["type"], message: string) => {
    setConsoleLogs(prev => [...prev, { type, message, time: getTimeString() }]);
  }, []);

  const addNetworkRequest = useCallback((method: string, url: string, status: number, duration: string, size: string) => {
    setNetworkRequests(prev => [...prev, {
      id: prev.length + 1,
      method,
      url,
      status,
      duration,
      size
    }]);
  }, []);

  const captureScreenshot = useCallback((stepName: string) => {
    setScreenshots(prev => [...prev, `Screenshot - ${stepName}`]);
  }, []);

  const simulateStep = useCallback((stepIndex: number) => {
    if (stepIndex >= steps.length) {
      // Test completed
      addLog("success", "✓ Test execution completed successfully!");
      setIsRunning(false);
      toast({
        title: "Test Completed",
        description: `${passedCount + 1} passed, ${failedCount} failed`,
      });
      return;
    }

    const step = initialSteps[stepIndex];
    
    // Mark current step as running
    setSteps(prev => prev.map((s, i) => 
      i === stepIndex ? { ...s, status: "running" } : s
    ));
    setCurrentStepIndex(stepIndex);
    addLog("step", `→ ${step.name}`);

    // Update browser state
    if (stepIndex < browserStates.length) {
      setBrowserState(browserStates[stepIndex]);
    }

    // Simulate network requests for certain steps
    if (step.name.includes("Navigate") || step.name.includes("Click")) {
      setTimeout(() => {
        addNetworkRequest("GET", browserStates[Math.min(stepIndex, browserStates.length - 1)].url, 200, `${(Math.random() * 200 + 50).toFixed(0)}ms`, `${(Math.random() * 50 + 10).toFixed(1)}KB`);
      }, 300);
    }

    // Simulate step completion after random delay
    const stepDuration = Math.random() * 1500 + 500;
    
    executionRef.current = setTimeout(() => {
      if (isPaused) return;
      
      // 90% chance of passing, 10% chance of failing (but not for demo, always pass)
      const passed = true; // For demo, always pass
      const duration = `${(stepDuration / 1000).toFixed(1)}s`;

      setSteps(prev => prev.map((s, i) => 
        i === stepIndex ? { ...s, status: passed ? "passed" : "failed", duration } : s
      ));

      if (passed) {
        addLog("success", `✓ ${step.name} completed`);
      } else {
        addLog("error", `✗ ${step.name} failed: Element not found`);
      }

      // Capture screenshot
      captureScreenshot(step.name);

      // Continue to next step
      if (!isPaused && isRunning) {
        simulateStep(stepIndex + 1);
      }
    }, stepDuration);
  }, [steps.length, isPaused, isRunning, addLog, addNetworkRequest, captureScreenshot, passedCount, failedCount]);

  const startTest = useCallback(() => {
    // Reset state
    setSteps(initialSteps);
    setConsoleLogs([]);
    setNetworkRequests([]);
    setScreenshots([]);
    setCurrentStepIndex(-1);
    setBrowserState(browserStates[0]);
    setElapsedTime(0);
    setStartTime(getTimeString());
    setIsRunning(true);
    setIsPaused(false);

    // Add initial logs
    setTimeout(() => {
      addLog("info", "Starting test execution...");
    }, 100);
    setTimeout(() => {
      addLog("info", "Browser launched (Chromium 120)");
      addNetworkRequest("GET", "https://app.example.com", 200, "45ms", "12.3KB");
    }, 500);
    setTimeout(() => {
      simulateStep(0);
    }, 1000);
  }, [addLog, addNetworkRequest, simulateStep]);

  const stopTest = useCallback(() => {
    if (executionRef.current) {
      clearTimeout(executionRef.current);
    }
    setIsRunning(false);
    setIsPaused(false);
    addLog("warning", "⚠ Test execution stopped by user");
    
    // Mark running step as skipped
    setSteps(prev => prev.map(s => 
      s.status === "running" ? { ...s, status: "skipped", duration: "-" } : s
    ));

    toast({
      title: "Test Stopped",
      description: "Execution was cancelled",
      variant: "destructive",
    });
  }, [addLog]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => {
      const newPaused = !prev;
      if (newPaused) {
        addLog("warning", "⏸ Test paused");
        if (executionRef.current) {
          clearTimeout(executionRef.current);
        }
      } else {
        addLog("info", "▶ Test resumed");
        // Resume from current step
        const runningIndex = steps.findIndex(s => s.status === "running");
        if (runningIndex >= 0) {
          simulateStep(runningIndex);
        }
      }
      return newPaused;
    });
  }, [addLog, steps, simulateStep]);

  const skipStep = useCallback(() => {
    if (currentStepIndex < 0 || currentStepIndex >= steps.length) return;
    
    if (executionRef.current) {
      clearTimeout(executionRef.current);
    }

    setSteps(prev => prev.map((s, i) => 
      i === currentStepIndex ? { ...s, status: "skipped", duration: "skipped" } : s
    ));
    addLog("warning", `⏭ Skipped: ${steps[currentStepIndex].name}`);
    
    // Continue to next step
    simulateStep(currentStepIndex + 1);
  }, [currentStepIndex, steps, addLog, simulateStep]);

  // Elapsed time timer
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused]);

  // Auto-scroll console logs
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleLogs]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (executionRef.current) clearTimeout(executionRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleExportLogs = () => {
    const logContent = consoleLogs.map(log => `[${log.time}] ${log.message}`).join('\n');
    const blob = new Blob([logContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `run-logs-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    toast({
      title: "Logs Exported",
      description: "Console logs downloaded successfully",
    });
  };

  const formatElapsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Run Center</h1>
            <p className="text-sm text-muted-foreground">
              Suite: Login Flow Tests {startTime && `• Started: ${startTime}`}
              {isRunning && ` • Elapsed: ${formatElapsed(elapsedTime)}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={consoleLogs.length === 0} onClick={handleExportLogs}>
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
            {!isRunning ? (
              <Button size="sm" onClick={startTest} className="bg-primary hover:bg-primary/90">
                <Play className="w-4 h-4 mr-2" />
                Start Test
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={togglePause}>
                  {isPaused ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  )}
                </Button>
                <Button variant="destructive" size="sm" onClick={stopTest}>
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Progress */}
        <Card className="bg-card/50 border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                {isRunning ? (
                  isPaused ? (
                    <Pause className="w-5 h-5 text-warning" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  )
                ) : progress === 100 ? (
                  failedCount > 0 ? (
                    <XCircle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )
                ) : (
                  <Clock className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">
                    {!isRunning && progress === 0 ? "Ready to run" :
                     isRunning && isPaused ? "Paused" :
                     isRunning ? "Running..." :
                     failedCount > 0 ? "Completed with failures" : "Completed"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {passedCount + failedCount} of {steps.length} steps completed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 className="w-4 h-4" />{passedCount} Passed
                </span>
                {failedCount > 0 && (
                  <span className="flex items-center gap-1 text-destructive">
                    <XCircle className="w-4 h-4" />{failedCount} Failed
                  </span>
                )}
                {runningCount > 0 && (
                  <span className="flex items-center gap-1 text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />{runningCount} Running
                  </span>
                )}
                {pendingCount > 0 && (
                  <span className="flex items-center gap-1 text-muted-foreground">
                    {pendingCount} Pending
                  </span>
                )}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Steps */}
          <Card className="lg:col-span-1 bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Test Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/30 max-h-[500px] overflow-y-auto">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-3 px-4 py-3 transition-all duration-300 ${
                      step.status === "running" 
                        ? "bg-primary/10 border-l-2 border-l-primary" 
                        : step.status === "passed"
                        ? "bg-success/5"
                        : step.status === "failed"
                        ? "bg-destructive/5"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <span className="text-xs text-muted-foreground w-4">{step.id}</span>
                    {step.status === "passed" ? (
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    ) : step.status === "running" ? (
                      <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                    ) : step.status === "failed" ? (
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    ) : step.status === "skipped" ? (
                      <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm transition-colors duration-300 ${
                        step.status === "pending" ? "text-muted-foreground" : 
                        step.status === "running" ? "text-primary font-medium" :
                        "text-foreground"
                      }`}>
                        {step.name}
                      </p>
                    </div>
                    <span className={`text-xs ${
                      step.status === "running" ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {step.duration}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Preview + Logs */}
          <div className="lg:col-span-2 space-y-4">
            {/* Browser Preview */}
            <Card className="bg-card/50 border-border/40 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-muted/10">
                <span className="text-sm font-medium text-foreground">Live Preview</span>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={!isRunning}
                    onClick={togglePause}
                  >
                    {isPaused ? (
                      <>
                        <Play className="w-3 h-3 mr-1" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    disabled={!isRunning || isPaused}
                    onClick={skipStep}
                  >
                    <ChevronRight className="w-3 h-3 mr-1" />
                    Skip
                  </Button>
                </div>
              </div>
              <div className="aspect-video bg-background relative">
                {/* Browser Chrome */}
                <div className="absolute inset-4 rounded-lg border border-border/40 bg-card/30 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40 bg-muted/20">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-destructive/70" />
                      <div className="w-2 h-2 rounded-full bg-warning/70" />
                      <div className="w-2 h-2 rounded-full bg-success/70" />
                    </div>
                    <div className="flex-1 h-5 rounded bg-muted/30 text-[10px] text-muted-foreground flex items-center px-2 font-mono transition-all duration-300">
                      {browserState.url}
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full p-4">
                    <div className="text-center">
                      {isRunning && !isPaused ? (
                        <>
                          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">{browserState.content}</p>
                        </>
                      ) : isPaused ? (
                        <>
                          <Pause className="w-8 h-8 text-warning mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Execution paused</p>
                        </>
                      ) : progress === 100 ? (
                        <>
                          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Test completed</p>
                        </>
                      ) : (
                        <>
                          <Play className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Click "Start Test" to begin</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recording indicator */}
                {isRunning && (
                  <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/90 text-white text-xs">
                    <span className={`w-2 h-2 rounded-full bg-white ${isPaused ? '' : 'animate-pulse'}`} />
                    {isPaused ? "Paused" : "Recording"}
                  </div>
                )}
              </div>
            </Card>

            {/* Logs */}
            <Card className="bg-card/50 border-border/40">
              <CardContent className="p-0">
                <Tabs defaultValue="console">
                  <TabsList className="w-full rounded-none border-b border-border/40 bg-transparent h-10">
                    <TabsTrigger value="console" className="flex-1 gap-2">
                      <Terminal className="w-3 h-3" />
                      Console
                      {consoleLogs.length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                          {consoleLogs.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="network" className="flex-1 gap-2">
                      <Network className="w-3 h-3" />
                      Network
                      {networkRequests.length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                          {networkRequests.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="screenshots" className="flex-1 gap-2">
                      <Camera className="w-3 h-3" />
                      Screenshots
                      {screenshots.length > 0 && (
                        <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                          {screenshots.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="console" className="mt-0">
                    <div 
                      ref={consoleRef}
                      className="h-[250px] overflow-y-auto p-3 font-mono text-xs space-y-1 bg-background/50"
                    >
                      {consoleLogs.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <Terminal className="w-6 h-6 mr-2 opacity-50" />
                          Logs will appear here when test starts
                        </div>
                      ) : (
                        consoleLogs.map((log, i) => (
                          <div key={i} className={`flex gap-2 py-0.5 animate-fade-in ${
                            log.type === "success" ? "text-success" :
                            log.type === "error" ? "text-destructive" :
                            log.type === "warning" ? "text-warning" :
                            log.type === "step" ? "text-primary" :
                            "text-muted-foreground"
                          }`}>
                            <span className="text-muted-foreground/50">[{log.time}]</span>
                            <span>{log.message}</span>
                          </div>
                        ))
                      )}
                      {isRunning && !isPaused && (
                        <div className="flex items-center gap-2 text-primary animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Processing...</span>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="network" className="mt-0">
                    <div className="h-[250px] overflow-y-auto">
                      {networkRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                          <Network className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-sm">No network requests captured</p>
                        </div>
                      ) : (
                        <table className="w-full text-xs">
                          <thead className="bg-muted/30 sticky top-0">
                            <tr>
                              <th className="text-left px-3 py-2 font-medium">Method</th>
                              <th className="text-left px-3 py-2 font-medium">URL</th>
                              <th className="text-left px-3 py-2 font-medium">Status</th>
                              <th className="text-left px-3 py-2 font-medium">Duration</th>
                              <th className="text-left px-3 py-2 font-medium">Size</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/30">
                            {networkRequests.map((req) => (
                              <tr key={req.id} className="hover:bg-muted/20 animate-fade-in">
                                <td className="px-3 py-2">
                                  <Badge variant="outline" className="text-xs">
                                    {req.method}
                                  </Badge>
                                </td>
                                <td className="px-3 py-2 font-mono text-muted-foreground max-w-[200px] truncate">
                                  {req.url}
                                </td>
                                <td className="px-3 py-2">
                                  <span className={req.status < 400 ? "text-success" : "text-destructive"}>
                                    {req.status}
                                  </span>
                                </td>
                                <td className="px-3 py-2 text-muted-foreground">{req.duration}</td>
                                <td className="px-3 py-2 text-muted-foreground">{req.size}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="screenshots" className="mt-0">
                    <div className="h-[250px] overflow-y-auto p-4">
                      {screenshots.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                          <Camera className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-sm">Screenshots will be captured during test</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-3">
                          {screenshots.map((screenshot, i) => (
                            <div 
                              key={i} 
                              className="aspect-video rounded bg-muted/30 border border-border/40 flex items-center justify-center p-2 animate-scale-in"
                            >
                              <div className="text-center">
                                <Camera className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                                <p className="text-[10px] text-muted-foreground truncate">
                                  Step {i + 1}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default RunCenter;

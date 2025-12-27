import { useState } from "react";
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

const runSteps = [
  { id: 1, name: "Navigate to /login", status: "passed", duration: "1.2s" },
  { id: 2, name: "Enter email", status: "passed", duration: "0.3s" },
  { id: 3, name: "Enter password", status: "passed", duration: "0.3s" },
  { id: 4, name: "Click login button", status: "passed", duration: "0.1s" },
  { id: 5, name: "Wait for navigation", status: "running", duration: "..." },
  { id: 6, name: "Assert dashboard visible", status: "pending", duration: "-" },
  { id: 7, name: "Check user profile", status: "pending", duration: "-" },
  { id: 8, name: "Verify welcome message", status: "pending", duration: "-" },
];

const consoleOutput = [
  { type: "info", message: "Starting test execution...", time: "10:42:15" },
  { type: "info", message: "Browser launched (Chromium 120)", time: "10:42:16" },
  { type: "step", message: "→ Navigate to /login", time: "10:42:17" },
  { type: "success", message: "✓ Navigation complete", time: "10:42:18" },
  { type: "step", message: "→ Enter email", time: "10:42:18" },
  { type: "success", message: "✓ Input filled", time: "10:42:18" },
  { type: "step", message: "→ Enter password", time: "10:42:19" },
  { type: "success", message: "✓ Input filled", time: "10:42:19" },
  { type: "step", message: "→ Click login button", time: "10:42:20" },
  { type: "info", message: "Waiting for navigation...", time: "10:42:20" },
];

export const RunCenter = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [progress, setProgress] = useState(52);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Run Center</h1>
          <p className="text-sm text-muted-foreground">
            Suite: Login Flow Tests • Started: 10:42:15 AM
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          {isRunning ? (
            <Button variant="destructive" size="sm" onClick={() => setIsRunning(false)}>
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button size="sm" onClick={() => setIsRunning(true)}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Re-run
            </Button>
          )}
        </div>
      </div>

      {/* Progress */}
      <Card className="bg-card/50 border-border/40">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {isRunning ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-success" />
              )}
              <div>
                <p className="font-medium text-foreground">
                  {isRunning ? "Running..." : "Completed"}
                </p>
                <p className="text-sm text-muted-foreground">4 of 8 steps completed</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-success">
                <CheckCircle2 className="w-4 h-4" />4 Passed
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />1 Running
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                3 Pending
              </span>
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
            <div className="divide-y divide-border/30">
              {runSteps.map((step) => (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                    step.status === "running" ? "bg-primary/5" : "hover:bg-muted/30"
                  }`}
                >
                  <span className="text-xs text-muted-foreground w-4">{step.id}</span>
                  {step.status === "passed" ? (
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                  ) : step.status === "running" ? (
                    <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
                  ) : step.status === "failed" ? (
                    <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${
                      step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{step.duration}</span>
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
                <Button variant="ghost" size="sm">
                  <Pause className="w-3 h-3 mr-1" />
                  Pause
                </Button>
                <Button variant="ghost" size="sm">
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
                  <div className="flex-1 h-5 rounded bg-muted/30 text-[10px] text-muted-foreground flex items-center px-2 font-mono">
                    https://app.example.com/login
                  </div>
                </div>
                <div className="flex items-center justify-center h-full p-4">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Waiting for navigation...</p>
                  </div>
                </div>
              </div>

              {/* Recording indicator */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/90 text-white text-xs">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Recording
              </div>
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
                  </TabsTrigger>
                  <TabsTrigger value="network" className="flex-1 gap-2">
                    <Network className="w-3 h-3" />
                    Network
                  </TabsTrigger>
                  <TabsTrigger value="screenshots" className="flex-1 gap-2">
                    <Camera className="w-3 h-3" />
                    Screenshots
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="console" className="mt-0">
                  <div className="max-h-[250px] overflow-y-auto p-3 font-mono text-xs space-y-1 bg-background/50">
                    {consoleOutput.map((log, i) => (
                      <div key={i} className={`flex gap-2 py-0.5 ${
                        log.type === "success" ? "text-success" :
                        log.type === "error" ? "text-destructive" :
                        log.type === "step" ? "text-primary" :
                        "text-muted-foreground"
                      }`}>
                        <span className="text-muted-foreground/50">[{log.time}]</span>
                        <span>{log.message}</span>
                      </div>
                    ))}
                    {isRunning && (
                      <div className="flex items-center gap-2 text-primary">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Waiting for response...</span>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="network" className="mt-0">
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    <Network className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    3 requests captured
                  </div>
                </TabsContent>
                <TabsContent value="screenshots" className="mt-0">
                  <div className="p-4 grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video rounded bg-muted/30 border border-border/40" />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RunCenter;

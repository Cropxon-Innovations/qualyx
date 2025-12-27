import { useState } from "react";
import { 
  Play, 
  Pause, 
  SkipForward,
  RotateCcw,
  Maximize2,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Bug,
  Network,
  Terminal,
  MousePointer2,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const timelineEvents = [
  { time: "0:00", action: "Navigate", target: "/login", status: "passed" },
  { time: "0:02", action: "Click", target: "#email-input", status: "passed" },
  { time: "0:03", action: "Type", target: "user@example.com", status: "passed" },
  { time: "0:05", action: "Click", target: "#password-input", status: "passed" },
  { time: "0:06", action: "Type", target: "••••••••", status: "passed" },
  { time: "0:08", action: "Click", target: "button[type='submit']", status: "passed" },
  { time: "0:10", action: "Wait", target: "Navigation complete", status: "passed" },
  { time: "0:12", action: "Assert", target: "Dashboard visible", status: "failed" },
];

const consoleLog = [
  { type: "log", message: "[React] App mounted", time: "0:01" },
  { type: "log", message: "[Auth] Login form initialized", time: "0:02" },
  { type: "warn", message: "[Perf] Slow render detected (120ms)", time: "0:05" },
  { type: "log", message: "[Auth] Submitting credentials...", time: "0:08" },
  { type: "error", message: "[Auth] Failed to authenticate: 401 Unauthorized", time: "0:10" },
  { type: "error", message: "[Error] Dashboard component not found", time: "0:12" },
];

const networkRequests = [
  { method: "GET", url: "/api/config", status: 200, time: "45ms", size: "1.2 KB" },
  { method: "POST", url: "/api/auth/login", status: 401, time: "234ms", size: "0.3 KB" },
  { method: "GET", url: "/api/user/me", status: 401, time: "12ms", size: "0.1 KB" },
];

export const SessionReplay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(35);
  const [selectedEvent, setSelectedEvent] = useState(7);
  const [isMuted, setIsMuted] = useState(true);

  const totalDuration = 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Session Replay</h1>
          <p className="text-sm text-muted-foreground">
            Test: Login Flow • Run: #1247 • Dec 27, 2024 10:42 AM
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Bug className="w-4 h-4 mr-2" />
            Report Bug
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border/40 overflow-hidden">
            {/* Video Area */}
            <div className="aspect-video bg-background relative">
              {/* Mock Browser */}
              <div className="absolute inset-4 rounded-lg border border-border/40 bg-card/30 overflow-hidden">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40 bg-muted/20">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-warning/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-success/70" />
                  </div>
                  <div className="flex-1 h-5 rounded bg-muted/30 text-[10px] text-muted-foreground flex items-center px-2 font-mono">
                    https://app.example.com/login
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex items-center justify-center h-full">
                  <div className="w-full max-w-xs space-y-3">
                    <div className="text-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 mx-auto mb-2" />
                      <p className="text-sm font-medium">Login</p>
                    </div>
                    <div className="h-8 rounded bg-muted/30 border border-border/40" />
                    <div className="h-8 rounded bg-muted/30 border border-border/40" />
                    <div className="h-8 rounded bg-primary/80" />
                  </div>
                </div>
              </div>

              {/* Mouse Cursor */}
              <div 
                className="absolute w-4 h-4 pointer-events-none transition-all duration-100"
                style={{ left: "45%", top: "55%" }}
              >
                <MousePointer2 className="w-4 h-4 text-primary drop-shadow-lg" />
              </div>

              {/* Error Indicator */}
              <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/90 text-destructive-foreground text-xs">
                <XCircle className="w-3 h-3" />
                Assertion Failed
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 border-t border-border/40 space-y-3">
              {/* Timeline */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono w-10">
                  0:{String(Math.floor(currentTime / 100 * 12)).padStart(2, "0")}
                </span>
                <Slider
                  value={[currentTime]}
                  onValueChange={([v]) => setCurrentTime(v)}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground font-mono w-10">0:12</span>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="h-10 w-10 rounded-full"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <select className="h-8 px-2 rounded bg-muted/30 border border-border/40 text-xs">
                    <option>1x</option>
                    <option>1.5x</option>
                    <option>2x</option>
                    <option>0.5x</option>
                  </select>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Timeline & Details */}
        <div className="space-y-4">
          {/* Steps */}
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Test Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[280px] overflow-y-auto">
                {timelineEvents.map((event, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedEvent(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      selectedEvent === i ? "bg-primary/10" : "hover:bg-muted/30"
                    }`}
                  >
                    <span className="text-xs text-muted-foreground font-mono w-8">{event.time}</span>
                    {event.status === "passed" ? (
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{event.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{event.target}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dev Tools */}
          <Card className="bg-card/50 border-border/40">
            <CardContent className="p-0">
              <Tabs defaultValue="console">
                <TabsList className="w-full rounded-none border-b border-border/40 bg-transparent h-10">
                  <TabsTrigger value="console" className="flex-1 gap-2 data-[state=active]:bg-muted/30">
                    <Terminal className="w-3 h-3" />
                    Console
                  </TabsTrigger>
                  <TabsTrigger value="network" className="flex-1 gap-2 data-[state=active]:bg-muted/30">
                    <Network className="w-3 h-3" />
                    Network
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="console" className="mt-0 max-h-[200px] overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {consoleLog.map((log, i) => (
                      <div key={i} className={`flex gap-2 px-2 py-1 rounded text-xs font-mono ${
                        log.type === "error" ? "bg-destructive/10 text-destructive" :
                        log.type === "warn" ? "bg-warning/10 text-warning" :
                        "text-muted-foreground"
                      }`}>
                        <span className="text-muted-foreground">{log.time}</span>
                        <span className="flex-1">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="network" className="mt-0 max-h-[200px] overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {networkRequests.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/20 text-xs">
                        <span className={`font-mono ${
                          req.method === "GET" ? "text-success" :
                          req.method === "POST" ? "text-warning" :
                          "text-primary"
                        }`}>{req.method}</span>
                        <span className="flex-1 font-mono text-foreground truncate">{req.url}</span>
                        <span className={`${req.status < 400 ? "text-success" : "text-destructive"}`}>
                          {req.status}
                        </span>
                        <span className="text-muted-foreground">{req.time}</span>
                      </div>
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

export default SessionReplay;

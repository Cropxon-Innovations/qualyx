import { useState } from "react";
import { 
  Play, 
  Pause, 
  Square, 
  MousePointer2, 
  Type, 
  Navigation, 
  Clock,
  Camera,
  Code2,
  Plus,
  CheckCircle2,
  Globe,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { toast } from "@/hooks/use-toast";

const recordedSteps = [
  { id: 1, action: "Navigate", target: "https://app.example.com/login", selector: null },
  { id: 2, action: "Click", target: "Email Input", selector: "#email-input" },
  { id: 3, action: "Type", target: "user@example.com", selector: "#email-input" },
  { id: 4, action: "Click", target: "Password Input", selector: "#password-input" },
  { id: 5, action: "Type", target: "••••••••", selector: "#password-input" },
  { id: 6, action: "Click", target: "Login Button", selector: "button[type='submit']" },
  { id: 7, action: "Wait", target: "Dashboard loads", selector: null },
  { id: 8, action: "Assert", target: "Welcome message visible", selector: ".welcome-text" },
];

export const RecordUITest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [baseUrl, setBaseUrl] = useState("https://app.example.com");
  const [environment, setEnvironment] = useState("development");
  const [steps, setSteps] = useState(recordedSteps);
  const [testName, setTestName] = useState("");

  const handleSaveTest = () => {
    if (!testName.trim()) {
      toast({
        title: "Test name required",
        description: "Please enter a name for your test",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Test Saved",
      description: `"${testName}" has been saved with ${steps.length} steps`,
    });
  };

  const handleReset = () => {
    setSteps([]);
    setTestName("");
    setIsRecording(false);
    toast({
      title: "Test Reset",
      description: "All recorded steps have been cleared",
    });
  };

  return (
    <ConsoleLayout>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Record UI Test</h1>
          <p className="text-sm text-muted-foreground">
            Capture user interactions automatically
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button className="bg-primary" onClick={handleSaveTest}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Save Test
          </Button>
        </div>
      </div>

      {/* Setup */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Test Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Base URL</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="pl-9"
                    placeholder="https://your-app.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Environment</label>
              <Select value={environment} onValueChange={setEnvironment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Test Name</label>
              <Input 
                placeholder="e.g., Login Flow Test" 
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Recording Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Browser Preview */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 border-border/40 overflow-hidden">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-muted/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-warning/70" />
                <div className="w-3 h-3 rounded-full bg-success/70" />
              </div>
              <div className="flex-1 mx-4 h-7 rounded-md bg-muted/30 flex items-center px-3 text-xs text-muted-foreground font-mono">
                {baseUrl}
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>

            {/* Browser Content */}
            <div className="aspect-video bg-background relative">
              {/* Mock App UI */}
              <div className="absolute inset-0 p-8 flex items-center justify-center">
                <div className="w-full max-w-sm space-y-4">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 mx-auto mb-3" />
                    <h2 className="text-lg font-semibold">Welcome Back</h2>
                    <p className="text-sm text-muted-foreground">Sign in to continue</p>
                  </div>
                  <div className="space-y-3">
                    <Input placeholder="Email" className="bg-muted/30" />
                    <Input type="password" placeholder="Password" className="bg-muted/30" />
                    <Button className="w-full">Sign In</Button>
                  </div>
                </div>
              </div>

              {/* Recording Overlay */}
              {isRecording && (
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/90 text-destructive-foreground text-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Recording
                </div>
              )}
            </div>

            {/* Recorder Controls */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/40 bg-muted/10">
              <div className="flex gap-2">
                <Button 
                  variant={isRecording ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <>
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" disabled={!isRecording}>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Step
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Add Assertion
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Add Wait
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Screenshot
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Steps Panel */}
        <div>
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recorded Steps</CardTitle>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                  {steps.length} steps
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[500px] overflow-y-auto">
                {steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className="flex items-start gap-3 px-4 py-3 border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <span className="text-xs text-muted-foreground w-5 pt-0.5">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {step.action === "Click" && <MousePointer2 className="w-3 h-3 text-primary" />}
                        {step.action === "Type" && <Type className="w-3 h-3 text-success" />}
                        {step.action === "Navigate" && <Navigation className="w-3 h-3 text-muted-foreground" />}
                        {step.action === "Wait" && <Clock className="w-3 h-3 text-warning" />}
                        {step.action === "Assert" && <CheckCircle2 className="w-3 h-3 text-primary" />}
                        <span className="text-sm font-medium text-foreground">{step.action}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{step.target}</p>
                      {step.selector && (
                        <code className="text-[10px] text-primary/70 font-mono">{step.selector}</code>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ConsoleLayout>
  );
};

export default RecordUITest;

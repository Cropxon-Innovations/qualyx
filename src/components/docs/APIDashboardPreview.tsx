import { useState, useEffect } from "react";
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Loader2,
  Send,
  ArrowRight,
  Copy,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface APIRequest {
  id: number;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  status: "pending" | "running" | "passed" | "failed";
  statusCode?: number;
  duration?: number;
  requestBody?: string;
  responseBody?: string;
}

const apiTestSteps: APIRequest[] = [
  { 
    id: 1, 
    method: "POST", 
    endpoint: "/api/auth/login", 
    status: "pending",
    requestBody: '{\n  "email": "user@example.com",\n  "password": "••••••••"\n}',
    responseBody: '{\n  "token": "eyJhbGc...",\n  "user": { "id": 1, "name": "John" }\n}'
  },
  { 
    id: 2, 
    method: "GET", 
    endpoint: "/api/users/profile", 
    status: "pending",
    responseBody: '{\n  "id": 1,\n  "name": "John Doe",\n  "email": "user@example.com"\n}'
  },
  { 
    id: 3, 
    method: "GET", 
    endpoint: "/api/projects", 
    status: "pending",
    responseBody: '{\n  "projects": [\n    { "id": 1, "name": "Project A" },\n    { "id": 2, "name": "Project B" }\n  ]\n}'
  },
  { 
    id: 4, 
    method: "POST", 
    endpoint: "/api/projects", 
    status: "pending",
    requestBody: '{\n  "name": "New Project",\n  "description": "Test project"\n}',
    responseBody: '{\n  "id": 3,\n  "name": "New Project",\n  "created_at": "2024-01-01"\n}'
  },
  { 
    id: 5, 
    method: "PUT", 
    endpoint: "/api/projects/3", 
    status: "pending",
    requestBody: '{\n  "name": "Updated Project"\n}',
    responseBody: '{\n  "id": 3,\n  "name": "Updated Project",\n  "updated_at": "2024-01-01"\n}'
  },
  { 
    id: 6, 
    method: "DELETE", 
    endpoint: "/api/projects/3", 
    status: "pending",
    responseBody: '{\n  "success": true,\n  "message": "Project deleted"\n}'
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  PUT: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
};

export const APIDashboardPreview = () => {
  const [steps, setSteps] = useState<APIRequest[]>(apiTestSteps);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<APIRequest | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= steps.length) {
      setTimeout(() => {
        setSteps(apiTestSteps);
        setCurrentStep(0);
        setSelectedRequest(null);
        setShowResponse(false);
      }, 2000);
      return;
    }

    const timer = setTimeout(() => {
      const currentReq = steps[currentStep];
      setSelectedRequest(currentReq);
      setShowResponse(false);

      setSteps(prev => prev.map((step, idx) => {
        if (idx === currentStep) {
          return { ...step, status: "running" };
        }
        if (idx < currentStep) {
          return { ...step, status: "passed", statusCode: 200, duration: Math.floor(Math.random() * 300) + 50 };
        }
        return step;
      }));

      setTimeout(() => {
        setShowResponse(true);
        setSteps(prev => prev.map((step, idx) => {
          if (idx === currentStep) {
            return { ...step, status: "passed", statusCode: 200, duration: Math.floor(Math.random() * 300) + 50 };
          }
          return step;
        }));
        
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, 600);
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, steps.length]);

  const getStatusIcon = (status: APIRequest["status"]) => {
    switch (status) {
      case "running":
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case "passed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="glass-card-glow rounded-2xl overflow-hidden">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-success/80" />
          </div>
          <span className="text-sm font-medium text-foreground">API Test Runner</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Play className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 divide-x divide-border">
        {/* Request List */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setSelectedRequest(step)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300",
                  step.status === "running" 
                    ? "border-primary/50 bg-primary/5" 
                    : step.status === "passed"
                    ? "border-success/30 bg-success/5"
                    : "border-border bg-card/30 hover:border-muted-foreground/30"
                )}
              >
                {getStatusIcon(step.status)}
                <span className={cn(
                  "px-2 py-0.5 text-xs font-mono font-semibold rounded border",
                  methodColors[step.method]
                )}>
                  {step.method}
                </span>
                <span className="flex-1 text-sm text-foreground font-mono truncate">
                  {step.endpoint}
                </span>
                {step.statusCode && (
                  <span className="text-xs text-success font-mono">{step.statusCode}</span>
                )}
                {step.duration && (
                  <span className="text-xs text-muted-foreground">{step.duration}ms</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Request/Response Detail */}
        <div className="p-4">
          {selectedRequest ? (
            <div className="space-y-4">
              {/* Request URL */}
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
                <span className={cn(
                  "px-2 py-0.5 text-xs font-mono font-semibold rounded border",
                  methodColors[selectedRequest.method]
                )}>
                  {selectedRequest.method}
                </span>
                <span className="flex-1 text-sm font-mono text-foreground truncate">
                  {selectedRequest.endpoint}
                </span>
                <Send className="w-4 h-4 text-primary" />
              </div>

              {/* Request Body */}
              {selectedRequest.requestBody && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">Request Body</span>
                    <Copy className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground" />
                  </div>
                  <pre className="p-3 rounded-lg bg-background/50 border border-border text-xs font-mono text-foreground overflow-x-auto">
                    {selectedRequest.requestBody}
                  </pre>
                </div>
              )}

              {/* Response */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase">Response</span>
                    {selectedRequest.status === "running" && (
                      <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    )}
                  </div>
                  {selectedRequest.statusCode && (
                    <span className="text-xs font-mono text-success">200 OK</span>
                  )}
                </div>
                <pre className={cn(
                  "p-3 rounded-lg bg-background/50 border border-border text-xs font-mono overflow-x-auto transition-all duration-500",
                  showResponse && selectedRequest.status === "passed" 
                    ? "text-foreground opacity-100" 
                    : "text-muted-foreground opacity-50"
                )}>
                  {showResponse && selectedRequest.status === "passed" 
                    ? selectedRequest.responseBody 
                    : "Waiting for response..."}
                </pre>
              </div>

              {/* Assertions */}
              {selectedRequest.status === "passed" && showResponse && (
                <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-success font-medium">All assertions passed</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ChevronDown className="w-3 h-3" />
                      <span>Status code is 200</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ChevronDown className="w-3 h-3" />
                      <span>Response time &lt; 500ms</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ChevronDown className="w-3 h-3" />
                      <span>Response body matches schema</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <ArrowRight className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Select a request to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

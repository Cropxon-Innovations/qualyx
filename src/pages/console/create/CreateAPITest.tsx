import { useState } from "react";
import { 
  Send, 
  Plus, 
  Trash2, 
  Copy, 
  Play,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronDown,
  Code2,
  FileJson
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { toast } from "@/hooks/use-toast";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"];

const sampleHeaders = [
  { key: "Content-Type", value: "application/json", enabled: true },
  { key: "Authorization", value: "Bearer {{token}}", enabled: true },
  { key: "X-API-Version", value: "v1", enabled: false },
];

const sampleResponse = {
  status: 200,
  time: "156ms",
  size: "2.4 KB",
  body: JSON.stringify({
    success: true,
    data: {
      id: "usr_123",
      email: "john@example.com",
      name: "John Doe",
      role: "admin"
    }
  }, null, 2)
};

export const CreateAPITest = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/users/me");
  const [headers, setHeaders] = useState(sampleHeaders);
  const [body, setBody] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
  const [response, setResponse] = useState(sampleResponse);
  const [activeTab, setActiveTab] = useState("params");

  const methodColors: Record<string, string> = {
    GET: "bg-success/20 text-success",
    POST: "bg-warning/20 text-warning",
    PUT: "bg-primary/20 text-primary",
    PATCH: "bg-primary/20 text-primary",
    DELETE: "bg-destructive/20 text-destructive",
    HEAD: "bg-muted text-muted-foreground",
    OPTIONS: "bg-muted text-muted-foreground",
  };

  const handleSave = () => {
    toast({
      title: "API Test Saved",
      description: `${method} ${url} saved successfully`,
    });
  };

  const handleSend = () => {
    toast({
      title: "Request Sent",
      description: "Response received in 156ms",
    });
  };

  return (
    <ConsoleLayout>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create API Test</h1>
          <p className="text-sm text-muted-foreground">
            Build and test API endpoints
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "Duplicated", description: "Test duplicated successfully" })}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button className="bg-primary" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Test
          </Button>
        </div>
      </div>

      {/* Request Builder */}
      <Card className="bg-card/50 border-border/40">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className={`w-28 ${methodColors[method]}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {methods.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 font-mono text-sm"
              placeholder="https://api.example.com/endpoint"
            />
            <Button className="bg-primary" onClick={handleSend}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Request/Response Split */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Request Config */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="pb-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted/30">
                <TabsTrigger value="params">Params</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="auth">Auth</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-4">
            <TabsContent value="params" className="mt-0">
              <div className="space-y-2">
                <div className="grid grid-cols-[1fr_1fr_40px] gap-2 text-xs text-muted-foreground font-medium px-1">
                  <span>Key</span>
                  <span>Value</span>
                  <span></span>
                </div>
                {[
                  { key: "include", value: "profile,settings" },
                  { key: "format", value: "json" },
                ].map((param, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_40px] gap-2">
                    <Input placeholder="Key" value={param.key} className="h-9 text-sm" />
                    <Input placeholder="Value" value={param.value} className="h-9 text-sm" />
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Parameter
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="headers" className="mt-0">
              <div className="space-y-2">
                <div className="grid grid-cols-[24px_1fr_1fr_40px] gap-2 text-xs text-muted-foreground font-medium px-1">
                  <span></span>
                  <span>Key</span>
                  <span>Value</span>
                  <span></span>
                </div>
                {headers.map((header, i) => (
                  <div key={i} className="grid grid-cols-[24px_1fr_1fr_40px] gap-2 items-center">
                    <input 
                      type="checkbox" 
                      checked={header.enabled}
                      className="w-4 h-4 rounded border-border"
                      onChange={() => {
                        const newHeaders = [...headers];
                        newHeaders[i].enabled = !newHeaders[i].enabled;
                        setHeaders(newHeaders);
                      }}
                    />
                    <Input value={header.key} className="h-9 text-sm font-mono" />
                    <Input value={header.value} className="h-9 text-sm font-mono" />
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Header
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="auth" className="mt-0">
              <div className="space-y-4">
                <Select defaultValue="bearer">
                  <SelectTrigger>
                    <SelectValue placeholder="Auth Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Auth</SelectItem>
                    <SelectItem value="bearer">Bearer Token</SelectItem>
                    <SelectItem value="basic">Basic Auth</SelectItem>
                    <SelectItem value="api-key">API Key</SelectItem>
                    <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                  </SelectContent>
                </Select>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Token</label>
                  <Input 
                    placeholder="Enter token or use {{variable}}" 
                    className="font-mono text-sm"
                    value="{{auth_token}}"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="body" className="mt-0">
              <div className="space-y-2">
                <div className="flex gap-2 mb-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileJson className="w-3 h-3 mr-1" />
                    JSON
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">Form Data</Button>
                  <Button variant="ghost" size="sm" className="text-xs">Raw</Button>
                </div>
                <Textarea 
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="font-mono text-sm min-h-[200px] bg-muted/20"
                />
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        {/* Response */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Response</CardTitle>
              <div className="flex items-center gap-3 text-sm">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  response.status < 300 ? "bg-success/20 text-success" :
                  response.status < 400 ? "bg-warning/20 text-warning" :
                  "bg-destructive/20 text-destructive"
                }`}>
                  {response.status} OK
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {response.time}
                </span>
                <span className="text-muted-foreground">{response.size}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="body">
              <TabsList className="bg-muted/30 mb-3">
                <TabsTrigger value="body">Body</TabsTrigger>
                <TabsTrigger value="headers">Headers</TabsTrigger>
                <TabsTrigger value="assertions">Assertions</TabsTrigger>
              </TabsList>
              <TabsContent value="body" className="mt-0">
                <pre className="bg-muted/20 rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground">
                  {response.body}
                </pre>
              </TabsContent>
              <TabsContent value="headers" className="mt-0">
                <div className="space-y-1 text-sm">
                  {[
                    { key: "content-type", value: "application/json; charset=utf-8" },
                    { key: "x-request-id", value: "req_abc123" },
                    { key: "x-rate-limit-remaining", value: "99" },
                  ].map((h, i) => (
                    <div key={i} className="flex gap-2 py-1">
                      <span className="font-mono text-primary">{h.key}:</span>
                      <span className="font-mono text-muted-foreground">{h.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="assertions" className="mt-0">
                <div className="space-y-2">
                  {[
                    { name: "Status is 200", passed: true },
                    { name: "Response time < 500ms", passed: true },
                    { name: "Body contains 'success: true'", passed: true },
                    { name: "Schema validation", passed: true },
                  ].map((assertion, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                      {assertion.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-sm text-foreground">{assertion.name}</span>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Assertion
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
    </ConsoleLayout>
  );
};

export default CreateAPITest;

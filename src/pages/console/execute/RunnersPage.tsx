import { useState } from "react";
import { 
  Server, 
  Cloud,
  Laptop,
  Globe,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Plus,
  Settings,
  Activity,
  Wifi,
  WifiOff,
  Pause,
  Play,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const runners = [
  { 
    id: "runner-us-east-1-a", 
    name: "us-east-1-a", 
    type: "cloud",
    status: "active", 
    region: "US East (N. Virginia)",
    latency: "12ms",
    version: "2.4.1",
    load: 72,
    tests: 24,
    lastSeen: "Just now"
  },
  { 
    id: "runner-us-east-1-b", 
    name: "us-east-1-b", 
    type: "cloud",
    status: "active", 
    region: "US East (N. Virginia)",
    latency: "14ms",
    version: "2.4.1",
    load: 68,
    tests: 18,
    lastSeen: "Just now"
  },
  { 
    id: "runner-eu-west-1-a", 
    name: "eu-west-1-a", 
    type: "cloud",
    status: "active", 
    region: "EU (Ireland)",
    latency: "45ms",
    version: "2.4.1",
    load: 45,
    tests: 12,
    lastSeen: "Just now"
  },
  { 
    id: "runner-on-prem-01", 
    name: "on-prem-01", 
    type: "hybrid",
    status: "active", 
    region: "On-Premise (NYC)",
    latency: "8ms",
    version: "2.4.0",
    load: 23,
    tests: 6,
    lastSeen: "2s ago"
  },
  { 
    id: "runner-on-prem-02", 
    name: "on-prem-02", 
    type: "hybrid",
    status: "idle", 
    region: "On-Premise (NYC)",
    latency: "9ms",
    version: "2.4.0",
    load: 0,
    tests: 0,
    lastSeen: "5s ago"
  },
  { 
    id: "runner-local", 
    name: "local-dev", 
    type: "local",
    status: "offline", 
    region: "Local Machine",
    latency: "-",
    version: "2.3.9",
    load: 0,
    tests: 0,
    lastSeen: "2 hours ago"
  },
];

export const RunnersPage = () => {
  const [selectedRunner, setSelectedRunner] = useState<string | null>(null);

  const activeRunners = runners.filter(r => r.status === "active").length;
  const totalTests = runners.reduce((acc, r) => acc + r.tests, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Runners</h1>
          <p className="text-sm text-muted-foreground">
            Manage your test execution infrastructure
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Runner
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Runners</p>
                <p className="text-2xl font-bold text-foreground">{runners.length}</p>
              </div>
              <Server className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-success">{activeRunners}</p>
              </div>
              <Activity className="w-8 h-8 text-success/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Running Tests</p>
                <p className="text-2xl font-bold text-foreground">{totalTests}</p>
              </div>
              <Play className="w-8 h-8 text-primary/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Latency</p>
                <p className="text-2xl font-bold text-foreground">18ms</p>
              </div>
              <Clock className="w-8 h-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Architecture Diagram */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Hybrid Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 py-6">
            {/* Cloud */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-2">
                <Cloud className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">QUALYX Cloud</p>
              <p className="text-xs text-muted-foreground">Control Plane</p>
            </div>

            {/* Connection Line */}
            <div className="flex-1 max-w-xs relative">
              <div className="h-px bg-gradient-to-r from-primary via-primary/50 to-success" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 bg-background rounded text-[10px] text-muted-foreground border border-border/40">
                Outbound Only • TLS 1.3
              </div>
            </div>

            {/* On-Prem */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center mx-auto mb-2">
                <Server className="w-10 h-10 text-success" />
              </div>
              <p className="text-sm font-medium text-foreground">On-Premise</p>
              <p className="text-xs text-muted-foreground">Hybrid Runner</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Runners Table */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Runner Fleet</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/40">
                <TableHead>Runner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Load</TableHead>
                <TableHead>Tests</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runners.map((runner) => (
                <TableRow 
                  key={runner.id} 
                  className="border-border/40 cursor-pointer hover:bg-muted/30"
                  onClick={() => setSelectedRunner(runner.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {runner.type === "cloud" ? (
                        <Cloud className="w-4 h-4 text-primary" />
                      ) : runner.type === "hybrid" ? (
                        <Server className="w-4 h-4 text-success" />
                      ) : (
                        <Laptop className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="font-mono text-sm">{runner.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      runner.type === "cloud" ? "border-primary/30 text-primary" :
                      runner.type === "hybrid" ? "border-success/30 text-success" :
                      "border-muted-foreground/30"
                    }>
                      {runner.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {runner.status === "active" ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                          <span className="text-success text-sm">Active</span>
                        </>
                      ) : runner.status === "idle" ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                          <span className="text-muted-foreground text-sm">Idle</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-destructive" />
                          <span className="text-destructive text-sm">Offline</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{runner.region}</TableCell>
                  <TableCell className="text-sm font-mono">{runner.latency}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${runner.load > 80 ? "bg-destructive" : runner.load > 50 ? "bg-warning" : "bg-success"}`}
                          style={{ width: `${runner.load}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{runner.load}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{runner.tests}</TableCell>
                  <TableCell className="text-sm font-mono text-muted-foreground">{runner.version}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{runner.lastSeen}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Settings className="w-4 h-4" />
                      </Button>
                      {runner.status === "active" ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RunnersPage;

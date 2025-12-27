import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Terminal, Search, Filter, Download, RefreshCw } from "lucide-react";

const logs = [
  { id: 1, timestamp: "2024-12-27 14:32:15", level: "info", message: "Test run started: Smoke Tests", source: "runner-01" },
  { id: 2, timestamp: "2024-12-27 14:32:16", level: "info", message: "Executing: Login Test", source: "runner-01" },
  { id: 3, timestamp: "2024-12-27 14:32:18", level: "debug", message: "Navigating to /login", source: "runner-01" },
  { id: 4, timestamp: "2024-12-27 14:32:20", level: "info", message: "Login successful", source: "runner-01" },
  { id: 5, timestamp: "2024-12-27 14:32:22", level: "warn", message: "Slow response detected: 2.3s", source: "runner-01" },
  { id: 6, timestamp: "2024-12-27 14:32:25", level: "error", message: "Element not found: #submit-btn", source: "runner-01" },
  { id: 7, timestamp: "2024-12-27 14:32:26", level: "info", message: "Retrying with self-healing...", source: "runner-01" },
  { id: 8, timestamp: "2024-12-27 14:32:28", level: "info", message: "Found alternative selector: [data-testid='submit']", source: "runner-01" },
];

const Logs = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "error": return "text-red-500 bg-red-500/10";
      case "warn": return "text-yellow-500 bg-yellow-500/10";
      case "debug": return "text-gray-500 bg-gray-500/10";
      default: return "text-blue-500 bg-blue-500/10";
    }
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Logs</h1>
            <p className="text-muted-foreground">Real-time execution logs and debugging</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search logs..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="font-mono text-sm">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 px-4 py-2 border-b hover:bg-muted/50">
                  <span className="text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
                  <Badge variant="outline" className={`${getLevelColor(log.level)} uppercase text-xs`}>
                    {log.level}
                  </Badge>
                  <span className="flex-1">{log.message}</span>
                  <span className="text-muted-foreground">{log.source}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsoleLayout>
  );
};

export default Logs;

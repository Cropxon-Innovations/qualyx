import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Download, Filter, Calendar, User, 
  Shield, Settings, Play, FileText, Key, Clock
} from "lucide-react";

const auditLogs = [
  {
    id: "log_001",
    timestamp: "2024-12-27 14:32:15",
    user: "sarah.chen@acme.com",
    action: "test.execute",
    resource: "Checkout Flow Suite",
    details: "Executed 45 tests in production environment",
    ip: "192.168.1.45",
    status: "success"
  },
  {
    id: "log_002",
    timestamp: "2024-12-27 14:28:03",
    user: "john.smith@acme.com",
    action: "secret.update",
    resource: "API_KEY_STRIPE",
    details: "Updated secret value",
    ip: "192.168.1.32",
    status: "success"
  },
  {
    id: "log_003",
    timestamp: "2024-12-27 14:15:42",
    user: "admin@acme.com",
    action: "user.permission.change",
    resource: "mike.wilson@acme.com",
    details: "Changed role from QA to Admin",
    ip: "192.168.1.10",
    status: "success"
  },
  {
    id: "log_004",
    timestamp: "2024-12-27 13:58:21",
    user: "jane.doe@acme.com",
    action: "test.create",
    resource: "User Profile Update Test",
    details: "Created new UI test via recorder",
    ip: "192.168.1.67",
    status: "success"
  },
  {
    id: "log_005",
    timestamp: "2024-12-27 13:45:09",
    user: "system",
    action: "runner.disconnect",
    resource: "Runner-NYC-01",
    details: "Runner went offline unexpectedly",
    ip: "10.0.0.45",
    status: "warning"
  },
  {
    id: "log_006",
    timestamp: "2024-12-27 13:30:00",
    user: "sarah.chen@acme.com",
    action: "integration.connect",
    resource: "GitHub",
    details: "Connected GitHub organization: acme-corp",
    ip: "192.168.1.45",
    status: "success"
  },
  {
    id: "log_007",
    timestamp: "2024-12-27 13:12:34",
    user: "john.smith@acme.com",
    action: "auth.login.failed",
    resource: "john.smith@acme.com",
    details: "Invalid password attempt",
    ip: "203.0.113.42",
    status: "error"
  },
  {
    id: "log_008",
    timestamp: "2024-12-27 12:58:17",
    user: "mike.wilson@acme.com",
    action: "test.delete",
    resource: "Deprecated Login Test",
    details: "Deleted test and associated data",
    ip: "192.168.1.89",
    status: "success"
  },
];

const getActionIcon = (action: string) => {
  if (action.startsWith("test.")) return <Play className="w-4 h-4" />;
  if (action.startsWith("user.") || action.startsWith("auth.")) return <User className="w-4 h-4" />;
  if (action.startsWith("secret.")) return <Key className="w-4 h-4" />;
  if (action.startsWith("runner.")) return <Settings className="w-4 h-4" />;
  if (action.startsWith("integration.")) return <FileText className="w-4 h-4" />;
  return <Shield className="w-4 h-4" />;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">Success</Badge>;
    case "warning":
      return <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">Warning</Badge>;
    case "error":
      return <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">Error</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function AuditLogs() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
            <p className="text-muted-foreground">Track all system activities and changes</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-border/50">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold text-foreground">12,847</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <User className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Today</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Security Events</p>
                  <p className="text-2xl font-bold text-amber-400">3</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Retention</p>
                  <p className="text-2xl font-bold text-foreground">90 days</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Log retention period</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search logs..." 
                  className="pl-9 bg-muted/30 border-border/50"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px] bg-muted/30 border-border/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="test">Test Actions</SelectItem>
                  <SelectItem value="user">User Actions</SelectItem>
                  <SelectItem value="secret">Secret Changes</SelectItem>
                  <SelectItem value="auth">Auth Events</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] bg-muted/30 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="24h">
                <SelectTrigger className="w-[140px] bg-muted/30 border-border/50">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last hour</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      log.status === 'error' ? 'bg-red-500/10 text-red-400' :
                      log.status === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-primary/10 text-primary'
                    }`}>
                      {getActionIcon(log.action)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm text-foreground">{log.action}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-sm text-foreground">{log.resource}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{log.user}</span>
                        <span>•</span>
                        <span>{log.ip}</span>
                        <span>•</span>
                        <span>{log.details}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(log.status)}
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</span>
                    <Button variant="ghost" size="sm" className="h-7">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground">Showing 8 of 12,847 events</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsoleLayout>
  );
}

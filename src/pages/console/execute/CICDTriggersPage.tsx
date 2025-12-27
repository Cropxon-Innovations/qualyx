import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, GitMerge, GitBranch, CheckCircle, XCircle, 
  MoreHorizontal, Edit, Trash2, Copy, Webhook, 
  Github, GitlabIcon, Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const triggers = [
  {
    id: "trigger_001",
    name: "PR Validation",
    event: "pull_request",
    branch: "main, develop",
    suite: "Smoke Tests",
    provider: "github",
    enabled: true,
    lastTriggered: "15 minutes ago",
    lastStatus: "passed",
    triggersToday: 8
  },
  {
    id: "trigger_002",
    name: "Main Branch Deploy",
    event: "push",
    branch: "main",
    suite: "Full Regression",
    provider: "github",
    enabled: true,
    lastTriggered: "2 hours ago",
    lastStatus: "passed",
    triggersToday: 3
  },
  {
    id: "trigger_003",
    name: "Release Tag",
    event: "tag",
    branch: "v*",
    suite: "E2E Critical Path",
    provider: "github",
    enabled: true,
    lastTriggered: "3 days ago",
    lastStatus: "passed",
    triggersToday: 0
  },
  {
    id: "trigger_004",
    name: "Develop Integration",
    event: "push",
    branch: "develop",
    suite: "API Tests",
    provider: "gitlab",
    enabled: true,
    lastTriggered: "1 hour ago",
    lastStatus: "failed",
    triggersToday: 5
  },
  {
    id: "trigger_005",
    name: "Feature Branch Check",
    event: "pull_request",
    branch: "feature/*",
    suite: "Unit Tests",
    provider: "github",
    enabled: false,
    lastTriggered: "1 week ago",
    lastStatus: "passed",
    triggersToday: 0
  },
];

const recentEvents = [
  { id: 1, event: "PR #234 opened", repo: "acme/web-app", branch: "feature/auth", suite: "Smoke Tests", status: "running", time: "Just now" },
  { id: 2, event: "Push to main", repo: "acme/web-app", branch: "main", suite: "Full Regression", status: "passed", time: "15 min ago" },
  { id: 3, event: "PR #233 updated", repo: "acme/web-app", branch: "fix/checkout", suite: "Smoke Tests", status: "passed", time: "32 min ago" },
  { id: 4, event: "Push to develop", repo: "acme/api", branch: "develop", suite: "API Tests", status: "failed", time: "1 hour ago" },
];

const getProviderIcon = (provider: string) => {
  switch (provider) {
    case 'github':
      return <Github className="w-5 h-5" />;
    case 'gitlab':
      return <GitlabIcon className="w-5 h-5" />;
    default:
      return <GitMerge className="w-5 h-5" />;
  }
};

export default function CICDTriggersPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">CI/CD Triggers</h1>
            <p className="text-muted-foreground">Configure automated test triggers for your pipelines</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Trigger
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Active Triggers</p>
                  <p className="text-2xl font-bold text-foreground">4</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Webhook className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">1 disabled</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Triggers Today</p>
                  <p className="text-2xl font-bold text-foreground">16</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">From CI/CD events</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-green-400">93.7%</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last 7 days</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold text-foreground">4m 32s</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <GitMerge className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Per triggered run</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Triggers List */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Configured Triggers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {triggers.map((trigger) => (
                    <div key={trigger.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <Switch checked={trigger.enabled} />
                        <div className={`p-2 rounded-lg ${trigger.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                          {getProviderIcon(trigger.provider)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{trigger.name}</h4>
                            {trigger.lastStatus === 'passed' ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs bg-muted/50">
                              {trigger.event}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <GitBranch className="w-3 h-3" />
                              <span>{trigger.branch}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Suite: {trigger.suite}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{trigger.triggersToday}</p>
                          <p className="text-xs text-muted-foreground">today</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Events */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{event.event}</span>
                      <Badge variant="outline" className={`text-xs ${
                        event.status === 'passed' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                        event.status === 'failed' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{event.repo}</span>
                      <span>•</span>
                      <span>{event.branch}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{event.suite}</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ConsoleLayout>
  );
}

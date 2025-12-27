import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, Calendar, Clock, Play, MoreHorizontal, 
  CheckCircle, XCircle, Pause, Edit, Trash2, Copy
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const schedules = [
  {
    id: "sched_001",
    name: "Nightly Regression",
    suite: "Full Regression Suite",
    cron: "0 2 * * *",
    cronReadable: "Every day at 2:00 AM",
    environment: "Production",
    enabled: true,
    lastRun: "Today at 2:00 AM",
    lastStatus: "passed",
    nextRun: "Tomorrow at 2:00 AM",
    runsToday: 1
  },
  {
    id: "sched_002",
    name: "Hourly Health Check",
    suite: "Smoke Tests",
    cron: "0 * * * *",
    cronReadable: "Every hour",
    environment: "Production",
    enabled: true,
    lastRun: "1 hour ago",
    lastStatus: "passed",
    nextRun: "In 45 minutes",
    runsToday: 14
  },
  {
    id: "sched_003",
    name: "API Monitoring",
    suite: "API Health Suite",
    cron: "*/15 * * * *",
    cronReadable: "Every 15 minutes",
    environment: "Production",
    enabled: true,
    lastRun: "8 minutes ago",
    lastStatus: "passed",
    nextRun: "In 7 minutes",
    runsToday: 56
  },
  {
    id: "sched_004",
    name: "Weekly E2E",
    suite: "Complete E2E Suite",
    cron: "0 3 * * 0",
    cronReadable: "Every Sunday at 3:00 AM",
    environment: "Staging",
    enabled: true,
    lastRun: "5 days ago",
    lastStatus: "failed",
    nextRun: "In 2 days",
    runsToday: 0
  },
  {
    id: "sched_005",
    name: "Pre-Deploy Check",
    suite: "Critical Path Suite",
    cron: "0 9,17 * * 1-5",
    cronReadable: "Weekdays at 9 AM & 5 PM",
    environment: "Staging",
    enabled: false,
    lastRun: "3 days ago",
    lastStatus: "passed",
    nextRun: "Paused",
    runsToday: 0
  },
];

export default function SchedulesPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Schedules</h1>
            <p className="text-muted-foreground">Automate test execution with scheduled runs</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Schedule
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Active Schedules</p>
                  <p className="text-2xl font-bold text-foreground">4</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">1 paused</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Runs Today</p>
                  <p className="text-2xl font-bold text-foreground">71</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Play className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">All automated</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold text-green-400">98.6%</p>
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
                  <p className="text-xs text-muted-foreground">Next Run</p>
                  <p className="text-2xl font-bold text-foreground">7 min</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">API Monitoring</p>
            </CardContent>
          </Card>
        </div>

        {/* Schedules List */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">All Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <Switch checked={schedule.enabled} />
                    <div className={`p-2 rounded-lg ${schedule.enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                      <Calendar className={`w-5 h-5 ${schedule.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{schedule.name}</h4>
                        {schedule.lastStatus === 'passed' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{schedule.suite}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="font-mono">{schedule.cronReadable}</span>
                        <Badge variant="outline" className={`text-xs ${
                          schedule.environment === 'Production' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}>
                          {schedule.environment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-foreground">Next: {schedule.nextRun}</p>
                      <p className="text-xs text-muted-foreground">Last: {schedule.lastRun}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{schedule.runsToday}</p>
                      <p className="text-xs text-muted-foreground">runs today</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Play className="w-4 h-4 mr-2" />
                          Run Now
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pause className="w-4 h-4 mr-2" />
                          {schedule.enabled ? 'Pause' : 'Resume'}
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
    </ConsoleLayout>
  );
}

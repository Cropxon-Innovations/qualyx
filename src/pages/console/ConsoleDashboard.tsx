import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Server,
  Globe,
  TrendingUp,
  ArrowRight,
  Circle,
  Code2,
  Import,
  GitMerge,
  Activity,
  Zap,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data
const kpiData = {
  totalTests: 2847,
  passed: 2634,
  failed: 89,
  flaky: 124,
  activeEnvs: 4,
  activeRunners: 12,
  lastRun: "2 minutes ago",
  avgDuration: "3.2s"
};

const recentRuns = [
  { id: "run-001", suite: "Auth Flow", status: "passed", tests: 24, duration: "1m 32s", time: "2 min ago" },
  { id: "run-002", suite: "Checkout E2E", status: "failed", tests: 18, duration: "2m 15s", time: "5 min ago" },
  { id: "run-003", suite: "API Health", status: "passed", tests: 45, duration: "45s", time: "12 min ago" },
  { id: "run-004", suite: "User Profile", status: "flaky", tests: 12, duration: "58s", time: "18 min ago" },
  { id: "run-005", suite: "Dashboard UI", status: "passed", tests: 32, duration: "1m 48s", time: "25 min ago" },
];

const activityFeed = [
  { type: "record", message: "Sarah recorded 'Login Flow Test'", time: "3 min ago", user: "SC" },
  { type: "run", message: "CI triggered 'Smoke Tests' suite", time: "8 min ago", user: "CI" },
  { type: "alert", message: "Runner us-east-1 back online", time: "15 min ago", user: "SYS" },
  { type: "fail", message: "Test 'Checkout Payment' failed", time: "22 min ago", user: "CI" },
  { type: "create", message: "Mike created API test 'User CRUD'", time: "35 min ago", user: "MJ" },
];

const stabilityData = [92, 94, 91, 95, 93, 96, 94, 97, 95, 98, 96, 97];

const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  color = "primary"
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  color?: "primary" | "success" | "destructive" | "warning";
}) => (
  <Card className="bg-card/50 border-border/40">
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-success">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </CardContent>
  </Card>
);

const StabilityChart = () => (
  <div className="h-32 flex items-end gap-1.5">
    {stabilityData.map((value, i) => (
      <div key={i} className="flex-1 flex flex-col items-center gap-1">
        <div 
          className="w-full rounded-t bg-primary/60 hover:bg-primary transition-colors"
          style={{ height: `${value}%` }}
        />
        <span className="text-[10px] text-muted-foreground">{i + 1}</span>
      </div>
    ))}
  </div>
);

export const ConsoleDashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {time.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            View History
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Play className="w-4 h-4 mr-2" />
            Run All Tests
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <KPICard 
          title="Total Tests" 
          value={kpiData.totalTests.toLocaleString()} 
          icon={BarChart3}
          trend="+12% this week"
        />
        <KPICard 
          title="Passed" 
          value={kpiData.passed.toLocaleString()} 
          subtitle={`${((kpiData.passed / kpiData.totalTests) * 100).toFixed(1)}%`}
          icon={CheckCircle2}
          color="success"
        />
        <KPICard 
          title="Failed" 
          value={kpiData.failed} 
          icon={XCircle}
          color="destructive"
        />
        <KPICard 
          title="Flaky" 
          value={kpiData.flaky} 
          icon={AlertTriangle}
          color="warning"
        />
        <KPICard 
          title="Active Runners" 
          value={kpiData.activeRunners} 
          subtitle="across 4 regions"
          icon={Server}
          color="primary"
        />
        <KPICard 
          title="Avg Duration" 
          value={kpiData.avgDuration} 
          subtitle="per test"
          icon={Clock}
          color="primary"
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Stability Trend */}
        <Card className="lg:col-span-2 bg-card/50 border-border/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Stability Trend</CardTitle>
                <CardDescription>Pass rate over last 12 runs</CardDescription>
              </div>
              <span className="text-2xl font-bold text-success">97.2%</span>
            </div>
          </CardHeader>
          <CardContent>
            <StabilityChart />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/console/create/record">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <div className="p-1.5 rounded bg-primary/10">
                  <Circle className="w-4 h-4 text-primary" />
                </div>
                <span>Record UI Test</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/console/create/api">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <div className="p-1.5 rounded bg-success/10">
                  <Code2 className="w-4 h-4 text-success" />
                </div>
                <span>Add API Test</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/console/create/import">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <div className="p-1.5 rounded bg-warning/10">
                  <Import className="w-4 h-4 text-warning" />
                </div>
                <span>Import Suite</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>
            <Link to="/console/execute/cicd">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <div className="p-1.5 rounded bg-muted">
                  <GitMerge className="w-4 h-4 text-muted-foreground" />
                </div>
                <span>Connect CI/CD</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Runs & Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Runs */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Runs</CardTitle>
              <Link to="/console/execute/runs">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentRuns.map((run) => (
                <div 
                  key={run.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {run.status === "passed" ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : run.status === "failed" ? (
                      <XCircle className="w-5 h-5 text-destructive" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-warning" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{run.suite}</p>
                      <p className="text-xs text-muted-foreground">{run.tests} tests • {run.duration}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{run.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-card/50 border-border/40">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Activity Feed</CardTitle>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    item.type === "fail" ? "bg-destructive/20 text-destructive" :
                    item.type === "alert" ? "bg-warning/20 text-warning" :
                    item.type === "run" ? "bg-primary/20 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {item.user}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{item.message}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Runner Status */}
      <Card className="bg-card/50 border-border/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Runner Fleet</CardTitle>
              <CardDescription>12 active runners across 4 regions</CardDescription>
            </div>
            <Link to="/console/execute/runners">
              <Button variant="outline" size="sm">Manage Runners</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { region: "us-east-1", runners: 4, load: 72, status: "healthy" },
              { region: "eu-west-1", runners: 3, load: 45, status: "healthy" },
              { region: "ap-south-1", runners: 3, load: 68, status: "healthy" },
              { region: "on-prem", runners: 2, load: 23, status: "idle" },
            ].map((region) => (
              <div key={region.region} className="p-4 rounded-xl border border-border/40 bg-muted/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{region.region}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    region.status === "healthy" ? "bg-success" : "bg-muted-foreground"
                  }`} />
                </div>
                <div className="text-2xl font-bold text-foreground">{region.runners}</div>
                <div className="text-xs text-muted-foreground mb-2">runners</div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${region.load}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{region.load}% load</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsoleDashboard;

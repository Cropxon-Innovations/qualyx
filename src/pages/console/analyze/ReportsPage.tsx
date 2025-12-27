import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, Download, Calendar, TrendingUp, TrendingDown, 
  CheckCircle, XCircle, AlertTriangle, Clock, BarChart3, PieChart
} from "lucide-react";

const suiteReports = [
  { name: "Checkout Flow", passed: 45, failed: 3, flaky: 2, duration: "12m 34s", trend: "up" },
  { name: "User Authentication", passed: 28, failed: 0, flaky: 1, duration: "5m 12s", trend: "stable" },
  { name: "Product Search", passed: 32, failed: 5, flaky: 4, duration: "8m 45s", trend: "down" },
  { name: "Payment Processing", passed: 18, failed: 2, flaky: 0, duration: "6m 22s", trend: "up" },
  { name: "Admin Dashboard", passed: 56, failed: 1, flaky: 3, duration: "15m 08s", trend: "stable" },
];

const releaseReports = [
  { version: "v2.4.0", date: "Dec 20, 2024", tests: 180, passed: 172, failed: 5, flaky: 3, regression: 2 },
  { version: "v2.3.2", date: "Dec 15, 2024", tests: 175, passed: 170, failed: 3, flaky: 2, regression: 0 },
  { version: "v2.3.1", date: "Dec 10, 2024", tests: 172, passed: 168, failed: 2, flaky: 2, regression: 1 },
  { version: "v2.3.0", date: "Dec 5, 2024", tests: 170, passed: 165, failed: 3, flaky: 2, regression: 0 },
];

const environmentReports = [
  { env: "Production", tests: 180, passed: 175, failed: 3, flaky: 2, avgDuration: "18m 45s" },
  { env: "Staging", tests: 180, passed: 170, failed: 6, flaky: 4, avgDuration: "17m 22s" },
  { env: "Development", tests: 180, passed: 160, failed: 12, flaky: 8, avgDuration: "16m 10s" },
  { env: "Local", tests: 120, passed: 115, failed: 3, flaky: 2, avgDuration: "12m 05s" },
];

export default function ReportsPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Comprehensive test analytics and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="7d">
              <SelectTrigger className="w-[140px] bg-card border-border/50">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-border/50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Runs</p>
                  <p className="text-2xl font-bold text-foreground">1,247</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>+12% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                  <p className="text-2xl font-bold text-green-400">94.2%</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>+2.1% improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold text-foreground">14m 32s</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingDown className="w-3 h-3" />
                <span>-1m 45s faster</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Flaky Tests</p>
                  <p className="text-2xl font-bold text-amber-400">12</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-red-400">
                <TrendingUp className="w-3 h-3" />
                <span>+3 new this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="suite" className="space-y-4">
          <TabsList className="bg-muted/30 border border-border/50">
            <TabsTrigger value="suite">By Suite</TabsTrigger>
            <TabsTrigger value="release">By Release</TabsTrigger>
            <TabsTrigger value="environment">By Environment</TabsTrigger>
            <TabsTrigger value="api-ui">API vs UI</TabsTrigger>
          </TabsList>

          <TabsContent value="suite" className="space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Suite Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suiteReports.map((suite, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{suite.name}</p>
                          <p className="text-xs text-muted-foreground">{suite.passed + suite.failed + suite.flaky} tests • {suite.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {suite.passed}
                          </Badge>
                          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">
                            <XCircle className="w-3 h-3 mr-1" />
                            {suite.failed}
                          </Badge>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {suite.flaky}
                          </Badge>
                        </div>
                        {suite.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                        {suite.trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                        {suite.trend === "stable" && <div className="w-4 h-1 bg-muted-foreground rounded" />}
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="release" className="space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Release History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {releaseReports.map((release, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{release.version}</p>
                          <p className="text-xs text-muted-foreground">{release.date} • {release.tests} tests</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{((release.passed / release.tests) * 100).toFixed(1)}% passed</p>
                          <p className="text-xs text-muted-foreground">{release.regression} regressions</p>
                        </div>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500" 
                            style={{ width: `${(release.passed / release.tests) * 100}%` }}
                          />
                        </div>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environment" className="space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Environment Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {environmentReports.map((env, i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted/20 border border-border/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">{env.env}</h4>
                        <Badge variant="outline" className="text-xs">
                          {env.avgDuration}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Pass Rate</span>
                          <span className="text-green-400">{((env.passed / env.tests) * 100).toFixed(1)}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: `${(env.passed / env.tests) * 100}%` }} />
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="text-green-400">{env.passed} passed</span>
                          <span className="text-red-400">{env.failed} failed</span>
                          <span className="text-amber-400">{env.flaky} flaky</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api-ui" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    UI Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <p className="text-4xl font-bold text-foreground">127</p>
                      <p className="text-sm text-muted-foreground">Total UI Tests</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Passed</span>
                        <span className="text-sm font-medium text-green-400">118 (92.9%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Failed</span>
                        <span className="text-sm font-medium text-red-400">5 (3.9%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Flaky</span>
                        <span className="text-sm font-medium text-amber-400">4 (3.2%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    API Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <p className="text-4xl font-bold text-foreground">53</p>
                      <p className="text-sm text-muted-foreground">Total API Tests</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Passed</span>
                        <span className="text-sm font-medium text-green-400">51 (96.2%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Failed</span>
                        <span className="text-sm font-medium text-red-400">1 (1.9%)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Flaky</span>
                        <span className="text-sm font-medium text-amber-400">1 (1.9%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ConsoleLayout>
  );
}

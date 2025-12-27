import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, Search, TrendingUp, TrendingDown, 
  RefreshCw, Eye, Trash2, Clock, Activity, Zap
} from "lucide-react";

const flakyTests = [
  { 
    name: "checkout_payment_flow", 
    suite: "Checkout Flow",
    flakinessRate: 23.5,
    occurrences: 12,
    lastFlaky: "2 hours ago",
    avgDuration: "45s",
    trend: "increasing",
    rootCause: "Network timeout",
    suggestion: "Add retry logic for payment API"
  },
  { 
    name: "product_search_filter", 
    suite: "Product Search",
    flakinessRate: 18.2,
    occurrences: 8,
    lastFlaky: "5 hours ago",
    avgDuration: "32s",
    trend: "stable",
    rootCause: "Element timing",
    suggestion: "Use explicit waits"
  },
  { 
    name: "user_profile_update", 
    suite: "User Management",
    flakinessRate: 15.7,
    occurrences: 6,
    lastFlaky: "1 day ago",
    avgDuration: "28s",
    trend: "decreasing",
    rootCause: "Race condition",
    suggestion: "Sync state before assertion"
  },
  { 
    name: "cart_add_remove_items", 
    suite: "Shopping Cart",
    flakinessRate: 12.3,
    occurrences: 5,
    lastFlaky: "3 days ago",
    avgDuration: "38s",
    trend: "stable",
    rootCause: "Animation delay",
    suggestion: "Wait for animation complete"
  },
  { 
    name: "admin_dashboard_load", 
    suite: "Admin Panel",
    flakinessRate: 8.9,
    occurrences: 3,
    lastFlaky: "1 week ago",
    avgDuration: "52s",
    trend: "decreasing",
    rootCause: "Data loading",
    suggestion: "Mock heavy data endpoints"
  },
];

const heatmapData = [
  { hour: "00:00", mon: 0, tue: 1, wed: 0, thu: 2, fri: 0, sat: 0, sun: 0 },
  { hour: "04:00", mon: 0, tue: 0, wed: 1, thu: 0, fri: 1, sat: 0, sun: 0 },
  { hour: "08:00", mon: 3, tue: 2, wed: 4, thu: 2, fri: 3, sat: 1, sun: 0 },
  { hour: "12:00", mon: 5, tue: 4, wed: 6, thu: 5, fri: 4, sat: 2, sun: 1 },
  { hour: "16:00", mon: 4, tue: 5, wed: 3, thu: 4, fri: 6, sat: 1, sun: 0 },
  { hour: "20:00", mon: 2, tue: 1, wed: 2, thu: 1, fri: 2, sat: 0, sun: 0 },
];

const getHeatColor = (value: number) => {
  if (value === 0) return "bg-muted/30";
  if (value <= 2) return "bg-amber-500/30";
  if (value <= 4) return "bg-amber-500/50";
  return "bg-red-500/50";
};

export default function FlakinessExplorer() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Flakiness Explorer</h1>
            <p className="text-muted-foreground">Identify and resolve unstable tests</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-border/50">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Analysis
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <p className="text-xs text-muted-foreground mt-2">6.7% of total tests</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avg Flakiness Rate</p>
                  <p className="text-2xl font-bold text-foreground">15.7%</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingDown className="w-3 h-3" />
                <span>-3.2% vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Time Lost</p>
                  <p className="text-2xl font-bold text-foreground">4h 23m</p>
                </div>
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Clock className="w-5 h-5 text-red-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">This week from retries</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Auto-Healed</p>
                  <p className="text-2xl font-bold text-green-400">8</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Tests fixed by AI</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Flaky Tests List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Flaky Tests</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search tests..." 
                      className="pl-9 bg-muted/30 border-border/50"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flakyTests.map((test, i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span className="font-mono text-sm text-foreground">{test.name}</span>
                            <Badge variant="outline" className="text-xs">{test.suite}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Last flaky: {test.lastFlaky}</span>
                            <span>Avg duration: {test.avgDuration}</span>
                            <span>{test.occurrences} occurrences</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-muted/50 text-xs">
                              Root cause: {test.rootCause}
                            </Badge>
                            <span className="text-xs text-cyan-400">💡 {test.suggestion}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-amber-400">{test.flakinessRate}%</span>
                            {test.trend === "increasing" && <TrendingUp className="w-4 h-4 text-red-400" />}
                            {test.trend === "decreasing" && <TrendingDown className="w-4 h-4 text-green-400" />}
                            {test.trend === "stable" && <div className="w-4 h-1 bg-muted-foreground rounded" />}
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2">
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-red-400 hover:text-red-300">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Heatmap */}
          <div className="space-y-4">
            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Flakiness Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-8 gap-1 text-xs text-muted-foreground">
                    <div></div>
                    <div className="text-center">Mon</div>
                    <div className="text-center">Tue</div>
                    <div className="text-center">Wed</div>
                    <div className="text-center">Thu</div>
                    <div className="text-center">Fri</div>
                    <div className="text-center">Sat</div>
                    <div className="text-center">Sun</div>
                  </div>
                  {heatmapData.map((row, i) => (
                    <div key={i} className="grid grid-cols-8 gap-1">
                      <div className="text-xs text-muted-foreground flex items-center">{row.hour}</div>
                      <div className={`h-6 rounded ${getHeatColor(row.mon)}`}></div>
                      <div className={`h-6 rounded ${getHeatColor(row.tue)}`}></div>
                      <div className={`h-6 rounded ${getHeatColor(row.wed)}`}></div>
                      <div className={`h-6 rounded ${getHeatColor(row.thu)}`}></div>
                      <div className={`h-6 rounded ${getHeatColor(row.fri)}`}></div>
                      <div className={`h-6 rounded ${getHeatColor(row.sat)}`}></div>
                      <div className={`h-6 rounded ${getHeatColor(row.sun)}`}></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-muted/30"></div>
                    <span>None</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-amber-500/30"></div>
                    <span>Low</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-amber-500/50"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-red-500/50"></div>
                    <span>High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Top Root Causes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { cause: "Network Timeouts", count: 5, percentage: 42 },
                    { cause: "Element Timing", count: 3, percentage: 25 },
                    { cause: "Race Conditions", count: 2, percentage: 17 },
                    { cause: "Animation Delays", count: 2, percentage: 16 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.cause}</span>
                        <span className="text-foreground">{item.count} tests</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-400" 
                          style={{ width: `${item.percentage}%` }}
                        />
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
}

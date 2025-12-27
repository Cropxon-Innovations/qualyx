import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, Plus, FolderOpen, Play, MoreHorizontal, 
  CheckCircle, XCircle, Clock, Copy, Trash2, Edit,
  FileText, GitBranch, Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const suites = [
  {
    id: "suite_001",
    name: "Checkout Flow",
    description: "End-to-end checkout process tests",
    tests: 45,
    passed: 42,
    failed: 2,
    flaky: 1,
    lastRun: "2 hours ago",
    duration: "12m 34s",
    owner: "Sarah Chen",
    tags: ["e2e", "critical", "payment"]
  },
  {
    id: "suite_002",
    name: "User Authentication",
    description: "Login, signup, and session management",
    tests: 28,
    passed: 28,
    failed: 0,
    flaky: 0,
    lastRun: "4 hours ago",
    duration: "5m 12s",
    owner: "John Smith",
    tags: ["auth", "security"]
  },
  {
    id: "suite_003",
    name: "Product Search",
    description: "Search, filter, and sort functionality",
    tests: 32,
    passed: 27,
    failed: 3,
    flaky: 2,
    lastRun: "1 hour ago",
    duration: "8m 45s",
    owner: "Jane Doe",
    tags: ["search", "ui"]
  },
  {
    id: "suite_004",
    name: "API Integration",
    description: "REST API endpoint tests",
    tests: 56,
    passed: 54,
    failed: 1,
    flaky: 1,
    lastRun: "30 minutes ago",
    duration: "3m 22s",
    owner: "Mike Wilson",
    tags: ["api", "integration"]
  },
  {
    id: "suite_005",
    name: "Admin Dashboard",
    description: "Admin panel functionality tests",
    tests: 38,
    passed: 36,
    failed: 1,
    flaky: 1,
    lastRun: "6 hours ago",
    duration: "15m 08s",
    owner: "Sarah Chen",
    tags: ["admin", "crud"]
  },
  {
    id: "suite_006",
    name: "Mobile Responsive",
    description: "Mobile viewport and touch interactions",
    tests: 24,
    passed: 22,
    failed: 2,
    flaky: 0,
    lastRun: "1 day ago",
    duration: "6m 55s",
    owner: "Jane Doe",
    tags: ["mobile", "responsive"]
  },
];

export default function SuitesPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Test Suites</h1>
            <p className="text-muted-foreground">Organize and manage your test collections</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Suite
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Suites</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <FolderOpen className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold text-foreground">223</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                  <p className="text-2xl font-bold text-green-400">93.7%</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold text-foreground">8m 39s</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search suites..." 
              className="pl-9 bg-card border-border/50"
            />
          </div>
          <Button variant="outline" className="border-border/50">
            <GitBranch className="w-4 h-4 mr-2" />
            All Branches
          </Button>
          <Button variant="outline" className="border-border/50">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 days
          </Button>
        </div>

        {/* Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suites.map((suite) => (
            <Card key={suite.id} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FolderOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{suite.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">{suite.description}</p>
                    </div>
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
                        Run Suite
                      </DropdownMenuItem>
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
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Test Results */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">{suite.passed}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-400">{suite.failed}</span>
                  </div>
                  {suite.flaky > 0 && (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                      {suite.flaky} flaky
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">{suite.tests} tests</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <div 
                      className="bg-green-500" 
                      style={{ width: `${(suite.passed / suite.tests) * 100}%` }}
                    />
                    <div 
                      className="bg-red-500" 
                      style={{ width: `${(suite.failed / suite.tests) * 100}%` }}
                    />
                    <div 
                      className="bg-amber-500" 
                      style={{ width: `${(suite.flaky / suite.tests) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {suite.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{suite.duration}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{suite.lastRun}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}

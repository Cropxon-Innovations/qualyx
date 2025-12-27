import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Map, LayoutGrid, List, RefreshCw } from "lucide-react";

const modules = [
  { name: "Authentication", coverage: 95, tests: 24, passed: 23, failed: 1 },
  { name: "User Management", coverage: 88, tests: 18, passed: 16, failed: 2 },
  { name: "Dashboard", coverage: 72, tests: 12, passed: 9, failed: 3 },
  { name: "Payments", coverage: 91, tests: 32, passed: 29, failed: 3 },
  { name: "Reporting", coverage: 65, tests: 8, passed: 5, failed: 3 },
  { name: "Settings", coverage: 82, tests: 15, passed: 12, failed: 3 },
  { name: "API Gateway", coverage: 78, tests: 22, passed: 17, failed: 5 },
  { name: "Notifications", coverage: 85, tests: 10, passed: 8, failed: 2 },
];

const CoverageMap = () => {
  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return "bg-green-500";
    if (coverage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Coverage Map</h1>
            <p className="text-muted-foreground">Visual overview of test coverage across modules</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <LayoutGrid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button variant="outline" size="sm">
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Overall Coverage</p>
                <div className="text-4xl font-bold text-primary">82%</div>
                <Progress value={82} className="mt-3" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Total Tests</p>
                <div className="text-4xl font-bold">141</div>
                <p className="text-sm text-muted-foreground mt-1">across 8 modules</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Uncovered Areas</p>
                <div className="text-4xl font-bold text-destructive">12</div>
                <p className="text-sm text-muted-foreground mt-1">critical paths need tests</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coverage Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Module Coverage</CardTitle>
            <CardDescription>Test coverage breakdown by application module</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {modules.map((module) => (
                <Card key={module.name} className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-sm">{module.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${getCoverageColor(module.coverage)} bg-opacity-20 border-0 text-xs`}
                      >
                        {module.coverage}%
                      </Badge>
                    </div>
                    <Progress value={module.coverage} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span className="text-green-500">{module.passed} passed</span>
                      <span className="text-red-500">{module.failed} failed</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Module</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Coverage</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tests</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Passed</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Failed</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => (
                    <tr key={module.name} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{module.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Progress value={module.coverage} className="w-20 h-2" />
                          <span className="text-sm">{module.coverage}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{module.tests}</td>
                      <td className="py-3 px-4 text-green-500">{module.passed}</td>
                      <td className="py-3 px-4 text-red-500">{module.failed}</td>
                      <td className="py-3 px-4">
                        <Badge variant={module.coverage >= 80 ? "default" : "destructive"}>
                          {module.coverage >= 80 ? "Good" : "Needs Work"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsoleLayout>
  );
};

export default CoverageMap;

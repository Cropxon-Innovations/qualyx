import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileCode, Plus, Search, Layers, Play, Settings } from "lucide-react";

const suites = [
  { id: 1, name: "Smoke Tests", tests: 12, lastRun: "2h ago", status: "passed" },
  { id: 2, name: "Regression Suite", tests: 48, lastRun: "1h ago", status: "passed" },
  { id: 3, name: "API Integration", tests: 24, lastRun: "30m ago", status: "failed" },
  { id: 4, name: "E2E Critical Paths", tests: 8, lastRun: "4h ago", status: "passed" },
];

const SuitesBuilder = () => {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Suites Builder</h1>
            <p className="text-muted-foreground">Create and manage test suites</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Suite
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search suites..." className="pl-10" />
          </div>
        </div>

        <div className="grid gap-4">
          {suites.map((suite) => (
            <Card key={suite.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{suite.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {suite.tests} tests • Last run {suite.lastRun}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={suite.status === "passed" ? "default" : "destructive"}>
                      {suite.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default SuitesBuilder;

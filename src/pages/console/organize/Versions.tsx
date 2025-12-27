import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Plus, GitCommit, Calendar, User } from "lucide-react";

const versions = [
  { id: 1, version: "v2.4.0", branch: "main", date: "Dec 27, 2024", author: "John Doe", tests: 142, status: "current" },
  { id: 2, version: "v2.3.1", branch: "main", date: "Dec 20, 2024", author: "Jane Smith", tests: 138, status: "stable" },
  { id: 3, version: "v2.3.0", branch: "main", date: "Dec 15, 2024", author: "John Doe", tests: 135, status: "archived" },
  { id: 4, version: "v2.2.0", branch: "main", date: "Dec 1, 2024", author: "Alex Johnson", tests: 128, status: "archived" },
];

const Versions = () => {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Versions</h1>
            <p className="text-muted-foreground">Track test suite versions and history</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Version
          </Button>
        </div>

        <div className="space-y-4">
          {versions.map((version) => (
            <Card key={version.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GitCommit className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{version.version}</h3>
                        <Badge variant={version.status === "current" ? "default" : "secondary"}>
                          {version.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" />
                          {version.branch}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {version.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {version.author}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{version.tests} tests</span>
                    <Button size="sm" variant="outline">View</Button>
                    {version.status !== "current" && (
                      <Button size="sm" variant="outline">Restore</Button>
                    )}
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

export default Versions;

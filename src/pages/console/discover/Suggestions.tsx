import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb, Target, Zap, CheckCircle2, XCircle, Clock } from "lucide-react";

const suggestions = [
  {
    id: 1,
    type: "coverage",
    title: "Add tests for password reset flow",
    description: "The password reset flow has 0% test coverage. AI detected 3 critical user paths that should be tested.",
    priority: "high",
    effort: "medium",
    status: "pending",
    paths: ["Reset via email", "Reset via SMS", "Security questions"],
  },
  {
    id: 2,
    type: "flakiness",
    title: "Fix flaky checkout test",
    description: "The 'Complete Purchase' test has failed 12 times in the last 30 days due to timing issues.",
    priority: "high",
    effort: "low",
    status: "pending",
    recommendation: "Add explicit wait for payment confirmation element",
  },
  {
    id: 3,
    type: "optimization",
    title: "Parallelize user management tests",
    description: "Running 8 user management tests in parallel could reduce suite runtime by 65%.",
    priority: "medium",
    effort: "low",
    status: "accepted",
    impact: "Save 4 minutes per run",
  },
  {
    id: 4,
    type: "coverage",
    title: "Add API contract tests",
    description: "5 API endpoints lack contract testing. Adding these would increase API coverage by 23%.",
    priority: "medium",
    effort: "medium",
    status: "pending",
    endpoints: ["/api/users", "/api/orders", "/api/products", "/api/payments", "/api/notifications"],
  },
  {
    id: 5,
    type: "maintenance",
    title: "Update deprecated selectors",
    description: "12 tests use deprecated CSS selectors. AI has generated updated selectors using data-testid.",
    priority: "low",
    effort: "low",
    status: "dismissed",
  },
];

const Suggestions = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "coverage": return Target;
      case "flakiness": return Zap;
      case "optimization": return Lightbulb;
      default: return Sparkles;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "coverage": return "text-blue-500 bg-blue-500/10";
      case "flakiness": return "text-orange-500 bg-orange-500/10";
      case "optimization": return "text-green-500 bg-green-500/10";
      default: return "text-purple-500 bg-purple-500/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-500";
      case "medium": return "bg-yellow-500/10 text-yellow-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "dismissed": return <XCircle className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">AI Suggestions</h1>
              <Badge className="bg-primary/20 text-primary">AI Powered</Badge>
            </div>
            <p className="text-muted-foreground">Intelligent recommendations to improve your test suite</p>
          </div>
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Analyze Suite
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Suggestions</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Sparkles className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                  <p className="text-2xl font-bold text-green-500">8</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-500">4</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Time Saved</p>
                  <p className="text-2xl font-bold">2.5h/week</p>
                </div>
                <Zap className="w-8 h-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions List */}
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const TypeIcon = getTypeIcon(suggestion.type);
            return (
              <Card key={suggestion.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(suggestion.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{suggestion.title}</h3>
                        <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                          {suggestion.priority}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {suggestion.effort} effort
                        </Badge>
                        {getStatusIcon(suggestion.status)}
                      </div>
                      <p className="text-muted-foreground mb-4">{suggestion.description}</p>
                      
                      {suggestion.paths && (
                        <div className="flex gap-2 mb-4">
                          {suggestion.paths.map((path) => (
                            <Badge key={path} variant="secondary">{path}</Badge>
                          ))}
                        </div>
                      )}
                      
                      {suggestion.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm">Accept & Apply</Button>
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm" variant="ghost">Dismiss</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default Suggestions;

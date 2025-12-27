import { useState } from "react";
import { 
  Plug, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Settings,
  ExternalLink,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const integrations = [
  { 
    id: "github", 
    name: "GitHub Actions", 
    category: "CI/CD",
    status: "connected", 
    description: "Trigger tests on push, PR, or schedule",
    lastSync: "2 min ago"
  },
  { 
    id: "gitlab", 
    name: "GitLab CI", 
    category: "CI/CD",
    status: "disconnected", 
    description: "Integrate with GitLab pipelines"
  },
  { 
    id: "jenkins", 
    name: "Jenkins", 
    category: "CI/CD",
    status: "disconnected", 
    description: "Connect to Jenkins jobs"
  },
  { 
    id: "slack", 
    name: "Slack", 
    category: "Communication",
    status: "connected", 
    description: "Get test notifications in Slack",
    lastSync: "Just now"
  },
  { 
    id: "teams", 
    name: "Microsoft Teams", 
    category: "Communication",
    status: "disconnected", 
    description: "Post results to Teams channels"
  },
  { 
    id: "jira", 
    name: "Jira", 
    category: "Issue Tracking",
    status: "connected", 
    description: "Auto-create tickets on failures",
    lastSync: "5 min ago"
  },
  { 
    id: "linear", 
    name: "Linear", 
    category: "Issue Tracking",
    status: "disconnected", 
    description: "Sync with Linear issues"
  },
  { 
    id: "pagerduty", 
    name: "PagerDuty", 
    category: "Alerting",
    status: "disconnected", 
    description: "Escalate critical test failures"
  },
];

export const IntegrationsPage = () => {
  const connectedCount = integrations.filter(i => i.status === "connected").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            {connectedCount} of {integrations.length} integrations connected
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh All
        </Button>
      </div>

      {/* Integration Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <Card 
            key={integration.id} 
            className={`bg-card/50 border-border/40 transition-all ${
              integration.status === "connected" ? "border-success/30" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    integration.status === "connected" ? "bg-success/10" : "bg-muted/30"
                  }`}>
                    <Plug className={`w-5 h-5 ${
                      integration.status === "connected" ? "text-success" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{integration.name}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-[10px]">
                      {integration.category}
                    </Badge>
                  </div>
                </div>
                {integration.status === "connected" ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
              {integration.status === "connected" ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Synced {integration.lastSync}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      Test
                    </Button>
                  </div>
                </div>
              ) : (
                <Button className="w-full" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;

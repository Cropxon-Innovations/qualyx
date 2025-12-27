import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Globe, Settings, MoreHorizontal, CheckCircle, 
  XCircle, Copy, Trash2, Edit, Link2, Server, Lock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const environments = [
  {
    id: "env_001",
    name: "Production",
    baseUrl: "https://app.example.com",
    status: "active",
    lastUsed: "2 minutes ago",
    tests: 180,
    secrets: 12,
    variables: 24,
    color: "green"
  },
  {
    id: "env_002",
    name: "Staging",
    baseUrl: "https://staging.example.com",
    status: "active",
    lastUsed: "15 minutes ago",
    tests: 180,
    secrets: 10,
    variables: 24,
    color: "amber"
  },
  {
    id: "env_003",
    name: "Development",
    baseUrl: "https://dev.example.com",
    status: "active",
    lastUsed: "1 hour ago",
    tests: 145,
    secrets: 8,
    variables: 20,
    color: "blue"
  },
  {
    id: "env_004",
    name: "Local",
    baseUrl: "http://localhost:3000",
    status: "inactive",
    lastUsed: "3 days ago",
    tests: 120,
    secrets: 5,
    variables: 15,
    color: "gray"
  },
];

const variables = [
  { key: "API_VERSION", value: "v2", environments: ["prod", "staging", "dev"] },
  { key: "TIMEOUT_MS", value: "30000", environments: ["prod", "staging"] },
  { key: "DEBUG_MODE", value: "false", environments: ["prod"] },
  { key: "FEATURE_FLAG_NEW_UI", value: "true", environments: ["staging", "dev"] },
];

export default function EnvironmentsPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Environments</h1>
            <p className="text-muted-foreground">Configure and manage test environments</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Environment
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Environments</p>
                  <p className="text-2xl font-bold text-foreground">4</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">3 active, 1 inactive</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Variables</p>
                  <p className="text-2xl font-bold text-foreground">83</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Settings className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across all environments</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Secrets</p>
                  <p className="text-2xl font-bold text-foreground">35</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Encrypted values</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Runners</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Server className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Connected runners</p>
            </CardContent>
          </Card>
        </div>

        {/* Environments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {environments.map((env) => (
            <Card key={env.id} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${
                      env.color === 'green' ? 'bg-green-500/10' :
                      env.color === 'amber' ? 'bg-amber-500/10' :
                      env.color === 'blue' ? 'bg-blue-500/10' :
                      'bg-muted'
                    }`}>
                      <Globe className={`w-5 h-5 ${
                        env.color === 'green' ? 'text-green-400' :
                        env.color === 'amber' ? 'text-amber-400' :
                        env.color === 'blue' ? 'text-blue-400' :
                        'text-muted-foreground'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {env.name}
                        {env.status === 'active' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-muted-foreground" />
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <Link2 className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">{env.baseUrl}</span>
                      </div>
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
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{env.tests}</p>
                    <p className="text-xs text-muted-foreground">Tests</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{env.variables}</p>
                    <p className="text-xs text-muted-foreground">Variables</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{env.secrets}</p>
                    <p className="text-xs text-muted-foreground">Secrets</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-xs text-muted-foreground">Last used: {env.lastUsed}</span>
                  <Button variant="outline" size="sm" className="h-7">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Variables Table */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Environment Variables</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Variable
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {variables.map((variable) => (
                <div key={variable.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-4">
                    <code className="text-sm font-mono text-foreground">{variable.key}</code>
                    <code className="text-sm font-mono text-muted-foreground">{variable.value}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    {variable.environments.map((e) => (
                      <Badge key={e} variant="outline" className={`text-xs ${
                        e === 'prod' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                        e === 'staging' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      }`}>
                        {e}
                      </Badge>
                    ))}
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
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

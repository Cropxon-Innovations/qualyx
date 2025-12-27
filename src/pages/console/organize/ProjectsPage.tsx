import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, Plus, Folder, Settings, MoreHorizontal, 
  CheckCircle, XCircle, Clock, Users, Globe, Lock,
  Activity, TrendingUp, Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = [
  {
    id: "proj_001",
    name: "E-Commerce Platform",
    description: "Main e-commerce web application",
    suites: 8,
    tests: 156,
    passRate: 94.2,
    lastActivity: "10 minutes ago",
    team: 5,
    visibility: "private",
    status: "active",
    environments: ["dev", "staging", "prod"]
  },
  {
    id: "proj_002",
    name: "Mobile API",
    description: "Backend API for mobile applications",
    suites: 4,
    tests: 89,
    passRate: 97.8,
    lastActivity: "2 hours ago",
    team: 3,
    visibility: "private",
    status: "active",
    environments: ["dev", "staging", "prod"]
  },
  {
    id: "proj_003",
    name: "Admin Dashboard",
    description: "Internal administration portal",
    suites: 3,
    tests: 45,
    passRate: 91.1,
    lastActivity: "5 hours ago",
    team: 2,
    visibility: "private",
    status: "active",
    environments: ["dev", "prod"]
  },
  {
    id: "proj_004",
    name: "Marketing Website",
    description: "Public-facing marketing site",
    suites: 2,
    tests: 28,
    passRate: 100,
    lastActivity: "1 day ago",
    team: 2,
    visibility: "public",
    status: "active",
    environments: ["staging", "prod"]
  },
  {
    id: "proj_005",
    name: "Payment Gateway",
    description: "Payment processing integration",
    suites: 5,
    tests: 67,
    passRate: 98.5,
    lastActivity: "3 hours ago",
    team: 4,
    visibility: "private",
    status: "active",
    environments: ["dev", "staging", "prod"]
  },
  {
    id: "proj_006",
    name: "Legacy Portal",
    description: "Legacy system maintenance tests",
    suites: 2,
    tests: 34,
    passRate: 85.3,
    lastActivity: "1 week ago",
    team: 1,
    visibility: "private",
    status: "archived",
    environments: ["prod"]
  },
];

export default function ProjectsPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground">Manage your testing projects</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold text-foreground">6</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Folder className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">5 active, 1 archived</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Tests</p>
                  <p className="text-2xl font-bold text-foreground">419</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>+24 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Avg Pass Rate</p>
                  <p className="text-2xl font-bold text-green-400">94.5%</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>+1.2% improvement</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Team Members</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across all projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-9 bg-card border-border/50"
            />
          </div>
          <Button variant="outline" className="border-border/50">
            <Calendar className="w-4 h-4 mr-2" />
            All Time
          </Button>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className={`bg-card/50 border-border/50 hover:border-primary/50 transition-colors ${project.status === 'archived' ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${project.status === 'archived' ? 'bg-muted' : 'bg-primary/10'}`}>
                      <Folder className={`w-6 h-6 ${project.status === 'archived' ? 'text-muted-foreground' : 'text-primary'}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                        {project.visibility === 'private' ? (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Globe className="w-4 h-4 text-muted-foreground" />
                        )}
                        {project.status === 'archived' && (
                          <Badge variant="outline" className="text-xs">Archived</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{project.suites} suites</span>
                        <span>•</span>
                        <span>{project.tests} tests</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{project.team} members</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.environments.map((env) => (
                          <Badge 
                            key={env} 
                            variant="outline" 
                            className={`text-xs ${
                              env === 'prod' ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                              env === 'staging' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                              'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            }`}
                          >
                            {env}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${project.passRate >= 95 ? 'text-green-400' : project.passRate >= 90 ? 'text-amber-400' : 'text-red-400'}`}>
                          {project.passRate}%
                        </span>
                        {project.passRate >= 95 ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : project.passRate >= 90 ? (
                          <Activity className="w-5 h-5 text-amber-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{project.lastActivity}</span>
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
                          <Folder className="w-4 h-4 mr-2" />
                          Open Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="w-4 h-4 mr-2" />
                          Manage Team
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {project.status === 'archived' ? (
                          <DropdownMenuItem>Restore</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-amber-400">Archive</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}

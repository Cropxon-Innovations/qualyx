import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Route, Search, Filter, Play, MoreHorizontal, TrendingUp, Users, Clock } from "lucide-react";

const journeys = [
  {
    id: 1,
    name: "User Registration Flow",
    steps: 8,
    lastRun: "2 hours ago",
    status: "passed",
    coverage: 95,
    avgDuration: "2.4s",
    users: 1250,
  },
  {
    id: 2,
    name: "Checkout Process",
    steps: 12,
    lastRun: "1 hour ago",
    status: "passed",
    coverage: 88,
    avgDuration: "4.2s",
    users: 890,
  },
  {
    id: 3,
    name: "Password Reset",
    steps: 5,
    lastRun: "30 min ago",
    status: "failed",
    coverage: 72,
    avgDuration: "1.8s",
    users: 320,
  },
  {
    id: 4,
    name: "Product Search & Filter",
    steps: 6,
    lastRun: "45 min ago",
    status: "passed",
    coverage: 91,
    avgDuration: "3.1s",
    users: 2100,
  },
  {
    id: 5,
    name: "Profile Update",
    steps: 4,
    lastRun: "3 hours ago",
    status: "passed",
    coverage: 85,
    avgDuration: "1.5s",
    users: 560,
  },
];

const UserJourneys = () => {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">User Journeys</h1>
            <p className="text-muted-foreground">Track and analyze critical user flows</p>
          </div>
          <Button>
            <Route className="w-4 h-4 mr-2" />
            Create Journey
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Journeys</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Route className="w-8 h-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Coverage</p>
                  <p className="text-2xl font-bold">87%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">5.1K</p>
                </div>
                <Users className="w-8 h-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">2.6s</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search journeys..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Journeys Grid */}
        <div className="grid gap-4">
          {journeys.map((journey) => (
            <Card key={journey.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Route className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{journey.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {journey.steps} steps • Last run {journey.lastRun}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Coverage</p>
                      <p className="font-semibold">{journey.coverage}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Avg Time</p>
                      <p className="font-semibold">{journey.avgDuration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Users</p>
                      <p className="font-semibold">{journey.users.toLocaleString()}</p>
                    </div>
                    <Badge 
                      variant={journey.status === "passed" ? "default" : "destructive"}
                      className={journey.status === "passed" ? "bg-green-500/10 text-green-500" : ""}
                    >
                      {journey.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
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

export default UserJourneys;

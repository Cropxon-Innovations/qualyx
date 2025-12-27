import { useState } from "react";
import { 
  Shield, 
  Users, 
  Key,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const secrets = [
  { id: 1, name: "API_KEY", env: "all", masked: true, lastUsed: "2 min ago", createdBy: "John Doe" },
  { id: 2, name: "DB_PASSWORD", env: "production", masked: true, lastUsed: "1 hour ago", createdBy: "System" },
  { id: 3, name: "AUTH_TOKEN", env: "staging", masked: true, lastUsed: "5 min ago", createdBy: "Sarah Chen" },
  { id: 4, name: "STRIPE_SECRET", env: "production", masked: true, lastUsed: "3 hours ago", createdBy: "John Doe" },
  { id: 5, name: "SMTP_PASSWORD", env: "all", masked: true, lastUsed: "1 day ago", createdBy: "Mike Johnson" },
];

const roles = [
  { name: "Admin", users: 2, permissions: ["all"], color: "destructive" },
  { name: "QA Lead", users: 3, permissions: ["execute", "create", "analyze", "organize"], color: "primary" },
  { name: "Developer", users: 8, permissions: ["execute", "analyze"], color: "success" },
  { name: "Viewer", users: 5, permissions: ["analyze"], color: "muted" },
  { name: "Auditor", users: 1, permissions: ["analyze", "govern"], color: "warning" },
];

const users = [
  { name: "John Doe", email: "john@cropxon.com", role: "Admin", status: "active", lastActive: "Just now" },
  { name: "Sarah Chen", email: "sarah@cropxon.com", role: "QA Lead", status: "active", lastActive: "5 min ago" },
  { name: "Mike Johnson", email: "mike@cropxon.com", role: "Developer", status: "active", lastActive: "1 hour ago" },
  { name: "Lisa Wang", email: "lisa@cropxon.com", role: "Developer", status: "active", lastActive: "2 hours ago" },
  { name: "Alex Kim", email: "alex@cropxon.com", role: "Viewer", status: "inactive", lastActive: "3 days ago" },
];

export const AccessControl = () => {
  const [showSecret, setShowSecret] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Access Control</h1>
          <p className="text-sm text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Invite User
        </Button>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="bg-muted/30">
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <Shield className="w-4 h-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="secrets" className="gap-2">
            <Key className="w-4 h-4" />
            Secrets
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-6">
          <Card className="bg-card/50 border-border/40">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40">
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email} className="border-border/40">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          user.role === "Admin" ? "border-destructive/30 text-destructive" :
                          user.role === "QA Lead" ? "border-primary/30 text-primary" :
                          "border-muted-foreground/30"
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.status === "active" ? (
                            <>
                              <span className="w-2 h-2 rounded-full bg-success" />
                              <span className="text-sm text-success">Active</span>
                            </>
                          ) : (
                            <>
                              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                              <span className="text-sm text-muted-foreground">Inactive</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card key={role.name} className="bg-card/50 border-border/40">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <Badge variant="outline">{role.users} users</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((perm) => (
                      <span key={perm} className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground">
                        {perm}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </CardContent>
              </Card>
            ))}
            <Card className="bg-card/30 border-dashed border-border/40 flex items-center justify-center min-h-[150px] cursor-pointer hover:bg-card/50 transition-colors">
              <div className="text-center">
                <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Create Role</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Secrets Tab */}
        <TabsContent value="secrets" className="mt-6">
          <Card className="bg-card/50 border-border/40">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Secrets Vault</CardTitle>
                  <CardDescription>Encrypted credentials and API keys</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Secret
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40">
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Environment</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {secrets.map((secret) => (
                    <TableRow key={secret.id} className="border-border/40">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Key className="w-4 h-4 text-primary" />
                          <span className="font-mono text-sm">{secret.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-muted-foreground">
                            {showSecret === secret.id ? "sk_live_abc123xyz..." : "••••••••••••••••"}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => setShowSecret(showSecret === secret.id ? null : secret.id)}
                          >
                            {showSecret === secret.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          secret.env === "production" ? "border-destructive/30 text-destructive" :
                          secret.env === "staging" ? "border-warning/30 text-warning" :
                          "border-muted-foreground/30"
                        }>
                          {secret.env}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{secret.lastUsed}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{secret.createdBy}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessControl;

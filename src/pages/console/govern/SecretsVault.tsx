import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Key, Plus, Search, Eye, EyeOff, Copy, Trash2, Shield } from "lucide-react";
import { useState } from "react";

const secrets = [
  { id: 1, name: "API_KEY_PROD", environment: "Production", lastUsed: "2h ago", createdBy: "John Doe" },
  { id: 2, name: "DATABASE_URL", environment: "All", lastUsed: "1h ago", createdBy: "System" },
  { id: 3, name: "STRIPE_SECRET", environment: "Production", lastUsed: "30m ago", createdBy: "Jane Smith" },
  { id: 4, name: "AWS_ACCESS_KEY", environment: "All", lastUsed: "4h ago", createdBy: "John Doe" },
  { id: 5, name: "OAUTH_CLIENT_SECRET", environment: "Staging", lastUsed: "1d ago", createdBy: "Alex Johnson" },
];

const SecretsVault = () => {
  const [showSecrets, setShowSecrets] = useState<Record<number, boolean>>({});

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Secrets Vault</h1>
            <p className="text-muted-foreground">Securely manage API keys and credentials</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Secret
          </Button>
        </div>

        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-yellow-500" />
              <p className="text-sm">
                Secrets are encrypted at rest and in transit. Access is logged and auditable.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search secrets..." className="pl-10" />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Environment</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Used</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Created By</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {secrets.map((secret) => (
                  <tr key={secret.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-primary" />
                        <span className="font-mono font-medium">{secret.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {showSecrets[secret.id] ? "sk_live_abc123..." : "••••••••••••"}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{secret.environment}</Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{secret.lastUsed}</td>
                    <td className="py-3 px-4 text-muted-foreground">{secret.createdBy}</td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-1">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setShowSecrets(prev => ({ ...prev, [secret.id]: !prev[secret.id] }))}
                        >
                          {showSecrets[secret.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </ConsoleLayout>
  );
};

export default SecretsVault;

import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Lock, Shield, Key, AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

const securityChecks = [
  { id: 1, name: "SSL/TLS Encryption", status: "passed", description: "All data encrypted in transit" },
  { id: 2, name: "Data Encryption at Rest", status: "passed", description: "AES-256 encryption enabled" },
  { id: 3, name: "Two-Factor Authentication", status: "warning", description: "Not all users have 2FA enabled" },
  { id: 4, name: "API Key Rotation", status: "passed", description: "Keys rotated within 90 days" },
  { id: 5, name: "Audit Logging", status: "passed", description: "All actions are logged" },
  { id: 6, name: "IP Whitelisting", status: "disabled", description: "Not configured" },
];

const Security = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default: return <Lock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Security</h1>
            <p className="text-muted-foreground">Security settings and compliance</p>
          </div>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Run Security Scan
          </Button>
        </div>

        {/* Security Score */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Security Score</p>
                  <p className="text-3xl font-bold text-green-500">92/100</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-500">Excellent</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security Checks */}
        <Card>
          <CardHeader>
            <CardTitle>Security Checks</CardTitle>
            <CardDescription>Automated security validation results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {securityChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <p className="font-medium">{check.name}</p>
                    <p className="text-sm text-muted-foreground">{check.description}</p>
                  </div>
                </div>
                <Badge variant={check.status === "passed" ? "default" : check.status === "warning" ? "secondary" : "outline"}>
                  {check.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Enforce Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require 2FA for all team members</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">IP Whitelisting</p>
                <p className="text-sm text-muted-foreground">Restrict access to specific IPs</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">API Rate Limiting</p>
                <p className="text-sm text-muted-foreground">Limit API requests per minute</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsoleLayout>
  );
};

export default Security;

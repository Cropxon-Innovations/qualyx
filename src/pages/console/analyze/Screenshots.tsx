import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, Search, Filter, Download, Eye, Trash2 } from "lucide-react";

const screenshots = [
  { id: 1, name: "login-page.png", test: "Login Test", step: "Navigate to login", timestamp: "2024-12-27 14:32:18", status: "passed" },
  { id: 2, name: "dashboard-view.png", test: "Dashboard Load", step: "Verify dashboard", timestamp: "2024-12-27 14:32:25", status: "passed" },
  { id: 3, name: "error-modal.png", test: "Error Handling", step: "Trigger error", timestamp: "2024-12-27 14:33:01", status: "failed" },
  { id: 4, name: "checkout-form.png", test: "Checkout Flow", step: "Fill payment form", timestamp: "2024-12-27 14:33:15", status: "passed" },
  { id: 5, name: "confirmation.png", test: "Order Complete", step: "Verify confirmation", timestamp: "2024-12-27 14:33:28", status: "passed" },
  { id: 6, name: "profile-update.png", test: "Profile Edit", step: "Save changes", timestamp: "2024-12-27 14:34:02", status: "failed" },
];

const Screenshots = () => {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Screenshots</h1>
            <p className="text-muted-foreground">Visual evidence from test executions</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search screenshots..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screenshots.map((screenshot) => (
            <Card key={screenshot.id} className="hover:border-primary/50 transition-colors overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <Camera className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{screenshot.name}</span>
                  <Badge variant={screenshot.status === "passed" ? "default" : "destructive"} className="text-xs">
                    {screenshot.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{screenshot.test}</p>
                <p className="text-xs text-muted-foreground mb-3">{screenshot.step}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{screenshot.timestamp}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
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

export default Screenshots;

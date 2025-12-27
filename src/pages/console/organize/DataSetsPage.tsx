import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Database, Search, Upload, Download, MoreHorizontal, 
  FileSpreadsheet, Table, Edit, Copy, Trash2, Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dataSets = [
  {
    id: "ds_001",
    name: "User Credentials",
    description: "Test user accounts for authentication flows",
    records: 50,
    fields: 5,
    lastUpdated: "2 hours ago",
    usedIn: 12,
    type: "credentials"
  },
  {
    id: "ds_002",
    name: "Product Catalog",
    description: "Sample products for e-commerce testing",
    records: 200,
    fields: 8,
    lastUpdated: "1 day ago",
    usedIn: 8,
    type: "products"
  },
  {
    id: "ds_003",
    name: "Payment Methods",
    description: "Test credit cards and payment info",
    records: 25,
    fields: 6,
    lastUpdated: "5 days ago",
    usedIn: 5,
    type: "payment"
  },
  {
    id: "ds_004",
    name: "Address Book",
    description: "Shipping and billing addresses",
    records: 100,
    fields: 10,
    lastUpdated: "3 days ago",
    usedIn: 6,
    type: "addresses"
  },
  {
    id: "ds_005",
    name: "API Responses",
    description: "Mock API response data",
    records: 75,
    fields: 4,
    lastUpdated: "1 week ago",
    usedIn: 15,
    type: "api"
  },
];

const sampleData = [
  { id: 1, username: "testuser1", email: "test1@example.com", role: "user", status: "active" },
  { id: 2, username: "testuser2", email: "test2@example.com", role: "admin", status: "active" },
  { id: 3, username: "testuser3", email: "test3@example.com", role: "user", status: "inactive" },
  { id: 4, username: "testuser4", email: "test4@example.com", role: "viewer", status: "active" },
];

export default function DataSetsPage() {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Test Data</h1>
            <p className="text-muted-foreground">Manage datasets for data-driven testing</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-border/50">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV/Excel
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Dataset
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Datasets</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Database className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold text-foreground">450</p>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Table className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Used in Tests</p>
                  <p className="text-2xl font-bold text-foreground">46</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold text-foreground">2.4 MB</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Database className="w-5 h-5 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search datasets..." 
            className="pl-9 bg-card border-border/50"
          />
        </div>

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSets.map((dataset) => (
            <Card key={dataset.id} className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{dataset.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">{dataset.description}</p>
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
                        <Eye className="w-4 h-4 mr-2" />
                        View Data
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Export
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
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{dataset.records} records</span>
                  <span>•</span>
                  <span>{dataset.fields} fields</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <Badge variant="outline" className="text-xs">
                    Used in {dataset.usedIn} tests
                  </Badge>
                  <span className="text-xs text-muted-foreground">{dataset.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Data Preview */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">User Credentials Preview</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-3 text-muted-foreground font-medium">ID</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Username</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Email</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Role</th>
                    <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row) => (
                    <tr key={row.id} className="border-b border-border/30 hover:bg-muted/20">
                      <td className="p-3 text-foreground">{row.id}</td>
                      <td className="p-3 text-foreground font-mono">{row.username}</td>
                      <td className="p-3 text-foreground">{row.email}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {row.role}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline" className={`text-xs ${
                          row.status === 'active' 
                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </ConsoleLayout>
  );
}

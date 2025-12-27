import { ConsoleLayout } from "@/components/console/ConsoleLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tags as TagsIcon, Plus, Search, Pencil, Trash2 } from "lucide-react";

const tags = [
  { id: 1, name: "smoke", color: "bg-green-500", count: 24 },
  { id: 2, name: "regression", color: "bg-blue-500", count: 48 },
  { id: 3, name: "critical", color: "bg-red-500", count: 12 },
  { id: 4, name: "api", color: "bg-purple-500", count: 32 },
  { id: 5, name: "ui", color: "bg-orange-500", count: 56 },
  { id: 6, name: "integration", color: "bg-cyan-500", count: 18 },
  { id: 7, name: "e2e", color: "bg-pink-500", count: 28 },
  { id: 8, name: "performance", color: "bg-yellow-500", count: 8 },
];

const Tags = () => {
  return (
    <ConsoleLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Tags</h1>
            <p className="text-muted-foreground">Organize tests with tags for easy filtering</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Tag
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tags..." className="pl-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map((tag) => (
            <Card key={tag.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                    <span className="font-medium">{tag.name}</span>
                    <Badge variant="secondary">{tag.count} tests</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Pencil className="w-4 h-4" />
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

export default Tags;

import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Bell, 
  HelpCircle, 
  ChevronDown,
  PanelLeftClose,
  PanelLeft,
  Settings,
  User,
  LogOut,
  Building2,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QualyxLogo } from "@/components/QualyxLogo";
import { useTheme } from "@/contexts/ThemeContext";

interface ConsoleTopNavProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const environments = ["Production", "Staging", "Development", "Local"];
const projects = ["QUALYX Platform", "Mobile App", "API Services", "Dashboard"];
const orgs = ["Cropxon Innovations", "Demo Org"];

export const ConsoleTopNav = ({ onToggleSidebar, sidebarCollapsed }: ConsoleTopNavProps) => {
  const [selectedEnv, setSelectedEnv] = useState("Development");
  const [selectedProject, setSelectedProject] = useState("QUALYX Platform");
  const [selectedOrg, setSelectedOrg] = useState("Cropxon Innovations");
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-background/95 backdrop-blur-xl border-b border-border/40">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8"
          >
            {sidebarCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </Button>

          <Link to="/console" className="flex items-center gap-2">
            <QualyxLogo size="small" />
            <span className="font-semibold text-foreground hidden sm:block">QUALYX</span>
            <span className="text-xs text-muted-foreground hidden sm:block">by Cropxon</span>
          </Link>

          <div className="h-6 w-px bg-border/50 hidden md:block" />

          {/* Project Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground hidden md:flex">
                <span className="max-w-[120px] truncate">{selectedProject}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {projects.map((project) => (
                <DropdownMenuItem 
                  key={project} 
                  onClick={() => setSelectedProject(project)}
                  className={selectedProject === project ? "bg-primary/10 text-primary" : ""}
                >
                  {project}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4 flex-1 justify-center max-w-xl">
          {/* Environment Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className={`gap-2 ${
                  selectedEnv === "Production" ? "border-destructive/50 text-destructive" :
                  selectedEnv === "Staging" ? "border-warning/50 text-warning" :
                  "border-primary/50 text-primary"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  selectedEnv === "Production" ? "bg-destructive" :
                  selectedEnv === "Staging" ? "bg-warning" :
                  "bg-primary"
                }`} />
                {selectedEnv}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {environments.map((env) => (
                <DropdownMenuItem key={env} onClick={() => setSelectedEnv(env)}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    env === "Production" ? "bg-destructive" :
                    env === "Staging" ? "bg-warning" :
                    env === "Development" ? "bg-primary" :
                    "bg-muted-foreground"
                  }`} />
                  {env}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search */}
          <div className="relative hidden md:block flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search tests, suites, runs..." 
              className="pl-9 h-9 bg-muted/30 border-border/40"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="h-8 w-8 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          {/* Help */}
          <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* Org Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 hidden lg:flex">
                <Building2 className="w-4 h-4" />
                <span className="max-w-[100px] truncate">{selectedOrg}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Organizations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {orgs.map((org) => (
                <DropdownMenuItem 
                  key={org} 
                  onClick={() => setSelectedOrg(org)}
                  className={selectedOrg === org ? "bg-primary/10 text-primary" : ""}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  {org}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-primary/20">
                <span className="text-xs font-medium text-primary">JD</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                <div>John Doe</div>
                <div className="text-xs text-muted-foreground font-normal">john@cropxon.com</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

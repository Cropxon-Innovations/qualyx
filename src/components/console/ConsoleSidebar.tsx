import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  ChevronRight,
  Compass,
  Route,
  Map,
  Sparkles,
  PlusCircle,
  Circle,
  Code2,
  FileCode,
  Import,
  FolderKanban,
  Layers,
  Database,
  Globe,
  Tags,
  GitBranch,
  Play,
  Server,
  Cloud,
  Laptop,
  Calendar,
  GitMerge,
  BarChart3,
  Video,
  Terminal,
  Camera,
  FileText,
  TrendingUp,
  Activity,
  Shield,
  Users,
  Key,
  Bot,
  ScrollText,
  Lock
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: string;
  children?: NavItem[];
}

const navigation: { section: string; items: NavItem[] }[] = [
  {
    section: "Discover",
    items: [
      { label: "User Journeys", href: "/console/discover/journeys", icon: Route },
      { label: "Coverage Map", href: "/console/discover/coverage", icon: Map },
      { label: "Suggestions", href: "/console/discover/suggestions", icon: Sparkles, badge: "AI" },
    ]
  },
  {
    section: "Create",
    items: [
      { label: "Record UI Test", href: "/console/create/record", icon: Circle },
      { label: "Create API Test", href: "/console/create/api", icon: Code2 },
      { label: "Suites Builder", href: "/console/create/suites", icon: FileCode },
      { label: "Import Scripts", href: "/console/create/import", icon: Import },
    ]
  },
  {
    section: "Organize",
    items: [
      { label: "Projects", href: "/console/organize/projects", icon: FolderKanban },
      { label: "Suites", href: "/console/organize/suites", icon: Layers },
      { label: "Test Data", href: "/console/organize/data", icon: Database },
      { label: "Environments", href: "/console/organize/environments", icon: Globe },
      { label: "Tags", href: "/console/organize/tags", icon: Tags },
      { label: "Versions", href: "/console/organize/versions", icon: GitBranch },
    ]
  },
  {
    section: "Execute",
    items: [
      { label: "Run Center", href: "/console/execute/runs", icon: Play },
      { label: "Schedules", href: "/console/execute/schedules", icon: Calendar },
      { label: "Runners", href: "/console/execute/runners", icon: Server },
      { label: "CI/CD Triggers", href: "/console/execute/cicd", icon: GitMerge },
    ]
  },
  {
    section: "Analyze",
    items: [
      { label: "Session Replay", href: "/console/analyze/replay", icon: Video },
      { label: "Logs", href: "/console/analyze/logs", icon: Terminal },
      { label: "Screenshots", href: "/console/analyze/screenshots", icon: Camera },
      { label: "Reports", href: "/console/analyze/reports", icon: FileText },
      { label: "Flakiness", href: "/console/analyze/flakiness", icon: TrendingUp },
      { label: "Trends", href: "/console/analyze/trends", icon: BarChart3 },
    ]
  },
  {
    section: "Govern",
    items: [
      { label: "Access Control", href: "/console/govern/access", icon: Users },
      { label: "Secrets Vault", href: "/console/govern/secrets", icon: Key },
      { label: "LLM Settings", href: "/console/govern/llm", icon: Bot },
      { label: "Audit Logs", href: "/console/govern/audit", icon: ScrollText },
      { label: "Security", href: "/console/govern/security", icon: Lock },
    ]
  },
];

interface SidebarSectionProps {
  section: string;
  items: NavItem[];
  collapsed: boolean;
}

const SidebarSection = ({ section, items, collapsed }: SidebarSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isActive = (href?: string) => href && location.pathname === href;
  const hasActiveChild = items.some(item => isActive(item.href));

  return (
    <div className="mb-1">
      {!collapsed && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 hover:text-muted-foreground transition-colors"
        >
          <span>{section}</span>
          {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </button>
      )}
      
      {(isOpen || collapsed) && (
        <div className="space-y-0.5">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.href || "#"}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                isActive(item.href)
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/20 text-primary">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface ConsoleSidebarProps {
  collapsed: boolean;
}

export const ConsoleSidebar = ({ collapsed }: ConsoleSidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-14 bottom-0 z-40 bg-card/50 backdrop-blur-xl border-r border-border/40 transition-all duration-300 overflow-y-auto",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="py-4 px-2">
        {navigation.map((nav) => (
          <SidebarSection
            key={nav.section}
            section={nav.section}
            items={nav.items}
            collapsed={collapsed}
          />
        ))}
      </div>
    </aside>
  );
};

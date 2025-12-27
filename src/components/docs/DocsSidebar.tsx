import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  ChevronRight,
  BookOpen,
  Server,
  Code,
  FileCode,
  GitBranch,
  MonitorPlay,
  Code2,
  History,
  Wand2,
  Cpu,
  Cloud,
  Shield,
  Plug,
  Layers,
  FileText,
  Users,
  Map,
  ClipboardList,
  Building2,
  Briefcase,
  Mail,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const docsNavigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/getting-started", icon: BookOpen },
      { title: "Hybrid Runner Setup", href: "/docs/hybrid-runner", icon: Server },
      { title: "SDK Guide", href: "/docs/sdk-guide", icon: Code },
      { title: "Export Scripts", href: "/docs/export-scripts", icon: FileCode },
      { title: "CI/CD Integration", href: "/docs/cicd", icon: GitBranch },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "UI Automation", href: "/product/ui-automation", icon: MonitorPlay },
      { title: "API Automation", href: "/product/api-automation", icon: Code2 },
      { title: "Session Replay", href: "/product/session-replay", icon: History },
      { title: "Auto-Healing", href: "/product/auto-healing", icon: Wand2 },
      { title: "AI Test Engine", href: "/product/ai-test-engine", icon: Cpu },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Hybrid Execution", href: "/platform/hybrid-execution", icon: Cloud },
      { title: "Security & Compliance", href: "/platform/security", icon: Shield },
      { title: "Integrations", href: "/platform/integrations", icon: Plug },
      { title: "Architecture", href: "/platform/architecture", icon: Layers },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "/resources/blog", icon: FileText },
      { title: "Case Studies", href: "/resources/case-studies", icon: Users },
      { title: "Roadmap", href: "/resources/roadmap", icon: Map },
      { title: "Changelog", href: "/resources/changelog", icon: ClipboardList },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/company/about", icon: Building2 },
      { title: "Careers", href: "/company/careers", icon: Briefcase },
      { title: "Contact", href: "/company/contact", icon: Mail },
    ],
  },
];

const NavGroupComponent = ({ group }: { group: NavGroup }) => {
  const location = useLocation();
  const isGroupActive = group.items.some(item => location.pathname === item.href);
  const [isOpen, setIsOpen] = useState(isGroupActive);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted/50 rounded-lg transition-colors"
      >
        <span>{group.title}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      {isOpen && (
        <div className="mt-1 ml-2 space-y-0.5">
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary border-l-2 border-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const DocsSidebar = () => {
  return (
    <aside className="w-64 min-h-screen border-r border-border bg-card/30 backdrop-blur-sm sticky top-16 overflow-y-auto">
      <div className="p-4">
        {/* Back to home */}
        <NavLink
          to="/"
          className="flex items-center gap-2 px-3 py-2 mb-4 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </NavLink>
        
        <div className="h-px bg-border mb-4" />
        
        {/* Navigation groups */}
        {docsNavigation.map((group) => (
          <NavGroupComponent key={group.title} group={group} />
        ))}
      </div>
    </aside>
  );
};

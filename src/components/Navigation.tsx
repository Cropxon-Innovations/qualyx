import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown,
  MousePointerClick,
  Globe,
  Video,
  Sparkles,
  Brain,
  BarChart3,
  FileCode,
  Cloud,
  Server,
  Shield,
  Eye,
  Plug,
  Boxes,
  BookOpen,
  Mic2,
  Terminal,
  Download,
  GitBranch,
  HelpCircle,
  Newspaper,
  Briefcase,
  MapPin,
  History,
  FileText,
  Users,
  Handshake,
  Mail,
  Building2,
  LucideIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { QualyxLogo } from "./QualyxLogo";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface NavItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const productItems: NavItem[] = [
  { title: "UI Automation", description: "Record and playback user interactions", href: "/product/ui-automation", icon: MousePointerClick },
  { title: "API Automation", description: "Test REST and GraphQL endpoints", href: "/product/api-automation", icon: Globe },
  { title: "Session Replay", description: "Time-travel debugging for tests", href: "/product/session-replay", icon: Video },
  { title: "Auto-Healing", description: "Self-repairing test selectors", href: "/product/auto-healing", icon: Sparkles },
  { title: "AI Test Engine", description: "Intelligent test generation", href: "/product/ai-test-engine", icon: Brain },
  { title: "Reports", description: "Comprehensive test analytics", href: "/product/reports", icon: BarChart3 },
  { title: "Exportable Code", description: "Playwright & Selenium export", href: "/product/exportable-code", icon: FileCode },
];

const platformItems: NavItem[] = [
  { title: "Hybrid Execution", description: "Cloud + on-prem flexibility", href: "/platform/hybrid-execution", icon: Cloud },
  { title: "Runners & Orchestration", description: "Distributed test execution", href: "/platform/runners", icon: Server },
  { title: "Security & Compliance", description: "Enterprise-grade protection", href: "/platform/security", icon: Shield },
  { title: "Observability", description: "Real-time monitoring & insights", href: "/platform/observability", icon: Eye },
  { title: "Integrations", description: "CI/CD and tool connections", href: "/platform/integrations", icon: Plug },
  { title: "Architecture", description: "System design overview", href: "/platform/architecture", icon: Boxes },
];

const docsItems: NavItem[] = [
  { title: "Getting Started", description: "Quick setup guide", href: "/docs/getting-started", icon: BookOpen },
  { title: "Recorder Guide", description: "Master the popup recorder", href: "/docs/recorder-guide", icon: Mic2 },
  { title: "Hybrid Runner Setup", description: "On-premise installation", href: "/docs/hybrid-runner", icon: Server },
  { title: "SDK & CLI", description: "Developer documentation", href: "/docs/sdk", icon: Terminal },
  { title: "Export Scripts", description: "Playwright & Selenium export", href: "/docs/export-scripts", icon: Download },
  { title: "CI/CD Integration", description: "Pipeline configuration", href: "/docs/cicd", icon: GitBranch },
  { title: "Troubleshooting", description: "Common issues & solutions", href: "/docs/troubleshooting", icon: HelpCircle },
];

const resourceItems: NavItem[] = [
  { title: "Blog", description: "Latest updates and insights", href: "/resources/blog", icon: Newspaper },
  { title: "Case Studies", description: "Customer success stories", href: "/resources/case-studies", icon: Briefcase },
  { title: "Roadmap", description: "Upcoming features", href: "/resources/roadmap", icon: MapPin },
  { title: "Changelog", description: "Version history", href: "/resources/changelog", icon: History },
  { title: "Release Notes", description: "Detailed release information", href: "/resources/release-notes", icon: FileText },
];

const companyItems: NavItem[] = [
  { title: "About", description: "Our mission and team", href: "/company/about", icon: Building2 },
  { title: "Careers", description: "Join our team", href: "/company/careers", icon: Users },
  { title: "Partners", description: "Partner ecosystem", href: "/company/partners", icon: Handshake },
  { title: "Contact", description: "Get in touch", href: "/company/contact", icon: Mail },
];

const NavDropdown = ({ 
  trigger, 
  items,
  triggerIcon: TriggerIcon
}: { 
  trigger: string; 
  items: NavItem[];
  triggerIcon?: LucideIcon;
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-auto py-2 px-3 text-sm">
      {TriggerIcon && <TriggerIcon className="w-4 h-4 mr-1.5" />}
      {trigger}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-popover border border-border rounded-xl shadow-xl z-50">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex items-start gap-3 select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent focus:bg-accent group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium leading-none text-foreground group-hover:text-foreground transition-colors">
                      {item.title}
                    </div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          );
        })}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5">
              <QualyxLogo size="small" />
              <div className="flex flex-col">
                <span className="text-foreground font-semibold text-lg tracking-tight leading-tight">QUALYX</span>
                <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">BY CROPXON</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                <NavDropdown trigger="Product" items={productItems} />
                <NavDropdown trigger="Platform" items={platformItems} />
                <NavDropdown trigger="Docs" items={docsItems} />
                <NavDropdown trigger="Resources" items={resourceItems} />
                <NavDropdown trigger="Company" items={companyItems} />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher />
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="default" size="sm">
                Join Waitlist
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-popover border-b border-border shadow-xl">
          <div className="px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
            {[
              { label: "Product", items: productItems },
              { label: "Platform", items: platformItems },
              { label: "Docs", items: docsItems },
              { label: "Resources", items: resourceItems },
              { label: "Company", items: companyItems },
            ].map((section) => (
              <details key={section.label} className="group">
                <summary className="flex items-center justify-between py-2 text-foreground font-medium cursor-pointer list-none">
                  {section.label}
                  <ChevronDown className="h-4 w-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-2 pt-2 space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        to={item.href}
                        className="flex items-center gap-3 py-2 px-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </details>
            ))}
            <div className="pt-4 flex flex-col gap-2 border-t border-border">
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

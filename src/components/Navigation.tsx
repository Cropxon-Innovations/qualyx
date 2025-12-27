import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
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

const productItems = [
  { title: "UI Automation", description: "Record and playback user interactions", href: "/product/ui-automation" },
  { title: "API Automation", description: "Test REST and GraphQL endpoints", href: "/product/api-automation" },
  { title: "Session Replay", description: "Time-travel debugging for tests", href: "/product/session-replay" },
  { title: "Auto-Healing", description: "Self-repairing test selectors", href: "/product/auto-healing" },
  { title: "AI Test Engine", description: "Intelligent test generation", href: "/product/ai-test-engine" },
  { title: "Reports", description: "Comprehensive test analytics", href: "/product/reports" },
  { title: "Exportable Code", description: "Playwright & Selenium export", href: "/product/exportable-code" },
];

const platformItems = [
  { title: "Hybrid Execution", description: "Cloud + on-prem flexibility", href: "/platform/hybrid-execution" },
  { title: "Runners & Orchestration", description: "Distributed test execution", href: "/platform/runners" },
  { title: "Security & Compliance", description: "Enterprise-grade protection", href: "/platform/security" },
  { title: "Observability", description: "Real-time monitoring & insights", href: "/platform/observability" },
  { title: "Integrations", description: "CI/CD and tool connections", href: "/platform/integrations" },
  { title: "Architecture", description: "System design overview", href: "/platform/architecture" },
];

const docsItems = [
  { title: "Getting Started", description: "Quick setup guide", href: "/docs/getting-started" },
  { title: "Recorder Guide", description: "Master the popup recorder", href: "/docs/recorder-guide" },
  { title: "Hybrid Runner Setup", description: "On-premise installation", href: "/docs/hybrid-runner" },
  { title: "SDK & CLI", description: "Developer documentation", href: "/docs/sdk" },
  { title: "Export Scripts", description: "Playwright & Selenium export", href: "/docs/export-scripts" },
  { title: "CI/CD Integration", description: "Pipeline configuration", href: "/docs/cicd" },
  { title: "Troubleshooting", description: "Common issues & solutions", href: "/docs/troubleshooting" },
];

const resourceItems = [
  { title: "Blog", description: "Latest updates and insights", href: "/resources/blog" },
  { title: "Case Studies", description: "Customer success stories", href: "/resources/case-studies" },
  { title: "Roadmap", description: "Upcoming features", href: "/resources/roadmap" },
  { title: "Changelog", description: "Version history", href: "/resources/changelog" },
  { title: "Release Notes", description: "Detailed release information", href: "/resources/release-notes" },
];

const companyItems = [
  { title: "About", description: "Our mission and team", href: "/company/about" },
  { title: "Careers", description: "Join our team", href: "/company/careers" },
  { title: "Partners", description: "Partner ecosystem", href: "/company/partners" },
  { title: "Contact", description: "Get in touch", href: "/company/contact" },
];

const NavDropdown = ({ 
  trigger, 
  items 
}: { 
  trigger: string; 
  items: { title: string; description: string; href: string }[] 
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-auto py-2 px-3 text-sm">
      {trigger}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-card/95 backdrop-blur-xl border border-border/40 rounded-xl shadow-[0_10px_40px_hsl(0,0%,0%,0.3)]">
        {items.map((item) => (
          <li key={item.title}>
            <NavigationMenuLink asChild>
              <Link
                to={item.href}
                className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-muted/50 focus:bg-muted/50 group"
              >
                <div className="text-sm font-medium leading-none text-foreground/90 group-hover:text-foreground transition-colors">
                  {item.title}
                </div>
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground/70 mt-1.5">
                  {item.description}
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5">
              <QualyxLogo size="small" />
              <span className="text-foreground font-semibold text-lg tracking-tight">QUALYX</span>
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

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher compact />
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Login
            </Button>
            <Button variant="default" size="sm">
              Join Waitlist
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
        <div className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border/30">
          <div className="px-4 py-4 space-y-3">
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
                <div className="pl-4 pt-2 space-y-2">
                  {section.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </details>
            ))}
            <div className="pt-4 flex flex-col gap-2 border-t border-border/30">
              <Button variant="outline" className="w-full">
                Login
              </Button>
              <Button variant="default" className="w-full">
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

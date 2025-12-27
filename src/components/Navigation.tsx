import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const productItems = [
  { title: "UI Automation", description: "Record and playback user interactions" },
  { title: "API Automation", description: "Test REST and GraphQL endpoints" },
  { title: "Session Replay", description: "Time-travel debugging for tests" },
  { title: "Auto-Healing", description: "Self-repairing test selectors" },
  { title: "AI Test Engine", description: "Intelligent test generation" },
];

const platformItems = [
  { title: "Hybrid Execution", description: "Cloud + on-prem flexibility" },
  { title: "Security & Compliance", description: "Enterprise-grade protection" },
  { title: "Integrations", description: "CI/CD and tool connections" },
  { title: "Architecture", description: "System design overview" },
];

const docsItems = [
  { title: "Getting Started", description: "Quick setup guide" },
  { title: "Hybrid Runner Setup", description: "On-premise installation" },
  { title: "SDK Guide", description: "Developer documentation" },
  { title: "Export Scripts", description: "Playwright & Selenium export" },
  { title: "CI/CD Integration", description: "Pipeline configuration" },
];

const resourceItems = [
  { title: "Blog", description: "Latest updates and insights" },
  { title: "Case Studies", description: "Customer success stories" },
  { title: "Roadmap", description: "Upcoming features" },
  { title: "Changelog", description: "Release history" },
];

const companyItems = [
  { title: "About", description: "Our mission and team" },
  { title: "Careers", description: "Join our team" },
  { title: "Contact", description: "Get in touch" },
];

const NavDropdown = ({ 
  trigger, 
  items 
}: { 
  trigger: string; 
  items: { title: string; description: string }[] 
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground data-[state=open]:text-foreground h-auto py-2 px-3">
      {trigger}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="grid w-[400px] gap-1 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-card/95 backdrop-blur-xl border border-border rounded-xl">
        {items.map((item) => (
          <li key={item.title}>
            <NavigationMenuLink asChild>
              <a
                href="#"
                className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted/50 focus:bg-muted/50 group"
              >
                <div className="text-sm font-medium leading-none text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </div>
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5">
                  {item.description}
                </p>
              </a>
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">Q</span>
              </div>
              <span className="text-foreground font-semibold text-lg tracking-tight">QUALYX</span>
            </a>
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
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm">
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
        <div className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border">
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
                    <a
                      key={item.title}
                      href="#"
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </details>
            ))}
            <div className="pt-4 flex flex-col gap-2 border-t border-border">
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

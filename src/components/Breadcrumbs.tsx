import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema } from "@/components/SEOHead";
import { Helmet } from "react-helmet";

interface BreadcrumbItem {
  name: string;
  url: string;
}

// Route to breadcrumb mapping
const routeConfig: Record<string, { category: string; name: string }> = {
  // Product
  "/product/ui-automation": { category: "Product", name: "UI Automation" },
  "/product/api-automation": { category: "Product", name: "API Automation" },
  "/product/session-replay": { category: "Product", name: "Session Replay" },
  "/product/auto-healing": { category: "Product", name: "Auto-Healing" },
  "/product/ai-test-engine": { category: "Product", name: "AI Test Engine" },
  "/product/reports": { category: "Product", name: "Reports" },
  "/product/exportable-code": { category: "Product", name: "Exportable Code" },
  
  // Platform
  "/platform/hybrid-execution": { category: "Platform", name: "Hybrid Execution" },
  "/platform/security": { category: "Platform", name: "Security" },
  "/platform/integrations": { category: "Platform", name: "Integrations" },
  "/platform/architecture": { category: "Platform", name: "Architecture" },
  "/platform/runners": { category: "Platform", name: "Runners" },
  "/platform/observability": { category: "Platform", name: "Observability" },
  
  // Docs
  "/docs/getting-started": { category: "Docs", name: "Getting Started" },
  "/docs/hybrid-runner": { category: "Docs", name: "Hybrid Runner" },
  "/docs/sdk": { category: "Docs", name: "SDK Guide" },
  "/docs/sdk-guide": { category: "Docs", name: "SDK Guide" },
  "/docs/export-scripts": { category: "Docs", name: "Export Scripts" },
  "/docs/cicd": { category: "Docs", name: "CI/CD" },
  "/docs/recorder-guide": { category: "Docs", name: "Recorder Guide" },
  "/docs/troubleshooting": { category: "Docs", name: "Troubleshooting" },
  
  // Resources
  "/resources/blog": { category: "Resources", name: "Blog" },
  "/resources/case-studies": { category: "Resources", name: "Case Studies" },
  "/resources/roadmap": { category: "Resources", name: "Roadmap" },
  "/resources/changelog": { category: "Resources", name: "Changelog" },
  "/resources/release-notes": { category: "Resources", name: "Release Notes" },
  
  // Company
  "/company/about": { category: "Company", name: "About" },
  "/company/careers": { category: "Company", name: "Careers" },
  "/company/contact": { category: "Company", name: "Contact" },
  "/company/partners": { category: "Company", name: "Partners" },
  
  // Legal
  "/privacy": { category: "Legal", name: "Privacy Policy" },
  "/terms": { category: "Legal", name: "Terms of Service" },
  "/refund-policy": { category: "Legal", name: "Refund Policy" },
  "/cookie-policy": { category: "Legal", name: "Cookie Policy" },
  "/data-policy": { category: "Legal", name: "Data Policy" },
  
  // Auth
  "/auth": { category: "", name: "Join Waitlist" },
  "/login": { category: "", name: "Login" },
  "/signup": { category: "", name: "Sign Up" },
  "/demo": { category: "", name: "Demo" },
};

const categoryPaths: Record<string, string> = {
  "Product": "/product/ui-automation",
  "Platform": "/platform/hybrid-execution",
  "Docs": "/docs/getting-started",
  "Resources": "/resources/blog",
  "Company": "/company/about",
  "Legal": "/privacy",
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;
  
  // Skip breadcrumbs for home page
  if (pathname === "/") {
    return null;
  }
  
  const config = routeConfig[pathname];
  
  if (!config) {
    // Handle blog article pages
    if (pathname.startsWith("/blog/")) {
      const items: BreadcrumbItem[] = [
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources/blog" },
        { name: "Blog", url: "/resources/blog" },
        { name: "Article", url: pathname },
      ];
      
      return (
        <>
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify(generateBreadcrumbSchema(items))}
            </script>
          </Helmet>
          <BreadcrumbNav items={items} />
        </>
      );
    }
    return null;
  }
  
  const items: BreadcrumbItem[] = [{ name: "Home", url: "/" }];
  
  if (config.category) {
    items.push({ 
      name: config.category, 
      url: categoryPaths[config.category] || "/" 
    });
  }
  
  items.push({ name: config.name, url: pathname });
  
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbSchema(items))}
        </script>
      </Helmet>
      <BreadcrumbNav items={items} />
    </>
  );
};

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center gap-2 text-sm text-muted-foreground py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;
        
        return (
          <div key={item.url} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            )}
            {isLast ? (
              <span className="text-foreground font-medium truncate max-w-[200px] flex items-center gap-1.5">
                {item.name}
              </span>
            ) : (
              <Link 
                to={item.url}
                className="hover:text-primary transition-colors flex items-center gap-1.5"
              >
                {isFirst && <Home className="w-4 h-4" />}
                <span className={`truncate max-w-[150px] ${isFirst ? 'sr-only sm:not-sr-only' : ''}`}>
                  {isFirst ? 'Home' : item.name}
                </span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

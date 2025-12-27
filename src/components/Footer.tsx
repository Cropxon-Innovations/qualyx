import { Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { QualyxLogo } from "./QualyxLogo";

const footerLinks = {
  Product: [
    { label: "UI Automation", href: "/product/ui-automation" },
    { label: "API Automation", href: "/product/api-automation" },
    { label: "Session Replay", href: "/product/session-replay" },
    { label: "Auto-Healing", href: "/product/auto-healing" },
    { label: "AI Test Engine", href: "/product/ai-test-engine" },
  ],
  Platform: [
    { label: "Hybrid Execution", href: "/platform/hybrid-execution" },
    { label: "Security", href: "/platform/security" },
    { label: "Integrations", href: "/platform/integrations" },
    { label: "Architecture", href: "/platform/architecture" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs/getting-started" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Changelog", href: "/resources/changelog" },
    { label: "Roadmap", href: "/resources/roadmap" },
  ],
  Company: [
    { label: "About", href: "/company/about" },
    { label: "Careers", href: "/company/careers" },
    { label: "Contact", href: "/company/contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <QualyxLogo size="small" />
              <span className="text-foreground font-semibold text-lg tracking-tight">QUALYX</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Autonomous QA-as-a-Service. AI-powered testing for modern engineering teams.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QUALYX by Cropxon Innovations Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

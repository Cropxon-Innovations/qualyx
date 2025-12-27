import { ReactNode, useState } from "react";
import { ChevronRight, Clock, Edit3, Copy, Check, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface DocPageProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  lastUpdated?: string;
  children: ReactNode;
}

export const DocPage = ({ title, description, breadcrumbs, lastUpdated, children }: DocPageProps) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {crumb.href ? (
              <Link to={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        
        {lastUpdated && (
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
            <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Edit3 className="w-4 h-4" />
              <span>Edit this page</span>
            </button>
          </div>
        )}
      </header>

      {/* Content */}
      <article className="prose prose-invert prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-card prose-pre:border prose-pre:border-border max-w-none">
        {children}
      </article>
    </div>
  );
};

// Reusable doc components
export const DocSection = ({ title, children, id }: { title?: string; children: ReactNode; id?: string }) => (
  <section className="mb-12" id={id}>
    {title && <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>}
    {children}
  </section>
);

// Enhanced code block with copy functionality
export const DocCode = ({ children, language = "bash", filename }: { children: string; language?: string; filename?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-border">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
          <span className="text-xs text-muted-foreground font-mono">{filename}</span>
          <span className="text-xs text-muted-foreground/60 uppercase">{language}</span>
        </div>
      )}
      <pre className="p-4 bg-card overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{children}</code>
      </pre>
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
      >
        {copied ? (
          <Check className="w-4 h-4 text-success" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
};

// Mintlify-style card
export const DocCard = ({ title, description, icon: Icon, href }: { 
  title: string; 
  description: string; 
  icon: LucideIcon;
  href: string;
}) => (
  <Link 
    to={href}
    className="block p-6 rounded-xl border border-border bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 group"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Link>
);

// Mintlify-style callout
export const DocCallout = ({ type = "info", title, children }: { 
  type?: "info" | "warning" | "success" | "error" | "note";
  title?: string;
  children: ReactNode;
}) => {
  const styles = {
    info: { border: "border-primary/30", bg: "bg-primary/5", icon: "💡", iconColor: "text-primary" },
    warning: { border: "border-yellow-500/30", bg: "bg-yellow-500/5", icon: "⚠️", iconColor: "text-yellow-500" },
    success: { border: "border-success/30", bg: "bg-success/5", icon: "✅", iconColor: "text-success" },
    error: { border: "border-destructive/30", bg: "bg-destructive/5", icon: "❌", iconColor: "text-destructive" },
    note: { border: "border-muted-foreground/30", bg: "bg-muted/20", icon: "📝", iconColor: "text-muted-foreground" },
  };

  const style = styles[type];

  return (
    <div className={`flex gap-4 p-4 rounded-xl border ${style.border} ${style.bg} my-6`}>
      <span className="text-xl">{style.icon}</span>
      <div className="flex-1">
        {title && <h4 className="font-semibold text-foreground mb-1">{title}</h4>}
        <div className="text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
};

// Step component for guides
export const DocStep = ({ number, title, children }: { number: number; title: string; children: ReactNode }) => (
  <div className="flex gap-4 mb-8 relative">
    <div className="flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
        {number}
      </div>
      <div className="absolute left-4 top-10 bottom-0 w-px bg-border -translate-x-1/2" />
    </div>
    <div className="flex-1 pt-0.5 pb-6">
      <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
      <div className="text-muted-foreground space-y-4">{children}</div>
    </div>
  </div>
);

// Accordion for FAQ/expandable sections
export const DocAccordion = ({ title, children, defaultOpen = false }: { 
  title: string; 
  children: ReactNode; 
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden my-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card/50 hover:bg-card/80 transition-colors text-left"
      >
        <span className="font-medium text-foreground">{title}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-4 py-4 border-t border-border bg-card/20">
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      )}
    </div>
  );
};

// Tab component
export const DocTabs = ({ tabs }: { tabs: { label: string; content: ReactNode }[] }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="my-6">
      <div className="flex border-b border-border">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative ${
              activeTab === index 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

// API Reference table
export const DocApiTable = ({ rows }: { rows: { param: string; type: string; description: string; required?: boolean }[] }) => (
  <div className="overflow-x-auto my-6">
    <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-muted/50 border-b border-border">
          <th className="text-left py-3 px-4 text-foreground font-semibold">Parameter</th>
          <th className="text-left py-3 px-4 text-foreground font-semibold">Type</th>
          <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
        </tr>
      </thead>
      <tbody className="text-muted-foreground">
        {rows.map((row) => (
          <tr key={row.param} className="border-b border-border/50 last:border-0">
            <td className="py-3 px-4">
              <code className="text-primary font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{row.param}</code>
              {row.required && <span className="ml-2 text-destructive text-xs">required</span>}
            </td>
            <td className="py-3 px-4 font-mono text-xs">{row.type}</td>
            <td className="py-3 px-4">{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Quick link
export const DocQuickLink = ({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) => (
  external ? (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-primary hover:underline"
    >
      {children}
      <ExternalLink className="w-3 h-3" />
    </a>
  ) : (
    <Link to={href} className="text-primary hover:underline">
      {children}
    </Link>
  )
);

// Feature grid for overview pages
export const DocFeatureGrid = ({ features }: { features: { icon: LucideIcon; title: string; description: string }[] }) => (
  <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
    {features.map((feature) => (
      <div key={feature.title} className="p-4 rounded-xl border border-border bg-card/30">
        <feature.icon className="w-8 h-8 text-primary mb-3" />
        <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
    ))}
  </div>
);

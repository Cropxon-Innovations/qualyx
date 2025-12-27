import { ReactNode } from "react";
import { ChevronRight, Clock, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";

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
export const DocSection = ({ title, children }: { title?: string; children: ReactNode }) => (
  <section className="mb-12">
    {title && <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>}
    {children}
  </section>
);

export const DocCode = ({ children, language = "bash" }: { children: string; language?: string }) => (
  <div className="relative group">
    <pre className="p-4 rounded-xl bg-card border border-border overflow-x-auto">
      <code className="text-sm font-mono text-foreground">{children}</code>
    </pre>
    <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-muted/50 opacity-0 group-hover:opacity-100 transition-opacity">
      <Edit3 className="w-4 h-4 text-muted-foreground" />
    </button>
  </div>
);

export const DocCard = ({ title, description, icon: Icon, href }: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}) => (
  <Link 
    to={href}
    className="block p-6 rounded-xl border border-border bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 group"
  >
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Link>
);

export const DocCallout = ({ type = "info", title, children }: { 
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  children: ReactNode;
}) => {
  const styles = {
    info: "border-primary/30 bg-primary/5",
    warning: "border-yellow-500/30 bg-yellow-500/5",
    success: "border-success/30 bg-success/5",
    error: "border-destructive/30 bg-destructive/5",
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[type]} my-6`}>
      {title && <h4 className="font-semibold text-foreground mb-2">{title}</h4>}
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
};

export const DocStep = ({ number, title, children }: { number: number; title: string; children: ReactNode }) => (
  <div className="flex gap-4 mb-8">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
      {number}
    </div>
    <div className="flex-1 pt-0.5">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  </div>
);

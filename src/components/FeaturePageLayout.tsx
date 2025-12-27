import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface FeaturePageLayoutProps {
  children: ReactNode;
}

export const FeaturePageLayout = ({ children }: FeaturePageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

interface FeatureHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
}

export const FeatureHero = ({
  badge,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  children,
}: FeatureHeroProps) => {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">{badge}</span>
              </div>
            )}
            
            <p className="text-sm font-semibold text-primary mb-3 uppercase tracking-widest animate-fade-in">
              {subtitle}
            </p>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in delay-100">
              <span className="gradient-text-white">{title}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in delay-200">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in delay-300">
              {primaryCta && (
                <Link to={primaryCta.href}>
                  <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCta.href}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Hero visual */}
          <div className="relative animate-fade-in delay-200">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export const FeatureCard = ({ icon: Icon, title, description, href }: FeatureCardProps) => {
  const content = (
    <div className="group relative p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm hover:border-primary/40 hover:bg-card/50 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      {href && (
        <ChevronRight className="absolute top-6 right-6 w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      )}
    </div>
  );

  return href ? <Link to={href}>{content}</Link> : content;
};

interface FeatureSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const FeatureSection = ({ title, description, children, className = "" }: FeatureSectionProps) => {
  return (
    <section className={`py-20 lg:py-28 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text-white">{title}</span>
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

interface LivePreviewProps {
  title: string;
  children: ReactNode;
}

export const LivePreview = ({ title, children }: LivePreviewProps) => {
  return (
    <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-card/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full bg-warning/70" />
          <div className="w-3 h-3 rounded-full bg-success/70" />
        </div>
        <div className="flex-1 mx-4 h-6 rounded-lg bg-muted/30 flex items-center px-3">
          <span className="text-xs text-muted-foreground font-mono">{title}</span>
        </div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};

interface StatCardProps {
  value: string;
  label: string;
  trend?: string;
}

export const StatCard = ({ value, label, trend }: StatCardProps) => {
  return (
    <div className="text-center p-6 rounded-xl border border-border/40 bg-card/20">
      <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{value}</div>
      <div className="text-sm text-muted-foreground mb-1">{label}</div>
      {trend && <div className="text-xs text-success font-medium">{trend}</div>}
    </div>
  );
};

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export const Testimonial = ({ quote, author, role, company }: TestimonialProps) => {
  return (
    <div className="p-8 rounded-2xl border border-border/40 bg-card/30">
      <blockquote className="text-lg text-foreground/90 leading-relaxed mb-6">"{quote}"</blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-muted-foreground">{role} at {company}</div>
        </div>
      </div>
    </div>
  );
};

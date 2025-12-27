import { Sparkles } from "lucide-react";

export const PricingSection = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 grid-bg-subtle opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-white">Simple Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, scale as you grow
          </p>
        </div>

        {/* Pricing card */}
        <div className="glass-card-glow p-10 md:p-12 rounded-3xl max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Early Access</span>
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Free for early startups
          </h3>
          
          <p className="text-muted-foreground mb-8">
            Get started with QUALYX at no cost during our early access program. 
            Enterprise plans with advanced features coming soon.
          </p>
          
          <div className="space-y-3 text-left mb-8">
            {[
              "Full platform access",
              "Up to 1,000 test runs/month",
              "Community support",
              "Basic integrations",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Enterprise plans include unlimited runs, SSO, dedicated support, and SLA guarantees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

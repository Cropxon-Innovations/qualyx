import { Shield, Target, Cloud } from "lucide-react";

const trustCards = [
  {
    icon: Shield,
    title: "Security-first",
    description: "Enterprise-grade encryption, SOC 2 compliance readiness, and zero-trust architecture. Your sensitive data never leaves your network.",
    features: ["End-to-end encryption", "RBAC & audit logging", "On-premise execution"],
  },
  {
    icon: Target,
    title: "Deterministic results",
    description: "Reproducible test outcomes with version-controlled environments. No flaky tests, no random failures — just reliable automation.",
    features: ["Checkpoint & resume", "Environment snapshots", "Consistent execution"],
  },
  {
    icon: Cloud,
    title: "Cloud + Hybrid control",
    description: "Full flexibility with cloud management and on-premise runners. Control where your tests execute while maintaining central observability.",
    features: ["Cloud dashboard", "On-prem runners", "Secure sync"],
  },
];

export const TrustSection = () => {
  return (
    <section className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-white">Why Enterprises Trust QUALYX</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built for teams that demand reliability, security, and control
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group glass-card-glow p-8 rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.15)]"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {card.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

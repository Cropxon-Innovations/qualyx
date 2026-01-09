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
    <section className="py-16 md:py-20 px-4 md:px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            <span className="gradient-text-white">Why Enterprises Trust QUALYX</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Built for teams that demand reliability, security, and control
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {trustCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group glass-card-glow p-6 rounded-xl transition-all duration-500 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
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

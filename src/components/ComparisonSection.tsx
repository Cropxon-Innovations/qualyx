import { useState } from "react";
import { CheckCircle2, XCircle, Minus } from "lucide-react";

const qualyxFeatures = [
  { capability: "Architecture", value: "Cloud + Hybrid (outbound-only runner)", status: "check" },
  { capability: "Code Ownership", value: "Real Playwright (Python), export anytime", status: "check" },
  { capability: "Recorder", value: "Guided popup recorder", status: "check" },
  { capability: "Session Replay", value: "Timeline + screenshots + video", status: "check" },
  { capability: "Live Preview", value: "Near-live execution view (MVP)", status: "check" },
  { capability: "API Testing", value: "Coming (Phase 2)", status: "pending" },
  { capability: "AI Role", value: "Assistant — suggests, never rewrites silently", status: "check" },
  { capability: "Enterprise Features", value: "RBAC, SSO, audit logs (roadmap)", status: "pending" },
  { capability: "Complexity", value: "Low to start — grows gradually", status: "check" },
  { capability: "Lock-in", value: "None — code belongs to user", status: "check" },
];

const katalanFeatures = [
  { capability: "Architecture", value: "Mostly cloud, sometimes hybrid", status: "partial" },
  { capability: "Code Ownership", value: "Proprietary or Groovy/Java frameworks", status: "cross" },
  { capability: "Recorder", value: "Recorder + IDE scripting", status: "check" },
  { capability: "Session Replay", value: "Visual playback", status: "check" },
  { capability: "Live Preview", value: "Partial / delayed", status: "partial" },
  { capability: "API Testing", value: "Full studio", status: "check" },
  { capability: "AI Role", value: "Growing (auto suites + self-healing)", status: "partial" },
  { capability: "Enterprise Features", value: "RBAC, SSO, audit logs", status: "check" },
  { capability: "Complexity", value: "High — slower onboarding", status: "cross" },
  { capability: "Lock-in", value: "High — vendor dependency", status: "cross" },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "check":
      return <CheckCircle2 className="w-4 h-4 text-success/80" />;
    case "cross":
      return <XCircle className="w-4 h-4 text-destructive/60" />;
    case "partial":
      return <Minus className="w-4 h-4 text-yellow-500/60" />;
    case "pending":
      return <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />;
    default:
      return null;
  }
};

export const ComparisonSection = () => {
  const [activeTab, setActiveTab] = useState<"qualyx" | "others">("qualyx");

  const currentFeatures = activeTab === "qualyx" ? qualyxFeatures : katalanFeatures;
  const currentTitle = activeTab === "qualyx" 
    ? "QUALYX — Autonomous QA without lock-in" 
    : "Katalon & Others — powerful, but heavier and platform-locked";
  const currentCaption = activeTab === "qualyx"
    ? "Built for product teams who need speed, ownership, and flexibility."
    : "Great for large QA departments — harder for lean product teams.";

  return (
    <section className="py-28 md:py-36 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg-subtle opacity-10" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            <span className="gradient-text-white">How QUALYX Compares</span>
          </h2>
          <p className="text-base text-muted-foreground/70 max-w-xl mx-auto">
            See how QUALYX stacks up against traditional QA platforms
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-card/40 backdrop-blur-sm border border-border/30">
            <button
              onClick={() => setActiveTab("qualyx")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === "qualyx"
                  ? "bg-secondary/20 text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              QUALYX
            </button>
            <button
              onClick={() => setActiveTab("others")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === "others"
                  ? "bg-muted/50 text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Katalon & Others
            </button>
          </div>
        </div>

        {/* Comparison Card */}
        <div className="relative">
          {/* Glow border for QUALYX tab */}
          {activeTab === "qualyx" && (
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-secondary/30 via-transparent to-primary/30 opacity-60" />
          )}
          
          <div className={`relative rounded-2xl border backdrop-blur-lg overflow-hidden transition-all duration-500 ${
            activeTab === "qualyx" 
              ? "bg-card/50 border-secondary/20" 
              : "bg-card/30 border-border/30"
          }`}>
            {/* Card Header */}
            <div className="px-6 py-5 border-b border-border/20">
              <h3 className="text-lg font-semibold text-foreground">{currentTitle}</h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Capability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {activeTab === "qualyx" ? "QUALYX" : "Katalon & Others"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {currentFeatures.map((feature, index) => (
                    <tr 
                      key={feature.capability}
                      className="transition-colors hover:bg-muted/10"
                    >
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {feature.capability}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <StatusIcon status={feature.status} />
                          <span className="text-sm text-foreground/80">{feature.value}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Caption */}
            <div className="px-6 py-4 border-t border-border/20 bg-muted/5">
              <p className="text-sm text-muted-foreground/70 italic">{currentCaption}</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <CheckCircle2 className="w-3 h-3 text-success/60" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <Minus className="w-3 h-3 text-yellow-500/50" />
            <span>Partial</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <XCircle className="w-3 h-3 text-destructive/50" />
            <span>Limited</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />
            <span>Roadmap</span>
          </div>
        </div>
      </div>
    </section>
  );
};

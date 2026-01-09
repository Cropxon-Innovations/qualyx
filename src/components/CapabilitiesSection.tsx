import { 
  MonitorPlay, 
  Code2, 
  History, 
  Wand2, 
  GitBranch,
  FileCode,
  Shield,
  ClipboardList
} from "lucide-react";

const capabilities = [
  {
    icon: MonitorPlay,
    title: "UI Recorder",
    description: "Capture user interactions with intelligent event detection",
  },
  {
    icon: Code2,
    title: "API Testing",
    description: "Visual builder for REST and GraphQL endpoint validation",
  },
  {
    icon: History,
    title: "Session Replay",
    description: "Debug failures with full session recordings",
  },
  {
    icon: Wand2,
    title: "Self-Healing",
    description: "AI-powered selector repair that adapts automatically",
  },
  {
    icon: GitBranch,
    title: "CI/CD Integration",
    description: "Native plugins for GitHub, GitLab, and Jenkins",
  },
  {
    icon: FileCode,
    title: "Exportable Playwright",
    description: "Generate portable scripts in standard frameworks",
  },
  {
    icon: Shield,
    title: "RBAC",
    description: "Role-based access control for enterprise teams",
  },
  {
    icon: ClipboardList,
    title: "Audit Logs",
    description: "Comprehensive audit trails for compliance",
  },
];

export const CapabilitiesSection = () => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg-subtle opacity-10" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
            <span className="gradient-text-white">Key Capabilities</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl mx-auto">
            Enterprise-grade tools for comprehensive test automation
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="group relative p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30 transition-all duration-500 hover:border-secondary/40 hover:shadow-lg"
              >
                {/* Glow border effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-secondary/10 via-transparent to-primary/10" />
                </div>
                
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center mb-3 transition-colors duration-500 group-hover:bg-secondary/10">
                    <Icon 
                      className="w-4 h-4 text-muted-foreground/60 transition-colors duration-500 group-hover:text-secondary/80" 
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground/90 mb-1">{capability.title}</h3>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

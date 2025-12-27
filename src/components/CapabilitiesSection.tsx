import { 
  MonitorPlay, 
  Code2, 
  History, 
  Flag, 
  Wand2, 
  FileSpreadsheet,
  FileCode,
  GitBranch,
  Users
} from "lucide-react";

const capabilities = [
  {
    icon: MonitorPlay,
    title: "UI Recorder + Player",
    description: "Capture user interactions with intelligent event detection and playback",
  },
  {
    icon: Code2,
    title: "API Automation Studio",
    description: "Visual builder for REST and GraphQL endpoint testing",
  },
  {
    icon: History,
    title: "Session Replay + Time Travel",
    description: "Debug failures with full session recordings and step-by-step replay",
  },
  {
    icon: Flag,
    title: "Checkpoints + Resume",
    description: "Save and resume test state for faster iteration cycles",
  },
  {
    icon: Wand2,
    title: "Self-Healing Selectors",
    description: "AI-powered selector repair that adapts to UI changes automatically",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel → Automation Builder",
    description: "Convert spreadsheet test cases into executable automation",
  },
  {
    icon: FileCode,
    title: "Export Playwright & Selenium",
    description: "Generate portable scripts in industry-standard frameworks",
  },
  {
    icon: GitBranch,
    title: "CI/CD Integrations",
    description: "Native plugins for GitHub, GitLab, Jenkins, and more",
  },
  {
    icon: Users,
    title: "RBAC + Audit Logging",
    description: "Enterprise access control with comprehensive audit trails",
  },
];

export const CapabilitiesSection = () => {
  return (
    <section className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-white">Key Capabilities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build, run, and maintain enterprise-grade test automation
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="group glass-card p-6 rounded-xl transition-all duration-300 hover:border-primary/30 hover:bg-card/60"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{capability.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

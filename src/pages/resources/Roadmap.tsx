import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const roadmapItems = [
  {
    quarter: "Q4 2024",
    status: "completed",
    items: [
      { title: "UI Recorder & Player", status: "completed" },
      { title: "API Automation Studio", status: "completed" },
      { title: "Session Replay", status: "completed" },
      { title: "Self-Healing Selectors", status: "completed" },
    ],
  },
  {
    quarter: "Q1 2025",
    status: "in-progress",
    items: [
      { title: "AI Test Generation", status: "in-progress" },
      { title: "Hybrid Runner GA", status: "in-progress" },
      { title: "GitHub Integration", status: "completed" },
      { title: "Playwright Export", status: "in-progress" },
    ],
  },
  {
    quarter: "Q2 2025",
    status: "planned",
    items: [
      { title: "Visual Testing", status: "planned" },
      { title: "Mobile Testing", status: "planned" },
      { title: "Performance Testing", status: "planned" },
      { title: "SOC 2 Certification", status: "planned" },
    ],
  },
  {
    quarter: "Q3 2025",
    status: "planned",
    items: [
      { title: "Accessibility Testing", status: "planned" },
      { title: "Load Testing", status: "planned" },
      { title: "Custom AI Models", status: "planned" },
      { title: "Enterprise SSO", status: "planned" },
    ],
  },
];

const Roadmap = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Roadmap - QUALYX</title>
        <meta name="description" content="See what we are building next. Our public roadmap for upcoming QUALYX features." />
      </Helmet>

      <DocPage
        title="Roadmap"
        description="Our public roadmap. See what we are building and what is coming next."
        breadcrumbs={[
          { label: "Resources", href: "/resources/roadmap" },
          { label: "Roadmap" },
        ]}
      >
        <DocSection>
          <div className="space-y-8 not-prose">
            {roadmapItems.map((quarter) => (
              <div key={quarter.quarter} className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-foreground">{quarter.quarter}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    quarter.status === "completed" ? "bg-success/20 text-success" :
                    quarter.status === "in-progress" ? "bg-primary/20 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {quarter.status === "completed" ? "Completed" :
                     quarter.status === "in-progress" ? "In Progress" : "Planned"}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {quarter.items.map((item) => (
                    <div key={item.title} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      {item.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : item.status === "in-progress" ? (
                        <Clock className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className={`text-sm ${
                        item.status === "completed" ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default Roadmap;

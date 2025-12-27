import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Sparkles, Bug, Zap } from "lucide-react";

const releases = [
  {
    version: "1.2.0",
    date: "December 20, 2024",
    changes: [
      { type: "feature", text: "AI-powered test generation from recordings" },
      { type: "feature", text: "Session replay with network inspection" },
      { type: "improvement", text: "50% faster test execution" },
      { type: "fix", text: "Fixed selector healing for dynamic IDs" },
    ],
  },
  {
    version: "1.1.0",
    date: "December 5, 2024",
    changes: [
      { type: "feature", text: "Hybrid runner support" },
      { type: "feature", text: "GitHub Actions integration" },
      { type: "improvement", text: "Improved error messages" },
      { type: "fix", text: "Fixed timezone handling in reports" },
    ],
  },
  {
    version: "1.0.0",
    date: "November 15, 2024",
    changes: [
      { type: "feature", text: "Initial release" },
      { type: "feature", text: "UI Recorder & Player" },
      { type: "feature", text: "API Automation Studio" },
      { type: "feature", text: "Self-healing selectors" },
    ],
  },
];

const Changelog = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Changelog - QUALYX</title>
        <meta name="description" content="Latest updates and releases for QUALYX. See what is new in each version." />
      </Helmet>

      <DocPage
        title="Changelog"
        description="All the latest updates, improvements, and fixes in each QUALYX release."
        breadcrumbs={[
          { label: "Resources", href: "/resources/changelog" },
          { label: "Changelog" },
        ]}
      >
        <DocSection>
          <div className="space-y-8 not-prose">
            {releases.map((release) => (
              <div key={release.version} className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-foreground">v{release.version}</h3>
                  <span className="text-sm text-muted-foreground">{release.date}</span>
                </div>
                <div className="space-y-2">
                  {release.changes.map((change, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
                      {change.type === "feature" ? (
                        <Sparkles className="w-4 h-4 text-primary" />
                      ) : change.type === "improvement" ? (
                        <Zap className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Bug className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-sm text-foreground">{change.text}</span>
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

export default Changelog;

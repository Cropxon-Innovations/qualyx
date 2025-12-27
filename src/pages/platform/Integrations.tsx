import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Plug, GitBranch, MessageSquare, Bell, FileCode, Cloud } from "lucide-react";

const integrations = [
  { category: "CI/CD", items: ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "Azure DevOps", "Bitbucket Pipelines"] },
  { category: "Communication", items: ["Slack", "Microsoft Teams", "Discord", "Email", "PagerDuty", "Opsgenie"] },
  { category: "Issue Tracking", items: ["Jira", "Linear", "GitHub Issues", "Asana", "Monday.com", "Trello"] },
  { category: "Cloud", items: ["AWS", "Google Cloud", "Azure", "Vercel", "Netlify", "Heroku"] },
];

const Integrations = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Integrations - QUALYX Platform</title>
        <meta name="description" content="Connect QUALYX with your favorite tools. Native integrations for CI/CD, communication, and issue tracking." />
      </Helmet>

      <DocPage
        title="Integrations"
        description="Connect QUALYX with your existing tools and workflows for seamless automation."
        breadcrumbs={[
          { label: "Platform", href: "/platform/integrations" },
          { label: "Integrations" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX integrates with the tools you already use. From CI/CD pipelines to communication 
            platforms, get test results where you need them.
          </p>
        </DocSection>

        {integrations.map((category) => (
          <DocSection key={category.category} title={category.category}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 not-prose">
              {category.items.map((item) => (
                <div key={item} className="p-4 rounded-xl border border-border bg-card/30 hover:border-primary/30 transition-colors cursor-pointer">
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </DocSection>
        ))}

        <DocCallout type="info" title="Custom Webhooks">
          Need a custom integration? Use our webhook API to connect QUALYX with any service.
        </DocCallout>
      </DocPage>
    </DocsLayout>
  );
};

export default Integrations;

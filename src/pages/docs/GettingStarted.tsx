import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCode, DocCard, DocCallout, DocStep } from "@/components/docs/DocPage";
import { UIDashboardPreview } from "@/components/docs/DashboardPreview";
import { APIDashboardPreview } from "@/components/docs/APIDashboardPreview";
import { Server, Code, FileCode, GitBranch, Zap, Shield, Sparkles } from "lucide-react";
import { Helmet } from "react-helmet";

const GettingStarted = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Getting Started - QUALYX Documentation</title>
        <meta name="description" content="Get started with QUALYX autonomous QA platform. Learn how to set up UI and API automation testing in minutes." />
      </Helmet>

      <DocPage
        title="Getting Started with QUALYX"
        description="Learn how to set up QUALYX and run your first autonomous test in under 5 minutes."
        breadcrumbs={[
          { label: "Docs", href: "/docs/getting-started" },
          { label: "Getting Started" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX is an autonomous QA-as-a-Service platform that combines AI-powered test generation, 
            self-healing automation, and enterprise-grade security. This guide will help you get started 
            with both UI and API automation testing.
          </p>
        </DocSection>

        <DocCallout type="info" title="Early Access">
          QUALYX is currently in early access. Join the waitlist to get priority access to all features.
        </DocCallout>

        <DocSection title="Live Dashboard Preview">
          <p className="text-muted-foreground mb-6">
            See how QUALYX executes autonomous UI tests in real-time. The dashboard shows test steps, 
            browser preview, and validation results.
          </p>
          <UIDashboardPreview />
        </DocSection>

        <DocSection title="Quick Start Guide">
          <DocStep number={1} title="Create Your Account">
            <p>Sign up for QUALYX and complete the onboarding process. You will receive an API key for integration.</p>
            <DocCode>
{`# Install the QUALYX CLI
npm install -g @qualyx/cli

# Authenticate with your API key
qualyx auth login`}
            </DocCode>
          </DocStep>

          <DocStep number={2} title="Initialize Your Project">
            <p>Set up QUALYX in your project directory to begin recording and generating tests.</p>
            <DocCode>
{`# Initialize QUALYX in your project
qualyx init

# This creates a qualyx.config.js file
# Configure your target application URL`}
            </DocCode>
          </DocStep>

          <DocStep number={3} title="Record Your First Test">
            <p>Use the QUALYX recorder to capture user interactions and automatically generate test scripts.</p>
            <DocCode>
{`# Start the recorder
qualyx record --url https://your-app.com

# The recorder will open a browser session
# Perform the actions you want to test
# Press Ctrl+C to stop recording`}
            </DocCode>
          </DocStep>

          <DocStep number={4} title="Run Your Tests">
            <p>Execute your recorded tests with a single command. QUALYX handles parallelization and reporting.</p>
            <DocCode>
{`# Run all tests
qualyx run

# Run specific test suite
qualyx run --suite auth

# Run with verbose output
qualyx run --verbose`}
            </DocCode>
          </DocStep>
        </DocSection>

        <DocSection title="API Automation Preview">
          <p className="text-muted-foreground mb-6">
            QUALYX also provides powerful API testing capabilities. See how automated API tests execute 
            with real-time request/response visualization.
          </p>
          <APIDashboardPreview />
        </DocSection>

        <DocSection title="Key Features">
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <Zap className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">AI-Powered Generation</h3>
              <p className="text-sm text-muted-foreground">Automatically generate comprehensive test suites from recordings</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <Sparkles className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Self-Healing Tests</h3>
              <p className="text-sm text-muted-foreground">Tests automatically adapt to UI changes without manual updates</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Enterprise Security</h3>
              <p className="text-sm text-muted-foreground">SOC 2 ready with hybrid execution options</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <Server className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Hybrid Execution</h3>
              <p className="text-sm text-muted-foreground">Run tests in cloud or on your own infrastructure</p>
            </div>
          </div>
        </DocSection>

        <DocSection title="Next Steps">
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <DocCard
              title="Hybrid Runner Setup"
              description="Install and configure the on-premise runner for secure test execution"
              icon={Server}
              href="/docs/hybrid-runner"
            />
            <DocCard
              title="SDK Guide"
              description="Deep dive into the QUALYX SDK for advanced integrations"
              icon={Code}
              href="/docs/sdk-guide"
            />
            <DocCard
              title="Export Scripts"
              description="Learn how to export tests to Playwright or Selenium"
              icon={FileCode}
              href="/docs/export-scripts"
            />
            <DocCard
              title="CI/CD Integration"
              description="Integrate QUALYX into your deployment pipeline"
              icon={GitBranch}
              href="/docs/cicd"
            />
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default GettingStarted;

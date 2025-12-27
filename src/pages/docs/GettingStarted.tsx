import { DocsLayout } from "@/components/docs/DocsLayout";
import { 
  DocPage, 
  DocSection, 
  DocCode, 
  DocCard, 
  DocCallout, 
  DocStep,
  DocTabs,
  DocAccordion,
  DocFeatureGrid
} from "@/components/docs/DocPage";
import { UIDashboardPreview } from "@/components/docs/DashboardPreview";
import { APIDashboardPreview } from "@/components/docs/APIDashboardPreview";
import { Server, Code, FileCode, GitBranch, Zap, Shield, Sparkles, Terminal, BookOpen, Rocket } from "lucide-react";
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
        {/* What is QUALYX */}
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

        {/* Why QUALYX */}
        <DocSection title="Why QUALYX?">
          <DocFeatureGrid features={[
            { icon: Zap, title: "10x Faster Test Creation", description: "AI generates tests from recordings or application analysis" },
            { icon: Sparkles, title: "Self-Healing Tests", description: "Tests automatically adapt when your UI changes" },
            { icon: Shield, title: "Enterprise Security", description: "SOC 2 ready with on-premise execution options" },
            { icon: Server, title: "Hybrid Execution", description: "Run in cloud or on your own infrastructure" },
          ]} />
        </DocSection>

        {/* Prerequisites */}
        <DocSection title="Prerequisites">
          <p className="text-muted-foreground mb-4">Before you begin, make sure you have:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Node.js 18+ installed on your machine</li>
            <li>A QUALYX account (join the waitlist if you do not have one)</li>
            <li>Your target application URL ready for testing</li>
          </ul>
        </DocSection>

        {/* Installation Tabs */}
        <DocSection title="Installation">
          <DocTabs tabs={[
            {
              label: "npm",
              content: (
                <DocCode language="bash" filename="terminal">
{`# Install the QUALYX CLI globally
npm install -g @qualyx/cli

# Verify installation
qualyx --version`}
                </DocCode>
              )
            },
            {
              label: "yarn",
              content: (
                <DocCode language="bash" filename="terminal">
{`# Install the QUALYX CLI globally
yarn global add @qualyx/cli

# Verify installation
qualyx --version`}
                </DocCode>
              )
            },
            {
              label: "pnpm",
              content: (
                <DocCode language="bash" filename="terminal">
{`# Install the QUALYX CLI globally
pnpm add -g @qualyx/cli

# Verify installation
qualyx --version`}
                </DocCode>
              )
            }
          ]} />
        </DocSection>

        {/* Quick Start Steps */}
        <DocSection title="Quick Start Guide">
          <DocStep number={1} title="Authenticate with QUALYX">
            <p>Login to your QUALYX account to get started. This will store your API key locally.</p>
            <DocCode language="bash" filename="terminal">
{`# Authenticate with your API key
qualyx auth login

# You'll be prompted to enter your API key
# Get it from: https://app.qualyx.io/settings/api-keys`}
            </DocCode>
            <DocCallout type="note">
              Your API key is stored securely in ~/.qualyx/config and never shared.
            </DocCallout>
          </DocStep>

          <DocStep number={2} title="Initialize Your Project">
            <p>Set up QUALYX in your project directory to begin recording and generating tests.</p>
            <DocCode language="bash" filename="terminal">
{`# Navigate to your project
cd your-project

# Initialize QUALYX
qualyx init

# This creates qualyx.config.js with default settings`}
            </DocCode>
            <p>The init command creates a configuration file:</p>
            <DocCode language="javascript" filename="qualyx.config.js">
{`module.exports = {
  // Your application URL
  baseUrl: 'http://localhost:3000',
  
  // Test output directory
  testsDir: './qualyx-tests',
  
  // Browser settings
  browser: 'chromium',
  headless: true,
  
  // Parallel execution
  workers: 4,
};`}
            </DocCode>
          </DocStep>

          <DocStep number={3} title="Record Your First Test">
            <p>Use the QUALYX recorder to capture user interactions and automatically generate test scripts.</p>
            <DocCode language="bash" filename="terminal">
{`# Start the recorder
qualyx record --url https://your-app.com

# The recorder opens a browser session
# Perform the actions you want to test
# Press Ctrl+C when done`}
            </DocCode>
            <DocCallout type="success" title="Pro Tip">
              The recorder captures not just clicks, but user intent. It understands what you are trying to do and generates smarter selectors.
            </DocCallout>
          </DocStep>

          <DocStep number={4} title="Run Your Tests">
            <p>Execute your recorded tests with a single command.</p>
            <DocCode language="bash" filename="terminal">
{`# Run all tests
qualyx run

# Run specific test suite
qualyx run --suite auth

# Run with verbose output
qualyx run --verbose

# Run in headed mode (see the browser)
qualyx run --headed`}
            </DocCode>
          </DocStep>
        </DocSection>

        {/* Live Preview */}
        <DocSection title="Live Dashboard Preview">
          <p className="text-muted-foreground mb-6">
            See how QUALYX executes autonomous UI tests in real-time. The dashboard shows test steps, 
            browser preview, and validation results.
          </p>
          <UIDashboardPreview />
        </DocSection>

        {/* API Preview */}
        <DocSection title="API Automation Preview">
          <p className="text-muted-foreground mb-6">
            QUALYX also provides powerful API testing capabilities. See how automated API tests execute 
            with real-time request/response visualization.
          </p>
          <APIDashboardPreview />
        </DocSection>

        {/* FAQ */}
        <DocSection title="Frequently Asked Questions">
          <DocAccordion title="What browsers does QUALYX support?">
            QUALYX supports all major browsers including Chrome, Firefox, Safari, and Edge. 
            Mobile browsers (Chrome for Android, Safari for iOS) are also supported.
          </DocAccordion>
          <DocAccordion title="Can I run tests on my own infrastructure?">
            Yes! QUALYX supports hybrid execution. You can run tests in our cloud or deploy 
            the QUALYX runner on your own infrastructure for sensitive applications.
          </DocAccordion>
          <DocAccordion title="How does self-healing work?">
            When a selector breaks, QUALYX uses AI to find the element using multiple strategies: 
            attribute matching, text content, visual position, and DOM structure analysis.
          </DocAccordion>
          <DocAccordion title="Can I export tests to Playwright or Selenium?">
            Absolutely. QUALYX tests can be exported to clean Playwright or Selenium code at any time. 
            No vendor lock-in.
          </DocAccordion>
        </DocSection>

        {/* Next Steps */}
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

        {/* Help */}
        <DocCallout type="info" title="Need Help?">
          Join our Discord community or email support@qualyx.io for assistance. 
          We typically respond within 24 hours.
        </DocCallout>
      </DocPage>
    </DocsLayout>
  );
};

export default GettingStarted;

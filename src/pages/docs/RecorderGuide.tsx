import { DocsLayout } from "@/components/docs/DocsLayout";
import { 
  DocPage, 
  DocSection, 
  DocCode, 
  DocCallout, 
  DocStep,
  DocAccordion
} from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Video, MousePointer, Pause, Save, Settings } from "lucide-react";

const RecorderGuide = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Recorder Guide - QUALYX Documentation</title>
        <meta name="description" content="Master the QUALYX browser recorder. Learn how to capture user interactions and generate intelligent test scripts." />
      </Helmet>

      <DocPage
        title="Recorder Guide"
        description="Learn how to use the QUALYX browser recorder to capture user interactions and generate intelligent test scripts."
        breadcrumbs={[
          { label: "Docs", href: "/docs/getting-started" },
          { label: "Recorder Guide" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The QUALYX Recorder is a browser extension that captures your interactions and converts them 
            into maintainable test scripts. Unlike simple click recorders, QUALYX understands user intent 
            and generates smart, self-healing selectors.
          </p>
        </DocSection>

        <DocCallout type="info" title="Browser Support">
          The QUALYX Recorder is available for Chrome and Firefox. Safari support is coming soon.
        </DocCallout>

        {/* Installation */}
        <DocSection title="Installation">
          <DocStep number={1} title="Install the Extension">
            <p>Install the QUALYX Recorder extension from your browser's extension store.</p>
            <div className="flex gap-4 mt-4">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">Chrome Web Store</span>
              </a>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">Firefox Add-ons</span>
              </a>
            </div>
          </DocStep>

          <DocStep number={2} title="Connect Your Account">
            <p>Click the QUALYX icon in your browser toolbar and sign in with your account.</p>
            <DocCode language="text">
{`1. Click the QUALYX icon in your toolbar
2. Click "Sign In"
3. Enter your API key or use SSO
4. You'll see a green checkmark when connected`}
            </DocCode>
          </DocStep>
        </DocSection>

        {/* Recording */}
        <DocSection title="Recording Your First Test">
          <DocStep number={1} title="Start Recording">
            <p>Navigate to your application and click the QUALYX icon, then "Start Recording".</p>
            <DocCallout type="note">
              The recorder will capture all interactions on the current tab. A red border appears around the page to indicate recording is active.
            </DocCallout>
          </DocStep>

          <DocStep number={2} title="Perform Actions">
            <p>Interact with your application naturally. The recorder captures:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li><strong>Clicks</strong> — on buttons, links, and interactive elements</li>
              <li><strong>Text input</strong> — typing in forms and text fields</li>
              <li><strong>Navigation</strong> — page loads and URL changes</li>
              <li><strong>Scrolling</strong> — significant scroll events</li>
              <li><strong>Hovers</strong> — on elements that trigger UI changes</li>
            </ul>
          </DocStep>

          <DocStep number={3} title="Add Assertions">
            <p>Right-click any element and select "Add Assertion" to verify element state.</p>
            <DocCode language="text">
{`Available assertions:
• Element is visible
• Element contains text "..."
• Element has value "..."
• Element is enabled/disabled
• Element count equals N`}
            </DocCode>
          </DocStep>

          <DocStep number={4} title="Stop and Save">
            <p>Click the QUALYX icon and "Stop Recording". Review and name your test.</p>
          </DocStep>
        </DocSection>

        {/* Best Practices */}
        <DocSection title="Best Practices">
          <DocAccordion title="Use meaningful test names" defaultOpen>
            Name your tests descriptively, like "User can complete checkout with credit card" 
            rather than "Test 1". This makes it easier to understand test failures.
          </DocAccordion>
          
          <DocAccordion title="Add assertions at key points">
            Do not just record clicks — add assertions to verify the application is in the expected state. 
            This catches bugs that would otherwise be missed.
          </DocAccordion>
          
          <DocAccordion title="Keep tests focused">
            Each test should verify one user flow. Long tests are harder to debug when they fail. 
            Break complex flows into smaller, focused tests.
          </DocAccordion>
          
          <DocAccordion title="Use test data wisely">
            Avoid hardcoding test data. Use QUALYX variables to parameterize tests with different 
            data sets for better coverage.
          </DocAccordion>
        </DocSection>

        {/* Troubleshooting */}
        <DocSection title="Troubleshooting">
          <DocAccordion title="Recording doesn't start">
            Make sure you are signed in to QUALYX and on an http/https page. Recording does not work 
            on browser internal pages (chrome://, about:, etc).
          </DocAccordion>
          
          <DocAccordion title="Elements are not captured">
            Some elements inside iframes or shadow DOM may require additional configuration. 
            Check the recorder settings to enable "Deep capture mode".
          </DocAccordion>
          
          <DocAccordion title="Selectors are too specific">
            If selectors look overly complex, your application may benefit from adding data-testid 
            attributes. QUALYX will automatically prefer these stable selectors.
          </DocAccordion>
        </DocSection>

        {/* Keyboard Shortcuts */}
        <DocSection title="Keyboard Shortcuts">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Shortcut</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-xs bg-muted px-2 py-1 rounded">Ctrl/Cmd + Shift + R</td>
                  <td className="py-3 px-4">Start/Stop recording</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-xs bg-muted px-2 py-1 rounded">Ctrl/Cmd + Shift + A</td>
                  <td className="py-3 px-4">Add assertion mode</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-xs bg-muted px-2 py-1 rounded">Ctrl/Cmd + Shift + P</td>
                  <td className="py-3 px-4">Pause recording</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs bg-muted px-2 py-1 rounded">Escape</td>
                  <td className="py-3 px-4">Cancel current action</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocCallout type="success" title="Next Steps">
          Now that you know how to record tests, learn how to run them in CI/CD or export to Playwright.
        </DocCallout>
      </DocPage>
    </DocsLayout>
  );
};

export default RecorderGuide;

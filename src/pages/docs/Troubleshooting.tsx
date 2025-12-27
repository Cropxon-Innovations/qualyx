import { DocsLayout } from "@/components/docs/DocsLayout";
import { 
  DocPage, 
  DocSection, 
  DocCode, 
  DocCallout, 
  DocAccordion
} from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { AlertTriangle, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

const Troubleshooting = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Troubleshooting - QUALYX Documentation</title>
        <meta name="description" content="Common issues and solutions for QUALYX. Find answers to frequently encountered problems." />
      </Helmet>

      <DocPage
        title="Troubleshooting"
        description="Common issues and their solutions. Can't find what you're looking for? Contact support."
        breadcrumbs={[
          { label: "Docs", href: "/docs/getting-started" },
          { label: "Troubleshooting" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This guide covers the most common issues users encounter with QUALYX and their solutions. 
            If you cannot find your issue here, reach out to our support team.
          </p>
        </DocSection>

        {/* Installation Issues */}
        <DocSection title="Installation Issues">
          <DocAccordion title="CLI installation fails with permission error" defaultOpen>
            <p className="mb-4">If you see "EACCES: permission denied", try one of these solutions:</p>
            <DocCode language="bash">
{`# Option 1: Use sudo (not recommended for production)
sudo npm install -g @qualyx/cli

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Then install normally
npm install -g @qualyx/cli`}
            </DocCode>
          </DocAccordion>
          
          <DocAccordion title="Node.js version not supported">
            <p className="mb-4">QUALYX requires Node.js 18 or higher. Check your version:</p>
            <DocCode language="bash">
{`node --version

# If below 18, upgrade using nvm:
nvm install 18
nvm use 18`}
            </DocCode>
          </DocAccordion>
        </DocSection>

        {/* Authentication Issues */}
        <DocSection title="Authentication Issues">
          <DocAccordion title="API key not recognized">
            <p>Make sure you are using the correct API key from your QUALYX dashboard:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Go to <strong>Settings → API Keys</strong> in the QUALYX dashboard</li>
              <li>Copy the full key (starts with "qx_")</li>
              <li>Run <code className="text-primary">qualyx auth login</code> and paste the key</li>
            </ul>
          </DocAccordion>
          
          <DocAccordion title="Session expired during test run">
            <p className="mb-4">If your tests fail with "Unauthorized" errors, refresh your authentication:</p>
            <DocCode language="bash">
{`# Re-authenticate
qualyx auth logout
qualyx auth login`}
            </DocCode>
          </DocAccordion>
        </DocSection>

        {/* Test Execution Issues */}
        <DocSection title="Test Execution Issues">
          <DocAccordion title="Tests timing out">
            <p className="mb-4">If tests time out, you can increase the timeout in your config:</p>
            <DocCode language="javascript" filename="qualyx.config.js">
{`module.exports = {
  // Increase timeout to 60 seconds
  timeout: 60000,
  
  // Or per-action timeout
  actionTimeout: 10000,
};`}
            </DocCode>
            <DocCallout type="note">
              If tests consistently time out, the issue may be with your application's performance, not QUALYX.
            </DocCallout>
          </DocAccordion>
          
          <DocAccordion title="Selectors not found">
            <p>When QUALYX cannot find an element:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Check if the element exists in the DOM (may be hidden or lazy-loaded)</li>
              <li>Verify the selector is still valid (UI may have changed)</li>
              <li>Enable auto-healing to automatically adapt to UI changes</li>
              <li>Add <code className="text-primary">data-testid</code> attributes for stable selectors</li>
            </ul>
          </DocAccordion>
          
          <DocAccordion title="Tests pass locally but fail in CI">
            <p>Common causes for CI-specific failures:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li><strong>Different screen size</strong> — Set explicit viewport in config</li>
              <li><strong>Timing issues</strong> — CI environments may be slower</li>
              <li><strong>Missing environment variables</strong> — Check CI config for secrets</li>
              <li><strong>Network differences</strong> — API responses may differ</li>
            </ul>
            <DocCode language="javascript" filename="qualyx.config.js">
{`module.exports = {
  // Set explicit viewport for consistency
  viewport: { width: 1280, height: 720 },
  
  // Add retry for flaky network conditions
  retries: 2,
};`}
            </DocCode>
          </DocAccordion>
        </DocSection>

        {/* Recording Issues */}
        <DocSection title="Recording Issues">
          <DocAccordion title="Recorder not capturing clicks">
            <p>If the recorder misses some interactions:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Check if the element is inside an iframe (enable iframe capture in settings)</li>
              <li>Some custom components may need special handling</li>
              <li>Try clicking more precisely on the target element</li>
            </ul>
          </DocAccordion>
          
          <DocAccordion title="Generated selectors are fragile">
            <p>To improve selector stability:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
              <li>Add <code className="text-primary">data-testid</code> attributes to key elements</li>
              <li>Use semantic HTML (buttons, links, inputs)</li>
              <li>Avoid dynamic class names from CSS-in-JS libraries</li>
            </ul>
          </DocAccordion>
        </DocSection>

        {/* Error Codes */}
        <DocSection title="Common Error Codes">
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-destructive" />
                <code className="text-destructive font-mono">QUALYX_E001</code>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Authentication failed.</strong> Your API key is invalid or expired. 
                Generate a new key from the dashboard.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-destructive" />
                <code className="text-destructive font-mono">QUALYX_E002</code>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Element not found.</strong> The selector did not match any element within the timeout period. 
                Check if the element exists and is visible.
              </p>
            </div>
            
            <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <code className="text-yellow-500 font-mono">QUALYX_W001</code>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Selector healed.</strong> The original selector failed but a new one was found. 
                Consider updating your test with the new selector.
              </p>
            </div>
          </div>
        </DocSection>

        {/* Getting Help */}
        <DocSection title="Still Need Help?">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl border border-border bg-card/30">
              <HelpCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Community Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join our Discord community to get help from other QUALYX users and the team.
              </p>
              <a href="#" className="text-primary text-sm hover:underline">
                Join Discord →
              </a>
            </div>
            
            <div className="p-6 rounded-xl border border-border bg-card/30">
              <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Priority Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enterprise customers have access to dedicated support with guaranteed response times.
              </p>
              <a href="mailto:support@qualyx.io" className="text-primary text-sm hover:underline">
                Contact Support →
              </a>
            </div>
          </div>
        </DocSection>

        <DocCallout type="info" title="Report a Bug">
          Found a bug? Report it on our GitHub repository or email bugs@qualyx.io with reproduction steps.
        </DocCallout>
      </DocPage>
    </DocsLayout>
  );
};

export default Troubleshooting;

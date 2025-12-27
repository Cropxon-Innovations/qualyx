import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCallout } from "@/components/docs/DocPage";
import { UIDashboardPreview } from "@/components/docs/DashboardPreview";
import { Helmet } from "react-helmet";
import { MonitorPlay, MousePointer, Eye, Zap, Shield, History } from "lucide-react";

const UIAutomation = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>UI Automation - QUALYX</title>
        <meta name="description" content="Autonomous UI testing with AI-powered recording, self-healing selectors, and visual validation." />
      </Helmet>

      <DocPage
        title="UI Automation"
        description="Record, generate, and execute UI tests with AI-powered automation that adapts to your application."
        breadcrumbs={[
          { label: "Product", href: "/product/ui-automation" },
          { label: "UI Automation" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX UI Automation transforms manual testing into intelligent, self-maintaining test suites. 
            Simply record your user flows, and our AI generates comprehensive tests that heal themselves 
            when your UI changes.
          </p>
        </DocSection>

        <DocSection title="Live Demo: UI Test Execution">
          <p className="text-muted-foreground mb-6">
            Watch how QUALYX executes UI tests with real-time browser visualization and step-by-step validation.
          </p>
          <UIDashboardPreview />
        </DocSection>

        <DocSection title="Key Features">
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="glass-card p-6 rounded-xl">
              <MonitorPlay className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Smart Recording</h3>
              <p className="text-sm text-muted-foreground">
                Capture user interactions with intelligent event detection. QUALYX understands user intent, 
                not just clicks and keystrokes.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <MousePointer className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Self-Healing Selectors</h3>
              <p className="text-sm text-muted-foreground">
                When UI elements change, QUALYX automatically finds the new selectors using AI-powered 
                element matching and visual recognition.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Eye className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Visual Validation</h3>
              <p className="text-sm text-muted-foreground">
                Beyond functional testing, QUALYX validates visual appearance with pixel-perfect 
                screenshot comparison and layout analysis.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <History className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Session Replay</h3>
              <p className="text-sm text-muted-foreground">
                Debug failures with full session recordings. Replay every interaction, network request, 
                and console log exactly as it happened.
              </p>
            </div>
          </div>
        </DocSection>

        <DocCallout type="success" title="90% Less Maintenance">
          Teams using QUALYX UI Automation report spending 90% less time maintaining their test suites 
          compared to traditional approaches.
        </DocCallout>

        <DocSection title="Supported Interactions">
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Interaction</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Click</td>
                  <td className="py-3 px-4">Single click, double click, right click</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Type</td>
                  <td className="py-3 px-4">Text input with special key support</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Select</td>
                  <td className="py-3 px-4">Dropdown and multi-select handling</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Drag & Drop</td>
                  <td className="py-3 px-4">Full drag and drop support</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Scroll</td>
                  <td className="py-3 px-4">Page and element scrolling</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium text-foreground">Hover</td>
                  <td className="py-3 px-4">Mouse hover and tooltip triggers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-foreground">File Upload</td>
                  <td className="py-3 px-4">File input and drag-drop uploads</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="Browser Support">
          <div className="flex flex-wrap gap-4 not-prose">
            {["Chrome", "Firefox", "Safari", "Edge", "Mobile Chrome", "Mobile Safari"].map((browser) => (
              <div key={browser} className="px-4 py-2 rounded-lg bg-muted border border-border text-sm text-foreground">
                {browser}
              </div>
            ))}
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default UIAutomation;

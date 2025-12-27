import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCode, DocCallout, DocStep } from "@/components/docs/DocPage";
import { Server, Cloud, Lock, Terminal, CheckCircle2, AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet";

const HybridRunner = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Hybrid Runner Setup - QUALYX Documentation</title>
        <meta name="description" content="Set up the QUALYX Hybrid Runner for secure on-premise test execution while maintaining cloud observability." />
      </Helmet>

      <DocPage
        title="Hybrid Runner Setup"
        description="Deploy the QUALYX runner on your infrastructure for secure, isolated test execution with full cloud observability."
        breadcrumbs={[
          { label: "Docs", href: "/docs/getting-started" },
          { label: "Hybrid Runner Setup" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The QUALYX Hybrid Runner enables you to execute tests within your own infrastructure while 
            maintaining centralized management through the cloud dashboard. This ensures sensitive data 
            never leaves your network.
          </p>
        </DocSection>

        {/* Architecture Diagram */}
        <DocSection title="Architecture Overview">
          <div className="glass-card-glow p-8 rounded-2xl not-prose">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Cloud Side */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
                  <Cloud className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">QUALYX Cloud</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Dashboard & Analytics</li>
                  <li>Test Orchestration</li>
                  <li>Result Aggregation</li>
                </ul>
              </div>

              {/* Connection */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Lock className="w-4 h-4 text-success" />
                  <span>Outbound Only</span>
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-primary via-success to-primary rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-flow" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">TLS 1.3 Encrypted</p>
              </div>

              {/* On-Prem Side */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-success/20 flex items-center justify-center mb-4">
                  <Server className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Your Infrastructure</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Test Execution</li>
                  <li>Data Processing</li>
                  <li>Credential Vault</li>
                </ul>
              </div>
            </div>
          </div>
        </DocSection>

        <DocCallout type="success" title="Security First">
          The Hybrid Runner uses outbound-only connections. No inbound ports need to be opened, 
          and your sensitive test data never leaves your network.
        </DocCallout>

        <DocSection title="System Requirements">
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Component</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Minimum</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Recommended</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">CPU</td>
                  <td className="py-3 px-4">2 cores</td>
                  <td className="py-3 px-4">4+ cores</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Memory</td>
                  <td className="py-3 px-4">4 GB</td>
                  <td className="py-3 px-4">8+ GB</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Storage</td>
                  <td className="py-3 px-4">20 GB</td>
                  <td className="py-3 px-4">50+ GB SSD</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Network</td>
                  <td className="py-3 px-4">Outbound HTTPS</td>
                  <td className="py-3 px-4">Outbound HTTPS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="Installation Methods">
          <DocStep number={1} title="Docker (Recommended)">
            <p>The fastest way to deploy the Hybrid Runner is using Docker.</p>
            <DocCode>
{`# Pull the latest runner image
docker pull qualyx/runner:latest

# Run the container
docker run -d \\
  --name qualyx-runner \\
  -e QUALYX_API_KEY=your-api-key \\
  -e QUALYX_RUNNER_NAME=production-runner \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  qualyx/runner:latest`}
            </DocCode>
          </DocStep>

          <DocStep number={2} title="Kubernetes / Helm">
            <p>For Kubernetes deployments, use our official Helm chart.</p>
            <DocCode>
{`# Add the QUALYX Helm repository
helm repo add qualyx https://charts.qualyx.io
helm repo update

# Install the runner
helm install qualyx-runner qualyx/runner \\
  --set apiKey=your-api-key \\
  --set runnerName=k8s-runner \\
  --namespace qualyx \\
  --create-namespace`}
            </DocCode>
          </DocStep>

          <DocStep number={3} title="Binary Installation">
            <p>For bare-metal or VM deployments, download the binary directly.</p>
            <DocCode>
{`# Download the latest binary
curl -fsSL https://get.qualyx.io/runner | sh

# Configure the runner
qualyx-runner config set api-key your-api-key
qualyx-runner config set runner-name bare-metal-runner

# Start the runner
qualyx-runner start`}
            </DocCode>
          </DocStep>
        </DocSection>

        <DocSection title="Configuration">
          <p className="text-muted-foreground mb-4">
            The runner can be configured via environment variables or a configuration file.
          </p>
          <DocCode>
{`# qualyx-runner.yaml
api_key: \${QUALYX_API_KEY}
runner_name: production-runner

execution:
  max_parallel_tests: 4
  timeout: 30m
  retry_failed: true
  retry_count: 2

security:
  vault_path: /etc/qualyx/vault
  mask_sensitive: true
  audit_logging: true

network:
  proxy: \${HTTP_PROXY}
  no_proxy: localhost,127.0.0.1`}
          </DocCode>
        </DocSection>

        <DocCallout type="warning" title="Firewall Configuration">
          Ensure outbound HTTPS (port 443) access to <code>api.qualyx.io</code> and <code>ws.qualyx.io</code>. 
          No inbound ports are required.
        </DocCallout>

        <DocSection title="Verification">
          <p className="text-muted-foreground mb-4">
            After installation, verify the runner is connected properly.
          </p>
          <DocCode>
{`# Check runner status
qualyx-runner status

# Expected output:
# ✓ Runner: production-runner
# ✓ Status: Connected
# ✓ API: api.qualyx.io
# ✓ Version: 1.2.3`}
          </DocCode>
          
          <div className="mt-6 p-4 rounded-xl bg-success/5 border border-success/20 not-prose">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Runner Connected</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Once connected, the runner will appear in your QUALYX dashboard under Settings → Runners. 
                  You can then assign test suites to execute on this runner.
                </p>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection title="Troubleshooting">
          <div className="space-y-4 not-prose">
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Connection Timeout</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check firewall rules and ensure outbound HTTPS is allowed to *.qualyx.io
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Authentication Failed</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Verify your API key is correct and has runner permissions enabled
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Docker Socket Access</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ensure the runner has access to Docker for browser container management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default HybridRunner;

import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCode, DocCallout } from "@/components/docs/DocPage";
import { APIDashboardPreview } from "@/components/docs/APIDashboardPreview";
import { Helmet } from "react-helmet";
import { Code2, Zap, Shield, Link, FileJson, GitBranch } from "lucide-react";

const APIAutomation = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>API Automation - QUALYX</title>
        <meta name="description" content="Comprehensive API testing for REST, GraphQL, and WebSocket endpoints with automatic schema validation." />
      </Helmet>

      <DocPage
        title="API Automation"
        description="Build, run, and maintain API tests with intelligent request chaining, schema validation, and comprehensive assertions."
        breadcrumbs={[
          { label: "Product", href: "/product/api-automation" },
          { label: "API Automation" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX API Automation provides a powerful visual builder and programmatic SDK for testing 
            REST, GraphQL, and WebSocket APIs. Chain requests together, validate responses against 
            schemas, and integrate seamlessly with your CI/CD pipeline.
          </p>
        </DocSection>

        <DocSection title="Live Demo: API Test Execution">
          <p className="text-muted-foreground mb-6">
            Watch how QUALYX executes API tests with real-time request/response visualization and assertion validation.
          </p>
          <APIDashboardPreview />
        </DocSection>

        <DocSection title="Key Features">
          <div className="grid md:grid-cols-2 gap-6 not-prose">
            <div className="glass-card p-6 rounded-xl">
              <Code2 className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Visual Request Builder</h3>
              <p className="text-sm text-muted-foreground">
                Build API tests visually with an intuitive interface. Define headers, body, 
                and authentication without writing code.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Link className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Request Chaining</h3>
              <p className="text-sm text-muted-foreground">
                Extract values from responses and use them in subsequent requests. Build 
                complex multi-step API workflows effortlessly.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <FileJson className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Schema Validation</h3>
              <p className="text-sm text-muted-foreground">
                Automatically validate responses against JSON Schema, OpenAPI specs, or 
                custom validation rules.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl">
              <Zap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Performance Testing</h3>
              <p className="text-sm text-muted-foreground">
                Set response time thresholds and track API performance over time. Catch 
                regressions before they impact users.
              </p>
            </div>
          </div>
        </DocSection>

        <DocSection title="Supported Protocols">
          <div className="grid md:grid-cols-3 gap-4 not-prose">
            <div className="p-4 rounded-xl border border-border bg-card/30 text-center">
              <h4 className="font-semibold text-foreground mb-2">REST</h4>
              <p className="text-xs text-muted-foreground">GET, POST, PUT, PATCH, DELETE</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30 text-center">
              <h4 className="font-semibold text-foreground mb-2">GraphQL</h4>
              <p className="text-xs text-muted-foreground">Queries, Mutations, Subscriptions</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card/30 text-center">
              <h4 className="font-semibold text-foreground mb-2">WebSocket</h4>
              <p className="text-xs text-muted-foreground">Real-time message testing</p>
            </div>
          </div>
        </DocSection>

        <DocSection title="Example: API Test Suite">
          <DocCode>
{`// QUALYX API Test Example
{
  "name": "User Management API",
  "baseUrl": "https://api.example.com/v1",
  "auth": {
    "type": "bearer",
    "token": "{{env.API_TOKEN}}"
  },
  "requests": [
    {
      "name": "Create User",
      "method": "POST",
      "endpoint": "/users",
      "body": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "assertions": [
        { "status": 201 },
        { "jsonPath": "$.id", "exists": true },
        { "responseTime": { "max": 500 } }
      ],
      "extractors": [
        { "variable": "userId", "jsonPath": "$.id" }
      ]
    },
    {
      "name": "Get User",
      "method": "GET",
      "endpoint": "/users/{{userId}}",
      "assertions": [
        { "status": 200 },
        { "jsonPath": "$.name", "equals": "John Doe" }
      ]
    }
  ]
}`}
          </DocCode>
        </DocSection>

        <DocCallout type="info" title="OpenAPI Import">
          Import your OpenAPI/Swagger specification to automatically generate test cases for all endpoints.
        </DocCallout>

        <DocSection title="Assertion Types">
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">status</td>
                  <td className="py-3 px-4">HTTP status code</td>
                  <td className="py-3 px-4 font-mono text-xs">{"{ status: 200 }"}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">jsonPath</td>
                  <td className="py-3 px-4">JSON path value check</td>
                  <td className="py-3 px-4 font-mono text-xs">{'{ jsonPath: "$.id", exists: true }'}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">header</td>
                  <td className="py-3 px-4">Response header</td>
                  <td className="py-3 px-4 font-mono text-xs">{'{ header: "Content-Type", contains: "json" }'}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">responseTime</td>
                  <td className="py-3 px-4">Performance threshold</td>
                  <td className="py-3 px-4 font-mono text-xs">{"{ responseTime: { max: 500 } }"}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">schema</td>
                  <td className="py-3 px-4">JSON Schema validation</td>
                  <td className="py-3 px-4 font-mono text-xs">{'{ schema: "user.schema.json" }'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default APIAutomation;

import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCode, DocCallout, DocStep } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";

const SDKGuide = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>SDK Guide - QUALYX Documentation</title>
        <meta name="description" content="Complete SDK reference for QUALYX. Learn how to integrate autonomous testing into your applications." />
      </Helmet>

      <DocPage
        title="SDK Guide"
        description="Comprehensive guide to the QUALYX SDK for programmatic test creation, execution, and integration."
        breadcrumbs={[
          { label: "Docs", href: "/docs/getting-started" },
          { label: "SDK Guide" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The QUALYX SDK provides programmatic access to all platform features, enabling 
            deep integration with your development workflow and custom automation scenarios.
          </p>
        </DocSection>

        <DocSection title="Installation">
          <DocCode>
{`# npm
npm install @qualyx/sdk

# yarn
yarn add @qualyx/sdk

# pnpm
pnpm add @qualyx/sdk`}
          </DocCode>
        </DocSection>

        <DocSection title="Quick Start">
          <DocCode>
{`import { Qualyx } from '@qualyx/sdk';

// Initialize the client
const qualyx = new Qualyx({
  apiKey: process.env.QUALYX_API_KEY,
  projectId: 'your-project-id',
});

// Create a test suite
const suite = await qualyx.suites.create({
  name: 'Authentication Tests',
  description: 'Test user login and registration flows',
});

// Add a test
const test = await qualyx.tests.create({
  suiteId: suite.id,
  name: 'User can log in with valid credentials',
  steps: [
    { action: 'navigate', target: 'https://app.example.com/login' },
    { action: 'type', target: '#email', value: 'user@example.com' },
    { action: 'type', target: '#password', value: 'password123' },
    { action: 'click', target: 'button[type="submit"]' },
    { action: 'assert', target: '.dashboard', assertion: 'visible' },
  ],
});

// Run the test
const result = await qualyx.tests.run(test.id);
console.log('Test result:', result.status);`}
          </DocCode>
        </DocSection>

        <DocSection title="Core Concepts">
          <h3 className="text-xl font-semibold text-foreground mb-4">Projects</h3>
          <p className="text-muted-foreground mb-4">
            Projects are the top-level container for all your tests, suites, and configurations.
          </p>
          <DocCode>
{`// List all projects
const projects = await qualyx.projects.list();

// Get a specific project
const project = await qualyx.projects.get('project-id');

// Update project settings
await qualyx.projects.update('project-id', {
  name: 'Updated Project Name',
  settings: {
    parallelization: 4,
    retryOnFailure: true,
  },
});`}
          </DocCode>

          <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Test Suites</h3>
          <p className="text-muted-foreground mb-4">
            Suites group related tests together for organization and batch execution.
          </p>
          <DocCode>
{`// Create a suite
const suite = await qualyx.suites.create({
  name: 'E2E Tests',
  tags: ['critical', 'e2e'],
});

// List suites with filtering
const suites = await qualyx.suites.list({
  tags: ['critical'],
  status: 'active',
});

// Run all tests in a suite
const runResult = await qualyx.suites.run(suite.id, {
  environment: 'staging',
  parallel: true,
});`}
          </DocCode>

          <h3 className="text-xl font-semibold text-foreground mb-4 mt-8">Tests</h3>
          <p className="text-muted-foreground mb-4">
            Individual test cases with steps, assertions, and configuration.
          </p>
          <DocCode>
{`// Create a test with detailed steps
const test = await qualyx.tests.create({
  suiteId: 'suite-id',
  name: 'Complete checkout flow',
  steps: [
    {
      action: 'navigate',
      target: '/products',
    },
    {
      action: 'click',
      target: '[data-testid="add-to-cart"]',
      waitFor: 'networkIdle',
    },
    {
      action: 'click',
      target: '[data-testid="checkout"]',
    },
    {
      action: 'fill',
      target: '#card-number',
      value: '4242424242424242',
    },
    {
      action: 'assert',
      target: '.order-confirmation',
      assertion: 'contains',
      value: 'Thank you for your order',
    },
  ],
  config: {
    timeout: 60000,
    retries: 2,
    screenshot: 'on-failure',
  },
});`}
          </DocCode>
        </DocSection>

        <DocCallout type="info" title="TypeScript Support">
          The SDK is written in TypeScript and provides full type definitions for all methods and responses.
        </DocCallout>

        <DocSection title="API Automation">
          <p className="text-muted-foreground mb-4">
            Create and run API tests programmatically with full request/response validation.
          </p>
          <DocCode>
{`// Create an API test
const apiTest = await qualyx.api.create({
  name: 'User API Tests',
  requests: [
    {
      name: 'Create user',
      method: 'POST',
      url: '/api/users',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {{token}}',
      },
      body: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      assertions: [
        { type: 'status', expected: 201 },
        { type: 'jsonPath', path: '$.id', exists: true },
        { type: 'responseTime', maxMs: 500 },
      ],
      extractors: [
        { name: 'userId', jsonPath: '$.id' },
      ],
    },
    {
      name: 'Get user',
      method: 'GET',
      url: '/api/users/{{userId}}',
      assertions: [
        { type: 'status', expected: 200 },
        { type: 'jsonPath', path: '$.name', equals: 'John Doe' },
      ],
    },
  ],
});

// Run the API test
const result = await qualyx.api.run(apiTest.id);`}
          </DocCode>
        </DocSection>

        <DocSection title="Session Replay">
          <p className="text-muted-foreground mb-4">
            Access session recordings for debugging and analysis.
          </p>
          <DocCode>
{`// Get session replay for a test run
const session = await qualyx.sessions.get(runId);

// Access replay data
console.log('Duration:', session.duration);
console.log('Steps:', session.steps.length);
console.log('Screenshots:', session.screenshots.length);

// Download session as video
const videoUrl = await qualyx.sessions.exportVideo(runId);

// Get step-by-step breakdown
const timeline = await qualyx.sessions.getTimeline(runId);
timeline.forEach(event => {
  console.log(\`[\${event.timestamp}] \${event.type}: \${event.target}\`);
});`}
          </DocCode>
        </DocSection>

        <DocSection title="Self-Healing Configuration">
          <p className="text-muted-foreground mb-4">
            Configure how QUALYX handles selector changes and test repairs.
          </p>
          <DocCode>
{`// Configure self-healing at project level
await qualyx.projects.updateSettings('project-id', {
  selfHealing: {
    enabled: true,
    strategies: ['attribute', 'text', 'position', 'ai'],
    autoApprove: false,
    notifyOnHeal: true,
  },
});

// Get healing suggestions for a failed test
const suggestions = await qualyx.healing.getSuggestions(testId);
suggestions.forEach(s => {
  console.log(\`Old: \${s.originalSelector}\`);
  console.log(\`New: \${s.suggestedSelector}\`);
  console.log(\`Confidence: \${s.confidence}%\`);
});

// Approve a healing suggestion
await qualyx.healing.approve(suggestionId);`}
          </DocCode>
        </DocSection>

        <DocSection title="Webhooks & Events">
          <p className="text-muted-foreground mb-4">
            Subscribe to events for real-time notifications and integrations.
          </p>
          <DocCode>
{`// Create a webhook
const webhook = await qualyx.webhooks.create({
  url: 'https://your-server.com/qualyx-webhook',
  events: ['test.completed', 'test.failed', 'suite.completed'],
  secret: 'your-webhook-secret',
});

// List active webhooks
const webhooks = await qualyx.webhooks.list();

// Webhook payload example
{
  "event": "test.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "testId": "test-123",
    "testName": "User login flow",
    "status": "passed",
    "duration": 4523,
    "runId": "run-456"
  }
}`}
          </DocCode>
        </DocSection>

        <DocSection title="Error Handling">
          <DocCode>
{`import { Qualyx, QualyxError } from '@qualyx/sdk';

try {
  const result = await qualyx.tests.run(testId);
} catch (error) {
  if (error instanceof QualyxError) {
    console.error('Error code:', error.code);
    console.error('Message:', error.message);
    console.error('Details:', error.details);
    
    switch (error.code) {
      case 'TEST_NOT_FOUND':
        // Handle missing test
        break;
      case 'RATE_LIMITED':
        // Handle rate limiting
        break;
      case 'AUTHENTICATION_FAILED':
        // Handle auth error
        break;
    }
  }
}`}
          </DocCode>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default SDKGuide;

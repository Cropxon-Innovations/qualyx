import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCode, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";

const CICD = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>CI/CD Integration - QUALYX Documentation</title>
        <meta name="description" content="Integrate QUALYX with GitHub Actions, GitLab CI, Jenkins, and other CI/CD pipelines." />
      </Helmet>

      <DocPage
        title="CI/CD Integration"
        description="Automate your testing workflow by integrating QUALYX into your CI/CD pipelines."
        breadcrumbs={[
          { label: "Docs", href: "/docs/getting-started" },
          { label: "CI/CD Integration" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection title="GitHub Actions">
          <DocCode>
{`# .github/workflows/qualyx.yml
name: QUALYX Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run QUALYX Tests
        uses: qualyx/action@v1
        with:
          api-key: \${{ secrets.QUALYX_API_KEY }}
          suite: critical-path
          environment: staging
          wait-for-results: true
          
      - name: Upload Test Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: qualyx-report
          path: qualyx-results/`}
          </DocCode>
        </DocSection>

        <DocSection title="GitLab CI">
          <DocCode>
{`# .gitlab-ci.yml
stages:
  - test

qualyx-tests:
  stage: test
  image: qualyx/cli:latest
  variables:
    QUALYX_API_KEY: $QUALYX_API_KEY
  script:
    - qualyx run --suite critical-path --environment staging
    - qualyx report --format junit --output results.xml
  artifacts:
    reports:
      junit: results.xml
    paths:
      - qualyx-results/
    when: always`}
          </DocCode>
        </DocSection>

        <DocSection title="Jenkins">
          <DocCode>
{`// Jenkinsfile
pipeline {
    agent any
    
    environment {
        QUALYX_API_KEY = credentials('qualyx-api-key')
    }
    
    stages {
        stage('Run QUALYX Tests') {
            steps {
                sh '''
                    npm install -g @qualyx/cli
                    qualyx run --suite critical-path --environment staging
                '''
            }
        }
    }
    
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'qualyx-results',
                reportFiles: 'index.html',
                reportName: 'QUALYX Report'
            ])
        }
    }
}`}
          </DocCode>
        </DocSection>

        <DocSection title="CircleCI">
          <DocCode>
{`# .circleci/config.yml
version: 2.1

orbs:
  qualyx: qualyx/orb@1.0

jobs:
  test:
    docker:
      - image: cimg/node:18.0
    steps:
      - checkout
      - qualyx/run:
          api-key: QUALYX_API_KEY
          suite: critical-path
          environment: staging

workflows:
  test:
    jobs:
      - test`}
          </DocCode>
        </DocSection>

        <DocCallout type="success" title="Parallel Execution">
          QUALYX automatically parallelizes test execution in CI. Configure the parallelization level 
          in your project settings or pass <code>--parallel 4</code> to the CLI.
        </DocCallout>

        <DocSection title="Environment Variables">
          <div className="overflow-x-auto not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Variable</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Description</th>
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Required</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">QUALYX_API_KEY</td>
                  <td className="py-3 px-4">Your QUALYX API key</td>
                  <td className="py-3 px-4">Yes</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">QUALYX_PROJECT_ID</td>
                  <td className="py-3 px-4">Project identifier</td>
                  <td className="py-3 px-4">No</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-primary">QUALYX_BASE_URL</td>
                  <td className="py-3 px-4">Override target URL</td>
                  <td className="py-3 px-4">No</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-primary">QUALYX_RUNNER</td>
                  <td className="py-3 px-4">Specify runner to use</td>
                  <td className="py-3 px-4">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DocSection>

        <DocSection title="CLI Commands">
          <DocCode>
{`# Run all tests in a suite
qualyx run --suite my-suite

# Run with specific environment
qualyx run --suite my-suite --environment staging

# Run specific tests by tag
qualyx run --tags critical,smoke

# Generate reports
qualyx report --format html --output ./reports
qualyx report --format junit --output ./results.xml

# Check test status
qualyx status --run-id abc123`}
          </DocCode>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default CICD;

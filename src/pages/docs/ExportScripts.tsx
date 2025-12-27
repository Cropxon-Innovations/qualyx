import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection, DocCode, DocCallout } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";

const ExportScripts = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Export Scripts - QUALYX Documentation</title>
        <meta name="description" content="Export QUALYX tests to Playwright, Selenium, or Cypress for local execution and CI integration." />
      </Helmet>

      <DocPage
        title="Export Scripts"
        description="Export your QUALYX tests to industry-standard frameworks like Playwright, Selenium, and Cypress."
        breadcrumbs={[
          { label: "Docs", href: "/docs/getting-started" },
          { label: "Export Scripts" },
        ]}
        lastUpdated="December 2024"
      >
        <DocSection>
          <p className="text-lg text-muted-foreground leading-relaxed">
            QUALYX tests can be exported to popular testing frameworks, giving you the flexibility 
            to run tests outside the platform or integrate with existing test suites.
          </p>
        </DocSection>

        <DocSection title="Playwright Export">
          <p className="text-muted-foreground mb-4">
            Export tests as Playwright TypeScript files with full async/await support.
          </p>
          <DocCode>
{`# Export a single test
qualyx export --test test-123 --format playwright

# Export entire suite
qualyx export --suite suite-456 --format playwright --output ./tests

# Generated output: tests/auth-login.spec.ts
import { test, expect } from '@playwright/test';

test('User can log in with valid credentials', async ({ page }) => {
  await page.goto('https://app.example.com/login');
  
  await page.locator('#email').fill('user@example.com');
  await page.locator('#password').fill('password123');
  await page.locator('button[type="submit"]').click();
  
  await expect(page.locator('.dashboard')).toBeVisible();
});`}
          </DocCode>
        </DocSection>

        <DocSection title="Selenium Export">
          <p className="text-muted-foreground mb-4">
            Export to Selenium WebDriver with support for multiple languages.
          </p>
          <DocCode>
{`# Export to Selenium (Python)
qualyx export --test test-123 --format selenium-python

# Generated output: test_auth_login.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestAuthLogin:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.wait = WebDriverWait(self.driver, 10)
    
    def test_user_can_login(self):
        self.driver.get('https://app.example.com/login')
        
        self.driver.find_element(By.ID, 'email').send_keys('user@example.com')
        self.driver.find_element(By.ID, 'password').send_keys('password123')
        self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()
        
        self.wait.until(EC.visibility_of_element_located((By.CLASS_NAME, 'dashboard')))
    
    def teardown_method(self):
        self.driver.quit()`}
          </DocCode>
        </DocSection>

        <DocSection title="Cypress Export">
          <p className="text-muted-foreground mb-4">
            Export to Cypress with automatic retry and assertion handling.
          </p>
          <DocCode>
{`# Export to Cypress
qualyx export --test test-123 --format cypress

# Generated output: cypress/e2e/auth-login.cy.ts
describe('Authentication', () => {
  it('User can log in with valid credentials', () => {
    cy.visit('https://app.example.com/login');
    
    cy.get('#email').type('user@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.get('.dashboard').should('be.visible');
  });
});`}
          </DocCode>
        </DocSection>

        <DocCallout type="info" title="Self-Healing Selectors">
          Exported scripts include fallback selectors when available, making them more resilient to UI changes.
        </DocCallout>

        <DocSection title="Export Options">
          <DocCode>
{`# Full export options
qualyx export \\
  --suite suite-123 \\
  --format playwright \\
  --output ./exported-tests \\
  --include-fixtures \\
  --include-page-objects \\
  --base-url https://staging.example.com \\
  --auth-state ./auth.json

# Export with environment configuration
qualyx export \\
  --suite suite-123 \\
  --format playwright \\
  --env staging \\
  --config ./qualyx.export.yaml`}
          </DocCode>
        </DocSection>

        <DocSection title="Programmatic Export">
          <DocCode>
{`import { Qualyx } from '@qualyx/sdk';

const qualyx = new Qualyx({ apiKey: 'your-api-key' });

// Export a test
const exported = await qualyx.tests.export('test-123', {
  format: 'playwright',
  options: {
    typescript: true,
    includeFixtures: true,
    baseUrl: 'https://staging.example.com',
  },
});

// Write to file
await fs.writeFile('./tests/exported.spec.ts', exported.code);

// Export entire suite as ZIP
const suiteExport = await qualyx.suites.export('suite-456', {
  format: 'playwright',
});
await fs.writeFile('./tests.zip', suiteExport.archive);`}
          </DocCode>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default ExportScripts;

import { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  FileCode, 
  Code2, 
  Download,
  GitBranch,
  Braces,
  Copy,
  Check,
  ArrowRight,
  Play
} from "lucide-react";
import { 
  FeaturePageLayout, 
  FeatureHero, 
  FeatureCard, 
  FeatureSection, 
  LivePreview,
  StatCard,
  Testimonial
} from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Code Export Demo
const CodeExportDemo = () => {
  const [activeTab, setActiveTab] = useState<"playwright" | "selenium">("playwright");
  const [copied, setCopied] = useState(false);

  const playwrightCode = `import { test, expect } from '@playwright/test';

test('user login flow', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://app.example.com/login');
  
  // Fill in credentials
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', '••••••••');
  
  // Submit form
  await page.click('[data-testid="submit"]');
  
  // Verify dashboard loaded
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toHaveText('Welcome back');
});`;

  const seleniumCode = `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def test_user_login():
    driver = webdriver.Chrome()
    driver.get('https://app.example.com/login')
    
    # Fill in credentials
    driver.find_element(By.CSS_SELECTOR, '[data-testid="email"]').send_keys('user@example.com')
    driver.find_element(By.CSS_SELECTOR, '[data-testid="password"]').send_keys('••••••••')
    
    # Submit form
    driver.find_element(By.CSS_SELECTOR, '[data-testid="submit"]').click()
    
    # Verify dashboard loaded
    WebDriverWait(driver, 10).until(EC.url_contains('/dashboard'))
    assert 'Welcome back' in driver.page_source
    
    driver.quit()`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab === "playwright" ? playwrightCode : seleniumCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Tab Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 rounded-lg bg-muted/30">
          <button
            onClick={() => setActiveTab("playwright")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === "playwright"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Playwright
          </button>
          <button
            onClick={() => setActiveTab("selenium")}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeTab === "selenium"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Selenium
          </button>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-success" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="relative rounded-lg bg-background/80 border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-muted/30">
          <span className="text-xs text-muted-foreground font-mono">
            {activeTab === "playwright" ? "login.spec.ts" : "test_login.py"}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-destructive/70" />
            <div className="w-2 h-2 rounded-full bg-warning/70" />
            <div className="w-2 h-2 rounded-full bg-success/70" />
          </div>
        </div>
        <pre className="p-4 text-xs font-mono text-foreground/90 overflow-x-auto max-h-[200px]">
          <code>{activeTab === "playwright" ? playwrightCode : seleniumCode}</code>
        </pre>
      </div>

      {/* Export info */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-success" />
          <span className="text-sm text-foreground">Clean, maintainable code</span>
        </div>
        <span className="text-xs text-muted-foreground">No vendor lock-in</span>
      </div>
    </div>
  );
};

const ExportableCode = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Exportable Code - QUALYX</title>
        <meta name="description" content="Export your tests to Playwright or Selenium. Own your tests with clean, maintainable code." />
      </Helmet>

      <FeatureHero
        badge="No Lock-in"
        subtitle="Product"
        title="Exportable Code"
        description="Own your tests. Export clean, maintainable Playwright or Selenium scripts anytime. No vendor lock-in, no proprietary formats."
        primaryCta={{ label: "Start Free Trial", href: "/#waitlist" }}
        secondaryCta={{ label: "Watch Demo", href: "/demo" }}
      >
        <LivePreview title="QUALYX Code Export">
          <CodeExportDemo />
        </LivePreview>
      </FeatureHero>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="Playwright" label="Full Support" />
          <StatCard value="Selenium" label="Python & Java" />
          <StatCard value="Cypress" label="Coming Soon" />
          <StatCard value="100%" label="Code Ownership" />
        </div>
      </section>

      {/* Features Grid */}
      <FeatureSection
        title="Export Features"
        description="Clean code that works in any environment"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Code2}
            title="Clean Code Generation"
            description="Exports follow best practices with proper selectors, waits, and assertions. No magic strings or proprietary APIs."
          />
          <FeatureCard
            icon={Braces}
            title="Multiple Languages"
            description="Export to TypeScript, JavaScript, Python, or Java. Use the language your team is comfortable with."
          />
          <FeatureCard
            icon={GitBranch}
            title="Version Control Ready"
            description="Generated code is designed for version control. Clean diffs, readable commits, easy reviews."
          />
          <FeatureCard
            icon={Download}
            title="Bulk Export"
            description="Export individual tests or entire suites. Maintain folder structure and naming conventions."
          />
          <FeatureCard
            icon={FileCode}
            title="Page Object Model"
            description="Optionally generate Page Object Model structure for better test organization and reuse."
          />
          <FeatureCard
            icon={Copy}
            title="CI/CD Ready"
            description="Exported tests run directly in your CI/CD pipeline. No QUALYX runtime required."
          />
        </div>
      </FeatureSection>

      {/* Supported Frameworks */}
      <FeatureSection
        title="Supported Frameworks"
        description="Export to the tools you already use"
        className="bg-muted/10"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Playwright",
              languages: ["TypeScript", "JavaScript"],
              status: "Full Support",
              color: "text-success"
            },
            {
              name: "Selenium",
              languages: ["Python", "Java", "JavaScript"],
              status: "Full Support",
              color: "text-success"
            },
            {
              name: "Cypress",
              languages: ["JavaScript"],
              status: "Coming Q1 2025",
              color: "text-muted-foreground"
            }
          ].map((framework) => (
            <div key={framework.name} className="relative p-6 rounded-2xl border border-border/40 bg-card/30 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">{framework.name}</h3>
              <p className={`text-xs font-medium mb-3 ${framework.color}`}>{framework.status}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {framework.languages.map((lang) => (
                  <span key={lang} className="px-2 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* How It Works */}
      <FeatureSection
        title="How It Works"
        description="From QUALYX to your codebase in seconds"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Select Tests",
              description: "Choose individual tests or entire suites to export from the QUALYX dashboard."
            },
            {
              step: "02",
              title: "Configure Options",
              description: "Select framework, language, and structure preferences (flat or Page Object Model)."
            },
            {
              step: "03",
              title: "Download & Run",
              description: "Download generated code and run it with standard test runners. No dependencies on QUALYX."
            }
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6">
                <span className="text-2xl font-bold text-primary">{item.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </FeatureSection>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-3xl mx-auto">
          <Testimonial
            quote="We use QUALYX for rapid test creation and then export to Playwright for our CI/CD pipeline. Best of both worlds — speed and control."
            author="James Wilson"
            role="DevOps Lead"
            company="BuildFast"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Your tests. Your code. Your choice.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            No vendor lock-in. Export anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#waitlist">
              <Button variant="hero" size="lg" className="group">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default ExportableCode;

import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Link2, ArrowRight } from "lucide-react";
import { FeaturePageLayout } from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { SEOHead, generateArticleSchema, generateBreadcrumbSchema } from "@/components/SEOHead";
import { useToast } from "@/hooks/use-toast";

// Blog posts data - same as in Blog.tsx
const blogPosts = [
  {
    id: "introducing-qualyx-autonomous-qa",
    title: "Introducing QUALYX: The Future of Autonomous QA-as-a-Service",
    excerpt: "Discover how QUALYX is revolutionizing quality assurance with AI-powered autonomous testing, self-healing capabilities, and enterprise-grade security.",
    content: `
## The QA Revolution is Here

QUALYX represents the next evolution in software quality assurance. By leveraging advanced AI and machine learning, we've created a platform that doesn't just run tests – it thinks, adapts, and improves continuously.

### Why We Built QUALYX

Every engineering team faces the same challenges:
- **Flaky tests** that waste hours of debugging time
- **Broken selectors** after every UI change
- **Manual test maintenance** that slows down releases
- **Limited test coverage** due to time constraints

We experienced these problems firsthand at enterprise scale. That's why we built QUALYX – an autonomous QA platform that eliminates these pain points entirely.

### What Makes QUALYX Different

**1. AI-Powered Test Generation**
Our AI analyzes your application and automatically generates comprehensive test suites. No more writing tests from scratch – QUALYX understands your user flows and creates tests that cover critical paths.

**2. Self-Healing Automation**
When your UI changes, QUALYX adapts. Our intelligent selectors automatically update when elements move or change, eliminating the #1 cause of test failures.

**3. Session Replay Debugging**
Every test failure comes with a complete session replay. See exactly what happened before, during, and after the failure – no more guessing games.

**4. Hybrid Execution**
Run tests in our cloud or on your own infrastructure. Perfect for security-conscious organizations that need flexibility without compromise.

### Join the Beta

We're launching our beta program for select teams. Join the waitlist to get early access and help shape the future of autonomous QA.
    `,
    date: "January 8, 2025",
    readTime: "5 min",
    category: "Announcements",
    author: "QUALYX Team",
    authorRole: "Product Team",
    featured: true,
    keywords: ["QUALYX launch", "autonomous QA", "AI testing platform", "QA as a Service"]
  },
  {
    id: "true-cost-of-flaky-tests",
    title: "The True Cost of Flaky Tests: Why Your Team is Losing 30% Productivity",
    excerpt: "Flaky tests cost engineering teams billions annually. Learn how to identify, measure, and eliminate test flakiness with AI-powered solutions.",
    content: `
## The Hidden Productivity Killer

Flaky tests are the silent killer of engineering productivity. Research shows that teams spend up to 30% of their time investigating and fixing flaky tests – time that could be spent building features.

### What is a Flaky Test?

A flaky test is a test that passes and fails intermittently without any changes to the code. They're frustrating, time-consuming, and erosive to team confidence in the test suite.

### The Real Costs

**Direct Costs:**
- Engineer time spent investigating false failures
- Re-running test suites multiple times
- Delayed releases waiting for "one more run"

**Indirect Costs:**
- Loss of trust in the test suite
- Tests disabled or ignored
- Bugs shipped to production

### Common Causes

1. **Timing issues** - Race conditions and async operations
2. **Test order dependencies** - Tests that rely on shared state
3. **Environment differences** - Local vs CI environments
4. **Brittle selectors** - CSS changes breaking locators

### How QUALYX Eliminates Flakiness

Our AI-powered platform addresses flakiness at multiple levels:

- **Smart waits** that adapt to your application's behavior
- **Isolated test execution** that prevents cross-contamination
- **Self-healing selectors** that survive UI changes
- **Flakiness detection** that identifies and quarantines unstable tests

### Measuring Your Flakiness

Start by calculating your flakiness rate:

\`\`\`
Flakiness Rate = (Flaky Test Runs / Total Test Runs) × 100
\`\`\`

A healthy suite should have less than 1% flakiness. If you're above 5%, you have a serious problem.
    `,
    date: "January 5, 2025",
    readTime: "8 min",
    category: "Engineering",
    author: "Sarah Chen",
    authorRole: "Senior Engineer",
    featured: false,
    keywords: ["flaky tests", "test maintenance", "engineering productivity", "self-healing tests"]
  },
  {
    id: "self-healing-tests-ai-automation",
    title: "Self-Healing Tests: How AI Keeps Your Test Suite Running 24/7",
    excerpt: "A deep dive into QUALYX's revolutionary self-healing selector technology that automatically repairs broken tests when your UI changes.",
    content: `
## The Maintenance Problem

Traditional test automation has a fundamental flaw: tests break constantly. Every CSS refactor, every component update, every design change means hours of test maintenance.

### Why Tests Break

The root cause is **brittle selectors**. Traditional approaches rely on:
- CSS selectors that change with styling
- XPath expressions that break with DOM restructuring
- ID attributes that may not exist

### How Self-Healing Works

QUALYX's self-healing technology uses multiple strategies:

**1. Multi-Attribute Matching**
Instead of relying on a single selector, we capture multiple attributes:
- Text content
- ARIA labels
- Data attributes
- Visual position
- Surrounding context

**2. AI-Powered Recognition**
When an element can't be found with the original selector, our AI:
- Analyzes the page structure
- Identifies likely candidates
- Validates using visual and semantic matching
- Updates the selector automatically

**3. Confidence Scoring**
Each healed selector receives a confidence score. Low-confidence heals are flagged for human review.

### Real-World Results

Teams using QUALYX self-healing report:
- **90% reduction** in maintenance time
- **99.9% selector stability** across deployments
- **Zero false failures** from UI changes

### Best Practices

Even with self-healing, follow these practices:
1. Use semantic selectors when possible (data-testid)
2. Keep tests focused and atomic
3. Review healed selectors periodically
4. Maintain a clean component hierarchy
    `,
    date: "January 2, 2025",
    readTime: "6 min",
    category: "Technology",
    author: "Mike Johnson",
    authorRole: "Tech Lead",
    featured: false,
    keywords: ["self-healing tests", "AI automation", "test selectors", "Playwright", "Selenium"]
  },
  {
    id: "hybrid-test-execution-enterprise",
    title: "Hybrid Test Execution: Why Enterprises Need Both Cloud and On-Premise Testing",
    excerpt: "Security-conscious organizations need testing flexibility. Learn how hybrid execution provides the best of both worlds.",
    content: `
## The Enterprise Dilemma

Enterprise teams face a difficult choice:
- **Cloud testing** offers convenience and scalability
- **On-premise testing** provides security and compliance

But why choose? Hybrid execution gives you both.

### When Cloud Isn't Enough

Many organizations can't use cloud-only solutions due to:
- **Data privacy regulations** (GDPR, HIPAA, SOC 2)
- **Network isolation** requirements
- **Sensitive data** that can't leave the network
- **Air-gapped environments** with no internet access

### The Hybrid Architecture

QUALYX's hybrid model works like this:

1. **Cloud Dashboard** - Central management and analytics
2. **On-Prem Runners** - Test execution in your environment
3. **Encrypted Communication** - Secure tunnel between components
4. **Local Data Processing** - Sensitive data never leaves your network

### Security Features

- End-to-end encryption for all communications
- No test data stored in the cloud
- SSO integration with your identity provider
- Audit logs for compliance

### Implementation Guide

Getting started with hybrid execution:

1. **Deploy the Runner** - Docker or Kubernetes
2. **Configure Authentication** - API keys or SSO
3. **Set Execution Rules** - Which tests run where
4. **Monitor Performance** - Compare cloud vs on-prem

### Cost Considerations

Hybrid execution can actually reduce costs:
- Lower cloud compute usage
- Faster test execution on local networks
- Reduced data transfer fees
    `,
    date: "December 28, 2024",
    readTime: "7 min",
    category: "Enterprise",
    author: "Lisa Wang",
    authorRole: "Enterprise Architect",
    featured: false,
    keywords: ["hybrid testing", "on-premise testing", "cloud testing", "enterprise security", "SOC 2"]
  },
  {
    id: "playwright-vs-selenium-2025",
    title: "Playwright vs Selenium in 2025: Which Test Framework Should You Choose?",
    excerpt: "An in-depth comparison of Playwright and Selenium for modern web testing, with expert recommendations for different use cases.",
    content: `
## The Testing Landscape in 2025

The battle between Playwright and Selenium continues, but the landscape has evolved significantly. Here's our comprehensive comparison for 2025.

### Playwright: The Modern Choice

**Strengths:**
- Native async/await support
- Built-in auto-waiting
- Cross-browser testing in one API
- Powerful debugging tools
- Faster execution

**Weaknesses:**
- Newer ecosystem, fewer resources
- Limited mobile support
- Smaller community (growing fast)

### Selenium: The Industry Standard

**Strengths:**
- Massive community and resources
- Wide language support
- Mature ecosystem
- Mobile testing via Appium
- Industry recognition

**Weaknesses:**
- Slower execution
- Manual wait management
- Complex setup for parallel testing
- Outdated architecture

### Performance Comparison

| Metric | Playwright | Selenium |
|--------|------------|----------|
| Execution Speed | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Setup Complexity | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Debugging Tools | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Community Size | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Mobile Support | ⭐⭐ | ⭐⭐⭐⭐ |

### Our Recommendation

**Choose Playwright if:**
- Starting a new project
- Prioritizing developer experience
- Testing modern web applications
- Need fast CI/CD feedback

**Choose Selenium if:**
- Large existing test suite
- Need mobile testing
- Require specific language support
- Team has Selenium expertise

### QUALYX: Best of Both Worlds

With QUALYX, you don't have to choose. Our platform:
- Generates tests for both frameworks
- Exports clean, maintainable code
- Provides self-healing for either
- Lets you migrate gradually
    `,
    date: "December 22, 2024",
    readTime: "10 min",
    category: "Guides",
    author: "Alex Kumar",
    authorRole: "QA Architect",
    featured: false,
    keywords: ["Playwright", "Selenium", "test automation comparison", "web testing frameworks", "browser automation"]
  }
];

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const article = blogPosts.find(post => post.id === slug);
  
  if (!article) {
    return (
      <FeaturePageLayout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/resources/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </FeaturePageLayout>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(post => post.category === article.category && post.id !== article.id)
    .slice(0, 3);

  // If not enough related by category, add others
  if (relatedPosts.length < 3) {
    const otherPosts = blogPosts
      .filter(post => post.id !== article.id && !relatedPosts.includes(post))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...otherPosts);
  }

  const shareUrl = `https://qualyx.com/blog/${article.id}`;
  const shareText = `${article.title} - QUALYX Blog`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Article link copied to clipboard",
    });
  };

  return (
    <FeaturePageLayout>
      <SEOHead
        title={`${article.title} | QUALYX Blog`}
        description={article.excerpt}
        canonicalPath={`/blog/${article.id}`}
        keywords={article.keywords.join(", ")}
        ogType="article"
        structuredData={[
          generateArticleSchema({
            title: article.title,
            description: article.excerpt,
            datePublished: new Date(article.date).toISOString(),
            author: article.author
          }),
          generateBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/resources/blog" },
            { name: article.title, url: `/blog/${article.id}` }
          ])
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <Link 
          to="/resources/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">{article.author}</div>
                <div className="text-xs">{article.authorRole}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime} read
            </div>
          </div>
        </header>

        {/* Social Sharing */}
        <div className="flex items-center gap-4 mb-12 p-4 rounded-xl bg-muted/30 border border-border/50">
          <Share2 className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Share this article:</span>
          <div className="flex items-center gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-background hover:bg-primary/10 transition-colors"
              aria-label="Copy link"
            >
              <Link2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ 
              __html: article.content
                .replace(/^## /gm, '<h2 class="text-2xl font-bold mt-10 mb-4 text-foreground">')
                .replace(/^### /gm, '<h3 class="text-xl font-semibold mt-8 mb-3 text-foreground">')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-4">')
                .replace(/^- /gm, '<li class="text-muted-foreground ml-4">')
                .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted/50 p-4 rounded-lg overflow-x-auto my-6"><code>$1</code></pre>')
                .replace(/\n/g, '<br/>')
            }}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-border">
          {article.keywords.map((keyword) => (
            <span 
              key={keyword}
              className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group p-4 rounded-xl border border-border/50 hover:border-primary/40 transition-all"
                >
                  <span className="text-xs text-primary font-medium">{post.category}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to Transform Your QA?</h2>
          <p className="text-muted-foreground mb-6">Join the waitlist and be among the first to experience autonomous testing.</p>
          <Link to="/auth">
            <Button variant="default" size="lg" className="group">
              Join Waitlist
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </section>
      </article>
    </FeaturePageLayout>
  );
};

export default BlogArticle;

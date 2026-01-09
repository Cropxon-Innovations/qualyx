import { Calendar, Clock, ArrowRight, User, ExternalLink, BookOpen, Sparkles } from "lucide-react";
import { FeaturePageLayout, FeatureHero, FeatureSection, StatCard } from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEOHead, generateArticleSchema } from "@/components/SEOHead";

// Comprehensive blog posts with SEO-optimized content
const blogPosts = [
  {
    id: "introducing-qualyx-autonomous-qa",
    title: "Introducing QUALYX: The Future of Autonomous QA-as-a-Service",
    excerpt: "Discover how QUALYX is revolutionizing quality assurance with AI-powered autonomous testing, self-healing capabilities, and enterprise-grade security.",
    content: "QUALYX represents the next evolution in software quality assurance. By leveraging advanced AI and machine learning, we've created a platform that doesn't just run tests – it thinks, adapts, and improves continuously.",
    date: "January 8, 2025",
    readTime: "5 min",
    category: "Announcements",
    author: "QUALYX Team",
    featured: true,
    keywords: ["QUALYX launch", "autonomous QA", "AI testing platform", "QA as a Service"]
  },
  {
    id: "true-cost-of-flaky-tests",
    title: "The True Cost of Flaky Tests: Why Your Team is Losing 30% Productivity",
    excerpt: "Flaky tests cost engineering teams billions annually. Learn how to identify, measure, and eliminate test flakiness with AI-powered solutions.",
    content: "Research shows that flaky tests consume up to 30% of engineering time. Teams spend countless hours investigating false failures, re-running tests, and questioning their own code. QUALYX's self-healing technology eliminates this waste.",
    date: "January 5, 2025",
    readTime: "8 min",
    category: "Engineering",
    author: "Sarah Chen",
    featured: false,
    keywords: ["flaky tests", "test maintenance", "engineering productivity", "self-healing tests"]
  },
  {
    id: "self-healing-tests-ai-automation",
    title: "Self-Healing Tests: How AI Keeps Your Test Suite Running 24/7",
    excerpt: "A deep dive into QUALYX's revolutionary self-healing selector technology that automatically repairs broken tests when your UI changes.",
    content: "Traditional test automation breaks constantly. Every CSS change, every UI refactor, every new deployment means hours of test maintenance. QUALYX's AI-powered self-healing changes everything.",
    date: "January 2, 2025",
    readTime: "6 min",
    category: "Technology",
    author: "Mike Johnson",
    featured: false,
    keywords: ["self-healing tests", "AI automation", "test selectors", "Playwright", "Selenium"]
  },
  {
    id: "hybrid-test-execution-enterprise",
    title: "Hybrid Test Execution: Why Enterprises Need Both Cloud and On-Premise Testing",
    excerpt: "Security-conscious organizations need testing flexibility. Learn how hybrid execution provides the best of both worlds.",
    content: "Enterprise teams face a dilemma: cloud testing offers convenience, but sensitive data requires on-premise execution. QUALYX's hybrid architecture solves this with encrypted runners that work anywhere.",
    date: "December 28, 2024",
    readTime: "7 min",
    category: "Enterprise",
    author: "Lisa Wang",
    featured: false,
    keywords: ["hybrid testing", "on-premise testing", "cloud testing", "enterprise security", "SOC 2"]
  },
  {
    id: "playwright-vs-selenium-2025",
    title: "Playwright vs Selenium in 2025: Which Test Framework Should You Choose?",
    excerpt: "An in-depth comparison of Playwright and Selenium for modern web testing, with expert recommendations for different use cases.",
    content: "The testing landscape has evolved dramatically. While Selenium remains the industry standard, Playwright offers compelling advantages for modern web applications. QUALYX supports both, letting you choose the best tool for each project.",
    date: "December 22, 2024",
    readTime: "10 min",
    category: "Guides",
    author: "Alex Kumar",
    featured: false,
    keywords: ["Playwright", "Selenium", "test automation comparison", "web testing frameworks", "browser automation"]
  },
  {
    id: "ai-test-generation-complete-guide",
    title: "AI Test Generation: The Complete Guide to Automated Test Creation",
    excerpt: "How AI analyzes your application to generate comprehensive test suites automatically, saving weeks of manual test writing.",
    content: "Writing tests manually is time-consuming and error-prone. AI test generation analyzes your application's structure, user flows, and edge cases to create comprehensive test coverage in minutes.",
    date: "December 18, 2024",
    readTime: "12 min",
    category: "Guides",
    author: "Dr. Emily Roberts",
    featured: false,
    keywords: ["AI test generation", "automated testing", "test coverage", "machine learning QA"]
  },
  {
    id: "session-replay-debugging",
    title: "Session Replay for Test Debugging: Watch Exactly What Went Wrong",
    excerpt: "Time-travel debugging for your tests. See exactly what happened before, during, and after every test failure.",
    content: "Traditional test logs leave you guessing. Session replay shows you exactly what the user saw, every DOM change, every network request, every console error. Debug in minutes, not hours.",
    date: "December 12, 2024",
    readTime: "6 min",
    category: "Technology",
    author: "Chris Taylor",
    featured: false,
    keywords: ["session replay", "test debugging", "time-travel debugging", "DOM recording"]
  },
  {
    id: "cicd-testing-best-practices",
    title: "CI/CD Testing Best Practices: Integrating QUALYX with GitHub Actions, Jenkins, and GitLab",
    excerpt: "Step-by-step guide to integrating autonomous testing into your CI/CD pipeline for faster, more reliable deployments.",
    content: "Continuous integration without continuous testing is a recipe for production bugs. Learn how to integrate QUALYX into your existing pipelines for shift-left testing that catches bugs before they reach production.",
    date: "December 8, 2024",
    readTime: "9 min",
    category: "DevOps",
    author: "Jordan Martinez",
    featured: false,
    keywords: ["CI/CD testing", "GitHub Actions", "Jenkins", "GitLab CI", "shift-left testing", "DevOps"]
  },
  {
    id: "api-testing-automation-guide",
    title: "API Testing Automation: REST, GraphQL, and Beyond",
    excerpt: "Master API testing with comprehensive automation strategies for REST and GraphQL endpoints.",
    content: "APIs are the backbone of modern applications. Ensuring they work correctly under all conditions is critical. QUALYX's API automation handles REST, GraphQL, and WebSocket testing with ease.",
    date: "December 1, 2024",
    readTime: "8 min",
    category: "Guides",
    author: "Nina Patel",
    featured: false,
    keywords: ["API testing", "REST API", "GraphQL testing", "API automation", "endpoint testing"]
  },
  {
    id: "test-analytics-metrics-that-matter",
    title: "Test Analytics: The Metrics That Actually Matter for QA Teams",
    excerpt: "Beyond pass/fail rates: Learn which test metrics drive real quality improvements and how to track them.",
    content: "Not all test metrics are created equal. While pass rates get attention, metrics like test stability, execution time trends, and coverage gaps tell the real story of your test suite's health.",
    date: "November 25, 2024",
    readTime: "7 min",
    category: "Analytics",
    author: "David Kim",
    featured: false,
    keywords: ["test analytics", "QA metrics", "test coverage", "quality metrics", "testing KPIs"]
  }
];

const categories = [
  { name: "All", count: blogPosts.length },
  { name: "Announcements", count: blogPosts.filter(p => p.category === "Announcements").length },
  { name: "Technology", count: blogPosts.filter(p => p.category === "Technology").length },
  { name: "Guides", count: blogPosts.filter(p => p.category === "Guides").length },
  { name: "Engineering", count: blogPosts.filter(p => p.category === "Engineering").length },
  { name: "Enterprise", count: blogPosts.filter(p => p.category === "Enterprise").length },
  { name: "DevOps", count: blogPosts.filter(p => p.category === "DevOps").length },
  { name: "Analytics", count: blogPosts.filter(p => p.category === "Analytics").length },
];

// External resources section
const externalResources = [
  {
    name: "Stackcraft Blog",
    description: "Explore more insights on software development, DevOps, and engineering best practices.",
    url: "https://blog.stackcraft.io/overview",
    icon: BookOpen,
  }
];

const Blog = () => {
  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter(p => !p.featured);

  // Generate article structured data for SEO
  const articlesSchema = blogPosts.slice(0, 5).map(post => 
    generateArticleSchema({
      title: post.title,
      description: post.excerpt,
      datePublished: new Date(post.date).toISOString(),
      author: post.author
    })
  );

  return (
    <FeaturePageLayout>
      <SEOHead
        title="QA Automation Blog | QUALYX - AI Testing Insights & Guides"
        description="Expert insights on QA automation, AI-powered testing, self-healing tests, Playwright, Selenium, and software quality. Learn from the QUALYX team and industry experts."
        canonicalPath="/resources/blog"
        keywords="QA automation blog, AI testing articles, software testing guides, Playwright tutorials, Selenium best practices, test automation insights, self-healing tests, CI/CD testing"
        structuredData={articlesSchema}
      />

      <FeatureHero 
        badge="Insights" 
        subtitle="Resources" 
        title="QUALYX Blog" 
        description="Expert insights on QA automation, AI-powered testing, and software quality from the QUALYX team and industry leaders."
        primaryCta={{ label: "Subscribe", href: "#subscribe" }} 
        secondaryCta={{ label: "Join Waitlist", href: "/auth" }}
      >
        {/* Featured Post Card */}
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded">FEATURED</span>
            <span className="text-xs text-muted-foreground">{featuredPost.category}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground">{featuredPost.title}</h3>
          <p className="text-sm text-muted-foreground">{featuredPost.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featuredPost.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featuredPost.readTime}</span>
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{featuredPost.author}</span>
          </div>
        </div>
      </FeatureHero>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value={`${blogPosts.length}+`} label="Articles" />
          <StatCard value="15K+" label="Monthly Readers" />
          <StatCard value="Weekly" label="New Content" />
          <StatCard value={`${categories.length - 1}`} label="Categories" />
        </div>
      </section>

      {/* External Resources - Stackcraft */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Partner Resources</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {externalResources.map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-2xl border border-border/40 bg-card/50 hover:border-primary/40 hover:bg-card/80 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <resource.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {resource.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat.name === "All" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <FeatureSection title="Latest Articles" description="Stay up to date with QA automation trends and best practices">
        <div className="grid md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <article 
              key={post.id} 
              className="group p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                  {post.category}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" />{post.author}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Read more 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              {/* SEO keywords hidden for screen readers */}
              <div className="sr-only">
                Keywords: {post.keywords.join(", ")}
              </div>
            </article>
          ))}
        </div>
      </FeatureSection>

      {/* Topics We Cover */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Topics We Cover</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "AI-Powered Testing",
              "Self-Healing Tests",
              "Test Automation",
              "Playwright & Selenium",
              "CI/CD Integration",
              "API Testing",
              "Visual Testing",
              "Performance Testing",
              "Mobile Testing",
              "Security Testing",
              "Test Analytics",
              "DevOps & QA"
            ].map((topic) => (
              <div key={topic} className="p-4 rounded-lg bg-card/50 border border-border/30 text-center hover:border-primary/40 transition-colors">
                <span className="text-sm font-medium text-foreground">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section id="subscribe" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="gradient-text-white">Stay in the Loop</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest articles on QA automation, AI testing, and software quality delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group">
                Join Waitlist for Updates
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="https://blog.stackcraft.io/overview" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="group">
                Visit Stackcraft Blog
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Blog;

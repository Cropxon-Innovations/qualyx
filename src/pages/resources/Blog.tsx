import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowRight, Tag, User } from "lucide-react";
import { FeaturePageLayout, FeatureHero, FeatureSection, StatCard } from "@/components/FeaturePageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  { title: "Introducing QUALYX: Autonomous QA for the Modern Era", excerpt: "Learn how AI-powered testing is transforming quality assurance.", date: "December 15, 2024", readTime: "5 min", category: "Announcements", author: "QUALYX Team" },
  { title: "The True Cost of Flaky Tests", excerpt: "How flaky tests impact developer productivity and what you can do.", date: "December 10, 2024", readTime: "8 min", category: "Engineering", author: "Sarah Chen" },
  { title: "Self-Healing Tests: How AI Keeps Your Tests Running", excerpt: "A deep dive into QUALYX's self-healing selectors.", date: "December 5, 2024", readTime: "6 min", category: "Technology", author: "Mike Johnson" },
  { title: "Hybrid Test Execution: Security Meets Convenience", excerpt: "Why enterprises are adopting hybrid test execution.", date: "November 28, 2024", readTime: "7 min", category: "Enterprise", author: "Lisa Wang" },
];

const Blog = () => {
  return (
    <FeaturePageLayout>
      <Helmet>
        <title>Blog - QUALYX</title>
        <meta name="description" content="Latest updates, insights, and technical deep-dives from the QUALYX team." />
      </Helmet>

      <FeatureHero badge="Insights" subtitle="Resources" title="QUALYX Blog" description="Insights, updates, and technical deep-dives from the QUALYX team." primaryCta={{ label: "Subscribe", href: "#subscribe" }} secondaryCta={{ label: "RSS Feed", href: "/rss" }}>
        <div className="relative rounded-2xl border border-border/50 bg-card/30 backdrop-blur-xl overflow-hidden shadow-2xl p-6 space-y-4">
          <div className="text-xs text-primary font-medium">LATEST POST</div>
          <h3 className="text-lg font-bold text-foreground">{blogPosts[0].title}</h3>
          <p className="text-sm text-muted-foreground">{blogPosts[0].excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{blogPosts[0].date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blogPosts[0].readTime}</span>
          </div>
        </div>
      </FeatureHero>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="50+" label="Articles" />
          <StatCard value="10K+" label="Readers" />
          <StatCard value="Weekly" label="Updates" />
          <StatCard value="5" label="Categories" />
        </div>
      </section>

      <FeatureSection title="Latest Articles" description="Stay up to date with QUALYX">
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <article key={post.title} className="group p-6 rounded-2xl border border-border/40 bg-card/30 hover:border-primary/40 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">{post.category}</span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </article>
          ))}
        </div>
      </FeatureSection>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6"><span className="gradient-text-white">Stay in the loop</span></h2>
          <p className="text-lg text-muted-foreground mb-8">Get the latest articles delivered to your inbox.</p>
          <Link to="/#waitlist"><Button variant="hero" size="lg" className="group">Subscribe<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></Button></Link>
        </div>
      </section>
    </FeaturePageLayout>
  );
};

export default Blog;

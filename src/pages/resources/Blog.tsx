import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocPage, DocSection } from "@/components/docs/DocPage";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "Introducing QUALYX: Autonomous QA for the Modern Era",
    excerpt: "Learn how AI-powered testing is transforming quality assurance for engineering teams.",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Announcements",
  },
  {
    title: "The True Cost of Flaky Tests",
    excerpt: "How flaky tests impact developer productivity and what you can do about it.",
    date: "December 10, 2024",
    readTime: "8 min read",
    category: "Engineering",
  },
  {
    title: "Self-Healing Tests: How AI Keeps Your Tests Running",
    excerpt: "A deep dive into the technology behind QUALYX's self-healing selectors.",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Technology",
  },
  {
    title: "Hybrid Test Execution: Security Meets Convenience",
    excerpt: "Why enterprises are adopting hybrid test execution architectures.",
    date: "November 28, 2024",
    readTime: "7 min read",
    category: "Enterprise",
  },
];

const Blog = () => {
  return (
    <DocsLayout>
      <Helmet>
        <title>Blog - QUALYX</title>
        <meta name="description" content="Latest updates, insights, and technical deep-dives from the QUALYX team." />
      </Helmet>

      <DocPage
        title="Blog"
        description="Insights, updates, and technical deep-dives from the QUALYX team."
        breadcrumbs={[
          { label: "Resources", href: "/resources/blog" },
          { label: "Blog" },
        ]}
      >
        <DocSection>
          <div className="space-y-6 not-prose">
            {blogPosts.map((post) => (
              <article key={post.title} className="glass-card p-6 rounded-xl hover:border-primary/30 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                  Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </article>
            ))}
          </div>
        </DocSection>
      </DocPage>
    </DocsLayout>
  );
};

export default Blog;

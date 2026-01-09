import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const defaultKeywords = [
  "QUALYX",
  "QA as a Service",
  "QAAS",
  "autonomous QA",
  "AI-powered testing",
  "test automation",
  "self-healing tests",
  "session replay",
  "Playwright",
  "Selenium",
  "API testing",
  "UI testing",
  "end-to-end testing",
  "E2E testing",
  "automated testing platform",
  "CI/CD testing",
  "quality assurance",
  "software testing",
  "test maintenance",
  "flaky tests",
  "test analytics",
  "hybrid test execution",
  "cloud testing",
  "on-premise testing",
  "enterprise QA",
  "Cropxon Innovations",
].join(", ");

// Organization structured data for AI search engines
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QUALYX",
  "alternateName": ["QUALYX QAAS", "Qualyx Platform"],
  "url": "https://qualyx.com",
  "logo": "https://qualyx.com/og-image.png",
  "description": "QUALYX is the world's first Autonomous QA-as-a-Service (QAAS) platform. AI-powered test automation with self-healing tests, session replay, and hybrid execution.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Organization",
    "name": "Cropxon Innovations Pvt. Ltd.",
    "url": "https://cropxon.com"
  },
  "parentOrganization": {
    "@type": "Organization",
    "name": "Cropxon Innovations Pvt. Ltd.",
    "url": "https://cropxon.com"
  },
  "sameAs": [
    "https://twitter.com/qualyx",
    "https://linkedin.com/company/qualyx",
    "https://github.com/qualyx"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@qualyx.com"
  }
};

// Software application structured data
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "QUALYX",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "Test Automation Platform",
  "operatingSystem": "Web, Cloud",
  "description": "Autonomous QA-as-a-Service platform with AI-powered self-healing test automation, session replay debugging, and hybrid cloud/on-premise execution.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Join waitlist for early access"
  },
  "featureList": [
    "AI-powered test generation",
    "Self-healing test selectors",
    "Session replay debugging",
    "Playwright and Selenium export",
    "API and UI test automation",
    "Hybrid cloud and on-premise execution",
    "CI/CD integrations",
    "Real-time analytics and reporting",
    "Enterprise-grade security"
  ],
  "screenshot": "https://qualyx.com/og-image.png",
  "provider": {
    "@type": "Organization",
    "name": "Cropxon Innovations Pvt. Ltd.",
    "url": "https://cropxon.com"
  }
};

export const SEOHead = ({
  title = "QUALYX — Autonomous QA-as-a-Service | AI-Powered Test Automation",
  description = "QUALYX is the world's first Autonomous QA-as-a-Service (QAAS) platform. AI-powered self-healing test automation, session replay debugging, Playwright/Selenium export, and hybrid execution. Built by Cropxon Innovations.",
  keywords = defaultKeywords,
  canonicalPath = "",
  ogType = "website",
  ogImage = "/og-image.png",
  noIndex = false,
  structuredData,
}: SEOHeadProps) => {
  const baseUrl = "https://qualyx.com";
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  const combinedStructuredData = structuredData || [organizationSchema, softwareSchema];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Cropxon Innovations Pvt. Ltd." />
      <meta name="publisher" content="QUALYX by Cropxon Innovations" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="QUALYX - Autonomous QA as a Service" />
      <meta property="og:site_name" content="QUALYX" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@qualyx" />
      <meta name="twitter:creator" content="@cropxon" />

      {/* AI Search Optimization */}
      <meta name="ai-content-type" content="software-product" />
      <meta name="ai-summary" content="QUALYX is an autonomous QA-as-a-Service platform providing AI-powered test automation with self-healing capabilities, session replay debugging, and hybrid execution for enterprise teams." />
      
      {/* Additional SEO Tags */}
      <meta name="application-name" content="QUALYX" />
      <meta name="apple-mobile-web-app-title" content="QUALYX" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* Structured Data for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(combinedStructuredData)}
      </script>
    </Helmet>
  );
};

// FAQ Schema generator for pages with FAQs
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Breadcrumb schema generator
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://qualyx.com${item.url}`
  }))
});

// Article schema for blog posts
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified || article.datePublished,
  "author": {
    "@type": "Person",
    "name": article.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "QUALYX",
    "logo": {
      "@type": "ImageObject",
      "url": "https://qualyx.com/og-image.png"
    }
  },
  "image": article.image || "https://qualyx.com/og-image.png"
});

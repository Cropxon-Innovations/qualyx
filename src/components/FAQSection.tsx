import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is QUALYX?",
    answer: "QUALYX is the world's first Autonomous QA-as-a-Service (QAAS) platform. It provides AI-powered test automation with self-healing capabilities, session replay debugging, and hybrid execution for enterprise teams. Built by Cropxon Innovations, QUALYX helps teams ship faster with confidence."
  },
  {
    question: "How does QUALYX self-healing work?",
    answer: "QUALYX uses advanced AI to automatically detect when your application's UI changes break test selectors. It then analyzes the DOM structure, visual context, and historical patterns to repair broken selectors without manual intervention, reducing test maintenance by up to 90%."
  },
  {
    question: "Can I export tests to Playwright or Selenium?",
    answer: "Yes! QUALYX generates clean, maintainable Playwright (Python) scripts that you fully own. You can export your tests anytime and run them anywhere — there's zero vendor lock-in. Your code belongs to you."
  },
  {
    question: "What is hybrid execution?",
    answer: "Hybrid execution means you can run tests both in the cloud and on-premise. Your sensitive test data and credentials stay within your network via our outbound-only runner, while you maintain full visibility and orchestration from our cloud dashboard."
  },
  {
    question: "Is QUALYX suitable for enterprise teams?",
    answer: "Absolutely. QUALYX is built enterprise-first with features like RBAC (Role-Based Access Control), SSO integration, comprehensive audit logs, and SOC 2 compliance readiness. Our hybrid architecture ensures your data never leaves your network when needed."
  },
  {
    question: "How is QUALYX different from Selenium or Cypress?",
    answer: "Unlike traditional frameworks that require extensive scripting and maintenance, QUALYX is an autonomous platform. You record user flows, and our AI generates, maintains, and heals tests automatically. We handle the complexity so you can focus on building."
  },
  {
    question: "What's included in QA-as-a-Service?",
    answer: "QA-as-a-Service means QUALYX operates like a dedicated QA team without the hiring overhead. You get continuous test monitoring, automatic test generation from user flows, self-healing maintenance, 24/7 execution, and detailed reports — all managed by our autonomous platform."
  },
  {
    question: "How do I get started with QUALYX?",
    answer: "Join our waitlist to get early access! Once approved, you'll be able to install our browser extension, record your first user flow, and watch QUALYX automatically generate and execute your tests within minutes."
  }
];

// Generate structured data for SEO
export const generateFAQStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
};

interface FAQItemComponentProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItemComponent = ({ item, isOpen, onToggle, index }: FAQItemComponentProps) => {
  return (
    <div 
      className={cn(
        "border border-border/30 rounded-lg overflow-hidden transition-all duration-300",
        isOpen ? "bg-card/50 border-primary/30" : "bg-card/20 hover:border-border/50"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={cn(
          "text-sm md:text-base font-medium transition-colors duration-200",
          isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
        )}>
          {item.question}
        </span>
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4",
            isOpen && "rotate-180 text-primary"
          )}
        />
      </button>
      
      <div 
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg-subtle opacity-5" />
      
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-secondary/6 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-medium">Have Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">
            <span className="gradient-text-white">Frequently Asked Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground/70 max-w-xl mx-auto">
            Everything you need to know about QUALYX and autonomous QA
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <FAQItemComponent
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a 
              href="/company/contact" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Contact our team
            </a>
          </p>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQStructuredData())
        }}
      />
    </section>
  );
};

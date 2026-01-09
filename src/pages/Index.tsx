import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { TimelineSection } from "@/components/TimelineSection";
import { TrustSection } from "@/components/TrustSection";
import { HybridSection } from "@/components/HybridSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { QaAsServiceSection } from "@/components/QaAsServiceSection";
import { TestPreviewSimulation } from "@/components/TestPreviewSimulation";
import { ComparisonSection } from "@/components/ComparisonSection";
import { PricingSection } from "@/components/PricingSection";
import { WaitlistSection } from "@/components/WaitlistSection";
import { BrandMotionSection } from "@/components/BrandMotionSection";
import { InfographicSection } from "@/components/InfographicSection";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SEOHead, generateFAQSchema } from "@/components/SEOHead";

const homeFAQs = [
  { question: "What is QUALYX?", answer: "QUALYX is the world's first Autonomous QA-as-a-Service (QAAS) platform that provides AI-powered test automation with self-healing capabilities, session replay debugging, and hybrid execution for enterprise teams." },
  { question: "How does QUALYX self-healing work?", answer: "QUALYX uses AI to automatically detect and fix broken test selectors when your application changes, eliminating flaky tests and reducing maintenance by up to 90%." },
  { question: "Can I export tests to Playwright or Selenium?", answer: "Yes, QUALYX allows you to export your tests as clean, maintainable Playwright or Selenium scripts that you can run anywhere." },
  { question: "What is hybrid execution?", answer: "Hybrid execution means you can run tests both in the cloud and on-premise, giving you flexibility for security-sensitive applications while maintaining speed." },
  { question: "Who created QUALYX?", answer: "QUALYX is built by Cropxon Innovations Pvt. Ltd., a company focused on next-generation developer tools powered by AI." },
];

const Index = () => {
  return (
    <>
      <SEOHead 
        title="QUALYX — Autonomous QA-as-a-Service | AI-Powered Test Automation Platform"
        description="QUALYX is the world's first Autonomous QA-as-a-Service (QAAS) platform. AI-powered self-healing test automation, session replay debugging, Playwright/Selenium export, and hybrid execution. Built by Cropxon Innovations."
        canonicalPath="/"
        structuredData={generateFAQSchema(homeFAQs)}
      />

      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navigation />
        
        <main>
          <HeroSection />
          
          <ScrollReveal>
            <TimelineSection />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <TrustSection />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <HybridSection />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <CapabilitiesSection />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <QaAsServiceSection />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <TestPreviewSimulation />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <ComparisonSection />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <PricingSection />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <BrandMotionSection />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <InfographicSection />
          </ScrollReveal>
          
          <ScrollReveal delay={100}>
            <WaitlistSection />
          </ScrollReveal>
        </main>
        
        <ScrollReveal>
          <Footer />
        </ScrollReveal>
      </div>
    </>
  );
};

export default Index;
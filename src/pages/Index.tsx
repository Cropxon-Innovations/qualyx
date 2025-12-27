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
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>QUALYX — Autonomous QA-as-a-Service | AI-Powered Test Automation</title>
        <meta 
          name="description" 
          content="QUALYX delivers autonomous QA with AI-powered self-healing automation, session replay, hybrid execution, and enterprise security. Join the waitlist today." 
        />
        <meta name="keywords" content="QA automation, test automation, AI testing, self-healing tests, session replay, enterprise QA" />
        <meta property="og:title" content="QUALYX — Autonomous QA-as-a-Service" />
        <meta property="og:description" content="AI-powered, self-healing automation with session replay, hybrid execution, and enterprise security." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://qualyx.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main>
          <HeroSection />
          <TimelineSection />
          <TrustSection />
          <HybridSection />
          <CapabilitiesSection />
          <QaAsServiceSection />
          <TestPreviewSimulation />
          <ComparisonSection />
          <PricingSection />
          <WaitlistSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;

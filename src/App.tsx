import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

// Docs pages
import GettingStarted from "./pages/docs/GettingStarted";
import HybridRunner from "./pages/docs/HybridRunner";
import SDKGuide from "./pages/docs/SDKGuide";
import ExportScripts from "./pages/docs/ExportScripts";
import CICD from "./pages/docs/CICD";
import RecorderGuide from "./pages/docs/RecorderGuide";
import Troubleshooting from "./pages/docs/Troubleshooting";

// Product pages
import UIAutomation from "./pages/product/UIAutomation";
import APIAutomation from "./pages/product/APIAutomation";
import SessionReplay from "./pages/product/SessionReplay";
import AutoHealing from "./pages/product/AutoHealing";
import AITestEngine from "./pages/product/AITestEngine";
import Reports from "./pages/product/Reports";
import ExportableCode from "./pages/product/ExportableCode";

// Platform pages
import HybridExecution from "./pages/platform/HybridExecution";
import Security from "./pages/platform/Security";
import Integrations from "./pages/platform/Integrations";
import Architecture from "./pages/platform/Architecture";
import Runners from "./pages/platform/Runners";
import Observability from "./pages/platform/Observability";

// Resource pages
import Blog from "./pages/resources/Blog";
import CaseStudies from "./pages/resources/CaseStudies";
import Roadmap from "./pages/resources/Roadmap";
import Changelog from "./pages/resources/Changelog";
import ReleaseNotes from "./pages/resources/ReleaseNotes";

// Company pages
import About from "./pages/company/About";
import Careers from "./pages/company/Careers";
import Contact from "./pages/company/Contact";
import Partners from "./pages/company/Partners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demo" element={<Demo />} />
            
            {/* Docs */}
            <Route path="/docs/getting-started" element={<GettingStarted />} />
            <Route path="/docs/hybrid-runner" element={<HybridRunner />} />
            <Route path="/docs/sdk" element={<SDKGuide />} />
            <Route path="/docs/sdk-guide" element={<SDKGuide />} />
            <Route path="/docs/export-scripts" element={<ExportScripts />} />
            <Route path="/docs/cicd" element={<CICD />} />
            <Route path="/docs/recorder-guide" element={<RecorderGuide />} />
            <Route path="/docs/troubleshooting" element={<Troubleshooting />} />
            
            {/* Product */}
            <Route path="/product/ui-automation" element={<UIAutomation />} />
            <Route path="/product/api-automation" element={<APIAutomation />} />
            <Route path="/product/session-replay" element={<SessionReplay />} />
            <Route path="/product/auto-healing" element={<AutoHealing />} />
            <Route path="/product/ai-test-engine" element={<AITestEngine />} />
            <Route path="/product/reports" element={<Reports />} />
            <Route path="/product/exportable-code" element={<ExportableCode />} />
            
            {/* Platform */}
            <Route path="/platform/hybrid-execution" element={<HybridExecution />} />
            <Route path="/platform/security" element={<Security />} />
            <Route path="/platform/integrations" element={<Integrations />} />
            <Route path="/platform/architecture" element={<Architecture />} />
            <Route path="/platform/runners" element={<Runners />} />
            <Route path="/platform/observability" element={<Observability />} />
            
            {/* Resources */}
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/roadmap" element={<Roadmap />} />
            <Route path="/resources/changelog" element={<Changelog />} />
            <Route path="/resources/release-notes" element={<ReleaseNotes />} />
            
            {/* Company */}
            <Route path="/company/about" element={<About />} />
            <Route path="/company/careers" element={<Careers />} />
            <Route path="/company/contact" element={<Contact />} />
            <Route path="/company/partners" element={<Partners />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

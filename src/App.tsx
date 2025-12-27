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

// Console pages
import ConsoleDashboard from "./pages/console/ConsoleDashboard";
import RecordUITest from "./pages/console/create/RecordUITest";
import CreateAPITest from "./pages/console/create/CreateAPITest";
import SuitesBuilder from "./pages/console/create/SuitesBuilder";
import ImportScripts from "./pages/console/create/ImportScripts";
import SessionReplayPage from "./pages/console/analyze/SessionReplay";
import ReportsPage from "./pages/console/analyze/ReportsPage";
import FlakinessExplorer from "./pages/console/analyze/FlakinessExplorer";
import Logs from "./pages/console/analyze/Logs";
import Screenshots from "./pages/console/analyze/Screenshots";
import Trends from "./pages/console/analyze/Trends";
import RunCenter from "./pages/console/execute/RunCenter";
import RunnersPage from "./pages/console/execute/RunnersPage";
import SchedulesPage from "./pages/console/execute/SchedulesPage";
import CICDTriggersPage from "./pages/console/execute/CICDTriggersPage";
import ProjectsPage from "./pages/console/organize/ProjectsPage";
import SuitesPage from "./pages/console/organize/SuitesPage";
import DataSetsPage from "./pages/console/organize/DataSetsPage";
import EnvironmentsPage from "./pages/console/organize/EnvironmentsPage";
import Tags from "./pages/console/organize/Tags";
import Versions from "./pages/console/organize/Versions";
import AccessControl from "./pages/console/govern/AccessControl";
import SecretsVault from "./pages/console/govern/SecretsVault";
import LLMSettings from "./pages/console/govern/LLMSettings";
import AuditLogs from "./pages/console/govern/AuditLogs";
import SecurityPage from "./pages/console/govern/Security";
import UserJourneys from "./pages/console/discover/UserJourneys";
import CoverageMap from "./pages/console/discover/CoverageMap";
import Suggestions from "./pages/console/discover/Suggestions";
import IntegrationsPage from "./pages/console/IntegrationsPage";

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
            
            {/* Console - Discover */}
            <Route path="/console" element={<ConsoleDashboard />} />
            <Route path="/console/discover/journeys" element={<UserJourneys />} />
            <Route path="/console/discover/coverage" element={<CoverageMap />} />
            <Route path="/console/discover/suggestions" element={<Suggestions />} />
            
            {/* Console - Create */}
            <Route path="/console/create/record" element={<RecordUITest />} />
            <Route path="/console/create/api" element={<CreateAPITest />} />
            <Route path="/console/create/suites" element={<SuitesBuilder />} />
            <Route path="/console/create/import" element={<ImportScripts />} />
            
            {/* Console - Organize */}
            <Route path="/console/organize/projects" element={<ProjectsPage />} />
            <Route path="/console/organize/suites" element={<SuitesPage />} />
            <Route path="/console/organize/data" element={<DataSetsPage />} />
            <Route path="/console/organize/environments" element={<EnvironmentsPage />} />
            <Route path="/console/organize/tags" element={<Tags />} />
            <Route path="/console/organize/versions" element={<Versions />} />
            
            {/* Console - Execute */}
            <Route path="/console/execute/runs" element={<RunCenter />} />
            <Route path="/console/execute/schedules" element={<SchedulesPage />} />
            <Route path="/console/execute/runners" element={<RunnersPage />} />
            <Route path="/console/execute/cicd" element={<CICDTriggersPage />} />
            
            {/* Console - Analyze */}
            <Route path="/console/analyze/replay" element={<SessionReplayPage />} />
            <Route path="/console/analyze/logs" element={<Logs />} />
            <Route path="/console/analyze/screenshots" element={<Screenshots />} />
            <Route path="/console/analyze/reports" element={<ReportsPage />} />
            <Route path="/console/analyze/flakiness" element={<FlakinessExplorer />} />
            <Route path="/console/analyze/trends" element={<Trends />} />
            
            {/* Console - Govern */}
            <Route path="/console/govern/access" element={<AccessControl />} />
            <Route path="/console/govern/secrets" element={<SecretsVault />} />
            <Route path="/console/govern/llm" element={<LLMSettings />} />
            <Route path="/console/govern/audit" element={<AuditLogs />} />
            <Route path="/console/govern/security" element={<SecurityPage />} />
            
            <Route path="/console/integrations" element={<IntegrationsPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

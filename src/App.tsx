
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import MyPersona from "./pages/MyPersona";
import AllPersonas from "./pages/AllPersonas";
import PromptBuilder from "./pages/PromptBuilder";
import TrainingHub from "./pages/TrainingHub";
import ProjectPlanner from "./pages/ProjectPlanner";
import FeedbackTracker from "./pages/FeedbackTracker";
import AIReleases from "./pages/AIReleases";
import AIUsePolicyGenerator from "./pages/AIUsePolicyGenerator";
import LegalWorkflows from "./pages/LegalWorkflows";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/my-persona" element={<MyPersona />} />
          <Route path="/all-personas" element={<AllPersonas />} />
          <Route path="/prompt-builder" element={<PromptBuilder />} />
          <Route path="/training-hub" element={<TrainingHub />} />
          <Route path="/project-planner" element={<ProjectPlanner />} />
          <Route path="/feedback-tracker" element={<FeedbackTracker />} />
          <Route path="/ai-releases" element={<AIReleases />} />
          <Route path="/ai-use-policy-generator" element={<AIUsePolicyGenerator />} />
          <Route path="/legal-workflows" element={<LegalWorkflows />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

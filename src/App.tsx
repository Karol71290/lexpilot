
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import MyPersona from "./pages/MyPersona";
import AllPersonas from "./pages/AllPersonas";
import PromptBuilder from "./pages/PromptBuilder";
import TrainingHub from "./pages/TrainingHub";
import ProjectPlanner from "./pages/ProjectPlanner";
import FeedbackTracker from "./pages/FeedbackTracker";
import AIReleases from "./pages/AIReleases";
import AIUsePolicyGenerator from "./pages/AIUsePolicyGenerator";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/my-persona" element={<MyPersona />} />
          <Route path="/all-personas" element={<AllPersonas />} />
          <Route path="/prompt-builder" element={<PromptBuilder />} />
          <Route path="/training-hub" element={<TrainingHub />} />
          <Route path="/project-planner" element={<ProjectPlanner />} />
          <Route path="/feedback-tracker" element={<FeedbackTracker />} />
          <Route path="/ai-releases" element={<AIReleases />} />
          <Route path="/ai-use-policy-generator" element={<AIUsePolicyGenerator />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

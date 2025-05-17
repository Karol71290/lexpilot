
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { promptTemplates } from "@/components/prompt-builder/PromptTemplateData";

export function usePromptBuilderState() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [promptTechnique, setPromptTechnique] = useState("cot");
  const [legalArea, setLegalArea] = useState("");
  const [taskType, setTaskType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [tone, setTone] = useState("professional");
  const [outputFormat, setOutputFormat] = useState("");
  const [context, setContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState(promptTemplates);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [nextTemplateId, setNextTemplateId] = useState(promptTemplates.length + 1);

  // Listen for clear search events
  useEffect(() => {
    const clearSearch = () => setSearchQuery("");
    window.addEventListener('clear-search', clearSearch);
    return () => window.removeEventListener('clear-search', clearSearch);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    promptTechnique,
    setPromptTechnique,
    legalArea,
    setLegalArea,
    taskType,
    setTaskType,
    jurisdiction,
    setJurisdiction,
    tone,
    setTone,
    outputFormat,
    setOutputFormat,
    context,
    setContext,
    generatedPrompt,
    setGeneratedPrompt,
    aiResponse,
    setAiResponse,
    selectedTemplate,
    setSelectedTemplate,
    templates,
    setTemplates,
    isGeneratingResponse,
    setIsGeneratingResponse,
    nextTemplateId,
    setNextTemplateId,
    toast
  };
}

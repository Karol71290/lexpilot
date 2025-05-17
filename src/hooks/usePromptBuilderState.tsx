
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
  
  // Core prompt state variables
  const [customPromptText, setCustomPromptText] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  
  const [aiResponse, setAiResponse] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState(promptTemplates);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [nextTemplateId, setNextTemplateId] = useState(promptTemplates.length + 1);
  
  // Model settings
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(800);

  // Listen for clear search events
  useEffect(() => {
    const clearSearch = () => setSearchQuery("");
    window.addEventListener('clear-search', clearSearch);
    return () => window.removeEventListener('clear-search', clearSearch);
  }, []);

  // Update currentPrompt whenever customPromptText or generatedPrompt changes
  useEffect(() => {
    // Prioritize custom input over generated prompt
    if (customPromptText.trim()) {
      setCurrentPrompt(customPromptText);
    } else if (generatedPrompt) {
      setCurrentPrompt(generatedPrompt);
    }
  }, [customPromptText, generatedPrompt]);

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
    customPromptText,
    setCustomPromptText,
    generatedPrompt,
    setGeneratedPrompt,
    currentPrompt,
    setCurrentPrompt,
    aiResponse,
    setAiResponse,
    selectedTemplate,
    setSelectedTemplate,
    templates,
    setTemplates,
    isGeneratingResponse,
    setIsGeneratingResponse,
    isGeneratingPrompt,
    setIsGeneratingPrompt,
    nextTemplateId,
    setNextTemplateId,
    temperature,
    setTemperature,
    maxTokens,
    setMaxTokens,
    toast
  };
}

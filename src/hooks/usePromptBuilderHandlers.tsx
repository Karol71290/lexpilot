
import { useTemplateHandlers } from "./useTemplateHandlers";
import { useAIResponseHandlers } from "./useAIResponseHandlers";
import { usePromptHandlers } from "./usePromptHandlers";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";

interface UsePromptBuilderHandlersProps {
  generatedPrompt: string;
  setGeneratedPrompt: (prompt: string) => void;
  setAiResponse: (response: string) => void;
  setSelectedTemplate: (id: string | null) => void;
  setIsGeneratingResponse: (isGenerating: boolean) => void;
  templates: any[];
  setTemplates: (templates: any[]) => void;
  nextTemplateId: number;
  setNextTemplateId: (id: number) => void;
  legalArea: string;
  setLegalArea: (area: string) => void;
  taskType: string;
  setTaskType: (type: string) => void;
  promptTechnique: string;
  setPromptTechnique: (technique: string) => void;
  context: string;
  jurisdiction: string;
  tone: string;
  outputFormat: string;
}

export function usePromptBuilderHandlers({
  generatedPrompt,
  setGeneratedPrompt,
  setAiResponse,
  setSelectedTemplate,
  setIsGeneratingResponse,
  templates,
  setTemplates,
  nextTemplateId,
  setNextTemplateId,
  legalArea,
  setLegalArea,
  taskType,
  setTaskType,
  promptTechnique,
  setPromptTechnique,
  context,
  jurisdiction,
  tone,
  outputFormat
}: UsePromptBuilderHandlersProps) {
  const { isLoading, error } = useOpenAiApi();
  
  // Template handlers
  const templateHandlers = useTemplateHandlers({
    templates,
    setTemplates,
    nextTemplateId,
    setNextTemplateId,
    setSelectedTemplate,
    setGeneratedPrompt,
    legalArea,
    taskType
  });
  
  // AI Response handlers
  const aiResponseHandlers = useAIResponseHandlers({
    setAiResponse,
    setIsGeneratingResponse,
    legalArea,
    taskType
  });
  
  // Prompt handlers
  const promptHandlers = usePromptHandlers({
    generatedPrompt,
    setGeneratedPrompt,
    legalArea,
    taskType,
    promptTechnique,
    context,
    jurisdiction,
    tone,
    outputFormat,
    setAiResponse,
    setIsGeneratingResponse
  });

  // Handle template selection
  const handleTemplateSelect = async (template: any) => {
    setSelectedTemplate(template.id);
    setGeneratedPrompt(template.template);
    setLegalArea(template.legalArea);
    setTaskType(template.taskType);
    
    // Generate AI response for the selected template
    await aiResponseHandlers.generateAIResponse(
      template.template,
      `You are an expert legal assistant specializing in ${template.legalArea} law. You're helping with a ${template.taskType} task for the template titled "${template.title}". Provide a detailed, professional response that would be useful for a legal professional.`
    );
  };

  return {
    // Template handlers
    handleCopyPrompt: templateHandlers.handleCopyPrompt,
    handleSavePrompt: (title: string) => templateHandlers.handleSavePrompt(title, generatedPrompt),
    
    // Prompt handlers
    handleGeneratePrompt: promptHandlers.handleGeneratePrompt,
    handleCustomPromptSubmit: promptHandlers.handleCustomPromptSubmit,
    handleCopyGeneratedPrompt: promptHandlers.handleCopyGeneratedPrompt,
    handleImproveWithAI: promptHandlers.handleImproveWithAI,
    
    // Template selection handler
    handleTemplateSelect
  };
}

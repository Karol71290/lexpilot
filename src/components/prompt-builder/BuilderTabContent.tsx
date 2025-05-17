
import { useEffect } from "react";
import { useBuilderTabLogic } from "@/hooks/useBuilderTabLogic";
import { InputSection } from "./sections/InputSection";
import { OutputSection } from "./sections/OutputSection";
import { TemplatesSidebar } from "./sections/TemplatesSidebar";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";

interface BuilderTabContentProps {
  legalArea: string;
  setLegalArea: (value: string) => void;
  taskType: string;
  setTaskType: (value: string) => void;
  promptTechnique: string;
  setPromptTechnique: (value: string) => void;
  context: string;
  setContext: (value: string) => void;
  jurisdiction: string;
  setJurisdiction: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  generatedPrompt: string;
  setGeneratedPrompt: (value: string) => void;
  aiResponse: string;
  isGeneratingResponse: boolean;
  templates: any[];
  selectedTemplate: string | null;
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  handleGeneratePrompt: () => void;
  handleCustomPromptSubmit: (promptText: string) => void;
  handleCopyGeneratedPrompt: () => void;
  handleSavePrompt: (title: string) => void;
  handleImproveWithAI: (improvements: string[]) => void;
  handleCopyPrompt: (id: string, text: string) => void;
  handleTemplateSelect: (template: any) => void;
}

export const BuilderTabContent = ({
  legalArea,
  setLegalArea,
  taskType,
  setTaskType,
  promptTechnique,
  setPromptTechnique,
  context,
  setContext,
  jurisdiction,
  setJurisdiction,
  tone,
  setTone,
  outputFormat,
  setOutputFormat,
  generatedPrompt,
  setGeneratedPrompt,
  aiResponse,
  isGeneratingResponse,
  templates,
  selectedTemplate,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  handleGeneratePrompt,
  handleCustomPromptSubmit,
  handleCopyGeneratedPrompt,
  handleSavePrompt,
  handleImproveWithAI,
  handleCopyPrompt,
  handleTemplateSelect
}: BuilderTabContentProps) => {
  const { error } = useOpenAiApi();
  
  const {
    promptText,
    setPromptText,
    handleGenerateWithAI
  } = useBuilderTabLogic({
    legalArea,
    taskType,
    jurisdiction,
    tone,
    outputFormat,
    promptTechnique,
    context,
    handleCustomPromptSubmit,
    handleGeneratePrompt
  });

  // Override the auto-generated prompt when user types their own
  useEffect(() => {
    if (promptText.trim()) {
      // User entered a custom prompt, clear the auto-generated one
      if (generatedPrompt) {
        setGeneratedPrompt("");
      }
    }
  }, [promptText, generatedPrompt, setGeneratedPrompt]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Input Section */}
        <InputSection
          promptText={promptText}
          setPromptText={setPromptText}
          legalArea={legalArea}
          setLegalArea={setLegalArea}
          taskType={taskType}
          setTaskType={setTaskType}
          promptTechnique={promptTechnique}
          setPromptTechnique={setPromptTechnique}
          context={context}
          setContext={setContext}
          jurisdiction={jurisdiction}
          setJurisdiction={setJurisdiction}
          tone={tone}
          setTone={setTone}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
          temperature={temperature}
          setTemperature={setTemperature}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          error={error}
          isGeneratingResponse={isGeneratingResponse}
          generatedPrompt={generatedPrompt}
          handleGenerateWithAI={handleGenerateWithAI}
          handleImproveWithAI={handleImproveWithAI}
        />
        
        {/* Output Section */}
        <OutputSection
          promptText={promptText}
          generatedPrompt={generatedPrompt}
          legalArea={legalArea}
          taskType={taskType}
          promptTechnique={promptTechnique}
          aiResponse={aiResponse}
          isGeneratingResponse={isGeneratingResponse}
          error={error}
          handleCopyGeneratedPrompt={handleCopyGeneratedPrompt}
          handleSavePrompt={handleSavePrompt}
        />
      </div>
      
      <div className="lg:col-span-1">
        {/* Templates Sidebar */}
        <TemplatesSidebar
          templates={templates}
          selectedTemplate={selectedTemplate}
          onCopyPrompt={handleCopyPrompt}
          onSelectTemplate={handleTemplateSelect}
        />
      </div>
    </div>
  );
}

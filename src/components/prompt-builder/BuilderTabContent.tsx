
import { useState } from "react";
import { FreeformPromptInput } from "./FreeformPromptInput";
import { PromptBuilderForm } from "./PromptBuilderForm";
import { GeneratedPrompt } from "./GeneratedPrompt";
import { AIResponsePreview } from "./AIResponsePreview";
import { PopularTemplates } from "./PopularTemplates";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ImprovementOptions } from "./form-components/ImprovementOptions";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";
import { ChatTest } from "@/components/ChatTest";

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
  const [promptText, setPromptText] = useState("");
  const { error } = useOpenAiApi();
  
  const handleGenerateWithAI = () => {
    if (promptText.trim()) {
      handleCustomPromptSubmit(promptText.trim());
    } else {
      handleGeneratePrompt();
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Freeform Prompt Input */}
          <FreeformPromptInput 
            promptText={promptText}
            setPromptText={setPromptText}
            temperature={temperature}
            setTemperature={setTemperature}
            maxTokens={maxTokens}
            setMaxTokens={setMaxTokens}
            error={error}
          />
          
          {/* Prompt Builder Form */}
          <PromptBuilderForm
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
          />
          
          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <ImprovementOptions 
              onImproveWithAI={handleImproveWithAI} 
              disabled={isGeneratingResponse}
            />
            
            <Button 
              className="w-full sm:w-auto" 
              onClick={handleGenerateWithAI}
              disabled={isGeneratingResponse || (!promptText.trim() && !legalArea && !taskType)}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate with OpenAI
            </Button>
          </div>
        </div>
        
        {/* Output Section */}
        <div className="space-y-6">
          {/* Generated Prompt */}
          <GeneratedPrompt 
            generatedPrompt={generatedPrompt}
            legalArea={legalArea}
            taskType={taskType}
            promptTechnique={promptTechnique}
            onCopyGeneratedPrompt={handleCopyGeneratedPrompt}
            onSavePrompt={handleSavePrompt}
          />
          
          {/* AI Response Preview */}
          <AIResponsePreview 
            aiResponse={aiResponse} 
            isLoading={isGeneratingResponse}
            provider="OpenAI"
            error={error}
          />
        </div>

        {/* Chat Test Component */}
        <ChatTest />
      </div>
      
      <div className="lg:col-span-1">
        {/* Popular Templates */}
        <PopularTemplates 
          templates={templates}
          selectedTemplate={selectedTemplate}
          onCopyPrompt={handleCopyPrompt}
          onSelectTemplate={handleTemplateSelect}
        />
      </div>
    </div>
  );
}

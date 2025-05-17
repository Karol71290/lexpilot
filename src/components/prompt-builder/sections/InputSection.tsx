
import { FreeformPromptInput } from "../FreeformPromptInput";
import { PromptBuilderForm } from "../PromptBuilderForm";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ImprovementOptions } from "../form-components/ImprovementOptions";

interface InputSectionProps {
  customPromptText: string;
  setCustomPromptText: (value: string) => void;
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
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  error?: string | null;
  isGeneratingResponse: boolean;
  isGeneratingPrompt: boolean;
  currentPrompt: string;
  handleGenerateWithAI: () => void;
  handleImproveWithAI: (improvements: string[]) => void;
}

export const InputSection = ({
  customPromptText,
  setCustomPromptText,
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
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  error,
  isGeneratingResponse,
  isGeneratingPrompt,
  currentPrompt,
  handleGenerateWithAI,
  handleImproveWithAI
}: InputSectionProps) => {
  // Determine if the improve button should be enabled
  const isImproveButtonDisabled = !currentPrompt || isGeneratingPrompt || isGeneratingResponse;
  
  // Determine if the generate button should be enabled
  const isGenerateButtonDisabled = 
    isGeneratingResponse || 
    isGeneratingPrompt || 
    (!customPromptText.trim() && !currentPrompt && !legalArea && !taskType);

  return (
    <div className="space-y-6">
      {/* Freeform Prompt Input */}
      <FreeformPromptInput 
        customPromptText={customPromptText}
        setCustomPromptText={setCustomPromptText}
        temperature={temperature}
        setTemperature={setTemperature}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        error={error}
        isGeneratingPrompt={isGeneratingPrompt}
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
          disabled={isImproveButtonDisabled}
        />
        
        <Button 
          className="w-full sm:w-auto" 
          onClick={handleGenerateWithAI}
          disabled={isGenerateButtonDisabled}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {isGeneratingResponse ? "Generating..." : "Generate with OpenAI"}
        </Button>
      </div>
    </div>
  );
};

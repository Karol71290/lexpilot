
import { FreeformPromptInput } from "../FreeformPromptInput";
import { PromptBuilderForm } from "../PromptBuilderForm";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ImprovementOptions } from "../form-components/ImprovementOptions";

interface InputSectionProps {
  promptText: string;
  setPromptText: (value: string) => void;
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
  generatedPrompt: string;
  handleGenerateWithAI: () => void;
  handleImproveWithAI: (improvements: string[]) => void;
}

export const InputSection = ({
  promptText,
  setPromptText,
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
  generatedPrompt,
  handleGenerateWithAI,
  handleImproveWithAI
}: InputSectionProps) => {
  // Determine if the improve button should be enabled
  const shouldEnableImproveButton = () => {
    // Enable if we have a custom prompt or generated prompt and we're not currently generating a response
    return (!!generatedPrompt || !!promptText.trim()) && !isGeneratingResponse;
  };

  return (
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
          disabled={!shouldEnableImproveButton()}
        />
        
        <Button 
          className="w-full sm:w-auto" 
          onClick={handleGenerateWithAI}
          disabled={isGeneratingResponse || (!promptText.trim() && !generatedPrompt && !legalArea && !taskType)}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate with OpenAI
        </Button>
      </div>
    </div>
  );
};

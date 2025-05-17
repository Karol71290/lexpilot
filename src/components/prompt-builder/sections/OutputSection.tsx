
import { GeneratedPrompt } from "../GeneratedPrompt";
import { AIResponsePreview } from "../AIResponsePreview";

interface OutputSectionProps {
  promptText: string;
  generatedPrompt: string;
  legalArea: string;
  taskType: string;
  promptTechnique: string;
  aiResponse: string;
  isGeneratingResponse: boolean;
  error?: string | null;
  handleCopyGeneratedPrompt: () => void;
  handleSavePrompt: (title: string) => void;
}

export const OutputSection = ({
  promptText,
  generatedPrompt,
  legalArea,
  taskType,
  promptTechnique,
  aiResponse,
  isGeneratingResponse,
  error,
  handleCopyGeneratedPrompt,
  handleSavePrompt
}: OutputSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Generated Prompt */}
      <GeneratedPrompt 
        generatedPrompt={promptText.trim() || generatedPrompt}
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
        onSaveResponse={handleSavePrompt}
      />
    </div>
  );
};

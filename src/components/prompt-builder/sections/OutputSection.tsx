
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
  // Get the current active prompt - prioritize freeform text if it exists
  const currentPrompt = promptText?.trim() ? promptText : generatedPrompt;
  
  return (
    <div className="space-y-6">
      {/* Generated Prompt */}
      {currentPrompt && (
        <GeneratedPrompt 
          generatedPrompt={currentPrompt}
          legalArea={legalArea}
          taskType={taskType}
          promptTechnique={promptTechnique}
          onCopyGeneratedPrompt={handleCopyGeneratedPrompt}
          onSavePrompt={handleSavePrompt}
        />
      )}
      
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

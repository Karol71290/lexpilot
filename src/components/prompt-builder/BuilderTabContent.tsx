
import { FreeformPromptInput } from "./FreeformPromptInput";
import { PromptBuilderForm } from "./PromptBuilderForm";
import { GeneratedPrompt } from "./GeneratedPrompt";
import { AIResponsePreview } from "./AIResponsePreview";
import { PopularTemplates } from "./PopularTemplates";

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
  handleGeneratePrompt,
  handleCustomPromptSubmit,
  handleCopyGeneratedPrompt,
  handleSavePrompt,
  handleImproveWithAI,
  handleCopyPrompt,
  handleTemplateSelect
}: BuilderTabContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Freeform Prompt Input */}
        <FreeformPromptInput 
          onSubmitPrompt={handleCustomPromptSubmit}
          onImproveWithAI={handleImproveWithAI}
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
          onGeneratePrompt={handleGeneratePrompt}
          onImproveWithAI={handleImproveWithAI}
        />
        
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
        />
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
};

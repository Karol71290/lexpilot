import { useState, useEffect } from "react";
import { FreeformPromptInput } from "./FreeformPromptInput";
import { PromptBuilderForm } from "./PromptBuilderForm";
import { GeneratedPrompt } from "./GeneratedPrompt";
import { AIResponsePreview } from "./AIResponsePreview";
import { PopularTemplates } from "./PopularTemplates";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { ImprovementOptions } from "./form-components/ImprovementOptions";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";
import { useToast } from "@/hooks/use-toast";

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
  const [promptText, setPromptText] = useState("");
  const { error } = useOpenAiApi();
  const { toast } = useToast();
  
  // Track if we have either custom input or structured input
  const [hasUserInput, setHasUserInput] = useState(false);
  
  // Auto-generate prompt when legal area and task type are selected
  useEffect(() => {
    const shouldAutoGenerate = legalArea && taskType && !promptText.trim();
    
    if (shouldAutoGenerate) {
      handleAutoGeneratePrompt();
    }
  }, [legalArea, taskType, jurisdiction, tone, outputFormat]);
  
  // Update hasUserInput whenever relevant fields change
  useEffect(() => {
    setHasUserInput(!!promptText.trim() || (!!legalArea && !!taskType));
  }, [promptText, legalArea, taskType]);
  
  // Auto-generate prompt based on selected parameters
  const handleAutoGeneratePrompt = () => {
    if (!legalArea || !taskType) return;
    
    // Generate prompt based on selected parameters without making an API call
    let techniquePrefix = "";
    
    switch(promptTechnique) {
      case "cot":
        techniquePrefix = "Follow a chain of thought approach to solve this step by step. ";
        break;
      case "tot":
        techniquePrefix = "Explore multiple reasoning paths, considering different approaches before arriving at your conclusion. ";
        break;
      case "icl":
        techniquePrefix = "Based on the following examples, create a similar response: [EXAMPLES WOULD BE HERE]. ";
        break;
      case "tabular":
        techniquePrefix = "Present your response in a well-structured tabular format where appropriate. ";
        break;
      case "refine":
        techniquePrefix = "After providing an initial response, critique your answer and provide an improved version. ";
        break;
    }
    
    const generatedPrompt = `${techniquePrefix}

As a legal professional with expertise in ${legalArea}, I need assistance with the following ${taskType} task:

${context ? `Context/Background information: ${context}\n` : ""}
${jurisdiction ? `Jurisdiction: ${jurisdiction}\n` : ""}
${tone ? `Tone: ${tone}\n` : ""}
${outputFormat ? `Please format your response as: ${outputFormat}` : ""}`;

    setGeneratedPrompt(generatedPrompt);
    
    toast({
      title: "Prompt Updated",
      description: "Your legal prompt has been automatically generated based on your selections."
    });
  };
  
  const handleGenerateWithAI = () => {
    if (promptText.trim()) {
      // If user has typed a custom prompt, use that
      handleCustomPromptSubmit(promptText.trim());
    } else if (generatedPrompt) {
      // Otherwise, use the generated/structured prompt
      handleCustomPromptSubmit(generatedPrompt);
    } else if (legalArea && taskType) {
      // If no prompt is visible yet but we have basic fields, generate one
      handleGeneratePrompt();
    } else {
      // No input available
      toast({
        title: "Missing Input",
        description: "Please enter a prompt or fill in Legal Area and Task Type.",
        variant: "destructive"
      });
    }
  };
  
  // Determine if the improve button should be enabled
  const shouldEnableImproveButton = () => {
    // Enable if we have a custom prompt or generated prompt and we're not currently generating a response
    return (!!generatedPrompt || !!promptText.trim()) && !isGeneratingResponse;
  };

  // Override the auto-generated prompt when user types their own
  useEffect(() => {
    if (promptText.trim()) {
      // User entered a custom prompt, clear the auto-generated one
      if (generatedPrompt) {
        setGeneratedPrompt("");
      }
    }
  }, [promptText]);

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
        
        {/* Output Section */}
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

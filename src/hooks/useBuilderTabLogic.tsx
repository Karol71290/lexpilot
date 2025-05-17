
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseBuilderTabLogicProps {
  legalArea: string;
  taskType: string;
  jurisdiction: string;
  tone: string;
  outputFormat: string;
  promptTechnique: string;
  context: string;
  customPromptText: string;
  setCustomPromptText: (text: string) => void;
  handleCustomPromptSubmit: (promptText: string) => void;
  handleGeneratePrompt: () => void;
  isGeneratingPrompt: boolean;
  currentPrompt: string;
}

export const useBuilderTabLogic = ({
  legalArea,
  taskType,
  jurisdiction,
  tone,
  outputFormat,
  promptTechnique,
  context,
  customPromptText,
  setCustomPromptText,
  handleCustomPromptSubmit,
  handleGeneratePrompt,
  isGeneratingPrompt,
  currentPrompt
}: UseBuilderTabLogicProps) => {
  const { toast } = useToast();
  
  // Auto-generate prompt when legal area and task type are selected
  useEffect(() => {
    const shouldAutoGenerate = legalArea && taskType && !isGeneratingPrompt;
    
    if (shouldAutoGenerate && !customPromptText.trim()) {
      handleGeneratePrompt();
    }
  }, [legalArea, taskType, jurisdiction, tone, outputFormat, promptTechnique]);
  
  // Handle generate button click
  const handleGenerateWithAI = () => {
    if (customPromptText.trim()) {
      // If user has typed a custom prompt, use that
      handleCustomPromptSubmit(customPromptText.trim());
    } else if (legalArea && taskType) {
      // If no custom prompt is entered but we have basic fields, generate one
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

  return {
    handleGenerateWithAI,
    hasValidPrompt: !!currentPrompt
  };
};

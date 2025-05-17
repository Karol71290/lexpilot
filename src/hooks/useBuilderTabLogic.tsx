
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
  handleCustomPromptSubmit: (promptText: string) => void;
  handleGeneratePrompt: () => void;
}

export const useBuilderTabLogic = ({
  legalArea,
  taskType,
  jurisdiction,
  tone,
  outputFormat,
  promptTechnique,
  context,
  handleCustomPromptSubmit,
  handleGeneratePrompt
}: UseBuilderTabLogicProps) => {
  const [promptText, setPromptText] = useState("");
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

    toast({
      title: "Prompt Updated",
      description: "Your legal prompt has been automatically generated based on your selections."
    });
    
    return generatedPrompt;
  };
  
  const handleGenerateWithAI = () => {
    if (promptText.trim()) {
      // If user has typed a custom prompt, use that
      handleCustomPromptSubmit(promptText.trim());
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

  return {
    promptText,
    setPromptText,
    hasUserInput,
    handleAutoGeneratePrompt,
    handleGenerateWithAI
  };
};

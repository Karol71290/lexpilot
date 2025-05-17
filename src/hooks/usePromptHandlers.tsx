import { useToast } from "@/hooks/use-toast";
import { useAIResponseHandlers } from "./useAIResponseHandlers";

interface UsePromptHandlersProps {
  currentPrompt: string;
  customPromptText: string;
  setCustomPromptText: (prompt: string) => void;
  generatedPrompt: string;
  setGeneratedPrompt: (prompt: string) => void;
  legalArea: string;
  taskType: string;
  promptTechnique: string;
  context: string;
  jurisdiction: string;
  tone: string;
  outputFormat: string;
  setAiResponse: (response: string) => void;
  setIsGeneratingResponse: (isGenerating: boolean) => void;
  setIsGeneratingPrompt: (isGenerating: boolean) => void;
}

export function usePromptHandlers({
  currentPrompt,
  customPromptText,
  setCustomPromptText,
  generatedPrompt,
  setGeneratedPrompt,
  legalArea,
  taskType,
  promptTechnique,
  context,
  jurisdiction,
  tone,
  outputFormat,
  setAiResponse,
  setIsGeneratingResponse,
  setIsGeneratingPrompt
}: UsePromptHandlersProps) {
  const { toast } = useToast();
  const { generateAIResponse } = useAIResponseHandlers({
    setAiResponse,
    setIsGeneratingResponse,
    legalArea,
    taskType
  });

  // Generate a prompt based on selected parameters
  const handleGeneratePrompt = async () => {
    if (!legalArea || !taskType) {
      toast({
        title: "Missing Fields",
        description: "Please fill out at least Legal Area and Task Type to generate a prompt.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingPrompt(true);
    
    try {
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
      
      const basePrompt = `As a legal professional with expertise in ${legalArea}, I need assistance with the following ${taskType} task:`;
      
      const contextSection = context ? `\nContext/Background information: ${context}` : "";
      const jurisdictionSection = jurisdiction ? `\nJurisdiction: ${jurisdiction}` : "";
      const toneSection = tone ? `\nTone: ${tone}` : "";
      const formatSection = outputFormat ? `\nPlease format your response as: ${outputFormat}` : "";
      
      // Construct the new prompt
      const newPrompt = `${techniquePrefix}

${basePrompt}${contextSection}${jurisdictionSection}${toneSection}${formatSection}`;

      // If the user hasn't entered a custom prompt, update the generated prompt
      setGeneratedPrompt(newPrompt);
      toast({
        title: "Prompt Generated",
        description: "Your prompt has been generated based on your parameters."
      });
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to generate prompt.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  // Process custom prompt input
  const handleCustomPromptSubmit = async (promptText: string) => {
    // Update the custom prompt text
    setCustomPromptText(promptText);
    
    // Call OpenAI API with the custom prompt
    if (promptText.trim()) {
      await generateAIResponse(promptText);
    }
  };

  // Copy the current prompt to clipboard
  const handleCopyGeneratedPrompt = () => {
    if (!currentPrompt) return;
    
    navigator.clipboard.writeText(currentPrompt);
    
    toast({
      title: "Prompt Copied",
      description: "Your prompt has been copied to your clipboard."
    });
  };
  
  // Apply AI improvements to the current prompt
  const handleImproveWithAI = async (improvements: string[]) => {
    if (!currentPrompt) {
      toast({
        title: "No Prompt to Improve",
        description: "Please generate or enter a prompt before applying improvements.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingResponse(true);
    
    try {
      // Create a system prompt for OpenAI API to improve the prompt
      let improvementInstructions = "You are an expert at creating effective prompts for AI language models. Your task is to improve the following legal prompt";
      
      if (improvements.includes("auto-technique")) {
        improvementInstructions += ", selecting the most appropriate prompting technique for this specific legal task";
      }
      
      if (improvements.includes("xml-tags")) {
        improvementInstructions += ", adding XML tags to provide structure";
      }
      
      if (improvements.includes("clarity")) {
        improvementInstructions += ", enhancing clarity and precision in legal language";
      }
      
      if (improvements.includes("legal-context")) {
        improvementInstructions += ", adding domain-specific legal context relevant to " + (legalArea || "the legal domain");
      }
      
      improvementInstructions += ". Return ONLY the improved prompt text without any explanations or additional text.";
      
      const response = await generateAIResponse(currentPrompt, improvementInstructions);
      
      if (response) {
        // Decide where to put the improved prompt based on origin
        if (customPromptText.trim()) {
          // If it came from custom input, update the custom input
          setCustomPromptText(response);
        } else {
          // Otherwise update the generated prompt
          setGeneratedPrompt(response);
        }
        
        // Generate a new AI response for the improved prompt
        await generateAIResponse(response, `You are a legal expert in ${legalArea || "various fields of law"}.`);
        
        toast({
          title: "Prompt Improved",
          description: `Applied ${improvements.length} improvement(s) to your prompt using OpenAI.`
        });
      }
    } catch (err) {
      console.error("Error improving prompt:", err);
      toast({
        title: "Error",
        description: "Failed to improve prompt with OpenAI.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  return {
    handleGeneratePrompt,
    handleCustomPromptSubmit,
    handleCopyGeneratedPrompt,
    handleImproveWithAI
  };
}

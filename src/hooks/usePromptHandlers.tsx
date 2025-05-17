
import { useToast } from "@/hooks/use-toast";
import { useAIResponseHandlers } from "./useAIResponseHandlers";

interface UsePromptHandlersProps {
  generatedPrompt: string;
  setGeneratedPrompt: (prompt: string) => void;
  promptText?: string; // Added promptText as an optional parameter
  legalArea: string;
  taskType: string;
  promptTechnique: string;
  context: string;
  jurisdiction: string;
  tone: string;
  outputFormat: string;
  setAiResponse: (response: string) => void;
  setIsGeneratingResponse: (isGenerating: boolean) => void;
}

export function usePromptHandlers({
  generatedPrompt,
  setGeneratedPrompt,
  promptText = "", // Added with default empty string
  legalArea,
  taskType,
  promptTechnique,
  context,
  jurisdiction,
  tone,
  outputFormat,
  setAiResponse,
  setIsGeneratingResponse
}: UsePromptHandlersProps) {
  const { toast } = useToast();
  const { generateAIResponse } = useAIResponseHandlers({
    setAiResponse,
    setIsGeneratingResponse,
    legalArea,
    taskType
  });

  const handleGeneratePrompt = async () => {
    if (!legalArea || !taskType) {
      toast({
        title: "Missing Fields",
        description: "Please fill out at least Legal Area and Task Type to generate a prompt.",
        variant: "destructive"
      });
      return;
    }
    
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
    
    const newPrompt = `${techniquePrefix}

As a legal professional with expertise in ${legalArea}, I need assistance with the following ${taskType} task:

${context ? `Context/Background information: ${context}\n` : ""}
${jurisdiction ? `Jurisdiction: ${jurisdiction}\n` : ""}
${tone ? `Tone: ${tone}\n` : ""}
${outputFormat ? `Please format your response as: ${outputFormat}` : ""}`;

    setGeneratedPrompt(newPrompt);
    
    // Call OpenAI API to generate response based on the prompt
    await generateAIResponse(newPrompt);
  };

  const handleCustomPromptSubmit = async (promptText: string) => {
    // Update the generated prompt to the custom one
    setGeneratedPrompt(promptText);
    
    // Call OpenAI API with the custom prompt
    await generateAIResponse(promptText);
  };

  const handleCopyGeneratedPrompt = () => {
    if (!generatedPrompt) return;
    
    navigator.clipboard.writeText(generatedPrompt);
    
    toast({
      title: "Generated Prompt Copied",
      description: "Your generated prompt has been copied to your clipboard."
    });
  };
  
  const handleImproveWithAI = async (improvements: string[]) => {
    // Get the prompt from either promptText input or generatedPrompt
    const promptToImprove = promptText?.trim() || generatedPrompt;
    
    if (!promptToImprove) {
      toast({
        title: "No Prompt to Improve",
        description: "Please generate or submit a prompt before applying improvements.",
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
      
      const response = await generateAIResponse(promptToImprove, improvementInstructions);
      
      if (response) {
        setGeneratedPrompt(response);
        
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
    }
  };

  return {
    handleGeneratePrompt,
    handleCustomPromptSubmit,
    handleCopyGeneratedPrompt,
    handleImproveWithAI
  };
}

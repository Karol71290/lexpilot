
import { useToast } from "@/hooks/use-toast";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";

interface UseAIResponseHandlersProps {
  setAiResponse: (response: string) => void;
  setIsGeneratingResponse: (isGenerating: boolean) => void;
  legalArea: string;
  taskType: string;
}

export function useAIResponseHandlers({
  setAiResponse,
  setIsGeneratingResponse,
  legalArea,
  taskType
}: UseAIResponseHandlersProps) {
  const { toast } = useToast();
  const { chatWithOpenAI } = useOpenAiApi();

  const generateAIResponse = async (promptText: string, customSystemMessage?: string) => {
    if (!promptText.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please provide a prompt before generating a response.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingResponse(true);
    
    try {
      // Add legal context to the prompt if legalArea or taskType is selected
      let systemMessage = customSystemMessage || "You are a helpful legal assistant.";
      
      if (!customSystemMessage) {
        if (legalArea) {
          systemMessage = `You are an expert legal assistant specializing in ${legalArea} law.`;
        }
        
        if (taskType) {
          systemMessage += ` You're helping with a ${taskType} task.`;
        }
        
        systemMessage += " Provide a detailed, professional response that would be useful for a legal professional.";
      }
      
      const response = await chatWithOpenAI([
        {
          role: "system",
          content: systemMessage
        },
        {
          role: "user",
          content: promptText
        }
      ], {
        temperature: 0.7,
        maxTokens: 800
      });
      
      if (response) {
        setAiResponse(response);
        toast({
          title: "Response Generated",
          description: "OpenAI has generated a response based on your prompt."
        });
        return response;
      } else {
        setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to process prompt with OpenAI.",
          variant: "destructive"
        });
        return null;
      }
    } catch (err) {
      console.error("Error processing prompt:", err);
      setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to process prompt with OpenAI.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  return {
    generateAIResponse
  };
}

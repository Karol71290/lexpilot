
import { useToast } from "@/hooks/use-toast";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";

interface UsePromptBuilderHandlersProps {
  generatedPrompt: string;
  setGeneratedPrompt: (prompt: string) => void;
  setAiResponse: (response: string) => void;
  setSelectedTemplate: (id: string | null) => void;
  setIsGeneratingResponse: (isGenerating: boolean) => void;
  templates: any[];
  setTemplates: (templates: any[]) => void;
  nextTemplateId: number;
  setNextTemplateId: (id: number) => void;
  legalArea: string;
  setLegalArea: (area: string) => void;
  taskType: string;
  setTaskType: (type: string) => void;
  promptTechnique: string;
  setPromptTechnique: (technique: string) => void;
  context: string;
  jurisdiction: string;
  tone: string;
  outputFormat: string;
}

export function usePromptBuilderHandlers({
  generatedPrompt,
  setGeneratedPrompt,
  setAiResponse,
  setSelectedTemplate,
  setIsGeneratingResponse,
  templates,
  setTemplates,
  nextTemplateId,
  setNextTemplateId,
  legalArea,
  setLegalArea,
  taskType,
  setTaskType,
  promptTechnique,
  setPromptTechnique,
  context,
  jurisdiction,
  tone,
  outputFormat
}: UsePromptBuilderHandlersProps) {
  const { toast } = useToast();
  const { generateWithOpenAI, chatWithOpenAI, isLoading, error } = useOpenAiApi();

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Prompt Copied",
      description: "The prompt template has been copied to your clipboard."
    });
    
    setSelectedTemplate(id);
    setGeneratedPrompt(text);
  };

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
    
    const generatedPrompt = `${techniquePrefix}

As a legal professional with expertise in ${legalArea}, I need assistance with the following ${taskType} task:

${context ? `Context/Background information: ${context}\n` : ""}
${jurisdiction ? `Jurisdiction: ${jurisdiction}\n` : ""}
${tone ? `Tone: ${tone}\n` : ""}
${outputFormat ? `Please format your response as: ${outputFormat}` : ""}`;

    setGeneratedPrompt(generatedPrompt);
    
    // Call OpenAI API to generate response based on the prompt
    setIsGeneratingResponse(true);
    
    try {
      const systemPrompt = `You are an expert legal assistant specializing in ${legalArea} law. You're helping with a ${taskType} task. Provide a detailed, professional response that would be useful for a legal professional.`;
      
      const response = await chatWithOpenAI([
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: generatedPrompt
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
      } else {
        setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to generate response with OpenAI.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error generating response:", err);
      setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to generate response with OpenAI.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleCustomPromptSubmit = async (promptText: string) => {
    // Update the generated prompt to the custom one
    setGeneratedPrompt(promptText);
    
    // Call OpenAI API with the custom prompt
    setIsGeneratingResponse(true);
    
    try {
      // Add legal context to the prompt if legalArea or taskType is selected
      let systemMessage = "You are a helpful legal assistant.";
      
      if (legalArea) {
        systemMessage = `You are an expert legal assistant specializing in ${legalArea} law.`;
      }
      
      if (taskType) {
        systemMessage += ` You're helping with a ${taskType} task.`;
      }
      
      systemMessage += " Provide a detailed, professional response that would be useful for a legal professional.";
      
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
      } else {
        setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to process prompt with OpenAI.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error processing custom prompt:", err);
      setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to process custom prompt with OpenAI.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleTemplateSelect = async (template: any) => {
    setSelectedTemplate(template.id);
    setGeneratedPrompt(template.template);
    setLegalArea(template.legalArea);
    setTaskType(template.taskType);
    
    // Call OpenAI API
    setIsGeneratingResponse(true);
    
    try {
      const systemPrompt = `You are an expert legal assistant specializing in ${template.legalArea} law. You're helping with a ${template.taskType} task for the template titled "${template.title}". Provide a detailed, professional response that would be useful for a legal professional.`;
      
      const response = await chatWithOpenAI([
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: template.template
        }
      ], {
        temperature: 0.7,
        maxTokens: 800
      });
      
      if (response) {
        setAiResponse(response);
        toast({
          title: "Response Generated",
          description: "OpenAI has generated a response based on the selected template."
        });
      } else {
        setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to generate response for template with OpenAI.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error generating response for template:", err);
      setAiResponse("Sorry, there was an error generating a response with OpenAI. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to generate response for template with OpenAI.",
        variant: "destructive"
        });
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleCopyGeneratedPrompt = () => {
    if (!generatedPrompt) return;
    
    navigator.clipboard.writeText(generatedPrompt);
    
    toast({
      title: "Generated Prompt Copied",
      description: "Your generated prompt has been copied to your clipboard."
    });
  };

  const handleSavePrompt = (title: string) => {
    if (!generatedPrompt) {
      toast({
        title: "No Prompt to Save",
        description: "Please generate a prompt before saving.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new template from the current prompt
    const newTemplate = {
      id: nextTemplateId.toString(),
      title: title,
      description: `Custom template for ${legalArea || "general use"}`,
      category: legalArea || "General",
      legalArea: legalArea || "",
      taskType: taskType || "Custom",
      persona: ["Strategic Adopter", "Pragmatic User"],
      role: ["Associate", "Partner"],
      template: generatedPrompt
    };
    
    // Add the new template to templates
    setTemplates([...templates, newTemplate]);
    setNextTemplateId(nextTemplateId + 1);
    
    toast({
      title: "Prompt Saved",
      description: "Your prompt has been saved to your template library."
    });
  };
  
  const handleImproveWithAI = async (improvements: string[]) => {
    if (!generatedPrompt) {
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
      
      const response = await chatWithOpenAI([
        {
          role: "system", 
          content: improvementInstructions
        },
        {
          role: "user",
          content: generatedPrompt
        }
      ], { 
        temperature: 0.7 
      });
      
      if (response) {
        setGeneratedPrompt(response);
        
        // Generate a new AI response for the improved prompt
        const improvedResponse = await chatWithOpenAI([
          {
            role: "system",
            content: `You are a legal expert in ${legalArea || "various fields of law"}.`
          },
          {
            role: "user", 
            content: response
          }
        ], { 
          temperature: 0.7 
        });
        
        if (improvedResponse) {
          setAiResponse(improvedResponse);
        }
        
        toast({
          title: "Prompt Improved",
          description: `Applied ${improvements.length} improvement(s) to your prompt using OpenAI.`
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to improve prompt with OpenAI.",
          variant: "destructive"
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
    handleCopyPrompt,
    handleGeneratePrompt,
    handleCustomPromptSubmit,
    handleTemplateSelect,
    handleCopyGeneratedPrompt,
    handleSavePrompt,
    handleImproveWithAI
  };
}

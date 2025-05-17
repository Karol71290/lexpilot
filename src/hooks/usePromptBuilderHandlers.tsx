
import { useToast } from "@/hooks/use-toast";
import { useGeminiApi } from "@/hooks/useGeminiApi";

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
  const { generateWithGemini, isLoading, error } = useGeminiApi();

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
    if (!legalArea || !taskType || !promptTechnique) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all required fields to generate a prompt.",
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
    
    // Call Gemini API instead of using mock data
    setIsGeneratingResponse(true);
    
    try {
      const systemPrompt = `You are an expert legal assistant specializing in ${legalArea} law. You're helping with a ${taskType} task. Provide a detailed, professional response that would be useful for a legal professional.`;
      
      const fullPrompt = `${systemPrompt}\n\nHere is the request:\n${generatedPrompt}`;
      
      const response = await generateWithGemini(fullPrompt, {
        temperature: 0.7,
        maxTokens: 800
      });
      
      if (response) {
        setAiResponse(response);
        toast({
          title: "Prompt Generated",
          description: "Your custom legal prompt has been generated with Gemini API."
        });
      } else {
        setAiResponse("Sorry, there was an error generating a response with Gemini AI. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to generate response with Gemini AI.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error generating response:", err);
      setAiResponse("Sorry, there was an error generating a response with Gemini AI. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to generate response with Gemini AI.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleCustomPromptSubmit = async (promptText: string) => {
    setGeneratedPrompt(promptText);
    
    // Clear form fields since we're using a custom prompt
    setLegalArea("");
    setTaskType("");
    
    // Call Gemini API
    setIsGeneratingResponse(true);
    
    try {
      const response = await generateWithGemini(promptText);
      
      if (response) {
        setAiResponse(response);
        toast({
          title: "Custom Prompt Submitted",
          description: "Your custom prompt has been processed with Gemini AI."
        });
      } else {
        setAiResponse("Sorry, there was an error generating a response with Gemini AI. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to process custom prompt with Gemini AI.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error processing custom prompt:", err);
      setAiResponse("Sorry, there was an error generating a response with Gemini AI. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to process custom prompt with Gemini AI.",
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
    
    // Call Gemini API
    setIsGeneratingResponse(true);
    
    try {
      const systemPrompt = `You are an expert legal assistant specializing in ${template.legalArea} law. You're helping with a ${template.taskType} task for the template titled "${template.title}". Provide a detailed, professional response that would be useful for a legal professional.`;
      
      const fullPrompt = `${systemPrompt}\n\nHere is the request:\n${template.template}`;
      
      const response = await generateWithGemini(fullPrompt);
      
      if (response) {
        setAiResponse(response);
      } else {
        setAiResponse("Sorry, there was an error generating a response with Gemini AI. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to generate response for template with Gemini AI.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error generating response for template:", err);
      setAiResponse("Sorry, there was an error generating a response with Gemini AI. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to generate response for template with Gemini AI.",
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
      // Create a system prompt for Gemini API to improve the prompt
      let improvementInstructions = "You are an expert at creating effective prompts for AI language models. Your task is to improve the following prompt";
      
      if (improvements.includes("auto-technique")) {
        improvementInstructions += ", selecting the most appropriate prompting technique for this specific task";
      }
      
      if (improvements.includes("xml-tags")) {
        improvementInstructions += ", adding XML tags to provide structure";
      }
      
      if (improvements.includes("clarity")) {
        improvementInstructions += ", enhancing clarity and precision";
      }
      
      if (improvements.includes("legal-context")) {
        improvementInstructions += ", adding domain-specific legal context relevant to " + (legalArea || "the legal domain");
      }
      
      improvementInstructions += ". Return ONLY the improved prompt text without any explanations or additional text.";
      
      const fullPrompt = `${improvementInstructions}\n\nOriginal prompt:\n${generatedPrompt}`;
      
      // Get improved prompt from Gemini API
      const improvedPrompt = await generateWithGemini(fullPrompt, { temperature: 0.7 });
      
      if (improvedPrompt) {
        setGeneratedPrompt(improvedPrompt);
        
        // Generate a new AI response for the improved prompt
        const responsePrompt = `You are a legal expert in ${legalArea || "various fields of law"}. Respond to this request:\n\n${improvedPrompt}`;
        const improvedResponse = await generateWithGemini(responsePrompt, { temperature: 0.7 });
        
        if (improvedResponse) {
          setAiResponse(improvedResponse);
        }
        
        toast({
          title: "Prompt Improved",
          description: `Applied ${improvements.length} improvement(s) to your prompt using Gemini AI.`
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to improve prompt with Gemini AI.",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Error improving prompt:", err);
      toast({
        title: "Error",
        description: "Failed to improve prompt with Gemini AI.",
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

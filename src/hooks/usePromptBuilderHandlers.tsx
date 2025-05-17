
import { useToast } from "@/hooks/use-toast";

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
  setPromptTechnique
}: UsePromptBuilderHandlersProps) {
  const { toast } = useToast();

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Prompt Copied",
      description: "The prompt template has been copied to your clipboard."
    });
    
    setSelectedTemplate(id);
    setGeneratedPrompt(text);
  };

  const handleGeneratePrompt = () => {
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
    
    // In a real application, this would call an AI API
    setIsGeneratingResponse(true);
    setTimeout(() => {
      const mockAIResponse = `This is a simulated AI response based on your prompt. In a real implementation, this would call an API to generate a response based on your prompt.

For this ${taskType} in ${legalArea} law, here's a ${outputFormat ? outputFormat : "response"}:

1. First point of legal analysis
2. Second point with relevant case law
3. Recommendations based on ${jurisdiction ? jurisdiction : "applicable"} jurisdiction
4. Considerations for implementation
5. Next steps and additional resources`;

      setAiResponse(mockAIResponse);
      setIsGeneratingResponse(false);
      
      toast({
        title: "Prompt Generated",
        description: "Your custom legal prompt has been generated."
      });
    }, 1500);
  };

  const handleCustomPromptSubmit = (promptText: string) => {
    setGeneratedPrompt(promptText);
    
    // Clear form fields since we're using a custom prompt
    setLegalArea("");
    setTaskType("");
    
    // In a real application, this would call an AI API
    setIsGeneratingResponse(true);
    setTimeout(() => {
      const mockAIResponse = `This is a simulated AI response based on your custom prompt. In a real implementation, this would call an API to generate a response.

1. Analysis of your specific legal query
2. Relevant legal principles and precedents
3. Key considerations for this situation
4. Practical recommendations
5. Additional resources for further reference`;

      setAiResponse(mockAIResponse);
      setIsGeneratingResponse(false);
      
      toast({
        title: "Custom Prompt Submitted",
        description: "Your custom prompt has been processed."
      });
    }, 1500);
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setGeneratedPrompt(template.template);
    setLegalArea(template.legalArea);
    setTaskType(template.taskType);
    
    // In a real application, this would call an AI API
    setIsGeneratingResponse(true);
    setTimeout(() => {
      const mockAIResponse = `This is a simulated AI response based on the "${template.title}" template. In a real implementation, this would call an API to generate a response.

For a ${template.taskType} in ${template.legalArea}, here's a professional response:

1. First point of analysis for ${template.title}
2. Second point with relevant considerations
3. Key recommendations for implementation
4. Additional legal considerations
5. Next steps and resources`;

      setAiResponse(mockAIResponse);
      setIsGeneratingResponse(false);
    }, 1500);
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
  
  const handleImproveWithAI = (improvements: string[]) => {
    if (!generatedPrompt) {
      toast({
        title: "No Prompt to Improve",
        description: "Please generate or submit a prompt before applying improvements.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingResponse(true);
    
    // In a real application, this would call an AI API
    setTimeout(() => {
      let improvedPrompt = generatedPrompt;
      
      if (improvements.includes("auto-technique")) {
        // Simulated technique selection based on task
        if (taskType === "Research" || taskType === "Analyze") {
          setPromptTechnique("tot");
          improvedPrompt = improvedPrompt.replace(
            /Follow a chain of thought approach to solve this step by step\./g,
            "Explore multiple reasoning paths, considering different approaches before arriving at your conclusion."
          );
        } else if (taskType === "Summarize" || taskType === "Review") {
          setPromptTechnique("refine");
          improvedPrompt = improvedPrompt.replace(
            /Follow a chain of thought approach to solve this step by step\./g,
            "After providing an initial response, critique your answer and provide an improved version."
          );
        } else {
          // For custom prompts or other tasks
          improvedPrompt = "Let me solve this step by step while exploring multiple perspectives.\n\n" + improvedPrompt;
        }
      }
      
      if (improvements.includes("xml-tags")) {
        // Add XML tags
        improvedPrompt = improvedPrompt.replace(
          /Context\/Background information: (.*?)(?=\n|$)/g,
          '<context>$1</context>'
        );
        improvedPrompt = improvedPrompt.replace(
          /Jurisdiction: (.*?)(?=\n|$)/g, 
          '<jurisdiction>$1</jurisdiction>'
        );
        improvedPrompt = improvedPrompt.replace(
          /Please format your response as: (.*?)(?=\n|$)/g,
          '<format>$1</format>'
        );
        
        // For custom prompts that may not have the standard format
        if (!improvedPrompt.includes('<context>') && !improvedPrompt.includes('<jurisdiction>') && !improvedPrompt.includes('<format>')) {
          improvedPrompt = `<instruction>\n${improvedPrompt}\n</instruction>`;
        }
      }
      
      if (improvements.includes("clarity")) {
        // Add clarity enhancements
        improvedPrompt += "\n\nPlease provide specific legal references where applicable. Avoid ambiguity and ensure all recommendations are actionable. Address potential counterarguments or limitations in your analysis.";
      }
      
      if (improvements.includes("legal-context")) {
        // Add domain-specific context
        let legalContext = "\n\nAdditional context:";
        
        if (legalArea === "Corporate") {
          legalContext += "\nConsider relevant corporate governance principles, fiduciary duties, and applicable regulatory frameworks including SEC requirements if relevant.";
        } else if (legalArea === "Litigation") {
          legalContext += "\nConsider procedural rules, evidentiary standards, and potential alternative dispute resolution options where appropriate.";
        } else if (legalArea === "IP Law") {
          legalContext += "\nConsider relevant IP protection regimes (patent, trademark, copyright, trade secret), their distinct requirements, and jurisdictional differences in protection scope.";
        } else {
          // For custom prompts or other legal areas
          legalContext += "\nEnsure your analysis considers relevant statutes, regulations, case law, and jurisdictional differences that may impact the legal analysis or advice.";
        }
        
        improvedPrompt += legalContext;
      }
      
      setGeneratedPrompt(improvedPrompt);
      
      // Generate a new AI response for the improved prompt
      const mockImprovedResponse = `This is a simulated AI response based on your improved prompt.

For this enhanced ${taskType ? `${taskType} in ${legalArea} law` : "legal analysis"}, here's a comprehensive ${outputFormat ? outputFormat : "response"} with improved structure and depth:

1. Primary legal consideration: [Detailed analysis with specific case law references]
2. Secondary considerations: [Multiple approaches examined with comparative analysis]
3. Jurisdiction-specific implementation in ${jurisdiction ? jurisdiction : "applicable jurisdictions"}
4. Strategic recommendations with actionable next steps
5. Risk analysis and mitigation strategies
6. Additional resources and precedents for further reference`;

      setAiResponse(mockImprovedResponse);
      setIsGeneratingResponse(false);
      
      toast({
        title: "Prompt Improved",
        description: `Applied ${improvements.length} improvement(s) to your prompt.`
      });
    }, 2000);
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

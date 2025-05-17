
import { useToast } from "@/hooks/use-toast";

interface UseTemplateHandlersProps {
  templates: any[];
  setTemplates: (templates: any[]) => void;
  nextTemplateId: number;
  setNextTemplateId: (id: number) => void;
  setSelectedTemplate: (id: string | null) => void;
  setGeneratedPrompt: (prompt: string) => void;
  legalArea: string;
  taskType: string;
}

export function useTemplateHandlers({
  templates,
  setTemplates,
  nextTemplateId,
  setNextTemplateId,
  setSelectedTemplate,
  setGeneratedPrompt,
  legalArea,
  taskType
}: UseTemplateHandlersProps) {
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

  const handleSavePrompt = (title: string, promptText: string) => {
    if (!promptText) {
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
      template: promptText
    };
    
    // Add the new template to templates
    setTemplates([...templates, newTemplate]);
    setNextTemplateId(nextTemplateId + 1);
    
    toast({
      title: "Prompt Saved",
      description: "Your prompt has been saved to your template library."
    });
  };

  return {
    handleCopyPrompt,
    handleSavePrompt
  };
}

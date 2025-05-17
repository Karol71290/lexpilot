
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PromptTemplateCard } from "./PromptTemplateCard";
import { useToast } from "@/hooks/use-toast";

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  legalArea: string;
  taskType: string;
  persona: string[];
  role: string[];
  template: string;
}

interface PopularTemplatesProps {
  templates: PromptTemplate[];
  selectedTemplate: string | null;
  onCopyPrompt: (id: string, text: string) => void;
  onSelectTemplate: (template: PromptTemplate) => void;
}

export const PopularTemplates = ({
  templates,
  selectedTemplate,
  onCopyPrompt,
  onSelectTemplate
}: PopularTemplatesProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const handleCopyPrompt = (id: string, text: string) => {
    onCopyPrompt(id, text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Card className="card-gradient h-full">
      <CardHeader>
        <CardTitle>Popular Templates</CardTitle>
        <CardDescription>
          Pre-built prompts for common legal tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 overflow-auto max-h-[800px]">
        {templates.slice(0, 5).map((template) => (
          <PromptTemplateCard 
            key={template.id}
            template={template} 
            selectedTemplate={selectedTemplate} 
            onCopyPrompt={handleCopyPrompt}
            onSelectTemplate={onSelectTemplate}
            copied={copied}
          />
        ))}
      </CardContent>
    </Card>
  );
};

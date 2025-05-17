
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Code, Copy } from "lucide-react";
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

interface PromptTemplateCardProps {
  template: PromptTemplate;
  selectedTemplate: string | null;
  onCopyPrompt: (id: string, text: string) => void;
  onSelectTemplate: (template: PromptTemplate) => void;
  copied: string | null;
}

export const PromptTemplateCard = ({
  template,
  selectedTemplate,
  onCopyPrompt,
  onSelectTemplate,
  copied
}: PromptTemplateCardProps) => {
  return (
    <Card 
      key={template.id} 
      className={`border ${selectedTemplate === template.id ? 'border-primary border-2' : 'border-border'} hover:border-primary/50 transition-all cursor-pointer`}
      onClick={() => onSelectTemplate(template)}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{template.title}</CardTitle>
          <div className="bg-lawadapt-purple/10 text-lawadapt-purple px-2 py-1 rounded text-xs font-medium">
            {template.legalArea}
          </div>
        </div>
        <CardDescription className="text-xs">{template.description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-2">
        <Button 
          variant="outline" 
          size="sm"
          className="w-full text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onCopyPrompt(template.id, template.template);
          }}
        >
          {copied === template.id ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Applied
            </>
          ) : (
            <>
              <Code className="h-3 w-3 mr-1" />
              Use Template
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

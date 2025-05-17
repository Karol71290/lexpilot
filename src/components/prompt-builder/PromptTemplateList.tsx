
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Copy, FileText } from "lucide-react";
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

interface PromptTemplateListProps {
  templates: PromptTemplate[];
  searchQuery: string;
  selectedTemplate: string | null;
  onCopyPrompt: (id: string, text: string) => void;
  onSelectTemplate: (template: PromptTemplate) => void;
}

export const PromptTemplateList = ({
  templates, 
  searchQuery, 
  selectedTemplate, 
  onCopyPrompt,
  onSelectTemplate
}: PromptTemplateListProps) => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const filteredPrompts = templates.filter(prompt => {
    if (!searchQuery) return true;
    
    const matchesSearch = 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.legalArea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.taskType.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleCopyPrompt = (id: string, text: string) => {
    onCopyPrompt(id, text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (filteredPrompts.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Matching Templates</h3>
        <p className="text-muted-foreground">Try adjusting your search terms or browse all templates</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.dispatchEvent(new CustomEvent('clear-search'))}
        >
          Show All Templates
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredPrompts.map((template) => (
        <PromptTemplateCard 
          key={template.id}
          template={template} 
          selectedTemplate={selectedTemplate} 
          onCopyPrompt={handleCopyPrompt}
          onSelectTemplate={onSelectTemplate}
          copied={copied}
        />
      ))}
    </div>
  );
};

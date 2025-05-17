
import { PromptTemplateList } from "./PromptTemplateList";

interface TemplatesTabContentProps {
  templates: any[];
  searchQuery: string;
  selectedTemplate: string | null;
  handleCopyPrompt: (id: string, text: string) => void;
  handleTemplateSelect: (template: any) => void;
}

export const TemplatesTabContent = ({
  templates,
  searchQuery,
  selectedTemplate,
  handleCopyPrompt,
  handleTemplateSelect
}: TemplatesTabContentProps) => {
  return (
    <PromptTemplateList 
      templates={templates}
      searchQuery={searchQuery}
      selectedTemplate={selectedTemplate}
      onCopyPrompt={handleCopyPrompt}
      onSelectTemplate={handleTemplateSelect}
    />
  );
};

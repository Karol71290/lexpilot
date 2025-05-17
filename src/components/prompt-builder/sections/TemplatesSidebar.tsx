
import { PopularTemplates } from "../PopularTemplates";

interface TemplatesSidebarProps {
  templates: any[];
  selectedTemplate: string | null;
  onCopyPrompt: (id: string, text: string) => void;
  onSelectTemplate: (template: any) => void;
}

export const TemplatesSidebar = ({
  templates,
  selectedTemplate,
  onCopyPrompt,
  onSelectTemplate
}: TemplatesSidebarProps) => {
  return (
    <PopularTemplates 
      templates={templates}
      selectedTemplate={selectedTemplate}
      onCopyPrompt={onCopyPrompt}
      onSelectTemplate={onSelectTemplate}
    />
  );
};

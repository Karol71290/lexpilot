
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePromptBuilderState } from "@/hooks/usePromptBuilderState";
import { usePromptBuilderHandlers } from "@/hooks/usePromptBuilderHandlers";
import { PromptBuilderHeader } from "@/components/prompt-builder/PromptBuilderHeader";
import { BuilderTabContent } from "@/components/prompt-builder/BuilderTabContent";
import { TemplatesTabContent } from "@/components/prompt-builder/TemplatesTabContent";

const PromptBuilder = () => {
  // Use our custom hooks to manage state and handlers
  const state = usePromptBuilderState();
  const handlers = usePromptBuilderHandlers({
    generatedPrompt: state.generatedPrompt,
    setGeneratedPrompt: state.setGeneratedPrompt,
    promptText: state.searchQuery, // Pass searchQuery as promptText
    setAiResponse: state.setAiResponse,
    setSelectedTemplate: state.setSelectedTemplate,
    setIsGeneratingResponse: state.setIsGeneratingResponse,
    templates: state.templates,
    setTemplates: state.setTemplates,
    nextTemplateId: state.nextTemplateId,
    setNextTemplateId: state.setNextTemplateId,
    legalArea: state.legalArea,
    setLegalArea: state.setLegalArea,
    taskType: state.taskType,
    setTaskType: state.setTaskType,
    promptTechnique: state.promptTechnique,
    setPromptTechnique: state.setPromptTechnique,
    context: state.context,
    jurisdiction: state.jurisdiction,
    tone: state.tone,
    outputFormat: state.outputFormat
  });

  return (
    <AppLayout title="Legal Prompt Builder">
      <div className="grid gap-6">
        {/* Page Header */}
        <PromptBuilderHeader 
          searchQuery={state.searchQuery} 
          setSearchQuery={state.setSearchQuery} 
        />
        
        <Tabs defaultValue="builder">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Prompt Builder</TabsTrigger>
            <TabsTrigger value="templates">Template Library</TabsTrigger>
          </TabsList>
          
          {/* Builder Tab Content */}
          <TabsContent value="builder" className="mt-6">
            <BuilderTabContent
              legalArea={state.legalArea}
              setLegalArea={state.setLegalArea}
              taskType={state.taskType}
              setTaskType={state.setTaskType}
              promptTechnique={state.promptTechnique}
              setPromptTechnique={state.setPromptTechnique}
              context={state.context}
              setContext={state.setContext}
              jurisdiction={state.jurisdiction}
              setJurisdiction={state.setJurisdiction}
              tone={state.tone}
              setTone={state.setTone}
              outputFormat={state.outputFormat}
              setOutputFormat={state.setOutputFormat}
              generatedPrompt={state.generatedPrompt}
              setGeneratedPrompt={state.setGeneratedPrompt}
              aiResponse={state.aiResponse}
              isGeneratingResponse={state.isGeneratingResponse}
              templates={state.templates}
              selectedTemplate={state.selectedTemplate}
              temperature={state.temperature}
              setTemperature={state.setTemperature}
              maxTokens={state.maxTokens}
              setMaxTokens={state.setMaxTokens}
              handleGeneratePrompt={handlers.handleGeneratePrompt}
              handleCustomPromptSubmit={handlers.handleCustomPromptSubmit}
              handleCopyGeneratedPrompt={handlers.handleCopyGeneratedPrompt}
              handleSavePrompt={handlers.handleSavePrompt}
              handleImproveWithAI={handlers.handleImproveWithAI}
              handleCopyPrompt={handlers.handleCopyPrompt}
              handleTemplateSelect={handlers.handleTemplateSelect}
            />
          </TabsContent>
          
          {/* Templates Tab Content */}
          <TabsContent value="templates" className="mt-6">
            <TemplatesTabContent
              templates={state.templates}
              searchQuery={state.searchQuery}
              selectedTemplate={state.selectedTemplate}
              handleCopyPrompt={handlers.handleCopyPrompt}
              handleTemplateSelect={handlers.handleTemplateSelect}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PromptBuilder;

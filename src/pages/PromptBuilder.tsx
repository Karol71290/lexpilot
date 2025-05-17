
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import prompt templates data
import { promptTemplates } from "@/components/prompt-builder/PromptTemplateData";

// Import components
import { PromptBuilderForm } from "@/components/prompt-builder/PromptBuilderForm";
import { PopularTemplates } from "@/components/prompt-builder/PopularTemplates";
import { GeneratedPrompt } from "@/components/prompt-builder/GeneratedPrompt";
import { AIResponsePreview } from "@/components/prompt-builder/AIResponsePreview";
import { PromptTemplateList } from "@/components/prompt-builder/PromptTemplateList";

const PromptBuilder = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [promptTechnique, setPromptTechnique] = useState("cot");
  const [legalArea, setLegalArea] = useState("");
  const [taskType, setTaskType] = useState("");
  const [useCase, setUseCase] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [tone, setTone] = useState("professional");
  const [outputFormat, setOutputFormat] = useState("");
  const [context, setContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Listen for clear search events
  useEffect(() => {
    const clearSearch = () => setSearchQuery("");
    window.addEventListener('clear-search', clearSearch);
    return () => window.removeEventListener('clear-search', clearSearch);
  }, []);

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
    if (!legalArea || !taskType || !useCase || !promptTechnique) {
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

${useCase}

${context ? `Context/Background information: ${context}\n` : ""}
${jurisdiction ? `Jurisdiction: ${jurisdiction}\n` : ""}
${tone ? `Tone: ${tone}\n` : ""}
${outputFormat ? `Please format your response as: ${outputFormat}` : ""}`;

    setGeneratedPrompt(generatedPrompt);
    
    // In a real application, this would call an AI API
    const mockAIResponse = `This is a simulated AI response based on your prompt. In a real implementation, this would call an API to generate a response based on your prompt.

For this ${useCase} in ${legalArea} law, here's a ${outputFormat ? outputFormat : "response"}:

1. First point of legal analysis
2. Second point with relevant case law
3. Recommendations based on ${jurisdiction} jurisdiction
4. Considerations for implementation
5. Next steps and additional resources`;

    setAiResponse(mockAIResponse);
    
    toast({
      title: "Prompt Generated",
      description: "Your custom legal prompt has been generated."
    });
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id);
    setGeneratedPrompt(template.template);
    setLegalArea(template.legalArea);
    setTaskType(template.taskType);
    
    // In a real application, this would call an AI API
    const mockAIResponse = `This is a simulated AI response based on the "${template.title}" template. In a real implementation, this would call an API to generate a response.

For a ${template.taskType} in ${template.legalArea}, here's a professional response:

1. First point of analysis for ${template.title}
2. Second point with relevant considerations
3. Key recommendations for implementation
4. Additional legal considerations
5. Next steps and resources`;

    setAiResponse(mockAIResponse);
  };

  const handleCopyGeneratedPrompt = () => {
    if (!generatedPrompt) return;
    
    navigator.clipboard.writeText(generatedPrompt);
    
    toast({
      title: "Generated Prompt Copied",
      description: "Your generated prompt has been copied to your clipboard."
    });
  };

  const handleSavePrompt = () => {
    if (!generatedPrompt) {
      toast({
        title: "No Prompt to Save",
        description: "Please generate a prompt before saving.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would save to a database
    toast({
      title: "Prompt Saved",
      description: "Your prompt has been saved to your library."
    });
  };

  return (
    <AppLayout title="Legal Prompt Builder">
      <div className="grid gap-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Legal Prompt Builder</h1>
            <p className="text-muted-foreground">Craft effective legal prompts for AI tools tailored to your specific needs</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </section>
        
        <Tabs defaultValue="builder">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Prompt Builder</TabsTrigger>
            <TabsTrigger value="templates">Template Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Prompt Builder Form */}
                <PromptBuilderForm
                  legalArea={legalArea}
                  setLegalArea={setLegalArea}
                  taskType={taskType}
                  setTaskType={setTaskType}
                  useCase={useCase}
                  setUseCase={setUseCase}
                  promptTechnique={promptTechnique}
                  setPromptTechnique={setPromptTechnique}
                  context={context}
                  setContext={setContext}
                  jurisdiction={jurisdiction}
                  setJurisdiction={setJurisdiction}
                  tone={tone}
                  setTone={setTone}
                  outputFormat={outputFormat}
                  setOutputFormat={setOutputFormat}
                  onGeneratePrompt={handleGeneratePrompt}
                />
                
                {/* Generated Prompt */}
                <GeneratedPrompt 
                  generatedPrompt={generatedPrompt}
                  onCopyGeneratedPrompt={handleCopyGeneratedPrompt}
                  onSavePrompt={handleSavePrompt}
                />
                
                {/* AI Response Preview */}
                <AIResponsePreview aiResponse={aiResponse} />
              </div>
              
              <div className="lg:col-span-1">
                {/* Popular Templates */}
                <PopularTemplates 
                  templates={promptTemplates}
                  selectedTemplate={selectedTemplate}
                  onCopyPrompt={handleCopyPrompt}
                  onSelectTemplate={handleTemplateSelect}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            {/* Template List */}
            <PromptTemplateList 
              templates={promptTemplates}
              searchQuery={searchQuery}
              selectedTemplate={selectedTemplate}
              onCopyPrompt={handleCopyPrompt}
              onSelectTemplate={handleTemplateSelect}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PromptBuilder;

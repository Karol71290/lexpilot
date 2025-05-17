import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ToggleLeft, ToggleRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Import prompt templates data
import { promptTemplates } from "@/components/prompt-builder/PromptTemplateData";

// Import components
import { PromptBuilderForm } from "@/components/prompt-builder/PromptBuilderForm";
import { PopularTemplates } from "@/components/prompt-builder/PopularTemplates";
import { GeneratedPrompt } from "@/components/prompt-builder/GeneratedPrompt";
import { AIResponsePreview } from "@/components/prompt-builder/AIResponsePreview";
import { PromptTemplateList } from "@/components/prompt-builder/PromptTemplateList";
import { FreeformPromptInput } from "@/components/prompt-builder/FreeformPromptInput";

const PromptBuilder = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [promptTechnique, setPromptTechnique] = useState("cot");
  const [legalArea, setLegalArea] = useState("");
  const [taskType, setTaskType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [tone, setTone] = useState("professional");
  const [outputFormat, setOutputFormat] = useState("");
  const [context, setContext] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState(promptTemplates);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [nextTemplateId, setNextTemplateId] = useState(promptTemplates.length + 1);
  const [useGuidedBuilder, setUseGuidedBuilder] = useState(true);

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

  const handleSubmitFreeformPrompt = (promptText: string) => {
    setGeneratedPrompt(promptText);
    
    toast({
      title: "Prompt Submitted",
      description: "Your custom prompt has been added to the preview."
    });

    // In a real application, this would call an AI API
    setIsGeneratingResponse(true);
    setTimeout(() => {
      const mockAIResponse = `This is a simulated AI response based on your freeform prompt. In a real implementation, this would call an API to generate a response based on your custom prompt text.

Here's a structured response:

1. First point of analysis
2. Second point with relevant context
3. Recommendations based on the prompt
4. Considerations for implementation
5. Next steps and additional resources`;

      setAiResponse(mockAIResponse);
      setIsGeneratingResponse(false);
    }, 1500);
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
      description: `Custom template for ${legalArea} ${taskType}`,
      category: legalArea,
      legalArea: legalArea,
      taskType: taskType,
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
        description: "Please generate a prompt before applying improvements.",
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
        }
      }
      
      if (improvements.includes("xml-tags")) {
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
        improvedPrompt = improvedPrompt.replace(
          /As a legal professional with expertise in (.*?), I need assistance with the following (.*?) task:/g,
          'As a legal professional with expertise in <area>$1</area>, I need assistance with the following <task>$2</task> task:'
        );
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
        }
        
        improvedPrompt += legalContext;
      }
      
      setGeneratedPrompt(improvedPrompt);
      
      // Generate a new AI response for the improved prompt
      const mockImprovedResponse = `This is a simulated AI response based on your improved prompt.

For this enhanced ${taskType} in ${legalArea} law, here's a comprehensive ${outputFormat ? outputFormat : "response"} with improved structure and depth:

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

  const toggleBuilderMode = () => {
    setUseGuidedBuilder(!useGuidedBuilder);
    
    toast({
      title: useGuidedBuilder ? "Switched to Freeform Mode" : "Switched to Guided Mode",
      description: useGuidedBuilder 
        ? "You can now write or paste prompts directly." 
        : "You can now build prompts using the guided interface."
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
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={toggleBuilderMode}
              className="hidden md:flex items-center gap-2"
            >
              {useGuidedBuilder ? <ToggleLeft className="h-5 w-5" /> : <ToggleRight className="h-5 w-5" />}
              {useGuidedBuilder ? 'Switch to Freeform' : 'Switch to Guided'}
            </Button>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </section>
        
        <Button 
          variant="outline" 
          onClick={toggleBuilderMode}
          className="md:hidden flex items-center gap-2 w-full mb-2"
        >
          {useGuidedBuilder ? <ToggleLeft className="h-5 w-5" /> : <ToggleRight className="h-5 w-5" />}
          {useGuidedBuilder ? 'Switch to Freeform Mode' : 'Switch to Guided Mode'}
        </Button>
        
        <Tabs defaultValue="builder">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="builder">Prompt Builder</TabsTrigger>
            <TabsTrigger value="templates">Template Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Conditional rendering based on builder mode */}
                {useGuidedBuilder ? (
                  <PromptBuilderForm
                    legalArea={legalArea}
                    setLegalArea={setLegalArea}
                    taskType={taskType}
                    setTaskType={setTaskType}
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
                    onImproveWithAI={handleImproveWithAI}
                  />
                ) : (
                  <FreeformPromptInput
                    onSubmitPrompt={handleSubmitFreeformPrompt}
                  />
                )}
                
                {/* Generated Prompt - shown for both modes */}
                <GeneratedPrompt 
                  generatedPrompt={generatedPrompt}
                  legalArea={legalArea}
                  taskType={taskType}
                  promptTechnique={promptTechnique}
                  onCopyGeneratedPrompt={handleCopyGeneratedPrompt}
                  onSavePrompt={handleSavePrompt}
                  onImproveWithAI={handleImproveWithAI}
                />
                
                {/* AI Response Preview - shown for both modes */}
                <AIResponsePreview 
                  aiResponse={aiResponse} 
                  isLoading={isGeneratingResponse}
                />
              </div>
              
              <div className="lg:col-span-1">
                {/* Popular Templates */}
                <PopularTemplates 
                  templates={templates}
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
              templates={templates}
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

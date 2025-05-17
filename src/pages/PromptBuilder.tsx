
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Check, 
  Copy, 
  FileText, 
  Search, 
  Upload,
  Download,
  Code
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PromptBuilder = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
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

  // This would come from an API in a real application
  const promptTemplates = [
    {
      id: "1",
      title: "Legal Research Summary",
      description: "Generate a concise summary of legal research on a specific topic",
      category: "Research",
      legalArea: "General",
      taskType: "Summarize",
      persona: ["Strategic Adopter", "Pragmatic User"],
      role: ["Associate", "Partner"],
      template: `Please provide a comprehensive legal research summary on [TOPIC]. Include:

1. Key relevant case law with brief summaries
2. Important statutory provisions
3. Scholarly articles and their main arguments
4. Potential counterarguments
5. Practice implications

Format the response as a structured outline with bullet points. Focus on developments within the past 5 years unless specified otherwise.`
    },
    {
      id: "2",
      title: "Contract Clause Drafter",
      description: "Generate contract clauses based on specific requirements",
      category: "Drafting",
      legalArea: "Corporate",
      taskType: "Draft",
      persona: ["AI Innovator", "Strategic Adopter"],
      role: ["Associate", "Partner", "Contract Manager"],
      template: `Please draft a [TYPE] clause for a [CONTRACT TYPE] that addresses the following concern: [CONCERN].

The clause should:
1. Be written in plain language while maintaining legal precision
2. Be enforceable under [JURISDICTION] law
3. Address potential loopholes
4. Include definitions for key terms if necessary
5. Be consistent with standard contract formatting

Additionally, provide a brief explanation of how this clause protects the client's interests and any negotiation considerations.`
    },
    {
      id: "3",
      title: "Litigation Strategy Outline",
      description: "Generate a litigation strategy based on case facts",
      category: "Litigation",
      legalArea: "Litigation",
      taskType: "Plan",
      persona: ["Strategic Adopter", "Cautious Evaluator"],
      role: ["Associate", "Partner"],
      template: `Based on the following case facts: [FACTS]

Please develop a comprehensive litigation strategy that includes:

1. Key legal theories and potential claims/defenses
2. Critical evidence needed and discovery strategy
3. Motion practice recommendations
4. Settlement considerations and valuation factors
5. Trial strategy outline
6. Timeline and resource allocation recommendations

Consider the jurisdiction of [JURISDICTION] and any relevant procedural rules. Format as a numbered outline with clear section headers.`
    },
    {
      id: "4",
      title: "IP Infringement Analysis",
      description: "Analyze potential IP infringement issues",
      category: "Analysis",
      legalArea: "IP Law",
      taskType: "Analyze",
      persona: ["Strategic Adopter", "Cautious Evaluator"],
      role: ["Associate", "Partner"],
      template: `Please analyze the following potential intellectual property infringement situation:

[DESCRIBE SITUATION]

Provide a comprehensive analysis that covers:

1. Type of IP potentially infringed (patent, trademark, copyright, trade secret)
2. Elements required to establish infringement
3. Potential defenses available
4. Remedies available if infringement is found
5. Recommended next steps for further investigation
6. Risk assessment and potential exposure

Include relevant case law and statutory provisions from [JURISDICTION].`
    },
    {
      id: "5",
      title: "Document Review Checklist",
      description: "Create a customized document review checklist",
      category: "Document Review",
      legalArea: "General",
      taskType: "Review",
      persona: ["Pragmatic User", "Cautious Evaluator"],
      role: ["Associate", "Paralegal", "Document Reviewer"],
      template: `Please create a comprehensive document review checklist for [DOCUMENT TYPE] in the context of [MATTER TYPE].

The checklist should include:

1. Key provisions to identify and analyze
2. Common issues or red flags to watch for
3. Industry-specific considerations for [INDUSTRY]
4. Regulatory compliance elements
5. Best practices for efficient review
6. Documentation standards for findings

Format as a structured checklist with clear sections and subsections that can be used by a legal team during review.`
    },
    {
      id: "6",
      title: "NDA Clause Analysis",
      description: "Analyze non-disclosure agreement clauses",
      category: "Analysis",
      legalArea: "Corporate",
      taskType: "Analyze",
      persona: ["Pragmatic User", "Strategic Adopter"],
      role: ["Associate", "Contract Manager"],
      template: `Please analyze the following NDA clause:

[CLAUSE]

Provide a detailed analysis including:

1. Effectiveness of the confidentiality protection
2. Duration and scope considerations
3. Enforceability issues under [JURISDICTION] law
4. Potential loopholes or ambiguities
5. Recommendations for strengthening the provision
6. Comparison to industry standard language

Format your response as a professional memo with clear headings for each analysis area.`
    }
  ];

  const legalAreas = [
    "Corporate", "Litigation", "IP Law", "Real Estate", "Environmental",
    "Employment", "Tax", "Finance", "Regulatory Compliance", "General"
  ];

  const taskTypes = [
    "Draft", "Analyze", "Summarize", "Review", "Compare", "Research",
    "Plan", "Advise", "Respond", "Negotiate"
  ];

  const useCases = [
    "NDA Clause Analysis", "Trademark Opposition Response", "Contract Review",
    "Litigation Risk Assessment", "Patent Infringement Analysis", "M&A Due Diligence",
    "Employment Agreement Drafting", "Regulatory Compliance Check", "Document Discovery Review",
    "Legal Research Memo", "Settlement Agreement Drafting", "Case Law Summary"
  ];

  const jurisdictions = [
    "US Federal", "California", "New York", "Delaware", "Texas",
    "UK", "EU", "Canada", "Australia", "International"
  ];

  const outputFormats = [
    "Legal Memo", "Bullet Points", "Table/Matrix", "Contract Clause",
    "Email Draft", "Timeline", "Decision Tree", "Numbered List",
    "Executive Summary", "Q&A Format"
  ];

  const promptTechniques = [
    {
      id: "cot",
      name: "Chain of Thought (CoT)",
      description: "Steps through reasoning before conclusion"
    },
    {
      id: "tot",
      name: "Tree of Thought (ToT)",
      description: "Explores multiple reasoning paths"
    },
    {
      id: "icl",
      name: "In-Context Learning (ICL)",
      description: "Uses examples to guide the response"
    },
    {
      id: "tabular",
      name: "Tabular Output",
      description: "Presents information in structured tables"
    },
    {
      id: "refine",
      name: "Self-Refine / Self-Critique",
      description: "Evaluates and improves its own response"
    }
  ];

  const toneOptions = [
    "Professional", "Academic", "Conversational", "Simplified",
    "Persuasive", "Objective", "Instructional"
  ];

  const filteredPrompts = promptTemplates.filter(prompt => {
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
    navigator.clipboard.writeText(text);
    setCopied(id);
    
    toast({
      title: "Prompt Copied",
      description: "The prompt template has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(null), 2000);
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
                <Card className="card-gradient">
                  <CardHeader>
                    <CardTitle>Legal Prompt Builder</CardTitle>
                    <CardDescription>
                      Customize your prompt with legal-specific parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="legal-area">Legal Area <span className="text-red-500">*</span></Label>
                        <Select value={legalArea} onValueChange={setLegalArea}>
                          <SelectTrigger id="legal-area">
                            <SelectValue placeholder="Select legal area" />
                          </SelectTrigger>
                          <SelectContent>
                            {legalAreas.map((area) => (
                              <SelectItem key={area} value={area}>{area}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="task-type">Task Type <span className="text-red-500">*</span></Label>
                        <Select value={taskType} onValueChange={setTaskType}>
                          <SelectTrigger id="task-type">
                            <SelectValue placeholder="Select task type" />
                          </SelectTrigger>
                          <SelectContent>
                            {taskTypes.map((task) => (
                              <SelectItem key={task} value={task}>{task}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="use-case">Legal Use Case <span className="text-red-500">*</span></Label>
                      <Select value={useCase} onValueChange={setUseCase}>
                        <SelectTrigger id="use-case">
                          <SelectValue placeholder="Select use case" />
                        </SelectTrigger>
                        <SelectContent>
                          {useCases.map((case_) => (
                            <SelectItem key={case_} value={case_}>{case_}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Prompt Technique <span className="text-red-500">*</span></Label>
                      <RadioGroup value={promptTechnique} onValueChange={setPromptTechnique} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {promptTechniques.map((technique) => (
                          <div key={technique.id} className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent/10 cursor-pointer">
                            <RadioGroupItem value={technique.id} id={technique.id} />
                            <div className="grid gap-1">
                              <Label htmlFor={technique.id} className="cursor-pointer">
                                {technique.name}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {technique.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-medium">Optional Context Enrichment</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="context">Document/Clause Context</Label>
                        <Textarea 
                          id="context"
                          placeholder="Paste relevant text, clauses, or case facts here..."
                          value={context}
                          onChange={(e) => setContext(e.target.value)}
                          className="resize-none min-h-[100px]"
                        />
                        <div className="flex justify-end">
                          <Button variant="outline" size="sm" className="text-xs">
                            <Upload className="h-3 w-3 mr-1" />
                            Upload Document
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="jurisdiction">Jurisdiction</Label>
                          <Select value={jurisdiction} onValueChange={setJurisdiction}>
                            <SelectTrigger id="jurisdiction">
                              <SelectValue placeholder="Select jurisdiction" />
                            </SelectTrigger>
                            <SelectContent>
                              {jurisdictions.map((j) => (
                                <SelectItem key={j} value={j}>{j}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="tone">Tone</Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger id="tone">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              {toneOptions.map((t) => (
                                <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="output-format">Output Format</Label>
                          <Select value={outputFormat} onValueChange={setOutputFormat}>
                            <SelectTrigger id="output-format">
                              <SelectValue placeholder="Select output format" />
                            </SelectTrigger>
                            <SelectContent>
                              {outputFormats.map((format) => (
                                <SelectItem key={format} value={format}>{format}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleGeneratePrompt}>
                      Generate Legal Prompt
                    </Button>
                  </CardFooter>
                </Card>
                
                {generatedPrompt && (
                  <Card className="card-gradient">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>Generated Prompt</CardTitle>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={handleCopyGeneratedPrompt}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleSavePrompt}>
                            <Download className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-background/60 p-4 rounded-md text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
                        {generatedPrompt}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {aiResponse && (
                  <Card className="card-gradient">
                    <CardHeader>
                      <CardTitle>AI Response Preview</CardTitle>
                      <CardDescription>
                        Example of what the AI might return based on your prompt
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-background/60 p-4 rounded-md text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                        {aiResponse}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="lg:col-span-1">
                <Card className="card-gradient h-full">
                  <CardHeader>
                    <CardTitle>Popular Templates</CardTitle>
                    <CardDescription>
                      Pre-built prompts for common legal tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 overflow-auto max-h-[800px]">
                    {promptTemplates.slice(0, 5).map((template) => (
                      <Card 
                        key={template.id} 
                        className={`border ${selectedTemplate === template.id ? 'border-primary border-2' : 'border-border'} hover:border-primary/50 transition-all cursor-pointer`}
                        onClick={() => handleTemplateSelect(template)}
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
                              handleCopyPrompt(template.id, template.template);
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
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrompts.length > 0 ? (
                filteredPrompts.map(prompt => (
                  <Card key={prompt.id} className="card-gradient">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{prompt.title}</CardTitle>
                          <CardDescription>{prompt.description}</CardDescription>
                        </div>
                        <div className="bg-lawadapt-purple/10 text-lawadapt-purple px-2 py-1 rounded text-xs font-medium">
                          {prompt.legalArea}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="text-xs">
                          <span className="font-semibold mr-1">Task:</span>
                          {prompt.taskType}
                        </div>
                        <div className="text-xs">
                          <span className="font-semibold mr-1">Best for:</span>
                          {prompt.persona.join(", ")}
                        </div>
                        <div className="text-xs">
                          <span className="font-semibold mr-1">Role:</span>
                          {prompt.role.join(", ")}
                        </div>
                      </div>
                      <div className="bg-background/60 p-3 rounded-md text-sm font-mono overflow-auto max-h-48">
                        {prompt.template}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleCopyPrompt(prompt.id, prompt.template)}
                      >
                        {copied === prompt.id ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => handleTemplateSelect(prompt)}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Matching Templates</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or browse all templates</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Show All Templates
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PromptBuilder;

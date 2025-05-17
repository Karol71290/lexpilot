
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Copy, FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PromptBuilder = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState({
    task: "",
    context: "",
    format: "",
    additional: ""
  });

  // This would come from an API in a real application
  const promptTemplates = [
    {
      id: "1",
      title: "Legal Research Summary",
      description: "Generate a concise summary of legal research on a specific topic",
      category: "Research",
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
      title: "Client Communication Draft",
      description: "Create a draft client email about a specific legal matter",
      category: "Communication",
      persona: ["Pragmatic User", "Cautious Evaluator"],
      role: ["Associate", "Partner", "Paralegal"],
      template: `Please draft an email to a client regarding [LEGAL MATTER]. The email should:

1. Use a professional but warm tone
2. Provide a clear update on the status of [SPECIFIC ASPECT]
3. Explain complex legal concepts in accessible language
4. Address potential client concerns about [CONCERN]
5. Outline next steps and any actions required from the client
6. Include a brief timeline for upcoming developments

Assume the client has [LEVEL] of familiarity with legal terminology. Avoid unnecessary jargon while maintaining accuracy.`
    },
    {
      id: "4",
      title: "Legal Issue Analysis",
      description: "Analyze a specific legal issue with a structured IRAC approach",
      category: "Analysis",
      persona: ["Strategic Adopter", "Cautious Evaluator"],
      role: ["Associate", "Partner"],
      template: `Please provide an IRAC (Issue, Rule, Analysis, Conclusion) analysis of the following legal situation:

[DESCRIBE SITUATION]

Format your response as follows:

## ISSUE
Clearly identify the precise legal question(s) raised by these facts.

## RULE
State the relevant legal rules, statutes, or precedents that govern this situation. Include citations where appropriate.

## ANALYSIS
Apply the rules to the specific facts of this situation. Discuss how courts have interpreted similar situations and address counterarguments.

## CONCLUSION
Provide your reasoned legal conclusion based on the analysis. Include recommendations for next steps if appropriate.`
    },
    {
      id: "5",
      title: "Document Review Checklist",
      description: "Create a customized document review checklist",
      category: "Document Review",
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
    }
  ];

  const filteredPrompts = promptTemplates.filter(prompt => {
    if (!searchQuery) return true;
    
    return (
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    
    toast({
      title: "Prompt Copied",
      description: "The prompt template has been copied to your clipboard."
    });
    
    setTimeout(() => setCopied(null), 2000);
  };

  const handleGenerateCustomPrompt = () => {
    if (!customPrompt.task) {
      toast({
        title: "Task Required",
        description: "Please describe the task for your prompt.",
        variant: "destructive"
      });
      return;
    }
    
    const generatedPrompt = `Task: ${customPrompt.task}

${customPrompt.context ? `Context: ${customPrompt.context}\n` : ""}
${customPrompt.format ? `Format: ${customPrompt.format}\n` : ""}
${customPrompt.additional ? `Additional instructions: ${customPrompt.additional}` : ""}`;

    navigator.clipboard.writeText(generatedPrompt);
    
    toast({
      title: "Custom Prompt Generated",
      description: "Your custom prompt has been copied to your clipboard."
    });
  };

  return (
    <AppLayout title="Prompt Builder & Library">
      <div className="grid gap-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Prompt Builder & Library</h1>
            <p className="text-muted-foreground">Craft effective prompts for legal AI tools or choose from our templates</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </section>
        
        <Tabs defaultValue="templates">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Prompt Templates</TabsTrigger>
            <TabsTrigger value="builder">Custom Prompt Builder</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                          {prompt.category}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-2 mb-4">
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
                    <CardFooter className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
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
                            Copy Prompt
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Matching Prompts</h3>
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
          
          <TabsContent value="builder" className="mt-6">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle>Custom Prompt Builder</CardTitle>
                <CardDescription>
                  Follow the structure below to create an effective prompt for legal AI tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="task">Task (Required)</Label>
                    <span className="text-xs text-muted-foreground">
                      {customPrompt.task.length}/300
                    </span>
                  </div>
                  <Textarea 
                    id="task"
                    placeholder="Describe the specific task you want the AI to perform. Be clear and specific."
                    value={customPrompt.task}
                    onChange={(e) => setCustomPrompt({...customPrompt, task: e.target.value})}
                    maxLength={300}
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="context">Context (Optional)</Label>
                  <Textarea 
                    id="context"
                    placeholder="Provide relevant background information, case details, or other context."
                    value={customPrompt.context}
                    onChange={(e) => setCustomPrompt({...customPrompt, context: e.target.value})}
                    className="resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="format">Output Format (Optional)</Label>
                    <Select 
                      value={customPrompt.format} 
                      onValueChange={(value) => setCustomPrompt({...customPrompt, format: value})}
                    >
                      <SelectTrigger id="format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No specific format</SelectItem>
                        <SelectItem value="Format as bullet points for easy scanning.">Bullet Points</SelectItem>
                        <SelectItem value="Format using IRAC (Issue, Rule, Analysis, Conclusion) structure.">IRAC Analysis</SelectItem>
                        <SelectItem value="Format as a professional email or letter.">Email/Letter</SelectItem>
                        <SelectItem value="Format as a structured memo with headings and subheadings.">Memo</SelectItem>
                        <SelectItem value="Format as a table with columns for comparison.">Comparison Table</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additional">Additional Instructions (Optional)</Label>
                    <Textarea 
                      id="additional"
                      placeholder="Any other specific instructions or requirements."
                      value={customPrompt.additional}
                      onChange={(e) => setCustomPrompt({...customPrompt, additional: e.target.value})}
                      className="resize-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleGenerateCustomPrompt}>
                  Generate & Copy Prompt
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default PromptBuilder;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptBuilderFormProps {
  legalArea: string;
  setLegalArea: (value: string) => void;
  taskType: string;
  setTaskType: (value: string) => void;
  useCase: string;
  setUseCase: (value: string) => void;
  promptTechnique: string;
  setPromptTechnique: (value: string) => void;
  context: string;
  setContext: (value: string) => void;
  jurisdiction: string;
  setJurisdiction: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
  onGeneratePrompt: () => void;
}

export const PromptBuilderForm = ({
  legalArea,
  setLegalArea,
  taskType,
  setTaskType,
  useCase,
  setUseCase,
  promptTechnique,
  setPromptTechnique,
  context,
  setContext,
  jurisdiction,
  setJurisdiction,
  tone,
  setTone,
  outputFormat,
  setOutputFormat,
  onGeneratePrompt
}: PromptBuilderFormProps) => {
  const { toast } = useToast();
  
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

  return (
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
        <Button className="w-full" onClick={onGeneratePrompt}>
          Generate Legal Prompt
        </Button>
      </CardFooter>
    </Card>
  );
};

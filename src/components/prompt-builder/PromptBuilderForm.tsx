
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Checkbox,
} from "@/components/ui/checkbox";

interface PromptBuilderFormProps {
  legalArea: string;
  setLegalArea: (value: string) => void;
  taskType: string;
  setTaskType: (value: string) => void;
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
  onImproveWithAI: (improvements: string[]) => void;
}

export const PromptBuilderForm = ({
  legalArea,
  setLegalArea,
  taskType,
  setTaskType,
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
  onGeneratePrompt,
  onImproveWithAI
}: PromptBuilderFormProps) => {
  const { toast } = useToast();
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  
  const legalAreas = [
    "Corporate", "Litigation", "IP Law", "Real Estate", "Environmental",
    "Employment", "Tax", "Finance", "Regulatory Compliance", "General"
  ];

  const taskTypes = [
    "Draft", "Analyze", "Summarize", "Review", "Compare", "Research",
    "Plan", "Advise", "Respond", "Negotiate"
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

  const improvementOptions = [
    {
      id: "auto-technique",
      name: "🔄 Auto-Select Best Prompt Technique",
      description: "Applies the most relevant prompting approach"
    },
    {
      id: "xml-tags",
      name: "🏷️ Add XML Tags",
      description: "Wraps key variables or instructions with tags for structure"
    },
    {
      id: "clarity",
      name: "✨ Enhance Clarity and Precision",
      description: "Refines prompt wording to reduce ambiguity"
    },
    {
      id: "legal-context",
      name: "📚 Add Domain-Specific Legal Context",
      description: "Inserts helpful references and definitions"
    },
  ];

  const toneOptions = [
    "Professional", "Academic", "Conversational", "Simplified",
    "Persuasive", "Objective", "Instructional"
  ];
  
  const toggleImprovement = (id: string) => {
    setSelectedImprovements(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const handleApplyImprovements = () => {
    if (selectedImprovements.length === 0) {
      toast({
        title: "No Improvements Selected",
        description: "Please select at least one improvement to apply.",
        variant: "destructive"
      });
      return;
    }
    
    onImproveWithAI(selectedImprovements);
    setSelectedImprovements([]);
  };

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
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button className="w-full sm:w-auto" onClick={onGeneratePrompt}>
          Generate Legal Prompt
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Wand2 className="mr-2 h-4 w-4" />
              Improve with AI
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-sm p-4" align="end">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Select Improvements</h4>
              <div className="space-y-2">
                {improvementOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-2 border rounded-md p-2">
                    <Checkbox 
                      id={option.id} 
                      checked={selectedImprovements.includes(option.id)} 
                      onCheckedChange={() => toggleImprovement(option.id)}
                      className="mt-1"
                    />
                    <div className="grid gap-0.5">
                      <Label htmlFor={option.id} className="cursor-pointer">
                        {option.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={handleApplyImprovements}>
                Apply Improvements
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

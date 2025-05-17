
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Save, Wand2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Checkbox,
} from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface GeneratedPromptProps {
  generatedPrompt: string;
  legalArea: string;
  taskType: string;
  promptTechnique: string;
  onCopyGeneratedPrompt: () => void;
  onSavePrompt: (title: string) => void;
  onImproveWithAI: (improvements: string[]) => void;
}

export const GeneratedPrompt = ({
  generatedPrompt,
  legalArea,
  taskType,
  promptTechnique,
  onCopyGeneratedPrompt,
  onSavePrompt,
  onImproveWithAI,
}: GeneratedPromptProps) => {
  const { toast } = useToast();
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);

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

  const handleSaveClick = () => {
    setPromptTitle(`${legalArea} ${taskType} Prompt`);
    setIsSaveDialogOpen(true);
  };

  const handleSaveConfirm = () => {
    if (!promptTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your prompt.",
        variant: "destructive",
      });
      return;
    }

    onSavePrompt(promptTitle);
    setIsSaveDialogOpen(false);
    setPromptTitle("");
  };

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

  if (!generatedPrompt) return null;

  return (
    <>
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Prompt Preview</CardTitle>
          <CardDescription>
            This is the prompt that will be sent to the AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-background/60 p-4 rounded-md text-sm overflow-auto max-h-96 whitespace-pre-wrap">
            {generatedPrompt}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onCopyGeneratedPrompt}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Prompt
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleSaveClick}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Prompt
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

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Prompt</DialogTitle>
            <DialogDescription>
              Give your prompt a title to save it to your templates.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="prompt-title">Prompt Title</Label>
            <Input
              id="prompt-title"
              value={promptTitle}
              onChange={(e) => setPromptTitle(e.target.value)}
              className="mt-2"
              placeholder="Enter a title for your prompt"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSaveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveConfirm}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

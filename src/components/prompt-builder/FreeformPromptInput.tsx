
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FreeformPromptInputProps {
  onSubmitPrompt: (promptText: string) => void;
  onImproveWithAI: (improvements: string[]) => void;
}

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

export const FreeformPromptInput = ({
  onSubmitPrompt,
  onImproveWithAI
}: FreeformPromptInputProps) => {
  const [promptText, setPromptText] = useState("");
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);

  const handleSubmitPrompt = () => {
    if (promptText.trim()) {
      onSubmitPrompt(promptText.trim());
    }
  };

  const toggleImprovement = (id: string) => {
    setSelectedImprovements(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  const handleApplyImprovements = () => {
    if (selectedImprovements.length > 0) {
      onImproveWithAI(selectedImprovements);
      setSelectedImprovements([]);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Write Your Own Prompt</CardTitle>
        <CardDescription>Enter a custom prompt to use or enhance</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type or paste your prompt here (e.g., 'Summarize this clause under UK trademark law')"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center gap-3">
        <Button 
          onClick={handleSubmitPrompt}
          className="w-full sm:w-auto"
          disabled={!promptText.trim()}
        >
          Submit Prompt
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
              <Button 
                className="w-full" 
                onClick={handleApplyImprovements}
                disabled={selectedImprovements.length === 0}
              >
                Apply Improvements
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};


import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wand2, CodeXml, Zap, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const improvementOptions = [
  {
    id: "auto-technique",
    name: "🔄 Auto-Select Best Prompt Technique",
    description: "Applies the most relevant prompting approach",
    icon: Wand2
  },
  {
    id: "xml-tags",
    name: "🏷️ Add XML Tags",
    description: "Wraps key variables or instructions with tags for structure",
    icon: CodeXml
  },
  {
    id: "clarity",
    name: "✨ Enhance Clarity and Precision",
    description: "Refines prompt wording to reduce ambiguity",
    icon: Zap
  },
  {
    id: "legal-context",
    name: "📚 Add Domain-Specific Legal Context",
    description: "Inserts helpful references and definitions",
    icon: BookOpen
  },
];

interface ImprovementOptionsProps {
  onImproveWithAI: (improvements: string[]) => void;
  label?: string;
  variant?: "default" | "outline" | "secondary";
  disabled?: boolean;
}

export const ImprovementOptions = ({ 
  onImproveWithAI, 
  label = "Enhance Prompt", 
  variant = "outline",
  disabled = false
}: ImprovementOptionsProps) => {
  const { toast } = useToast();
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  
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
    setOpen(false); // Close popover after applying
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant={variant} 
          className="w-full sm:w-auto" 
          disabled={disabled}
          onClick={() => !disabled && setOpen(true)}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          {label}
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
  );
};

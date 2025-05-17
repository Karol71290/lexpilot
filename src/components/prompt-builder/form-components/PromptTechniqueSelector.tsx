
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PromptTechniqueProps {
  promptTechnique: string;
  setPromptTechnique: (value: string) => void;
}

export const promptTechniques = [
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

export const PromptTechniqueSelector = ({
  promptTechnique,
  setPromptTechnique
}: PromptTechniqueProps) => {
  return (
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
  );
};

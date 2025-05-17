
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GeneratedPromptProps {
  generatedPrompt: string;
  legalArea: string;
  taskType: string;
  promptTechnique: string;
  onCopyGeneratedPrompt: () => void;
  onSavePrompt: (title: string) => void;
}

export const GeneratedPrompt = ({
  generatedPrompt,
  legalArea,
  taskType,
  promptTechnique,
  onCopyGeneratedPrompt,
  onSavePrompt
}: GeneratedPromptProps) => {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [promptTitle, setPromptTitle] = useState("");
  
  if (!generatedPrompt) return null;
  
  const handleSavePrompt = () => {
    const title = promptTitle.trim() || `${taskType || "Custom"} for ${legalArea || "General"}`;
    onSavePrompt(title);
    setSaveDialogOpen(false);
    setPromptTitle("");
  };
  
  return (
    <Card className="card-gradient">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Prompt Preview</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onCopyGeneratedPrompt}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save to Library
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Save Prompt Template</DialogTitle>
                  <DialogDescription>
                    Add a title to your prompt template before saving it to your library.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="prompt-title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="prompt-title"
                      value={promptTitle}
                      onChange={(e) => setPromptTitle(e.target.value)}
                      placeholder={`${taskType || "Custom"} for ${legalArea || "General"}`}
                      className="col-span-3"
                    />
                  </div>
                  {(legalArea || taskType || promptTechnique) && (
                    <>
                      {legalArea && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right text-muted-foreground">Legal Area</Label>
                          <div className="col-span-3 text-sm">{legalArea}</div>
                        </div>
                      )}
                      {taskType && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right text-muted-foreground">Task Type</Label>
                          <div className="col-span-3 text-sm">{taskType}</div>
                        </div>
                      )}
                      {promptTechnique && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right text-muted-foreground">Technique</Label>
                          <div className="col-span-3 text-sm">{promptTechnique === "cot" ? "Chain of Thought" :
                            promptTechnique === "tot" ? "Tree of Thought" : 
                            promptTechnique === "icl" ? "In-Context Learning" :
                            promptTechnique === "tabular" ? "Tabular Output" : 
                            "Self-Refine"}</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSavePrompt}>Save to Library</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-background/60 p-4 rounded-md text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
          {generatedPrompt}
        </div>
      </CardContent>
    </Card>
  );
};

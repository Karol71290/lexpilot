
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Save } from "lucide-react";
import { AIResponsePreview } from "../AIResponsePreview";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface OutputSectionProps {
  currentPrompt: string;
  legalArea: string;
  taskType: string;
  promptTechnique: string;
  aiResponse: string;
  isGeneratingResponse: boolean;
  isGeneratingPrompt: boolean;
  error?: string | null;
  handleCopyGeneratedPrompt: () => void;
  handleSavePrompt: (title: string) => void;
}

export const OutputSection = ({
  currentPrompt,
  legalArea,
  taskType,
  promptTechnique,
  aiResponse,
  isGeneratingResponse,
  isGeneratingPrompt,
  error,
  handleCopyGeneratedPrompt,
  handleSavePrompt
}: OutputSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Generated/Current Prompt */}
      <Card className="card-gradient">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Current Prompt</CardTitle>
              <CardDescription>
                This prompt will be used to generate your AI response
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              {promptTechnique === "cot" 
                ? "Chain of Thought" 
                : promptTechnique === "tot" 
                ? "Tree of Thought"
                : promptTechnique === "icl" 
                ? "In-Context Learning"
                : promptTechnique === "tabular" 
                ? "Tabular Format"
                : promptTechnique === "refine" 
                ? "Self-Refinement"
                : "Custom" }
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-md p-4 min-h-[120px] mb-4">
            {isGeneratingPrompt ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : currentPrompt ? (
              <div className="whitespace-pre-wrap text-sm">{currentPrompt}</div>
            ) : (
              <div className="text-muted-foreground text-center py-8">
                Enter a custom prompt above or select Legal Area and Task Type to generate one.
              </div>
            )}
          </div>
          {currentPrompt && !isGeneratingPrompt && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyGeneratedPrompt}>
                <Copy className="h-4 w-4 mr-1" /> Copy
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSavePrompt("New Template")}
              >
                <Save className="h-4 w-4 mr-1" /> Save as Template
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* AI Response Preview */}
      <AIResponsePreview 
        aiResponse={aiResponse} 
        isLoading={isGeneratingResponse}
        provider="OpenAI"
        error={error}
        onSaveResponse={handleSavePrompt}
      />
    </div>
  );
};

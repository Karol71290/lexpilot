
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { improvementOptions, ImprovementOptions } from "./form-components/ImprovementOptions";

interface FreeformPromptInputProps {
  onSubmitPrompt: (promptText: string) => void;
  onImproveWithAI: (improvements: string[]) => void;
}

export const FreeformPromptInput = ({
  onSubmitPrompt,
  onImproveWithAI
}: FreeformPromptInputProps) => {
  const [promptText, setPromptText] = useState("");

  const handleSubmitPrompt = () => {
    if (promptText.trim()) {
      onSubmitPrompt(promptText.trim());
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
        
        <ImprovementOptions onImproveWithAI={onImproveWithAI} />
      </CardFooter>
    </Card>
  );
};

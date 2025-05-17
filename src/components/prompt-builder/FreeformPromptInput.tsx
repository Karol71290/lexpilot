
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface FreeformPromptInputProps {
  onSubmitPrompt: (prompt: string) => void;
}

export const FreeformPromptInput = ({ onSubmitPrompt }: FreeformPromptInputProps) => {
  const [promptText, setPromptText] = useState("");

  const handleSubmit = () => {
    if (promptText.trim()) {
      onSubmitPrompt(promptText);
      setPromptText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && promptText.trim()) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>Freeform Prompt Input</CardTitle>
        <CardDescription>
          Write or paste your own prompt in natural language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your prompt here (e.g., 'Summarize this clause under UK trademark law')..."
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[150px] mb-4"
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={!promptText.trim()}
          className="flex items-center"
        >
          Submit Prompt
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

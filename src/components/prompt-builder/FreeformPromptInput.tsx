
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ModelSettings } from "./form-components/ModelSettings";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface FreeformPromptInputProps {
  promptText: string;
  setPromptText: (value: string) => void;
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  error?: string | null;
}

export const FreeformPromptInput = ({
  promptText,
  setPromptText,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  error
}: FreeformPromptInputProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-lg">Write Your Own Prompt</CardTitle>
            <CardDescription>Enter a custom prompt or combine with options below</CardDescription>
          </div>
          <div className="mt-2 sm:mt-0">
            <ModelSettings 
              temperature={temperature}
              setTemperature={setTemperature}
              maxTokens={maxTokens}
              setMaxTokens={setMaxTokens}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Textarea
          placeholder="Type or paste your prompt here (e.g., 'Summarize this clause under UK trademark law')"
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="min-h-[100px]"
        />
      </CardContent>
    </Card>
  );
};

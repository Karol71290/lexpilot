
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelSettings } from "./form-components/ModelSettings";
import { ErrorAlert } from "./form-components/ErrorAlert";
import { Textarea } from "@/components/ui/textarea";

interface FreeformPromptInputProps {
  customPromptText: string;
  setCustomPromptText: (value: string) => void;
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
  error?: string | null;
  isGeneratingPrompt: boolean;
}

export const FreeformPromptInput = ({
  customPromptText,
  setCustomPromptText,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  error,
  isGeneratingPrompt
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
        <ErrorAlert error={error} />
        <Textarea
          placeholder="Type or paste your prompt here (e.g., 'Summarize this clause under UK trademark law')"
          value={customPromptText}
          onChange={(e) => setCustomPromptText(e.target.value)}
          className="min-h-[100px]"
          disabled={isGeneratingPrompt}
        />
      </CardContent>
    </Card>
  );
};

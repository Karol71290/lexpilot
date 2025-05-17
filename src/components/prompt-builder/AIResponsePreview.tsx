
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";

interface AIResponsePreviewProps {
  aiResponse: string;
  isLoading?: boolean;
  provider?: string;
  error?: string | null;
}

export const AIResponsePreview = ({
  aiResponse,
  isLoading = false,
  provider = "AI",
  error = null
}: AIResponsePreviewProps) => {
  if (!aiResponse && !isLoading && !error) return null;
  
  return (
    <Card className="card-gradient">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>AI Response Preview</CardTitle>
            <CardDescription>
              Example of what the AI might return based on your prompt
            </CardDescription>
          </div>
          {provider && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Powered by {provider} API
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-background/60 p-4 rounded-md text-sm overflow-auto max-h-96 whitespace-pre-wrap">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Generating response...</span>
            </div>
          ) : error ? (
            <div className="flex items-start text-destructive py-4">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">There was an error generating a response</p>
                <p className="text-muted-foreground mt-1">{error}</p>
                <p className="text-muted-foreground mt-3 text-xs">Please try again or adjust your prompt.</p>
              </div>
            </div>
          ) : (
            aiResponse
          )}
        </div>
      </CardContent>
    </Card>
  );
};


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AIResponsePreviewProps {
  aiResponse: string;
  isLoading?: boolean;
  provider?: string;
}

export const AIResponsePreview = ({
  aiResponse,
  isLoading = false,
  provider = "AI"
}: AIResponsePreviewProps) => {
  if (!aiResponse && !isLoading) return null;
  
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
              Powered by {provider}
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
          ) : (
            aiResponse
          )}
        </div>
      </CardContent>
    </Card>
  );
};

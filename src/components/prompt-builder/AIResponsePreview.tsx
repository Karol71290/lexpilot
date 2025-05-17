
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AIResponsePreviewProps {
  aiResponse: string;
  isLoading?: boolean;
}

export const AIResponsePreview = ({
  aiResponse,
  isLoading = false
}: AIResponsePreviewProps) => {
  if (!aiResponse && !isLoading) return null;
  
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>AI Response Preview</CardTitle>
        <CardDescription>
          Example of what the AI might return based on your prompt
        </CardDescription>
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


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AIResponsePreviewProps {
  aiResponse: string;
}

export const AIResponsePreview = ({
  aiResponse
}: AIResponsePreviewProps) => {
  if (!aiResponse) return null;
  
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
          {aiResponse}
        </div>
      </CardContent>
    </Card>
  );
};

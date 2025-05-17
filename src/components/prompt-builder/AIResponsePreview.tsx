
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Copy, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AIResponsePreviewProps {
  aiResponse: string;
  isLoading?: boolean;
  provider?: string;
  error?: string | null;
  onSaveResponse?: (response: string) => void;
}

export const AIResponsePreview = ({
  aiResponse,
  isLoading = false,
  provider = "AI",
  error = null,
  onSaveResponse
}: AIResponsePreviewProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  if (!aiResponse && !isLoading && !error) return null;
  
  const handleCopyResponse = () => {
    if (!aiResponse) return;
    
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    toast({
      title: "Response Copied",
      description: "AI response has been copied to clipboard"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Card className="card-gradient">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>AI Response</CardTitle>
            <CardDescription>
              Generated output based on your prompt
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
          ) : aiResponse ? (
            <>
              <div className="mb-4">{aiResponse}</div>
              <div className="flex gap-2 justify-end mt-4 border-t pt-4">
                <Button size="sm" variant="outline" onClick={handleCopyResponse}>
                  <Copy className="h-4 w-4 mr-1" />
                  {copied ? "Copied" : "Copy Response"}
                </Button>
                {onSaveResponse && (
                  <Button size="sm" variant="outline" onClick={() => onSaveResponse(aiResponse)}>
                    <Save className="h-4 w-4 mr-1" />
                    Save to Templates
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No response generated yet. Try sending a prompt.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

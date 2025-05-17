
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";

interface GeneratedPromptProps {
  generatedPrompt: string;
  onCopyGeneratedPrompt: () => void;
  onSavePrompt: () => void;
}

export const GeneratedPrompt = ({
  generatedPrompt,
  onCopyGeneratedPrompt,
  onSavePrompt
}: GeneratedPromptProps) => {
  if (!generatedPrompt) return null;
  
  return (
    <Card className="card-gradient">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Generated Prompt</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onCopyGeneratedPrompt}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={onSavePrompt}>
              <Download className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-background/60 p-4 rounded-md text-sm font-mono overflow-auto max-h-96 whitespace-pre-wrap">
          {generatedPrompt}
        </div>
      </CardContent>
    </Card>
  );
};

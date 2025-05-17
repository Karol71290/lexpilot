
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { LegalWorkflow } from "@/types/legalWorkflow";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CustomWorkflowGeneratorProps {
  onWorkflowGenerated: (workflow: LegalWorkflow) => void;
}

export function CustomWorkflowGenerator({ onWorkflowGenerated }: CustomWorkflowGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateWorkflow = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a description of your legal task.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-workflow", {
        body: { prompt: prompt.trim() }
      });

      if (error) {
        throw new Error(error.message || "Failed to generate workflow");
      }

      if (!data || !data.workflow) {
        throw new Error("No workflow was generated");
      }

      toast({
        title: "Workflow Generated",
        description: `Successfully created "${data.workflow.title}" workflow.`,
      });
      
      onWorkflowGenerated(data.workflow);
    } catch (err: any) {
      console.error("Error generating workflow:", err);
      setError(err.message || "Failed to generate workflow. Please try again.");
      
      toast({
        title: "Generation Failed",
        description: "There was a problem creating your workflow.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Create Custom Legal Workflow</CardTitle>
        <CardDescription>
          Describe your legal task, and our AI will generate a personalized workflow to help you complete it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="e.g., 'Analyze this contract for risk' or 'Prepare a trademark opposition'"
            className="min-h-[100px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generateWorkflow} disabled={isGenerating} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Workflow...
            </>
          ) : (
            "Generate Workflow"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}


import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, FileUp, Loader2, SkipForward } from "lucide-react";
import { WorkflowStep as WorkflowStepType } from '@/types/legalWorkflow';

interface WorkflowStepProps {
  step: WorkflowStepType;
  stepResult?: { input: string; output: string; completed: boolean; skipped: boolean } | undefined;
  isLastStep: boolean;
  isLoading: boolean;
  onSubmit: (input: string) => void;
  onSkip: () => void;
  onContinue: () => void;
}

export function WorkflowStepView({ step, stepResult, isLastStep, isLoading, onSubmit, onSkip, onContinue }: WorkflowStepProps) {
  const [input, setInput] = useState(stepResult?.input || '');
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileContent(content);
      setInput(content);
    };
    reader.readAsText(file);
  };
  
  const handleSubmit = () => {
    if (!input.trim() && step.inputType !== 'previous-output') return;
    onSubmit(input);
  };

  // Determine if this step is complete
  const isCompleted = stepResult?.completed && !stepResult?.skipped;
  
  // Different UI states
  if (isCompleted) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="pb-2">
          <CardTitle>{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step.inputType !== 'previous-output' && (
            <>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Your Input:</h3>
                <div className="bg-white rounded-md border p-3 text-sm whitespace-pre-wrap max-h-[200px] overflow-auto">
                  {stepResult.input}
                </div>
              </div>
              <Separator />
            </>
          )}
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">AI Analysis:</h3>
            <div className="bg-white rounded-md border p-3 text-sm whitespace-pre-wrap max-h-[400px] overflow-auto">
              {stepResult.output}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onContinue} className="ml-auto">
            {isLastStep ? 'Finish' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{step.title}</CardTitle>
        <CardDescription>{step.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-accent/50 rounded-md p-3 text-sm">
          <p className="font-medium mb-1">Instructions:</p>
          <p>{step.promptInstruction}</p>
        </div>
        
        {step.inputType === 'text' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Your Input:</label>
              <div className="flex space-x-2">
                <label htmlFor="file-upload" className="cursor-pointer text-xs text-primary flex items-center">
                  <FileUp className="h-3 w-3 mr-1" />
                  Upload File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.docx,.pdf,.doc,.rtf,.md"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={step.inputInstructions || "Enter your text here..."}
              className="min-h-[200px]"
            />
            {fileContent && (
              <p className="text-xs text-muted-foreground">File content loaded</p>
            )}
          </div>
        )}
        
        {step.inputType === 'previous-output' && (
          <Alert>
            <AlertDescription className="text-sm">
              This step will automatically use the output from previous steps. No additional input is required.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step.isOptional && (
          <Button variant="ghost" onClick={onSkip} disabled={isLoading}>
            <SkipForward className="mr-2 h-4 w-4" />
            Skip this step
          </Button>
        )}
        <div className={step.isOptional ? '' : 'ml-auto'}>
          <Button onClick={handleSubmit} disabled={isLoading || (step.inputType === 'text' && !input.trim())}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Process with AI
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

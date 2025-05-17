
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicInfoSelectors } from "./form-components/BasicInfoSelectors";
import { PromptTechniqueSelector } from "./form-components/PromptTechniqueSelector";
import { ContextEnrichment } from "./form-components/ContextEnrichment";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PromptBuilderFormProps {
  legalArea: string;
  setLegalArea: (value: string) => void;
  taskType: string;
  setTaskType: (value: string) => void;
  promptTechnique: string;
  setPromptTechnique: (value: string) => void;
  context: string;
  setContext: (value: string) => void;
  jurisdiction: string;
  setJurisdiction: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
}

export const PromptBuilderForm = ({
  legalArea,
  setLegalArea,
  taskType,
  setTaskType,
  promptTechnique,
  setPromptTechnique,
  context,
  setContext,
  jurisdiction,
  setJurisdiction,
  tone,
  setTone,
  outputFormat,
  setOutputFormat,
}: PromptBuilderFormProps) => {
  const isBasicInfoMissing = !legalArea || !taskType;

  return (
    <Card className="card-gradient">
      <CardHeader>
        <div>
          <CardTitle>Legal Prompt Builder</CardTitle>
          <CardDescription>
            Customize your prompt with legal-specific parameters
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isBasicInfoMissing && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              Select at least Legal Area and Task Type to auto-generate a prompt
            </AlertDescription>
          </Alert>
        )}
        
        <BasicInfoSelectors 
          legalArea={legalArea}
          setLegalArea={setLegalArea}
          taskType={taskType}
          setTaskType={setTaskType}
        />
        
        <PromptTechniqueSelector
          promptTechnique={promptTechnique}
          setPromptTechnique={setPromptTechnique}
        />
        
        <ContextEnrichment
          context={context}
          setContext={setContext}
          jurisdiction={jurisdiction}
          setJurisdiction={setJurisdiction}
          tone={tone}
          setTone={setTone}
          outputFormat={outputFormat}
          setOutputFormat={setOutputFormat}
        />
      </CardContent>
    </Card>
  );
};

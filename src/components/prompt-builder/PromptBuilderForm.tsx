
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BasicInfoSelectors } from "./form-components/BasicInfoSelectors";
import { PromptTechniqueSelector } from "./form-components/PromptTechniqueSelector";
import { ContextEnrichment } from "./form-components/ContextEnrichment";

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

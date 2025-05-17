
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  promptInstruction: string;
  inputType: 'text' | 'file' | 'previous-output';
  inputInstructions?: string;
  isOptional?: boolean;
  defaultSkipLogic?: string;
}

export interface LegalWorkflow {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  recommendedPersonas?: string[];
  estimatedTime?: string;
  isCustom?: boolean; // Flag for dynamically generated workflows
}

export interface CustomWorkflowRequest {
  prompt: string;
  userPrompt: string;
}

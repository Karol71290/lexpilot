
export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  promptInstruction: string;
  inputType: 'text' | 'file' | 'previous-output';
  inputInstructions?: string;
  isOptional?: boolean;
  defaultSkipLogic?: string; // Logic to determine if step should be skipped
}

export interface LegalWorkflow {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: WorkflowStep[];
  recommendedPersonas?: string[]; // Personas this workflow is particularly suited for
  estimatedTime?: string; // e.g., "10-15 minutes"
}

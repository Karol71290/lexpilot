
import { LegalWorkflow, WorkflowStep } from '@/types/legalWorkflow';

export interface StepResult {
  stepId: string;
  input: string;
  output: string;
  completed: boolean;
  skipped: boolean;
}

export interface WorkflowContextType {
  workflows: LegalWorkflow[];
  activeWorkflow: LegalWorkflow | null;
  currentStepIndex: number;
  stepResults: StepResult[];
  isLoading: boolean;
  selectWorkflow: (workflowId: string) => void;
  startNewWorkflow: (workflow: LegalWorkflow) => void;
  goToStep: (stepIndex: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  submitStepInput: (input: string) => Promise<void>;
  skipCurrentStep: () => void;
  getCurrentStepResult: () => StepResult | undefined;
  getStepResultById: (stepId: string) => StepResult | undefined;
  resetWorkflow: () => void;
  exportWorkflowResults: () => void;
  currentProgress: number;
}

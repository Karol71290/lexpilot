
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { LegalWorkflow } from '@/types/legalWorkflow';
import { sampleWorkflows } from '@/data/sampleWorkflows';
import { useToast } from '@/hooks/use-toast';
import { StepResult, WorkflowContextType } from './legal-workflow/types';
import { useWorkflowNavigation } from './legal-workflow/useWorkflowNavigation';
import { useWorkflowSteps } from './legal-workflow/useWorkflowSteps';
import { useWorkflowExport } from './legal-workflow/useWorkflowExport';

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [workflows, setWorkflows] = useState<LegalWorkflow[]>(sampleWorkflows);
  const [activeWorkflow, setActiveWorkflow] = useState<LegalWorkflow | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepResults, setStepResults] = useState<StepResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const selectWorkflow = useCallback((workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (workflow) {
      setActiveWorkflow(workflow);
      setCurrentStepIndex(0);
      setStepResults([]);
    }
  }, [workflows]);

  const startNewWorkflow = useCallback((workflow: LegalWorkflow) => {
    // Check if this is a new custom workflow we need to add to our list
    if (workflow.isCustom && !workflows.some(w => w.id === workflow.id)) {
      setWorkflows(prevWorkflows => [...prevWorkflows, workflow]);
    }
    
    setActiveWorkflow(workflow);
    setCurrentStepIndex(0);
    setStepResults([]);
  }, [workflows]);

  // Import navigation hooks
  const {
    goToStep,
    goToNextStep,
    goToPrevStep,
    getCurrentStepResult,
    getStepResultById
  } = useWorkflowNavigation(
    activeWorkflow,
    currentStepIndex,
    setCurrentStepIndex,
    stepResults
  );

  // Import workflow steps hooks
  const {
    submitStepInput,
    skipCurrentStep
  } = useWorkflowSteps(
    activeWorkflow,
    currentStepIndex,
    stepResults,
    setStepResults,
    goToNextStep,
    setIsLoading
  );

  // Import export functionality
  const {
    exportWorkflowResults,
    resetWorkflow: resetWorkflowHelper
  } = useWorkflowExport(activeWorkflow, stepResults);

  const resetWorkflow = useCallback(() => {
    if (resetWorkflowHelper()) {
      setCurrentStepIndex(0);
      setStepResults([]);
    }
  }, [resetWorkflowHelper]);

  // Calculate current progress percentage
  const currentProgress = activeWorkflow 
    ? ((stepResults.filter(r => r.completed).length) / activeWorkflow.steps.length) * 100
    : 0;

  const contextValue = {
    workflows,
    activeWorkflow,
    currentStepIndex,
    stepResults,
    isLoading,
    selectWorkflow,
    startNewWorkflow,
    goToStep,
    goToNextStep,
    goToPrevStep,
    submitStepInput,
    skipCurrentStep,
    getCurrentStepResult,
    getStepResultById,
    resetWorkflow,
    exportWorkflowResults,
    currentProgress
  };

  return (
    <WorkflowContext.Provider value={contextValue}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useLegalWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useLegalWorkflow must be used within a WorkflowProvider');
  }
  return context;
};

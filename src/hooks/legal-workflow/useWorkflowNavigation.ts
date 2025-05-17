
import { useCallback } from 'react';
import { LegalWorkflow } from '@/types/legalWorkflow';
import { StepResult } from './types';

export function useWorkflowNavigation(
  activeWorkflow: LegalWorkflow | null,
  currentStepIndex: number, 
  setCurrentStepIndex: (index: number) => void,
  stepResults: StepResult[]
) {
  const goToStep = useCallback((stepIndex: number) => {
    if (!activeWorkflow) return;
    
    if (stepIndex >= 0 && stepIndex < activeWorkflow.steps.length) {
      setCurrentStepIndex(stepIndex);
    }
  }, [activeWorkflow, setCurrentStepIndex]);

  const goToNextStep = useCallback(() => {
    if (!activeWorkflow) return;
    
    if (currentStepIndex < activeWorkflow.steps.length - 1) {
      // Fix: Pass direct number instead of a callback function
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
    }
  }, [activeWorkflow, currentStepIndex, setCurrentStepIndex]);

  const goToPrevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      // Fix: Pass direct number instead of a callback function
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
    }
  }, [currentStepIndex, setCurrentStepIndex]);

  const getCurrentStepResult = useCallback(() => {
    if (!activeWorkflow) return undefined;
    
    const currentStep = activeWorkflow.steps[currentStepIndex];
    return stepResults.find(result => result.stepId === currentStep.id);
  }, [activeWorkflow, currentStepIndex, stepResults]);

  const getStepResultById = useCallback((stepId: string) => {
    return stepResults.find(result => result.stepId === stepId);
  }, [stepResults]);

  return {
    goToStep,
    goToNextStep,
    goToPrevStep,
    getCurrentStepResult,
    getStepResultById,
  };
}


import { useCallback } from 'react';
import { LegalWorkflow } from '@/types/legalWorkflow';
import { StepResult } from './types';
import { useToast } from '@/hooks/use-toast';
import { useOpenAiApi } from '@/hooks/useOpenAiApi';
import { useWorkflowPrompts } from './useWorkflowPrompts';

export function useWorkflowSteps(
  activeWorkflow: LegalWorkflow | null,
  currentStepIndex: number,
  stepResults: StepResult[],
  setStepResults: (results: StepResult[]) => void,
  goToNextStep: () => void,
  setIsLoading: (loading: boolean) => void
) {
  const { toast } = useToast();
  const { chatWithOpenAI } = useOpenAiApi();
  const { adaptPromptToPersona, personaPreferences } = useWorkflowPrompts();

  const getPreviousStepsContext = useCallback(() => {
    if (!activeWorkflow) return "";
    
    // Get all completed steps up to the current one
    const previousSteps = activeWorkflow.steps
      .slice(0, currentStepIndex)
      .map(step => {
        const result = stepResults.find(r => r.stepId === step.id);
        if (result && !result.skipped) {
          return `Step: ${step.title}\nInput: ${result.input}\nOutput: ${result.output}`;
        }
        return null;
      })
      .filter(Boolean)
      .join("\n\n");
      
    return previousSteps ? `Previous steps context:\n${previousSteps}` : "";
  }, [activeWorkflow, currentStepIndex, stepResults]);

  const submitStepInput = useCallback(async (input: string) => {
    if (!activeWorkflow) return;
    
    const currentStep = activeWorkflow.steps[currentStepIndex];
    setIsLoading(true);
    
    try {
      // Get previous context if needed
      let contextInput = input;
      if (currentStep.inputType === 'previous-output') {
        const previousContext = getPreviousStepsContext();
        contextInput = previousContext || "No previous context available.";
      }
      
      // Adapt the prompt based on user persona
      const adaptedPrompt = adaptPromptToPersona(currentStep.promptInstruction, currentStep);
      
      // Prepare messages for the AI
      const messages = [
        { 
          role: 'system' as const, 
          content: `You are an expert legal assistant helping with a multi-step legal workflow called "${activeWorkflow.title}". The current step is: "${currentStep.title}".` 
        },
        { role: 'user' as const, content: `${adaptedPrompt}\n\nHere is the input to work with:\n${contextInput}` }
      ];
      
      // Call the API
      const response = await chatWithOpenAI(messages, {
        temperature: personaPreferences.riskProfile === 'high' ? 0.8 : 
                     personaPreferences.riskProfile === 'medium' ? 0.7 : 0.5
      });
      
      if (!response) {
        throw new Error("Failed to get response from AI service");
      }
      
      // Update step results
      const updatedResults = [...stepResults];
      const existingResultIndex = updatedResults.findIndex(r => r.stepId === currentStep.id);
      
      const newResult = {
        stepId: currentStep.id,
        input: input,
        output: response,
        completed: true,
        skipped: false
      };
      
      if (existingResultIndex >= 0) {
        updatedResults[existingResultIndex] = newResult;
      } else {
        updatedResults.push(newResult);
      }
      
      setStepResults(updatedResults);
      
      // Auto-advance to next step if available
      if (currentStepIndex < activeWorkflow.steps.length - 1) {
        toast({
          title: "Step completed",
          description: "The AI has processed this step. Moving to the next step.",
        });
        
        // Small delay before moving to next step for better UX
        setTimeout(() => goToNextStep(), 1000);
      } else {
        toast({
          title: "Workflow completed",
          description: "You have completed all steps in this workflow.",
        });
      }
    } catch (error) {
      console.error("Error processing step:", error);
      toast({
        title: "Error",
        description: "There was an error processing this step. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeWorkflow, currentStepIndex, stepResults, goToNextStep, toast, getPreviousStepsContext, adaptPromptToPersona, personaPreferences, chatWithOpenAI, setIsLoading, setStepResults]);

  const skipCurrentStep = useCallback(() => {
    if (!activeWorkflow) return;
    
    const currentStep = activeWorkflow.steps[currentStepIndex];
    
    // Update step results to mark as skipped
    const updatedResults = [...stepResults];
    const existingResultIndex = updatedResults.findIndex(r => r.stepId === currentStep.id);
    
    const newResult = {
      stepId: currentStep.id,
      input: "",
      output: "Step was skipped",
      completed: true,
      skipped: true
    };
    
    if (existingResultIndex >= 0) {
      updatedResults[existingResultIndex] = newResult;
    } else {
      updatedResults.push(newResult);
    }
    
    setStepResults(updatedResults);
    
    // Move to next step if available
    if (currentStepIndex < activeWorkflow.steps.length - 1) {
      goToNextStep();
      toast({
        title: "Step skipped",
        description: "You've skipped this step and moved to the next one."
      });
    } else {
      toast({
        title: "Workflow completed",
        description: "You have completed all steps in this workflow."
      });
    }
  }, [activeWorkflow, currentStepIndex, goToNextStep, stepResults, toast, setStepResults]);

  return {
    submitStepInput,
    skipCurrentStep,
  };
}

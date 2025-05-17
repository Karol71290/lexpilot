
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { LegalWorkflow, WorkflowStep } from '@/types/legalWorkflow';
import { sampleWorkflows } from '@/data/sampleWorkflows';
import { useUserPersona } from '@/hooks/useUserPersona';
import { getPersonaPolicyPreferences } from '@/utils/personaUtils';
import { useToast } from '@/hooks/use-toast';
import { useOpenAiApi } from '@/hooks/useOpenAiApi';

interface StepResult {
  stepId: string;
  input: string;
  output: string;
  completed: boolean;
  skipped: boolean;
}

interface WorkflowContextType {
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

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [workflows, setWorkflows] = useState<LegalWorkflow[]>(sampleWorkflows);
  const [activeWorkflow, setActiveWorkflow] = useState<LegalWorkflow | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepResults, setStepResults] = useState<StepResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userPersona } = useUserPersona();
  const personaPreferences = getPersonaPolicyPreferences(userPersona);
  const { toast } = useToast();
  const { chatWithOpenAI } = useOpenAiApi();

  const selectWorkflow = useCallback((workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (workflow) {
      setActiveWorkflow(workflow);
      setCurrentStepIndex(0);
      setStepResults([]);
    }
  }, [workflows]);

  const startNewWorkflow = useCallback((workflow: LegalWorkflow) => {
    setActiveWorkflow(workflow);
    setCurrentStepIndex(0);
    setStepResults([]);
  }, []);

  const goToStep = useCallback((stepIndex: number) => {
    if (!activeWorkflow) return;
    
    if (stepIndex >= 0 && stepIndex < activeWorkflow.steps.length) {
      setCurrentStepIndex(stepIndex);
    }
  }, [activeWorkflow]);

  const goToNextStep = useCallback(() => {
    if (!activeWorkflow) return;
    
    if (currentStepIndex < activeWorkflow.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [activeWorkflow, currentStepIndex]);

  const goToPrevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  const getCurrentStepResult = useCallback(() => {
    if (!activeWorkflow) return undefined;
    
    const currentStep = activeWorkflow.steps[currentStepIndex];
    return stepResults.find(result => result.stepId === currentStep.id);
  }, [activeWorkflow, currentStepIndex, stepResults]);

  const getStepResultById = useCallback((stepId: string) => {
    return stepResults.find(result => result.stepId === stepId);
  }, [stepResults]);
  
  // This function adapts the prompt based on user persona
  const adaptPromptToPersona = useCallback((prompt: string, step: WorkflowStep) => {
    // Add persona-specific guidance based on persona preferences
    let personaContext = `Approach this task with a `;
    
    if (personaPreferences.riskProfile === 'high') {
      personaContext += `innovation-focused mindset that prioritizes flexibility and opportunities. `;
    } else if (personaPreferences.riskProfile === 'medium') {
      personaContext += `balanced approach that weighs innovation against reasonable safeguards. `;
    } else {
      personaContext += `cautious mindset that prioritizes risk management and compliance. `;
    }
    
    // Add governance emphasis based on persona
    if (personaPreferences.governanceFocus > 7) {
      personaContext += `Pay special attention to governance frameworks and detailed compliance requirements. `;
    }
    
    // Add disclaimer level based on persona
    if (personaPreferences.disclaimerLevel > 7) {
      personaContext += `Include appropriate disclaimers and risk warnings. `;
    }
    
    return `${personaContext}\n\n${prompt}`;
  }, [personaPreferences]);

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
  }, [activeWorkflow, currentStepIndex, stepResults, goToNextStep, toast, getPreviousStepsContext, adaptPromptToPersona, personaPreferences, chatWithOpenAI]);

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
  }, [activeWorkflow, currentStepIndex, goToNextStep, stepResults, toast]);

  const resetWorkflow = useCallback(() => {
    if (!activeWorkflow) return;
    setCurrentStepIndex(0);
    setStepResults([]);
    toast({
      title: "Workflow reset",
      description: "All progress has been reset."
    });
  }, [activeWorkflow, toast]);

  const exportWorkflowResults = useCallback(() => {
    if (!activeWorkflow) return;
    
    const exportDate = new Date().toISOString().split('T')[0];
    const fileName = `${activeWorkflow.title.toLowerCase().replace(/\s+/g, '-')}-${exportDate}.txt`;
    
    let content = `# ${activeWorkflow.title}\n`;
    content += `Date: ${exportDate}\n\n`;
    
    activeWorkflow.steps.forEach((step, index) => {
      const result = stepResults.find(r => r.stepId === step.id);
      
      content += `## Step ${index + 1}: ${step.title}\n\n`;
      
      if (result) {
        if (result.skipped) {
          content += `*This step was skipped*\n\n`;
        } else {
          if (step.inputType !== 'previous-output') {
            content += `### Input\n\n${result.input}\n\n`;
          }
          content += `### Output\n\n${result.output}\n\n`;
        }
      } else {
        content += `*Step not completed*\n\n`;
      }
      content += `---\n\n`;
    });
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    toast({
      title: "Export complete",
      description: `Workflow results have been exported as ${fileName}`
    });
  }, [activeWorkflow, stepResults, toast]);

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


import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { WorkflowProvider, useLegalWorkflow } from "@/hooks/useLegalWorkflowContext";
import { WorkflowSelector } from "@/components/legal-workflows/WorkflowSelector";
import { WorkflowSidebar } from "@/components/legal-workflows/WorkflowSidebar";
import { WorkflowStepView } from "@/components/legal-workflows/WorkflowStep";
import { PersonaIndicator } from "@/components/legal-workflows/PersonaIndicator";
import { ArrowLeft } from "lucide-react";

function LegalWorkflowsContent() {
  const { 
    workflows, 
    activeWorkflow,
    currentStepIndex,
    stepResults,
    isLoading,
    selectWorkflow,
    startNewWorkflow,
    goToStep,
    goToNextStep,
    submitStepInput,
    skipCurrentStep,
    resetWorkflow,
    exportWorkflowResults,
    currentProgress
  } = useLegalWorkflow();

  const [showSelector, setShowSelector] = useState(!activeWorkflow);

  const handleSelectWorkflow = (workflowId: string) => {
    selectWorkflow(workflowId);
    setShowSelector(false);
  };

  const handleBackToSelector = () => {
    setShowSelector(true);
  };

  const completedStepIds = stepResults
    .filter(result => result.completed)
    .map(result => result.stepId);

  if (showSelector || !activeWorkflow) {
    return (
      <div className="container mx-auto py-6 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8">AI-Powered Legal Workflows</h1>
        <div className="mb-6">
          <PersonaIndicator />
        </div>
        <WorkflowSelector 
          workflows={workflows} 
          onSelect={handleSelectWorkflow} 
        />
      </div>
    );
  }

  const currentStep = activeWorkflow.steps[currentStepIndex];
  const currentStepResult = stepResults.find(result => result.stepId === currentStep.id);
  const isLastStep = currentStepIndex === activeWorkflow.steps.length - 1;

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden flex">
      <WorkflowSidebar
        workflow={activeWorkflow}
        currentStepIndex={currentStepIndex}
        completedStepIds={completedStepIds}
        onStepSelect={goToStep}
        onReset={resetWorkflow}
        onExport={exportWorkflowResults}
        progress={currentProgress}
      />
      
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" onClick={handleBackToSelector} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Workflows
            </Button>
            <h1 className="text-2xl font-bold">{activeWorkflow.title}</h1>
          </div>
          
          <WorkflowStepView
            step={currentStep}
            stepResult={currentStepResult}
            isLastStep={isLastStep}
            isLoading={isLoading}
            onSubmit={submitStepInput}
            onSkip={skipCurrentStep}
            onContinue={isLastStep ? handleBackToSelector : goToNextStep}
          />
        </div>
      </div>
    </div>
  );
}

export default function LegalWorkflows() {
  return (
    <AppLayout title="AI-Powered Legal Workflows">
      <WorkflowProvider>
        <LegalWorkflowsContent />
      </WorkflowProvider>
    </AppLayout>
  );
}

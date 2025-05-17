
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { WorkflowProvider, useLegalWorkflow } from "@/hooks/useLegalWorkflowContext";
import { WorkflowSelector } from "@/components/legal-workflows/WorkflowSelector";
import { WorkflowSidebar } from "@/components/legal-workflows/WorkflowSidebar";
import { WorkflowStepView } from "@/components/legal-workflows/WorkflowStep";
import { PersonaIndicator } from "@/components/legal-workflows/PersonaIndicator";
import { CustomWorkflowGenerator } from "@/components/legal-workflows/CustomWorkflowGenerator";
import { ArrowLeft, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState<string>("templates");

  const handleSelectWorkflow = (workflowId: string) => {
    selectWorkflow(workflowId);
    setShowSelector(false);
  };

  const handleCustomWorkflowGenerated = (workflow: any) => {
    startNewWorkflow(workflow);
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
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="templates">Template Workflows</TabsTrigger>
            <TabsTrigger value="custom">Custom Workflow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <WorkflowSelector 
              workflows={workflows.filter(w => !w.isCustom)} 
              onSelect={handleSelectWorkflow} 
            />
          </TabsContent>
          
          <TabsContent value="custom">
            <CustomWorkflowGenerator onWorkflowGenerated={handleCustomWorkflowGenerated} />
            {workflows.filter(w => w.isCustom).length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recently Generated Workflows</h2>
                <WorkflowSelector 
                  workflows={workflows.filter(w => w.isCustom)} 
                  onSelect={handleSelectWorkflow} 
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" onClick={handleBackToSelector} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Workflows
              </Button>
              <h1 className="text-2xl font-bold">{activeWorkflow.title}</h1>
            </div>
            {activeWorkflow.isCustom && (
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Custom Workflow</span>
              </div>
            )}
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

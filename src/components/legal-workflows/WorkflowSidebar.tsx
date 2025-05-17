
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LegalWorkflow, WorkflowStep } from '@/types/legalWorkflow';
import { CheckCircle, Circle } from "lucide-react";
import { useUserPersona } from '@/hooks/useUserPersona';
import { getPersonaName } from '@/utils/personaUtils';

interface WorkflowSidebarProps {
  workflow: LegalWorkflow;
  currentStepIndex: number;
  completedStepIds: string[];
  onStepSelect: (index: number) => void;
  onReset: () => void;
  onExport: () => void;
  progress: number;
}

export function WorkflowSidebar({ 
  workflow, 
  currentStepIndex, 
  completedStepIds, 
  onStepSelect, 
  onReset, 
  onExport, 
  progress 
}: WorkflowSidebarProps) {
  const { userPersona } = useUserPersona();
  const personaName = getPersonaName(userPersona);

  const isStepCompleted = (stepId: string) => completedStepIds.includes(stepId);
  const isStepAccessible = (index: number) => {
    // A step is accessible if all previous steps are completed
    for (let i = 0; i < index; i++) {
      if (!isStepCompleted(workflow.steps[i].id)) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col h-full bg-muted/30 border-r p-4 w-[280px]">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold">Progress</h3>
        <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="mb-6" />
      
      <div className="flex flex-col space-y-1 mb-2">
        <h2 className="text-lg font-semibold">{workflow.title}</h2>
        <p className="text-sm text-muted-foreground">{workflow.category}</p>
      </div>

      <div className="text-xs bg-primary/10 border border-primary/20 rounded-md p-2 mb-4">
        Using persona: <span className="font-semibold">{personaName}</span>
      </div>
      
      <Separator className="mb-4" />
      
      <div className="flex-1 overflow-auto">
        <div className="space-y-1 text-sm">
          {workflow.steps.map((step, index) => {
            const isCompleted = isStepCompleted(step.id);
            const isCurrent = index === currentStepIndex;
            const canAccess = isStepAccessible(index);
            
            return (
              <button
                key={step.id}
                onClick={() => canAccess && onStepSelect(index)}
                disabled={!canAccess}
                className={`
                  w-full text-left px-3 py-2 rounded-md flex items-center space-x-2
                  transition-colors
                  ${isCurrent ? 'bg-accent text-accent-foreground' : ''}
                  ${isCompleted ? 'text-primary hover:bg-accent/50' : 'hover:bg-accent/50'}
                  ${!canAccess ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0" />
                )}
                <span className="truncate">{step.title}</span>
                {step.isOptional && (
                  <span className="text-xs text-muted-foreground ml-auto">(Optional)</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-auto pt-4 space-y-2">
        <Button
          variant="outline" 
          className="w-full" 
          onClick={onExport}
          disabled={completedStepIds.length === 0}
        >
          Export Results
        </Button>
        <Button variant="ghost" className="w-full text-muted-foreground" onClick={onReset}>
          Reset Workflow
        </Button>
      </div>
    </div>
  );
}

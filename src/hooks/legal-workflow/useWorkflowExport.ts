
import { useCallback } from 'react';
import { LegalWorkflow } from '@/types/legalWorkflow';
import { StepResult } from './types';
import { useToast } from '@/hooks/use-toast';

export function useWorkflowExport(activeWorkflow: LegalWorkflow | null, stepResults: StepResult[]) {
  const { toast } = useToast();
  
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
  
  const resetWorkflow = useCallback(() => {
    if (!activeWorkflow) return;
    
    toast({
      title: "Workflow reset",
      description: "All progress has been reset."
    });
    
    return true;
  }, [activeWorkflow, toast]);

  return {
    exportWorkflowResults,
    resetWorkflow
  };
}

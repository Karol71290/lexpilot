
import { useCallback } from 'react';
import { WorkflowStep } from '@/types/legalWorkflow';
import { useUserPersona } from '@/hooks/useUserPersona';
import { getPersonaPolicyPreferences } from '@/utils/personaUtils';

export function useWorkflowPrompts() {
  const { userPersona } = useUserPersona();
  const personaPreferences = getPersonaPolicyPreferences(userPersona);
  
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

  return {
    adaptPromptToPersona,
    personaPreferences
  };
}

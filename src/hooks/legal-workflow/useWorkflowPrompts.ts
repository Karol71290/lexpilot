
import { useUserPersona } from '@/hooks/useUserPersona';
import { WorkflowStep } from '@/types/legalWorkflow';

export function useWorkflowPrompts() {
  const { userPersona } = useUserPersona();
  
  // Define persona-specific preferences for adapting prompts
  const personaPreferences = {
    detailLevel: userPersona === 'Skeptical' ? 'high' : 
                 userPersona === 'Progressive' ? 'medium' : 'low',
    
    legalJargon: userPersona === 'Traditional' ? 'high' : 
                 userPersona === 'Analytical' ? 'medium' : 'low',
    
    simplification: userPersona === 'Skeptical' ? 'low' : 
                    userPersona === 'Progressive' ? 'high' : 'medium',
                   
    riskProfile: userPersona === 'Skeptical' ? 'low' : 
                 userPersona === 'Progressive' ? 'high' : 'medium',
                 
    explanationDepth: userPersona === 'Analytical' ? 'high' : 
                      userPersona === 'Traditional' ? 'medium' : 'low',
  };

  // Function to adapt prompts based on user persona
  const adaptPromptToPersona = (basePrompt: string, step: WorkflowStep) => {
    // Prepare a custom instruction based on persona
    let personaInstruction = "";
    
    if (userPersona === 'Skeptical') {
      personaInstruction = "Focus on identifying risks and potential problems. Be conservative in your analysis and highlight all potential issues, even minor ones. Provide detailed references to specific legal standards where applicable.";
    } else if (userPersona === 'Progressive') {
      personaInstruction = "Focus on innovative approaches and solutions. Be practical and business-friendly in your analysis. Use straightforward language and emphasize actionable insights.";
    } else if (userPersona === 'Traditional') {
      personaInstruction = "Follow established legal conventions and formats. Be thorough and formal in your analysis. Use appropriate legal terminology and provide structured, methodical responses.";
    } else if (userPersona === 'Analytical') {
      personaInstruction = "Provide data-driven analysis when possible. Break down complex issues into clear components. Balance legal detail with practical implications and quantify risks where possible.";
    } else {
      personaInstruction = "Provide a balanced analysis with practical insights.";
    }
    
    // For dynamically generated workflows, enhance the prompt with memory context instructions
    const memoryInstruction = step.inputType === 'previous-output' 
      ? "This step builds on previous steps. Use context from previous steps to provide a coherent, progressive analysis. Connect insights from earlier steps to enhance this output." 
      : "";
    
    // Combine the base prompt with persona-specific instructions
    return `${basePrompt}
    
${memoryInstruction}

${personaInstruction}`;
  };

  return {
    adaptPromptToPersona,
    personaPreferences
  };
}

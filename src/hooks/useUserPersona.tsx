
import { useEffect, useState } from "react";
import { PersonaId } from "@/utils/personaUtils";

interface UserPersonaData {
  id: PersonaId;
  trainingCompleted: number;
  promptBuilderUses: number;
  workflowsCompleted: number;
  lastQuizDate: string;
}

// This hook retrieves the current user's persona from localStorage
export function useUserPersona() {
  const [userPersona, setUserPersona] = useState<PersonaId>("strategic"); // Default to Strategic Adopter
  const [userData, setUserData] = useState<UserPersonaData>({
    id: "strategic",
    trainingCompleted: 1,
    promptBuilderUses: 3,
    workflowsCompleted: 0,
    lastQuizDate: new Date().toISOString(),
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, this would likely come from an API or state management
    // For now, we'll check localStorage where the quiz results might be stored
    const loadPersona = () => {
      try {
        const storedPersona = localStorage.getItem("userPersona");
        if (storedPersona) {
          setUserPersona(storedPersona as PersonaId);
          
          // Also try to load user persona data
          const storedData = localStorage.getItem("userPersonaData");
          if (storedData) {
            setUserData(JSON.parse(storedData));
          } else {
            // Initialize with default data for the persona
            const defaultData: UserPersonaData = {
              id: storedPersona as PersonaId,
              trainingCompleted: 1,
              promptBuilderUses: 3,
              workflowsCompleted: 0,
              lastQuizDate: new Date().toISOString(),
            };
            setUserData(defaultData);
            localStorage.setItem("userPersonaData", JSON.stringify(defaultData));
          }
        }
      } catch (error) {
        console.error("Error loading user persona:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersona();
  }, []);
  
  // Update user persona data
  const updateUserPersonaData = (data: Partial<UserPersonaData>) => {
    const updatedData = { ...userData, ...data };
    setUserData(updatedData);
    localStorage.setItem("userPersonaData", JSON.stringify(updatedData));
  };
  
  // Update user persona
  const updateUserPersona = (personaId: PersonaId) => {
    setUserPersona(personaId);
    localStorage.setItem("userPersona", personaId);
    updateUserPersonaData({ 
      id: personaId,
      lastQuizDate: new Date().toISOString()
    });
  };
  
  // Record training completion
  const recordTrainingCompletion = (moduleId: string) => {
    updateUserPersonaData({
      trainingCompleted: userData.trainingCompleted + 1
    });
  };
  
  // Record prompt builder use
  const recordPromptBuilderUse = () => {
    updateUserPersonaData({
      promptBuilderUses: userData.promptBuilderUses + 1
    });
  };
  
  // Record workflow completion
  const recordWorkflowCompletion = () => {
    updateUserPersonaData({
      workflowsCompleted: userData.workflowsCompleted + 1
    });
  };

  return { 
    userPersona, 
    userData, 
    isLoading, 
    updateUserPersona,
    recordTrainingCompletion,
    recordPromptBuilderUse,
    recordWorkflowCompletion
  };
}

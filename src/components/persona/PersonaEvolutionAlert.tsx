
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useUserPersona } from "@/hooks/useUserPersona";
import { getPersonaGrowthPath, shouldPromptPersonaUpdate } from "@/utils/personaUtils";
import { ArrowUpRight, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PersonaEvolutionAlert = () => {
  const { userPersona, userData } = useUserPersona();
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if we should show the evolution prompt
    if (shouldPromptPersonaUpdate(
      userPersona, 
      userData.trainingCompleted,
      userData.promptBuilderUses
    )) {
      setShowAlert(true);
    }
  }, [userPersona, userData]);
  
  if (!showAlert) return null;
  
  return (
    <Alert className="mb-6 border-primary/50 bg-primary/5">
      <AlertTitle className="flex items-center text-primary">
        <ArrowUpRight className="h-4 w-4 mr-2" />
        Your AI adoption journey is evolving!
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">
          You've grown a lot in your AI journey. Based on your recent activity and progress, 
          you may have evolved beyond your current persona.
        </p>
        <div className="flex items-center mt-4">
          <Button 
            variant="default" 
            size="sm" 
            className="mr-2"
            onClick={() => navigate("/quiz")}
          >
            Retake Persona Quiz
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAlert(false)}
          >
            Dismiss
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

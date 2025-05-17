
import { AlertCircle, ArrowUp, Clock, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUserPersona } from "@/hooks/useUserPersona";
import { getPersonaName, getPersonaPolicyImpact } from "@/utils/personaUtils";

export function PersonaIndicator() {
  const { userPersona } = useUserPersona();
  const personaName = getPersonaName(userPersona);
  const policyImpact = getPersonaPolicyImpact(userPersona);
  
  let icon = <Info />;
  let variant = "default";
  
  // Determine the appropriate icon and style based on persona
  if (userPersona === 'innovator' || userPersona === 'strategic') {
    icon = <ArrowUp className="h-4 w-4" />;
  } else if (userPersona === 'pragmatic') {
    icon = <Clock className="h-4 w-4" />;
  } else if (userPersona === 'cautious' || userPersona === 'skeptical' || userPersona === 'reluctant') {
    icon = <AlertCircle className="h-4 w-4" />;
  }
  
  return (
    <Alert>
      <AlertTitle className="flex items-center">
        {icon}
        <span className="ml-2">Using {personaName} persona</span>
      </AlertTitle>
      <AlertDescription>
        {policyImpact}
      </AlertDescription>
    </Alert>
  );
}

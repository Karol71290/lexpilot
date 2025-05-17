
import { useEffect, useState } from "react";

// This hook retrieves the current user's persona from localStorage
export function useUserPersona() {
  const [userPersona, setUserPersona] = useState<string>("strategic"); // Default to Strategic Adopter
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, this would likely come from an API or state management
    // For now, we'll check localStorage where the quiz results might be stored
    const loadPersona = () => {
      try {
        const storedPersona = localStorage.getItem("userPersona");
        if (storedPersona) {
          setUserPersona(storedPersona);
        }
      } catch (error) {
        console.error("Error loading user persona:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPersona();
  }, []);

  return { userPersona, isLoading };
}


import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GeminiOptions {
  model?: "gemini-pro" | "gemini-pro-vision";
  temperature?: number;
  topK?: number;
  maxTokens?: number;
}

export function useGeminiApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateWithGemini = async (prompt: string, options: GeminiOptions = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Wrap Supabase API call in try-catch to handle edge function errors properly
      let response;
      try {
        response = await supabase.functions.invoke("gemini-prompt", {
          body: {
            prompt,
            model: options.model || "gemini-pro",
            temperature: options.temperature || 0.7,
            topK: options.topK || 32,
            maxTokens: options.maxTokens || 800,
          },
        });
      } catch (e) {
        console.error("Edge function error:", e);
        throw new Error(`Failed to call Gemini API: ${e instanceof Error ? e.message : "Unknown error"}`);
      }

      if (response.error) {
        const errorMessage = response.error.message || "Failed to generate response";
        console.error("Error calling Gemini API:", response.error);
        setError(errorMessage);
        
        // Show a more user-friendly toast message
        toast({
          title: "API Error",
          description: "There was an issue connecting to the Gemini AI service. Please try again later.",
          variant: "destructive"
        });
        
        return null;
      }

      return response.data.generatedText;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Exception in generateWithGemini:", errorMessage);
      setError(errorMessage);
      
      // Show toast for unexpected errors
      toast({
        title: "Connection Error",
        description: "Failed to connect to the AI service. Please check your network and try again.",
        variant: "destructive"
      });
      
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateWithGemini,
    isLoading,
    error,
  };
}

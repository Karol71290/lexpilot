
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GeminiOptions {
  model?: "gemini-pro" | "gemini-pro-vision";
  temperature?: number;
  topK?: number;
  maxTokens?: number;
}

export function useGeminiApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        console.error("Error calling Gemini API:", response.error);
        setError(response.error.message || "Failed to generate response");
        return null;
      }

      return response.data.generatedText;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Exception in generateWithGemini:", errorMessage);
      setError(errorMessage);
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


import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define types for our hook
type AIProvider = "openai" | "gemini" | "anthropic";
type ConnectionStatus = { success: boolean; message: string } | null;

export function useAISettings() {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(null);

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedProvider = localStorage.getItem("ai_selected_provider");
    const savedModel = localStorage.getItem("ai_selected_model");
    
    if (savedProvider) setSelectedProvider(savedProvider);
    if (savedModel) setSelectedModel(savedModel);
  }, []);

  // Update selected provider and save to localStorage
  const updateSelectedProvider = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedModel(""); // Reset selected model when provider changes
    localStorage.setItem("ai_selected_provider", provider);
  };

  // Update selected model and save to localStorage
  const updateSelectedModel = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem("ai_selected_model", model);
  };

  // Test connection with the selected provider and model
  const testConnection = async (): Promise<{ success: boolean; message: string }> => {
    setConnectionStatus({ success: false, message: "Testing connection..." });
    
    try {
      // For Gemini API, use our existing edge function
      if (selectedProvider === "gemini") {
        const response = await fetch("/api/test-gemini-connection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: selectedModel })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          const result = { success: true, message: "Connection successful" };
          setConnectionStatus(result);
          return result;
        } else {
          const result = { success: false, message: data.error || "Connection failed" };
          setConnectionStatus(result);
          return result;
        }
      }
      
      // For OpenAI API, use our edge function
      if (selectedProvider === "openai") {
        const response = await supabase.functions.invoke("test-openai-connection", {
          body: { model: selectedModel }
        });
        
        if (response.error) {
          const result = { success: false, message: response.error.message || "Connection failed" };
          setConnectionStatus(result);
          return result;
        }
        
        const result = { success: true, message: "Connection successful" };
        setConnectionStatus(result);
        return result;
      }
      
      // This is just a mock test for other providers
      const result = { success: true, message: "Connection successful (simulated)" };
      setConnectionStatus(result);
      return result;
    } catch (error) {
      console.error("Connection test error:", error);
      const result = { 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      };
      setConnectionStatus(result);
      return result;
    }
  };

  return {
    selectedProvider,
    selectedModel,
    connectionStatus,
    setSelectedProvider: updateSelectedProvider,
    setSelectedModel: updateSelectedModel,
    testConnection
  };
}

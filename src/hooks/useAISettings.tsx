import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Define types for our hook
type AIProvider = "openai" | "gemini" | "anthropic";
type ApiKeys = Record<AIProvider, string>;
type ConnectionStatus = { success: boolean; message: string } | null;

export function useAISettings() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    gemini: "",
    openai: "",
    anthropic: ""
  });
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(null);

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedApiKeys = localStorage.getItem("ai_api_keys");
    const savedProvider = localStorage.getItem("ai_selected_provider");
    const savedModel = localStorage.getItem("ai_selected_model");
    
    if (savedApiKeys) {
      try {
        setApiKeys(JSON.parse(savedApiKeys));
      } catch (e) {
        console.error("Failed to parse saved API keys:", e);
      }
    }
    
    if (savedProvider) setSelectedProvider(savedProvider);
    if (savedModel) setSelectedModel(savedModel);
  }, []);

  // Save API key for a specific provider
  const saveAPIKey = (provider: string, key: string) => {
    const updatedKeys = { ...apiKeys, [provider]: key };
    setApiKeys(updatedKeys);
    localStorage.setItem("ai_api_keys", JSON.stringify(updatedKeys));
  };

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

  // Get the API key for the current selected provider
  const getCurrentApiKey = (): string => {
    if (!selectedProvider) return "";
    return apiKeys[selectedProvider as AIProvider] || "";
  };

  // Test connection with the selected provider and model
  const testConnection = async (): Promise<{ success: boolean; message: string }> => {
    setConnectionStatus({ success: false, message: "Testing connection..." });
    
    const apiKey = getCurrentApiKey();
    if (!apiKey) {
      const result = { success: false, message: "No API key found for this provider" };
      setConnectionStatus(result);
      return result;
    }
    
    try {
      // For Gemini API, use our existing edge function
      if (selectedProvider === "gemini") {
        const response = await fetch("/api/test-gemini-connection", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ apiKey, model: selectedModel })
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
      
      // For OpenAI API, use our new edge function
      if (selectedProvider === "openai") {
        const response = await supabase.functions.invoke("test-openai-connection", {
          body: { apiKey, model: selectedModel }
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
      // In a real implementation, we'd create similar edge functions for each provider
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
    apiKeys,
    selectedProvider,
    selectedModel,
    connectionStatus,
    saveAPIKey,
    setSelectedProvider: updateSelectedProvider,
    setSelectedModel: updateSelectedModel,
    getCurrentApiKey,
    testConnection
  };
}

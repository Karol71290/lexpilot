
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAISettings } from "@/hooks/useAISettings";
import { Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Define available AI providers and their models
const AI_PROVIDERS = {
  "openai": {
    label: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o", description: "Most powerful model" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Efficient model" },
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", description: "Fast and efficient" }
    ]
  },
  "gemini": {
    label: "Google Gemini",
    models: [
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "Advanced generative model" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", description: "Fast and efficient model" },
      { id: "gemini-pro", name: "Gemini Pro", description: "Standard model" }
    ]
  },
  "anthropic": {
    label: "Anthropic",
    models: [
      { id: "claude-3-opus", name: "Claude 3 Opus", description: "Most powerful model" },
      { id: "claude-3-sonnet", name: "Claude 3 Sonnet", description: "Balanced model" },
      { id: "claude-3-haiku", name: "Claude 3 Haiku", description: "Fast and efficient model" }
    ]
  }
};

export function AIServices() {
  const { toast } = useToast();
  const { 
    selectedProvider, 
    selectedModel,
    setSelectedProvider, 
    setSelectedModel,
    testConnection,
    connectionStatus
  } = useAISettings();
  
  const handleTestConnection = async () => {
    if (!selectedProvider || !selectedModel) {
      toast({
        title: "Configuration Required",
        description: "Please select a provider and model before testing the connection.",
        variant: "destructive"
      });
      return;
    }
    
    const result = await testConnection();
    
    if (result.success) {
      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${AI_PROVIDERS[selectedProvider as keyof typeof AI_PROVIDERS]?.label}.`
      });
    } else {
      toast({
        title: "Connection Failed",
        description: result.message || "Failed to connect. Please check your API key and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Alert variant="info">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>AI Configuration Information</AlertTitle>
        <AlertDescription>
          API keys are now stored securely in Supabase environment variables and managed server-side. 
          Please contact your administrator to update API keys.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" /> 
            AI Model Configuration
          </CardTitle>
          <CardDescription>
            Select your default AI provider and model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="provider">Default AI Provider</Label>
            <Select 
              value={selectedProvider} 
              onValueChange={setSelectedProvider}
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select an AI provider" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(AI_PROVIDERS).map(([id, provider]) => (
                  <SelectItem key={id} value={id}>{provider.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="model">Default Model</Label>
            <Select 
              value={selectedModel} 
              onValueChange={setSelectedModel}
              disabled={!selectedProvider}
            >
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {selectedProvider && AI_PROVIDERS[selectedProvider as keyof typeof AI_PROVIDERS]?.models.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name} - {model.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-6">
            <Button 
              onClick={handleTestConnection}
              disabled={!selectedProvider || !selectedModel}
              className="w-full"
            >
              Test Connection
            </Button>
            {connectionStatus && (
              <p className={`text-sm mt-2 text-center ${connectionStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                {connectionStatus.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            disabled={!selectedProvider || !selectedModel}
            onClick={() => {
              toast({
                title: "AI Settings Saved",
                description: "Your AI provider and model settings have been saved."
              });
            }}
          >
            Save Configuration
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

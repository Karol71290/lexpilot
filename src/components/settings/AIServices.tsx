
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAISettings } from "@/hooks/useAISettings";
import { Database, Key, Server } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define available AI providers and their models
const AI_PROVIDERS = {
  "gemini": {
    label: "Google Gemini",
    models: [
      { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "Advanced generative model" },
      { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", description: "Fast and efficient model" },
      { id: "gemini-pro", name: "Gemini Pro", description: "Standard model" }
    ]
  },
  "openai": {
    label: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o", description: "Most powerful model" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", description: "Efficient model" }
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
    apiKeys, 
    selectedProvider, 
    selectedModel,
    saveAPIKey, 
    setSelectedProvider, 
    setSelectedModel,
    testConnection,
    connectionStatus
  } = useAISettings();
  
  const [providerInputs, setProviderInputs] = useState<Record<string, string>>({
    gemini: "",
    openai: "",
    anthropic: ""
  });
  
  // Initialize provider inputs with stored API keys
  useEffect(() => {
    const initialInputs = {...providerInputs};
    Object.keys(apiKeys).forEach(provider => {
      if (apiKeys[provider]) {
        initialInputs[provider] = "••••••••••••••••";
      }
    });
    setProviderInputs(initialInputs);
  }, [apiKeys]);
  
  const handleInputChange = (provider: string, value: string) => {
    setProviderInputs(prev => ({
      ...prev,
      [provider]: value
    }));
  };
  
  const handleSaveAPIKey = (provider: string) => {
    if (providerInputs[provider] && providerInputs[provider] !== "••••••••••••••••") {
      saveAPIKey(provider, providerInputs[provider]);
      toast({
        title: "API Key Saved",
        description: `Your ${AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS]?.label} API key has been saved.`
      });
    }
  };
  
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" /> 
            API Keys
          </CardTitle>
          <CardDescription>
            Manage your AI service provider API keys
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(AI_PROVIDERS).map(([providerId, provider]) => (
            <div key={providerId} className="space-y-2">
              <Label htmlFor={`${providerId}-key`}>{provider.label} API Key</Label>
              <div className="flex gap-3">
                <Input
                  id={`${providerId}-key`}
                  type="password"
                  placeholder={`Enter your ${provider.label} API key`}
                  value={providerInputs[providerId]}
                  onChange={(e) => handleInputChange(providerId, e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => handleSaveAPIKey(providerId)}>Save</Button>
              </div>
              {providerId === "gemini" && (
                <p className="text-xs text-muted-foreground">
                  <a href="https://ai.google.dev/tutorials/setup" target="_blank" rel="noopener noreferrer" className="underline">
                    Get a Gemini API key
                  </a>
                </p>
              )}
              {providerId === "openai" && (
                <p className="text-xs text-muted-foreground">
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">
                    Get an OpenAI API key
                  </a>
                </p>
              )}
              {providerId === "anthropic" && (
                <p className="text-xs text-muted-foreground">
                  <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="underline">
                    Get an Anthropic API key
                  </a>
                </p>
              )}
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              Note: API keys are stored in your browser's local storage. For more secure storage, 
              consider using Supabase Edge Functions with encrypted secrets.
            </p>
          </div>
        </CardContent>
      </Card>
      
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

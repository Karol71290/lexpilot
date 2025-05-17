
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_URL = "https://api.openai.com/v1/models";

// Get the API key from environment variables
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { model = "gpt-4o" } = await req.json();
    
    // Verify that the API key is available
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not found in environment variables");
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured on the server. Please contact the administrator." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // First, try to fetch available models to test if the API key is valid
    try {
      const modelsResponse = await fetch(
        OPENAI_API_URL,
        { 
          method: "GET",
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          }
        }
      );
      
      if (!modelsResponse.ok) {
        const errorData = await modelsResponse.json();
        console.error("Error fetching models:", errorData);
        
        return new Response(
          JSON.stringify({ 
            error: errorData.error?.message || "Invalid API key or API access denied",
            code: errorData.error?.code,
            status: modelsResponse.status
          }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const modelsData = await modelsResponse.json();
      const availableModels = modelsData.data ? modelsData.data.map((m: any) => m.id) : [];
      
      // Check if the selected model is available
      const modelExists = availableModels.some((m: string) => m === model);
      
      if (!modelExists && model !== "gpt-4o" && model !== "gpt-4o-mini") {
        return new Response(
          JSON.stringify({ 
            error: `Selected model ${model} is not available with this API key.`,
            availableModels
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      // If we made it here, the API key is valid and the model is available
      return new Response(
        JSON.stringify({ 
          success: true,
          message: "API key is valid and the selected model is available",
          availableModels
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error testing API key:", error);
      return new Response(
        JSON.stringify({ error: error.message || "Failed to test API key" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in test-openai-connection function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

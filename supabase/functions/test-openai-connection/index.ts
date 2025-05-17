
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
    // Log request information for debugging
    console.log("Received request to test OpenAI connection");
    console.log("API key exists:", !!OPENAI_API_KEY);
    
    // If API key is missing, return detailed error
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not found in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key not configured on the server. Please contact the administrator.", 
          details: "The OPENAI_API_KEY environment variable is not set in Supabase."
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Test the API key by making a simple request to list models
    try {
      console.log("Making request to OpenAI API to test the key...");
      
      const modelsResponse = await fetch(
        OPENAI_API_URL,
        { 
          method: "GET",
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          }
        }
      );
      
      console.log("Response status:", modelsResponse.status);
      
      // Handle non-200 responses from OpenAI
      if (!modelsResponse.ok) {
        const responseText = await modelsResponse.text();
        let errorData;
        
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { rawResponse: responseText };
        }
        
        console.error("Error response from OpenAI API:", errorData);
        
        return new Response(
          JSON.stringify({ 
            error: errorData.error?.message || "Invalid API key or API access denied",
            code: errorData.error?.code,
            status: modelsResponse.status,
            details: errorData
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const modelsData = await modelsResponse.json();
      console.log("Successfully fetched models from OpenAI API");
      
      // Return successful response with model information
      return new Response(
        JSON.stringify({ 
          success: true,
          message: "API key is valid and working correctly",
          availableModels: modelsData.data ? modelsData.data.slice(0, 10).map((m: any) => m.id) : []
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error testing API key:", error);
      return new Response(
        JSON.stringify({ 
          error: "Failed to test OpenAI API key", 
          details: error instanceof Error ? error.message : "Unknown error"
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in test-openai-connection function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

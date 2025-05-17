
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not found in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key not configured on the server. Please contact the administrator."
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const { messages, model = "gpt-4", temperature = 0.7, max_tokens = 800 } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'messages' array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing OpenAI chat request with model: ${model}`);

    // Prepare the request to OpenAI API
    const requestBody = {
      model: model,
      messages: messages,
      temperature: temperature,
      max_tokens: max_tokens
    };

    // Call OpenAI API with retry logic
    const maxRetries = 2;
    let retries = 0;
    let response;
    let data;

    while (retries <= maxRetries) {
      try {
        console.log(`Sending request to OpenAI API (attempt ${retries + 1})...`);
        response = await fetch(OPENAI_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        const responseText = await response.text();
        
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError);
          console.error("Raw response:", responseText);
          throw new Error("Invalid JSON response from OpenAI API");
        }
        
        // Check for API errors
        if (data.error) {
          console.error("OpenAI API error:", data.error);
          
          // If this is a server error (5xx), retry
          if (response.status >= 500 && retries < maxRetries) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
            continue;
          }
          
          return new Response(
            JSON.stringify({ 
              error: data.error.message || "Error calling OpenAI API",
              code: data.error.code,
              status: data.error.status || response.status
            }),
            { status: response.status || 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // If we got a successful response, break out of the retry loop
        break;
      } catch (error) {
        console.error(`Attempt ${retries + 1} failed with error:`, error);
        
        if (retries < maxRetries) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
        } else {
          throw error; // Rethrow if we've exhausted all retries
        }
      }
    }

    // Return the OpenAI response
    return new Response(
      JSON.stringify({
        response: data.choices[0].message,
        usage: data.usage || {},
        model: model
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in openai-chat function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

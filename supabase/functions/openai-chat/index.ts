
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Get the API key from environment variables - no fallback, we expect it to be set
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      messages, 
      model = "gpt-4o-mini", // Updated to use gpt-4o-mini as the default model
      temperature = 0.7, 
      max_tokens = 800
    } = await req.json();
    
    console.log(`Processing chat request with model: ${model}, temperature: ${temperature}`);
    console.log(`Number of messages: ${messages.length}`);
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Valid messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify that the API key is available
    if (!OPENAI_API_KEY) {
      console.error("OpenAI API key not found in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key not configured on the server. Please contact the administrator."
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Implement retry logic
    const maxRetries = 2;
    let retries = 0;
    let response;
    let data;

    while (retries <= maxRetries) {
      try {
        console.log(`Sending chat request to OpenAI API with model ${model} (attempt ${retries + 1})...`);
        response = await fetch(OPENAI_API_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: temperature,
            max_tokens: max_tokens
          })
        });

        console.log("Response status:", response.status);
        const responseText = await response.text();
        
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError);
          console.error("Raw response:", responseText);
          throw new Error("Invalid JSON response from OpenAI API");
        }
        
        // Check if the response contains an error
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

    // Extract the response from OpenAI's API
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected response structure from OpenAI API:", data);
      return new Response(
        JSON.stringify({ 
          error: "Unexpected response structure from OpenAI API",
          details: "The API response did not contain expected data format"
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        response: data.choices[0].message.content,
        model,
        usage: data.usage || {}
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

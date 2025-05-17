
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
// Updated API URL to use v1 instead of v1beta
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, model = "gemini-pro", temperature = 0.7, topK = 32, maxTokens = 800 } = await req.json();
    
    console.log(`Processing request with model: ${model}, temperature: ${temperature}`);
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Gemini API key is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prepare the request body for Gemini API (updated for v1 format)
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature,
        topK,
        maxOutputTokens: maxTokens,
      }
    };

    // Implement retry logic
    const maxRetries = 3;
    let retries = 0;
    let response;
    let data;

    while (retries < maxRetries) {
      try {
        console.log(`Sending request to Gemini API (attempt ${retries + 1})...`);
        response = await fetch(
          `${GEMINI_API_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
          }
        );

        data = await response.json();
        console.log("Received response from Gemini API");
        
        // Check if the response contains an error
        if (data.error) {
          console.error("Gemini API error:", data.error);
          
          // If this is a server error (5xx), retry
          if (response.status >= 500 && retries < maxRetries - 1) {
            retries++;
            await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
            continue;
          }
          
          return new Response(
            JSON.stringify({ 
              error: data.error.message || "Error calling Gemini API",
              code: data.error.code,
              status: data.error.status
            }),
            { status: response.status || 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        // If we got a successful response, break out of the retry loop
        break;
      } catch (error) {
        console.error(`Attempt ${retries + 1} failed with error:`, error);
        
        if (retries < maxRetries - 1) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, 1000 * retries)); // Exponential backoff
        } else {
          throw error; // Rethrow if we've exhausted all retries
        }
      }
    }

    // Extract the generated text from Gemini's response (updated for v1 format)
    let generatedText = "";
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      generatedText = data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected response structure from Gemini API:", data);
      return new Response(
        JSON.stringify({ error: "Unexpected response structure from Gemini API" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        generatedText,
        model,
        usage: data.usage || {}
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in gemini-prompt function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

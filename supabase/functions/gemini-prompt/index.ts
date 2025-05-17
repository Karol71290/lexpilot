
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";

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

    // Prepare the request body for Gemini API
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

    console.log("Sending request to Gemini API...");
    const response = await fetch(
      `${GEMINI_API_URL}/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();
    console.log("Received response from Gemini API");
    
    // Check if the response contains an error
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return new Response(
        JSON.stringify({ error: data.error.message || "Error calling Gemini API" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract the generated text from Gemini's response
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

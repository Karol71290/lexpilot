
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { v4 as uuidv4 } from "https://esm.sh/uuid@9.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format the system message for generating workflow steps
    const systemPrompt = `You are an expert legal assistant that designs custom legal workflows based on user requests.
    
Create a workflow with 3-6 logical steps that will help the user accomplish their legal task.
For each step, provide:
1. A clear title
2. A brief description explaining the purpose of the step
3. Specific instructions for the AI to follow when processing this step
4. Whether user input is required or if the step should use previous outputs
5. Instructions for the user if input is required

Your response must be a valid JSON object with the following structure:
{
  "title": "Title of the workflow",
  "description": "Description of the workflow",
  "category": "Legal Analysis",
  "steps": [
    {
      "title": "Step title",
      "description": "Step description",
      "promptInstruction": "Instructions for the AI to follow when processing this step",
      "inputType": "text" or "previous-output",
      "inputInstructions": "Instructions for user input (if inputType is text)",
      "isOptional": false
    },
    ...more steps
  ]
}

IMPORTANT:
- The first step should always require user input (inputType: "text")
- At least one step should use previous outputs (inputType: "previous-output")
- Ensure logical flow between steps
- Keep instructions clear and specific
- Focus on creating a workflow that can be completed within 15 minutes`;

    // Call OpenAI to generate workflow steps
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create a legal workflow for this request: "${prompt}"` }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("OpenAI API error:", data.error);
      return new Response(
        JSON.stringify({ error: data.error.message || "Error generating workflow" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the generated content
    const generatedContent = data.choices[0].message.content;
    
    let workflowData;
    try {
      // Extract the JSON part from the response
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        workflowData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Invalid JSON format in response");
      }
      
      // Generate unique IDs for the workflow and each step
      const workflowId = `custom-${uuidv4().slice(0, 8)}`;
      workflowData.id = workflowId;
      workflowData.isCustom = true;
      
      // Add IDs to each step
      workflowData.steps = workflowData.steps.map((step: any, index: number) => ({
        ...step,
        id: `${workflowId}-step-${index + 1}`
      }));
      
    } catch (error) {
      console.error("Error parsing generated workflow:", error);
      return new Response(
        JSON.stringify({ error: "Failed to generate a valid workflow format" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ workflow: workflowData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-workflow function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});


import { LegalWorkflow } from "@/types/legalWorkflow";

export const sampleWorkflows: LegalWorkflow[] = [
  {
    id: "contract-risk-review",
    title: "Contract Clause Risk Review",
    description: "Analyze a contract for potential risk areas and provide recommendations",
    category: "Contracts",
    estimatedTime: "10-15 minutes",
    recommendedPersonas: ["strategic", "cautious", "pragmatic"],
    steps: [
      {
        id: "extract-clauses",
        title: "Extract Key Clauses",
        description: "Upload your contract to identify and extract the most important clauses",
        promptInstruction: "Extract all key clauses from this contract, focusing on: termination, liability, IP ownership, payment terms, and confidentiality. For each clause, provide the exact text and section number.",
        inputType: "text",
        inputInstructions: "Paste your contract text or upload a file",
      },
      {
        id: "risk-assessment",
        title: "Risk Assessment",
        description: "Analyze extracted clauses for potential legal risks",
        promptInstruction: "Analyze these contract clauses for potential legal risks. For each clause, provide: 1) Risk level (High/Medium/Low), 2) Potential issues, 3) Recommended changes or negotiation points.",
        inputType: "previous-output",
      },
      {
        id: "generate-summary",
        title: "Generate Risk Report",
        description: "Create a comprehensive risk assessment report",
        promptInstruction: "Based on the risk analysis, create a professional executive summary report that highlights the top 3 risks in this contract and provides specific recommendations for addressing each risk. Include a brief overall assessment of the contract.",
        inputType: "previous-output",
      }
    ]
  },
  {
    id: "trademark-opposition",
    title: "Trademark Opposition Response",
    description: "Generate a response to a trademark opposition notice",
    category: "Intellectual Property",
    estimatedTime: "20-30 minutes",
    recommendedPersonas: ["strategic", "pragmatic"],
    steps: [
      {
        id: "analyze-opposition",
        title: "Analyze Opposition Notice",
        description: "Upload the opposition notice to identify key claims",
        promptInstruction: "Extract the main grounds for opposition from this trademark opposition notice. Identify: 1) The opposing party, 2) Their trademark details, 3) The specific legal grounds cited, 4) Key claims made about likelihood of confusion or other issues.",
        inputType: "text",
        inputInstructions: "Paste the opposition notice text or upload the document",
      },
      {
        id: "market-differentiation",
        title: "Market Differentiation Analysis",
        description: "Analyze how your trademark differs from the opposing mark",
        promptInstruction: "Based on the opposition claims, analyze how your trademark differs from the opposing mark. Consider: visual differences, phonetic differences, conceptual differences, differences in goods/services, differences in target consumers, and any other relevant factors.",
        inputType: "text",
        inputInstructions: "Describe your trademark and relevant business details",
      },
      {
        id: "evidence-collection",
        title: "Evidence Collection Strategy",
        description: "Identify potential evidence to support your case",
        promptInstruction: "Based on the opposition claims and your differentiation analysis, recommend specific types of evidence that would strengthen your case. For each recommendation, explain: 1) What evidence to collect, 2) How it addresses specific opposition claims, 3) Where/how to obtain this evidence.",
        inputType: "previous-output",
      },
      {
        id: "draft-response",
        title: "Draft Response Outline",
        description: "Create a structured outline for your opposition response",
        promptInstruction: "Create a comprehensive outline for a trademark opposition response based on the analysis and evidence strategy. Include: 1) Introduction with key arguments, 2) Background of your mark, 3) Point-by-point response to opposition grounds, 4) Evidence summary, 5) Legal arguments, 6) Conclusion and requested outcome.",
        inputType: "previous-output",
      }
    ]
  },
  {
    id: "ai-policy-draft",
    title: "AI Policy Drafting Assistant",
    description: "Create a customized AI use policy for your organization",
    category: "Technology Law",
    estimatedTime: "15-20 minutes",
    recommendedPersonas: ["strategic", "innovator", "pragmatic"],
    steps: [
      {
        id: "requirements-gathering",
        title: "Requirements Gathering",
        description: "Define your organization's needs and concerns regarding AI use",
        promptInstruction: "Based on the provided information, identify the key requirements for an AI use policy that addresses: 1) Primary use cases, 2) Risk areas specific to the industry/organization, 3) Compliance requirements, 4) Implementation considerations.",
        inputType: "text",
        inputInstructions: "Describe your organization's size, industry, intended AI use cases, and primary concerns",
      },
      {
        id: "policy-framework",
        title: "Policy Framework Design",
        description: "Create the structure and key sections for your AI policy",
        promptInstruction: "Design a comprehensive framework for an AI use policy with the following: 1) Executive summary, 2) Scope and definitions, 3) Governance structure, 4) Risk management approach, 5) Specific policies for identified use cases, 6) Implementation guidelines. For each section, provide a brief description of what it will cover based on the requirements.",
        inputType: "previous-output",
      },
      {
        id: "draft-policy",
        title: "Draft Complete Policy",
        description: "Generate a complete draft AI use policy",
        promptInstruction: "Generate a complete AI use policy document following the framework. The policy should be professionally written, comprehensive yet concise, and tailored to the specific needs and risks identified. Include practical guidelines for implementation.",
        inputType: "previous-output",
      },
      {
        id: "compliance-check",
        title: "Compliance Check",
        description: "Review the policy for compliance with relevant regulations",
        promptInstruction: "Review this AI policy for compliance with relevant regulations and best practices. Identify: 1) Any potential compliance gaps, 2) Recommendations for strengthening compliance, 3) Suggestions for additional sections or clarifications needed.",
        inputType: "previous-output",
        isOptional: true,
      }
    ]
  }
];

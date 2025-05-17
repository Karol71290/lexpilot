
export const promptTemplates = [
  {
    id: "1",
    title: "Legal Research Summary",
    description: "Generate a concise summary of legal research on a specific topic",
    category: "Research",
    legalArea: "General",
    taskType: "Summarize",
    persona: ["Strategic Adopter", "Pragmatic User"],
    role: ["Associate", "Partner"],
    template: `Please provide a comprehensive legal research summary on [TOPIC]. Include:

1. Key relevant case law with brief summaries
2. Important statutory provisions
3. Scholarly articles and their main arguments
4. Potential counterarguments
5. Practice implications

Format the response as a structured outline with bullet points. Focus on developments within the past 5 years unless specified otherwise.`
  },
  {
    id: "2",
    title: "Contract Clause Drafter",
    description: "Generate contract clauses based on specific requirements",
    category: "Drafting",
    legalArea: "Corporate",
    taskType: "Draft",
    persona: ["AI Innovator", "Strategic Adopter"],
    role: ["Associate", "Partner", "Contract Manager"],
    template: `Please draft a [TYPE] clause for a [CONTRACT TYPE] that addresses the following concern: [CONCERN].

The clause should:
1. Be written in plain language while maintaining legal precision
2. Be enforceable under [JURISDICTION] law
3. Address potential loopholes
4. Include definitions for key terms if necessary
5. Be consistent with standard contract formatting

Additionally, provide a brief explanation of how this clause protects the client's interests and any negotiation considerations.`
  },
  {
    id: "3",
    title: "Litigation Strategy Outline",
    description: "Generate a litigation strategy based on case facts",
    category: "Litigation",
    legalArea: "Litigation",
    taskType: "Plan",
    persona: ["Strategic Adopter", "Cautious Evaluator"],
    role: ["Associate", "Partner"],
    template: `Based on the following case facts: [FACTS]

Please develop a comprehensive litigation strategy that includes:

1. Key legal theories and potential claims/defenses
2. Critical evidence needed and discovery strategy
3. Motion practice recommendations
4. Settlement considerations and valuation factors
5. Trial strategy outline
6. Timeline and resource allocation recommendations

Consider the jurisdiction of [JURISDICTION] and any relevant procedural rules. Format as a numbered outline with clear section headers.`
  },
  {
    id: "4",
    title: "IP Infringement Analysis",
    description: "Analyze potential IP infringement issues",
    category: "Analysis",
    legalArea: "IP Law",
    taskType: "Analyze",
    persona: ["Strategic Adopter", "Cautious Evaluator"],
    role: ["Associate", "Partner"],
    template: `Please analyze the following potential intellectual property infringement situation:

[DESCRIBE SITUATION]

Provide a comprehensive analysis that covers:

1. Type of IP potentially infringed (patent, trademark, copyright, trade secret)
2. Elements required to establish infringement
3. Potential defenses available
4. Remedies available if infringement is found
5. Recommended next steps for further investigation
6. Risk assessment and potential exposure

Include relevant case law and statutory provisions from [JURISDICTION].`
  },
  {
    id: "5",
    title: "Document Review Checklist",
    description: "Create a customized document review checklist",
    category: "Document Review",
    legalArea: "General",
    taskType: "Review",
    persona: ["Pragmatic User", "Cautious Evaluator"],
    role: ["Associate", "Paralegal", "Document Reviewer"],
    template: `Please create a comprehensive document review checklist for [DOCUMENT TYPE] in the context of [MATTER TYPE].

The checklist should include:

1. Key provisions to identify and analyze
2. Common issues or red flags to watch for
3. Industry-specific considerations for [INDUSTRY]
4. Regulatory compliance elements
5. Best practices for efficient review
6. Documentation standards for findings

Format as a structured checklist with clear sections and subsections that can be used by a legal team during review.`
  },
  {
    id: "6",
    title: "NDA Clause Analysis",
    description: "Analyze non-disclosure agreement clauses",
    category: "Analysis",
    legalArea: "Corporate",
    taskType: "Analyze",
    persona: ["Pragmatic User", "Strategic Adopter"],
    role: ["Associate", "Contract Manager"],
    template: `Please analyze the following NDA clause:

[CLAUSE]

Provide a detailed analysis including:

1. Effectiveness of the confidentiality protection
2. Duration and scope considerations
3. Enforceability issues under [JURISDICTION] law
4. Potential loopholes or ambiguities
5. Recommendations for strengthening the provision
6. Comparison to industry standard language

Format your response as a professional memo with clear headings for each analysis area.`
  }
];

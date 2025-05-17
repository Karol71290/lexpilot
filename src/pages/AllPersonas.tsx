
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const AllPersonas = () => {
  const personas = [
    {
      id: "innovator",
      name: "AI Innovator",
      description: "Early adopters who embrace new technologies enthusiastically and help drive change.",
      traits: ["Tech-savvy", "Creative", "Risk-taking", "Visionary"],
      strengths: [
        "Quick to adopt new tools",
        "Enthusiastic about exploring possibilities",
        "Willing to experiment",
        "Creates innovative use cases"
      ],
      challenges: [
        "May overestimate AI capabilities",
        "Sometimes focuses on novelty over practicality",
        "Can get frustrated with organizational constraints",
        "May need help communicating value to others"
      ]
    },
    {
      id: "strategic",
      name: "Strategic Adopter",
      description: "Embraces new technologies in a calculated way, focusing on practical applications and outcomes.",
      traits: ["Analytical", "Goal-oriented", "Practical", "Strategic"],
      strengths: [
        "Great at identifying high-value use cases",
        "Effective at setting measurable goals",
        "Good at communicating benefits to stakeholders",
        "Strategic implementation planning"
      ],
      challenges: [
        "May miss creative opportunities",
        "Sometimes overly cautious",
        "Can be too focused on immediate ROI",
        "May require more convincing on speculative use cases"
      ]
    },
    {
      id: "pragmatic",
      name: "Pragmatic User",
      description: "Adopts technology when it clearly solves a specific problem with minimal disruption.",
      traits: ["Solution-focused", "Efficient", "Practical", "Results-oriented"],
      strengths: [
        "Focused on real-world applications",
        "Good at identifying specific problems to solve",
        "Values efficiency improvements",
        "Realistic expectations"
      ],
      challenges: [
        "May resist broader changes",
        "Sometimes misses strategic opportunities",
        "Can be skeptical of transformative potential",
        "Might need help seeing long-term benefits"
      ]
    },
    {
      id: "cautious",
      name: "Cautious Evaluator",
      description: "Carefully evaluates new technologies with concerns about reliability, ethics, and governance.",
      traits: ["Detail-oriented", "Thoughtful", "Risk-aware", "Process-focused"],
      strengths: [
        "Thorough evaluation of risks",
        "Attention to compliance and ethics",
        "Ensures proper governance",
        "Helps build sustainable adoption"
      ],
      challenges: [
        "May focus too much on limitations",
        "Sometimes slow to adopt",
        "Can be overly concerned with potential issues",
        "Might need extra support and evidence"
      ]
    },
    {
      id: "skeptical",
      name: "Skeptical Observer",
      description: "Resistant to new technologies until thoroughly proven with significant concerns about risks.",
      traits: ["Traditional", "Security-conscious", "Risk-averse", "Detail-focused"],
      strengths: [
        "Identifies genuine risks others might miss",
        "Ensures thorough evaluation",
        "Values proven methods",
        "Important voice in ensuring responsible adoption"
      ],
      challenges: [
        "Strong resistance to change",
        "Can block progress with excessive caution",
        "May focus only on risks not benefits",
        "Requires significant evidence and reassurance"
      ]
    },
    {
      id: "reluctant",
      name: "Reluctant Participant",
      description: "Prefers established methods and may see little value in adopting AI technologies.",
      traits: ["Experienced", "Traditional", "Process-oriented", "Independent"],
      strengths: [
        "Deep knowledge of existing processes",
        "Valuable perspective on what can't be replaced",
        "Ensures continuity in practice",
        "Validates when new tools actually provide improvements"
      ],
      challenges: [
        "Significant resistance to adoption",
        "May reject tools without sufficient exploration",
        "Often requires extensive support",
        "Can influence others to avoid adoption"
      ]
    }
  ];

  return (
    <AppLayout title="All Personas">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Adoption Personas</h1>
        <p className="text-muted-foreground mb-6">
          Understanding the different approaches to AI adoption helps create better implementation strategies and supports legal professionals where they are.
        </p>
        
        <Tabs defaultValue={personas[0].id} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
            {personas.map(persona => (
              <TabsTrigger key={persona.id} value={persona.id} className="text-xs md:text-sm">
                {persona.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {personas.map(persona => (
            <TabsContent key={persona.id} value={persona.id}>
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-2xl text-lawadapt-purple">{persona.name}</CardTitle>
                  <CardDescription className="text-base">{persona.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {persona.traits.map(trait => (
                      <Badge key={trait} variant="outline">{trait}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Key Strengths:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {persona.strengths.map((strength, i) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Key Challenges:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {persona.challenges.map((challenge, i) => (
                          <li key={i}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Adoption Strategy:</h3>
                    <p>
                      {persona.id === "innovator" && "Engage as champions and testers, providing early access to new tools and involvement in pilot programs."}
                      {persona.id === "strategic" && "Provide ROI data and structured implementation plans with clear measurement frameworks."}
                      {persona.id === "pragmatic" && "Focus on specific pain points in their workflow with targeted solutions and quick wins."}
                      {persona.id === "cautious" && "Offer detailed documentation, case studies, and governance frameworks to address concerns."}
                      {persona.id === "skeptical" && "Start with lower-risk applications, provide extensive training, and address specific concerns with evidence."}
                      {persona.id === "reluctant" && "Offer extensive support, one-on-one training, and focus on gradual introduction of simpler tools first."}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" className="flex-1 mr-2">Training Resources</Button>
                    <Button className="flex-1">Adoption Playbook</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AllPersonas;

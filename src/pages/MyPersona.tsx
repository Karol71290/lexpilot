
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, FileText, Pencil, Users } from "lucide-react";

const MyPersona = () => {
  // This would come from user data in a real app
  const userPersona = {
    name: "Strategic Adopter",
    description: "You embrace new technologies but in a calculated way. You prioritize practical applications and measurable outcomes over experimentation for its own sake.",
    strengths: [
      "Great at identifying high-value use cases",
      "Effective at setting measurable goals",
      "Good at communicating benefits to stakeholders",
      "Strategic implementation planning"
    ],
    opportunities: [
      "Consider more experimentation in low-risk areas",
      "Build time for creative exploration",
      "Connect with technology enthusiasts",
      "Share your implementation successes widely"
    ],
    learningStyle: "You learn best through structured tutorials with clear business outcomes and ROI examples.",
    recommendedPrompts: [
      "Research Summary",
      "Client Advice Template",
      "Comparative Analysis"
    ],
    recommendedTraining: [
      "Strategic AI Implementation",
      "ROI Measurement for AI",
      "Change Management Leadership"
    ]
  };

  return (
    <AppLayout title="My Persona">
      <div className="grid gap-6">
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">My AI Adoption Persona</h2>
              <p className="text-muted-foreground">Based on your quiz responses</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/quiz">Retake Quiz</Link>
            </Button>
          </div>

          <Card className="card-gradient">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-lawadapt-purple">
                    {userPersona.name}
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    {userPersona.description}
                  </CardDescription>
                </div>
                <Users className="h-10 w-10 text-lawadapt-purple" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="actions">Next Steps</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Key Strengths:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {userPersona.strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Growth Opportunities:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {userPersona.opportunities.map((opportunity, i) => (
                        <li key={i}>{opportunity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Preferred Learning Style:</h3>
                    <p>{userPersona.learningStyle}</p>
                  </div>
                </TabsContent>
                <TabsContent value="recommendations" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Recommended Prompts
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {userPersona.recommendedPrompts.map((prompt, i) => (
                          <li key={i}>{prompt}</li>
                        ))}
                      </ul>
                      <Button variant="outline" size="sm" asChild className="mt-2">
                        <Link to="/prompt-builder">
                          <Pencil className="h-3.5 w-3.5 mr-2" />
                          View Prompts
                        </Link>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Recommended Training
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {userPersona.recommendedTraining.map((training, i) => (
                          <li key={i}>{training}</li>
                        ))}
                      </ul>
                      <Button variant="outline" size="sm" asChild className="mt-2">
                        <Link to="/training-hub">
                          <BookOpen className="h-3.5 w-3.5 mr-2" />
                          View Training
                        </Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="actions" className="mt-4">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Based on your persona, we recommend the following next steps to advance your AI adoption journey:
                    </p>
                    <ol className="list-decimal pl-5 space-y-3">
                      <li><strong>Complete</strong> the introductory training module for Strategic Adopters</li>
                      <li><strong>Explore</strong> the prompt templates designed for your specific role</li>
                      <li><strong>Schedule</strong> a 30-minute planning session with your team to identify use cases</li>
                      <li><strong>Set</strong> specific goals for implementing AI in one area within the next 30 days</li>
                    </ol>
                    <div className="pt-2">
                      <Button className="mr-2" asChild>
                        <Link to="/training-hub">Start Training</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/project-planner">View Project Plan</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
};

export default MyPersona;


import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, FileText, Users, FileStack, Sparkles } from "lucide-react";

const Index = () => {
  // Most recent AI updates for the dashboard
  const recentUpdates = [
    {
      title: "GPT-4o Now Available",
      description: "Our newest enterprise AI model is now available for all users.",
      date: "May 10, 2025",
    },
    {
      title: "New Legal Brief Templates",
      description: "20 new prompt templates specifically for case briefs added to the library.",
      date: "May 5, 2025",
    },
    {
      title: "Document Analysis Tool",
      description: "Try our new AI tool for contract analysis and due diligence.",
      date: "April 28, 2025",
    },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-6">
        <section className="mb-8">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <img 
              src="/lovable-uploads/916f0dcb-d7f5-4370-8fbc-8da1ab90b6f6.png" 
              alt="LexPilot Logo" 
              className="h-20 mb-4" 
            />
            <h1 className="text-3xl font-bold">Welcome to LexPilot</h1>
            <p className="text-muted-foreground">AI co-pilot for legal teams</p>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Quick Access</h2>
            <Button asChild>
              <Link to="/quiz">Take AI Adoption Quiz</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="card-gradient relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1">
                <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded-bl">NEW</span>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileStack className="h-5 w-5 mr-2 text-lawadapt-purple" />
                  AI Legal Workflows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-2">Dynamic AI-powered workflows for legal tasks</p>
                  <Button variant="default" asChild>
                    <Link to="/legal-workflows">Create Workflow</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2 text-lawadapt-purple" />
                  My Persona
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-2">Take the quiz to discover your AI adoption persona</p>
                  <Button variant="outline" asChild>
                    <Link to="/my-persona">View Persona</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2 text-lawadapt-purple" />
                  Prompt Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-2">Access persona-tailored prompt templates</p>
                  <Button variant="outline" asChild>
                    <Link to="/prompt-builder">Build Prompts</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <BookOpen className="h-5 w-5 mr-2 text-lawadapt-purple" />
                  Training Hub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-2">Access tailored training modules</p>
                  <Button variant="outline" asChild>
                    <Link to="/training-hub">View Training</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Recent AI Updates</h2>
          <div className="space-y-4">
            {recentUpdates.map((update, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{update.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">{update.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                </CardContent>
              </Card>
            ))}
            <div className="text-center mt-4">
              <Button variant="outline" asChild>
                <Link to="/ai-releases">View All Updates</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Index;

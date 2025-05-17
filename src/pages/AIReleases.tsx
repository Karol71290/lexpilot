
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calendar, Check } from "lucide-react";

const AIReleases = () => {
  // This would come from an API in a real application
  const announcements = [
    {
      id: "1",
      title: "GPT-4o Now Available",
      date: "May 10, 2025",
      category: "Platform Update",
      description: "Our newest enterprise AI model is now available for all users. GPT-4o offers improved performance on legal research, document analysis, and contract review tasks.",
      impact: "High",
      details: "The new model shows a 30% improvement in understanding complex legal concepts and citations. All existing prompts will work with the new model, but may benefit from optimization.",
      resources: [
        { type: "Training", title: "Using GPT-4o for Legal Work", path: "/training-hub" },
        { type: "Prompts", title: "Optimized Prompts for GPT-4o", path: "/prompt-builder" }
      ]
    },
    {
      id: "2",
      title: "New Legal Brief Templates",
      date: "May 5, 2025",
      category: "Content Update",
      description: "20 new prompt templates specifically for case briefs added to the library. These templates follow jurisdiction-specific formats for federal and state courts.",
      impact: "Medium",
      details: "The new templates include options for appellate briefs, motions to dismiss, and summary judgment briefs. Each template includes placeholders for key facts and legal arguments.",
      resources: [
        { type: "Template", title: "Federal Appellate Brief Template", path: "/prompt-builder" },
        { type: "Training", title: "Effective Brief Writing with AI", path: "/training-hub" }
      ]
    },
    {
      id: "3",
      title: "Document Analysis Tool",
      date: "April 28, 2025",
      category: "New Feature",
      description: "We've added a new document analysis tool that can extract key provisions, identify potential issues, and compare against precedent documents.",
      impact: "High",
      details: "The tool supports PDF, Word, and plaintext documents up to 500 pages. Analysis results are provided in a structured format with highlighted sections and explanatory notes.",
      resources: [
        { type: "Training", title: "Document Analysis Masterclass", path: "/training-hub" },
        { type: "Guide", title: "Best Practices for Document Analysis", path: "/prompt-builder" }
      ]
    },
    {
      id: "4",
      title: "Persona-Based Training Updates",
      date: "April 15, 2025",
      category: "Training Update",
      description: "All training modules have been updated with persona-specific paths. Users can now select their AI adoption persona for customized learning experiences.",
      impact: "Medium",
      details: "Training modules now include specific examples, case studies, and exercises tailored to each persona. This personalized approach addresses the unique challenges and opportunities for each adoption style.",
      resources: [
        { type: "Quiz", title: "Verify Your AI Adoption Persona", path: "/quiz" },
        { type: "Training", title: "Persona-Specific Learning Paths", path: "/training-hub" }
      ]
    },
    {
      id: "5",
      title: "Weekly Check-In Feature Improved",
      date: "April 8, 2025",
      category: "Feature Enhancement",
      description: "The weekly check-in feature has been enhanced with trend analysis and personalized recommendations based on your feedback.",
      impact: "Low",
      details: "Users can now see how their confidence and usage metrics compare to team and organizational averages. The system provides targeted recommendations to help advance your AI adoption journey.",
      resources: [
        { type: "Guide", title: "Making the Most of Weekly Check-Ins", path: "/feedback-tracker" }
      ]
    },
    {
      id: "6",
      title: "Legal Research Enhancement",
      date: "April 1, 2025",
      category: "New Feature",
      description: "Our AI assistant now supports direct citation checking and validation against legal databases for U.S. federal and state law.",
      impact: "High",
      details: "The system can now verify citations, check if cases are still good law, and provide summaries of cited cases. This feature currently supports Westlaw and LexisNexis integrations.",
      resources: [
        { type: "Training", title: "AI-Assisted Legal Research", path: "/training-hub" },
        { type: "Prompts", title: "Legal Research Prompt Templates", path: "/prompt-builder" }
      ]
    }
  ];

  return (
    <AppLayout title="New AI Releases">
      <div className="grid gap-6">
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">New AI Releases</h1>
              <p className="text-muted-foreground">Stay up-to-date with the latest AI tools and updates</p>
            </div>
          </div>
        </section>

        <section>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Updates</TabsTrigger>
              <TabsTrigger value="features">New Features</TabsTrigger>
              <TabsTrigger value="content">Content Updates</TabsTrigger>
              <TabsTrigger value="training">Training Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="space-y-6">
                {announcements.map(announcement => (
                  <Card key={announcement.id}>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{announcement.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4" />
                            {announcement.date}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge>{announcement.category}</Badge>
                          <Badge variant={announcement.impact === 'High' ? 'destructive' : announcement.impact === 'Medium' ? 'default' : 'secondary'}>
                            {announcement.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{announcement.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">What this means for you:</h4>
                        <p className="text-sm">{announcement.details}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Resources:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {announcement.resources.map((resource, i) => (
                            <Card key={i} className="bg-accent/10">
                              <CardContent className="p-3 flex items-center justify-between">
                                <div className="flex items-center">
                                  <BookOpen className="h-4 w-4 mr-3 text-accent" />
                                  <div>
                                    <Badge variant="outline" className="mb-1">{resource.type}</Badge>
                                    <p className="text-sm font-medium">{resource.title}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-2 h-8">View</Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" />
                        Mark as Read
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <div className="space-y-6">
                {announcements
                  .filter(a => a.category === 'New Feature' || a.category === 'Feature Enhancement')
                  .map(announcement => (
                    <Card key={announcement.id}>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <CardTitle className="text-xl">{announcement.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4" />
                              {announcement.date}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge>{announcement.category}</Badge>
                            <Badge variant={announcement.impact === 'High' ? 'destructive' : announcement.impact === 'Medium' ? 'default' : 'secondary'}>
                              {announcement.impact} Impact
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>{announcement.description}</p>
                        <div>
                          <h4 className="font-medium mb-2">What this means for you:</h4>
                          <p className="text-sm">{announcement.details}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Resources:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {announcement.resources.map((resource, i) => (
                              <Card key={i} className="bg-accent/10">
                                <CardContent className="p-3 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-3 text-accent" />
                                    <div>
                                      <Badge variant="outline" className="mb-1">{resource.type}</Badge>
                                      <p className="text-sm font-medium">{resource.title}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="ml-2 h-8">View</Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Mark as Read
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="mt-6">
              <div className="space-y-6">
                {announcements
                  .filter(a => a.category === 'Content Update')
                  .map(announcement => (
                    <Card key={announcement.id}>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <CardTitle className="text-xl">{announcement.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4" />
                              {announcement.date}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge>{announcement.category}</Badge>
                            <Badge variant={announcement.impact === 'High' ? 'destructive' : announcement.impact === 'Medium' ? 'default' : 'secondary'}>
                              {announcement.impact} Impact
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>{announcement.description}</p>
                        <div>
                          <h4 className="font-medium mb-2">What this means for you:</h4>
                          <p className="text-sm">{announcement.details}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Resources:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {announcement.resources.map((resource, i) => (
                              <Card key={i} className="bg-accent/10">
                                <CardContent className="p-3 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-3 text-accent" />
                                    <div>
                                      <Badge variant="outline" className="mb-1">{resource.type}</Badge>
                                      <p className="text-sm font-medium">{resource.title}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="ml-2 h-8">View</Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Mark as Read
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="training" className="mt-6">
              <div className="space-y-6">
                {announcements
                  .filter(a => a.category === 'Training Update')
                  .map(announcement => (
                    <Card key={announcement.id}>
                      <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <CardTitle className="text-xl">{announcement.title}</CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4" />
                              {announcement.date}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Badge>{announcement.category}</Badge>
                            <Badge variant={announcement.impact === 'High' ? 'destructive' : announcement.impact === 'Medium' ? 'default' : 'secondary'}>
                              {announcement.impact} Impact
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p>{announcement.description}</p>
                        <div>
                          <h4 className="font-medium mb-2">What this means for you:</h4>
                          <p className="text-sm">{announcement.details}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Resources:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {announcement.resources.map((resource, i) => (
                              <Card key={i} className="bg-accent/10">
                                <CardContent className="p-3 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <BookOpen className="h-4 w-4 mr-3 text-accent" />
                                    <div>
                                      <Badge variant="outline" className="mb-1">{resource.type}</Badge>
                                      <p className="text-sm font-medium">{resource.title}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm" className="ml-2 h-8">View</Button>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Mark as Read
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </AppLayout>
  );
};

export default AIReleases;

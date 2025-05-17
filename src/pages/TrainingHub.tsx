
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Check, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const TrainingHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // This would come from an API in a real application
  const modules = [
    {
      id: "1",
      title: "AI Fundamentals for Legal Professionals",
      description: "Learn the basics of AI and how it applies to legal practice",
      persona: ["All Personas"],
      duration: "45 minutes",
      progress: 100,
      completed: true,
      level: "Beginner",
      tags: ["Foundation", "AI Basics"]
    },
    {
      id: "2",
      title: "Effective Prompt Engineering for Legal Work",
      description: "Master the art of writing effective prompts for legal AI tools",
      persona: ["AI Innovator", "Strategic Adopter"],
      duration: "60 minutes",
      progress: 75,
      completed: false,
      level: "Intermediate",
      tags: ["Prompt Engineering", "Best Practices"]
    },
    {
      id: "3",
      title: "AI Ethics and Governance for Legal Teams",
      description: "Understand the ethical implications and governance requirements for AI in legal practice",
      persona: ["Cautious Evaluator", "Strategic Adopter"],
      duration: "90 minutes",
      progress: 0,
      completed: false,
      level: "Advanced",
      tags: ["Ethics", "Governance", "Compliance"]
    },
    {
      id: "4",
      title: "Legal Research Enhancement with AI",
      description: "Leverage AI tools to improve research efficiency and thoroughness",
      persona: ["Pragmatic User", "Strategic Adopter"],
      duration: "60 minutes",
      progress: 0,
      completed: false,
      level: "Intermediate",
      tags: ["Research", "Efficiency"]
    },
    {
      id: "5",
      title: "Document Review & Analysis with AI",
      description: "Learn how to use AI for faster and more accurate document review",
      persona: ["Pragmatic User", "Cautious Evaluator"],
      duration: "75 minutes",
      progress: 0,
      completed: false,
      level: "Intermediate",
      tags: ["Document Review", "Analysis"]
    },
    {
      id: "6",
      title: "AI-Assisted Client Communication",
      description: "Improve client communications using AI tools while maintaining the personal touch",
      persona: ["Strategic Adopter", "Pragmatic User"],
      duration: "45 minutes",
      progress: 0,
      completed: false,
      level: "Beginner",
      tags: ["Communication", "Client Relations"]
    }
  ];

  // Filter modules based on search query
  const filteredModules = modules.filter(module => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      module.title.toLowerCase().includes(searchLower) ||
      module.description.toLowerCase().includes(searchLower) ||
      module.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      module.level.toLowerCase().includes(searchLower)
    );
  });

  // Group modules by completion status
  const completedModules = filteredModules.filter(module => module.completed);
  const inProgressModules = filteredModules.filter(module => !module.completed && module.progress > 0);
  const notStartedModules = filteredModules.filter(module => !module.completed && module.progress === 0);

  return (
    <AppLayout title="Training Hub">
      <div className="grid gap-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Training Hub</h1>
            <p className="text-muted-foreground">Personalized learning modules for legal AI adoption</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search training modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">My Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completed</span>
                    <span>{completedModules.length} of {modules.length}</span>
                  </div>
                  <Progress value={(completedModules.length / modules.length) * 100} className="h-2" />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1 Completed</span>
                  <span>1 In Progress</span>
                  <span>4 Not Started</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recommended Next</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4 py-2">
                <BookOpen className="h-8 w-8 text-lawadapt-purple" />
                <div>
                  <h3 className="font-medium">Effective Prompt Engineering for Legal Work</h3>
                  <p className="text-sm text-muted-foreground">Continue where you left off</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full">Resume Training</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Path</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">Based on your Strategic Adopter persona</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="text-sm">AI Fundamentals</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full border-2 border-primary text-primary flex items-center justify-center text-sm font-medium">
                    2
                  </div>
                  <p className="text-sm">Prompt Engineering</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full border-2 border-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                    3
                  </div>
                  <p className="text-sm text-muted-foreground">Legal Research with AI</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full border-2 border-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                    4
                  </div>
                  <p className="text-sm text-muted-foreground">AI Governance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Modules</TabsTrigger>
                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Badge variant="outline">Filter: My Persona</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent/20">
                  Clear Filters
                </Badge>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredModules.map(module => (
                  <Card key={module.id} className="card-gradient">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        {module.completed && <Check className="h-5 w-5 text-green-500" />}
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                        <Badge variant="outline" className="ml-auto">{module.level}</Badge>
                      </div>
                      {module.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-1" />
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {module.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button 
                        className="w-full" 
                        variant={module.completed ? "outline" : "default"}
                      >
                        {module.completed ? "Review Module" : module.progress > 0 ? "Continue" : "Start Module"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inprogress" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inProgressModules.length > 0 ? (
                  inProgressModules.map(module => (
                    <Card key={module.id} className="card-gradient">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                          <Badge variant="outline" className="ml-auto">{module.level}</Badge>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <Progress value={module.progress} className="h-1" />
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {module.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button className="w-full">Continue</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No modules in progress</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedModules.length > 0 ? (
                  completedModules.map(module => (
                    <Card key={module.id} className="card-gradient">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <Check className="h-5 w-5 text-green-500" />
                        </div>
                        <CardDescription>{module.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                          <Badge variant="outline" className="ml-auto">{module.level}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {module.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Review Module</Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No completed modules</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </AppLayout>
  );
};

export default TrainingHub;

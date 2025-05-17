import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Check, Clock, Search, Star, BookOpenCheck, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUserPersona } from "@/hooks/useUserPersona";
import { 
  getPersonaName, 
  getPersonaTrainingPreferences, 
  getPersonaGrowthPath,
  PersonaLearningStyle
} from "@/utils/personaUtils";
import { PersonaEvolutionAlert } from "@/components/persona/PersonaEvolutionAlert";

const TrainingHub = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { userPersona, userData, recordTrainingCompletion } = useUserPersona();
  
  const personaName = getPersonaName(userPersona);
  const trainingPreferences = getPersonaTrainingPreferences(userPersona);
  const personaGrowthPath = getPersonaGrowthPath(userPersona);
  
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
      tags: ["Foundation", "AI Basics"],
      learningStyle: "guided" as PersonaLearningStyle,
      track: "AI Fundamentals"
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
      tags: ["Prompt Engineering", "Best Practices"],
      learningStyle: "guided" as PersonaLearningStyle,
      track: "Practical Applications"
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
      tags: ["Ethics", "Governance", "Compliance"],
      learningStyle: "case-based" as PersonaLearningStyle,
      track: "Governance"
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
      tags: ["Research", "Efficiency"],
      learningStyle: "structured" as PersonaLearningStyle,
      track: "Practical Applications"
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
      tags: ["Document Review", "Analysis"],
      learningStyle: "guided" as PersonaLearningStyle,
      track: "Practical Applications"
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
      tags: ["Communication", "Client Relations"],
      learningStyle: "guided" as PersonaLearningStyle,
      track: "Practical Applications"
    },
    // New modules based on persona tracks
    {
      id: "7",
      title: "Advanced Prompt Architectures",
      description: "Learn advanced techniques for designing sophisticated prompts for complex legal tasks",
      persona: ["Tech Evangelist", "AI Innovator"],
      duration: "90 minutes",
      progress: 0,
      completed: false,
      level: "Advanced",
      tags: ["Advanced", "Prompt Engineering"],
      learningStyle: "exploratory" as PersonaLearningStyle,
      track: "Advanced Prompting"
    },
    {
      id: "8",
      title: "Training the Trainers",
      description: "Learn how to effectively teach AI concepts to fellow legal professionals",
      persona: ["Tech Evangelist"],
      duration: "60 minutes",
      progress: 0,
      completed: false,
      level: "Advanced",
      tags: ["Teaching", "Leadership"],
      learningStyle: "exploratory" as PersonaLearningStyle,
      track: "Teaching & Evangelism"
    },
    {
      id: "9",
      title: "Measuring AI ROI",
      description: "Framework for quantifying time and cost savings from AI implementation",
      persona: ["Process Optimizer", "Strategic Adopter"],
      duration: "75 minutes",
      progress: 0,
      completed: false,
      level: "Intermediate",
      tags: ["ROI", "Metrics", "Business Case"],
      learningStyle: "structured" as PersonaLearningStyle,
      track: "Efficiency Optimization"
    },
    {
      id: "10",
      title: "Workflow Optimization with AI",
      description: "Methodologies for integrating AI into existing legal workflows for maximum efficiency",
      persona: ["Process Optimizer", "Pragmatic User"],
      duration: "90 minutes",
      progress: 0,
      completed: false,
      level: "Intermediate",
      tags: ["Workflow", "Optimization", "Process"],
      learningStyle: "structured" as PersonaLearningStyle,
      track: "Process Improvement"
    },
    {
      id: "11",
      title: "Case-Backed AI Risk Management",
      description: "Real-world case studies of AI implementation risks and mitigation strategies",
      persona: ["Skeptical Veteran", "Cautious Evaluator"],
      duration: "120 minutes",
      progress: 0,
      completed: false,
      level: "Advanced",
      tags: ["Risk", "Case Studies", "Compliance"],
      learningStyle: "case-based" as PersonaLearningStyle,
      track: "Risk Management"
    },
    {
      id: "12",
      title: "Prompting Basics",
      description: "Fundamental principles of effective prompts for legal AI applications",
      persona: ["Curious Practitioner", "All Personas"],
      duration: "45 minutes",
      progress: 0,
      completed: false,
      level: "Beginner",
      tags: ["Fundamentals", "Prompting"],
      learningStyle: "guided" as PersonaLearningStyle,
      track: "Prompting Basics"
    },
    {
      id: "13",
      title: "AI Risks & Limitations",
      description: "Understanding the boundaries and risks of current AI technology in legal contexts",
      persona: ["Silent Resister", "Skeptical Observer"],
      duration: "60 minutes",
      progress: 0,
      completed: false,
      level: "Beginner",
      tags: ["Risk", "Limitations", "Awareness"],
      learningStyle: "self-directed" as PersonaLearningStyle,
      track: "Risk Awareness"
    }
  ];

  // Get persona-recommended modules
  const recommendedModules = modules.filter(module => 
    trainingPreferences.recommendedModules.includes(module.title)
  );
  
  // Get modules that match the user's learning style
  const matchingLearningStyleModules = modules.filter(module => 
    module.learningStyle === trainingPreferences.learningStyle
  );
  
  // Get modules for core track completion
  const coreModules = modules.filter(module => 
    trainingPreferences.coreModules.includes(module.title)
  );
  
  // Calculate core track completion
  const completedCoreModules = coreModules.filter(module => module.completed).length;
  const coreTrackProgress = (completedCoreModules / coreModules.length) * 100;

  // Filter modules based on search query
  const filteredModules = modules.filter(module => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      module.title.toLowerCase().includes(searchLower) ||
      module.description.toLowerCase().includes(searchLower) ||
      module.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      module.level.toLowerCase().includes(searchLower) ||
      module.track.toLowerCase().includes(searchLower)
    );
  });

  // Group modules by completion status
  const completedModules = filteredModules.filter(module => module.completed);
  const inProgressModules = filteredModules.filter(module => !module.completed && module.progress > 0);
  const notStartedModules = filteredModules.filter(module => !module.completed && module.progress === 0);
  
  // Group modules by track for track-based view
  const tracks = [...new Set(modules.map(module => module.track))];
  const trackModules = tracks.map(track => ({
    track,
    modules: modules.filter(module => module.track === track),
    isRecommended: trainingPreferences.recommendedTracks.includes(track)
  }));

  // Handler for completing a module (mock)
  const handleCompleteModule = (moduleId: string) => {
    recordTrainingCompletion(moduleId);
    // In a real app, would update the module's progress and completion status
    console.log(`Completed module ${moduleId}`);
  };

  return (
    <AppLayout title="Training Hub">
      <div className="grid gap-6">
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Training Hub</h1>
            <p className="text-muted-foreground">Personalized learning for your {personaName} persona</p>
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

        <PersonaEvolutionAlert />

        <section>
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <p className="text-muted-foreground mb-4">Based on your {personaName} persona and {trainingPreferences.learningStyle} learning style</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedModules.slice(0, 3).map(module => (
              <Card key={module.id} className="card-gradient border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-2">
                      Recommended
                    </Badge>
                    {trainingPreferences.learningStyle === module.learningStyle && (
                      <Badge variant="secondary" className="bg-accent/40 text-accent-foreground">
                        Matches Your Style
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
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
                  <Button 
                    className="w-full" 
                    onClick={() => handleCompleteModule(module.id)}
                  >
                    Start Module
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{personaName} Core Track</span>
                    <span>{completedCoreModules} of {coreModules.length}</span>
                  </div>
                  <Progress value={coreTrackProgress} className="h-2 bg-primary/20" indicatorClassName="bg-primary" />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{completedModules.length} Completed</span>
                  <span>{inProgressModules.length} In Progress</span>
                  <span>{notStartedModules.length} Not Started</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recommended Next</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {inProgressModules.length > 0 ? (
                <div className="flex items-center gap-4 py-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">{inProgressModules[0].title}</h3>
                    <p className="text-sm text-muted-foreground">Continue where you left off</p>
                  </div>
                </div>
              ) : recommendedModules.length > 0 ? (
                <div className="flex items-center gap-4 py-2">
                  <Star className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium">{recommendedModules[0].title}</h3>
                    <p className="text-sm text-muted-foreground">Recommended for {personaName}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 py-2">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Explore All Modules</h3>
                    <p className="text-sm text-muted-foreground">Find something that interests you</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full">
                {inProgressModules.length > 0 ? "Resume Training" : "Start Training"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Persona Journey</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Current Level: {personaGrowthPath.currentLevel}/5</p>
                  <Badge variant="outline" className="text-xs">{personaName}</Badge>
                </div>
                <Progress 
                  value={personaGrowthPath.currentLevel * 20} 
                  className="h-2" 
                />
                {personaGrowthPath.nextPersona && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Next milestone: {getPersonaName(personaGrowthPath.nextPersona)}
                  </p>
                )}
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Milestone Progress:</p>
                  <div className="space-y-2">
                    {personaGrowthPath.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center">
                        {index < personaGrowthPath.completedMilestones ? (
                          <div className="h-4 w-4 rounded-full bg-primary/80 mr-2 flex items-center justify-center">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-muted-foreground mr-2" />
                        )}
                        <span className="text-sm">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Modules</TabsTrigger>
                <TabsTrigger value="tracks">Learning Tracks</TabsTrigger>
                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {personaName}
                </Badge>
                <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
                  {trainingPreferences.learningStyle} Learning
                </Badge>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredModules.map(module => (
                  <Card 
                    key={module.id} 
                    className={`card-gradient ${trainingPreferences.recommendedModules.includes(module.title) ? 'border-primary/20' : ''}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        {module.completed && <Check className="h-5 w-5 text-green-500" />}
                      </div>
                      {trainingPreferences.recommendedModules.includes(module.title) && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 w-fit mb-1">
                          Recommended for You
                        </Badge>
                      )}
                      {trainingPreferences.learningStyle === module.learningStyle && (
                        <Badge variant="secondary" className="bg-accent/40 text-accent-foreground w-fit mb-2">
                          Matches Your Style
                        </Badge>
                      )}
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
                        onClick={() => handleCompleteModule(module.id)}
                      >
                        {module.completed ? "Review Module" : module.progress > 0 ? "Continue" : "Start Module"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tracks" className="mt-0">
              <div className="space-y-6">
                {trackModules.map((track) => (
                  <div key={track.track}>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-xl font-semibold">{track.track}</h3>
                      {track.isRecommended && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Recommended for {personaName}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {track.modules.map(module => (
                        <Card 
                          key={module.id} 
                          className={`card-gradient ${trainingPreferences.recommendedModules.includes(module.title) ? 'border-primary/20' : ''}`}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-lg">{module.title}</CardTitle>
                              {module.completed && <Check className="h-5 w-5 text-green-500" />}
                            </div>
                            {trainingPreferences.recommendedModules.includes(module.title) && (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 w-fit mb-1">
                                Recommended for You
                              </Badge>
                            )}
                            {trainingPreferences.learningStyle === module.learningStyle && (
                              <Badge variant="secondary" className="bg-accent/40 text-accent-foreground w-fit mb-2">
                                Matches Your Style
                              </Badge>
                            )}
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
                              onClick={() => handleCompleteModule(module.id)}
                            >
                              {module.completed ? "Review Module" : module.progress > 0 ? "Continue" : "Start Module"}
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
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

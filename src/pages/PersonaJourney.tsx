
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Check, Calendar, PenTool, ArrowUpRight, Star } from "lucide-react";
import { useUserPersona } from "@/hooks/useUserPersona";
import { 
  getPersonaName, 
  getPersonaGrowthPath,
  PersonaId,
} from "@/utils/personaUtils";
import { Link } from "react-router-dom";

const PERSONA_LEVELS = {
  1: {
    title: "Novice",
    description: "Beginning your AI adoption journey",
    color: "bg-zinc-300"
  },
  2: {
    title: "Explorer",
    description: "Actively exploring AI applications",
    color: "bg-blue-400"
  },
  3: {
    title: "Practitioner",
    description: "Regularly applying AI in your work",
    color: "bg-green-400"
  },
  4: {
    title: "Optimizer",
    description: "Enhancing processes with AI",
    color: "bg-purple-400"
  },
  5: {
    title: "Innovator",
    description: "Leading AI transformation",
    color: "bg-amber-400"
  }
};

const PersonaJourney = () => {
  const { userPersona, userData } = useUserPersona();
  const personaName = getPersonaName(userPersona);
  const growthPath = getPersonaGrowthPath(userPersona);
  
  const recentActivity = [
    {
      type: "training",
      title: "Completed 'AI Fundamentals for Legal Professionals'",
      date: "2 days ago",
      icon: BookOpen
    },
    {
      type: "prompt",
      title: "Created new prompt for contract analysis",
      date: "3 days ago",
      icon: PenTool
    },
    {
      type: "project",
      title: "Joined AI Policy Development project",
      date: "1 week ago",
      icon: Calendar
    }
  ];

  const getNextPersonas = (currentPersona: PersonaId): PersonaId[] => {
    // In a real application, this would come from an algorithm or database
    // This is a simplified version for demonstration
    const personaProgression: Record<PersonaId, PersonaId[]> = {
      'resister': ['reluctant', 'skeptical'],
      'reluctant': ['cautious', 'pragmatic'],
      'skeptical': ['veteran', 'cautious'],
      'cautious': ['pragmatic', 'veteran'],
      'pragmatic': ['optimizer', 'strategic'],
      'veteran': ['strategic', 'pragmatic'],
      'strategic': ['innovator', 'optimizer'],
      'optimizer': ['innovator', 'evangelist'],
      'practitioner': ['strategic', 'optimizer'],
      'innovator': ['evangelist'],
      'evangelist': []
    };
    
    return personaProgression[currentPersona] || [];
  };
  
  const nextPossiblePersonas = getNextPersonas(userPersona);

  return (
    <AppLayout title="Persona Journey">
      <div className="max-w-4xl mx-auto space-y-8">
        <section>
          <h1 className="text-3xl font-bold mb-2">Your AI Adoption Journey</h1>
          <p className="text-muted-foreground mb-6">
            Track your progress, set goals, and evolve your approach to AI adoption in legal practice
          </p>

          <Card className="card-gradient">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-primary">
                    {personaName}
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    Level {growthPath.currentLevel}: {PERSONA_LEVELS[growthPath.currentLevel as keyof typeof PERSONA_LEVELS]?.title}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {PERSONA_LEVELS[growthPath.currentLevel as keyof typeof PERSONA_LEVELS]?.title}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Journey Progress</h3>
                  <span className="text-sm">Level {growthPath.currentLevel}/5</span>
                </div>
                <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div 
                      key={level}
                      className={`absolute top-0 bottom-0 ${level <= growthPath.currentLevel ? PERSONA_LEVELS[level as keyof typeof PERSONA_LEVELS]?.color : 'bg-transparent'}`}
                      style={{ 
                        left: `${(level-1) * 20}%`, 
                        right: `${100 - level * 20}%`
                      }}
                    >
                      {level <= growthPath.currentLevel && (
                        <div className="h-full w-full flex items-center justify-center text-white text-xs font-medium">
                          {level}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Novice</span>
                  <span>Explorer</span>
                  <span>Practitioner</span>
                  <span>Optimizer</span>
                  <span>Innovator</span>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="font-medium mb-3">Milestones to Progress</h3>
                <div className="space-y-2">
                  {growthPath.milestones.map((milestone, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-md flex items-center ${index < growthPath.completedMilestones ? 'bg-primary/10' : 'bg-muted'}`}
                    >
                      {index < growthPath.completedMilestones ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-muted-foreground flex items-center justify-center mr-3">
                          <span className="text-xs">{index + 1}</span>
                        </div>
                      )}
                      <span className={index < growthPath.completedMilestones ? 'text-primary-foreground' : ''}>
                        {milestone}
                      </span>
                    </div>
                  ))}
                </div>
                {growthPath.nextPersona && (
                  <div className="mt-4 text-sm">
                    <p>Complete these milestones to evolve to: <span className="font-semibold">{getPersonaName(growthPath.nextPersona)}</span></p>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                        <activity.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p>{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-4">Your Stats</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">{userData.trainingCompleted}</p>
                          <p className="text-sm text-muted-foreground">Trainings Completed</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-primary/70" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">{userData.promptBuilderUses}</p>
                          <p className="text-sm text-muted-foreground">Prompts Created</p>
                        </div>
                        <PenTool className="h-8 w-8 text-primary/70" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-3xl font-bold">{userData.workflowsCompleted}</p>
                          <p className="text-sm text-muted-foreground">Workflows Completed</p>
                        </div>
                        <Calendar className="h-8 w-8 text-primary/70" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {nextPossiblePersonas.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Potential Growth Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nextPossiblePersonas.map((nextPersona) => (
                <Card key={nextPersona} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3">
                    <ArrowUpRight className="h-5 w-5 text-primary/70" />
                  </div>
                  <CardHeader>
                    <CardTitle>{getPersonaName(nextPersona)}</CardTitle>
                    <CardDescription>
                      A potential evolution for your AI adoption journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm">
                      Complete your current milestones to unlock this growth path and evolve your AI adoption approach.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/all-personas">
                        <span>Learn More</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-base">Complete Core Training</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Finish the core modules for your persona to accelerate your growth.
                </p>
                <Button asChild size="sm">
                  <Link to="/training-hub">
                    Visit Training Hub
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <PenTool className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-base">Create Custom Prompts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Build prompts tailored to your specific legal tasks and needs.
                </p>
                <Button asChild size="sm">
                  <Link to="/prompt-builder">
                    Open Prompt Builder
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-base">Join Project Team</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Find projects that match your persona strengths and interests.
                </p>
                <Button asChild size="sm">
                  <Link to="/project-planner">
                    View Projects
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default PersonaJourney;


import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Check, Pencil, Users, UserCheck, Star, AlertCircle } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useState } from "react";
import { useUserPersona } from "@/hooks/useUserPersona";
import { getPersonaName, getPersonaProjectPreferences, PersonaRole, PersonaId } from "@/utils/personaUtils";

interface TeamMember {
  id: string;
  name: string;
  persona: PersonaId;
  role?: PersonaRole;
  tasks: string[];
}

const ProjectPlanner = () => {
  const { userPersona } = useUserPersona();
  const personaName = getPersonaName(userPersona);
  const projectPreferences = getPersonaProjectPreferences(userPersona);
  
  // Sample team data - in a real app this would come from an API
  const teamMembers: TeamMember[] = [
    { 
      id: "1", 
      name: "Alex Rivera", 
      persona: "evangelist",
      role: "AI Champion", 
      tasks: ["Team training", "Create adoption resources"]
    },
    { 
      id: "2", 
      name: "Jordan Smith", 
      persona: "veteran",
      role: "Legal Reviewer", 
      tasks: ["Review compliance", "Document risks"]
    },
    { 
      id: "3", 
      name: "Taylor Kim", 
      persona: "optimizer",
      role: "SOP Documentation", 
      tasks: ["Process documentation", "Create SOP templates"]
    },
    { 
      id: "4", 
      name: "Morgan Lee", 
      persona: "practitioner",
      role: "Prompt Testing", 
      tasks: ["Test new prompts", "Record feedback"]
    },
    { 
      id: "5", 
      name: "Casey Johnson", 
      persona: "strategic",
      role: "AI Champion", 
      tasks: ["Strategic planning", "Stakeholder comms"]
    },
    {
      id: "current-user",
      name: "You",
      persona: userPersona,
      role: projectPreferences.recommendedRoles[0],
      tasks: ["Your tasks will appear here"]
    }
  ];

  // This would come from an API in a real application
  const phases = [
    {
      id: "1",
      title: "Discovery & Assessment",
      description: "Assess current workflows and identify AI opportunities",
      current: true,
      progress: 75,
      timeline: "May 1 - May 15, 2025",
      recommendedPersonas: ["strategic", "pragmatic", "veteran"],
      tasks: [
        { id: "1-1", title: "Complete AI adoption assessment", completed: true, assignedTo: "5", recommendedPersonas: ["strategic", "pragmatic"] },
        { id: "1-2", title: "Identify key legal workflows for AI enhancement", completed: true, assignedTo: "3", recommendedPersonas: ["optimizer", "strategic"] },
        { id: "1-3", title: "Survey team on pain points and opportunities", completed: true, assignedTo: "1", recommendedPersonas: ["evangelist", "practitioner"] },
        { id: "1-4", title: "Create AI opportunity matrix", completed: false, assignedTo: "current-user", recommendedPersonas: ["strategic", "optimizer"] },
        { id: "1-5", title: "Present findings to leadership", completed: false, assignedTo: "1", recommendedPersonas: ["evangelist", "strategic"] }
      ]
    },
    {
      id: "2",
      title: "Planning & Preparation",
      description: "Set goals, choose tools, and prepare team for adoption",
      current: false,
      progress: 0,
      timeline: "May 16 - May 31, 2025",
      recommendedPersonas: ["strategic", "evangelist", "veteran"],
      tasks: [
        { id: "2-1", title: "Define success metrics for AI adoption", completed: false, assignedTo: "3", recommendedPersonas: ["optimizer", "strategic"] },
        { id: "2-2", title: "Select initial AI tools for pilot", completed: false, assignedTo: "5", recommendedPersonas: ["strategic", "pragmatic", "innovator"] },
        { id: "2-3", title: "Develop governance framework", completed: false, assignedTo: "2", recommendedPersonas: ["veteran", "cautious"] },
        { id: "2-4", title: "Identify AI champions and change agents", completed: false, assignedTo: "1", recommendedPersonas: ["evangelist", "strategic"] },
        { id: "2-5", title: "Create communication plan", completed: false, assignedTo: "1", recommendedPersonas: ["evangelist", "strategic"] }
      ]
    },
    {
      id: "3",
      title: "Implementation & Training",
      description: "Roll out tools and conduct training sessions",
      current: false,
      progress: 0,
      timeline: "June 1 - June 30, 2025",
      recommendedPersonas: ["evangelist", "optimizer", "practitioner"],
      tasks: [
        { id: "3-1", title: "Deploy AI tools to pilot group", completed: false, assignedTo: "5", recommendedPersonas: ["strategic", "pragmatic"] },
        { id: "3-2", title: "Conduct persona-based training sessions", completed: false, assignedTo: "1", recommendedPersonas: ["evangelist"] },
        { id: "3-3", title: "Create resource library of prompts and templates", completed: false, assignedTo: "4", recommendedPersonas: ["practitioner", "optimizer"] },
        { id: "3-4", title: "Set up help desk support for questions", completed: false, assignedTo: "3", recommendedPersonas: ["optimizer", "practitioner"] },
        { id: "3-5", title: "Weekly check-ins with user groups", completed: false, assignedTo: "1", recommendedPersonas: ["evangelist", "practitioner"] }
      ]
    },
    {
      id: "4",
      title: "Evaluation & Optimization",
      description: "Measure outcomes and refine approach based on feedback",
      current: false,
      progress: 0,
      timeline: "July 1 - July 15, 2025",
      recommendedPersonas: ["optimizer", "strategic", "veteran"],
      tasks: [
        { id: "4-1", title: "Collect usage data and metrics", completed: false, assignedTo: "3", recommendedPersonas: ["optimizer"] },
        { id: "4-2", title: "Conduct user feedback sessions", completed: false, assignedTo: "4", recommendedPersonas: ["practitioner", "evangelist"] },
        { id: "4-3", title: "Identify barriers to adoption", completed: false, assignedTo: "2", recommendedPersonas: ["veteran", "cautious"] },
        { id: "4-4", title: "Optimize workflows and prompts", completed: false, assignedTo: "3", recommendedPersonas: ["optimizer", "practitioner"] },
        { id: "4-5", title: "Prepare expansion recommendations", completed: false, assignedTo: "5", recommendedPersonas: ["strategic", "innovator"] }
      ]
    },
    {
      id: "5",
      title: "Expansion & Integration",
      description: "Scale to full organization and integrate into standard workflows",
      current: false,
      progress: 0,
      timeline: "July 16 - August 15, 2025",
      recommendedPersonas: ["strategic", "evangelist", "optimizer"],
      tasks: [
        { id: "5-1", title: "Roll out to full organization", completed: false, assignedTo: "5", recommendedPersonas: ["strategic", "evangelist"] },
        { id: "5-2", title: "Update standard operating procedures", completed: false, assignedTo: "3", recommendedPersonas: ["optimizer"] },
        { id: "5-3", title: "Integrate with existing technology stack", completed: false, assignedTo: "2", recommendedPersonas: ["veteran", "optimizer"] },
        { id: "5-4", title: "Conduct advanced training for power users", completed: false, assignedTo: "1", recommendedPersonas: ["evangelist", "innovator"] },
        { id: "5-5", title: "Document case studies and success stories", completed: false, assignedTo: "4", recommendedPersonas: ["practitioner", "strategic"] }
      ]
    }
  ];

  // Calculate overall project progress
  const completedTasks = phases.flatMap(phase => phase.tasks).filter(task => task.completed).length;
  const totalTasks = phases.flatMap(phase => phase.tasks).length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  // Calculate progress by persona group
  const tasksByPersona: Record<PersonaId, {total: number, completed: number}> = {
    strategic: { total: 0, completed: 0 },
    evangelist: { total: 0, completed: 0 },
    optimizer: { total: 0, completed: 0 },
    practitioner: { total: 0, completed: 0 },
    veteran: { total: 0, completed: 0 },
    cautious: { total: 0, completed: 0 },
    innovator: { total: 0, completed: 0 },
    pragmatic: { total: 0, completed: 0 },
    skeptical: { total: 0, completed: 0 },
    reluctant: { total: 0, completed: 0 },
    resister: { total: 0, completed: 0 }
  };
  
  // Count tasks for each persona
  phases.forEach(phase => {
    phase.tasks.forEach(task => {
      const member = teamMembers.find(m => m.id === task.assignedTo);
      if (member?.persona) {
        tasksByPersona[member.persona].total += 1;
        if (task.completed) {
          tasksByPersona[member.persona].completed += 1;
        }
      }
    });
  });

  // Current user tasks
  const userTasks = phases.flatMap(phase => 
    phase.tasks.filter(task => task.assignedTo === "current-user")
  );
  
  // Get tasks that match the user's persona
  const tasksMatchingPersona = phases.flatMap(phase =>
    phase.tasks.filter(task => 
      task.recommendedPersonas?.includes(userPersona) && !task.completed && !task.assignedTo
    )
  );
  
  return (
    <AppLayout title="Project Planner">
      <div className="grid gap-6">
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">AI Adoption Project Plan</h1>
              <p className="text-muted-foreground">Track rollout phases, tasks, and milestones</p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Select defaultValue="organization">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organization">Organization View</SelectItem>
                    <SelectItem value="department">Department View</SelectItem>
                    <SelectItem value="personal">My Tasks Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>
                <Pencil className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Completion</span>
                    <span>{overallProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {completedTasks} of {totalTasks} tasks completed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Phase</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {phases.find(phase => phase.current) ? (
                  <div>
                    <h3 className="font-medium">{phases.find(phase => phase.current)?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{phases.find(phase => phase.current)?.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{phases.find(phase => phase.current)?.timeline}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No active phase</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">My Persona Role</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {projectPreferences.recommendedRoles[0]}
                    </Badge>
                    <Badge variant="outline">{personaName}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on your AI adoption persona, you're best suited for this project role.
                  </p>
                  <div>
                    <h4 className="text-sm font-medium mt-3 mb-1">Your Strengths:</h4>
                    <ul className="text-sm text-muted-foreground list-disc list-inside pl-1 space-y-1">
                      {projectPreferences.strengths.slice(0, 2).map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="text-xs mt-2 w-full">
                        View Role Guide
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">{projectPreferences.recommendedRoles[0]} Role</h4>
                        <p className="text-sm">This role leverages your {personaName} persona's strengths and preferences.</p>
                        
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium">Key Strengths:</h5>
                          <ul className="text-sm list-disc list-inside pl-1">
                            {projectPreferences.strengths.map((strength, i) => (
                              <li key={i}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium">Growth Areas:</h5>
                          <ul className="text-sm list-disc list-inside pl-1">
                            {projectPreferences.challenges.map((challenge, i) => (
                              <li key={i}>{challenge}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-1">
                          <h5 className="text-sm font-medium">Best Team Fit:</h5>
                          <div className="flex flex-wrap gap-1">
                            {projectPreferences.teamFit.map((persona) => (
                              <Badge key={persona} variant="outline">
                                {getPersonaName(persona)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Team Adoption Progress</h2>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent/20">
              View Team Heatmap
            </Badge>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {Object.entries(tasksByPersona)
                  .filter(([_, counts]) => counts.total > 0)
                  .map(([persona, counts]) => (
                    <div key={persona} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center">
                          <span className="font-medium">{getPersonaName(persona as PersonaId)}</span>
                          <span className="text-muted-foreground ml-2">
                            ({counts.completed}/{counts.total})
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          {counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0}%
                        </span>
                      </div>
                      <Progress 
                        value={counts.total > 0 ? (counts.completed / counts.total) * 100 : 0} 
                        className="h-2" 
                      />
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Tabs defaultValue="phases">
            <TabsList>
              <TabsTrigger value="phases">Rollout Phases</TabsTrigger>
              <TabsTrigger value="tasks">My Tasks</TabsTrigger>
              <TabsTrigger value="recommended">Recommended for Me</TabsTrigger>
              <TabsTrigger value="team">Team View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="phases" className="mt-4">
              <div className="space-y-6">
                {phases.map((phase, index) => (
                  <Card 
                    key={phase.id}
                    className={`${phase.current ? 'border-primary' : ''} card-gradient`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">
                              Phase {index + 1}: {phase.title}
                            </CardTitle>
                            {phase.current && (
                              <Badge>Current Phase</Badge>
                            )}
                            {phase.recommendedPersonas?.includes(userPersona) && (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                Good Fit for {personaName}
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-1">
                            {phase.description}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{phase.timeline}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {phase.tasks.filter(task => task.completed).length} of {phase.tasks.length} tasks complete
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Phase Progress</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        {phase.tasks.map(task => {
                          // Get assigned team member
                          const assignee = teamMembers.find(m => m.id === task.assignedTo);
                          const isPersonaMatch = task.recommendedPersonas?.includes(userPersona);
                          
                          return (
                            <div 
                              key={task.id} 
                              className={`flex items-center justify-between p-3 rounded-md ${task.completed ? 'bg-muted/30' : isPersonaMatch ? 'bg-primary/5' : 'bg-card/60'}`}
                            >
                              <div className="flex items-center">
                                <div className={`h-5 w-5 rounded-full border ${
                                  task.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                                } flex items-center justify-center mr-3`}>
                                  {task.completed && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                                  {task.title}
                                </span>
                                {isPersonaMatch && !task.completed && (
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 ml-2">
                                    Persona Match
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center">
                                {assignee && (
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      {assignee.name === "You" ? "You" : assignee.name}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex justify-between w-full">
                        <Button variant="outline">View Details</Button>
                        {phase.current && <Button>Update Progress</Button>}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tasks" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Assigned Tasks</CardTitle>
                  <CardDescription>
                    Tasks aligned with your {personaName} persona across project phases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userTasks.length > 0 ? (
                    <div className="space-y-4">
                      {userTasks.map((task) => {
                        // Find which phase this task belongs to
                        const phase = phases.find(p => p.tasks.some(t => t.id === task.id));
                        
                        return (
                          <div key={task.id} className="border p-4 rounded-md">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{task.title}</h3>
                              <Badge variant="outline">Phase {phase ? phases.indexOf(phase) + 1 : "?"}</Badge>
                            </div>
                            {task.recommendedPersonas?.includes(userPersona) && (
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-3">
                                Perfect for your persona
                              </Badge>
                            )}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <div className={`h-5 w-5 rounded-full ${task.completed ? 
                                  'bg-primary border-primary flex items-center justify-center' : 
                                  'border border-muted-foreground'} mr-2`}>
                                  {task.completed && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className="text-sm">{task.completed ? "Completed" : "In progress"}</span>
                              </div>
                              <span className="text-sm">{phase?.timeline}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">You don't have any assigned tasks yet</p>
                      <Button variant="outline" className="mt-4">Find Tasks</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommended" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tasks Recommended for {personaName}</CardTitle>
                  <CardDescription>
                    These tasks match your persona strengths and skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {tasksMatchingPersona.length > 0 ? (
                    <div className="space-y-4">
                      {tasksMatchingPersona.map((task) => {
                        // Find which phase this task belongs to
                        const phase = phases.find(p => p.tasks.some(t => t.id === task.id));
                        
                        return (
                          <div key={task.id} className="border p-4 rounded-md border-primary/20">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{task.title}</h3>
                              <Badge variant="outline">Phase {phase ? phases.indexOf(phase) + 1 : "?"}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              This task aligns with your {personaName} strengths
                            </p>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-3">
                              {projectPreferences.recommendedRoles.includes(task.recommendedPersonas?.[0] as PersonaRole) ? 
                                "Perfect match for your role" : 
                                "Good match for your persona"}
                            </Badge>
                            <div className="flex justify-between items-center mt-4">
                              <Button size="sm">Assign to Me</Button>
                              <span className="text-sm text-muted-foreground">{phase?.timeline}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Star className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No recommended tasks available right now</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Composition</CardTitle>
                  <CardDescription>
                    View the team's persona balance and assigned roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    <h3 className="text-sm font-medium">Persona Balance</h3>
                    <div className="h-10 bg-muted rounded-lg flex overflow-hidden">
                      {Object.entries(tasksByPersona)
                        .filter(([_, counts]) => counts.total > 0)
                        .map(([persona, counts], index) => (
                          <div 
                            key={persona}
                            className={`h-full flex items-center justify-center text-xs font-medium text-white ${
                              persona === 'evangelist' ? 'bg-blue-500' :
                              persona === 'innovator' ? 'bg-indigo-500' :
                              persona === 'strategic' ? 'bg-purple-500' :
                              persona === 'optimizer' ? 'bg-green-500' :
                              persona === 'pragmatic' ? 'bg-teal-500' :
                              persona === 'practitioner' ? 'bg-cyan-500' :
                              persona === 'veteran' ? 'bg-amber-500' :
                              persona === 'cautious' ? 'bg-orange-500' :
                              'bg-gray-500'
                            }`}
                            style={{ 
                              width: `${(counts.total / totalTasks) * 100}%`,
                              minWidth: counts.total > 0 ? '20px' : '0'
                            }}
                          >
                            {counts.total > 2 && persona.substring(0, 3)}
                          </div>
                        ))
                      }
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(tasksByPersona)
                        .filter(([_, counts]) => counts.total > 0)
                        .map(([persona, counts]) => (
                          <div key={persona} className="flex items-center text-xs">
                            <div 
                              className={`h-3 w-3 rounded-full mr-1 ${
                                persona === 'evangelist' ? 'bg-blue-500' :
                                persona === 'innovator' ? 'bg-indigo-500' :
                                persona === 'strategic' ? 'bg-purple-500' :
                                persona === 'optimizer' ? 'bg-green-500' :
                                persona === 'pragmatic' ? 'bg-teal-500' :
                                persona === 'practitioner' ? 'bg-cyan-500' :
                                persona === 'veteran' ? 'bg-amber-500' :
                                persona === 'cautious' ? 'bg-orange-500' :
                                'bg-gray-500'
                              }`}
                            />
                            <span>{getPersonaName(persona as PersonaId)}</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Team Members</h3>
                    {teamMembers.map(member => (
                      <div key={member.id} className="flex justify-between items-center p-3 border rounded-md">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                            <Users className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {member.id === "current-user" ? "You" : member.name}
                              {member.id === "current-user" && (
                                <span className="ml-2 text-xs text-muted-foreground">(That's you!)</span>
                              )}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {getPersonaName(member.persona)}
                              </Badge>
                              {member.role && (
                                <Badge variant="secondary" className="text-xs">
                                  {member.role}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{member.tasks.length} tasks</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Suggested Team Improvements</h3>
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-muted/30 rounded-md">
                        <p>
                          <span className="font-medium">Balance recommendation:</span> Your team could benefit from 
                          adding more members with {Object.entries(tasksByPersona).filter(([_, counts]) => counts.total === 0).length > 0 ? 
                            `${getPersonaName((Object.entries(tasksByPersona).filter(([_, counts]) => counts.total === 0)[0][0]) as PersonaId)} or ${getPersonaName((Object.entries(tasksByPersona).filter(([_, counts]) => counts.total === 0)[1][0]) as PersonaId)} personas` : 
                            "diverse personas"}
                        </p>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-md border-primary/10 border">
                        <p>
                          <span className="font-medium">Persona synergy:</span> Your {personaName} persona works 
                          particularly well with {projectPreferences.teamFit.map(persona => getPersonaName(persona)).join(" and ")} team members.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Invite Team Member</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </AppLayout>
  );
};

export default ProjectPlanner;

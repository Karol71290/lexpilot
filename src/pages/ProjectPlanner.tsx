
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Check, Pencil } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectPlanner = () => {
  // This would come from an API in a real application
  const phases = [
    {
      id: "1",
      title: "Discovery & Assessment",
      description: "Assess current workflows and identify AI opportunities",
      current: true,
      progress: 75,
      timeline: "May 1 - May 15, 2025",
      tasks: [
        { id: "1-1", title: "Complete AI adoption assessment", completed: true },
        { id: "1-2", title: "Identify key legal workflows for AI enhancement", completed: true },
        { id: "1-3", title: "Survey team on pain points and opportunities", completed: true },
        { id: "1-4", title: "Create AI opportunity matrix", completed: false },
        { id: "1-5", title: "Present findings to leadership", completed: false }
      ]
    },
    {
      id: "2",
      title: "Planning & Preparation",
      description: "Set goals, choose tools, and prepare team for adoption",
      current: false,
      progress: 0,
      timeline: "May 16 - May 31, 2025",
      tasks: [
        { id: "2-1", title: "Define success metrics for AI adoption", completed: false },
        { id: "2-2", title: "Select initial AI tools for pilot", completed: false },
        { id: "2-3", title: "Develop governance framework", completed: false },
        { id: "2-4", title: "Identify AI champions and change agents", completed: false },
        { id: "2-5", title: "Create communication plan", completed: false }
      ]
    },
    {
      id: "3",
      title: "Implementation & Training",
      description: "Roll out tools and conduct training sessions",
      current: false,
      progress: 0,
      timeline: "June 1 - June 30, 2025",
      tasks: [
        { id: "3-1", title: "Deploy AI tools to pilot group", completed: false },
        { id: "3-2", title: "Conduct persona-based training sessions", completed: false },
        { id: "3-3", title: "Create resource library of prompts and templates", completed: false },
        { id: "3-4", title: "Set up help desk support for questions", completed: false },
        { id: "3-5", title: "Weekly check-ins with user groups", completed: false }
      ]
    },
    {
      id: "4",
      title: "Evaluation & Optimization",
      description: "Measure outcomes and refine approach based on feedback",
      current: false,
      progress: 0,
      timeline: "July 1 - July 15, 2025",
      tasks: [
        { id: "4-1", title: "Collect usage data and metrics", completed: false },
        { id: "4-2", title: "Conduct user feedback sessions", completed: false },
        { id: "4-3", title: "Identify barriers to adoption", completed: false },
        { id: "4-4", title: "Optimize workflows and prompts", completed: false },
        { id: "4-5", title: "Prepare expansion recommendations", completed: false }
      ]
    },
    {
      id: "5",
      title: "Expansion & Integration",
      description: "Scale to full organization and integrate into standard workflows",
      current: false,
      progress: 0,
      timeline: "July 16 - August 15, 2025",
      tasks: [
        { id: "5-1", title: "Roll out to full organization", completed: false },
        { id: "5-2", title: "Update standard operating procedures", completed: false },
        { id: "5-3", title: "Integrate with existing technology stack", completed: false },
        { id: "5-4", title: "Conduct advanced training for power users", completed: false },
        { id: "5-5", title: "Document case studies and success stories", completed: false }
      ]
    }
  ];

  // Calculate overall project progress
  const completedTasks = phases.flatMap(phase => phase.tasks).filter(task => task.completed).length;
  const totalTasks = phases.flatMap(phase => phase.tasks).length;
  const overallProgress = (completedTasks / totalTasks) * 100;

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
                <CardTitle className="text-lg">My Role</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Badge>Change Champion</Badge>
                  <p className="text-sm text-muted-foreground">
                    You are responsible for promoting AI adoption and supporting colleagues in your department.
                  </p>
                  <div className="pt-1">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Role Guide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Tabs defaultValue="phases">
            <TabsList>
              <TabsTrigger value="phases">Rollout Phases</TabsTrigger>
              <TabsTrigger value="tasks">My Tasks</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
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
                        {phase.tasks.map(task => (
                          <div 
                            key={task.id} 
                            className={`flex items-center p-3 rounded-md ${task.completed ? 'bg-muted/30' : 'bg-card/60'}`}
                          >
                            <div className={`h-5 w-5 rounded-full border ${
                              task.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                            } flex items-center justify-center mr-3`}>
                              {task.completed && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                              {task.title}
                            </span>
                          </div>
                        ))}
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
                    Tasks assigned to you across all project phases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* This would be populated with user-specific tasks in a real app */}
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Complete AI adoption assessment</h3>
                        <Badge variant="outline">Phase 1</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Take the AI adoption persona quiz and review your personal recommendations
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-full bg-primary border-primary flex items-center justify-center mr-2">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm text-muted-foreground">Completed</span>
                        </div>
                        <span className="text-sm">Due: May 10, 2025</span>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Create AI opportunity matrix</h3>
                        <Badge variant="outline">Phase 1</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Identify and prioritize opportunities for AI implementation in your department
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-full border border-muted-foreground mr-2"></div>
                          <span className="text-sm">In progress</span>
                        </div>
                        <span className="text-sm">Due: May 12, 2025</span>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">Identify AI champions and change agents</h3>
                        <Badge variant="outline">Phase 2</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Recruit at least 3 colleagues to serve as AI champions in your department
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="h-5 w-5 rounded-full border border-muted-foreground mr-2"></div>
                          <span className="text-sm">Not started</span>
                        </div>
                        <span className="text-sm">Due: May 20, 2025</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Tasks</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="milestones" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                  <CardDescription>
                    Key milestones and decision points in the AI adoption process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-8 border-l-2 border-muted space-y-8 py-2">
                    {/* Milestone 1 - Completed */}
                    <div className="relative">
                      <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">Project Kickoff</h3>
                          <Badge variant="outline" className="text-xs">Completed</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">May 1, 2025</p>
                        <p className="text-sm">Initial team meeting to introduce the AI adoption initiative and project plan</p>
                      </div>
                    </div>
                    
                    {/* Milestone 2 - Upcoming */}
                    <div className="relative">
                      <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-accent/20 border border-accent flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-accent"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">Assessment Review</h3>
                          <Badge variant="outline" className="text-xs">Upcoming</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">May 15, 2025</p>
                        <p className="text-sm">Review of assessments and presentation of findings to leadership team</p>
                      </div>
                    </div>
                    
                    {/* Milestone 3 */}
                    <div className="relative">
                      <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">Tool Selection</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">May 25, 2025</p>
                        <p className="text-sm">Final selection of AI tools and platforms for implementation</p>
                      </div>
                    </div>
                    
                    {/* Milestone 4 */}
                    <div className="relative">
                      <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">Pilot Launch</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">June 1, 2025</p>
                        <p className="text-sm">Initial deployment to pilot group of 15 legal professionals</p>
                      </div>
                    </div>
                    
                    {/* Milestone 5 */}
                    <div className="relative">
                      <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">Mid-Project Review</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">July 1, 2025</p>
                        <p className="text-sm">Comprehensive review of pilot results and adjustment of strategy</p>
                      </div>
                    </div>
                    
                    {/* Milestone 6 */}
                    <div className="relative">
                      <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">Full Implementation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">July 15, 2025</p>
                        <p className="text-sm">Roll out to all departments and teams</p>
                      </div>
                    </div>
                    
                    {/* Milestone 7 */}
                    <div className="relative">
                      <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground"></span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">Project Completion</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">August 15, 2025</p>
                        <p className="text-sm">Final review, documentation of outcomes, and transition to ongoing operations</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </AppLayout>
  );
};

export default ProjectPlanner;

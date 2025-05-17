
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FeedbackTracker = () => {
  const { toast } = useToast();
  const [confidenceRating, setConfidenceRating] = useState<string>("");
  const [usageRating, setUsageRating] = useState<string>("");
  const [feedbackText, setFeedbackText] = useState<string>("");
  
  // Sample data - would come from API in real application
  const confidenceData = [
    { week: "Week 1", rating: 3, average: 3.2 },
    { week: "Week 2", rating: 4, average: 3.5 },
    { week: "Week 3", rating: 4, average: 3.7 },
    { week: "Week 4", rating: 5, average: 4.1 },
    { week: "Week 5", rating: 6, average: 4.4 },
    { week: "Week 6", rating: 7, average: 4.8 }
  ];

  const usageData = [
    { week: "Week 1", tasks: 5, minutes: 45 },
    { week: "Week 2", tasks: 8, minutes: 65 },
    { week: "Week 3", tasks: 12, minutes: 90 },
    { week: "Week 4", tasks: 15, minutes: 115 },
    { week: "Week 5", tasks: 20, minutes: 150 },
    { week: "Week 6", tasks: 22, minutes: 180 }
  ];

  const feedbackHistory = [
    {
      week: "Week 6",
      date: "May 10, 2025",
      confidence: 7,
      usage: "Daily",
      feedback: "I've started using AI for document review and it's saving me several hours each week. The prompt library has been especially helpful."
    },
    {
      week: "Week 5",
      date: "May 3, 2025",
      confidence: 6,
      usage: "Several times per week",
      feedback: "Getting more comfortable with prompt engineering. Had some challenges with complex research queries but the training modules helped."
    },
    {
      week: "Week 4",
      date: "April 26, 2025",
      confidence: 5,
      usage: "Weekly",
      feedback: "Starting to see the benefits for routine tasks. Still hesitant to use for client-facing work."
    }
  ];

  const handleSubmitFeedback = () => {
    if (!confidenceRating || !usageRating) {
      toast({
        title: "Missing information",
        description: "Please provide both confidence and usage ratings.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your weekly feedback!"
    });

    // Reset form
    setConfidenceRating("");
    setUsageRating("");
    setFeedbackText("");
  };

  return (
    <AppLayout title="Feedback Tracker">
      <div className="grid gap-6">
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Feedback Tracker</h1>
              <p className="text-muted-foreground">Track your progress and provide weekly feedback on AI adoption</p>
            </div>
            <div>
              <Select defaultValue="personal">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal View</SelectItem>
                  <SelectItem value="team">Team View (Admins)</SelectItem>
                  <SelectItem value="organization">Organization View (Admins)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-primary"></span>
                Current Confidence Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-4">
                <div className="text-5xl font-bold mb-2">7</div>
                <Progress value={70} className="w-full h-2" />
                <p className="text-xs text-muted-foreground mt-2">7 out of 10</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Weekly Check-in Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-lawadapt-purple" />
                  <span className="font-medium">Week of May 17, 2025</span>
                </div>
                <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                  Feedback Due
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Submit by May 19, 2025
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Usage Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center py-2">
                <div className="text-lg font-medium mb-1">Daily Usage</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">22</span>
                  <span className="text-sm text-muted-foreground">tasks / week</span>
                </div>
                <div className="text-xs text-emerald-500 flex items-center mt-1">
                  <span className="inline-block h-0 w-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-emerald-500 mr-1"></span>
                  10% increase from last week
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <Tabs defaultValue="progress">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
            <TabsTrigger value="history">Feedback History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Confidence Tracking</CardTitle>
                  <CardDescription>
                    How your confidence with AI tools has changed over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={confidenceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#9b87f5"
                        name="Your Confidence"
                        strokeWidth={3}
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke="#8E9196"
                        name="Team Average"
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Scale: 1 (Not confident) to 10 (Very confident)
                  </p>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>AI Usage Metrics</CardTitle>
                  <CardDescription>
                    How your AI tool usage has evolved
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={usageData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="tasks"
                        stroke="#7E69AB"
                        name="Tasks Completed"
                        strokeWidth={3}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="minutes"
                        stroke="#0EA5E9"
                        name="Minutes Saved"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Data based on self-reported usage and system tracking
                  </p>
                </CardFooter>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Adoption Roadmap Progress</CardTitle>
                  <CardDescription>
                    Your position on the AI adoption journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pt-6">
                    <div className="h-2 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-lawadapt-purple w-[65%]"></div>
                    </div>
                    
                    <div className="absolute top-0 left-[12%] -translate-x-1/2 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-lawadapt-purple border-2 border-white"></div>
                      <span className="text-xs font-medium mt-1">Onboarding</span>
                    </div>
                    
                    <div className="absolute top-0 left-[38%] -translate-x-1/2 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-lawadapt-purple border-2 border-white"></div>
                      <span className="text-xs font-medium mt-1">Basic Use</span>
                    </div>
                    
                    <div className="absolute top-0 left-[65%] -translate-x-1/2 flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-white border-4 border-lawadapt-purple flex items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-lawadapt-purple"></span>
                      </div>
                      <span className="text-xs font-medium mt-1">You are here</span>
                    </div>
                    
                    <div className="absolute top-0 left-[88%] -translate-x-1/2 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-muted border-2 border-white"></div>
                      <span className="text-xs font-medium mt-1">Advanced</span>
                    </div>
                  </div>
                  
                  <div className="mt-12 space-y-4">
                    <h3 className="text-lg font-medium">Your Current Stage: Intermediate Adoption</h3>
                    <p>
                      You're building confidence and regularly using AI for specific tasks. You're starting to see significant time savings and quality improvements in your work.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium">Recommendations to advance your journey:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Complete the "Advanced Prompt Engineering" training module</li>
                        <li>Try using AI for at least one new type of task each week</li>
                        <li>Share a successful use case with your team</li>
                        <li>Document and refine your most effective prompts</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Detailed Recommendations</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="submit" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Submit Weekly Feedback</CardTitle>
                <CardDescription>
                  Let us know how you're feeling about using AI tools this week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>How confident do you feel using AI tools this week? (1-10)</Label>
                  <RadioGroup 
                    value={confidenceRating} 
                    onValueChange={setConfidenceRating} 
                    className="flex flex-wrap gap-2"
                  >
                    {Array.from({length: 10}, (_, i) => i + 1).map(num => (
                      <div key={num} className="flex items-center space-x-2">
                        <RadioGroupItem value={num.toString()} id={`confidence-${num}`} />
                        <Label htmlFor={`confidence-${num}`}>{num}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label>How frequently did you use AI tools this week?</Label>
                  <RadioGroup 
                    value={usageRating} 
                    onValueChange={setUsageRating}
                    className="space-y-3"
                  >
                    {[
                      { value: "daily", label: "Daily (multiple times per day)" },
                      { value: "several", label: "Several times per week" },
                      { value: "once", label: "Once or twice" },
                      { value: "none", label: "Not at all" }
                    ].map(option => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`usage-${option.value}`} />
                        <Label htmlFor={`usage-${option.value}`}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="feedback">What's going well or what challenges are you experiencing?</Label>
                  <Textarea 
                    id="feedback" 
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Share your thoughts on your AI adoption journey this week..."
                    className="min-h-[150px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmitFeedback}>
                  Submit Weekly Feedback
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {feedbackHistory.map((entry, index) => (
                <Card key={index} className="card-gradient">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{entry.week}</CardTitle>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <div>
                        <span className="text-sm font-medium">Confidence:</span>{" "}
                        <span className="text-sm">{entry.confidence}/10</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Usage:</span>{" "}
                        <span className="text-sm">{entry.usage}</span>
                      </div>
                    </div>
                    <div className="flex">
                      <MessageSquare className="h-4 w-4 mr-2 mt-1 text-muted-foreground shrink-0" />
                      <p className="text-sm">{entry.feedback}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center">
                <Button variant="outline">Load More History</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default FeedbackTracker;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Define question types and options
interface Question {
  id: string;
  title: string;
  description: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const questions: Question[] = [
  {
    id: "legalFunction",
    title: "What is your team's main legal function?",
    description: "Select the primary focus area of your legal team",
    options: [
      { value: "corporate", label: "Corporate law" },
      { value: "ip", label: "Intellectual property" },
      { value: "litigation", label: "Litigation" },
      { value: "regulatory", label: "Regulatory" },
      { value: "mixed", label: "Mixed practice" },
    ],
  },
  {
    id: "workflows",
    title: "What legal workflows are you most interested in enhancing with AI?",
    description: "Choose the primary workflow you'd like to improve",
    options: [
      { value: "contractReview", label: "Contract review" },
      { value: "legalResearch", label: "Legal research" },
      { value: "clauseDrafting", label: "Clause drafting" },
      { value: "riskAnalysis", label: "Risk analysis" },
      { value: "knowledgeManagement", label: "Internal knowledge management" },
    ],
  },
  {
    id: "users",
    title: "Who will primarily use this platform in your organization?",
    description: "Select the main user group for this platform",
    options: [
      { value: "legalOps", label: "Legal operations" },
      { value: "juniorLawyers", label: "Junior lawyers" },
      { value: "entireTeam", label: "Entire legal team" },
      { value: "innovationLead", label: "Innovation lead" },
      { value: "pilotGroup", label: "A small pilot group" },
    ],
  },
  {
    id: "experience",
    title: "How experienced is your team with generative AI tools like ChatGPT?",
    description: "Evaluate your team's current familiarity with AI",
    options: [
      { value: "newToGenAI", label: "New to GenAI" },
      { value: "triedFew", label: "Tried a few tools" },
      { value: "integrating", label: "Already integrating into workflows" },
    ],
  },
];

export default function Welcome() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleOptionSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeSetup();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getMappedValue = (id: string, value: string) => {
    const question = questions.find((q) => q.id === id);
    if (!question) return value;
    const option = question.options.find((opt) => opt.value === value);
    return option?.label || value;
  };

  const completeSetup = () => {
    setIsComplete(true);
    
    // Mark onboarding as complete in localStorage
    localStorage.setItem("hasCompletedWelcome", "true");
    // Dispatch storage event for other tabs/components
    window.dispatchEvent(new Event("storage"));
    
    // Automatically redirect after showing the completion message
    setTimeout(() => {
      navigate("/");
      
      toast({
        title: "Setup Complete",
        description: "Your LawAdapt Pro workspace has been personalized.",
      });
    }, 3000);
  };

  if (isComplete) {
    const legalArea = getMappedValue("legalFunction", answers.legalFunction || "");
    const workflow = getMappedValue("workflows", answers.workflows || "");
    const userType = getMappedValue("users", answers.users || "");

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl">Setup Complete!</CardTitle>
            <CardDescription className="text-lg">
              Thanks! We've personalized your AI adoption workspace for a {legalArea} team focused on improving {workflow} across {userType}.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Step {currentStep + 1} of {questions.length}</p>
            <div className="flex gap-1">
              {questions.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 w-12 rounded-full ${
                    index <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
          <CardTitle>{currentQuestion.title}</CardTitle>
          <CardDescription>{currentQuestion.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={answers[currentQuestion.id] || ""} 
            onValueChange={handleOptionSelect}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 border rounded-md p-4 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={!answers[currentQuestion.id]}
            className="flex items-center"
          >
            {currentStep === questions.length - 1 ? "Complete Setup" : "Next"} 
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

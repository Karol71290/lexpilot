
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const questions = [
    {
      id: 1,
      question: "How comfortable are you with using new technology?",
      options: [
        { value: "a", label: "Very comfortable, I'm usually an early adopter" },
        { value: "b", label: "Moderately comfortable, I'll try new tech if others recommend it" },
        { value: "c", label: "Somewhat uncomfortable, I prefer familiar tools" },
        { value: "d", label: "Very uncomfortable, I avoid new technology when possible" }
      ]
    },
    {
      id: 2,
      question: "How do you typically approach learning new software?",
      options: [
        { value: "a", label: "I dive in and figure it out through exploration" },
        { value: "b", label: "I watch tutorials or read documentation first" },
        { value: "c", label: "I prefer guided training sessions" },
        { value: "d", label: "I ask colleagues for help and guidance" }
      ]
    },
    {
      id: 3,
      question: "What is your biggest concern about using AI in your legal work?",
      options: [
        { value: "a", label: "Accuracy and reliability of AI outputs" },
        { value: "b", label: "Client confidentiality and data security" },
        { value: "c", label: "Learning curve and time investment" },
        { value: "d", label: "Replacing the human element in legal practice" }
      ]
    },
    // 3 more sample questions
    {
      id: 4,
      question: "How much time can you dedicate to learning AI tools per week?",
      options: [
        { value: "a", label: "More than 5 hours" },
        { value: "b", label: "2-5 hours" },
        { value: "c", label: "1-2 hours" },
        { value: "d", label: "Less than 1 hour" }
      ]
    },
    {
      id: 5,
      question: "Which best describes your role in your organization?",
      options: [
        { value: "a", label: "Leadership (Partner, Director, etc.)" },
        { value: "b", label: "Senior Associate/Manager" },
        { value: "c", label: "Associate/Staff" },
        { value: "d", label: "Support/Operations" }
      ]
    },
    {
      id: 6,
      question: "What would motivate you most to adopt AI tools?",
      options: [
        { value: "a", label: "Efficiency and time savings" },
        { value: "b", label: "Better client service" },
        { value: "c", label: "Keeping up with industry trends" },
        { value: "d", label: "Firm/management requirements" }
      ]
    }
  ];

  const totalQuestions = questions.length;
  const progress = (currentStep / (totalQuestions + 1)) * 100;

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentStep]: value });
  };

  const handleNextQuestion = () => {
    if (!selectedAnswers[currentStep]) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before continuing.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(totalQuestions + 1); // Show results
    }
  };

  const handlePreviousQuestion = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = () => {
    const question = questions.find(q => q.id === currentStep);
    if (!question) return null;

    return (
      <>
        <CardHeader>
          <CardTitle className="text-xl">Question {currentStep}</CardTitle>
          <CardDescription className="text-lg font-medium mt-2">{question.question}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedAnswers[currentStep] || ""} 
            onValueChange={handleAnswerSelect}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-accent/10 cursor-pointer">
                <RadioGroupItem value={option.value} id={`q${currentStep}-${option.value}`} />
                <Label htmlFor={`q${currentStep}-${option.value}`} className="flex-1 cursor-pointer">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </>
    );
  };

  const renderResults = () => {
    return (
      <>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Thank you for completing the AI Adoption Persona Quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="py-8">
            <p className="mb-6">Your responses have been recorded.</p>
            <p className="text-lg font-medium text-lawadapt-purple">
              We'll analyze your answers and determine your AI adoption persona.
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link to="/my-persona">View My Persona</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  return (
    <AppLayout title="AI Adoption Quiz">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Adoption Persona Quiz</h1>
        <p className="text-muted-foreground mb-6">
          This quiz will help identify your AI adoption persona and provide personalized recommendations.
        </p>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentStep > totalQuestions ? totalQuestions : currentStep} of {totalQuestions}</span>
            <span>{progress.toFixed(0)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="card-gradient">
          {currentStep <= totalQuestions ? renderQuestion() : renderResults()}
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentStep === 1 || currentStep > totalQuestions}
            >
              Back
            </Button>
            
            {currentStep <= totalQuestions && (
              <Button onClick={handleNextQuestion}>
                {currentStep === totalQuestions ? "Complete Quiz" : "Next Question"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Quiz;

// For the Link component
import { Link } from "react-router-dom";


import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2, Download, Info } from "lucide-react";
import { useOpenAiApi } from "@/hooks/useOpenAiApi";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

// Regulatory frameworks data
const regulatoryFrameworks = {
  "EU": {
    name: "EU AI Act",
    status: "active",
    description: "Comprehensive regulatory framework for AI systems in the European Union"
  },
  "US": {
    name: "US Executive Order on AI",
    status: "active",
    description: "Executive guidelines on AI development and deployment in the United States"
  },
  "UK": {
    name: "UK AI Regulation Approach",
    status: "active",
    description: "UK's regulatory principles for artificial intelligence"
  },
  "LATAM": {
    name: "Regional Best Practices",
    status: "best-practice",
    description: "Compiled best practices from various Latin American jurisdictions"
  },
  "APAC": {
    name: "Regional Guidelines",
    status: "varied",
    description: "Mix of regulations from different Asia-Pacific countries"
  },
  "Global": {
    name: "OECD AI Principles",
    status: "best-practice",
    description: "International standards for ethical AI development"
  }
};

// Industry-specific considerations
const industries = [
  { value: "law-firm", label: "Law Firm" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Financial Services" },
  { value: "government", label: "Government" },
  { value: "education", label: "Education" },
  { value: "technology", label: "Technology" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "media", label: "Media & Entertainment" }
];

export default function AIUsePolicyGenerator() {
  const [policyText, setPolicyText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("generate");
  
  // New state variables for jurisdiction and industry
  const [jurisdiction, setJurisdiction] = useState<string>("Global");
  const [industry, setIndustry] = useState<string>("law-firm");
  const [orgType, setOrgType] = useState<string>("law-firm");
  const [strictness, setStrictness] = useState<string>("balanced");
  const [specialRequirements, setSpecialRequirements] = useState<string>("");
  
  // Get OpenAI API integration
  const { generateWithOpenAI, isLoading, error } = useOpenAiApi();
  
  // Function to get regulatory framework information
  const getFrameworkInfo = (jurisdictionKey: string) => {
    return regulatoryFrameworks[jurisdictionKey as keyof typeof regulatoryFrameworks] || 
      regulatoryFrameworks["Global"];
  };
  
  const handleGeneratePolicy = async () => {
    setIsGenerating(true);
    
    try {
      const framework = getFrameworkInfo(jurisdiction);
      const frameworkType = framework.status === "active" ? 
        "regulatory framework" : "best practices";
      
      const promptContent = `
        Generate a comprehensive AI use policy for a ${industry} organization operating in the ${jurisdiction} jurisdiction.
        
        Organization type: ${orgType}
        Policy strictness level: ${strictness}
        Jurisdiction: ${jurisdiction}
        Industry: ${industry}
        Regulatory framework: ${framework.name} (${frameworkType})
        
        Special requirements: ${specialRequirements}
        
        The policy should:
        1. Comply with ${framework.name} requirements and standards
        2. Include specific provisions relevant to the ${industry} sector
        3. Match the requested ${strictness} strictness level
        4. Address the special requirements mentioned above (if any)
        5. Be structured with clear sections including Purpose, Scope, Guidelines, etc.
        6. Include appropriate disclaimers stating this is a suggested starting point, not formal legal advice
        7. Clearly indicate whether it's based on an active regulatory framework or best practices
        8. Format the response in markdown
      `;
      
      // Call OpenAI API
      const generatedPolicy = await generateWithOpenAI(promptContent, {
        temperature: 0.7,
        maxTokens: 1200
      });
      
      if (generatedPolicy) {
        setPolicyText(generatedPolicy);
        setSelectedTab("view");
      } else {
        console.error("Failed to generate policy");
        // Handle error case
      }
    } catch (err) {
      console.error("Error generating policy:", err);
      // Handle error case
    } finally {
      setIsGenerating(false);
    }
  };

  // Prepare framework disclaimer text
  const getFrameworkDisclaimer = () => {
    const framework = getFrameworkInfo(jurisdiction);
    if (framework.status === "active") {
      return `Based on ${framework.name} regulatory framework`;
    } else if (framework.status === "varied") {
      return `Based on mixed regulatory approaches in ${jurisdiction}`;
    } else {
      return `Based on industry best practices (no binding regulation in ${jurisdiction})`;
    }
  };
  
  const handleDownloadPolicy = () => {
    const element = document.createElement("a");
    const file = new Blob([policyText], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `AI_Use_Policy_${jurisdiction}_${industry}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AppLayout title="AI Use Policy Generator">
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Use Policy Generator</CardTitle>
            <CardDescription>
              Create customized AI usage policies and guidelines for your legal practice based on applicable regulations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generate">Generate Policy</TabsTrigger>
                <TabsTrigger value="view">View Policy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate" className="space-y-6 mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="jurisdiction" className="mr-2">Jurisdiction/Region</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">The policy will be tailored to relevant regulations in this region</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select defaultValue={jurisdiction} onValueChange={setJurisdiction}>
                        <SelectTrigger id="jurisdiction">
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(regulatoryFrameworks).map((key) => (
                            <SelectItem key={key} value={key}>
                              {key} - {regulatoryFrameworks[key as keyof typeof regulatoryFrameworks].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {jurisdiction && (
                        <p className="text-xs text-muted-foreground">
                          {getFrameworkDisclaimer()}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Label htmlFor="industry" className="mr-2">Industry/Sector</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Sector-specific compliance considerations will be included</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select defaultValue={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((ind) => (
                            <SelectItem key={ind.value} value={ind.value}>
                              {ind.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization-type">Organization Type</Label>
                      <Select defaultValue={orgType} onValueChange={setOrgType}>
                        <SelectTrigger id="organization-type">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="law-firm">Law Firm</SelectItem>
                          <SelectItem value="corporate-legal">Corporate Legal Department</SelectItem>
                          <SelectItem value="government">Government Legal Agency</SelectItem>
                          <SelectItem value="non-profit">Non-profit Legal Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="policy-strictness">Policy Strictness</Label>
                      <Select defaultValue={strictness} onValueChange={setStrictness}>
                        <SelectTrigger id="policy-strictness">
                          <SelectValue placeholder="Select strictness level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permissive">Permissive</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="strict">Strict</SelectItem>
                          <SelectItem value="very-strict">Very Strict</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="special-requirements">Special Requirements (Optional)</Label>
                    <Textarea 
                      id="special-requirements" 
                      placeholder="Enter any specific requirements or concerns your policy should address..."
                      className="min-h-[100px]"
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleGeneratePolicy} 
                    disabled={isGenerating || isLoading}
                    className="w-full"
                  >
                    {isGenerating || isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Policy...
                      </>
                    ) : (
                      "Generate AI Usage Policy"
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="view" className="space-y-6 mt-4">
                {policyText ? (
                  <div className="space-y-4">
                    <div className="bg-muted p-6 rounded-md whitespace-pre-wrap">
                      {policyText}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" className="mr-2" onClick={() => setSelectedTab("generate")}>
                        Edit Settings
                      </Button>
                      <Button onClick={handleDownloadPolicy}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Policy
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No policy has been generated yet. Go to the "Generate Policy" tab to create one.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

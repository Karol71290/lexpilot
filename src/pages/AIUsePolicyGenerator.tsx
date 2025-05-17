
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Loader2, Download } from "lucide-react";

export default function AIUsePolicyGenerator() {
  const [policyText, setPolicyText] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("generate");
  
  const handleGeneratePolicy = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setPolicyText(
        `# AI Use Policy for Legal Professionals

## Purpose
This policy governs the use of artificial intelligence (AI) tools within our legal practice to ensure ethical compliance, maintain confidentiality, and promote efficient use of technology.

## Scope
This policy applies to all attorneys, paralegals, and staff who utilize AI tools for legal work.

## Guidelines for AI Use

### 1. Confidentiality and Security
- All client information used with AI tools must be anonymized when possible
- Only approved and secure AI platforms may be used for client work
- Staff must not input privileged information into public AI tools

### 2. Professional Responsibility
- All AI-generated content must be reviewed by a qualified attorney
- AI should be used as an assistive tool, not a replacement for legal judgment
- Users must document when and how AI was used in case preparation

### 3. Transparency
- Clients should be informed when significant portions of their legal documents were drafted with AI assistance
- AI limitations should be clearly communicated to stakeholders

### 4. Training and Support
- All legal staff must complete basic AI literacy training
- Regular updates on AI capabilities and limitations will be provided

## Approved AI Tools
- Research assistance: LexisNexis AI, Westlaw Edge
- Document review: [Company approved tools]
- Contract analysis: [Company approved tools]`
      );
      setIsGenerating(false);
      setSelectedTab("view");
    }, 2000);
  };

  return (
    <AppLayout title="AI Use Policy Generator">
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Use Policy Generator</CardTitle>
            <CardDescription>
              Create customized AI usage policies and guidelines for your legal practice
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
                      <Label htmlFor="organization-type">Organization Type</Label>
                      <Select defaultValue="law-firm">
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
                      <Select defaultValue="balanced">
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
                    />
                  </div>
                  
                  <Button 
                    onClick={handleGeneratePolicy} 
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
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
                      <Button>
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

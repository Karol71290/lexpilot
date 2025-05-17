
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LegalWorkflow } from '@/types/legalWorkflow';
import { useUserPersona } from '@/hooks/useUserPersona';
import { getPersonaName, getPersonaPolicyImpact } from '@/utils/personaUtils';
import { Clock, Clipboard, Search, Star } from 'lucide-react';

interface WorkflowSelectorProps {
  workflows: LegalWorkflow[];
  onSelect: (workflowId: string) => void;
}

export function WorkflowSelector({ workflows, onSelect }: WorkflowSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { userPersona } = useUserPersona();
  const personaName = getPersonaName(userPersona);

  const filteredWorkflows = workflows.filter(workflow => 
    workflow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    workflow.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isRecommended = (workflow: LegalWorkflow) => {
    return workflow.recommendedPersonas?.includes(userPersona);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h3 className="text-lg font-medium">Select a Workflow</h3>
        <p className="text-sm text-muted-foreground">
          Choose a legal workflow to start or search for a specific type
        </p>

        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workflows..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkflows.map((workflow) => (
          <Card 
            key={workflow.id}
            className={`cursor-pointer hover:shadow-md transition-shadow ${
              isRecommended(workflow) ? 'border-primary/50' : ''
            }`}
            onClick={() => onSelect(workflow.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{workflow.title}</CardTitle>
                {isRecommended(workflow) && (
                  <div className="flex items-center text-primary text-xs font-medium">
                    <Star className="h-3.5 w-3.5 mr-1 fill-primary" />
                    Recommended
                  </div>
                )}
              </div>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center text-sm">
                  <Clipboard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{workflow.steps.length} steps</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{workflow.estimatedTime || "5-10 minutes"}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
                  Category: {workflow.category}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredWorkflows.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No workflows found matching your search</p>
        </div>
      )}
    </div>
  );
}

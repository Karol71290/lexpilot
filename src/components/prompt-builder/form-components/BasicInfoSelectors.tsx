
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoSelectorsProps {
  legalArea: string;
  setLegalArea: (value: string) => void;
  taskType: string;
  setTaskType: (value: string) => void;
}

export const legalAreas = [
  "Corporate", "Litigation", "IP Law", "Real Estate", "Environmental",
  "Employment", "Tax", "Finance", "Regulatory Compliance", "General"
];

export const taskTypes = [
  "Draft", "Analyze", "Summarize", "Review", "Compare", "Research",
  "Plan", "Advise", "Respond", "Negotiate"
];

export const BasicInfoSelectors = ({
  legalArea,
  setLegalArea,
  taskType,
  setTaskType
}: BasicInfoSelectorsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="legal-area">Legal Area <span className="text-red-500">*</span></Label>
        <Select value={legalArea} onValueChange={setLegalArea}>
          <SelectTrigger id="legal-area">
            <SelectValue placeholder="Select legal area" />
          </SelectTrigger>
          <SelectContent>
            {legalAreas.map((area) => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="task-type">Task Type <span className="text-red-500">*</span></Label>
        <Select value={taskType} onValueChange={setTaskType}>
          <SelectTrigger id="task-type">
            <SelectValue placeholder="Select task type" />
          </SelectTrigger>
          <SelectContent>
            {taskTypes.map((task) => (
              <SelectItem key={task} value={task}>{task}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

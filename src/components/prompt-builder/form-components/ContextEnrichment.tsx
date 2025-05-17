
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ContextEnrichmentProps {
  context: string;
  setContext: (value: string) => void;
  jurisdiction: string;
  setJurisdiction: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  outputFormat: string;
  setOutputFormat: (value: string) => void;
}

export const jurisdictions = [
  "US Federal", "California", "New York", "Delaware", "Texas",
  "UK", "EU", "Canada", "Australia", "International"
];

export const outputFormats = [
  "Legal Memo", "Bullet Points", "Table/Matrix", "Contract Clause",
  "Email Draft", "Timeline", "Decision Tree", "Numbered List",
  "Executive Summary", "Q&A Format"
];

export const toneOptions = [
  "Professional", "Academic", "Conversational", "Simplified",
  "Persuasive", "Objective", "Instructional"
];

export const ContextEnrichment = ({
  context,
  setContext,
  jurisdiction,
  setJurisdiction,
  tone,
  setTone,
  outputFormat,
  setOutputFormat
}: ContextEnrichmentProps) => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <h3 className="font-medium">Optional Context Enrichment</h3>
      
      <div className="space-y-2">
        <Label htmlFor="context">Document/Clause Context</Label>
        <Textarea 
          id="context"
          placeholder="Paste relevant text, clauses, or case facts here..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="resize-none min-h-[100px]"
        />
        <div className="flex justify-end">
          <Button variant="outline" size="sm" className="text-xs">
            <Upload className="h-3 w-3 mr-1" />
            Upload Document
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="jurisdiction">Jurisdiction</Label>
          <Select value={jurisdiction} onValueChange={setJurisdiction}>
            <SelectTrigger id="jurisdiction">
              <SelectValue placeholder="Select jurisdiction" />
            </SelectTrigger>
            <SelectContent>
              {jurisdictions.map((j) => (
                <SelectItem key={j} value={j}>{j}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map((t) => (
                <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="output-format">Output Format</Label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger id="output-format">
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              {outputFormats.map((format) => (
                <SelectItem key={format} value={format}>{format}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

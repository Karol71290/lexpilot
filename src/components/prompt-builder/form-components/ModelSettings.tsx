
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings } from "lucide-react";

interface ModelSettingsProps {
  temperature: number;
  setTemperature: (value: number) => void;
  maxTokens: number;
  setMaxTokens: (value: number) => void;
}

export const ModelSettings = ({
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens
}: ModelSettingsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Model Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature">Temperature: {temperature.toFixed(1)}</Label>
            </div>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Lower values produce more focused, deterministic outputs. Higher values produce more creative, diverse outputs.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="max-tokens">Max Output Length: {maxTokens}</Label>
            </div>
            <Slider
              id="max-tokens"
              min={200}
              max={1500}
              step={100}
              value={[maxTokens]}
              onValueChange={(value) => setMaxTokens(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Controls the maximum length of the AI-generated response.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

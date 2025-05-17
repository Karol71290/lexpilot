
import { Textarea } from "@/components/ui/textarea";

interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const TextAreaInput = ({
  value,
  onChange,
  placeholder = "Type or paste your prompt here (e.g., 'Summarize this clause under UK trademark law')",
  className = "min-h-[100px]"
}: TextAreaInputProps) => {
  return (
    <Textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
};

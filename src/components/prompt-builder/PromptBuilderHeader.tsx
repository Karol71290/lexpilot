
import { SearchBar } from "./SearchBar";

interface PromptBuilderHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const PromptBuilderHeader = ({
  searchQuery,
  setSearchQuery
}: PromptBuilderHeaderProps) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/916f0dcb-d7f5-4370-8fbc-8da1ab90b6f6.png" 
            alt="LexPilot Logo" 
            className="h-8 mr-2" 
          />
          <h1 className="text-3xl font-bold">Legal Prompt Builder</h1>
        </div>
        <p className="text-muted-foreground">Craft effective legal prompts for AI tools tailored to your specific needs</p>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </section>
  );
};

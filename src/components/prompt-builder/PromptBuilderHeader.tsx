
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
        <h1 className="text-3xl font-bold">Legal Prompt Builder</h1>
        <p className="text-muted-foreground">Craft effective legal prompts for AI tools tailored to your specific needs</p>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </section>
  );
};

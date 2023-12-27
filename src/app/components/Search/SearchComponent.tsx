"use client";

import { useState } from "react";
import Search from "@/app/components/Search/Search";
import ResultView from "@/app/components/Search/ResultView";
import { SearchResult } from "@/app/components/Search/Search";

interface SearchComponentProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
  setResults: (results: SearchResult[]) => void;
}

const SearchComponent = ({ setView }: SearchComponentProps) => {
  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <div>
      <Search setResults={setResults} setView={setView} />
      <ResultView results={results} />
    </div>
  );
};

export default SearchComponent;

import { Dispatch, SetStateAction } from "react";
import Results from "@/app/components/Search/Results";
import { SearchResult } from "@/app/components/Search/Search";

const ResultView = ({ results }: { results: SearchResult[] }) => {
  return (
    <div>
      {results.map((result, index) => (
        <Results
          key={index}
          title={result.snippet.title}
          thumbnailUrl={result.snippet.thumbnails.default.url}
          position={index + 1}
        />
      ))}
    </div>
  );
};

export default ResultView;

import Results from "@/app/components/Search/Results";
import { SearchResult } from "@/app/components/Search/Search";

const ResultView = ({
  results,
  onAddToPlaylist,
}: {
  results: SearchResult[];
  onAddToPlaylist: (item: SearchResult) => void;
}) => {
  return (
    <div>
      {results.map((result, index) => (
        <Results
          key={index}
          title={result.snippet.title}
          thumbnailUrl={result.snippet.thumbnails.default.url}
          position={index + 1}
          channelTitle={result.snippet.channelTitle}
          onAddToPlaylist={() => onAddToPlaylist(result)}
        />
      ))}
    </div>
  );
};

export default ResultView;

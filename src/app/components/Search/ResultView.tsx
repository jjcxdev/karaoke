import Results from "@/app/components/Search/Results";
import { SearchResult } from "@/app/components/Search/Search";

interface ResultViewProps {
  results: SearchResult[];
  onAddToPlaylist: (item: {
    songTitle: string;
    bandName: string;
    thumbnailUrl: string;
    videoId: string;
    channelTitle: string;
  }) => void;
}

const ResultView = ({ results, onAddToPlaylist }: ResultViewProps) => {
  return (
    <div>
      {results.map((result, index) => {
        const key = `${result.id.videoId}-${index}`;
        return (
          <Results
            key={key}
            title={result.snippet.title}
            thumbnailUrl={result.snippet.thumbnails.default.url}
            position={index + 1}
            channelTitle={result.snippet.channelTitle}
            onAddToPlaylist={onAddToPlaylist}
            item={result}
          />
        );
      })}
    </div>
  );
};

export default ResultView;

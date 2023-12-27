import React, { useState } from "react";
import PlaylistItem from "../Playlist/PlaylistItem";
import ResultView from "../Search/ResultView";
import SearchComponent from "../Search/SearchComponent";
import Results from "../Search/Results";
import PlaylistView from "../Playlist/PlaylistView";

interface ResultItem {
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

const ViewController = () => {
  const [view, setView] = useState("playlist"); // Default to 'playlist'
  const [results, setResults] = useState<ResultItem[]>([]);
  const [selectedResults, setSelectedResults] = useState<boolean[]>([]);

  const toggleSelection = (index: number) => {
    const newSelectedResults = [...selectedResults];
    newSelectedResults[index] = !newSelectedResults[index];
    setSelectedResults(newSelectedResults);
  };

  return (
    <div>
      {view === "playlist" ? (
        <PlaylistView /> // Render playlist
      ) : (
        // Render search results
        <div>
          {results.map((item, index) => (
            <Results
              title={item.snippet.title}
              thumbnailUrl={item.snippet.thumbnails.default.url}
              position={index + 1}
              isSelected={selectedResults[index]}
              toggleSelection={() => toggleSelection(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewController;

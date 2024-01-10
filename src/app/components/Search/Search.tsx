"use client";

import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

// Define the structure of the search result
export interface SearchResult {
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    description: string;
    channelTitle: string;
  };
}

// Define the props for the Search component
interface SearchProps {
  setResults: (results: SearchResult[]) => void;
}

// Users search for videos
const Search = ({ setResults }: SearchProps) => {
  // term is the search term used by the user
  const [term, setTerm] = useState("");

  // searchYouTube makes a request to YouTube API for videos
  const searchYouTube = async () => {
    // Append karaoke to the search term
    const query = `${term}, karaoke`;
    // Make a GET request to the YouTube API
    const idResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "id",
          maxResults: 10,
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          q: `${term}, karaoke`,
          type: "video",
          videoEmbeddable: "true", // Only return videos that can be embedded
          videoSyndicated: "true", // Only return videos that can be played outside youtube
        },
      }
    );

    // Extract the videoIDs from the response
    const videoIds = idResponse.data.items.map((item: any) => item.id.videoId);

    // Make a GET request to the YouTube API to get the snippet data
    const snippetResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id: videoIds.join(","), // Pass the videoIds as comma-separated string
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
        },
      }
    );

    // Combine the id and snippet data into the results
    const results = snippetResponse.data.items.map((item: any) => ({
      id: { kind: "youtube#video", videoId: item.id },
      snippet: item.snippet,
    }));

    // Update the results state with the video results
    setResults(results);
  };

  // clearSearch resets the search term and results
  const clearSearch = () => {
    setTerm("");
    setResults([]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchYouTube();
      }}
      className="p-2 px-6 flex flex-row gap-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="opacity-50 relative rounded-md border border-gray-800 bg-gray-950 p-2 w-full max-w-52">
        <input
          id="searchTerm"
          name="searchTerm"
          className="opacity-50 bg-gray-950"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button
          onClick={searchYouTube}
          className="absolute right-4 -translate-y-1/2 top-1/2"
          style={{
            backgroundColor: "transparent",
            border: "none",
          }}>
          <FaSearch />
        </button>
      </div>
      <button
        type="button"
        onClick={clearSearch}
        className="rounded-md border border-gray-800 bg-gray-950 p-2 px-4 opacity-50"
        style={{
          border: "none",
        }}>
        Clear
      </button>
    </form>
  );
};

export default Search;

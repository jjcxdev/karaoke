"use client";

import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

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

interface SearchProps {
  setResults: (results: SearchResult[]) => void;
}

const Search = ({ setResults }: SearchProps) => {
  const [term, setTerm] = useState("");

  const searchYouTube = async () => {
    const query = `${term}, karaoke`;
    // console.log(query);
    // console.log(typeof setResults);

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: 20,
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          q: `${term}, karaoke`,
        },
      }
    );

    const videoResults = response.data.items
      .filter((item: SearchResult) => item.id.kind === "youtube#video")
      .map((item: SearchResult) => {
        return { ...item, id: item.id.videoId };
      });

    setResults(videoResults);
    // console.log(response.data.items);
    // console.log(Array.isArray(response.data.items));
    setResults(response.data.items);
  };

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
          className="opacity-50 bg-gray-950"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{ flex: 1 }}
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

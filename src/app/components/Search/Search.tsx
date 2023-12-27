"use client";

import axios from "axios";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export interface SearchResult {
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    description: string;
  };
}

interface SearchProps {
  setResults: (results: SearchResult[]) => void;
}

const Search = ({ setResults }: SearchProps) => {
  const [term, setTerm] = useState("");

  const searchYouTube = async () => {
    const query = `${term}, karaoke`;
    console.log(query);
    console.log(typeof setResults);

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: 5,
          key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
          q: `${term}, karaoke`,
        },
      }
    );
    console.log(response.data.items);
    console.log(Array.isArray(response.data.items));
    setResults(response.data.items);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        searchYouTube();
      }}
      className="p-2 px-6"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <input
        className="opacity-50 rounded-md border border-gray-800 bg-gray-950 p-2 "
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{ flex: 1 }}
      />
      <button
        onClick={searchYouTube}
        className="absolute right-8"
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}>
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;

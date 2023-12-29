"use client";

import { useState } from "react";
import VideoPlayerWindow from "@/app/components/MainView/VideoPlayerWindow";
import Header from "@/app/components/MainView/Header";
import PlaylistItem from "@/app/components/Playlist/PlaylistItem";
import PlaybackControl from "@/app/components/MainView/PlaybackControl";
import Search from "@/app/components/Search/Search";
import ResultView from "@/app/components/Search/ResultView";
import { SearchResult } from "@/app/components/Search/Search";
import PlaylistView from "@/app/components/Playlist/PlaylistView";

export default function HomePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [playlist, setPlaylist] = useState<SearchResult[]>([]);

  const handleAddToPlaylist = (item: SearchResult) => {
    setPlaylist((prevPlaylist) => [...prevPlaylist, item]);
  };

  return (
    <main className="flex max-h-screen overflow-hidden flex-col items-center justify-start bg-black text-white">
      <Header />
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <VideoPlayerWindow />
          <PlaybackControl />
          <div className="w-full flex-1 overflow-y-auto">
            <PlaylistView initialPlaylist={playlist} />
          </div>
        </div>
        <div className="w-1/2 ">
          <div className="w-full">
            <Search setResults={setResults} />
          </div>
          <div className="w-full flex-1 overflow-y-auto max-h-screen">
            <ResultView
              results={results}
              onAddToPlaylist={handleAddToPlaylist}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

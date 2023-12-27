"use client";

import { useState } from "react";
import VideoPlayerWindow from "@/app/components/MainView/VideoPlayerWindow";
import Header from "@/app/components/MainView/Header";
import PlaylistItem from "@/app/components/Playlist/PlaylistItem";
import PlaybackControl from "@/app/components/MainView/PlaybackControl";
import Search from "@/app/components/Search/Search";
import ResultView from "@/app/components/Search/ResultView";
import { SearchResult } from "@/app/components/Search/Search";
import ViewController from "./components/MainView/ViewController";

export default function HomePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black text-white">
      <Header />
      <VideoPlayerWindow />
      <div className="w-full flex-1 overflow-y-auto">
        <ViewController />
      </div>
      <div className="mt-auto w-full">
        <Search setResults={setResults} />
        <PlaybackControl />
      </div>
    </main>
  );
}

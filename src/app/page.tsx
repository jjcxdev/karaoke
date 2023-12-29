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
import { PlaylistItemType } from "@/app/components/Playlist/PlaylistView";

export default function HomePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItemType[]>([]);

  const convertToPlaylistItem = (item: SearchResult): PlaylistItemType => {
    return {
      id: item.id,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      position: 0,
      channelTitle: item.snippet.channelTitle,
    };
  };

  const handleAddToPlaylist = (item: SearchResult) => {
    const playlistItem = convertToPlaylistItem(item);
    setPlaylist((prevPlaylist) => [...prevPlaylist, playlistItem]);
  };

  return (
    <main className="flex max-h-screen min-h-screen overflow-hidden flex-col items-center justify-start bg-black text-white">
      <Header />
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <div>
            <VideoPlayerWindow />
            <PlaybackControl />
          </div>
          <div className="w-full flex-1 overflow-y-auto max-h-screen">
            <PlaylistView
              playlist={playlist}
              onAddToPlaylist={handleAddToPlaylist}
            />
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

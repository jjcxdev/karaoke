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
    <main className="flex h-screen overflow-hidden flex-col bg-black text-white">
      <Header />
      <div className="flex flex-row w-full overflow-hidden">
        <div className="w-1/2 flex flex-col">
          <div>
            <VideoPlayerWindow />
            <PlaybackControl />
          </div>

          <div className="overflow-y-auto flex-grow">
            <PlaylistView
              playlist={playlist}
              onAddToPlaylist={handleAddToPlaylist}
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col">
          <div>
            <Search setResults={setResults} />
          </div>
          <div className="flex-grow overflow-y-auto">
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

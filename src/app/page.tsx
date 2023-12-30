"use client";

import { use, useState } from "react";
import VideoPlayerWindow from "@/app/components/MainView/VideoPlayerWindow";
import Header from "@/app/components/MainView/Header";
import PlaylistItem from "@/app/components/Playlist/PlaylistItem";
import PlaybackControl from "@/app/components/MainView/PlaybackControl";
import Search from "@/app/components/Search/Search";
import ResultView from "@/app/components/Search/ResultView";
import { SearchResult } from "@/app/components/Search/Search";
import PlaylistView from "@/app/components/Playlist/PlaylistView";
import { PlaylistItemType } from "@/app/components/Playlist/PlaylistView";
import YouTube from "react-youtube";

export default function HomePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItemType[]>([]);
  const [currentVideo, setCurrentVideo] = useState<PlaylistItemType | null>(
    null
  );

  const convertToPlaylistItem = (item: SearchResult): PlaylistItemType => {
    return {
      id: item.id.videoId,
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

  const handleSelectVideo = (video: PlaylistItemType) => {
    setCurrentVideo(video);
  };

  const video = playlist.find((item) => item.id === currentVideo?.id);

  return (
    <main className="flex h-screen overflow-hidden flex-col bg-black text-white">
      <Header />
      <div className="flex flex-row w-full overflow-hidden">
        <div className="w-1/2 flex flex-col">
          <div>
            <div className="w-full h-full aspect-video">
              <div className="w-full h-full">
                {currentVideo ? (
                  <VideoPlayerWindow video={currentVideo} />
                ) : (
                  <img
                    src="/video.png"
                    alt="placeholder"
                    className="w-full h-full aspect-video"
                  />
                )}
              </div>
              <PlaybackControl />
            </div>
          </div>

          <div className="overflow-y-auto flex-grow">
            <PlaylistView
              playlist={playlist}
              onAddToPlaylist={handleAddToPlaylist}
              onSelectVideo={handleSelectVideo}
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

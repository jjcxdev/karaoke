"use client";

import { useEffect, useState } from "react";
import VideoPlayerWindow from "@/app/components/MainView/VideoPlayerWindow";
import Header from "@/app/components/MainView/Header";
import PlaybackControl from "@/app/components/MainView/PlaybackControl";
import Search from "@/app/components/Search/Search";
import ResultView from "@/app/components/Search/ResultView";
import { SearchResult } from "@/app/components/Search/Search";
import PlaylistView from "@/app/components/Playlist/PlaylistView";
import { PlaylistItemType } from "@/app/components/Playlist/PlaylistView";
import Image from "next/image";

export default function HomePage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItemType[]>([]);
  const [currentVideo, setCurrentVideo] = useState<PlaylistItemType | null>(
    null
  );
  const [maxHeight, setMaxHeight] = useState("auto");

  const convertToPlaylistItem = (
    item: SearchResult,
    songTitle: string,
    bandName: string
  ): PlaylistItemType => {
    return {
      id: item.id.videoId,
      songTitle: songTitle,
      bandName: bandName,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      position: 0,
      channelTitle: item.snippet.channelTitle,
    };
  };

  const handleAddToPlaylist = (item: {
    songTitle: string;
    bandName: string;
    thumbnailUrl: string;
    videoId: string;
    channelTitle: string;
  }) => {
    const playlistItem = {
      id: item.videoId,
      songTitle: item.songTitle,
      bandName: item.bandName,
      thumbnailUrl: item.thumbnailUrl,
      position: playlist.length + 1,
      channelTitle: item.channelTitle,
    };
    setPlaylist((prevPlaylist) => [...prevPlaylist, playlistItem]);
  };
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(false);

  const handleSelectVideo = (video: PlaylistItemType) => {
    setCurrentVideo(video);
  };

  const video = playlist.find((item) => item.id === currentVideo?.id);

  useEffect(() => {
    const calculatedMaxHeight = () => {
      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const videoPlayerHeight =
        document.querySelector(".video-player")?.clientHeight || 0;
      const playbackControlHeight =
        document.querySelector(".playback-control")?.clientHeight || 0;

      const calculatedHeight =
        window.innerHeight -
        headerHeight -
        playbackControlHeight -
        videoPlayerHeight;

      setMaxHeight(`${calculatedHeight}px`);
    };

    calculatedMaxHeight();

    window.addEventListener("resize", calculatedMaxHeight);
    return () => window.removeEventListener("resize", calculatedMaxHeight);
  }, [isPlaylistVisible]);

  return (
    <main className="flex h-screen flex-col bg-black text-white">
      <Header />
      {/* Main content area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Left side column */}
        <div className="lg:w-1/2 flex flex-col">
          <div>
            <div className="w-full h-full aspect-video">
              <div className="w-full h-full">
                {currentVideo ? (
                  <VideoPlayerWindow video={currentVideo} />
                ) : (
                  <Image
                    src="/video.png"
                    alt="placeholder"
                    className="w-full h-full aspect-video"
                    width="1240"
                    height="720"
                    priority={true}
                  />
                )}
              </div>

              <PlaybackControl />
            </div>
          </div>
          {/* Stacked view on mobile */}
          <div className="lg:hidden flex flex-col max-h-">
            <div className="flex flex-row justify-center items-center pl-6">
              <button
                type="button"
                className="rounded-md h-10 border w-20 border-gray-800 bg-gray-950 p-2 px-4 opacity-50 whitespace-nowrap"
                onClick={() => setIsPlaylistVisible(!isPlaylistVisible)}>
                {isPlaylistVisible ? "Search" : "Playlist"}
              </button>
              <Search setResults={setResults} />
            </div>
            {/* In line to avoid search reload   */}
            <div
              className="overflow-y-auto flex-grow"
              style={{ maxHeight: maxHeight }}>
              <div style={{ display: isPlaylistVisible ? "block" : "none" }}>
                <PlaylistView
                  playlist={playlist}
                  onAddToPlaylist={handleAddToPlaylist}
                  onSelectVideo={handleSelectVideo}
                />
              </div>
              <div style={{ display: isPlaylistVisible ? "none" : "block" }}>
                <ResultView
                  results={results}
                  onAddToPlaylist={handleAddToPlaylist}
                />
              </div>
            </div>
          </div>
          {/* Playlist view on large */}
          <div className="hidden lg:flex lg:flex-col lg:overflow-y-auto lg:flex-grow lg:w-full">
            <PlaylistView
              playlist={playlist}
              onAddToPlaylist={handleAddToPlaylist}
              onSelectVideo={handleSelectVideo}
            />
          </div>
        </div>
        {/* Right side column */}
        <div className="lg:w-1/2 lg:flex flex-col hidden">
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

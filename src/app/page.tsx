"use client";
import Link from "next/link";
import VideoPlayerWindow from "./components/VideoPlayerWindow";
import Header from "./components/Header";
import PlaylistItem from "./components/PlaylistItem";
import PlaybackControl from "./components/PlaybackControl";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black text-white">
      <Header />
      <VideoPlayerWindow />
      <div className="w-full flex-1 overflow-y-auto">
        <PlaylistItem />
      </div>
      <div className="mt-auto w-full">
        <PlaybackControl />
      </div>
    </main>
  );
}

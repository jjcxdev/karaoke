"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  title: string;
  thumbnailUrl: string;
  position: number;
  channelTitle: string;
  onAddToPlaylist: (item: {
    title: string;
    thumbnailUrl: string;
    position: number;
  }) => void;
}

interface SelectionProps {
  onSelected: () => void;
}

const Selection = ({ onSelected }: SelectionProps) => {
  return (
    <button className="bg-none cursor-pointer" onClick={onSelected}>
      <IoIosAddCircle className="h-4 w-4" />
    </button>
  );
};

export default function Results({
  title,
  thumbnailUrl,
  position,
  channelTitle,
  onAddToPlaylist,
}: ResultsProps) {
  const [songInfo, setSongInfo] = useState(title);
  const [bandName, setBandName] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSongInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/song-info?title=${encodeURIComponent(title)}`
        );
        const data = await response.json();
        console.log("API response", data);
        if (data.content) {
          const lines = data.content.split("\n");
          if (lines.length >= 2) {
            const extractedBandName = lines[0].split(": ")[1];
            const extractedSongTitle = lines[1].split(": ")[1];

            setBandName(extractedBandName);
            setSongTitle(extractedSongTitle);
          }
        } else {
          setBandName("");
          setSongTitle("");
        }
      } catch (error) {
        console.log("API error", error);
        setSongInfo("Unknown Title");
      }
      setIsLoading(false);
    };
    fetchSongInfo();
  }, [title]);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex h-fit w-full px-4 py-2 flex-row justify-between border-b-[1px] border-gray-800">
          <div className="pr-4 flex items-center">{position}</div>
          <div className="h-[63px] relative w-[112px] overflow-hidden border border-gray-800 flex-none">
            <Image
              className="w-full h-full absolute object-cover inset-0"
              src={thumbnailUrl}
              alt="player window"
              fill
              sizes="max-width: 110px"
            />
          </div>
          <div className="w-full flex flex-col justify-center pl-4">
            <div className="text-lg leading-tight text-gray-200">
              {songTitle}
            </div>
            <div className="text-sm leading-tight text-gray-400">
              {bandName}
            </div>
            <div className="text-xs leading-tight text-gray-500">
              {channelTitle}
            </div>
          </div>
          <div className="p-2 text-xl flex items-center text-white">
            <Selection
              onSelected={() =>
                onAddToPlaylist({ title, thumbnailUrl, position })
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

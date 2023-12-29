"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

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
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      onSelected();
    }
  };

  return (
    <button className="bg-none" onClick={toggleSelection}>
      {isSelected ? (
        <FaCheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <FaRegCheckCircle className="h-4 w-4" />
      )}
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
  return (
    <>
      <div className="flex h-fit w-full px-4 py-2 flex-row justify-between border-b-[1px] border-gray-800">
        <div className="pr-4 flex items-center">{position}</div>
        <div className="h-[63px] relative w-[112px] overflow-hidden border border-gray-800  flex-none">
          <Image
            className="w-full h-full absolute object-cover inset-0"
            src={thumbnailUrl}
            alt="player window"
            layout="fill"
          />
        </div>
        <div className="w-full flex flex-col justify-center pl-4">
          <div className="text-lg">{title}</div>
          <div className="text-sm">{channelTitle}</div>
        </div>
        <div className="p-2 text-xl flex items-center text-white">
          <Selection
            onSelected={() =>
              onAddToPlaylist({ title, thumbnailUrl, position })
            }
          />
        </div>
      </div>
    </>
  );
}

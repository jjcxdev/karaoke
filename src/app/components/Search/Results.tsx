"use client";

import { useState } from "react";
import Image from "next/image";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

interface ResultsProps {
  title: string;
  thumbnailUrl: string;
  position: number;
  isSelected: boolean;
  toggleSelection: () => void;
}

const Selection = () => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
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
  isSelected,
  toggleSelection,
}: ResultsProps) {
  return (
    <>
      <div className="flex h-fit w-full pr-4   flex-row justify-between border-b-[1px] border-gray-800">
        <div className="p-2 flex items-center">{position}</div>
        <div className="aspect-video p-2">
          <Image
            src={thumbnailUrl}
            alt="player window"
            height={40}
            width={121}
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="text-lg">{title}</div>
        </div>
        <div className="p-2 text-xl flex items-center text-white">
          <Selection />
        </div>
      </div>
    </>
  );
}

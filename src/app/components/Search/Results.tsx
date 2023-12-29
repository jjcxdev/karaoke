"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import OpenAI from "openai";
import { on } from "events";
import { IoIosAddCircle } from "react-icons/io";

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

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Selection = ({ onSelected }: SelectionProps) => {
  return (
    <button className="bg-none" onClick={onSelected}>
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

  useEffect(() => {
    const fetchSongInfo = async () => {
      console.log("fetchSongInfo called");
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Extract the band name and song title from this text: "${title}"`,
            },
          ],
          temperature: 0.5,
        });
        console.log("Response:", response);
        if (
          response.choices &&
          response.choices.length > 0 &&
          response.choices[0].message.content
        ) {
          const content = response.choices[0].message.content;

          const lines = content.split("\n");
          if (lines.length >= 2) {
            const extracdedBandName = lines[0].split(": ")[1];
            const extractedSongTitle = lines[1].split(": ")[1];

            setBandName(extracdedBandName);
            setSongTitle(extractedSongTitle);
          }
        } else {
          setBandName("");
          setSongTitle("");
        }
      } catch (error) {
        console.error("Error fetching song info:", error);
        setSongInfo("Unknown Title");
      }
    };
    console.log("useEffect called, title:", title);
    fetchSongInfo();
  }, [title]);

  return (
    <>
      <div className="flex h-fit w-full px-4 py-2 flex-row justify-between border-b-[1px] border-gray-800">
        <div className="pr-4 flex items-center">{position}</div>
        <div className="h-[63px] relative w-[112px] overflow-hidden border border-gray-800  flex-none">
          <Image
            className="w-full h-full absolute object-cover inset-0"
            src={thumbnailUrl}
            alt="player window"
            fill
          />
        </div>
        <div className="w-full flex flex-col justify-center pl-4">
          <div className="text-lg leading-tight text-gray-200">{songTitle}</div>
          <div className="text-sm leading-tight text-gray-400">{bandName}</div>
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
    </>
  );
}

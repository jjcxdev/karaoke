"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { IoIosAddCircle } from "react-icons/io"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchResult } from "./Search"

interface ResultsProps {
  title: string
  thumbnailUrl: string
  position: number
  channelTitle: string
  item: SearchResult
  onAddToPlaylist: (item: {
    songTitle: string
    bandName: string
    thumbnailUrl: string
    videoId: string
    channelTitle: string
  }) => void
}

interface SelectionProps {
  onSelected: () => void
  title: string
  bandName: string
  thumbnailUrl: string
  position: number
  videoId: string
}

const Selection = ({
  onSelected,
  title,
  bandName,
  thumbnailUrl,
  position,
  videoId,
}: SelectionProps) => {
  return (
    <button
      className="cursor-pointer bg-none"
      onClick={() => {
        console.log("adding to playlist:", {
          title,
          bandName,
          thumbnailUrl,
          position,
          videoId,
        })
        onSelected()
      }}
    >
      <IoIosAddCircle className="h-4 w-4" />
    </button>
  )
}

const Results = ({
  title,
  thumbnailUrl,
  position,
  channelTitle,
  onAddToPlaylist,
  item,
}: ResultsProps) => {
  const [songInfo, setSongInfo] = useState(title)
  const [bandName, setBandName] = useState("")
  const [songTitle, setSongTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSongInfo = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/song-info?title=${encodeURIComponent(title)}`
        )
        const data = await response.json()
        console.log("API response", data)
        if (data.content) {
          const lines = data.content.split("\n")
          if (lines.length >= 2) {
            const extractedBandName = lines[0].split(": ")[1]
            const extractedSongTitle = lines[1].split(": ")[1]

            setBandName(extractedBandName)
            setSongTitle(extractedSongTitle)
          }
        } else {
          setBandName("")
          setSongTitle("")
        }
      } catch (error) {
        console.log("API error", error)
        setSongInfo("Unknown Title")
      }
      setIsLoading(false)
    }
    fetchSongInfo()
  }, [title])

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex h-fit w-full flex-row justify-between border-b-[1px] border-gray-800 px-4 py-2">
          <div className="flex items-center pr-4">{position}</div>
          <div className="relative h-[63px] w-[112px] flex-none overflow-hidden border border-gray-800">
            <Image
              className="absolute inset-0 h-full w-full max-w-[110px] object-cover"
              src={thumbnailUrl}
              alt="player window"
              fill
              sizes="(max-width: 110px)"
            />
          </div>
          <div className="flex w-full flex-col justify-center pl-4">
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
          <div className="flex items-center p-2 text-xl text-white">
            <Selection
              title={songTitle}
              bandName={bandName}
              thumbnailUrl={thumbnailUrl}
              position={position}
              videoId={item.id.videoId}
              onSelected={() => {
                onAddToPlaylist({
                  songTitle: songTitle,
                  bandName: bandName,
                  thumbnailUrl: item.snippet.thumbnails.default.url,
                  videoId: item.id.videoId,
                  channelTitle: item.snippet.channelTitle,
                })
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
export default Results

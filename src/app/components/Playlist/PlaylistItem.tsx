import Image from "next/image"
import { MdDragIndicator } from "react-icons/md"

interface PlaylistItemProps {
  id: string
  songTitle: string
  bandName: string
  thumbnailUrl: string
  position: number
  channelTitle: string
  onSelect?: () => void
}

const PlaylistItem = ({
  id,
  songTitle,
  bandName,
  thumbnailUrl,
  position,
  channelTitle,
  onSelect,
}: PlaylistItemProps) => {
  console.log(id)
  return (
    <>
      <div
        onClick={() => onSelect && onSelect()}
        className="flex h-fit w-full flex-row justify-between border-b-[1px] border-gray-800 px-4 py-2"
      >
        <div className="flex items-center pr-4">{position}</div>
        <div className="relative h-[63px] w-[112px] flex-none overflow-hidden border border-gray-800">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src={thumbnailUrl}
            alt="player window"
            fill
          />
        </div>
        <div className="flex w-full flex-col justify-center pl-4">
          <div className="text-lg leading-tight text-gray-200">{songTitle}</div>
          <div className="text-sm leading-tight text-gray-400">{bandName}</div>
          <div className="text-xs leading-tight text-gray-500">
            {channelTitle}
          </div>
        </div>
        <div className="flex items-center p-2 text-xl text-white">
          <div
            className="flex items-center p-2 text-xl
         text-white"
          >
            <MdDragIndicator />
          </div>
        </div>
      </div>
    </>
  )
}
export default PlaylistItem

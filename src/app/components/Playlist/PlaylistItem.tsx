import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";

interface PlaylistItemProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  position: number;
  channelTitle: string;
  onSelect?: () => void;
}

const PlaylistItem = ({
  id,
  title,
  thumbnailUrl,
  position,
  channelTitle,
  onSelect,
}: PlaylistItemProps) => {
  console.log(id);
  return (
    <>
      <div
        onClick={() => onSelect && onSelect()}
        className="flex h-fit w-full px-4 py-2 flex-row justify-between border-b-[1px] border-gray-800">
        <div className="pr-4 flex items-center">{position}</div>
        <div className="h-[63px] relative w-[112px] overflow-hidden border border-gray-800 flex-none">
          <Image
            className="w-full h-full absolute object-cover inset-0"
            src={thumbnailUrl}
            alt="player window"
            fill
          />
        </div>
        <div className="w-full flex flex-col justify-center pl-4">
          <div className="text-lg leading-tight text-gray-200">{title}</div>
          <div className="text-xs leading-tight text-gray-500">
            {channelTitle}
          </div>
        </div>
        <div className="p-2 text-xl flex items-center text-white">
          <div
            className="p-2 text-xl flex items-center
         text-white">
            <MdDragIndicator />
          </div>
        </div>
      </div>
    </>
  );
};
export default PlaylistItem;

import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";

interface PlaylistItemProps {
  id: string;
  title: string;
  thumbnailUrl: string;
  position: number;
  channelTitle: string;
}

const PlaylistItem = ({
  id,
  title,
  thumbnailUrl,
  position,
  channelTitle,
}: PlaylistItemProps) => {
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
          <div className="text-sm">{channelTitle}</div>
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

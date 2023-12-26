import Image from "next/image";
import { MdDragIndicator } from "react-icons/md";

export default function PlaylistItem() {
  return (
    <>
      <div className="flex h-fit w-full flex-row justify-between border-b-[1px] border-gray-800">
        <div className="p-2 flex items-center">01</div>
        <div className="aspect-video p-2">
          <Image
            src="/vidHolder.jpeg"
            alt="player window"
            height={40}
            width={121}
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <div className="text-lg">The Only Exception</div>
          <div className="text-sm">Paramore</div>
        </div>
        <div
          className="p-2 text-xl flex items-center
         text-white">
          <MdDragIndicator />
        </div>
      </div>
    </>
  );
}

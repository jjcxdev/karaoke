import YouTube from "react-youtube";

interface VideoPlayerWindowProps {
  video: {
    id: string;
  };
}

export default function VideoPlayerWindow({ video }: VideoPlayerWindowProps) {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      <div className="aspect-video w-full bg-gray-900">
        {video && <YouTube videoId={video.id} opts={opts} />}
      </div>
    </>
  );
}

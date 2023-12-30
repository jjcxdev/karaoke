interface VideoPlayerWindowProps {
  video: {
    id: string;
  };
}

export default function VideoPlayerWindow({ video }: VideoPlayerWindowProps) {
  return (
    <>
      <div className="aspect-video w-full relative bg-gray-900">
        {video && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"></iframe>
        )}
      </div>
    </>
  );
}

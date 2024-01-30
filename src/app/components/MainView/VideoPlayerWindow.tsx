interface VideoPlayerWindowProps {
  video: {
    id: string
  }
}

export default function VideoPlayerWindow({ video }: VideoPlayerWindowProps) {
  return (
    <>
      <div className="relative aspect-video w-full bg-gray-900">
        {video && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&controls=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute left-0 top-0 h-full w-full"
          ></iframe>
        )}
      </div>
    </>
  )
}

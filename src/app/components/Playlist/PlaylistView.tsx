import PlaylistItem from "./PlaylistItem"

export interface PlaylistItemType {
  id: string
  songTitle: string
  bandName: string
  thumbnailUrl: string
  position: number
  channelTitle: string
}

interface PlaylistViewProps {
  playlist: PlaylistItemType[]
  onAddToPlaylist: (item: {
    songTitle: string
    bandName: string
    thumbnailUrl: string
    videoId: string
    channelTitle: string
  }) => void
  onSelectVideo: (video: PlaylistItemType) => void
}

const PlaylistView = ({ playlist, onSelectVideo }: PlaylistViewProps) => {
  return (
    <div>
      {playlist.map((item, index) => (
        <PlaylistItem
          key={item.id || item.songTitle + index}
          channelTitle={item.channelTitle}
          id={item.id}
          songTitle={item.songTitle}
          bandName={item.bandName}
          thumbnailUrl={item.thumbnailUrl}
          position={index + 1}
          onSelect={() => onSelectVideo(item)}
        />
      ))}
    </div>
  )
}

export default PlaylistView

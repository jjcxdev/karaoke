import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlaylistItem from "./PlaylistItem";
import { SearchResult } from "../Search/Search";

interface PlaylistItemType {
  id: string;
  title: string;
  thumbnailUrl: string;
  position: number;
  channelTitle: string;
}

const PlaylistView = ({
  initialPlaylist,
}: {
  initialPlaylist: SearchResult[];
}) => {
  const [playlist, setPlaylist] = useState<PlaylistItemType[]>(
    initialPlaylist.map((item, index) => ({
      id: uuidv4(),
      channelTitle: item.snippet.channelTitle,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      position: index + 1,
    }))
  );

  const addToPlaylist = (item: SearchResult) => {
    setPlaylist((prevPlaylist) => [
      ...prevPlaylist,
      {
        id: uuidv4(),
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        position: prevPlaylist.length + 1,
      },
    ]);
  };

  return (
    <div>
      {playlist.map((item, index) => (
        <PlaylistItem
          key={item.id}
          channelTitle={item.channelTitle}
          id={item.id}
          title={item.title}
          thumbnailUrl={item.thumbnailUrl}
          position={index + 1}
        />
      ))}
    </div>
  );
};

export default PlaylistView;

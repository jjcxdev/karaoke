import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PlaylistItem from "./PlaylistItem";
import { SearchResult } from "../Search/Search";

export interface PlaylistItemType {
  id: string;
  title: string;
  thumbnailUrl: string;
  position: number;
  channelTitle: string;
}

interface PlaylistViewProps {
  playlist: PlaylistItemType[];
  onAddToPlaylist: (item: SearchResult) => void;
}

const PlaylistView = ({ playlist, onAddToPlaylist }: PlaylistViewProps) => {
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

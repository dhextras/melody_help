import { useEffect } from "react";
import Controls from "~/components/PlayerComponents/Controls";
import Player from "~/components/PlayerComponents/Player";
import Seekbar from "~/components/PlayerComponents/Seekbar";
import Track from "~/components/PlayerComponents/Track";
import VolumeBar from "~/components/PlayerComponents/VolumeBar";

import usePlayer from "~/hooks/usePlayer";

import type { PlaylistProp, SongProp } from "~/types/db.types";
import type { usePlayerHookProps } from "~/types/player.types";

export default function MusicPlayer({
  playlistSongs,
  activePlaylist,
  songHooks,
}: {
  playlistSongs: SongProp[];
  activePlaylist: PlaylistProp;
  songHooks: {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    activeSong: SongProp | null;
    setActiveSong: (song: SongProp | null) => void;
  };
}) {
  const usePlayerHook: usePlayerHookProps = usePlayer(
    playlistSongs,
    activePlaylist,
    songHooks.isPlaying,
    songHooks.setIsPlaying,
    songHooks.activeSong,
    songHooks.setActiveSong,
  );

  return (
    <div className="flex items-center justify-between bg-gray-800 p-2 text-white sm:px-12 lg:px-8">
      <Track playerControl={usePlayerHook.playerControl} />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Controls playerControl={usePlayerHook.playerControl} />
        <Seekbar SeekControl={usePlayerHook.seekControl} />
        <Player
          playerControl={usePlayerHook.playerControl}
          seekControl={usePlayerHook.seekControl}
          volumeControl={usePlayerHook.volumeControl}
        />
      </div>
      <VolumeBar volumeControl={usePlayerHook.volumeControl} />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

import type { PlaylistProp, SongProp } from "~/types/db.types";
import type { usePlayerHookProps } from "~/types/player.types";

export const usePlayer = (
  playlistSongs: SongProp[],
  activePlaylist: PlaylistProp,
  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void,
  activeSong: SongProp | null,
  setActiveSong: (song: SongProp | null) => void,
): usePlayerHookProps => {
  const activeSongIndex = useRef<number>(0);
  const currentSongList = useRef<SongProp[]>(playlistSongs);

  const [appTime, setAppTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.3);
  const [duration, setDuration] = useState<number>(0);
  const [seekTime, setSeekTime] = useState<number>(0);
  const [shuffle, setShuffle] = useState<boolean>(false);

  useEffect(() => {
    if (activeSong) {
      const tempSongIndex = currentSongList.current.findIndex(
        (song) => song.id === activeSong.id,
      );
      activeSongIndex.current = tempSongIndex !== -1 ? tempSongIndex : 0;
      setIsPlaying(true);
    }
  }, [activeSong]);

  const nextSong = () => {
    setIsPlaying(false);
    const nextSongIndex = shuffle
      ? Math.floor(Math.random() * currentSongList.current.length)
      : (activeSongIndex.current + 1) % currentSongList.current.length;

    setActiveSong(currentSongList.current[nextSongIndex]);
  };

  const prevSong = () => {
    setIsPlaying(false);
    const prevSongIndex = shuffle
      ? Math.floor(Math.random() * currentSongList.current.length)
      : activeSongIndex.current === 0
        ? currentSongList.current.length - 1
        : activeSongIndex.current - 1;

    setActiveSong(currentSongList.current[prevSongIndex]);
  };

  return {
    playerControl: {
      activePlaylist,
      activeSong,
      isPlaying,
      shuffle,
      setShuffle,
      setIsPlaying,
      nextSong,
      prevSong,
    },
    seekControl: {
      seekTime,
      appTime,
      duration,
      setSeekTime,
      setAppTime,
      setDuration,
    },
    volumeControl: {
      volume,
      setVolume,
    },
  } as usePlayerHookProps;
};

export default usePlayer;

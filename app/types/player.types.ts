import type { PlaylistProp, SongProp } from "~/types/db.types";

export interface PlayerControlProp {
  activePlaylist: PlaylistProp;
  activeSong: SongProp | null;
  isPlaying: boolean;
  shuffle: boolean;
  setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlaying: (isPlaying: boolean) => void;
  nextSong: () => void;
  prevSong: () => void;
}

export interface SeekControlProp {
  seekTime: number;
  appTime: number;
  duration: number;
  setSeekTime: React.Dispatch<React.SetStateAction<number>>;
  setAppTime: React.Dispatch<React.SetStateAction<number>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
}

export interface VolumeControlProp {
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

export interface usePlayerHookProps {
  playerControl: PlayerControlProp;
  seekControl: SeekControlProp;
  volumeControl: VolumeControlProp;
}

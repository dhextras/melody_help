import { useState, useEffect } from "react";

import { SongProp } from "~/types/db.types";

export const usePlayer = (activeSongs: SongProp[]) => {
  const [currentSongs, setCurrentSongs] = useState<SongProp[]>(activeSongs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState<SongProp | null>(null);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    setCurrentSongs(activeSongs);
    setIsPlaying(false);
  }, [activeSongs]);

  useEffect(() => {
    if (currentSongs.length) {
      setIsPlaying(true);
      setActiveSong(currentSongs[currentIndex]);
      setIsActive(true);
    }
  }, [currentIndex, currentSongs]);

  const playPause = (play: boolean) => {
    setIsPlaying(play);
  };

  const nextSong = () => {
    playPause(false);
    if (!shuffle) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentSongs.length);
    } else {
      setCurrentIndex(Math.floor(Math.random() * currentSongs.length));
    }
  };

  const prevSong = () => {
    if (currentIndex === 0) {
      setCurrentIndex(currentSongs.length - 1);
    } else if (shuffle) {
      setCurrentIndex(Math.floor(Math.random() * currentSongs.length));
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return {
    currentSongs,
    setCurrentSongs,
    currentIndex,
    setCurrentIndex,
    isActive,
    isPlaying,
    activeSong,
    duration,
    seekTime,
    appTime,
    volume,
    repeat,
    shuffle,
    playPause,
    nextSong,
    prevSong,
    setDuration,
    setSeekTime,
    setAppTime,
    setVolume,
    setRepeat,
    setShuffle,
  };
};

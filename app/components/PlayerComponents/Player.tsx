import React, { useEffect, useRef } from "react";

import type {
  PlayerControlProp,
  SeekControlProp,
  VolumeControlProp,
} from "~/types/player.types";

interface PlayerProps {
  playerControl: PlayerControlProp;
  seekControl: SeekControlProp;
  volumeControl: VolumeControlProp;
}

export default function Player({
  playerControl,
  seekControl,
  volumeControl,
}: PlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!playerControl.activeSong) return null;

  useEffect(() => {
    if (audioRef.current) {
      if (playerControl.isPlaying && audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playerControl.isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeControl.volume;
    }
  }, [volumeControl.volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = seekControl.seekTime;
    }
  }, [seekControl.seekTime]);

  useEffect(() => {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: playerControl.activePlaylist.title,
      artist: playerControl.activeSong?.title || "Unkown", // the artist and album props are using title and producer bcz we are dealing with playlist based songs.
      album: playerControl.activeSong?.producer || "Unkown",
      artwork: [
        {
          src: playerControl.activePlaylist.thumbnailImage,
          sizes: "128x128",
          type: "image/png",
        },
      ],
    });
  }, [playerControl.activeSong]);

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", () => {
        playerControl.setIsPlaying(true);
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        playerControl.setIsPlaying(false);
      });

      navigator.mediaSession.setActionHandler("previoustrack", () => {
        playerControl.prevSong();
      });

      navigator.mediaSession.setActionHandler("nexttrack", () => {
        playerControl.nextSong();
      });

      navigator.mediaSession.setActionHandler("seekto", (event) => {
        if (event.seekTime) seekControl.setSeekTime(event.seekTime);
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        if (audioRef.current?.paused) {
          playerControl.setIsPlaying(true);
        } else {
          playerControl.setIsPlaying(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerControl.activePlaylist]);

  return (
    <audio
      src={playerControl.activeSong.path}
      ref={audioRef}
      onEnded={playerControl.nextSong}
      onTimeUpdate={(event: React.SyntheticEvent<HTMLAudioElement>) =>
        seekControl.setAppTime(event.currentTarget.currentTime)
      }
      onLoadedData={(event: React.SyntheticEvent<HTMLAudioElement>) => {
        seekControl.setDuration(event.currentTarget.duration);
        if (!document.hasFocus()) playerControl.setIsPlaying(false);
        else playerControl.setIsPlaying(true);
      }}
    />
  );
}

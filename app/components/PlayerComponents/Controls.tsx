import { Pause, Play, Shuffle, SkipBack, SkipForward } from "lucide-react";

import type { PlayerControlProp } from "~/types/player.types";

export default function Controls({
  playerControl,
}: {
  playerControl: PlayerControlProp;
}) {
  return (
    <div className="flex items-center justify-around gap-2 md:w-36 lg:w-52 2xl:w-80">
      <SkipBack
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={playerControl.prevSong}
      />
      {playerControl.isPlaying ? (
        <Pause
          size={45}
          color="#FFF"
          onClick={() => playerControl.setIsPlaying(false)}
          className="cursor-pointer"
        />
      ) : (
        <Play
          size={45}
          color="#FFF"
          onClick={() => playerControl.setIsPlaying(true)}
          className="cursor-pointer"
        />
      )}
      <SkipForward
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={playerControl.nextSong}
      />
      <Shuffle
        size={20}
        color={playerControl.shuffle ? "green" : "white"}
        onClick={() => playerControl.setShuffle((prev) => !prev)}
        className="cursor-pointer"
      />
    </div>
  );
}

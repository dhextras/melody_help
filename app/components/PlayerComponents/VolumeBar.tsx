import React from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";

import type { VolumeControlProp } from "~/types/player.types";

export default function VolumeBar({
  volumeControl,
}: {
  volumeControl: VolumeControlProp;
}) {
  const volumeRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="hidden flex-1 items-center justify-end lg:flex">
      {volumeControl.volume <= 1 && volumeControl.volume > 0.5 && (
        <Volume2
          size={25}
          color="#FFF"
          onClick={() => volumeControl.setVolume(0)}
        />
      )}
      {volumeControl.volume <= 0.5 && volumeControl.volume > 0 && (
        <Volume1
          size={25}
          color="#FFF"
          onClick={() => volumeControl.setVolume(0)}
        />
      )}
      {volumeControl.volume === 0 && (
        <VolumeX
          size={25}
          color="#FFF"
          onClick={() => volumeControl.setVolume(1)}
        />
      )}
      <input
        type="range"
        step="any"
        ref={volumeRef}
        value={volumeControl.volume}
        onChange={() =>
          volumeControl.setVolume(volumeRef.current!.valueAsNumber)
        }
        min={0}
        max={1}
        className="ml-2 h-1 md:w-32 lg:w-32 2xl:w-40"
      />
    </div>
  );
}

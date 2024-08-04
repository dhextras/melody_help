import React from "react";
import { Volume2, Volume1, VolumeX } from "lucide-react";

interface VolumeBarProps {
  value: number;
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setVolume: (value: number) => void;
}

export default function VolumeBar({
  value,
  min,
  max,
  onChange,
  setVolume,
}: VolumeBarProps) {
  return (
    <div className="hidden flex-1 items-center justify-end lg:flex">
      {value <= 1 && value > 0.5 && (
        <Volume2 size={25} color="#FFF" onClick={() => setVolume(0)} />
      )}
      {value <= 0.5 && value > 0 && (
        <Volume1 size={25} color="#FFF" onClick={() => setVolume(0)} />
      )}
      {value === 0 && (
        <VolumeX size={25} color="#FFF" onClick={() => setVolume(1)} />
      )}
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        className="ml-2 h-1 md:w-32 lg:w-32 2xl:w-40"
      />
    </div>
  );
}

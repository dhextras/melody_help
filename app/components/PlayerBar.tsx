import { useState } from "react";

import formatTime from "~/utils/formateTime";

import type { SongProp } from "~/types/db.types";

export default function PlayerBar({
  currentSong,
}: {
  currentSong: SongProp | null;
}) {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">{currentSong.title}</h3>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
      </div>
    </div>
  );
}

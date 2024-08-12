import { Pause, Play } from "lucide-react";

import type { SongProp } from "~/types/db.types";

export default function SongCard({
  index,
  song,
  songHooks,
}: {
  index: number;
  song: SongProp;
  songHooks: {
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    activeSong: SongProp | null;
    setActiveSong: (song: SongProp | null) => void;
  };
}) {
  return (
    <div
      key={song.id}
      onClick={() => {
        songHooks.setActiveSong(song);
        songHooks.setIsPlaying(!songHooks.isPlaying);
      }}
      className="group flex cursor-pointer items-center justify-between gap-10 rounded-lg bg-secondary p-4 text-textPrimary opacity-70 transition-colors hover:opacity-100 sm:gap-32"
    >
      <div className="flex items-center space-x-1 font-bold sm:space-x-4">
        <div className="flex w-6 justify-center">
          {songHooks.isPlaying && songHooks.activeSong?.id === song.id ? (
            <Pause size={20} className="fill-action text-action" />
          ) : (
            <>
              <p className="text-md flex font-bold transition duration-150 group-hover:hidden">
                {index + 1}
              </p>
              <Play
                size={20}
                className="hidden fill-textPrimary group-hover:flex"
              />
            </>
          )}
        </div>
        <span className="w-32 truncate sm:w-52 lg:w-64 xl:w-72 2xl:w-96">
          {song.title}
        </span>
      </div>
      <div className="flex w-full gap-6 font-semibold">
        <div className="hidden w-36 sm:flex md:w-64">
          <span className="truncate">{song.producer} </span>
        </div>
        <span className="mx-auto hidden w-32 lg:flex">
          {new Date(song.date_uploaded).toLocaleTimeString()}
        </span>
        <span className="ml-auto w-10">
          {song.time === 0 || isNaN(song.time)
            ? "--:--"
            : new Date(song.time * 1000).toISOString().substring(14, 19)}
        </span>
        <span className="ml-auto w-10">{song.time}</span>
      </div>
    </div>
  );
}

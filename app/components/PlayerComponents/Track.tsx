import type { PlayerControlProp } from "~/types/player.types";

export default function Track({
  playerControl,
}: {
  playerControl: PlayerControlProp;
}) {
  if (!playerControl.activeSong) return null;

  return (
    <div className="flex flex-1 items-center justify-start py-2">
      <div
        className={`${
          playerControl.isPlaying &&
          playerControl.activeSong &&
          playerControl.activePlaylist
            ? "animate-[spin_3s_linear_infinite]"
            : ""
        } hidden h-16 w-16 sm:block`}
      >
        <img
          src={playerControl.activePlaylist.thumbnailImage}
          alt="Image"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="ml-5 w-[50%]">
        <p className="truncate text-lg font-bold text-white">
          {playerControl.activePlaylist.title}
        </p>
        <p className="truncate text-gray-300">
          {playerControl.activeSong.title}
        </p>
      </div>
    </div>
  );
}

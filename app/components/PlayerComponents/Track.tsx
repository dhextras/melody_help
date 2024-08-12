import type { PlayerControlProp } from "~/types/player.types";

export default function Track({
  playerControl,
}: {
  playerControl: PlayerControlProp;
}) {
  if (!playerControl.activeSong) return null;

  return (
    <div className="flex flex-1 items-center justify-start text-textPrimary">
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
      <div className="mb-2 ml-4 max-w-[30vw] sm:max-w-[35vw]">
        <p className="truncate text-xl font-bold">
          {playerControl.activePlaylist.title}{" "}
          fkldsjl;fsjda;lfjl;asjkfdsafdsjakfldsajl;fjsda;lfjsd;afjskdla;jfkds
        </p>
        <p className="ml-[0.02rem] mt-[-0.2rem] truncate text-[0.8rem] font-semibold opacity-70">
          {playerControl.activeSong.title} f;dslj l;fdjsa ;ljfsadl; jdsl;k
          jdfsa;kj l;fdskaj l;fsdj l;fsdjl;
        </p>
      </div>
    </div>
  );
}

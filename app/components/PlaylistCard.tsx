import { useNavigate, useNavigation } from "@remix-run/react";

import { Loader2, Pause, Play } from "lucide-react";

import type { PlaylistProp } from "~/types/db.types";

export default function PlaylistCard({
  playlist,
  active,
  setActivePlaylist,
}: {
  playlist: PlaylistProp;
  active: boolean;
  setActivePlaylist: (playlist: PlaylistProp | null) => void;
}) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return (
    <div
      className="group flex h-fit animate-slideup cursor-pointer flex-col rounded-lg bg-secondary p-6"
      onClick={() => {
        if (!active) {
          navigate(`/playlist/${playlist.id}`);
        } else {
          setActivePlaylist(null);
        }
      }}
    >
      <div className="relative w-full overflow-hidden rounded-md">
        <div
          className={`absolute inset-0 items-center justify-center bg-gray-300/15 group-hover:flex ${
            active ? "flex" : "hidden"
          }`}
        >
          {!isLoading ? (
            !active ? (
              <Play
                className="cursor-pointer text-action"
                fill="rgb(var(--action-color))"
                size={35}
              />
            ) : (
              <Pause
                className="cursor-pointer text-action"
                fill="rgb(var(--action-color))"
                size={35}
              />
            )
          ) : (
            <Loader2 className="animate-spin text-action" size={40} />
          )}
        </div>
        <img
          src={playlist.coverImage}
          alt={playlist.title}
          className="w-full object-cover"
        />
      </div>
      <div className="mt-4 flex w-full gap-2 font-semibold">
        <div className="w-full overflow-hidden pr-2">
          <p className="truncate text-2xl font-bold text-textPrimary">
            {playlist.title}
          </p>
          <p className="truncate text-sm text-textPrimary opacity-75">
            {playlist.description}
          </p>
        </div>
        <div className="flex items-end">
          <p className="whitespace-nowrap text-sm font-semibold text-textPrimary opacity-75">
            {playlist.totalSongs} Songs
          </p>
        </div>
      </div>
    </div>
  );
}

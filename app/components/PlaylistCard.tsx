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
      className="group flex h-fit animate-slideup cursor-pointer flex-col rounded-lg bg-[#191624] bg-opacity-80 p-6"
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
          className={`absolute inset-0 items-center justify-center bg-[#191624] bg-opacity-50 group-hover:flex ${
            active ? "flex" : "hidden"
          }`}
        >
          {!isLoading ? (
            !active ? (
              <Play className="cursor-pointer text-white" size={30} />
            ) : (
              <Pause className="cursor-pointer text-white" size={30} />
            )
          ) : (
            <Loader2 className="animate-spin text-white" size={40} />
          )}
        </div>
        <img
          src={playlist.coverImage}
          alt={playlist.title}
          className="w-full object-cover"
        />
      </div>
      <div className="mt-4 flex w-full gap-2">
        <div className="w-full overflow-hidden pr-2">
          <p className="truncate text-lg font-bold text-white">
            {playlist.title}
          </p>
          <p className="truncate text-sm text-gray-100">
            {playlist.description}
          </p>
        </div>
        <div className="flex items-end">
          <p className="whitespace-nowrap font-semibold text-green-300">
            {playlist.totalSongs} Songs
          </p>
        </div>
      </div>
    </div>
  );
}

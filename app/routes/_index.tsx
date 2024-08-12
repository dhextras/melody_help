import {
  Await,
  defer,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { Suspense } from "react";

import PlaylistCard from "~/components/PlaylistCard";
import { getPlaylists } from "~/db/utils";

import type { PlaylistProp } from "~/types/db.types";

export const loader = async () => {
  const playlists = getPlaylists();

  return defer({
    playlists: playlists,
  });
};

export default function Index() {
  const { playlists } = useLoaderData<{
    playlists: PlaylistProp[];
  }>();

  const { setActivePlaylist, activePlaylist } = useOutletContext<{
    setActivePlaylist: (playlist: PlaylistProp | null) => void;
    activePlaylist: PlaylistProp | null;
  }>();

  return (
    <div className="flex h-full flex-col px-4 py-8">
      <h1 className="mb-6 text-center text-6xl font-bold">
        <span className="bg-gradient-to-r from-textPrimary from-[-50%] via-action via-50% to-textPrimary to-[150%] bg-clip-text text-transparent">
          MoodTunes
        </span>
      </h1>
      {/* Solve grid row height issue - If you find any other method then to use the parent wrapper */}
      <div className="m-4 flex-grow overflow-y-auto rounded-lg">
        <Suspense
          fallback={
            <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[1.1] w-full animate-pulse rounded-lg bg-secondary opacity-90"
                ></div>
              ))}
            </div>
          }
        >
          <Await
            resolve={playlists}
            errorElement={
              <div className="h-full w-full content-center text-center text-red-500">
                <p className="text-3xl font-bold">
                  Error Loading song playlist. Please Reload...
                </p>
              </div>
            }
          >
            {(playlist: PlaylistProp[]) => (
              <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {" "}
                {playlist.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    setActivePlaylist={setActivePlaylist}
                    active={activePlaylist?.id === playlist.id}
                  />
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

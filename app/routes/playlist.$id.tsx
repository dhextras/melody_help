import {
  Await,
  defer,
  redirect,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { Pause, Play } from "lucide-react";
import { Suspense, useEffect } from "react";
import invariant from "tiny-invariant";

import { getPlaylists, getplaylistSongs } from "~/db/utils";
import { generateMeta } from "~/utils/generateMeta";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import type { PlaylistProp, SongProp } from "~/types/db.types";

export const meta: MetaFunction = generateMeta("Playlist");

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");

  const playlists = await getPlaylists();
  const playlist = playlists.find((c) => c.id === params.id);

  if (!playlist) {
    throw redirect("/");
  }

  const SongsPromise = getplaylistSongs(playlist.id);

  return defer({ playlist, SongsPromise });
};

export default function Playlist() {
  const { playlist, SongsPromise } = useLoaderData<{
    playlist: PlaylistProp;
    SongsPromise: SongProp[];
  }>();

  const { setActivePlaylist, setPlaylistSongs, songHooks } = useOutletContext<{
    setActivePlaylist: (playlist: PlaylistProp | null) => void;
    setPlaylistSongs: (songs: SongProp[]) => void;
    songHooks: {
      isPlaying: boolean;
      setIsPlaying: (isPlaying: boolean) => void;
      activeSong: SongProp | null;
      setActiveSong: (song: SongProp | null) => void;
    };
  }>();

  useEffect(() => {
    (async () => {
      setActivePlaylist(playlist);
      setPlaylistSongs([]);
      songHooks.setActiveSong(null);
      const songs = await SongsPromise;
      setPlaylistSongs(songs);
      songHooks.setActiveSong(songs[0] || null);
    })();
  }, [SongsPromise]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-64">
        <img
          src={playlist.coverImage}
          alt={playlist.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex gap-20 bg-gradient-to-t from-[#643838] to-transparent px-4 pb-4 pt-10">
          <div className="w-full overflow-hidden">
            <h1 className="mb-2 truncate text-5xl font-bold text-white">
              {playlist.title}
            </h1>
            <p className="truncate text-sm text-gray-300">
              {playlist.description}
            </p>
          </div>

          <div className="flex items-end">
            <p className="whitespace-nowrap text-2xl font-bold text-green-300">
              {playlist.totalSongs} Songs
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-grow overflow-y-auto bg-gray-600 p-4">
        <div></div>
        <div className="w-full space-y-4 overflow-y-auto">
          <Suspense
            fallback={
              // Replace this with the proper skeltons later
              <>
                {[...Array(20)].map((_, index) => (
                  <div
                    key={index}
                    className="w-full animate-pulse rounded-lg bg-gray-300 p-7"
                  ></div>
                ))}
              </>
            }
          >
            <Await
              resolve={SongsPromise}
              errorElement={
                <div className="h-full content-center text-center text-red-500">
                  <p className="text-3xl font-bold">
                    Error Loading Songs for {playlist.title}. Please Reload...
                  </p>
                </div>
              }
            >
              {(playlistSongs: SongProp[]) => (
                <>
                  {" "}
                  {playlistSongs.map((song, index) => (
                    <div
                      key={song.id}
                      onClick={() => {
                        songHooks.setActiveSong(song);
                        songHooks.setIsPlaying(!songHooks.isPlaying);
                      }}
                      className="group flex cursor-pointer items-center justify-between rounded-lg bg-gray-300 p-4 transition-colors hover:bg-green-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex w-6 justify-center">
                          {songHooks.isPlaying &&
                          songHooks.activeSong?.id === song.id ? (
                            <Pause size={20} color="black" />
                          ) : (
                            <>
                              <p className="text-md flex font-bold transition duration-150 group-hover:hidden">
                                {index + 1}
                              </p>
                              <Play
                                size={20}
                                color="black"
                                className="hidden group-hover:flex"
                              />
                            </>
                          )}
                        </div>
                        <span className="font-medium">{song.title}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        {song.author}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

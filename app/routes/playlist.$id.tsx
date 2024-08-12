import {
  Await,
  defer,
  Link,
  redirect,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { ChevronLeft, Timer } from "lucide-react";
import { Suspense, useEffect } from "react";
import invariant from "tiny-invariant";

import SongCard from "~/components/SongCard";
import { getPlaylists, getplaylistSongs } from "~/db/utils";
import { generateMeta } from "~/utils/generateMeta";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import type { PlaylistProp, SongProp } from "~/types/db.types";

export const meta: MetaFunction = generateMeta("Playlist");

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");

  const playlists = await getPlaylists();
  const playlist = playlists?.find((c) => c.id === params.id);

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
      setPlaylistSongs(songs || []);
      if (songs?.length > 0) {
        songHooks.setActiveSong(songs[0] || null);
      }
      songHooks.setActiveSong(null);
    })();
  }, [SongsPromise]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-48 font-bold text-textPrimary">
        <img
          src={playlist.cover_image}
          alt={playlist.title}
          className="h-full w-full object-cover"
        />
        <Link
          to={"/"}
          className="absolute left-4 top-4 flex rounded-full bg-action p-1 pr-1.5"
        >
          <ChevronLeft
            className="cursor-pointer font-bold text-textPrimary"
            size={28}
            strokeWidth="3.5"
          />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 flex gap-20 bg-gradient-to-t from-secondary from-[-30%] to-transparent to-95% px-4 pb-2 pt-10">
          <div className="w-full overflow-hidden">
            <h1 className="truncate text-[2.5rem] font-extrabold">
              {playlist.title}
            </h1>
            <p className="ml-1 mt-[-0.4rem] truncate text-[1.1rem] opacity-70">
              {playlist.description}
            </p>
          </div>

          <div className="flex items-end">
            <p className="whitespace-nowrap text-2xl opacity-70">
              {playlist.total_songs} Songs
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-grow flex-col overflow-y-auto px-4 py-2">
        <div className="flex items-center justify-between gap-10 rounded-lg px-4 text-sm font-bold text-textPrimary opacity-70 sm:gap-32">
          <div className="flex items-center space-x-1 sm:space-x-4">
            <div className="flex w-6 justify-center text-lg">
              <span>#</span>{" "}
            </div>
            <span className="w-26 truncate sm:w-52 lg:w-64 xl:w-72 2xl:w-96">
              Song Name
            </span>
          </div>
          <div className="flex w-full gap-10 font-semibold">
            <div className="hidden w-36 sm:flex md:w-64">
              <span className="truncate">Producer</span>
            </div>
            <span className="mx-auto hidden w-32 lg:flex">Date Added</span>
            <div className="ml-auto flex w-10 justify-start">
              <Timer size={20} className="font-semibold text-textPrimary" />
            </div>
          </div>
        </div>
        <div className="mx-4 mb-4 mt-1 border-b-2 border-textPrimary"></div>
        <div className="flex-grow space-y-2 overflow-y-auto">
          <Suspense
            fallback={
              <>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="w-full animate-pulse rounded-lg bg-secondary p-7 opacity-90"
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
                    Error Loading Songs for playlist '{playlist.title}'. Please
                    Reload...
                  </p>
                </div>
              }
            >
              {(playlistSongs: SongProp[] | null) => (
                <>
                  {playlistSongs && playlistSongs.length > 0 ? (
                    playlistSongs.map((song, index) => (
                      <SongCard
                        song={song}
                        songHooks={songHooks}
                        index={index}
                      />
                    ))
                  ) : (
                    <div className="h-full content-center text-center text-action">
                      <p className="text-3xl font-bold">
                        There is 0 Songs available for playlist '
                        {playlist.title}'. Please Upload some to listen..
                      </p>
                    </div>
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

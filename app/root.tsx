import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";

import Header from "~/components/Header";
import MusicPlayer from "~/components/MusicPlayer";
import { generateMeta } from "~/utils/generateMeta";

import type { MetaFunction } from "@remix-run/node";
import type { PlaylistProp, SongProp } from "~/types/db.types";

import "~/styles/root.css";

export const meta: MetaFunction = generateMeta("Home");

export default function App() {
  const [playlistSongs, setPlaylistSongs] = useState<SongProp[] | []>([]);
  const [activePlaylist, setActivePlaylist] = useState<PlaylistProp | null>(
    null,
  );
  const [activeSong, setActiveSong] = useState<SongProp | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const songHooks = { activeSong, setActiveSong, isPlaying, setIsPlaying };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark-mode absolute inset-0 flex flex-col">
        <Header />

        <main className="flex-grow overflow-y-auto bg-primary">
          <Outlet
            context={{
              setActivePlaylist,
              activePlaylist,
              setPlaylistSongs,
              setActiveSong,
              songHooks,
            }}
          />
        </main>
        {activePlaylist && playlistSongs.length > 0 && (
          <MusicPlayer
            playlistSongs={playlistSongs}
            activePlaylist={activePlaylist}
            songHooks={songHooks}
          />
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

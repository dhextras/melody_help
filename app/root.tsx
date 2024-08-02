import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import PlayerBar from "~/components/PlayerBar";
import { generateMeta } from "~/utils/generateMeta";

import type { MetaFunction } from "@remix-run/node";
import type { SongProp } from "~/types/db.types";

import "~/styles/root.css";
import "~/styles/tailwind.css";
import Header from "./components/Header";

export const meta: MetaFunction = generateMeta("Root");

/**
 * Root component that renders the main structure of the application.
 * @param {React.ReactNode} children - The content to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
export default function App() {
  const [currentSong, setCurrentSong] = useState<SongProp | null>(null);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main>
          <Outlet context={{ setCurrentSong }} />
        </main>
        <PlayerBar currentSong={currentSong} />
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import MusicPlayer from "~/components/MusicPlayer";
import { generateMeta } from "~/utils/generateMeta";
import Header from "./components/Header";

import type { MetaFunction } from "@remix-run/node";
import type { CategoryProp, SongProp } from "~/types/db.types";

import "~/styles/root.css";

export const meta: MetaFunction = generateMeta("Home");

export default function App() {
  const [activeSongs, setActiveSongs] = useState<SongProp[] | []>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryProp | null>(
    null,
  );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="absolute inset-0 flex flex-col">
        <Header />
        <main className="flex-grow overflow-y-auto bg-green-600">
          <Outlet
            context={{ setActiveSongs, setActiveCategory, activeCategory }}
          />
        </main>
        <MusicPlayer
          activeSongs={activeSongs}
          activeCategory={activeCategory}
        />
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

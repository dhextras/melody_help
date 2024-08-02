import invariant from "tiny-invariant";
import {
  json,
  redirect,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";

import { getCategories, getSongs } from "~/db/utils";
import formatTime from "~/utils/formateTime";

import type { LoaderFunctionArgs } from "@remix-run/node";
import type { Categories, SongProp } from "~/types/db.types";

/**
 * Loads the category and its corresponding songs based on the provided category ID.
 *
 * @param {LoaderFunctionArgs} params - The parameters for the loader function.
 * @param {string} params.id - The ID of the category to load.
 * @throws {Response} Throws a Response object with a status of 404 if the category is not found.
 * @return {Promise<{category: Categories, categorySongs: SongProp[]}>} A promise that resolves to an object containing the loaded category and its songs.
 */

/**
 * Loads the category and its corresponding songs based on the provided category ID.
 *
 * @param {LoaderFunctionArgs} params - The parameters for the loader function.
 * @param {string} params.id - The ID of the category to load.
 * @throws {Response} Throws a Response object with a status of 404 if the category is not found.
 * @return {Promise<{category: Categories, categorySongs: SongProp[]}>} A promise that resolves to an object containing the loaded category and its songs.
 */
export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");

  const categories = await getCategories();
  const songs = await getSongs();

  const category = categories.find((c) => c.id === params.id);
  if (!category) {
    throw redirect("/");
  }

  const categorySongs = songs[params.id] || [];

  return json({ category, categorySongs });
};

export default function Category() {
  const { category, categorySongs } = useLoaderData<{
    category: Categories;
    categorySongs: SongProp[];
  }>();

  const { setCurrentSong } = useOutletContext<{
    setCurrentSong: (song: SongProp) => void;
  }>();

  return (
    <div>
      <div className="relative h-64 mb-8">
        <img
          src={category.coverImage}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
          <h1 className="text-4xl font-bold text-white">{category.name}</h1>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <ul>
          {categorySongs.map((song) => (
            <li
              key={song.id}
              className="mb-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors group"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{song.title}</span>
                <div className="flex items-center space-x-4">
                  <span>{formatTime(song.duration)}</span>
                  <button
                    onClick={() => setCurrentSong(song)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ▶
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

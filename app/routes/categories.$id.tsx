import {
  json,
  redirect,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";

import { getCategories, getSongs } from "~/db/utils";
import formatTime from "~/utils/formateTime";

import type { LoaderFunctionArgs } from "@remix-run/node";
import type { CategoryProp, SongProp } from "~/types/db.types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");

  const categories = await getCategories();
  const songs = await getSongs();

  const category = categories.find((c) => c.id === params.id);
  if (!category) {
    throw redirect("/");
  }

  const categorySongs = songs.filter((s) => s.categoryId === category.id) || [];

  return json({ category, categorySongs });
};

export default function Category() {
  const { category, categorySongs } = useLoaderData<{
    category: CategoryProp;
    categorySongs: SongProp[];
  }>();

  const { setActiveSongs, setActiveCategory } = useOutletContext<{
    setActiveCategory: (category: CategoryProp) => void;
    setActiveSongs: (song: SongProp[]) => void;
  }>();

  useEffect(() => {
    setActiveCategory(category);
    setActiveSongs(categorySongs);
  }, [category]);

  return (
    <div>
      <div className="relative h-64 mb-8">
        <img
          src={category.coverImage}
          alt={category.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
          <h1 className="text-4xl font-bold text-white">{category.title}</h1>
          <p className="text-sm text-gray-300 truncate">
            {category.description}
          </p>
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
                  <span>{formatTime(250)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

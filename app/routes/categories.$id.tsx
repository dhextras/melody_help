import {
  Await,
  defer,
  redirect,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { Suspense, useEffect } from "react";
import invariant from "tiny-invariant";

import { getCategories, getcategorySongs } from "~/db/utils";
import formatTime from "~/utils/formateTime";

import type { LoaderFunctionArgs } from "@remix-run/node";
import type { CategoryProp, SongProp } from "~/types/db.types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");

  const categories = await getCategories();

  const category = categories.find((c) => c.id === params.id);
  if (!category) {
    throw redirect("/");
  }

  const categorySongs = getcategorySongs(category.id);

  return defer({ category, categorySongs });
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
    (async () => {
      setActiveCategory(category);
      const songs = await categorySongs;
      setActiveSongs(songs);
    })();
  }, [categorySongs]);

  return (
    <div className="h-full w-full">
      <div className="relative mb-8 h-64">
        <img
          src={category.coverImage}
          alt={category.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
          <h1 className="text-4xl font-bold text-white">{category.title}</h1>
          <p className="truncate text-sm text-gray-300">
            {category.description}
          </p>
        </div>
      </div>
      <div className="mx-auto h-72 w-full px-4">
        <Suspense
          fallback={
            // Replace this with the proper skeltons later
            <div className="h-full overflow-y-auto">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className="mb-4 aspect-[25] w-full animate-pulse rounded-lg bg-gray-300 p-4"
                ></div>
              ))}
            </div>
          }
        >
          <Await
            resolve={categorySongs}
            errorElement={
              <div className="text-red-500">
                Something went wrong. Please try again later.
              </div>
            }
          >
            {(categorySongs: SongProp[]) => (
              <ul className="h-full space-y-4 overflow-y-auto">
                {categorySongs.map((song) => (
                  <li
                    key={song.id}
                    className="group rounded-lg bg-gray-300 p-4 transition-colors hover:bg-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{song.title}</span>
                      <div className="flex items-center space-x-4">
                        <span>{formatTime(250)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

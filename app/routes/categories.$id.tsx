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

  const { setActiveSongsList, setActiveCategory } = useOutletContext<{
    setActiveCategory: (category: CategoryProp) => void;
    setActiveSongsList: (song: SongProp[]) => void;
  }>();

  useEffect(() => {
    (async () => {
      setActiveCategory(category);
      const songs = await categorySongs;
      setActiveSongsList(songs);
    })();
  }, [categorySongs]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-64">
        <img
          src={category.coverImage}
          alt={category.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 flex gap-20 bg-gradient-to-t from-[#643838] to-transparent px-4 pb-4 pt-10">
          <div className="w-full overflow-hidden">
            <h1 className="mb-2 truncate text-5xl font-bold text-white">
              {category.title}
            </h1>
            <p className="truncate text-sm text-gray-300">
              {category.description}
            </p>
          </div>

          <div className="flex items-end">
            <p className="whitespace-nowrap text-2xl font-bold text-green-300">
              {category.totalSongs} Songs
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
              resolve={categorySongs}
              errorElement={
                <div className="h-full content-center text-center text-red-500">
                  <p className="text-3xl font-bold">
                    Error Loading Songs for {category.title}. Please Reload...
                  </p>
                </div>
              }
            >
              {(categorySongs: SongProp[]) => (
                <>
                  {" "}
                  {categorySongs.map((song, index) => (
                    <div
                      key={song.id}
                      className="group rounded-lg bg-gray-300 p-4 transition-colors hover:bg-green-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          {index + 1}{" "}
                          <span className="font-medium">{song.title}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          {song.author}
                        </div>
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

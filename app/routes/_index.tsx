import { json, Link, useLoaderData } from "@remix-run/react";

import { getCategories } from "~/db/utils";

import type { CategoryProp } from "~/types/db.types";

export const loader = async () => {
  const categories = await getCategories();
  return json({ categories });
};

export default function Index() {
  const { categories } = useLoaderData<{ categories: CategoryProp[] }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to MoodTunes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <img
              src={category.coverImage}
              alt={category.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1 truncate">
                  {category.title}
                </h2>
                <p className="text-sm text-gray-300 truncate">
                  {category.description}
                </p>
              </div>
              <div className="flex bg-red-100">
                <p className="text-white font-semibold my-auto">
                  {category.totalSongs} Songs
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

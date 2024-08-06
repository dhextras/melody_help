import {
  Await,
  defer,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { Suspense } from "react";

import CategoryCard from "~/components/CategoryCard";
import { getCategories } from "~/db/utils";

import type { CategoryProp } from "~/types/db.types";

export const loader = () => {
  const categories = getCategories();
  return defer({ categories: categories });
};

export default function Index() {
  const { categories } = useLoaderData<{ categories: CategoryProp[] }>();

  const { setActiveCategory, activeCategory } = useOutletContext<{
    setActiveCategory: (category: CategoryProp | null) => void;
    activeCategory: CategoryProp | null;
  }>();

  return (
    <div className="flex h-full flex-col bg-[#191624] px-4 py-8">
      {/* Use some gradiant to style the name of the app later */}
      <h1 className="mb-6 text-center text-6xl font-bold text-white">
        Welcome to MoodTunes
      </h1>
      {/* Solve grid row height issue - If you find any other method then to use the parent wrapper */}
      <div className="flex-grow overflow-y-auto rounded-lg bg-gray-600 p-4">
        <div className="grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Suspense
            fallback={
              // Replace this with the proper skeltons later
              <>
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-[1.1] w-full animate-pulse rounded-lg bg-[#191624] opacity-80"
                  ></div>
                ))}
              </>
            }
          >
            <Await
              resolve={categories}
              errorElement={
                <div className="h-full content-center text-center text-red-500">
                  <p className="text-3xl font-bold">
                    Error Loading song categories. Please Reload...
                  </p>
                </div>
              }
            >
              {(categories: CategoryProp[]) => (
                <>
                  {" "}
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      setActiveCategory={setActiveCategory}
                      active={activeCategory?.id === category.id}
                    />
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

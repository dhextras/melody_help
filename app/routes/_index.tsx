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
    <div className="container mx-auto h-full bg-[#191624] px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Welcome to MoodTunes
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={
            // Replace this with the proper skeltons later
            <>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-[1.5] w-full animate-pulse rounded-lg bg-white/5 bg-opacity-80"
                ></div>
              ))}
            </>
          }
        >
          <Await
            resolve={categories}
            errorElement={
              <div className="text-red-500">
                Something went wrong. Please try again later.
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
  );
}

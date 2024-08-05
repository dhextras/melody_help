import { useNavigate, useNavigation } from "@remix-run/react";

import { Loader2, Pause, Play } from "lucide-react";

import type { CategoryProp } from "~/types/db.types";

export default function CategoryCard({
  category,
  active,
  setActiveCategory,
}: {
  category: CategoryProp;
  active: boolean;
  setActiveCategory: (category: CategoryProp | null) => void;
}) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  return (
    <div
      className="group flex h-fit animate-slideup cursor-pointer flex-col rounded-lg bg-[#191624] bg-opacity-80 p-6"
      onClick={() => {
        if (!active) {
          setActiveCategory(category);
          navigate(`/categories/${category.id}`);
        } else {
          setActiveCategory(null);
        }
      }}
    >
      <div className="relative w-full overflow-hidden rounded-md">
        <div
          className={`absolute inset-0 items-center justify-center bg-[#191624] bg-opacity-50 group-hover:flex ${
            active ? "flex" : "hidden"
          }`}
        >
          {!isLoading ? (
            !active ? (
              <Play className="cursor-pointer text-white" size={30} />
            ) : (
              <Pause className="cursor-pointer text-white" size={30} />
            )
          ) : (
            <Loader2 className="animate-spin text-white" size={40} />
          )}
        </div>
        <img
          src={category.coverImage}
          alt={category.title}
          className="w-full object-cover"
        />
      </div>
      <div className="mt-4 flex w-full gap-2">
        <div className="overflow-hidden pr-2">
          <p className="truncate text-lg font-bold text-white">
            {category.title}
          </p>
          <p className="truncate text-sm text-gray-100">
            {category.description}
          </p>
        </div>
        <div className="flex items-end">
          <p className="whitespace-nowrap font-semibold text-green-300">
            {category.totalSongs} Songs
          </p>
        </div>
      </div>
    </div>
  );
}

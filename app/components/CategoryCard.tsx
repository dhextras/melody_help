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
    <div className="relative flex animate-slideup cursor-pointer flex-col rounded-lg bg-white/5 bg-opacity-80 p-6">
      <div
        className="group relative w-full overflow-hidden rounded-md"
        onClick={() => {
          if (!active) {
            setActiveCategory(category);
            navigate(`/categories/${category.id}`);
          } else {
            setActiveCategory(null);
          }
        }}
      >
        <div
          className={`absolute inset-0 items-center justify-center bg-[#191624] bg-opacity-50 group-hover:flex ${
            active ? "flex bg-[#191624] bg-opacity-70" : "hidden"
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
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-col">
          <p className="truncate text-lg font-semibold text-white">
            {category.title}
          </p>
          <p className="mt-1 truncate text-sm text-gray-300">
            {category.description}
          </p>
        </div>
        <div className="bg-red-100">
          <p className="my-auto font-semibold text-white">
            {category.totalSongs} Songs
          </p>
        </div>
      </div>
    </div>
  );
}

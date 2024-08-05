import type { CategoryProp, SongProp } from "~/types/db.types";

interface TrackProps {
  isPlaying: boolean;
  isActive: boolean;
  activeCategory: CategoryProp;
  activeSong: SongProp;
}

export default function Track({
  isPlaying,
  isActive,
  activeCategory,
  activeSong,
}: TrackProps) {
  if (!activeSong) return null;

  return (
    <div className="flex flex-1 items-center justify-start py-2">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden h-16 w-16 sm:block`}
      >
        <img
          src={activeCategory.thumbnailImage}
          alt="Image"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="ml-5 w-[50%]">
        <p className="truncate text-lg font-bold text-white">
          {activeCategory.title}
        </p>
        <p className="truncate text-gray-300">{activeSong.title}</p>
      </div>
    </div>
  );
}

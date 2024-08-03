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
    <div className="flex-1 flex items-center justify-start">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={activeCategory.thumbnailImage}
          alt="Image"
          className="object-cover rounded-full w-full h-full"
        />
      </div>
      <div className="w-[50%]">
        <p className="truncate text-white font-bold text-lg">
          {activeCategory.title}
        </p>
        <p className="truncate text-gray-300">{activeSong.title}</p>
      </div>
    </div>
  );
}

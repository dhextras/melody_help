import type { CategoryProp, SongProp } from "~/types/db.types";

const focusSongs: SongProp[] = Array.from({ length: 37 }, (_, i) => ({
  id: `focus${i + 1}`,
  title: `Focus Song ${i + 1}`,
  categoryId: "focus",
  author: "dhextras",
  path: `/test_song.wav`, // Don't push this to github MF :(
}));

const relaxSongs: SongProp[] = Array.from({ length: 24 }, (_, i) => ({
  id: `relax${i + 1}`,
  title: `Relax Song ${i + 1}`,
  categoryId: "relax",
  author: "dhextras",
  path: `/test_song_2.wav`, // Don't push this to github MF :(
}));

const energizeSongs: SongProp[] = Array.from({ length: 20 }, (_, i) => ({
  id: `energize${i + 1}`,
  title: `Energize Song ${i + 1}`,
  categoryId: "energize",
  author: "dhextras",
  path: `/test_song.wav`,
}));

export const fakeCategories: CategoryProp[] = [
  {
    id: "focus",
    title: "Focus",
    description: "Concentrate with calm, instrumental tracks",
    coverImage: "/image.png",
    thumbnailImage: "/image.png",
    totalSongs: focusSongs.length,
  },
  {
    id: "relax",
    title: "Relax",
    description: "Unwind with soothing melodies",
    coverImage: "/image.png",
    thumbnailImage: "/image.png",
    totalSongs: relaxSongs.length,
  },
  {
    id: "energize",
    title: "Energize",
    description: "Get pumped with upbeat tunes",
    coverImage: "/image.png",
    thumbnailImage: "/image.png",
    totalSongs: energizeSongs.length,
  },
];

export const fakeSongs: SongProp[] = [
  ...focusSongs,
  ...relaxSongs,
  ...energizeSongs,
];

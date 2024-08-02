import type { Categories, Songs } from "~/types/db.types";

export const fakeCategories: Categories[] = [
  {
    id: "focus",
    name: "Focus",
    description: "Concentrate with calm, instrumental tracks",
    coverImage: "/image.png",
  },
  {
    id: "relax",
    name: "Relax",
    description: "Unwind with soothing melodies",
    coverImage: "/image.png",
  },
  {
    id: "energize",
    name: "Energize",
    description: "Get pumped with upbeat tunes",
    coverImage: "/image.png",
  },
];

export const fakeSongs: Songs = {
  focus: Array.from({ length: 100 }, (_, i) => ({
    id: `focus${i + 1}`,
    title: `Fake Song ${i + 1}`,
    duration: Math.floor(Math.random() * 200) + 60,
  })),
  relax: Array.from({ length: 100 }, (_, i) => ({
    id: `relax${i + 1}`,
    title: `Fake Relax ${i + 1}`,
    duration: Math.floor(Math.random() * 200) + 60,
  })),
  energize: Array.from({ length: 100 }, (_, i) => ({
    id: `energize${i + 1}`,
    title: `Fake Energize ${i + 1}`,
    duration: Math.floor(Math.random() * 200) + 60,
  })),
};

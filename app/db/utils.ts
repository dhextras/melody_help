import { fakeCategories, fakeSongs } from "~/db/fakedata";

import type { CategoryProp, SongProp } from "~/types/db.types";

/**
 * Retrieves the categories asynchronously.
 *
 * @return {Promise<CategoryProp[]>} A promise that resolves to an array of songs Categories.
 */
export const getCategories = async (): Promise<CategoryProp[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return fakeCategories;
};

/**
 * Asynchronously retrieves the songs belonging to a specific category.
 *
 * @param {string} categoryId - The ID of the category to filter songs by.
 * @return {Promise<SongProp[]>} A promise that resolves to an array of
 * SongProp objects belonging to the specified category.
 */
export const getcategorySongs = async (
  categoryId: string,
): Promise<SongProp[]> => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return fakeSongs.filter((song) => song.categoryId === categoryId);
};

import { fakeCategories, fakeSongs } from "~/db/fakedata";

import type { Category, SongProp } from "~/types/db.types";

/**
 * Retrieves the categories asynchronously.
 *
 * @return {Promise<Category[]>} A promise that resolves to an array of songs Categories.
 */
export const getCategories = async (): Promise<Category[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fakeCategories;
};

/**
 * Retrieves the songs asynchronously.
 *
 * @return {Promise<SongProp[]>} A promise that resolves to an object containing the songs.
 */
export const getSongs = async (): Promise<SongProp[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fakeSongs;
};

import { fakeCategories, fakeSongs } from "~/db/fakedata";

import type { Categories, Songs } from "~/types/db.types";

/**
 * Retrieves the categories asynchronously.
 *
 * @return {Promise<Categories[]>} A promise that resolves to an array of songs Categories.
 */
export const getCategories = async (): Promise<Categories[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fakeCategories;
};

/**
 * Retrieves the songs asynchronously.
 *
 * @return {Promise<Songs>} A promise that resolves to an object containing the songs.
 */
export const getSongs = async (): Promise<Songs> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return fakeSongs;
};

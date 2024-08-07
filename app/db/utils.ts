import { fakePlaylist, fakeSongs } from "~/db/fakedata";

import type { PlaylistProp, SongProp } from "~/types/db.types";

/**
 * Retrieves the playlists asynchronously.
 *
 * @return {Promise<PlaylistProp[]>} A promise that resolves to an array of songs Playlists.
 */
export const getPlaylists = async (): Promise<PlaylistProp[]> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return fakePlaylist;
};

/**
 * Asynchronously retrieves the songs belonging to a specific playlist.
 *
 * @param {string} playlistId - The ID of the playlist to filter songs by.
 * @return {Promise<SongProp[]>} A promise that resolves to an array of
 * SongProp objects belonging to the specified playlist.
 */
export const getplaylistSongs = async (
  playlistId: string,
): Promise<SongProp[]> => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return fakeSongs.filter((song) => song.playlistId === playlistId);
};

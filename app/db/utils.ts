import { supabase } from "./auth";

import type { PlaylistProp, SongProp } from "~/types/db.types";

/**
 * Retrieves the playlists asynchronously.
 *
 * @return {Promise<PlaylistProp[]>} A promise that resolves to an array of songs Playlists.
 */
export const getPlaylists = async (): Promise<PlaylistProp[] | null> => {
  const { data, error } = await supabase.from("playlists").select("*");
  if (error || !data) {
    return null;
  }
  return data as PlaylistProp[];
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
): Promise<SongProp[] | null> => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("playlist_id", playlistId);
  if (error || !data) {
    return null;
  }
  return data as SongProp[];
};

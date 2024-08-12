export interface PlaylistProp {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  thumbnailImage: string;
  totalSongs: number;
}

export interface SongProp {
  id: string;
  playlistId: string;
  title: string;
  producer: string;
  path: string;
}

export interface PlaylistProp {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  thumbnail_image: string;
  total_songs: number;
}

export interface SongProp {
  id: string;
  title: string;
  playlist_id: string;
  path: string;
  producer: string;
  date_uploaded: string;
  time: number;
}

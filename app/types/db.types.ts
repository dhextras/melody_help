export interface CategoryProp {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  thumbnailImage: string;
  totalSongs: number;
}

export interface SongProp {
  id: string;
  categoryId: string;
  title: string;
  path: string;
}

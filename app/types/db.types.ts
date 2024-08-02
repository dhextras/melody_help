export interface Categories {
  id: string;
  name: string;
  description: string;
  coverImage: string;
}

export interface SongProp {
  id: string;
  title: string;
  duration: number;
}

export interface Songs {
  [key: string]: SongProp[];
}

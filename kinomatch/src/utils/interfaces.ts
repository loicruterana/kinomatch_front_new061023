//===========PROFILE PAGE 

export interface WatchedListEntry {
  id: number;
  user_id: string;
  film_id: string | null;
  createdAt: string;
  updatedAt: string;
}

export type WatchedListArray = WatchedListEntry[];

//---

export interface WatchedMoviesListEntry {
  movie_id: string | undefined;
  name: string;
}

export type WatchedMoviesObject = Record<number, WatchedMoviesListEntry | undefined>;

//---

export interface ToWatchListEntry {
  id: number;
  user_id: string;
  film_id: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

export type ToWatchListArray = ToWatchListEntry[];

//---

export interface toWatchMoviesEntry {
  movie_id?: string;
  name: string;
}

export type toWatchMoviesObject = Record<number , ToWatchListEntry | undefined>;

//---

export interface BookmarkedListEntry {
  id: number;
  user_id: string;
  film_id: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BookmarkedListObject = Record<number , BookmarkedListEntry | undefined>;





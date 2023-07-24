//===========PROFILE PAGE 

export interface WatchedListEntry {
  id: number;
  user_id: string;
  film_id: string;
  createdAt: string;
  updatedAt: string;
}

export type WatchedListArray = WatchedListEntry[];

//---

export interface WatchedMoviesListEntry {
  movie_id: string;
  name: string;
}

export type WatchedMoviesObject = Record<number, WatchedMoviesListEntry | undefined>;

//---

export interface ToWatchListEntry {
  id: number;
  user_id: string;
  film_id: string;
  createdAt: string;
  updatedAt: string;
}

export type ToWatchListArray = ToWatchListEntry[];

//---

export interface toWatchMoviesEntry {
  name: string;
  movie_id?: string;
}

export type toWatchMoviesObject = Record<number , toWatchMoviesEntry | undefined>;

//---

export interface FavoritesListEntry {
  id: number;
  user_id: string;
  film_id: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export type FavoritesListObject = {
  [key: number]: FavoritesListEntry | undefined;
};


//=========== AUTHCONTEXT


export interface UserData {
  email: string;
  id: string;
  favorites: string;
}

//=========== HOME & FILTERSROLL


export interface Genre {
  id: number;
  name: string;
}

export interface ProviderHome {
  provider_id: number;
  provider_name: string;
}

//===========MOVIEPAGE


/* Interface Movie permettant de typer les données du film */
export interface Movie {
  title: string;
  id: string;
  poster_path: string;
  vote_average: number;
  vote_count: string;
  tagline: string;
  overview: string;
  genres: [];
  runtime: number;
  release_date: string;
}

/* Interface Credits permettant de typer les données du casting */
export interface Credits {
  cast: [];
  crew: [];
  id: number;
}

/* Interface Providers permettant de typer les données des plateformes */
export interface Provider {
  results: {
    FR: {
      flatrate: [];
      rent: [];
      buy: [];
      free: [];
      ads: [];
      link: string;
      provider_id: number;
      provider_name: string;
    };
  };
}
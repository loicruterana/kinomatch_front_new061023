// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient l'email de l'utilisateur, sont id ainsi que son "bookmarked"
export interface UserData {
  email: string;
  id: string;
  bookmarked: string
}

export interface UserDataToWatch {
  email: string;
  id: string;
  toWatch: string
}

export interface UserDataWatched {
  email: string;
  id: string;
  watched: string
}

export interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  addUserData: (email: string, userId: string) => void;
  addBookmarked: (element: { movie: string }) => void;
  deleteBookmarked: (element: { movie: string }) => void;
  addToWatch: (element: { movie: string }) => void;
  deleteToWatch: (element: { movie: string }) => void;
  addWatched: (element: { movie: string }) => void;
  deleteWatched: (element: { movie: string }) => void;
  deleteBookmarkedAndWatched: (element: { movie: string }) => void;
  userData: UserData;
  userDataToWatch: UserDataToWatch;
  userDataWatched: UserDataWatched;
}

interface AuthProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

//* ================ CONTEXT ================

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

// ================ USESTATE ================

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: '',
    id: '',
    bookmarked: '',
  });
  const [userDataToWatch, setUserDataToWatch] = useState<UserDataToWatch>({
    email: '',
    id: '',
    toWatch: '',
  });
  const [userDataWatched, setUserDataWatched] = useState<UserDataWatched>({
    email: '',
    id: '',
    watched: '',
  });
  const [isBookmarkedModified, setIsBookmarkedModified] = useState(false);
  const [isToWatchModified, setIsToWatchModified] = useState(false);
  const [isWatchedModified, setIsWatchedModified] = useState(false);

  // ================ FONCTIONS ================

  //? ================ FONCTIONS LIÉES A LA CONNEXION ================


  const login = (): void => {
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    setIsLoggedIn(false);
  };

  //? ================  ================

  const addUserData = (email: string, userId: string): void => {
    setUserData({ ...userData, email, id: userId });
    setUserDataToWatch({ ...userDataToWatch, email, id: userId });
    setUserDataWatched({ ...userDataWatched, email, id: userId });
  };

  //? ================ FONCTIONS LIÉES AUX BOOKMARKS (COEUR) ================

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addBookmarked = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, bookmarked: element.movie || element });
    setIsBookmarkedModified(true); // Marquer le tableau comme modifié
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteBookmarked = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, bookmarked: element.movie || element });
  };

  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        // const response = await axios.post(
        //   'https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies',
        //   userData
        // );
      } catch (error) {
        console.log(error);
      }
    };

    if (userData.bookmarked !== '' && isBookmarkedModified) {
      postData();
      setIsBookmarkedModified(false);
    } else {
      setIsBookmarkedModified(false); // Réinitialiser l'état lorsque le tableau a été posté
    }
  }, [userData, isBookmarkedModified]);

  useEffect(() => {
    const deleteData = async (): Promise<void> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        searchParams.append('movieID', userData.bookmarked);

        axios.delete(
          `https://deploy-back-kinomatch.herokuapp.com/deletebookmarked?${searchParams.toString()}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (userData.bookmarked !== '' && !isBookmarkedModified) {
      deleteData();
      setUserData({ ...userData, bookmarked: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  //? ================ FONCTIONS LIÉES AUX FILMS À VOIR ================

  const addToWatch = async (element: { movie: string }): Promise<void> => {
    setUserDataToWatch({ ...userDataToWatch, toWatch: element.movie });
    setIsToWatchModified(true);
    console.log(element.movie);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteToWatch = async (element: { movie: any }): Promise<void> => {
    setUserDataToWatch({ ...userDataToWatch, toWatch: element.movie || element });
  };

  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        // const response = await axios.post(
        //   'https://deploy-back-kinomatch.herokuapp.com/toWatchMovies',
        //   userDataToWatch
        // );
      } catch (error) {
        console.log(error);
      }
    };

    if (userDataToWatch.toWatch !== '' && isToWatchModified) {
      postData();
      setIsToWatchModified(false);
    } else {
      setIsToWatchModified(false); // Réinitialiser l'état lorsque le tableau a été posté
    }
  }, [userDataToWatch, isToWatchModified]);

  useEffect(() => {
    const deleteData = async (): Promise<void> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userDataToWatch.id);
        searchParams.append('movieID', userDataToWatch.toWatch);

        axios.delete(
          `https://deploy-back-kinomatch.herokuapp.com/deleteToWatchMovie?${searchParams.toString()}`
        );

      } catch (error) {
        console.log(error);
      }
    };

    if (userDataToWatch.toWatch !== '' && !isToWatchModified) {
      deleteData();
      setUserDataToWatch({ ...userDataToWatch, toWatch: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataToWatch]);

    //? ================ FONCTIONS LIÉES AUX FILMS DÉJÀ VUS ================


  const addWatched = async (element: { movie: string }): Promise<void> => {
    setUserDataWatched({ ...userDataWatched, watched: element.movie });
    setIsWatchedModified(true);
  };

  const deleteWatched = async (element: { movie: string }): Promise<void> => {
    setUserDataWatched({ ...userDataWatched, watched: element.movie || element.toString() });
  };

  // supprimer le film des favoris et des déjà vus
  const deleteBookmarkedAndWatched = async (element: { movie: string }): Promise<void> => {
    setUserData({ ...userData, bookmarked: element.movie || element.toString() });
    setUserDataWatched({ ...userDataWatched, watched: element.movie || element.toString() });
  };

  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        // const response = await axios.post(
        //   'https://deploy-back-kinomatch.herokuapp.com/watchedMovies',
        //   userDataWatched
        // );
      } catch (error) {
        console.log(error);
      }
    };

    if (userDataWatched.watched !== '' && isWatchedModified) {
      postData();
      setIsWatchedModified(false);
    } else {
      setIsWatchedModified(false); // Réinitialiser l'état lorsque le tableau a été posté
    }
  }, [userDataWatched, isWatchedModified]);

  useEffect(() => {
    const deleteData = async (): Promise<void> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userDataWatched.id);
        searchParams.append('movieID', userDataWatched.watched);

        axios.delete(
          `https://deploy-back-kinomatch.herokuapp.com/deleteWatchedMovie?${searchParams.toString()}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (userDataWatched.watched !== '' && !isWatchedModified) {
      deleteData();
      setUserDataWatched({ ...userDataWatched, watched: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataWatched]);

//* ================ CONTEXT : EXPORT DES PROPS ================

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        addBookmarked,
        deleteBookmarked,
        addUserData,
        addToWatch,
        deleteToWatch,
        addWatched,
        deleteWatched,
        userData,
        userDataToWatch,
        userDataWatched,
        deleteBookmarkedAndWatched,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

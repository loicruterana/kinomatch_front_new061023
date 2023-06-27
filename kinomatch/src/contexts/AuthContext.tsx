// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient l'email de l'utilisateur, sont id ainsi que son "bookmarked"
export interface UserData {
  email: string;
  id: string;
  bookmarked: string;
}

// Interface définissant les proriétés du contexte. Elle contient l'email de l'utilisateur, sont id ainsi que son "toWatch"
export interface UserDataToWatch {
  email: string;
  id: string;
  toWatch: string;
}

// Interface définissant les proriétés du contexte. Elle contient l'email de l'utilisateur, sont id ainsi que son "watched"
export interface UserDataWatched {
  email: string;
  id: string;
  watched: string;
}

// Interface définissant les propriétés du contexte. Elle contient l'ensemble des propriétés du contexte.
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

// Interface définissant les propriétés du composant. Elle contient les enfants du composant.
interface AuthProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

// ================ CONTEXT ================

// export de la fonction AuthProvider qui prend en argument les enfants du composant.
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // ================ USESTATE ================

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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isBookmarkedModified, setIsBookmarkedModified] = useState(false);
  const [isToWatchModified, setIsToWatchModified] = useState(false);
  const [isWatchedModified, setIsWatchedModified] = useState(false);

  // ============================ FONCTIONS ======================================

  // ================ FONCTIONS LIÉES A LA CONNEXION ================

  // Fonction permettant de se connecter
  const login = (): void => {
    setIsLoggedIn(true);
  };

  // Fonction permettant de se déconnecter
  const logout = (): void => {
    setIsLoggedIn(false);
  };

  //  ================ FONCTIONS LIÉES AUX UTILISATEURS ================

  // Fonction permettant d'ajouter les données de l'utilisateur
  const addUserData = (email: string, userId: string): void => {
    setUserData({ ...userData, email, id: userId });
    setUserDataToWatch({ ...userDataToWatch, email, id: userId });
    setUserDataWatched({ ...userDataWatched, email, id: userId });
  };

  // ================ FONCTIONS LIÉES AUX BOOKMARKS (COEUR) ================

  // Fonction permettant d'ajouter un film aux favoris
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addBookmarked = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, bookmarked: element.movie || element });
    setIsBookmarkedModified(true); // Marquer le tableau comme modifié
  };

  // Fonction permettant de supprimer un film des favoris
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteBookmarked = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, bookmarked: element.movie || element });
  };

  // ================================= USEEFFECT ==========================================

  // UseEffect permettant de poster les données des "bookmarked" de l'utilisateur
  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        await axios.post(
          'https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies',
          userData
        );
      } catch (error) {
        console.log(error);
      }
    };

    // Si "isBookmarkedModified" a été modifié et que userData.bookmarked n'est pas vide, alors on poste les données puis on réinitialise l'état sinon on réinitialise l'état
    if (userData.bookmarked !== '' && isBookmarkedModified) {
      postData();
      setIsBookmarkedModified(false);
    } else {
      setIsBookmarkedModified(false);
    }

    // On écoute les changements de l'état "userData" et "isBookmarkedModified"
  }, [userData, isBookmarkedModified]);

  // UseEffect permettant de supprimer les données des "bookmarked" de l'utilisateur
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

    // Si "isBookmarkedModified" n'a pas été modifié et que userData.bookmarked n'est pas vide, alors on supprime les données puis on met à jour les "useData"
    if (userData.bookmarked !== '' && !isBookmarkedModified) {
      deleteData();
      setUserData({ ...userData, bookmarked: '' });
    }
    // On écoute les changements de l'état "userData"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // ================ FONCTIONS LIÉES AUX FILMS À VOIR ================

  // Fonction permettant d'ajouter un film à voir
  const addToWatch = async (element: { movie: string }): Promise<void> => {
    setUserDataToWatch({ ...userDataToWatch, toWatch: element.movie });
    setIsToWatchModified(true);
  };

  // Fonction permettant de supprimer un film à voir
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteToWatch = async (element: { movie: any }): Promise<void> => {
    setUserDataToWatch({
      ...userDataToWatch,
      toWatch: element.movie || element,
    });
  };

  // UseEffect permettant de poster les données des "toWatch" de l'utilisateur
  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        await axios.post(
          'https://deploy-back-kinomatch.herokuapp.com/toWatchMovies',
          userDataToWatch
        );
      } catch (error) {
        console.log(error);
      }
    };

    // Si "isToWatchModified" a été modifié et que userDataToWatch.toWatch n'est pas vide, alors on poste les données puis on réinitialise l'état sinon on réinitialise l'état
    if (userDataToWatch.toWatch !== '' && isToWatchModified) {
      postData();
      setIsToWatchModified(false);
    } else {
      setIsToWatchModified(false);
    }
    // On écoute les changements de l'état "userDataToWatch" et "isToWatchModified"
  }, [userDataToWatch, isToWatchModified]);

  // UseEffect permettant de supprimer les données des "toWatch" de l'utilisateur
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

    // Si "isToWatchModified" n'a pas été modifié et que userDataToWatch.toWatch n'est pas vide, alors on supprime les données puis on met à jour les "useDataToWatch"
    if (userDataToWatch.toWatch !== '' && !isToWatchModified) {
      deleteData();
      setUserDataToWatch({ ...userDataToWatch, toWatch: '' });
    }
    // On écoute les changements de l'état "userDataToWatch"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataToWatch]);

  // ================ FONCTIONS LIÉES AUX FILMS DÉJÀ VUS ================

  // Fonction permettant d'ajouter un film déjà vu
  const addWatched = async (element: { movie: string }): Promise<void> => {
    setUserDataWatched({ ...userDataWatched, watched: element.movie });
    setIsWatchedModified(true);
  };

  // Fonction permettant de supprimer un film déjà vu
  const deleteWatched = async (element: { movie: string }): Promise<void> => {
    setUserDataWatched({
      ...userDataWatched,
      watched: element.movie || element.toString(),
    });
  };

  //! Fonction permettant de supprimer un film des favoris lorsqu'on le supprime des films déjà vus
  const deleteBookmarkedAndWatched = async (element: {
    movie: string;
  }): Promise<void> => {
    setUserData({
      ...userData,
      bookmarked: element.movie || element.toString(),
    });
    setUserDataWatched({
      ...userDataWatched,
      watched: element.movie || element.toString(),
    });
  };

  // UseEffect permettant de poster les données des "watched" de l'utilisateur
  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        await axios.post(
          'https://deploy-back-kinomatch.herokuapp.com/watchedMovies',
          userDataWatched
        );
      } catch (error) {
        console.log(error);
      }
    };

    // Si "isWatchedModified" a été modifié et que userDataWatched.watched n'est pas vide, alors on poste les données puis on réinitialise l'état sinon on réinitialise l'état
    if (userDataWatched.watched !== '' && isWatchedModified) {
      postData();
      setIsWatchedModified(false);
    } else {
      setIsWatchedModified(false);
    }

    // On écoute les changements de l'état "userDataWatched" et "isWatchedModified"
  }, [userDataWatched, isWatchedModified]);

  // UseEffect permettant de supprimer les données des "watched" de l'utilisateur
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

    // Si "isWatchedModified" n'a pas été modifié et que userDataWatched.watched n'est pas vide, alors on supprime les données puis on met à jour les "useDataWatched"
    if (userDataWatched.watched !== '' && !isWatchedModified) {
      deleteData();
      setUserDataWatched({ ...userDataWatched, watched: '' });
    }

    // On écoute les changements de l'état "userDataWatched"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataWatched]);

  // ================ CONTEXT : EXPORT DES PROPS ================

  return (
    // On exporte les fonctions et les états dans le context
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

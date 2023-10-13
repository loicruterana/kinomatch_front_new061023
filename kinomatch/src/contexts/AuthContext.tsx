// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import API_BASE_URL from '../utils/config';

// ================ INTERFACES ================

// Interface définissant les propriétés du contexte. Elle contient l'email de l'utilisateur, sont id ainsi que son "favorites"
export interface UserData {
  email: string;
  id: string;
  picture: string;
  favorites: string;
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
  setIsLoggedIn: (value: boolean) => void;
  login: () => void;
  logout: () => void;
  addUserData: (email: string, userId: string, picture: string) => void;
  addFavorites: (element: { movie: string }) => void;
  deleteFavorites: (element: { movie: string }) => void;
  addToWatch: (element: { movie: string }) => void;
  deleteToWatch: (element: { movie: string }) => void;
  addWatched: (element: { movie: string }) => void;
  deleteWatched: (element: { movie: string }) => void;
  deleteFavoritesAndWatched: (element: { movie: string }) => void;
  clearUserData: () => void;
  userData: UserData;
  userDataToWatch: UserDataToWatch;
  userDataWatched: UserDataWatched;
  updateUserDataPicture: (picture: string) => void;
  checkUserData: () => void;
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
    picture: '',
    favorites: '',
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
  const [isFavoritesModified, setIsFavoritesModified] = useState(false);
  const [isToWatchModified, setIsToWatchModified] = useState(false);
  const [isWatchedModified, setIsWatchedModified] = useState(false);

  // ============================ FONCTIONS ======================================

  // ================ FONCTIONS LIÉES A LA CONNEXION ================

  // Fonction permettant de se connecter
  const login = (): void => {
    axios
      .get(`${API_BASE_URL}/login/${userData.id}`)
      .then((response) => {
        if (response.data.authorized === true) {
          setIsLoggedIn(true);
          // localStorage.setItem('isLoggedIn', 'true');
        }
      })
      .catch((error) => {
        console.log(error);
        // Gérer les erreurs si nécessaire
      });
  };

  // Fonction permettant de se déconnecter
  const logout = (): void => {
    axios
      .get(`${API_BASE_URL}/login/${userData.id}`)
      .then((response) => {
        if (response.data.authorized === false) {
          // lorsque l'utilisateur se déconnecte, on supprime les données de l'utilisateur
          clearUserData();
          setIsLoggedIn(false);
          // localStorage.setItem('isLoggedIn', 'false');
        }
      })
      .catch((error) => {
        console.log(error);
        // Gérer les erreurs si nécessaire
      });
  };

  //  ================ FONCTIONS LIÉES AUX UTILISATEURS ================

  function checkUserData() {
    axios
      .get(`${API_BASE_URL}/login`)
      .then((response) => {
        if (response.data.authorized === true) {
          // localStorage.setItem('isLoggedIn', 'true');
          response.data.user.email = userData.email;
          response.data.user.email = userData.id;
          response.data.user.email = userData.picture;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateUserDataPicture = (pictureName: any) => {
    setUserData({ ...userData, picture: pictureName });
  };

  // Fonction permettant d'ajouter les données de l'utilisateur
  const addUserData = (
    email: string,
    userId: string,
    picture: string
  ): void => {
    setUserData({ ...userData, email, id: userId, picture });
    setUserDataToWatch({ ...userDataToWatch, email, id: userId });
    setUserDataWatched({ ...userDataWatched, email, id: userId });
  };

  const clearUserData = (): void => {
    setUserData({ ...userData, email: '', id: '' });
  };

  // ================ FONCTIONS LIÉES AUX FAVORITES (COEUR) ================

  // Fonction permettant d'ajouter un film aux favoris
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addFavorites = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, favorites: element.movie || element });
    setIsFavoritesModified(true); // Marquer le tableau comme modifié
  };

  // Fonction permettant de supprimer un film des favoris
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteFavorites = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, favorites: element.movie || element });
  };

  // ================================= USEEFFECT ==========================================

  // UseEffect permettant de poster les données des "favorites" de l'utilisateur
  useEffect(() => {


    const postData = async (): Promise<void> => {
      try {
        await axios.post(`${API_BASE_URL}/favoritesMovies`, userData);
      } catch (error) {
        console.log(error);
      }
    };

    // Si "isFavoritesModified" a été modifié et que userData.favorites n'est pas vide, alors on poste les données puis on réinitialise l'état sinon on réinitialise l'état
    if (userData.favorites !== '' && isFavoritesModified) {
      postData();
      setIsFavoritesModified(false);
    } else {
      setIsFavoritesModified(false);
    }

    // On écoute les changements de l'état "userData" et "isFavoritesModified"
  }, [userData, isFavoritesModified]);

  // UseEffect permettant de supprimer les données des "favorites" de l'utilisateur
  useEffect(() => {
    const deleteData = async (): Promise<void> => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        searchParams.append('movieID', userData.favorites);
        axios.delete(
          `${API_BASE_URL}/deleteFavorites?${searchParams.toString()}`
        );
      } catch (error) {
        console.log(error);
      }
    };

    // Si "isFavoritesModified" n'a pas été modifié et que userData.favorites n'est pas vide, alors on supprime les données puis on met à jour les "userData"
    if (userData.favorites !== '' && !isFavoritesModified) {
      deleteData();
      setUserData({ ...userData, favorites: '' });
    }

    // On écoute les changements de l'état "userData"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, isFavoritesModified]);

  // ================ FONCTIONS LIÉES AUX FILMS À VOIR ================

  // Fonction permettant d'ajouter un film à voir
  const addToWatch = async (element: { movie: string }): Promise<void> => {
    setUserDataToWatch({
      ...userDataToWatch,
      toWatch: element.movie || element.toString(),
    });
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
        await axios.post(`${API_BASE_URL}/toWatchMovies`, userDataToWatch);
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
          `${API_BASE_URL}/deleteToWatchMovie?${searchParams.toString()}`
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
    setUserDataWatched({
      ...userDataWatched,
      watched: element.movie || element.toString(),
    });
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
  const deleteFavoritesAndWatched = async (element: {
    movie: string;
  }): Promise<void> => {
    setUserData({
      ...userData,
      favorites: element.movie || element.toString(),
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
        await axios.post(`${API_BASE_URL}/watchedMovies`, userDataWatched);
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
          `${API_BASE_URL}/deleteWatchedMovie?${searchParams.toString()}`
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
        setIsLoggedIn,
        isLoggedIn,
        login,
        logout,
        addFavorites,
        deleteFavorites,
        addUserData,
        addToWatch,
        deleteToWatch,
        addWatched,
        deleteWatched,
        userData,
        userDataToWatch,
        userDataWatched,
        deleteFavoritesAndWatched,
        clearUserData,
        updateUserDataPicture,
        checkUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

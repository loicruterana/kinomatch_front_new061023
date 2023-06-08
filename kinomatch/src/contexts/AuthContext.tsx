import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

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
  addBookmarked: (element: { movie: any }) => void;
  deleteBookmarked: (element: { movie: any }) => void;
  addToWatch: (element: { movie: any }) => void;
  deleteToWatch: (element: { movie: any }) => void;
  addWatched: (element: { movie: any }) => void;
  deleteWatched: (element: { movie: any }) => void;
  deleteBookmarkedAndWatched: (element: { movie: any }) => void;
  userData: UserData;
  userDataToWatch: UserDataToWatch;
  userDataWatched: UserDataWatched;
}

export const AuthContext = createContext<AuthContextProps >();

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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

  const login = (): void => {
    setIsLoggedIn(true);
  };

  const logout = (): void => {
    setIsLoggedIn(false);
  };

  const addUserData = (email: string, userId: string): void => {
    setUserData({ ...userData, email, id: userId });
    setUserDataToWatch({ ...userDataToWatch, email, id: userId });
    setUserDataWatched({ ...userDataWatched, email, id: userId });
  };

  const addBookmarked = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, bookmarked: element.movie || element });
    console.log(element);
    setIsBookmarkedModified(true); // Marquer le tableau comme modifié
    console.log(element.movie);
    console.log('onpasseici');
  };

  const deleteBookmarked = async (element: { movie: any }): Promise<void> => {
    setUserData({ ...userData, bookmarked: element.movie || element });
    console.log(element.movie);
    console.log('onpasseici');
  };

  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        const response = await axios.post(
          'https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies',
          userData
        );
        console.log(response);
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

        console.log(userData.id);
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

  console.log(userData);

  const addToWatch = async (element: { movie: any }): Promise<void> => {
    setUserDataToWatch({ ...userDataToWatch, toWatch: element.movie });
    setIsToWatchModified(true);
    console.log(element.movie);
  };

  const deleteToWatch = async (element: { movie: any }): Promise<void> => {
    setUserDataToWatch({ ...userDataToWatch, toWatch: element.movie || element });
    console.log(element.movie);
  };

  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        const response = await axios.post(
          'https://deploy-back-kinomatch.herokuapp.com/toWatchMovies',
          userDataToWatch
        );
        console.log(response);
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
        console.log(
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

  console.log(userDataToWatch);
  console.log(userDataToWatch.id);

  const addWatched = async (element: { movie: any }): Promise<void> => {
    setUserDataWatched({ ...userDataWatched, watched: element.movie });
    setIsWatchedModified(true);
    console.log(element.movie);
  };

  const deleteWatched = async (element: { movie: any }): Promise<void> => {
    setUserDataWatched({ ...userDataWatched, watched: element.movie || element.toString() });
    console.log(element.movie);
  };

  const deleteBookmarkedAndWatched = async (element: { movie: any }): Promise<void> => {
    console.log(element);
    setUserData({ ...userData, bookmarked: element.movie || element.toString() });
    setUserDataWatched({ ...userDataWatched, watched: element.movie || element.toString() });
  };

  useEffect(() => {
    const postData = async (): Promise<void> => {
      try {
        const response = await axios.post(
          'https://deploy-back-kinomatch.herokuapp.com/watchedMovies',
          userDataWatched
        );
        console.log(response);
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

  console.log(userDataWatched);
  console.log(userDataWatched.id);

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

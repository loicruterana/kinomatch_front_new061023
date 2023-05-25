import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', id: '', bookmarked: '' });
  const [isBookmarkedModified, setIsBookmarkedModified] = useState(false); // Nouvel état

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addUserData = (email, userId) => {
    setUserData({ ...userData, email: email, id: userId });
  };

  const addBookmarked = async (element) => {
    setUserData({ ...userData, bookmarked: element.movie });
    setIsBookmarkedModified(true); // Marquer le tableau comme modifié
    console.log(element.movie);
  };

  const deleteBookmarked = async (element) => {
    setUserData({ ...userData, bookmarked: element.movie });
    console.log(element.movie);
  };

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post('https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies', userData);
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
    const deleteData = async () => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);   
        searchParams.append('movieID', userData.bookmarked);   

        console.log(userData.id);
        axios
          .delete(`https://deploy-back-kinomatch.herokuapp.com/deletebookmarked?${searchParams.toString()}`)
          console.log(`https://deploy-back-kinomatch.herokuapp.com/deletebookmarked?${searchParams.toString()}`)
      } catch (error) {
        console.log(error);
      }
    };

    if (userData.bookmarked !== '' && !isBookmarkedModified) {
      deleteData();
      setUserData({ ...userData, bookmarked: "" });
    }
  }, [userData]);

  console.log(userData);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        addBookmarked,
        deleteBookmarked,
        addUserData,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

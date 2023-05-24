import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', id: '', bookmarked: '' });
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
    if (userData.bookmarked !== '') {
      postData();
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
        addUserData,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

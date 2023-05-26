import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: '', id: '', bookmarked: '' });
  const [userDataToWatch, setUserDataToWatch] = useState({ email: '', id: '', toWatch: '' });
  const [isBookmarkedModified, setIsBookmarkedModified] = useState(false); 
  const [isToWatchModified, setIsToWatchModified] = useState(false); 

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const addUserData = (email, userId) => {
    setUserData({ ...userData, email: email, id: userId });
    setUserDataToWatch({ ...userDataToWatch, email: email, id: userId });
  };

{/* ======================================= BOOKMARKED ====================================================== */}

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

{/* ======================================= TO WATCH ====================================================== */}

const addToWatch = async (element) => {
  setUserDataToWatch({ ...userDataToWatch, toWatch: element.movie });
  setIsToWatchModified(true); 
  console.log(element.movie);
};

const deleteToWatch = async (element) => {
  setUserDataToWatch({ ...userDataToWatch, toWatch: element.movie });
  console.log(element.movie);
};

useEffect(() => {
  const postData = async () => {
    try {
      const response = await axios.post('https://deploy-back-kinomatch.herokuapp.com/toWatchMovies', userDataToWatch);
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
  const deleteData = async () => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userDataToWatch.id);   
      searchParams.append('movieID', userDataToWatch.toWatch);   

      axios
        .delete(`https://deploy-back-kinomatch.herokuapp.com/deleteToWatchMovie?${searchParams.toString()}`)
        console.log(`https://deploy-back-kinomatch.herokuapp.com/deleteToWatchMovie?${searchParams.toString()}`)
    } catch (error) {
      console.log(error);
    }
  };

  if (userDataToWatch.toWatch !== '' && !isToWatchModified) {
    deleteData();
    setUserDataToWatch({ ...userDataToWatch, toWatch: "" });
  }
}, [userDataToWatch]);

console.log(userDataToWatch);
console.log(userDataToWatch.id);



{/* ======================================= RETURN ====================================================== */}


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
        userData,
        userDataToWatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
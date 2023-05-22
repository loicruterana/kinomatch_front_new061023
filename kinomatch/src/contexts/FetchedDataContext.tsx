import React, { createContext, useState } from 'react';

// Création du contexte
export const FetchedDataContext = createContext();

// Fournisseur de contexte
export const FetchedDataProvider = ({ children }) => {
  const [fetchedData, setFetchedData] = useState([]);

  const addData = (data) => {
    setFetchedData(data)
  }

  return (
    <FetchedDataContext.Provider value={{ fetchedData, setFetchedData, addData }}>
      {children}
    </FetchedDataContext.Provider>
  );
};

export default FetchedDataProvider;

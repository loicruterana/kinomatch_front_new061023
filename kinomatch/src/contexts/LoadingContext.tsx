// ================ IMPORT BIBLIOTHEQUES ================

import React, { createContext, useState, ReactNode } from 'react';

// ================ INTERFACES ================

// Interface définissant les rpopriétés du contexte. Elle contient un boolean pour savoir si le chargement est en cours, une fonction pour lancer le chargement, une fonction pour arrêter le chargement, une string pour l'erreur et une fonction pour ajouter une erreur.
interface LoadingContextType {
  isLoading: boolean;
  load: () => void;
  unload: () => void;
  error: string | null;
  addError: (error: string) => void;
}

// Interface définissant les propriétés du composant. Elle contient les enfants du composant.
interface LoadingProviderProps {
  children: ReactNode;
}

// ================ CREATECONTEXT ================

// Définition du contexte et de ses types.
export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  load: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  unload: () => {},
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addError: () => {},
});

// ================ CONTEXT ================

// export de la fonction LoadingProvider qui prend en argument les enfants du composant.
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {

  // ================ USESTATE ================

  // UseState pour savoir si le chargement est en cours.
  const [isLoading, setIsLoading] = useState(false);

  // UseState pour l'erreur.
  const [error, setError] = useState<string | null>(null);

// ================ FONCTIONS ================

// Fonction pour lancer le chargement.
  const load = (): void => {
    setIsLoading(true);
  };

  // Fonction pour arrêter le chargement.
  const unload = (): void => {
    setIsLoading(false);
  };

  // Fonction pour ajouter une erreur.
  const addError = (error: string): void => {
    setError(error);
  };


// ================ CONTEXT : EXPORT DES PROPS ================ 

// Définition des propriétés du contexte.
const contextValue: LoadingContextType = {
  isLoading,
  load,
  unload,
  error,
  addError,
};

// On retourne le contexte avec ses propriétés.
  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

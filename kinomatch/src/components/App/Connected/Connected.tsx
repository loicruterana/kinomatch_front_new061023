// ================ IMPORT BIBLIOTHEQUES ================

import React, { useContext } from 'react';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT SCSS ================

import './Connected.scss';

//* ================ COMPOSANT ================

const Connected: React.FC = () => {
  // ================ IMPORT PROPS CONTEXTS ================

  const authContext = useContext(AuthContext);
  const userData = authContext?.userData;

  // ================ UTILS ================

  // Vérifier si les données utilisateur sont disponibles
  if (!userData) {
    return null; // Ou affichez un message d'erreur approprié
  }

  // ================ JSX ================

  return (
    <div className='Connected-container'>
      Vous êtes connecté avec l'adresse {userData.email}
    </div>
  );
  //* ================ FERMTURE COMPOSANT ================
};

export default Connected;

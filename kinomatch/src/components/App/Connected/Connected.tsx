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
    return null;
  }

  // ================ JSX ================

  return (
    <div className='Connected-container'>
      <h1>Vous êtes connecté avec l'adresse {userData.email}</h1>
    </div>
  );
  //* ================ FERMTURE COMPOSANT ================
};

export default Connected;

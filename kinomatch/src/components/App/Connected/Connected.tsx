import React, { useContext } from 'react';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT SCSS ================

import './Connected.scss';

const Connected: React.FC = () => {
  const authContext = useContext(AuthContext);
  const userData = authContext?.userData;

  // Vérifier si les données utilisateur sont disponibles
  if (!userData) {
    return null; // Ou affichez un message d'erreur approprié
  }

  return (
    <div className="Connected-container">Vous êtes connecté avec l'adresse {userData.email}</div>
  );
};

export default Connected;

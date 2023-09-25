// ================ IMPORT BIBLIOTHEQUES ================

import React from 'react';

// ================ IMPORT CONTEXTS ================

// import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT SCSS ================

import './NotConnected.scss';

//* ================ COMPOSANT ================

const NotConnected: React.FC = () => {
  // ================ JSX ================

  return (
    <main className='notconnected-container'>
      <p>Vous n'êtes actuellement pas connecté</p>
    </main>
  );
  //* ================ FERMTURE COMPOSANT ================
};

export default NotConnected;

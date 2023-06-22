// ================ IMPORT SCSS ================

import './NoResult.scss';

//* ================ COMPOSANT ================
export const NoResult = () => {
  // ================ JSX ================

  return (
    <div className='NoResult-container'>
      <span>
        <h1>Aucun résultat trouvé</h1>
      </span>
      <img src='/images/3z9a.gif' alt='gif aucun résultat'></img>
    </div>
  );
  //* ================ FERMETURE DU COMPOSANT ================
};

export default NoResult;

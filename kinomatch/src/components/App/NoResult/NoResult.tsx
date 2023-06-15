// ================ IMPORT SCSS ================

import './NoResult.scss';

//* ================ COMPOSANT ================
export const NoResult = () => {

  return (
    <div className="NoResult-container">
      
      <span>Aucun résultat trouvé
      </span>
      <img src='/images/3z9a.gif' alt='gif aucun résultat'></img>

    </div>
  )
//* ================ FERMETURE DU COMPOSANT ================
}

export default NoResult;

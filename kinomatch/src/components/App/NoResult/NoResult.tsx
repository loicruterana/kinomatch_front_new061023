// ================ IMPORT SCSS ================

// import Footer from '../Footer/Footer';
// import Header from '../Header/Header';
import './NoResult.scss';

//* ================ COMPOSANT ================
export const NoResult = () => {

  return (      
    <div className="NoResult-container">
      <span><h1>Aucun résultat trouvé</h1>
      </span>
      <img src='/images/3z9a.gif' alt='gif aucun résultat'></img>

    </div>
  )
//* ================ FERMETURE DU COMPOSANT ================
}

export default NoResult;

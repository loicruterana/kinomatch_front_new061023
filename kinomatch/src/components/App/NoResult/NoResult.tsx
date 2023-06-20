// ================ IMPORT SCSS ================

import './NoResult.scss';

//* ================ COMPOSANT ================
export const NoResult = () => {
  // ================ JSX ================

  return (
    <>
      {/* <Header  /> */}
      <div className='NoResult-container'>
        <span>Aucun résultat trouvé</span>
        <img src='/images/3z9a.gif' alt='gif aucun résultat'></img>
      </div>
      {/* <Footer/> */}
    </>
  );
  //* ================ FERMETURE DU COMPOSANT ================
};

export default NoResult;

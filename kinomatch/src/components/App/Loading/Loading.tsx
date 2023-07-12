// ================ IMPORT SCSS ================

import './Loading.scss';

//* ================ COMPOSANT ================

{
  /* Function Loading permettant d'afficher le logo de chargement */
}
const Loading: React.FC = () => {
  // ================ JSX ================

  return (
    <main className='loading-container'>
      <div className='loading-container__image'>
        <img
          className='loading-container__image__name'
          src='images/KinoMatchLogo-without-roll.png'
        ></img>
        <img
          className='loading-container__image__name__roll'
          src='images/KinoMatchLogo-roll.png'
        ></img>
      </div>
    </main>
  );
  //* ================ FERMETURE COMPOSANT ================
};

export default Loading;

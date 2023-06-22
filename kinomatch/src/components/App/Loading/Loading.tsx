// ================ IMPORT SCSS ================

import './Loading.scss';

//* ================ COMPOSANT ================

{
  /* Function Loading permettant d'afficher le logo de chargement */
}
const Loading: React.FC = () => {
  // ================ JSX ================

  return (
    <div className='Loading-container'>
      <div className='Loading-container__image'>
        <img
          className='Loading-container__image__name'
          src='images/KinoMatchLogo-without-roll.png'
        ></img>
        <img
          className='Loading-container__image__name__roll'
          src='images/KinoMatchLogo-roll.png'
        ></img>
      </div>
    </div>
  );
  //* ================ FERMETURE COMPOSANT ================
};

export default Loading;

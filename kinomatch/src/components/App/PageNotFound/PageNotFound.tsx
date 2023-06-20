// ================ IMPORT SCSS ================

import './PageNotFound.scss';

//* ================ COMPOSANT ================

const PageNotFound: React.FC = () => {
  // ================ JSX ================

  return (
    <div className='PageNotFound-container'>
      <span className='PageNotFound-container-text'>
        La page que vous recherchez semble introuvable
      </span>

      <img src='/images/Yqe.gif' alt='gif de 404 mire' />
    </div>
  );
  //* ================ FERMETURE DU COMPOSANT ================
};

export default PageNotFound;

// ================ IMPORT SCSS ================

import './PageNotFound.scss';

//* ================ COMPOSANT ================

const PageNotFound: React.FC = () => {
  // ================ JSX ================

  return (
    <main className='pageNotFound-container'>
      <span className='pageNotFound-container-text'>
        <h1>La page que vous recherchez semble introuvable</h1>
      </span>

      <img src='/images/Yqe.gif' alt='gif de 404 mire' />
    </main>
  );
  //* ================ FERMETURE DU COMPOSANT ================
};

export default PageNotFound;

// ================ IMPORT BIBLIOTHEQUES ================
import { useState, useContext, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT COMPOSANTS ================

import BurgerMenu from './BurgerMenu/BurgerMenu';
import { SearchBar } from './SearchBar/SearchBar';

// ================ IMPORT SCSS ================

import './Header.scss';

//* ================  COMPOSANT ================

function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const authContext = useContext(AuthContext);
  const [desktopVersion, setDesktopVersion] = useState(false);
  const [query, setQuery] = useState('');

  // ================  UTILS ================

  const location = useLocation();
  const navigate = useNavigate();

  // ================  USEEFFECT ================

  // useEffect pour gérer l'affichage selon le redimensionnement de la fenêtre
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setDesktopVersion(true);
      }
      if (window.innerWidth < 900) {
        setDesktopVersion(false);
      }
    }
    window.addEventListener('resize', handleResize);
    /* ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
     et actualiser le state windowSize */
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, []);

  // Vérifier si le contexte est défini
  if (!authContext) {
    // Gérer le cas où le contexte est indéfini, par exemple afficher un message d'erreur ou rediriger vers une page d'erreur
    return <div>Erreur: Contexte non défini</div>;
  }
  /* ============================ HANDLERS ============================= */

  // Gestion de la soumission du formulaire de recherche
  const handleSubmit = async (e: FormEvent<Element>) => {
    e.preventDefault();
    if (query.length === 0) return;

    const searchParams = new URLSearchParams();
    searchParams.append('typedName', query);
    setQuery('');
    navigate(`/searchresults?${searchParams.toString()}`);
    setShowBurgerMenu(false);
  };

  // pour afficher ou masquer le menu burger
  function handleClick() {
    setShowBurgerMenu(!showBurgerMenu);
  }

  // pour fermer le menu burger
  function handleCloseClick() {
    setShowBurgerMenu(false);
  }

  // pour recharger la page films
  const movieArrayReload = () => {
    window.location.reload();
  };
  // ================ JSX ================
  return (
    <>
      <div className='Header'>
        <Link
          key='home'
          to='/'
          className='Header-logo'
          onClick={handleCloseClick}
        >
          <img
            className='Header-logo__image'
            src='./images/kino_match_logo.png'
            alt='logo'
          />
        </Link>
        {/* Logo du Header, logo différent on est en version mobile */}
        {location.pathname === '/films' && !desktopVersion ? (
          <Link
            key='refresh'
            to='#'
            className='Header-logo--refresh'
            onClick={movieArrayReload}
          >
            <i className='fa-solid fa-arrows-rotate'></i>
          </Link>
        ) : null}

        {/* Bouton, lorsque l'utilisateur est sur la page films, l'app affichera ce bouton 'RELANCER UNE RECHERCHE' */}
        {location.pathname === '/films' && desktopVersion && (
          <button
            className='Header--OtherResultsBtn'
            type='button'
            onClick={movieArrayReload}
          >
            {' '}
            Relancer une recherche{' '}
          </button>
        )}

        {/* Bouton, lorsque l'utilisateur n'est pas connecté, l'app affichera ce bouton 'SE CONNECTER' */}
        {/* Au clic sera affichée une modale BurgerMenu */}
        {/* {!isLoggedIn && (
        <div className='Header-buttons'>
          <button className='Header-buttons-button'>
            <Link key='login' to='/login'>
              Se connecter
            </Link>
          </button>
        </div>
      )} */}

        {/* Profil de l'utilisateur connecté */}
        {/* {isLoggedIn && (
        <div className='Header-profile'>
          <img src='images/SamplePic.png' alt='profile' />
          <Link to='/profile'>
            <div className='Header-profile-username'>{userData.email}</div>
          </Link>
        </div>
      )} */}

        {/* SearchBar, affiché dans le Header uniquement sur la version desktop */}
        {desktopVersion && (
          <SearchBar
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
          />
        )}

        {/* Icône BurgerMenu, uniquement affiché en version mobile */}
        <div
          onClick={handleClick}
          className={`menu-icon ${showBurgerMenu && 'active'}`}
        >
          <div className='line-1'></div>
          <div className='line-2'></div>
          <div className='line-3'></div>
        </div>
      </div>
      {/* Pour activer la modale selon le state showBurgerMenu */}
      {showBurgerMenu && (
        <BurgerMenu
          showBurgerMenu={showBurgerMenu}
          setShowBurgerMenu={setShowBurgerMenu}
          query={query}
          setQuery={setQuery}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
  //* ================  FERMETURE COMPOSANT ================
}

export default Header;

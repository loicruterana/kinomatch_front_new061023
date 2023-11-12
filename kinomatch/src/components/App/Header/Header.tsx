// ================ IMPORT BIBLIOTHEQUES ================
import { useState, useContext, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { RequireAuth } from './RequireAuth/RequireAuth';
import axios from 'axios';
import API_BASE_URL from '../../../utils/config';


// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT COMPOSANTS ================

import BurgerMenu from './BurgerMenu/BurgerMenu';
import { SearchBar } from './SearchBar/SearchBar';
// import API_BASE_URL from './../../../utils/config';

// ================ IMPORT SCSS ================

import './Header.scss';

//* ================  COMPOSANT ================

function Header() {
  // ================ USESTATE ================

  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [desktopVersion, setDesktopVersion] = useState(false);
  const [query, setQuery] = useState('');
  // un state pour stocker le code de la photo de profil
  const [codePicture, setCodePicture] = useState<string>('');

  const {
    // isLoggedIn,
    // setIsLoggedIn,
    userData,
    // login,
    // checkUserData,
    // addUserData,
  } = useContext(AuthContext);

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

  useEffect(() => {
    if (userData.id) {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      axios
        .get(`${API_BASE_URL}/picture?${searchParams.toString()}`)
        .then(({ data }) => {
          setCodePicture(data.picture);
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [userData.picture]);

  // useEffect(() => {
  //   login();
  // }, []);

  // useEffect(() => {
  //   const storedLoginStatus = localStorage.getItem('isLoggedIn');
  //   if (storedLoginStatus) {
  //     axios.get(`${API_BASE_URL}/login`).then((res) => {
  //       if (res.data.authentified === true) {
  //         setIsLoggedIn(true);
  //         checkUserData();
  //       }
  //     });
  //     // setIsLoggedIn(true);
  //     // checkUserData();
  //   }
  // }, []);

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userData');
  //   if (storedUserData) {
  //     const user = JSON.parse(storedUserData);
  //     addUserData(user.email, user.userId, user.picture);
  //     // Utilisez les données utilisateur ici
  //     // Par exemple : const { email, id } = user;
  //   }
  // }, []);

  // Vérifier si le contexte est défini
  if (!AuthContext) {
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
      <div className='header'>
        <Link
          key='home'
          to='/'
          className='header-logo'
          onClick={handleCloseClick}
        >
          <img
            className='header-logo__image'
            src='./images/KinoMatchLogoVTest.png'
            alt='logo'
          />
        </Link>

        {/* Bouton, lorsque l'utilisateur est sur la page films, l'app affichera ce bouton 'RELANCER UNE RECHERCHE' */}
        {location.pathname === '/films' &&
          desktopVersion &&
          !window.location.search.includes('filmID') && (
            <button
              className='header--OtherResultsBtn'
              type='button'
              onClick={movieArrayReload}
            >
              {' '}
              Relancer une recherche{' '}
            </button>
          )}
        <div className='header-elements'>
          {/* SearchBar, affiché dans le Header uniquement sur la version desktop */}
          {desktopVersion && (
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSubmit={handleSubmit}
            />
          )}

          {/* Bouton, lorsque l'utilisateur n'est pas connecté, l'app affichera ce bouton 'SE CONNECTER' */}
          {/* Au clic sera affichée une modale BurgerMenu */}
          {userData.id === '' && (
            <div className='header-elements-buttons'>
              <button className='header-elements-buttons-button'>
                <Link key='login' to='/login'>
                  Se connecter
                </Link>
              </button>
            </div>
          )}

          {/* Profil de l'utilisateur connecté */}
          <RequireAuth>
            {userData.id !== '' && (
              <Link to='/profile'>
                <div className='header-elements-profile'>
                  <img
                    src={`images/${codePicture}.png`}
                    alt={`Image de profil ${codePicture}`}
                  />
                  <div className='header-elements-profile-username'>
                    {userData.email}
                  </div>
                </div>
              </Link>
            )}
          </RequireAuth>
        </div>

        {/* Logo refresh, logo différent on est en version mobile */}
        {location.pathname === '/films' &&
          !window.location.search.includes('filmID') &&
          !desktopVersion ? (
          <Link
            key='refresh'
            to='#'
            className='header-elements-logo--refresh'
            onClick={movieArrayReload}
          >
            <i className='fa-solid fa-arrows-rotate'></i>
          </Link>
        ) : null}

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

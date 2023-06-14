import { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import BurgerMenu from './BurgerMenu/BurgerMenu';
import './Header.scss';

function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const authContext = useContext(AuthContext);
  const [desktopVersion, setDesktopVersion] = useState(false);

  const location = useLocation();

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
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    // et actualiser le state windowSize
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, []);

  // Vérifiez si le contexte est défini
  if (!authContext) {
    // Gérer le cas où le contexte est indéfini, par exemple afficher un message d'erreur ou rediriger vers une page d'erreur
    return <div>Erreur: Contexte non défini</div>;
  }

  // const { userData, isLoggedIn } = authContext;

  function handleClick() {
    setShowBurgerMenu(!showBurgerMenu);
  }

  function handleCloseClick() {
    setShowBurgerMenu(false);
  }

  const movieArrayReload = () => {
    window.location.reload();
  }



  return (
    <div className='Header'>
      {/* Logo du Header */}
      {
        location.pathname === '/films' && !desktopVersion ?
          <Link key='refresh' to='#' className='Header-logo' onClick={movieArrayReload}>
            <img className='Header-logo__image--refresh' src='./images/RelancerLogo.png' alt='logo' />
          </Link>
          :
          <Link key='home' to='/' className='Header-logo' onClick={handleCloseClick}>
            <img className='Header-logo__image' src='./images/kino_match_logo.png' alt='logo' />
          </Link>
      }

      {location.pathname === '/films' && desktopVersion && (
        <button className='Header--OtherResultsBtn' type='button' onClick={movieArrayReload} > Relancer une recherche </button>)}

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

      {/* Icône BurgerMenu */}
      <div onClick={handleClick} className={`menu-icon ${showBurgerMenu && 'active'}`}>
        <div className='line-1'></div>
        <div className='line-2'></div>
        <div className='line-3'></div>
      </div>
      {/* Pour activer la modale selon le state showBurgerMenu */}
      {showBurgerMenu && <BurgerMenu showBurgerMenu={showBurgerMenu} setShowBurgerMenu={setShowBurgerMenu} />}
    </div>
  );
}

export default Header;

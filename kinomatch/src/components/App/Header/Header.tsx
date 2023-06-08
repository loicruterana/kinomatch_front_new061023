import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import BurgerMenu from './BurgerMenu/BurgerMenu';
import './Header.scss';

function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const authContext = useContext(AuthContext);

  // Vérifiez si le contexte est défini
  if (!authContext) {
    // Gérer le cas où le contexte est indéfini, par exemple afficher un message d'erreur ou rediriger vers une page d'erreur
    return <div>Erreur: Contexte non défini</div>;
  }

  const { userData, isLoggedIn } = authContext;

  function handleClick() {
    setShowBurgerMenu(!showBurgerMenu);
  }

  function handleCloseClick() {
    setShowBurgerMenu(false);
  }

  return (
    <div className='Header'>
      {/* Logo du Header */}
      <Link key='home' to='/' className='Header-logo' onClick={handleCloseClick}>
        <img className='Header-logo__image' src='./images/kino_match_logo.png' alt='logo' />
      </Link>
      {/* Bouton, lorsque l'utilisateur n'est pas connecté, l'app affichera ce bouton 'SE CONNECTER' */}
      {/* Au clic sera affichée une modale BurgerMenu */}
      {!isLoggedIn && (
        <div className='Header-buttons'>
          <button className='Header-buttons-button'>
            <Link key='login' to='/login'>
              Se connecter
            </Link>
          </button>
        </div>
      )}

      {/* Profil de l'utilisateur connecté */}
      {isLoggedIn && (
        <div className='Header-profile'>
          <img src='images/SamplePic.png' alt='profile' />
          <Link to='/profile'>
            <div className='Header-profile-username'>{userData.email}</div>
          </Link>
        </div>
      )}

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

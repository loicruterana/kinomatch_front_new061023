import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { EmailContext } from '../../../contexts/EmailContext';

import BurgerMenu from './BurgerMenu/BurgerMenu';
import './Header.scss';

function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const { email } = useContext(EmailContext);


  function handleClick() {
    setShowBurgerMenu(!showBurgerMenu);
  }

  return (
    <div className='Header'>
      {/* Logo du Header */}
      <Link key='home' to='/' className='Header-logo'>
        <img className='Header-logo__image' src='./images/kino_match_logo.png' alt='logo' />
      </Link>
      {/* Bouton qui au clic amènera une recommandation de film aléatoire */}
      <button className='Header-random-button'>
        <i className='fa-solid fa-dice'></i>
        ALEATOIRE
      </button>
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

      {isLoggedIn && (
        <div className='Header-profile'>
          <img src="images/1681073113956.jpg"></img>
          <div className='Header-profile-username'>{email}</div>
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

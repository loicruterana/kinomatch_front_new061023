import { useState } from 'react';

import BurgerMenu from './BurgerMenu/BurgerMenu';

import './Header.scss';



function Header() {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  //! à modifier lors de l'arrivée des données dynamiques
  const [connected, setConnected] = useState(false);

  function handleClick (){
    setShowBurgerMenu(!showBurgerMenu);
  }
  return (
    <div className='Header'>
{/* Logo du Header  */}
      <a className='Header-logo' href="#">
        <img className='Header-logo__image' src='./images/kino_match_logo.png' />
      </a>
{/* Bouton qui au clic amènera une recommandation de film aléatoire*/}
      <button className='Header-button'>
        <i className="fa-solid fa-dice"></i>
          GÉNÉRATEUR RANDOM
      </button>  
{/* Bouton, lorsque l'utilisateur n'est pas connecté, l'app affichera ce bouton 'SE CONNECTER'*/}
{/* Au clic sera affiché une modale BurgerMenu*/}
      { !connected && 
      <button className='Header-button'>SE CONNECTER</button>  
      } 
{/* Icone BurgerMenu*/}
    <div 
    onClick={handleClick}
    className={`menu-icon ${showBurgerMenu && 'active'}`}>
      <div className='line-1'></div>
      <div className='line-2'></div>
      <div className='line-3'></div>
    </div>
{/* Pour activer la modale selon le state showBurgerMenu*/}
    {showBurgerMenu && 
    <BurgerMenu showBurgerMenu={showBurgerMenu} setShowBurgerMenu={setShowBurgerMenu}/>
    }
    </div>
  )
}

export default Header;
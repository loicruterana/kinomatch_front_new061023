import React, { useState } from 'react';

import './BurgerMenu.scss';
import { Link } from 'react-router-dom';

interface Props {
  showBurgerMenu: boolean;
  setShowBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function BurgerMenu({ showBurgerMenu, setShowBurgerMenu }: Props) {
  const [connected, setConnected] = useState(false);

  function handleClick() {
    setShowBurgerMenu(!showBurgerMenu);
  }

  return (
    <div className='BurgerMenu'>
      <div className='BurgerMenu__container'>
        <div className='BurgerMenu__container__items'>
          {connected && (
            <>
              {/* Nom de l'utilisateur */}
              <div>Bonjour Machin chose</div>
              {/* Les boutons lorsque l'utilisateur est connecté */}
              <button className='BurgerMenu__container__button'>Se déconnecter </button>
              <button className='BurgerMenu__container__button'>Thème couleur</button>
            </>
          )}
          {/* Les boutons lorsque l'utilisateur n'est pas connecté */}
          {!connected && (
            <>
              <Link
              to='signin'
              key='signin'
              >
                <button 
                className='BurgerMenu__container__button'
                onClick={handleClick}>
                Se connecter 
                </button>
              </Link>  
              <Link
              to='create-profile'
              key='create-profile'
              >
                <button 
                className='BurgerMenu__container__button'
                onClick={handleClick}
                >Créer un compte 
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;

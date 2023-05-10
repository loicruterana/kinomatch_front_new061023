import React, { useState } from 'react';

import './BurgerMenu.scss';


function BurgerMenu({ showBurgerMenu, setShowBurgerMenu }) {
  const [connected, setConnected] = useState(false);


  function handleClick(){
    setShowBurgerMenu(!showBurgerMenu)
  }

  

  return (
    <div className='BurgerMenu'>
      <div className='BurgerMenu__container'>

        <div className='BurgerMenu__container__items'>
        { connected && 
        <>
// Nom de l'utilisateur      
          <div>Bonjour Machin chose</div>
// Les boutons lorsque l'utilisateur est connecté      
          <button className='BurgerMenu__container__button'>Se déconnecter </button>
          <button className='BurgerMenu__container__button'>Thème couleur</button>
        </>
        }
// Les boutons lorsque l'utilisateur n'est pas connecté      
        { !connected && 
        <>
          <button className='BurgerMenu__container__button'>Se connecter </button>
          <button className='BurgerMenu__container__button'>Créer un compte </button>
        </>
        }
        </div>
      </div>
    </div>
  )
}



export default BurgerMenu;
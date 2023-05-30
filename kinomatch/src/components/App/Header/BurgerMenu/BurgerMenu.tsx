import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Disconnected from '../../Disconnected/Disconnected';


import './BurgerMenu.scss';
import { Link } from 'react-router-dom';

interface Props {
  showBurgerMenu: boolean;
  setShowBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function BurgerMenu({ showBurgerMenu, setShowBurgerMenu }: Props) {
  const { isLoggedIn, userData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleClick() {


    setShowBurgerMenu(!showBurgerMenu);
  }

  function handleProfile() {
            navigate(`/profile`);
            setShowBurgerMenu(!showBurgerMenu);

  }

  function handleDeleteProfile() {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      // searchParams.append('email', userData.email);

      console.log(userData.id)
      axios
        .delete(`https://deploy-back-kinomatch.herokuapp.com/deleteAccount?${searchParams.toString()}`)
        .then((response) => {
          console.log(response.data.message);
          logout();
          navigate(`/`);

        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }


  function handleLogout() {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      console.log(userData.id)
      axios
        .get(`https://deploy-back-kinomatch.herokuapp.com/logout?${searchParams.toString()}`)
        .then((response) => {
          console.log(response.data.message);
          logout();
          setTimeout(function() {
            navigate("/");
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <div className='BurgerMenu'>
      <div className='BurgerMenu__container'>
        <div className='BurgerMenu__container__items'>
          {isLoggedIn && (
            <>
              {/* Nom de l'utilisateur */}
              <div className='BurgerMenu__container__items__text'>
                <div>Bonjour</div>
                <div>{userData.email}</div>
              </div>
              {/* Les boutons lorsque l'utilisateur est connecté */}
              <button 
              className='BurgerMenu__container__items__button'
              onClick={handleProfile}
              >Mon profil</button>

              <button 
              className='BurgerMenu__container__items__button'
              onClick={handleDeleteProfile}
              >
                Supprimer compte</button>
              <button 
              className='BurgerMenu__container__items__button'
              onClick={handleLogout}
              >Se déconnecter</button>

            </>
          )}
          {/* Les boutons lorsque l'utilisateur n'est pas connecté */}
          {!isLoggedIn && (
            <>
              <Link
              to='login'
              key='login'
              >
                <button 
                className='BurgerMenu__container__button'
                onClick={handleClick}>
                Se connecter 
                </button>
              </Link>  
              <Link
              to='signup'
              key='signup'
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
      {/* {!isLoggedIn && <Disconnected/>} */}
    </div>
  );
}

export default BurgerMenu;

// ================ IMPORT BIBLIOTHEQUES ================

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../../../utils/config';
import axios from 'axios';
import { UserData } from '../../../../utils/interfaces';
// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../../contexts/AuthContext';

// ================ IMPORT COMPOSANTS ================

import Footer from '../../Footer/Footer';
import { SearchBar } from '../SearchBar/SearchBar';

// ================ IMPORT SCSS ================

import './BurgerMenu.scss';

// ================ INTERFACES ================
interface Props {
  showBurgerMenu: boolean;
  setShowBurgerMenu: (showBurgerMenu: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

//* ================ COMPOSANT ================

const BurgerMenu: React.FC<Props> = ({
  showBurgerMenu,
  setShowBurgerMenu,
  query,
  setQuery,
  handleSubmit,
}: Props): JSX.Element => {
  const authContext = useContext(AuthContext);

  // ================ IMPORT PROPS CONTEXTS ================

  const { userData, logout, clearUserData } = useContext(AuthContext) as {
    userData: UserData;
    logout: () => void;
    clearUserData: () => void;
  };

  // ================ UTILS ================

  // pour naviguer vers une autre page
  const navigate = useNavigate();

  // ================ HANDLERS ================

  // pour afficher ou masquer le menu burger
  const handleClick = (): void => {
    setShowBurgerMenu(!showBurgerMenu);
  };

  // pour naviguer vers la page de profil
  const handleProfile = (): void => {
    navigate(`/profile`);
    setShowBurgerMenu(!showBurgerMenu);
  };

  // pour supprimer le profil
  const handleDeleteProfile = async (): Promise<void> => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      axios
        .delete(`${API_BASE_URL}/deleteAccount?${searchParams.toString()}`)
        .then(() => {
          logout();
          navigate(`/`);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // pour se déconnecter
  const handleLogout = async (): Promise<void> => {
    try {
      const requestData = {
        userID: userData.id,
      };

      axios
        .post(`${API_BASE_URL}/logout`, requestData)
        .then(() => {
          logout();
          clearUserData();
          navigate(`/`);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // ================ JSX ================

  return (
    <>
      <div className='burgerMenu'>
        <nav className='burgerMenu__container'>
          <div className='burgerMenu__container__items'>
            {/* <li className='BurgerMenu__container__button--home'>
              <Link key='home' to='/' onClick={handleCloseClick}>
                <button className='BurgerMenu__container__button'>
                  Accueil
                </button>
              </Link>
            </li> */}
            {authContext?.isLoggedIn && (
              <>
                {/* Nom de l'utilisateur */}
                <div className='burgerMenu__container__items__text'>
                  <h2>Bonjour</h2>
                  <span>{authContext?.userData.email}</span>
                </div>
                {/* Les boutons lorsque l'utilisateur est connecté */}
                <ul>
                  <li>
                    <button
                      className='burgerMenu__container__items__button'
                      onClick={handleProfile}
                    >
                      Mon profil
                    </button>
                  </li>
                  <li>
                    <button
                      className='burgerMenu__container__items__button'
                      onClick={handleDeleteProfile}
                    >
                      Supprimer compte
                    </button>
                  </li>
                  <li>
                    <button
                      className='burgerMenu__container__items__button'
                      onClick={handleLogout}
                    >
                      Se déconnecter
                    </button>
                  </li>
                </ul>
              </>
            )}
            {/* Les boutons lorsque l'utilisateur n'est pas connecté
                  {!authContext?.isLoggedIn && ( */}

            {/* )} */}

            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSubmit={handleSubmit}
            />
            {!authContext?.isLoggedIn && (
              <>
                <Link to='/login' key='login'>
                  <button
                    className='burgerMenu__container__button'
                    onClick={handleClick}
                  >
                    Se connecter
                  </button>
                </Link>
                <Link to='/signup' key='signup'>
                  <button
                    className='burgerMenu__container__button'
                    onClick={handleClick}
                  >
                    Créer un compte
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      <footer className='burgerMenu-footer'>
        <Footer />
      </footer>
    </>
  );
  //* ================ FERMETURE COMPOSANT ================
};

export default BurgerMenu;

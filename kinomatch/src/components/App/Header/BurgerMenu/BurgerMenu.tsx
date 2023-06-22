// ================ IMPORT BIBLIOTHEQUES ================

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  // ================ UTILS ================

  // pour naviguer vers une autre page
  const navigate = useNavigate();

  // ================ HANDLERS ================

  // pour afficher ou masquer le menu burger
  // const handleClick = (): void => {
  //   setShowBurgerMenu(!showBurgerMenu);
  // };

  // pour naviguer vers la page de profil
  const handleProfile = (): void => {
    navigate(`/profile`);
    setShowBurgerMenu(!showBurgerMenu);
  };

  // pour fermer le menu burger
  function handleCloseClick() {
    setShowBurgerMenu(false);
  }

  // pour supprimer le profil
  const handleDeleteProfile = async (): Promise<void> => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', authContext?.userData.id || '');
      authContext?.logout();
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  // pour se déconnecter
  const handleLogout = async (): Promise<void> => {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', authContext?.userData.id || '');
      authContext?.logout();
      setTimeout(function () {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  // ================ JSX ================

  return (
    <div className='BurgerMenu'>
      <nav className='BurgerMenu__container'>
        <div className='BurgerMenu__container__items'>
          {authContext?.isLoggedIn && (
            <>
              {/* Nom de l'utilisateur */}
              <div className='BurgerMenu__container__items__text'>
                <div>Bonjour</div>
                <div>{authContext?.userData.email}</div>
              </div>
              {/* Les boutons lorsque l'utilisateur est connecté */}
              <ul>
                <li>
                  <button
                    className='BurgerMenu__container__items__button'
                    onClick={handleProfile}
                  >
                    Mon profil
                  </button>
                </li>
                <li>
                  <button
                    className='BurgerMenu__container__items__button'
                    onClick={handleDeleteProfile}
                  >
                    Supprimer compte
                  </button>
                </li>
                <li>
                  <button
                    className='BurgerMenu__container__items__button'
                    onClick={handleLogout}
                  >
                    Se déconnecter
                  </button>
                </li>
              </ul>
            </>
          )}
          {/* Les boutons lorsque l'utilisateur n'est pas connecté */}
          {!authContext?.isLoggedIn && (
            <>
              <Link
                key='home'
                to='/'
                className='BurgerMenu__container__button--home'
                onClick={handleCloseClick}
              >
                <button className='BurgerMenu__container__button'>
                  Accueil
                </button>
              </Link>
              <SearchBar
                query={query}
                setQuery={setQuery}
                handleSubmit={handleSubmit}
              />
              {/* <Link to="login" key="login">
                <button className="BurgerMenu__container__button" onClick={handleClick}>
                  Se connecter
                </button>
              </Link>
              <Link to="signup" key="signup">
                <button className="BurgerMenu__container__button" onClick={handleClick}>
                  Créer un compte
                </button>
              </Link> */}
            </>
          )}
        </div>
        <Footer />
      </nav>
    </div>
  );
  //* ================ FERMETURE COMPOSANT ================
};

export default BurgerMenu;

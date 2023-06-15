import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../../contexts/AuthContext';

// ================ IMPORT COMPOSANTS ================

import Footer from '../../Footer/Footer';

// ================ IMPORT SCSS ================

import './BurgerMenu.scss';

// ================ INTERFACES ================
interface Props {
  showBurgerMenu: boolean;
  setShowBurgerMenu: (showBurgerMenu: boolean) => void;
}

const BurgerMenu: React.FC<Props> = ({ showBurgerMenu, setShowBurgerMenu }: Props): JSX.Element => {
  const authContext = useContext(AuthContext);

// ================ UTILS ================

  const navigate = useNavigate();

// ================ HANDLERS ================

  // const handleClick = (): void => {
  //   setShowBurgerMenu(!showBurgerMenu);
  // };

  const handleProfile = (): void => {
    navigate(`/profile`);
    setShowBurgerMenu(!showBurgerMenu);
  };

  function handleCloseClick() {
    setShowBurgerMenu(false);
  }

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

  return (
    <div className="BurgerMenu">
      <div className="BurgerMenu__container">
        <div className="BurgerMenu__container__items">
          {authContext?.isLoggedIn && (
            <>
              {/* Nom de l'utilisateur */}
              <div className="BurgerMenu__container__items__text">
                <div>Bonjour</div>
                <div>{authContext?.userData.email}</div>
              </div>
              {/* Les boutons lorsque l'utilisateur est connecté */}
              <button className="BurgerMenu__container__items__button" onClick={handleProfile}>
                Mon profil
              </button>

              <button className="BurgerMenu__container__items__button" onClick={handleDeleteProfile}>
                Supprimer compte
              </button>
              <button className="BurgerMenu__container__items__button" onClick={handleLogout}>
                Se déconnecter
              </button>
            </>
          )}
          {/* Les boutons lorsque l'utilisateur n'est pas connecté */}
          {!authContext?.isLoggedIn && (
            <>
              <Link key='home' to='/' className='BurgerMenu__container__button--home' onClick={handleCloseClick}>
                <button className="BurgerMenu__container__button">Accueil</button>
              </Link>
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
      </div>
    </div>
  );
};

export default BurgerMenu;

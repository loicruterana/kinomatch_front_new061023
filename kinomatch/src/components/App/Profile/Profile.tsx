// ================ IMPORT BIBLIOTHEQUES ================

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  WatchedListArray,
  WatchedMoviesObject,
  ToWatchListArray,
  toWatchMoviesObject,
  FavoritesListObject,
  UserData,
  RecommendedMoviesArray,
} from '../../../utils/interfaces';
import API_BASE_URL from '../../../utils/config';
import { useUser } from '../../../hooks/useUser';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';

// ================ IMPORT COMPOSANTS ================

import BookmarkedRoll from './Rolls/BookmarkedRoll';
import Footer from '../Footer/Footer';
import PictureProfileModale from './PictureProfileModale/PictureProfileModale';
import DeleteProfileModale from './DeleteProfileModale/DeleteProfileModale';
// import NotConnected from '../NotConnected/NotConnected';
import { RequireAuth } from './RequireAuth/RequireAuth';

// ================ IMPORT SCSS ================

import './Profile.scss';

//* ================ COMPOSANT ================

export const Profile: React.FC = () => {
  // ================ USESTATE ================
  const { data: user } = useUser();

  // fonction pour naviguer entre les pages
  const navigate: (path: string) => void = useNavigate();


  // un état pour savoir si on est sur mobile ou pas
  const [mobileVersion, setMobileVersion] = useState<boolean>(false);
  // pour afficher ou masquer WatchedRoll (films vus -> ✓)
  const [showWatchedRoll, setShowWatchedRoll] = useState<boolean>(true);
  // pour afficher ou masquer ToWatchRoll (films à voir)
  const [showToWatchRoll, setShowToWatchRoll] = useState<boolean>(true);
  // pour afficher ou masquer recommendedMoviesRoll (films recommandés)
  const [showRecommendedMoviesRoll, setShowRecommendedMoviesRoll] = useState<boolean>(true);
  // pour stocker la liste de films recommandés par le back
  const [recommendedMovies, setRecommendedMovies] = useState<RecommendedMoviesArray>([]);
  // pour stocker les id issues du back concernant les films vus
  const [watchedList, setWatchedList] = useState<WatchedListArray>([]);
  // pour stocker les noms concernant les films vus
  const [watchedMovies] = useState<WatchedMoviesObject>({});
  // pour stocker les id issues du back concernant les films à voir
  const [toWatchList, setToWatchList] = useState<ToWatchListArray>([]);
  // pour stocker les noms concernant les films à voir
  const [toWatchMovies] = useState<toWatchMoviesObject>({});
  // pour stocker les id issues du back concernant les films préférés
  const [favoritesList, setFavoritesList] = useState<FavoritesListObject>([]);
  // un state pour indiquer si une action a été faite par l'utilisateur
  const [userEvent, setUserEvent] = useState<boolean>(false);
  // un state pour indiquer si la modale de modification de photo de profil est ouverte
  const [showPictureProfileModale, setShowPictureProfileModale] = useState<boolean>(false);
  // un state pour indiquer si la modale de suppression de profil est ouverte
  const [showDeleteProfileModale, setShowDeleteProfileModale] = useState<boolean>(false);
  // un state pour stocker le code de la photo de profil
  const [codePicture, setCodePicture] = useState<string>('');

  // const [showNotConnected, setShowNotConnected] = useState(false);

  // const [checkHasBeenDone, setCheckHasBeenDone] = useState(false);

  // ================ IMPORT PROPS CONTEXTS ================

  // const { load } = useContext(LoadingContext);
  const {
    userData,
    logout,
    deleteFavorites,
    deleteToWatch,
    deleteFavoritesAndWatched,
    addFavorites,
    clearUserData,
    addWatched,
    // addUserData,
  } = useContext(AuthContext) as {
    userData: UserData;
    logout: () => void;
    deleteFavorites: (element: { movie: string }) => void;
    deleteToWatch: (element: { movie: string }) => void;
    deleteFavoritesAndWatched: (element: { movie: string }) => void;
    deleteWatched: (element: { movie: string }) => void;
    addFavorites: (element: { movie: string }) => void;
    addUserData: (email: string, id: string, picture: string) => void;
    login: () => void;
    clearUserData: () => void;
    addWatched: (element: { movie: string }) => void;
  };

  // ================ UTILS ================
  // fonction pour naviguer entre les pages
  // fonction pour savoir si les listes sont en train de charger
  const listsAreLoading =
    (watchedList || toWatchList || favoritesList) === undefined; // false

  // function deleteCookie(name) {
  //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // }

  // ================ INTERFACES ================
  // interface FavoritesItem {
  //   createdAt: string;
  //   film_id: string;
  //   id: number;
  //   updatedAt: string;
  //   user_id: string;
  // }

  // ================ HANDLERS ================

  // handler pour supprimer un film ajouté en favoris (coeur)
  function handleRemoveFavorites(film_id: string) {
    deleteFavorites({ movie: film_id });
    setUserEvent(true);
  }

  // handler pour ajouter un film ajouté en favoris (coeur)
  function handleAddFavorites(film_id: string) {
    addFavorites({ movie: film_id });
    setUserEvent(true);
  }

  //handler pour ne plus afficher les rolls
  function handleClickOut(): void {
    setShowWatchedRoll(false);
    setShowToWatchRoll(false);
    setShowRecommendedMoviesRoll(false);
  }

  //handler pour afficher le roll Watched (films vus -> ✓)
  function handleShowWatchedRoll(): void {
    setShowWatchedRoll(true);
  }

  //handler pour afficher le roll ToWatch (films à voir)
  function handleShowToWatchRoll(): void {
    setShowToWatchRoll(true);
  }

  // handler pour afficher le roll RecommendedMovies (films recommandés)
  function handleShowRecommendedMoviesRoll(): void {
    setShowRecommendedMoviesRoll(true);
  }



  // Handler pour se déconnecter
  function handleLogout(): void {
    try {
      const requestData = {
        userID: userData.id,
      };

      axios
        .post(`${API_BASE_URL}/logout`, requestData)
        .then(() => {
          // document.cookie =
          //   'connect.sid=; expires=Mon, 05 Sep 2022 13:27:08 GMT; domain=localhost; path=/;';
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
  }

  function handleOpenPictureProfileModale(): void {
    setShowPictureProfileModale(true);
  }

  // Fonction permettant de manipuler la modale du DeleteProfileModale. Au clic ==> passe de true à false et inversement
  function handleOpenDeleteProfileModale(): void {
    setShowDeleteProfileModale(true);
  }


  // ================ USEWINDOWSIZE ================
  // pour afficher ou masquer les rolls en fonction de la taille de l'écran
  useEffect(() => {
    function handleResize(): void {
      if (window.innerWidth >= 900) {
        setMobileVersion(false);
        setShowWatchedRoll(true);
        setShowToWatchRoll(true);
        setShowRecommendedMoviesRoll(true);
      }
      if (window.innerWidth < 900) {
        setMobileVersion(true);
        setShowWatchedRoll(false);
        setShowToWatchRoll(false);
        setShowRecommendedMoviesRoll(false);
      }
    }
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    window.addEventListener('resize', handleResize);
    handleResize();
    // un removeEventListener pour éviter les fuites de mémoire
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // =========================== WATCHEDLIST ===========================

  useEffect(() => {
    if (user.id) {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);

      axios
        .get(`${API_BASE_URL}/watchedMovies?${searchParams.toString()}`)
        .then(({ data }) => {
          // setShowNotConnected(false);
          // On trie les films par ordre alphabétique
          const sortedFilmTitles = data.watchedListTitles.sort((a: { film_title: string; }, b: { film_title: string; }) =>
            a.film_title.localeCompare(b.film_title)
          );
          setWatchedList(sortedFilmTitles);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setUserEvent(false);
        });
    }
  }, [user.id, userData.id, userEvent]);


  // RENVOI VERS LA HOMEPAGE SI L'UTILISATEUR N'EST PAS CONNECTE

  useEffect(() => {
    const fetchIdData = () => {
      // Code pour récupérer les données de l'utilisateur

      if (userData.id === '') {
        navigate(`/`);
      }
    };
    fetchIdData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // =========================== FAVORITES (COEUR) ===========================

  //useEffect pour récupérer les id des films ajoutés en favoris
  useEffect(() => {
    if (user.id) {
      const fetchMoviesFavorites = async () => {
        try {
          const searchParams = new URLSearchParams();
          searchParams.append('userID', userData.id);

          await axios
            .get(`${API_BASE_URL}/favoritesMovies?${searchParams.toString()}`)

            .then(({ data }) => {
              setFavoritesList(data.favoritesListTitles);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              setUserEvent(false);
            });
        } catch (error) {
          console.error(error);
        }
      };

      // if (userEvent) {
      fetchMoviesFavorites();
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEvent, userData, user.id]);
  // à chaque fois que userEvent change (c'est à dire à chaque fois que l'utilisateur supprimer un favoris), on exécute le useEffect

  // =========================== TOWATCHLIST ===========================

  // récupère les id des films à voir
  useEffect(() => {
    if (user.id) {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      axios
        .get(`${API_BASE_URL}/toWatchMovies?${searchParams.toString()}`)
        .then(({ data }) => {
          // setShowNotConnected(false);
          // console.log(data);
          const sortedFilmTitles = data.toWatchListTitles.sort((a: { film_title: string; }, b: { film_title: string; }) =>
            a.film_title.localeCompare(b.film_title)
          );
          setToWatchList(sortedFilmTitles);
          // console.log('ICI', sortedFilmTitles);
        })
        .catch((error) => {
          console.error(error);
          // console.log('onpassici');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, userEvent]);

  //! =========================== RECOMMENDED MOVIES ===========================

  useEffect(() => {
    if (user.id) {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      axios
        .get(`${API_BASE_URL}/recommendedFilms?${searchParams.toString()}`)
        .then(({ data }) => {
          // setShowNotConnected(false);
          setRecommendedMovies(data.recommendedListTitles);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, userEvent]);


  // =========================== UseEffect Profile Picture ===========================


  useEffect(() => {
    if (user.id) {
      const searchParams = new URLSearchParams();
      searchParams.append('userID', userData.id);
      axios
        .get(`${API_BASE_URL}/picture?${searchParams.toString()}`)
        .then(({ data }) => {
          setCodePicture(data.picture);
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [user.picture]);


  // =========================== CHECKER LE STATUT POUR PERSISTANCE DE DONNEES ===========================
  // addUserData(user.email, user.id, user.picture);

  // useEffect(() => {
  //   axios.get(`${API_BASE_URL}/login`).then(({ data }) => {
  //     if (data.authorized) {
  //       const { user } = data;
  //       console.log(user);

  //       addUserData(user.email, user.id, user.picture);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userData');
  //   if (storedUserData) {
  //     const user = JSON.parse(storedUserData);
  //     addUserData(user.email, user.userId, user.picture);
  //     // Utilisez les données utilisateur ici
  //     // Par exemple : const { email, id } = user;
  //   }
  // }, [checkHasBeenDone]);

  //========== JSX ==========


  return (
    <RequireAuth>
      <main className='profile-container'>
        <section className='profile-container__personnal'>
          <div className='profile-container__personnal__infos'>
            {/* <h2 className='profile-container__personnal__infos__title'>Profil</h2> */}
            <div className='profile-container__personnal__infos__pictureemailpassword'>
              <div className='profile-container__personnal__circle'>
                <img
                  src={`images/${codePicture}.png`} // codePicture
                  alt={`Image de profil ${codePicture}`}
                ></img>
                <i
                  className='profile-container__personnal__circle__pen fa-solid fa-pen'
                  onClick={handleOpenPictureProfileModale}
                ></i>
              </div>
              <div className='profile-container__personnal__pictureemailpassword__emailpassword'>
                <div className='profile-container__personnal__pictureemailpassword__emailpassword__email'>
                  <span>Pseudo</span>
                  <div>{userData.email}</div>
                </div>
                <div className='profile-container__personnal__pictureemailpassword__emailpassword__password'>
                  <span>Mot de passe</span>
                  <div>∗∗∗∗∗∗∗</div>
                </div>
                <div>
                  {/*Bouton de suppression de compte */}
                  {/* <button
                    className='profile-container__personnal__pictureemailpassword__emailpassword__deleteButton'
                    onClick={handleOpenDeleteProfileModale}
                  >
                    Supprimer compte
                  </button> */}
                </div>
              </div>
            </div>
            {/* affichage conditionnel des boutons en fonction du device*/}
            {!mobileVersion && (
              <div className='profile-container-buttons'>
                <button
                  className='profile-container-buttons-button'
                  // va déconnecter l'utilisateur
                  onClick={handleLogout}
                >
                  Se déconnecter
                </button>

                {/*Bouton de suppression de compte */}
                <button
                  className='profile-container-buttons-button'
                  // va ouvrir la modale de suppression de profil
                  onClick={handleOpenDeleteProfileModale}
                // va supprimer le profil
                // onClick={handleDeleteProfile}
                >
                  Supprimer profil
                </button>
              </div>
            )}
          </div>
        </section>
        {/* <div className="profile-container__favoritefilters">
          <h3 className="profile-container__favoritefilters__title">Filtres favoris </h3>
        </div> */}
        {/* affichage conditionnel des boutons en fonction du device et si le roll est activé ou non */}
        {((showWatchedRoll && mobileVersion) ||
          (showToWatchRoll && mobileVersion) ||
          (showRecommendedMoviesRoll && mobileVersion) ||
          !mobileVersion) && (
            <section
              className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                }`}
            >
              <div
                className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }-backdropfilter`}
                onClick={handleClickOut}
              ></div>
              <BookmarkedRoll
                isLoading={listsAreLoading}
                mobileVersion={mobileVersion}
                showWatchedRoll={showWatchedRoll}
                // setShowWatchedRoll={setShowWatchedRoll}
                showToWatchRoll={showToWatchRoll}
                // setShowToWatchRoll={setShowToWatchRoll}
                watchedList={watchedList}
                setWatchedList={setWatchedList}
                watchedMovies={watchedMovies}
                // setWatchedMovies={setWatchedMovies}
                // deleteWatched={deleteWatched}
                toWatchList={toWatchList}
                setToWatchList={setToWatchList}
                toWatchMovies={toWatchMovies}
                // setToWatchMovies={setToWatchMovies}
                deleteToWatch={deleteToWatch}
                deleteFavoritesAndWatched={deleteFavoritesAndWatched}
                favoritesList={favoritesList}
                addWatched={addWatched}
                // deleteFavorites={deleteFavorites}
                // addFavorites={addFavorites}
                showRecommendedMoviesRoll={showRecommendedMoviesRoll}
                recommendedMovies={recommendedMovies}
                setRecommendedMovies={setRecommendedMovies}
                handleRemoveFavorites={handleRemoveFavorites}
                handleAddFavorites={handleAddFavorites}
                userEvent={userEvent}
                setUserEvent={setUserEvent}
                handleClickOut={handleClickOut}
              />
            </section>
          )}
        {/* BOUTONS */}
        {mobileVersion && (
          <div className='profile-container__rollbuttons'>
            <div
              className='profile-container__rollbuttons__button__image-container'
              onClick={handleShowWatchedRoll}
            >
              <img
                src='/images/tetepelloche.svg'
                alt="Description de l'image"
              />
              {/* <i className='fa-sharp fa-solid fa-check'></i> */}
              <div className='profile-container__rollbuttons__button__text'>
                Vus
              </div>
              {/* <i className='fa-regular fa-heart'></i> */}
            </div>

            <div
              className='profile-container__rollbuttons__button__image-container'
              onClick={handleShowToWatchRoll}
            >
              <img
                src='/images/tetepelloche.svg'
                alt="Description de l'image"
              />
              {/* <i className='fa-solid fa-xmark'></i> */}
              <div className='profile-container__rollbuttons__button__text'>
                À voir
              </div>
            </div>

            <div
              className='profile-container__rollbuttons__button__image-container'
              onClick={handleShowRecommendedMoviesRoll}
            >
              <img
                src='/images/tetepelloche.svg'
                alt="Description de l'image"
              />
              {/* <i className='fa-solid fa-xmark'></i> */}
              <div className='profile-container__rollbuttons__button__text'>
                Recommandés
              </div>
            </div>
          </div>
        )}

        {mobileVersion && (
          <div className='profile-container-buttons'>


            {/*Bouton de suppression de compte */}
            <button
              className='profile-container-buttons-button'
              // va ouvrir la modale de suppression de profil
              onClick={handleOpenDeleteProfileModale}
            // va supprimer le profil
            // onClick={handleDeleteProfile}
            >
              Supprimer profil
            </button>
          </div>
        )}
        {/* affichage conditionnel du Footer en fonction du device */}
        {!mobileVersion && <Footer />}
        {showPictureProfileModale && (
          <PictureProfileModale
            setShowPictureProfileModale={setShowPictureProfileModale}
            showPictureProfileModale={showPictureProfileModale}
          />
        )}

        {/* Lorsque "showDeleteProfileModale" est truthy, alors la modale "DeleteProfileModale" s'affiche */}
        {showDeleteProfileModale && (
          <DeleteProfileModale
            setShowDeleteProfileModale={setShowDeleteProfileModale}
            showDeleteProfileModale={showDeleteProfileModale}
          />
        )}

      </main>
    </RequireAuth>
  );
  //* ================ FERMETURE COMPOSANT ================
};
export default Profile;

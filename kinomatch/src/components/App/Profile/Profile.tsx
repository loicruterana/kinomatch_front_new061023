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
  toWatchMoviesEntry,
} from '../../../utils/interfaces';
import API_BASE_URL from '../../../utils/config';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';
import { LoadingContext } from '../../../contexts/LoadingContext';

// ================ IMPORT COMPOSANTS ================

import BookmarkedRoll from './Rolls/BookmarkedRoll';
import Footer from '../Footer/Footer';

// ================ IMPORT SCSS ================

import './Profile.scss';

//* ================ COMPOSANT ================

export const Profile: React.FC = () => {
  // ================ USESTATE ================

  // un état pour savoir si on est sur mobile ou pas
  const [mobileVersion, setMobileVersion] = useState<boolean>(false);
  // pour afficher ou masquer WatchedRoll (films vus -> ✓)
  const [showWatchedRoll, setShowWatchedRoll] = useState<boolean>(true);
  // pour afficher ou masquer ToWatchRoll (films à voir)
  const [showToWatchRoll, setShowToWatchRoll] = useState<boolean>(true);
  // pour stocker les id issues du back concernant les films vus
  const [watchedList, setWatchedList] = useState<WatchedListArray>([]);
  // pour stocker les noms concernant les films vus
  const [watchedMovies, setWatchedMovies] = useState<WatchedMoviesObject>({});
  // pour stocker les id issues du back concernant les films à voir
  const [toWatchList, setToWatchList] = useState<ToWatchListArray>([]);
  // pour stocker les noms concernant les films à voir
  const [toWatchMovies, setToWatchMovies] = useState<toWatchMoviesObject>({});
  // pour stocker les id issues du back concernant les films préférés
  const [favoritesList, setFavoritesList] = useState<FavoritesListObject>({});
  // un state pour indiquer si une action a été faite par l'utilisateur
  const [userEvent, setUserEvent] = useState(false);

  // ================ IMPORT PROPS CONTEXTS ================

  const { load } = useContext(LoadingContext);
  const {
    userData,
    logout,
    deleteFavorites,
    deleteToWatch,
    deleteFavoritesAndWatched,
    addFavorites,
    clearUserData,
  } = useContext(AuthContext) as {
    userData: UserData;
    logout: () => void;
    deleteFavorites: (element: { movie: string }) => void;
    deleteToWatch: (element: { movie: string }) => void;
    deleteFavoritesAndWatched: (element: { movie: string }) => void;
    deleteWatched: (element: { movie: string }) => void;
    addFavorites: (element: { movie: string }) => void;
    addUserData: (email: string, id: string) => void;
    login: () => void;
    clearUserData: () => void;
  };

  // ================ UTILS ================
  // fonction pour naviguer entre les pages
  const navigate: (path: string) => void = useNavigate();
  // fonction pour savoir si les listes sont en train de charger
  const listsAreLoading =
    (watchedList || toWatchList || favoritesList) === undefined; // false

  // function deleteCookie(name) {
  //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // }

  // ================ INTERFACES ================
  interface FavoritesItem {
    createdAt: string;
    film_id: string;
    id: number;
    updatedAt: string;
    user_id: string;
  }

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
  }

  //handler pour afficher le roll Watched (films vus -> ✓)
  function handleShowWatchedRoll(): void {
    setShowWatchedRoll(true);
  }

  //handler pour afficher le roll ToWatch (films à voir)
  function handleShowToWatchRoll(): void {
    setShowToWatchRoll(true);
  }

  //handler pour supprimer profil
  function handleDeleteProfile(): void {
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

  // ================ USEWINDOWSIZE ================
  // pour afficher ou masquer les rolls en fonction de la taille de l'écran
  useEffect(() => {
    function handleResize(): void {
      if (window.innerWidth >= 900) {
        setMobileVersion(false);
        setShowWatchedRoll(true);
        setShowToWatchRoll(true);
      }
      if (window.innerWidth < 900) {
        setMobileVersion(true);
        setShowWatchedRoll(false);
        setShowToWatchRoll(false);
      }
    }
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    window.addEventListener('resize', handleResize);
    handleResize();
    // un removeEventListener pour éviter les fuites de mémoire
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // =========================== WATCHEDLIST ===========================

  //useEffect pour récupérer les id des films vus
  useEffect(() => {
    // pour activer le loader
    load();
    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);
    axios
      // envoie la requête au back pour récupérer les films vus
      .get(`${API_BASE_URL}/watchedMovies?${searchParams.toString()}`)
      .then(({ data }) => {
        // stocke les données dans le state watchedList
        setWatchedList(data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // =========================== WATCHEDLISTMOVIES ===========================

  //useEffect pour récupérer les titres des films vus
  useEffect(() => {
    const fetchMovieTitles = async () => {
      try {
        const requests = watchedList.map((watchedListItem) => {
          const searchParams = new URLSearchParams();
          searchParams.append('movieID', watchedListItem?.film_id ?? '');
          return axios.get(`${API_BASE_URL}/detail?${searchParams.toString()}`);
        });

        Promise.all(requests)
          .then((responses) => {
            const moviesToAdd = responses.map(({ data }) => ({
              name: data.title,
              movie_id: data.id,
            }));

            // Utilise un objet pour stocker les films uniques
            const uniqueMovies: Record<
              string,
              { name: string; movie_id?: string }
            > = {};

            // Parcourir la liste des films à ajouter
            moviesToAdd.forEach((movie) => {
              // S'il n'existe pas, l'ajouter à l'objet uniqueMovies
              uniqueMovies[movie.movie_id?.toString()] = movie;
            });
            // on stocke les noms des films dans le state watchedMovies
            setWatchedMovies(uniqueMovies as WatchedMoviesObject);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieTitles();
  }, [watchedList]);
  // on exécute le useEffect à chaque fois que watchedList (la liste des id) change

  // =========================== FAVORITES (COEUR) ===========================

  //useEffect pour récupérer les id des films ajoutés en favoris
  useEffect(() => {
    const fetchMoviesFavorites = async () => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append('userID', userData.id);
        await axios
          .get(`${API_BASE_URL}/favoritesMovies?${searchParams.toString()}`)
          .then(({ data }) => {
            // Utiliser un objet pour stocker les id des films favoris
            const favorites: FavoritesListObject = {};
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.forEach((element: any) => {
              const key = element.film_id?.toString();
              favorites[key] = element as FavoritesItem;
            });
            setFavoritesList(favorites);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEvent, userData]);
  // à chaque fois que userEvent change (c'est à dire à chaque fois que l'utilisateur supprimer un favoris), on exécute le useEffect

  // =========================== TOWATCHLIST ===========================

  // récupère les id des films à voir
  useEffect(() => {
    load();

    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);
    axios
      .get(`${API_BASE_URL}/toWatchMovies?${searchParams.toString()}`)
      .then(({ data }) => {
        setToWatchList(data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // =========================== TOWATCHLISTMOVIES ===========================

  // récupère les titres des films à voir
  useEffect(() => {
    const fetchMovieTitles = async () => {
      try {
        const requests = toWatchList.map((toWatchListItem) => {
          const searchParams = new URLSearchParams();
          searchParams.append('movieID', toWatchListItem.film_id);
          return axios.get(`${API_BASE_URL}/detail?${searchParams.toString()}`);
        });

        Promise.all(requests)
          .then((responses) => {
            const moviesToAdd = responses.map(({ data }) => ({
              name: data.title,
              movie_id: data.id,
            }));
            const uniqueMovies: Record<string, toWatchMoviesEntry> = {};
            moviesToAdd.forEach((movie) => {
              uniqueMovies[movie.movie_id?.toString()] = movie;
            });
            setToWatchMovies(uniqueMovies);
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieTitles();
  }, [toWatchList]);
  // s'exécute à chaque fois que toWatchList change

  //========== JSX ==========

  return (
    <main className='profile-container'>
      <section className='profile-container__personnal'>
        <div className='profile-container__personnal__infos'>
          {/* <h2 className='profile-container__personnal__infos__title'>Profil</h2> */}
          <div className='profile-container__personnal__infos__pictureemailpassword'>
            <div className='profile-container__personnal__circle'>
              <img
                src='images/SamplePicCircle.png'
                alt='Image de profil par defaut'
              ></img>
            </div>
            <div className='profile-container__personnal__pictureemailpassword__emailpassword'>
              <div className='profile-container__personnal__pictureemailpassword__emailpassword__email'>
                <span>Adresse email</span>
                <div>{userData.email}</div>
              </div>
              <div className='profile-container__personnal__pictureemailpassword__emailpassword__password'>
                <span>Mot de passe</span>
                <div>∗∗∗∗∗∗∗</div>
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
              <button
                className='profile-container-buttons-button'
                // va supprimer le profil
                onClick={handleDeleteProfile}
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
        !mobileVersion) && (
        <section
          className={`profile-container__roll-modale-${
            mobileVersion ? 'mobile-version' : 'desktop-version'
          }`}
        >
          <div
            className={`profile-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
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
            // deleteFavorites={deleteFavorites}
            // addFavorites={addFavorites}

            handleRemoveFavorites={handleRemoveFavorites}
            handleAddFavorites={handleAddFavorites}
          />
        </section>
      )}
      {/* BOUTONS */}
      {mobileVersion && (
        <div className='profile-container__rollbuttons'>
          <div
            className='profile-container__rollbuttons__button'
            onClick={handleShowWatchedRoll}
          >
            <i className='fa-sharp fa-solid fa-check'></i>
            Vus
            <i className='fa-regular fa-heart'></i>
          </div>

          <div
            className='profile-container__rollbuttons__button'
            onClick={handleShowToWatchRoll}
          >
            <i className='fa-solid fa-xmark'></i>À voir
            <div></div>
          </div>
        </div>
      )}
      {/* affichage conditionnel du Footer en fonction du device */}
      {!mobileVersion && <Footer />}
    </main>
  );
  //* ================ FERMETURE COMPOSANT ================
};
export default Profile;

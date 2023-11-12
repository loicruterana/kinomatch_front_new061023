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
  // toWatchMoviesEntry,
} from '../../../utils/interfaces';
import API_BASE_URL from '../../../utils/config';
import { useUser } from '../../../hooks/useUser';

// ================ IMPORT CONTEXTS ================

import { AuthContext } from '../../../contexts/AuthContext';
// import { LoadingContext } from '../../../contexts/LoadingContext';

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

  // Si l'utilisateur n'a pas d'id et qu'il est sur l'url contenant /profile alors on le redirige vers la page de connexion
  //   useEffect(() => {

  //   if (!user?.id) {
  //     // on redirige vers la page de connexion
  //     navigate('/login');
  //   }
  // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   , [user]);


  // un état pour savoir si on est sur mobile ou pas
  const [mobileVersion, setMobileVersion] = useState<boolean>(false);
  // pour afficher ou masquer WatchedRoll (films vus -> ✓)
  const [showWatchedRoll, setShowWatchedRoll] = useState<boolean>(true);
  // pour afficher ou masquer ToWatchRoll (films à voir)
  const [showToWatchRoll, setShowToWatchRoll] = useState<boolean>(true);
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
  }

  //handler pour afficher le roll Watched (films vus -> ✓)
  function handleShowWatchedRoll(): void {
    setShowWatchedRoll(true);
  }

  //handler pour afficher le roll ToWatch (films à voir)
  function handleShowToWatchRoll(): void {
    setShowToWatchRoll(true);
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
          // Code to run regardless of whether the promise is resolved or rejected
          // This is where you can put additional cleanup or logic
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

  //useEffect pour récupérer les id des films vus
  // useEffect(() => {
  //   if (user.id) {

  //   // pour activer le loader
  //   // load();
  //   const searchParams = new URLSearchParams();
  //   searchParams.append('userID', userData.id);
  //   axios
  //     // envoie la requête au back pour récupérer les films vus
  //     .get(`${API_BASE_URL}/watchedMovies?${searchParams.toString()}`)
  //     .then(({ data }) => {
  //       // stocke les données dans le state watchedList
  //       setWatchedList(data.watchedListTitles);
  //       console.log('ICI', data.watchedListTitles);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  //   setUserEvent(false);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userEvent]);

  // =========================== WATCHEDLISTMOVIES ===========================

  // Définition de la fonction fetchMovieTitles en dehors des useEffect
  // const fetchMovieTitles = async () => {
  //   try {
  //     const requests = watchedList.map((watchedListItem) => {
  //       const searchParams = new URLSearchParams();
  //       searchParams.append('movieID', watchedListItem?.film_id ?? '');
  //       return axios.get(`${API_BASE_URL}/detail?${searchParams.toString()}`);
  //     });

  //     Promise.all(requests)
  //       .then((responses) => {
  //         const moviesToAdd = responses.map(({ data }) => ({
  //           name: data.title,
  //           movie_id: data.id,
  //         }));

  //         // Utilise un objet pour stocker les films uniques
  //         const uniqueMovies: Record<
  //           string,
  //           { name: string; movie_id?: string }
  //         > = {};

  //         // Parcourir la liste des films à ajouter
  //         moviesToAdd.forEach((movie) => {
  //           // S'il n'existe pas, l'ajouter à l'objet uniqueMovies
  //           uniqueMovies[movie.movie_id?.toString()] = movie;
  //         });

  //         // on stocke les noms des films dans le state watchedMovies
  //         setWatchedMovies(uniqueMovies);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // Premier useEffect pour mettre à jour les films regardés au chargement initial
  // useEffect(() => {
  //   fetchMovieTitles();
  //   setUserEvent(false);
  // }, []);

  // // Deuxième useEffect pour mettre à jour les films regardés chaque fois que watchedList change
  // useEffect(() => {
  //   fetchMovieTitles();
  // }, [watchedList]);

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
              // console.log('est-ce');

              // Utiliser un objet pour stocker les id des films favoris
              // const favorites: FavoritesListObject = {};
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              // console.log(data);
              // data.forEach((element: any) => {
              //   const key = element.film_id?.toString();
              //   favorites[key] = element as FavoritesItem;
              // });
              // console.log(data);
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
  }, [user.id]);

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

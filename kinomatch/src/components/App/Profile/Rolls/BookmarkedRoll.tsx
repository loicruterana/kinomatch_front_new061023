// ================ IMPORT BIBLIOTHEQUES ================
import React from 'react';
import { Link } from 'react-router-dom';

import {
  WatchedListEntry,
  WatchedListArray,
  WatchedMoviesObject,
  ToWatchListArray,
  toWatchMoviesObject,
  FavoritesListObject,
} from '../../../../utils/interfaces';

// ================ IMPORT CONTEXTS ================

interface BookmarkedRollProps {
  isLoading: boolean;
  mobileVersion: boolean;
  showWatchedRoll: boolean;
  // setShowWatchedRoll: React.Dispatch<React.SetStateAction<boolean>>;
  watchedList: WatchedListArray;
  watchedMovies: WatchedMoviesObject;
  toWatchList: ToWatchListArray;
  toWatchMovies: toWatchMoviesObject;
  favoritesList: FavoritesListObject;
  setWatchedList: React.Dispatch<React.SetStateAction<WatchedListArray>>;
  showToWatchRoll: boolean;
  showRecommendedMoviesRoll: boolean;
  recommendedMovies: ToWatchListArray;
  // setShowToWatchRoll: React.Dispatch<React.SetStateAction<boolean>>;
  setToWatchList: React.Dispatch<React.SetStateAction<ToWatchListArray>>;
  deleteToWatch: (element: { movie: string }) => void;
  deleteFavoritesAndWatched: (element: { movie: string }) => void;
  handleAddFavorites: (film_id: string) => void;
  handleRemoveFavorites: (film_id: string) => void;
  addWatched: (element: { movie: string }) => void;
  userEvent: boolean;
  setUserEvent: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickOut: () => void;
}

//* ================ COMPOSANT ================

export const BookmarkedRoll: React.FC<BookmarkedRollProps> = ({
  isLoading,
  mobileVersion,
  showWatchedRoll,
  // setShowWatchedRoll,
  watchedList,
  showRecommendedMoviesRoll,
  recommendedMovies,
  // watchedMovies,
  toWatchList,
  // toWatchMovies,
  favoritesList,
  setWatchedList,
  showToWatchRoll,
  // setShowToWatchRoll,
  setToWatchList,
  deleteToWatch,
  deleteFavoritesAndWatched,
  handleAddFavorites,
  handleRemoveFavorites,
  addWatched,
  // userEvent,
  setUserEvent,
  handleClickOut,
}) => {
  // =========================== USESTATES ===========================

  // =========================== HANDLERS ===========================

  // handler pour supprimer un film de la liste des films vus, et par conséquent des films préférés
  function handleRemoveWatched(film_id: string) {
    deleteFavoritesAndWatched({ movie: film_id });
    setWatchedList((state) =>
      state.filter((element) => element.film_id !== film_id)
    );
  }

  // handler pour supprimer un film de la liste des films à voir
  function handleRemoveToWatch(film_id: string) {
    const film = { movie: film_id };
    deleteToWatch(film);
    setToWatchList((state) =>
      state.filter((element) => element.film_id !== film_id)
    );
  }

  function handlefromToWatchToWatched(film_id: string) {
    setToWatchList((state) =>
      state.filter((element) => element.film_id !== film_id)
    );
    deleteToWatch({ movie: film_id });

    // setWatchedList((state) => [...state, film_id]);
    
    // ici on ajoute le film à la liste des films vus
    addWatched({ movie: film_id });
    setUserEvent(true);
  }

  // ================ JSX ================
  return (
    <>
      {/* // ================ JSX : ROLL WATCHED ================ */}

      {/* affichage conditionnel du roll des films vus */}
      {((showWatchedRoll && mobileVersion) || !mobileVersion) && (
        <div
          className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__column`}
        >
          <div
            className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll`}
          >
            <div
              className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                }__roll-container`}
            >
              <div
                className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container__item-category`}
              >
                {/* bouton coeur */}
                <i className='fa-regular fa-heart'></i>
                Vus
                {/* bouton checked */}
                <i className='fa-sharp fa-solid fa-check'></i>
              </div>
              {/* affichage conditionnel du loader ou de la liste des films vus */}
              {isLoading ? (
                <div>Chargement en cours...</div>
              ) : (
                watchedList.map((watchedListItem: WatchedListEntry) => {
                  return (
                    <button
                      className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item`}
                      key={watchedListItem.film_id}
                    >
                      {/* Bouton de coeur */}
                      <i
                        className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-a fa-${favoritesList.some(
                            (element) =>
                              element.film_id === watchedListItem.film_id
                          )
                            ? 'solid'
                            : 'regular'
                          } fa-heart`}
                        // pour vérifier si le film est dans la liste des films préférés
                        onClick={() => {
                          const isFavorite = favoritesList.some(
                            (element) =>
                              element.film_id === watchedListItem.film_id
                          );
                          if (isFavorite) {
                            handleRemoveFavorites(watchedListItem.film_id);
                          } else {
                            handleAddFavorites(watchedListItem.film_id);
                          }
                        }}
                        // pour changer la couleur du coeur si le film est dans la liste des films préférés
                        style={{
                          color: favoritesList.some(
                            (element) =>
                              element.film_id === watchedListItem.film_id
                          )
                            ? '#D42121'
                            : '',
                        }}
                      ></i>

                      <Link to={`/films?filmID=${watchedListItem.film_id}`}>
                        {watchedListItem.film_title}
                      </Link>

                      {/* Bouton de suppression (croix) */}
                      <i
                        // suppression du film de la liste des films vus
                        onClick={() =>
                          handleRemoveWatched(watchedListItem.film_id)
                        }
                        className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-b fa-solid fa-xmark`}
                      ></i>
                    </button>
                  );
                })
              )}
            </div>
          </div>
          <div
            className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__column__returnbuttonarea`}
          >
            <button
              className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                }__column__returnbuttonarea__return`}
              onClick={() => {
                handleClickOut();
              }}
            >
              Retour
            </button>
          </div>
        </div>
      )}

      {/* // ================ JSX : ROLL TOWATCH ================ */}

      {/* affichage conditionnel du roll des films à voir selon le device*/}
      {((showToWatchRoll && mobileVersion) || !mobileVersion) && (
        <div
          className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__column`}
        >
          <div
            className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll`}
          >
            <div
              className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                }__roll-container`}
            >
              <div
                className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container__item-category`}
              >
                <i className='fa-sharp fa-solid fa-check'></i>À voir
                <i className='fa-sharp fa-regular fa-bookmark'></i>
                {/* <i className='fa-rexgular fa-heart'></i> */}
                <div></div>
              </div>
              {/* affichage conditionnel du loader ou de la liste des films à voir */}
              {isLoading ? (
                <div>Chargement en cours...</div>
              ) : (
                toWatchList.map((toWatchListItem) => {
                  return (
                    <div
                      className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item`}
                      key={toWatchListItem.film_id}
                    >
                      <i
                        className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-c fa-sharp fa-solid fa-check `}
                        onClick={() =>
                          handlefromToWatchToWatched(toWatchListItem.film_id)
                        }
                      ></i>

                      <Link to={`/films?filmID=${toWatchListItem.film_id}`}>
                        {toWatchListItem.film_title}
                      </Link>
                      {/* bouton de bookmark croix */}
                      <i
                        // pour supprimer le film de la liste des films à voir
                        onClick={() =>
                          handleRemoveToWatch(toWatchListItem.film_id)
                        }
                        className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-b fa-solid fa-xmark`}
                      ></i>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div
            className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__column__returnbuttonarea`}
          >
            <button
              className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                }__column__returnbuttonarea__return`}
              onClick={() => {
                handleClickOut();
              }}
            >
              Retour
            </button>
          </div>
        </div>
      )}



      {/* // ================ JSX : ROLL RECOMMENDED MOVIE ================ */}

      {/* affichage conditionnel du roll des films recommandés par les utilisateurs */}
      {((showRecommendedMoviesRoll && mobileVersion) || !mobileVersion) && (
        <div
          className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__column`}
        >
          <div
            className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll`}
          >
            <div
              className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                }__roll-container`}
            >
              <div
                className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container__item-category`}
              >
                <i className='fa-regular fa-paper-plane'></i>Recommandés
                {/* <i className='fa-rexgular fa-heart'></i> */}
                <div></div>
              </div>
              {/* affichage conditionnel du loader ou de la liste des films recommandés */}
              {isLoading ? (
                <div>Chargement en cours...</div>
              ) : (
                recommendedMovies.map((toWatchListItem) => {
                  return (
                    <div
                      className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item`}
                      key={toWatchListItem.film_id}
                    >
                      <i
                        className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-c fa-sharp fa-solid fa-check `}
                        onClick={() =>
                          handlefromToWatchToWatched(toWatchListItem.film_id)
                        }
                      ></i>

                      <Link to={`/films?filmID=${toWatchListItem.film_id}`}>
                        {toWatchListItem.film_title}
                      </Link>
                      {/* bouton de bookmark croix */}
                      <i
                        // pour supprimer le film de la liste des films à voir
                        onClick={() =>
                          handleRemoveToWatch(toWatchListItem.film_id)
                        }
                        className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-b fa-solid fa-xmark`}
                      ></i>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div
            className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__column__returnbuttonarea`}
          >
            <button
              className={`profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                }__column__returnbuttonarea__return`}
              onClick={() => {
                handleClickOut();
              }}
            >
              Retour
            </button>
          </div>
        </div>
      )}
    </>
  );

  //* ================ FERMETURE COMPOSANT ================
};

export default BookmarkedRoll;

// ================ IMPORT BIBLIOTHEQUES ================
import React from 'react';
import {
  WatchedListEntry,
  WatchedListArray,
  WatchedMoviesObject,
  ToWatchListArray,
  toWatchMoviesObject,
  BookmarkedListObject,
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
  bookmarkedList: BookmarkedListObject;
  setWatchedList: React.Dispatch<React.SetStateAction<WatchedListArray>>;
  showToWatchRoll: boolean;
  // setShowToWatchRoll: React.Dispatch<React.SetStateAction<boolean>>;
  setToWatchList: React.Dispatch<React.SetStateAction<ToWatchListArray>>;
  deleteToWatch: (element: { movie: string }) => void;
  deleteBookmarkedAndWatched: (element: { movie: string }) => void;
  handleAddBookmarked: (film_id: string) => void;
  handleRemoveBookmarked: (film_id: string) => void;
}

//* ================ COMPOSANT ================

export const BookmarkedRoll: React.FC<BookmarkedRollProps> = ({
  isLoading,
  mobileVersion,
  showWatchedRoll,
  // setShowWatchedRoll,
  watchedList,
  watchedMovies,
  toWatchList,
  toWatchMovies,
  bookmarkedList,
  setWatchedList,
  showToWatchRoll,
  // setShowToWatchRoll,
  setToWatchList,
  deleteToWatch,
  deleteBookmarkedAndWatched,
  handleAddBookmarked,
  handleRemoveBookmarked,
}) => {
  // =========================== HANDLERS ===========================

  // handler pour supprimer un film de la liste des films vus, et par conséquent des films préférés
  function handleRemoveWatched(film_id: string) {
    deleteBookmarkedAndWatched({ movie: film_id });
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

  // ================ JSX ================
  return (
    <>
      {/* // ================ JSX : ROLL WATCHED ================ */}

      {/* affichage conditionnel du roll des films vus */}
      {((showWatchedRoll && mobileVersion) || !mobileVersion) && (
        <div
          className={`Profile-container__roll-modale-${
            mobileVersion ? 'mobile-version' : 'desktop-version'
          }__column`}
        >
          <div
            className={`Profile-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll`}
          >
            <div
              className={`Profile-container__roll-modale-${
                mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-container`}
            >
              <div
                className={`Profile-container__roll-modale-${
                  mobileVersion ? 'mobile-version' : 'desktop-version'
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
                      className={`Profile-container__roll-modale-${
                        mobileVersion ? 'mobile-version' : 'desktop-version'
                      }__roll-container__item`}
                      key={watchedListItem.id}
                    >
                      {/* Bouton de bookmark coeur */}
                      <i
                        className={`Profile-container__roll-modale-${
                          mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-a fa-${
                          bookmarkedList[Number(watchedListItem.film_id)]
                            ? 'solid'
                            : 'regular'
                        } fa-heart`}
                        // pour vérifier si le film est dans la liste des films préférés
                        onClick={() => {
                          if (bookmarkedList[Number(watchedListItem.film_id)]) {
                            handleRemoveBookmarked(watchedListItem.film_id);
                          } else {
                            handleAddBookmarked(watchedListItem.film_id);
                          }
                        }}
                        // pour changer la couleur du coeur si le film est dans la liste des films préférés
                        style={{
                          color: bookmarkedList[Number(watchedListItem.film_id)]
                            ? '#D42121'
                            : '',
                        }}
                      ></i>

                      {watchedMovies[Number(watchedListItem.film_id)]?.name}

                      {/* Bouton de suppression (croix) */}
                      <i
                        // suppression du film de la liste des films vus
                        onClick={() =>
                          handleRemoveWatched(watchedListItem.film_id)
                        }
                        className={`Profile-container__roll-modale-${
                          mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-b fa-solid fa-xmark`}
                      ></i>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* // ================ JSX : ROLL TOWATCH ================ */}

      {/* affichage conditionnel du roll des films à voir selon le device*/}
      {((showToWatchRoll && mobileVersion) || !mobileVersion) && (
        <div
          className={`Profile-container__roll-modale-${
            mobileVersion ? 'mobile-version' : 'desktop-version'
          }__column`}
        >
          <div
            className={`Profile-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll`}
          >
            <div
              className={`Profile-container__roll-modale-${
                mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-container`}
            >
              <div
                className={`Profile-container__roll-modale-${
                  mobileVersion ? 'mobile-version' : 'desktop-version'
                }__roll-container__item-category`}
              >
                {/* <i className='fa-sharp fa-solid fa-check'></i> */}
                <i className='fa-sharp fa-regular fa-bookmark'></i>À voir
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
                      className={`Profile-container__roll-modale-${
                        mobileVersion ? 'mobile-version' : 'desktop-version'
                      }__roll-container__item`}
                      key={toWatchListItem.id}
                    >
                      {toWatchMovies[Number(toWatchListItem.film_id)]?.name}
                      {/* bouton de bookmark croix */}
                      <i
                        // pour supprimer le film de la liste des films à voir
                        onClick={() =>
                          handleRemoveToWatch(toWatchListItem.film_id)
                        }
                        className={`Profile-container__roll-modale-${
                          mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-b fa-solid fa-xmark`}
                      ></i>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  //* ================ FERMETURE COMPOSANT ================
};

export default BookmarkedRoll;

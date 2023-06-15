// ================ IMPORT BIBLIOTHEQUES ================
import React from 'react'
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
  deleteToWatch: (element: { movie: string; }) => void;
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
  handleRemoveBookmarked
}) => {

// =========================== HANDLERS ===========================

// handler pour supprimer un film de la liste des films vus, et par conséquent des films préférés 
  function handleRemoveWatched(film_id : string) {
    deleteBookmarkedAndWatched({ movie: film_id });
    setWatchedList(state => state.filter(element => element.film_id !== film_id));
  }

// handler pour supprimer un film de la liste des films à voir 
  function handleRemoveToWatch(film_id : string) {
    const film = { movie: film_id };
    deleteToWatch(film);
    setToWatchList(state => state.filter(element => element.film_id !== film_id));
  }


  // ================ JSX ================
  return (
    <>


      {/* // ================ JSX : ROLL WATCHED ================ */}

      {((showWatchedRoll && mobileVersion) || !mobileVersion) && (
        <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__column`}>
          <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll`}>
            <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
              <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>
                <i className='fa-regular fa-heart'></i>
                Vus
                <i className='fa-sharp fa-solid fa-check'></i>
              </div>
              {isLoading ? (
                <div>Chargement en cours...</div>
              ) : (
                watchedList
                  // .filter((value, index, self) => self.findIndex(item => item.name === value.name) === index) // Supprime les doublons en se basant sur le nom
                  .map((watchedListItem : WatchedListEntry) => {
                    // const isBookmarked = bookmarkedItems.includes(watchedListItem.film_id);

                    return (
                      <div
                        className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
                        key={watchedListItem.id}
                      >
                        {/* Bouton de bookmark */}
                        <i
                          className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-a fa-${bookmarkedList[Number(watchedListItem.film_id)] ? 'solid' : 'regular'
                            } fa-heart`}
                          onClick={() => {
                            if (bookmarkedList[Number(watchedListItem.film_id)]) {
                              handleRemoveBookmarked(watchedListItem.film_id);
                            } else {
                              handleAddBookmarked(watchedListItem.film_id);
                            }
                          }}
                          style={{ color: bookmarkedList[Number(watchedListItem.film_id)] ? '#D42121' : '' }}
                        ></i>

                          {watchedMovies[Number(watchedListItem.film_id)]?.name}

                        <i
                          onClick={() => handleRemoveWatched(watchedListItem.film_id)}
                          className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-b fa-solid fa-xmark`}></i>
                      </div>
                    )
                  })
              )}
            </div>
          </div>
        </div>
      )}


      {/* // ================ JSX : ROLL TOWATCH ================ */}

      {((showToWatchRoll && mobileVersion) || !mobileVersion) && (
        <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__column`}>
          <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll`}>
            <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
              <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>
                {/* <i className='fa-sharp fa-solid fa-check'></i> */}
                <i className='fa-sharp fa-regular fa-bookmark'></i>
                À voir
                {/* <i className='fa-rexgular fa-heart'></i> */}
                <div></div>
              </div>
              {isLoading ? (
                <div>Chargement en cours...</div>
              ) : (
                toWatchList
                  .map((toWatchListItem
                    ) => {
                    return (
                      <div
                        className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
                        key={toWatchListItem.id}
                      >
                        {toWatchMovies[Number(toWatchListItem.film_id)]?.name}
                        <i
                          onClick={() => handleRemoveToWatch(toWatchListItem.film_id)}
                          className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-b fa-solid fa-xmark`}></i>
                      </div>
                    )
                  })
              )}
            </div>
          </div>
        </div>
      )}

    </>
  )

//* ================ FERMETURE COMPOSANT ================
}

export default BookmarkedRoll;
// ================ IMPORT BIBLIOTHEQUES ================
import React from 'react'
import {
  WatchedListArray,
  WatchedMoviesObject,
  ToWatchListArray,
  toWatchMoviesObject,
  BookmarkedListObject,
} from '../../../../utils/interfaces';

// ================ IMPORT SCSS ================

// ================ IMPORT CONTEXTS ================

interface BookmarkedRollProps {
  isLoading: boolean;
  mobileVersion: boolean;
  showWatchedRoll: boolean;
  showToWatchRoll: boolean;
  watchedList: WatchedListArray; // Remplacez "{ id: string; film_id: string }[]" par le type approprié pour la liste des films regardés
  watchedMovies: WatchedMoviesObject;
  toWatchList: ToWatchListArray; // Remplacez "{ id: string; film_id: string }[]" par le type approprié pour la liste des films à regarder
  toWatchMovies: toWatchMoviesObject;
  bookmarkedList: BookmarkedListObject; // Remplacez "{ [key: string]: boolean }" par le type approprié pour le dictionnaire des films favoris
  setWatchedList: React.Dispatch<React.SetStateAction<WatchedListArray>>; // Remplacez "{ id: string; film_id: string }[]" par le type approprié pour la liste des films regardés
  setToWatchList: React.Dispatch<React.SetStateAction<ToWatchListArray>>; // Remplacez "{ id: string; film_id: string }[]" par le type approprié pour la liste des films à regarder
  deleteToWatch: (element: { movie: string; }) => void; // Remplacez "string" par le type approprié pour l'ID du film
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteBookmarkedAndWatched: (element: { movie: string; toString: () => any; }) => void; // Remplacez "string" par le type approprié pour l'ID du film
  handleAddBookmarked: (film_id: string) => void; // Remplacez "string" par le type approprié pour l'ID du film
  handleRemoveBookmarked: (film_id: string) => void; // Remplacez "string" par le type approprié pour l'ID du film
}



// ================ COMPOSANT ================
export const BookmarkedRoll : React.FC<BookmarkedRollProps> = ({
  isLoading,
  mobileVersion,
  showWatchedRoll,
  showToWatchRoll,

  watchedList,
  setWatchedList,
  watchedMovies,

  toWatchList,
  setToWatchList,
  toWatchMovies,
  deleteToWatch,


  deleteBookmarkedAndWatched,

  bookmarkedList,

  handleAddBookmarked,
  handleRemoveBookmarked
}) => {

  // const [bookmarkedItems, setBookmarkedItems] = useState([]);


  // =========================== HANDLERS

  // =========================== HANDLERBOUTON X

  function handleRemoveWatched(film_id : string) {
    deleteBookmarkedAndWatched(film_id)
    setWatchedList(state => state.filter(element => element.film_id !== film_id));
  }

  // =========================== HANDLERBOUTON COEUR





  function handleRemoveToWatch(film_id : string) {
    deleteToWatch(film_id);
    setToWatchList(state => state.filter(element => element.film_id !== film_id));
  }

  console.log(bookmarkedList)
  // console.log(toWatchMovies)

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
                  .map((watchedListItem) => {
                    // const isBookmarked = bookmarkedItems.includes(watchedListItem.film_id);

                    return (
                      <div
                        className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
                        key={watchedListItem.id}
                      >
                        {/* Bouton de bookmark */}
                        <i
                          className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-a fa-${bookmarkedList[watchedListItem.film_id] ? 'solid' : 'regular'
                            } fa-heart`}
                          onClick={() => {
                            if (bookmarkedList[watchedListItem.film_id]) {
                              handleRemoveBookmarked(watchedListItem.film_id);
                            } else {
                              handleAddBookmarked(watchedListItem.film_id);
                            }
                          }}
                          style={{ color: bookmarkedList[watchedListItem.film_id] ? '#D42121' : '' }}
                        ></i>

                        {watchedMovies[watchedListItem.film_id]?.name}

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
                  .map((toWatchListItem) => {
                    return (
                      <div
                        className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
                        key={toWatchListItem.id}
                      >
                        {toWatchMovies[toWatchListItem.film_id]?.name}
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

  // ================ FERMETURE DU COMPOSANT ================
}

export default BookmarkedRoll;
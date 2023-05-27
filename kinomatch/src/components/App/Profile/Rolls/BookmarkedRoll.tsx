// ================ IMPORT BIBLIOTHEQUES ================
import React, {useContext, useState, useEffect} from 'react'
// import { LoadingContext } from '../../../../contexts/LoadingContext';


// ================ IMPORT SCSS ================

// ================ IMPORT CONTEXTS ================


// ================ COMPOSANT ================
export const BookmarkedRoll = ({
  isLoading, 
  mobileVersion, 
  showWatchedRoll, 
  setShowWatchedRoll,
  showToWatchRoll, 
  setShowToWatchRoll,

  watchedList, 
  setWatchedList,
  movies, 
  setMovies,
  deleteWatched, // à supprimer ?

  toWatchList, 
  setToWatchList,
  toWatchListWithName,
  setToWatchListWithName,
  deleteToWatch,


  deleteBookmarkedAndWatched, 
}) => {

      // =========================== HANDLERS

    // =========================== HANDLERBOUTON X

  function handleRemoveWatched(film_id) {
    deleteBookmarkedAndWatched(film_id)

    // essai pour gérer la partie dynamique

    setWatchedList(state => state.filter(element => element.film_id !== film_id));

    // console.log('Avant le filtrage :', movies);
    // setMovies(state => state.filter(element => element.movie_id !== event.target.dataset.id));
    // console.log('Après le filtrage :', movies);

  }

    // =========================== HANDLER BOUTON COEUR


  // function handleRemoveBookmarksAndWatched(event) {

  //   deleteBookmarkedAndWatched(event.target.dataset.id.toString())

  // }


 
  

//  function handleRemoveBookmark(event) {
//   const movieId = event.target.dataset.id;
//   deleteBookmarked(movieId);

//   // Supprimer l'élément de la liste bookmarkedList
//   setBookmarkedList(prevList => {
//     const index = prevList.findIndex(item => item.id === movieId);
//     if (index !== -1) {
//       const newList = [...prevList];
//       newList.splice(index, 1);
//       return newList;
//     }
//     return prevList;
//   });

//   // Supprimer l'élément de la liste bookmarkedListWithName en comparant les valeurs d'ID
//   setBookmarkedListWithName(prevList => {
//     const index = prevList.findIndex(item => item.movie_id === movieId);
//     if (index !== -1) {
//       const newList = [...prevList];
//       newList.splice(index, 1);
//       return newList;
//     }
//     return prevList;
//   });
// }

console.log('WITHOUT NAME:');
console.log(watchedList);

console.log('WITh NAME :' );
console.log(movies);
// console.log(toWatchWithName);



function handleRemoveToWatch(event) {
  console.log((event.target.dataset.id));

  console.log(event.target.dataset.id);
  deleteToWatch(event.target.dataset.id.toString());

  // essai pour gérer la partie dynamique
  
  setToWatchList(state => state.filter(element => element !== event.target.dataset.id));
  
  setToWatchListWithName(toWatchList.filter(item => item.movie_id !== event.target.dataset.id));


}

console.log(toWatchListWithName)


// ================ JSX ================
  return (
    <>


{/* // ================ JSX : ROLL WATCHED ================ */}

{((showWatchedRoll && mobileVersion) || !mobileVersion) && (
  <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
    <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>
      <i className='fa-sharp fa-solid fa-check'></i>
      Vus
      <i className='fa-regular fa-heart'></i>
    </div>
    {isLoading ? (
      <div>Chargement en cours...</div>
    ) : (
      watchedList
        // .filter((value, index, self) => self.findIndex(item => item.name === value.name) === index) // Supprime les doublons en se basant sur le nom
        .map((watchedListItem) => {
          return(
          <div
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
            key={watchedListItem.id}
            // onClick={handleGenreClick}
            data-id={watchedListItem.film_id}
          >
            {/* COEUR */}
            <i 
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-a fa-regular fa-heart`}
            // onClick={() => handleRemoveWatched(watchedListItem.film_id)}
            data-id={watchedListItem.film_id}
            ></i>

            {movies[watchedListItem.film_id]?.name}

            <i 
            onClick={() => handleRemoveWatched(watchedListItem.film_id)}
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-b fa-solid fa-xmark`}></i>
          </div>
        )})
    )}
  </div>
)}


{/* // ================ JSX : ROLL TOWATCH ================ */}



{((showToWatchRoll && mobileVersion) || !mobileVersion) && (
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
      toWatchListWithName
        .filter((value, index, self) => self.findIndex(item => item.name === value.name) === index) // Supprime les doublons en se basant sur le nom
        .map((toWatchListWithNameItem) => (
          <div
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
            key={toWatchListWithNameItem.movie_id}
            // onClick={handleGenreClick}
            data-id=
            {toWatchListWithNameItem.movie_id}
          >
            {toWatchListWithNameItem.name}
            <i 
            data-id={toWatchListWithNameItem.movie_id}
            onClick={handleRemoveToWatch}
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-b fa-solid fa-xmark`}></i>
          </div>
        ))
    )}
  </div>
)}

    </>
  )

// ================ FERMETURE DU COMPOSANT ================
}

export default BookmarkedRoll;
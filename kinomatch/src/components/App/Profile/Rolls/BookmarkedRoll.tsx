// ================ IMPORT BIBLIOTHEQUES ================
import React, {useContext, useState, useEffect} from 'react'
// import { LoadingContext } from '../../../../contexts/LoadingContext';


// ================ IMPORT SCSS ================
// import './Rolls.scss';

// ================ IMPORT CONTEXTS ================


// ================ COMPOSANT ================
export const BookmarkedRoll = ({mobileVersion, showBookmarkedRoll, bookmarkedList, isLoading, bookmarkedListWithName, deleteBookmarked, setBookmarkedList, setBookmarkedListWithName}) => {

 function handleRemoveBookmark (event) {
  console.log(event.target.dataset.id)
  deleteBookmarked(event.target.dataset.id)
  setBookmarkedList(state => state.filter(element => element !== event.target.dataset.id));
  setBookmarkedListWithName(prevList => prevList.filter(item => item.movie_id !== event.target.dataset.id))
  console.log(bookmarkedList)
  console.log(bookmarkedListWithName)

 }


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



// ================ JSX ================
  return (
    <>

      {/* <div className={`Profile-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}`}> */}

{/* // ================ JSX : ROLL BOOKMARKED ================ */}

{((showBookmarkedRoll && mobileVersion) || !mobileVersion) && (
  <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
    <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>
      <i className='fa-sharp fa-solid fa-check'></i>
      Vus
      <i className='fa-regular fa-heart'></i>
    </div>
    {isLoading ? (
      <div>Chargement en cours...</div>
    ) : (
      bookmarkedListWithName
        .filter((value, index, self) => self.findIndex(item => item.name === value.name) === index) // Supprime les doublons en se basant sur le nom
        .map((bookmarkedListWithNameItem) => (
          <div
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
            key={bookmarkedListWithNameItem.id}
            // onClick={handleGenreClick}
            data-id={bookmarkedListWithNameItem.movie_id}
          >
            <i className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item fa-regular fa-heart`}></i>

            {bookmarkedListWithNameItem.name}

            <i 
            onClick={handleRemoveBookmark}
            data-id={bookmarkedListWithNameItem.movie_id}
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item fa-solid fa-xmark`}></i>
          </div>
        ))
    )}
  </div>
)}

{((showBookmarkedRoll && mobileVersion) || !mobileVersion) && (
  <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
    <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>
      {/* <i className='fa-sharp fa-solid fa-check'></i> */}
      <i className='fa-sharp fa-regular fa-bookmark'></i> 
      À voir
      {/* <i className='fa-regular fa-heart'></i> */}
      <div></div>
    </div>
    {isLoading ? (
      <div>Chargement en cours...</div>
    ) : (
      bookmarkedListWithName
        .filter((value, index, self) => self.findIndex(item => item.name === value.name) === index) // Supprime les doublons en se basant sur le nom
        .map((bookmarkedListWithNameItem) => (
          <div
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
            key={bookmarkedListWithNameItem.id}
            // onClick={handleGenreClick}
            data-id={bookmarkedListWithNameItem.movie_id}
          >
            {bookmarkedListWithNameItem.name}
            <i 
            // onClick={handleRemoveBookmark()}
            className={`Profile-container__roll-modale--${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item fa-solid fa-xmark`}></i>
          </div>
        ))
    )}
  </div>
)}


{/* // ================ JSX : ROLL PROVIDERS ================ */}
{/* {((showToWatchRoll && mobileVersion) || !mobileVersion) && (
  <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
    <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}> 
    <i className='fa-sharp fa-solid fa-check'></i>
    À voir
    <i className='fa-regular fa-heart'></i>

    </div>
    {isLoading ? (
      <div>Chargement en cours...</div>
    ) : (
      toWatchListWithName
        .filter((value, index, self) => self.indexOf(value) === index) // Supprime les doublons
        .map((toWatchListWithNameItem) => (
          <div
            className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
            key={toWatchListWithNameItem}
            // onClick={handleGenreClick}
            data-id={toWatchListWithNameItem}
          >
            {toWatchListWithNameItem}    
            <i 
            // onClick={handleRemoveBookmark()}
            className={`Profile-container__roll-modale--${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item fa-solid fa-xmark`}></i>

          </div>
        ))
    )}
  </div>
)} */}

{/* // ================ JSX : ROLL DECENNIES ================ */}
{/* {( (showRollDecade && mobileVersion) || !mobileVersion) && 

<div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container`}>
  <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>DECENNIE</div>

  {decades.map((decade, index) => (
        <div key={index} className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container__item`} 
        onClick={handleDecadeClick}
        >
        {decade}
      </div>
    ))}
   
</div>
}  */}
      {/* </div> */}
          

    </>
  )

// ================ FERMETURE DU COMPOSANT ================
}

export default BookmarkedRoll;
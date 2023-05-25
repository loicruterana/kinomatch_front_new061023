// ================ IMPORT BIBLIOTHEQUES ================
import React, {useContext, useState, useEffect} from 'react'
// import { LoadingContext } from '../../../../contexts/LoadingContext';


// ================ IMPORT SCSS ================
// import './Rolls.scss';

// ================ IMPORT CONTEXTS ================


// ================ COMPOSANT ================
export const ToWatchRoll = ({mobileVersion, showToWatchRoll, toWatchList, isLoading, toWatchListWithName}) => {

 function handleRemoveBookmark () {

 }


// ================ JSX ================
  return (
    <>

      <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}`}>

{/* // ================ JSX : ROLL BOOKMARKED ================ */}

{((showToWatchRoll && mobileVersion) || !mobileVersion) && (
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
            onClick={handleRemoveBookmark}
            className={`Profile-container__roll-modale--${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item fa-solid fa-xmark`}></i>

          </div>
        ))
    )}
  </div>
)}
           

{/* // ================ JSX : ROLL PROVIDERS ================ */}
{/* {( (showRollProvider && mobileVersion) || !mobileVersion) && 

<div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container`}>
  <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>PLATEFORME</div>
  {
    isLoading ? "Chargement en cours" : preselectedProviders.map((preselectedProvider) => (
      <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container__item`}
      onClick={handleProviderClick}
      data-id={preselectedProvider.provider_id}
      >
        {preselectedProvider.provider_name}
      </div>
    ))
  } 
</div>
}  */}

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
      </div>
          

    </>
  )

// ================ FERMETURE DU COMPOSANT ================
}

export default ToWatchRoll;
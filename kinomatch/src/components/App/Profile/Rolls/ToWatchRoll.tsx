// ================ IMPORT BIBLIOTHEQUES ================
import React, {useContext, useState, useEffect} from 'react'
// import { LoadingContext } from '../../../../contexts/LoadingContext';


// ================ IMPORT SCSS ================
// import './Rolls.scss';

// ================ IMPORT CONTEXTS ================


// ================ COMPOSANT ================
export const ToWatchRoll = ({mobileVersion, showToWatchRoll, toWatchList, isLoading, toWatchListWithName}) => {

  const [tests, setTests] = useState(['321', '123']);

  // const { load, unload, isLoading } = useContext(LoadingContext);



  // bookmarkedMovies






  // useEffect(() => {
  //   load();
  
  //   axios.get('https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies')
  //     .then(({ data }) => setPreselectedGenres(data.genres))
  //     .catch((error) => console.error(error))
  //     .finally(() => unload());
  
  //   axios.get('https://deploy-back-kinomatch.herokuapp.com/providers')
  //     .then(({ data }) => {
  //       const filteredProviders = data.results
  //         .reduce((validProviders, currentProvider) => {
  //           if(
  //             currentProvider.display_priorities.hasOwnProperty('FR') &&
  //             currentProvider.display_priorities['FR'] < 20 &&
  //             !validProviders.includes(currentProvider)
  //             // !validProviders.find((provider) => provider.provider_name === currentProvider.provider_name)
  //           ) {
  //             validProviders.push(currentProvider);
  //           }
  
  //           return validProviders;
  //         }, []);
    
  //       setPreselectedProviders(Array.isArray(filteredProviders) ? filteredProviders : [filteredProviders]); // array
  
  //       // console.log(Array.isArray(filteredProviders));
  //       console.log(filteredProviders);
  //       console.log(preselectedProviders);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  //     .finally(() => unload());
  
  // }, []);



// ================ JSX ================
  return (
    <>

      <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}`}>

{/* // ================ JSX : ROLL BOOKMARKED ================ */}

{((showToWatchRoll && mobileVersion) || !mobileVersion) && (
  <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
    <div className={`Profile-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>Liste des films favoris</div>
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
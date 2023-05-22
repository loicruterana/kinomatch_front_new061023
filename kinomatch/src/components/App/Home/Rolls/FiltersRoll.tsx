// ================ IMPORT BIBLIOTHEQUES ================
import React, {useContext, useState} from 'react'

// ================ IMPORT SCSS ================
// import './Rolls.scss';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../../contexts/SelectedDecadeFiltersContext';


// ================ COMPOSANT ================
export const RollGenre = ({ preselectedGenres, preselectedProviders, mobileVersion, showRollGenre, showRollProvider, showRollDecade, isLoading }) => {
  
// ================ IMPORT PROPS CONTEXTS ================
  const { addGenreFilter , selectedGenreFilters } = useContext(SelectedGenreFiltersContext);
  const { addProviderFilter , selectedProviderFilters } = useContext(SelectedProviderFiltersContext);
  const { addDecadeFilter , selectedDecadeFilters } = useContext(SelectedDecadeFiltersContext);

  
  // const [isClicked, setIsClicked] = useState(false)

// ================ HANDLERS ================
function handleGenreClick(event) {
  const name = event.target.textContent;
  const genreId = event.target.dataset.id;
  // console.log(name, genreId)
  addGenreFilter(name, genreId) 
  // console.log(selectedGenreFilters)
}


  function handleProviderClick(event) {
    console.log('i')
    const name = event.target.textContent;
    const providerId = event.target.dataset.id; 
    // console.log(name, providerId)
   
    addProviderFilter(name, providerId);
    // console.log(name, providerId)

    // if (clickedItems.includes(filter)) {
    //   setClickedItems(clickedItems.filter(item => item !== filter));
    // } else {
    //   setClickedItems([...clickedItems, filter]);
    // }
    // faire en sorte de changer le style
    // setIsClicked(true)
  }

  function handleDecadeClick(event) {
    const filter = event.target.textContent;
    addDecadeFilter(filter);
    // if (clickedItems.includes(filter)) {
    //   setClickedItems(clickedItems.filter(item => item !== filter));
    // } else {
    //   setClickedItems([...clickedItems, filter]);
    // }
    // faire en sorte de changer le style
    // setIsClicked(true)
  }



  const decades = [];

  for (let i = 1890; i < 2030; i += 10) {
    decades.push(i);
  }

// ================ JSX ================
  return (
    <>

      <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}`}>

{/* // ================ JSX : ROLL GENRE ================ */}

{((showRollGenre && mobileVersion) || !mobileVersion) && 
  <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container`}>
    <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>GENRE</div>
    {
      isLoading ? "Chargement en cours" : preselectedGenres.map((preselectedGenre) => (
        <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container__item`} key={preselectedGenre.id} onClick={handleGenreClick} data-id={preselectedGenre.id}>
          {preselectedGenre.name}
        </div>
      ))
    } 
  </div>
}                

{/* // ================ JSX : ROLL PROVIDERS ================ */}
{( (showRollProvider && mobileVersion) || !mobileVersion) && 

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
} 

{/* // ================ JSX : ROLL DECENNIES ================ */}
{( (showRollDecade && mobileVersion) || !mobileVersion) && 

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
} 
      </div>
          

    </>
  )

// ================ FERMETURE DU COMPOSANT ================
}

export default RollGenre;
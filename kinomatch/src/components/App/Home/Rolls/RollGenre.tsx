// ================ IMPORT BIBLIOTHEQUES ================
import React, {useContext, useState} from 'react'

// ================ IMPORT SCSS ================
// import './Rolls.scss';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../../contexts/SelectedDecadeFiltersContext';


// ================ COMPOSANT ================
export const RollGenre = ({ preselectedGenres, preselectedProviders, mobileVersion, showRollGenre, showRollProvider, showRollDecade }) => {

  
// ================ IMPORT PROPS CONTEXTS ================
  const { addGenreFilter , selectedGenreFilters } = useContext(SelectedGenreFiltersContext);
  const { addProviderFilter , selectedProviderFilters } = useContext(SelectedProviderFiltersContext);
  const { addDecadeFilter , selectedDecadeFilters } = useContext(SelectedDecadeFiltersContext);

  
  // const [isClicked, setIsClicked] = useState(false)

// ================ HANDLERS ================
function handleGenreClick(event) {
  const name = event.target.textContent;
  const genreId = event.target.dataset.id;
  console.log(name, genreId)
  addGenreFilter(name, genreId) 
  console.log(selectedGenreFilters)
}


  function handleProviderClick(event) {
    const filter = event.target.textContent;
    addProviderFilter(filter);
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
      preselectedGenres.map((preselectedGenre) => (
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
    preselectedProviders.map((preselectedProvider) => (
      <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}__roll-container__item`} key={preselectedProvider.id} 
      onClick={handleProviderClick}
      data-id={preselectedProvider.id}
      >
        {preselectedProvider}
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
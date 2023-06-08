// ================ IMPORT BIBLIOTHEQUES ================
import React, { useContext, useState } from 'react'

// ================ IMPORT SCSS ================
// import './Rolls.scss';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../../contexts/SelectedDecadeFiltersContext';


// ================ COMPOSANT ================
export const RollGenre = ({ preselectedGenres, preselectedProviders, mobileVersion, showRollGenre, showRollProvider, showRollDecade, isLoading, handleClickOut }) => {

  // ================ IMPORT PROPS CONTEXTS ================
  const { addGenreFilter } = useContext(SelectedGenreFiltersContext);
  const { addProviderFilter } = useContext(SelectedProviderFiltersContext);
  const { addDecadeFilter } = useContext(SelectedDecadeFiltersContext);


  // const [isClicked, setIsClicked] = useState(false)

  // ================ HANDLERS ================
  function handleGenreClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    const name = target.textContent;
    const genreId = target.dataset.id;
    if (name !== null && genreId !== undefined) {
      addGenreFilter(name, genreId);
    }
  }
  
  function handleProviderClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    const name = target.textContent;
    const providerId = target.dataset.id;
    if (name !== null && providerId !== undefined) {
      addProviderFilter(name, providerId);
    }
  }
  
  function handleDecadeClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    const filter = target.textContent;
    if (filter !== null) {
      addDecadeFilter(filter);
    }
  }
  
  const decades = [];

  for (let i = 2020; i >= 1890; i -= 10) {
    decades.push(i);
  }

  // ================ JSX ================
  return (
    <>

      <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__filterRoll`}>

        {/* // ================ JSX : ROLL GENRE ================ */}
        <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-backgroundContainer`}>
          <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-background`}>
            {((showRollGenre && mobileVersion) || !mobileVersion) &&
              <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
                <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>GENRE</div>
                {
                  isLoading ? "Chargement en cours" : preselectedGenres.map((preselectedGenre) => (
                    <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`} key={preselectedGenre.id} onClick={handleGenreClick} data-id={preselectedGenre.id}>
                      {preselectedGenre.name}
                    </div>
                  ))
                }
              </div>
            }
          </div>
        </div>
        {/* // ================ JSX : ROLL PROVIDERS ================ */}
        <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-backgroundContainer`}>
          <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-background`}>
            {((showRollProvider && mobileVersion) || !mobileVersion) &&

              <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
                <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>PLATEFORME</div>
                {
                  isLoading ? "Chargement en cours" : preselectedProviders.map((preselectedProvider) => (
                    <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
                      onClick={handleProviderClick}
                      data-id={preselectedProvider.provider_id}
                    >
                      {preselectedProvider.provider_name}
                    </div>
                  ))
                }
              </div>
            }
          </div>
        </div>
        {/* // ================ JSX : ROLL DECENNIES ================ */}
        <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-backgroundContainer`}>
          <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-background`}  onClick={handleClickOut}>
            {((showRollDecade && mobileVersion) || !mobileVersion) &&

              <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container`}>
                <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item-category`}>DÉCENNIE</div>

                {decades.map((decade, index) => (
                  <div key={index} className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__roll-container__item`}
                    onClick={handleDecadeClick}
                  >
                    {decade}
                  </div>
                ))}

              </div>
            }
          </div >
        </div>
      </div>
    </>
  )

  // ================ FERMETURE DU COMPOSANT ================
}

export default RollGenre;
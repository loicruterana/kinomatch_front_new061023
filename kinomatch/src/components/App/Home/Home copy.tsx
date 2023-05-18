// ================ IMPORT BIBLIOTHEQUES ================
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';

// ================ IMPORT SCSS ================
import './Home.scss';

// ================ IMPORT COMPOSANTS ================
import RollGender from './Rolls/RollGenre';
import RollProvider from './Rolls/RollProvider';
import RollYear from './Rolls/RollYear';

// ================ IMPORT CONTEXTS ================
import { SelectedFiltersContext } from '../../../contexts/SelectedGenreFiltersContext';


// ================ COMPOSANT ================
export const Home = () => {

// ================ USESTATE ================
  const [ preselectedGenres, setPreselectedGenres ] = useState([])
  const [ preselectedProviders, setPreselectedProviders ] = useState([])
  const [ showRollGender, setShowRollGender ] = useState(false);
  const [ showRollProvider, setShowRollProvider ] = useState(false);
  const [ showRollYear, setShowRollYear ] = useState(false);

// ================ IMPORT PROPS CONTEXTS ================
  const { selectedFilters, addFilter, removeFilter } = useContext(SelectedFiltersContext);

// ================ USE EFFECT API ================
  useEffect(() => {
    axios.get(`https://deploy-back-kinomatch.herokuapp.com/genres`)
      .then(({ data }) => setPreselectedGenres(data.genres))
      .catch((error) => console.error(error));

      axios
      .get(`https://deploy-back-kinomatch.herokuapp.com/providers`)
      .then(({ data }) => {
        const filteredProviders = data.results.filter(
          (element) =>
            element.display_priorities.hasOwnProperty('FR') &&
            element.display_priorities['FR'] < 20 &&
            !preselectedProviders.includes(element.provider_name)
        );
// on passe par un Set pour avoir des éléments uniques
        const uniqueProviders = Array.from(
          new Set([...preselectedProviders, ...filteredProviders.map((element) => element.provider_name)])
        );
    
        setPreselectedProviders(uniqueProviders);
      })
      .catch((error) => console.error(error));
  }, []);

// ================ HANDLERS ================
  function handleClickOut (){
    setShowRollGender(false)
    setShowRollProvider(false)
    setShowRollYear(false)
  }

  function handleClickGender (){
    setShowRollGender(!showRollGender)
  }

  function handleClickProvider (){
    setShowRollProvider(!showRollProvider)
  }

  function handleClickYear (){
    setShowRollYear(!showRollYear)
  }

  function handleRemove(event){
    removeFilter(event.target.textContent)
  }

  function showDesktopVersion (){
    setShowRollGender(true)
    setShowRollNationality(true)
    setShowRollYear(true)
    setShowButtons(false)
    console.log('ça passe en version desktop')
  }

  function showMobileVersion (){
    setShowButtons(true)
    setShowRollGender(false)
    setShowRollNationality(false)
    setShowRollYear(false)
    console.log(showButtons);
    (console.log('ça passe en version mobile'))
  }
  

// ================ JSX ================
  return (
    <div className='Home-container'>

{/* // ================ JSX : FILTERS SELECTOR ================ */}
      <div className='Home-container__filters-selector'>

        <div className="Home-container__filters-selector__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedFilters.map((filter) => (
            <div className="Home-container__filters-selector__filters-container__filter"
            onClick={handleRemove}>
            {filter}
            </div>
          ))
          }
        </div>
{/* // bouton validé */}
        <button>Valider mon choix</button>

      </div>

{/* // ================ JSX : VERSION MOBILE ================ */}
{/* // affichage des rolls en version mobile */}
      <div className={`Home-container__roll-modale-mobile-version ${showRollGender && 'isActive'}`}>
        <div className="Home-container__roll-modale-mobile-version-backdropfilter" onClick={handleClickOut}>
        </div>
            <RollGender preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders}/>
      </div>

      <div className={`Home-container__roll-modale-mobile-version ${showRollProvider && 'isActive'}`}>
        <div className="Home-container__roll-modale-mobile-version-backdropfilter" onClick={handleClickOut}>
        </div>
            <RollProvider preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders}/>
      </div>
      
{/* // boutons en version mobile */}
      <div className="Home-container__buttons">

        <div className='Home-container__buttons__button'
        onClick={handleClickGender}
        >
        Genre
        </div>

        <div className='Home-container__buttons__button'
        onClick={handleClickProvider}
        >
        Plateforme
        </div>

        <div className='Home-container__buttons__button'
        onClick={handleClickYear}
        >
        Année
        </div>

      </div>


{/* // ================ JSX : VERSION DESKTOP ================ */}

{/* // rolls en version desktop */}
      <RollGender preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders}/>

    </div>
  )

// ================ FERMETURE DU COMPOSANT ================
}

export default Home;
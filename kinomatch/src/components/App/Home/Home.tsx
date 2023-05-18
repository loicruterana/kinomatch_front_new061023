// ================ IMPORT BIBLIOTHEQUES ================
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';

// ================ IMPORT SCSS ================
import './Home.scss';

// ================ IMPORT COMPOSANTS ================
import RollGenre from './Rolls/RollGenre';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../contexts/SelectedDecadeFiltersContext';


// ================ COMPOSANT ================
export const Home = () => {

// ================ USESTATE ================
  const [ preselectedGenres, setPreselectedGenres ] = useState([])
  const [ preselectedProviders, setPreselectedProviders ] = useState([])
  const [ showRollGenre, setShowRollGenre ] = useState(false);
  const [ showRollProvider, setShowRollProvider ] = useState(false);
  const [ showRollDecade, setShowRollDecade ] = useState(false);
  const [ mobileVersion, setMobileVersion ] = useState(false);


// ================ IMPORT PROPS CONTEXTS ================
  const { selectedGenreFilters, addGenreFilter, removeGenreFilter } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters, addProviderFilter, removeProviderFilter } = useContext(SelectedProviderFiltersContext);
  const { selectedDecadeFilters, addDecadeFilter, removeDecadeFilter } = useContext(SelectedDecadeFiltersContext);


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


  const handleSubmit = (event) => {
    load()
    const queryData = {
      genres: selectedGenreFilters,
      providers: selectedProviderFilters,
      decades: selectedDecadeFilters,
    };
    try{
      axios.post('https://deploy-back-kinomatch.herokuapp.com/films', queryData).then((response) => {
      console.log(response.status, response.data.token);
    });
  }catch{
    console.log('Response data:', response.data.error);
    console.log('Response status:', error.response.status);
    console.log('Response headers:', error.response.headers);    
    return
  }
  event.preventDefault();
  };


  //========


  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });


  useEffect(() => {
    function handleResize() {
      setWindowSize((prevState) => ({
        ...prevState,
        width: window.innerWidth
    }));

      if (windowSize.width > 900){
        setMobileVersion(false)
        setShowButtons(true)
        setShowRollGenre(false)
        setShowRollNationality(false)
        setShowRollDecade(false)
        
      }
      if (windowSize.width < 900){
        setMobileVersion(true)
        setShowRollNationality(true)
        setShowRollDecade(true)
        // setShowButtons(false)
      }
    }
    
    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize 
    // et actualiser le state windowSize
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, [windowSize]);

// ================ HANDLERS ================
  function handleClickOut (){
    setShowRollGenre(false)
    setShowRollProvider(false)
    setShowRollDecade(false)
  }

  function handleClickGenre (){
    setShowRollGenre(!showRollGenre)
  }

  function handleClickProvider (){
    setShowRollProvider(!showRollProvider)
  }

  function handleClickDecade (){
    setShowRollDecade(!showRollDecade)
  }

  function handleRemove(event){
    removeGenreFilter(event.target.textContent)
  }

  // function showDesktopVersion (){
  //   setShowRollGenre(true)
  //   setShowRollNationality(true)
  //   setShowRollDecade(true)
  //   setShowButtons(false)
  //   console.log('ça passe en version desktop')
  // }

  // function showMobileVersion (){
  //   setShowButtons(true)
  //   setShowRollGenre(false)
  //   setShowRollNationality(false)
  //   setShowRollDecade(false)
  //   console.log(showButtons);
  //   (console.log('ça passe en version mobile'))
  // }
  

// ================ JSX ================
  return (
    <div className='Home-container'>

{/* // ================ JSX : FILTERS SELECTOR ================ */}
      <div className='Home-container__filters-selector'>

        <div className="Home-container__filters-selector__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedGenreFilters.map((filter) => (
            <div className="Home-container__filters-selector__filters-container__filter"
            onClick={handleRemove}>
            {filter}
            </div>
          ))
          }
        </div>

        <div className="Home-container__filters-selector__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedProviderFilters.map((filter) => (
            <div className="Home-container__filters-selector__filters-container__filter"
            onClick={handleRemove}>
            {filter}
            </div>
          ))
          }
        </div>

        <div className="Home-container__filters-selector__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedDecadeFilters.map((filter) => (
            <div className="Home-container__filters-selector__filters-container__filter"
            onClick={handleRemove}>
            {filter}
            </div>
          ))
          }
        </div>
{/* // bouton validé */}
<form onSubmit={handleSubmit}>

        <button type='submit'>Valider mon choix</button>
        </form>
      </div>

{/* // ================ JSX : VERSION MOBILE ================ */}
{/* // affichage des rolls en version mobile */}
{((showRollGenre && mobileVersion) || (showRollProvider && mobileVersion) ||(showRollDecade && mobileVersion) || !mobileVersion) && 

  <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}`}>
          <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}-backdropfilter`} onClick={handleClickOut}>
          </div>
              <RollGenre preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} showRollGenre={showRollGenre} showRollProvider={showRollProvider} showRollDecade={showRollDecade} mobileVersion={mobileVersion}/>
        </div>
      }
      
{/* // boutons en version mobile */}
{mobileVersion && 
      <div className="Home-container__buttons">

        <div className='Home-container__buttons__button'
        onClick={handleClickGenre}
        >
        Genre
        </div>

        <div className='Home-container__buttons__button'
        onClick={handleClickProvider}
        >
        Plateforme
        </div>

        <div className='Home-container__buttons__button'
        onClick={handleClickDecade}
        >
        Année
        </div>
      </div>
            }



{/* // ================ JSX : VERSION DESKTOP ================ */}

{/* // rolls en version desktop */}
{/* { !mobileVersion && 

      <div className='test'>
        <RollGenre preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} mobileVersion={mobileVersion} showRollGenre={showRollGenre}/>
      </div>
      } */}

    </div>
  )

// ================ FERMETURE DU COMPOSANT ================
}

export default Home;
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
import { LoadingContext } from '../../../contexts/LoadingContext';


// ================ COMPOSANT ================
export const Home = () => {

// ================ USESTATE ================
  const [ preselectedGenres, setPreselectedGenres ] = useState([])
  const [ preselectedProviders, setPreselectedProviders ] = useState([])
  const [ showRollGenre, setShowRollGenre ] = useState(false);
  const [ showRollProvider, setShowRollProvider ] = useState(false);
  const [ showRollDecade, setShowRollDecade ] = useState(false);
  const [ mobileVersion, setMobileVersion ] = useState(false);
  const [ dataToTransfer, setDataToTransfer ] = useState(null);


// ================ IMPORT PROPS CONTEXTS ================
  const { selectedGenreFilters, addGenreFilter, removeGenreFilter } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters, addProviderFilter, removeProviderFilter } = useContext(SelectedProviderFiltersContext);
  const { selectedDecadeFilters, addDecadeFilter, removeDecadeFilter } = useContext(SelectedDecadeFiltersContext);
  const { load, unload, isLoading } = useContext(LoadingContext);



// ================ USE EFFECT API ================
useEffect(() => {
  load()
  axios.get('https://deploy-back-kinomatch.herokuapp.com/genres')
    .then(({ data }) => setPreselectedGenres(data.genres))
    .catch((error) => console.error(error));

  axios.get('https://deploy-back-kinomatch.herokuapp.com/providers')
    .then(({ data }) => {
      const filteredProviders = data.results
      .map((element) => element)
      .filter(
        (element) =>
          element.display_priorities.hasOwnProperty('FR') &&
          element.display_priorities['FR'] < 20 &&
          !preselectedProviders.includes(element.provider_name)
      );
    

      // const uniqueProviders = filteredProviders.map((element) => ({
      //   provider_name: element.provider_name,
      //   provider_id: element.provider_id,
      // }));

      
      // unload()
      // if (!isLoading) {
        setPreselectedProviders(filteredProviders);
      // }

      console.log(Array.isArray(filteredProviders));
      console.log(filteredProviders);
      console.log(preselectedProviders)
    })
    .catch((error) => console.error(error));
}, []);

//=================================

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // load();
    console.log("on passe par ici")
  
    // const queryData = {
    //   genres: selectedGenreFilters,
    //   providers: selectedProviderFilters,
    //   decades: selectedDecadeFilters,
    // };
  //   const queryString = 
  // {
  //   genre: 14,
  // }
  const searchParams = new URLSearchParams();
  // searchParams.append('genreID', '8');
  // searchParams.append('genre', '14');

  // searchParams.append('provider', '344');

  console.log(selectedGenreFilters)
  console.log(selectedDecadeFilters)


  selectedGenreFilters.forEach((filter) => {
    searchParams.append('genreID', filter.id);
  });

  selectedDecadeFilters.map((filter) => {
    searchParams.append('decade', filter);
  });


       const url = `https://deploy-back-kinomatch.herokuapp.com/films?${searchParams.toString()}`
   
    console.log(url)
  
    try {
      axios
        .get(url)
        .then((response) => {
          console.log(response.status, response.data.token, response.data);
          setDataToTransfer(response.data)
          console.log(dataToTransfer)
        })
        .catch((error) => {
          console.log('Response data:', error.response.data.error);
          console.log('Response status:', error.response.status);
          console.log('Response headers:', error.response.headers);
        });
    } catch (error) {
      console.error('Error:', error);
    }
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
        setShowRollGenre(true)
        setShowRollProvider(true)
        setShowRollDecade(true)
        
      }
      if (windowSize.width < 900){
        setMobileVersion(true)
        setShowRollGenre(false)
        setShowRollProvider(false)
        setShowRollDecade(false)
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
  

// ================ JSX ================
  return (
    <div className='Home-container'>

{/* // ================ JSX : FILTERS SELECTOR ================ */}
      <div className='Home-container__filters-selector'>

        <div className="Home-container__filters-selector__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedGenreFilters.map((filter) => (
            <div key={filter.id} className="Home-container__filters-selector__filters-container__filter"
            onClick={handleRemove}>
            {filter.name}
            </div>
          ))
          }
        </div>

        <div className="Home-container__filters-selector__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedProviderFilters.map((filter) => (
            <div key={filter.id} className="Home-container__filters-selector__filters-container__filter"
            onClick={handleRemove}>
            {filter}
            </div>
          ))
          }
        </div>

        <div className="Home-container__filters-selector__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedDecadeFilters.map((filter) => (
            <div key={filter.id} className="Home-container__filters-selector__filters-container__filter"
            onClick={handleRemove}>
            {filter}
            </div>
          ))
          }
        </div>
{/* // bouton validé */}
<form onSubmit={handleFormSubmit}>
  <button type="submit">Valider mon choix</button>
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
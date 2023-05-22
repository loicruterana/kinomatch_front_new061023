// ================ IMPORT BIBLIOTHEQUES ================
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";


// ================ IMPORT SCSS ================
import './Home.scss';

// ================ IMPORT COMPOSANTS ================
import FiltersRoll from './Rolls/FiltersRoll';
import Loading from '../Loading/Loading';


// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../contexts/SelectedDecadeFiltersContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { FetchedDataContext } from '../../../contexts/FetchedDataContext';



// ================ COMPOSANT ================
export const Home = () => {
  const navigate = useNavigate();

// ================ USESTATE ================
  const [ preselectedGenres, setPreselectedGenres ] = useState([])
  const [ preselectedProviders, setPreselectedProviders ] = useState();
  const [ showRollGenre, setShowRollGenre ] = useState(false);
  const [ showRollProvider, setShowRollProvider ] = useState(false);
  const [ showRollDecade, setShowRollDecade ] = useState(false);
  const [ mobileVersion, setMobileVersion ] = useState(false);
  // const [ dataToTransfer, setDataToTransfer ] = useState(null);
  // goToMoviePage
  const [ goToMoviePage, setGoToMoviePage ] = useState(false);



// ================ IMPORT PROPS CONTEXTS ================
  const { selectedGenreFilters, addGenreFilter, removeGenreFilter } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters, addProviderFilter, removeProviderFilter } = useContext(SelectedProviderFiltersContext);
  const { selectedDecadeFilters, addDecadeFilter, removeDecadeFilter } = useContext(SelectedDecadeFiltersContext);
  const { load, unload, isLoading } = useContext(LoadingContext);
  const { fetchedData, setFetchedData, addData } = useContext(FetchedDataContext);


  const coucou = preselectedProviders === undefined; // false

// console.log(selectedGenreFilters)

// ================ USE EFFECT API ================
useEffect(() => {
  load();

  axios.get('https://deploy-back-kinomatch.herokuapp.com/genres')
    .then(({ data }) => setPreselectedGenres(data.genres))
    .catch((error) => console.error(error))
    .finally(() => unload());

  axios.get('https://deploy-back-kinomatch.herokuapp.com/providers')
    .then(({ data }) => {
      const filteredProviders = data.results
        .reduce((validProviders, currentProvider) => {
          if(
            currentProvider.display_priorities.hasOwnProperty('FR') &&
            currentProvider.display_priorities['FR'] < 20 &&
            !validProviders.includes(currentProvider)
            // !validProviders.find((provider) => provider.provider_name === currentProvider.provider_name)
          ) {
            validProviders.push(currentProvider);
          }

          return validProviders;
        }, []);
  
      setPreselectedProviders(Array.isArray(filteredProviders) ? filteredProviders : [filteredProviders]); // array

      // console.log(Array.isArray(filteredProviders));
      console.log(filteredProviders);
      console.log(preselectedProviders);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => unload());

}, []);


// console.log(preselectedProviders); 


//=================================

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // load();
    // console.log("on passe par ici")
  
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

    selectedProviderFilters.map((filter) => {
      searchParams.append('providerID', filter.provider_id);
    });

    selectedDecadeFilters.map((filter) => {
      searchParams.append('decade', filter);
    });


    const url = `https://deploy-back-kinomatch.herokuapp.com/films?${searchParams.toString()}`
   
    console.log(url)

    navigate(`/films?${searchParams.toString()}`);
  
    // try {
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       console.log(response.status, response.data.token, response.data);
    //       console.log(response.data)
    //       addData(response.data)
    //       console.log(fetchedData)
    //       setGoToMoviePage(true)
    //     })
    //     .catch((error) => {
    //       console.log('Response data:', error.response.data.error);
    //       console.log('Response status:', error.response.status);
    //       console.log('Response headers:', error.response.headers);
    //     });
    // } catch (error) {
    //   console.error('Error:', error);
    // } finally{
    //   console.log(fetchedData)
    // }
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

  function handleRemoveGenre(event){
    removeGenreFilter(event.target.dataset.id)
  }
  function handleRemoveProvider(event){
    removeProviderFilter(event.target.dataset.id)
  }

  function handleRemoveDecade(event){
    removeDecadeFilter(event.target.dataset.id)
  }

  console.log(fetchedData)


  if (goToMoviePage) {
    return <Navigate to="/films"/>;
  }


// ================ JSX ================
  return (
    <div className='Home-container'>

{/* // ================ JSX : FILTERS SELECTOR ================ */}
      <div className='Home__filters-selector'>
      <div className="Home__filters-selector__containers">

        <div className="Home__filters-selector__containers__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedGenreFilters.map((filter) => (
            <div key={filter.id} className="Home__filters-selector__containers__filters-container__filter"
            >
            {filter.name}
            <div className="Home__filters-selector__containers__filters-container__filter__cross" onClick={handleRemoveGenre} data-id={filter.name}>
            <i className="fa-solid fa-xmark" data-id={filter.name} onClick={handleRemoveGenre}></i>            </div>

            </div>
          ))
          }
        </div>

        <div className="Home__filters-selector__containers__filters-container">
{/* // affichage des filtres sélectionnés */}
          {
            selectedProviderFilters.map((filter) => (
              <div key={filter.provider_id} className="Home__filters-selector__containers__filters-container__filter"
              >
              {filter.provider_name}
              <div className="Home__filters-selector__containers__filters-container__filter__cross" onClick={handleRemoveProvider} data-id={filter.provider_name}>
              <i className="fa-solid fa-xmark" data-id={filter.provider_name} onClick={handleRemoveProvider}></i>            
              </div>

              </div>
            ))
          }
        </div>


        <div className="Home__filters-selector__containers__filters-container">
{/* // affichage des filtres sélectionnés */}
          { selectedDecadeFilters.map((filter) => (
            <div key={filter.id} className="Home__filters-selector__containers__filters-container__filter"
            >
            {filter}
            <div className="Home__filters-selector__containers__filters-container__filter__cross" onClick={handleRemoveDecade} data-id={filter}>
            <i className="fa-solid fa-xmark" data-id={filter} onClick={handleRemoveDecade}></i>            
            </div>
            </div>
          ))
          }
        </div>

        </div>
{/* // bouton validé */}
<form onSubmit={handleFormSubmit}>
  <button type="submit">{!mobileVersion ? 'Valider mon choix' : 'Valider '}

  </button>
</form>

      </div>

{/* // ================ JSX : VERSION MOBILE ================ */}
{/* // affichage des rolls en version mobile */}
{((showRollGenre && mobileVersion) || (showRollProvider && mobileVersion) ||(showRollDecade && mobileVersion) || !mobileVersion) && 

  <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}`}>
          <div className={`Home-container__roll-modale-${mobileVersion? 'mobile-version' : 'desktop-version'}-backdropfilter`} onClick={handleClickOut}>
          </div>
              <FiltersRoll isLoading={coucou} preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} showRollGenre={showRollGenre} showRollProvider={showRollProvider} showRollDecade={showRollDecade} mobileVersion={mobileVersion}/>
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

    {isLoading && <Loading/>}

    </div>
  )

// ================ FERMETURE DU COMPOSANT ================
}

export default Home;

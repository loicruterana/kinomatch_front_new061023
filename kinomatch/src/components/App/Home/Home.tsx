import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import FiltersRoll from './Rolls/FiltersRoll';
import Loading from '../Loading/Loading';
import { SelectedGenreFiltersContext } from '../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../contexts/SelectedDecadeFiltersContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { FetchedDataContext } from '../../../contexts/FetchedDataContext';
import { Navigate, redirect } from 'react-router-dom';

import './Home.scss';


export const Home = () => {
  
  const [preselectedGenres, setPreselectedGenres] = useState([]);
  const [preselectedProviders, setPreselectedProviders] = useState([]);
  const [showRollGenre, setShowRollGenre] = useState(false);
  const [showRollProvider, setShowRollProvider] = useState(false);
  const [showRollDecade, setShowRollDecade] = useState(false);
  const [mobileVersion, setMobileVersion] = useState(false);
  const { selectedGenreFilters, addGenreFilter, removeGenreFilter } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters, addProviderFilter, removeProviderFilter } = useContext(SelectedProviderFiltersContext);
  const { selectedDecadeFilters, addDecadeFilter, removeDecadeFilter } = useContext(SelectedDecadeFiltersContext);
  const { load, unload, isLoading } = useContext(LoadingContext);
  const { fetchedData, setFetchedData, addData } = useContext(FetchedDataContext);
  const [goToMoviePage, setGoToMoviePage] = useState(false)
  const [data, setData] = useState([])

  const coucou = preselectedProviders.length === 0;
  
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams();
    selectedGenreFilters.forEach((filter) => {
      searchParams.append('genreID', filter.id);
    });
    selectedProviderFilters.forEach((filter) => {
      searchParams.append('providerID', filter.provider_id);
    });
    selectedDecadeFilters.forEach((filter) => {
      searchParams.append('decade', filter);
    });

    const url = `https://deploy-back-kinomatch.herokuapp.com/films?${searchParams.toString()}`;
    try {
      axios
        .get(url)
        .then((response) => {
          // addData(response.data.results);
          setData(response.data.results);
          setGoToMoviePage(true);
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

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowSize.width > 900) {
      setMobileVersion(false);
      setShowRollGenre(true);
      setShowRollProvider(true);
      setShowRollDecade(true);
    }
    if (windowSize.width < 900) {
      setMobileVersion(true);
      setShowRollGenre(false);
      setShowRollProvider(false);
      setShowRollDecade(false);
    }
  }, [windowSize]);

  // ================ HANDLERS ================
  function handleClickOut() {
    setShowRollGenre(false)
    setShowRollProvider(false)
    setShowRollDecade(false)
  }

  function handleClickGenre() {
    setShowRollGenre(!showRollGenre)
  }

  function handleClickProvider() {
    setShowRollProvider(!showRollProvider)
  }

  function handleClickDecade() {
    setShowRollDecade(!showRollDecade)
  }

  function handleRemoveGenre(event) {
    removeGenreFilter(event.target.dataset.id)
  }
  function handleRemoveProvider(event) {
    removeProviderFilter(event.target.dataset.id)
  }

  function handleRemoveDecade(event) {
    removeDecadeFilter(event.target.dataset.id)
  }
  

  // console.log(fetchedData)
  if (goToMoviePage) {
    return <Navigate to="/film" data={data} />;
  }

    console.log(data)

  // ================ JSX ================
  return (
    <div className='Home-container'>

      {/* // ================ JSX : FILTERS SELECTOR ================ */}
      <div className='Home__filters-selector'>
        <div className="Home__filters-selector__containers">

          <div className="Home__filters-selector__containers__filters-container">
            {/* // affichage des filtres sélectionnés */}
            {selectedGenreFilters.map((filter) => (
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
            {selectedDecadeFilters.map((filter) => (
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
      {((showRollGenre && mobileVersion) || (showRollProvider && mobileVersion) || (showRollDecade && mobileVersion) || !mobileVersion) &&

        <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}`}>
          <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}-backdropfilter`} onClick={handleClickOut}>
          </div>
          <FiltersRoll isLoading={coucou} preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} showRollGenre={showRollGenre} showRollProvider={showRollProvider} showRollDecade={showRollDecade} mobileVersion={mobileVersion} />
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

      {isLoading && <Loading />}

    </div>
  )

  // ================ FERMETURE DU COMPOSANT ================
}

export default Home;
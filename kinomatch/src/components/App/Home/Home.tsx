// ================ IMPORT BIBLIOTHEQUES ================
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

// ================ IMPORT SCSS ================
import './Home.scss';

// ================ IMPORT COMPOSANTS ================
import FiltersRoll from './Rolls/FiltersRoll';
import Loading from '../Loading/Loading';
import NoResult from '../NoResult/NoResult';



// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../contexts/SelectedDecadeFiltersContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { CurrentMovieIdContext } from '../../../contexts/CurrentMovieIdContext';
import { NoResultContext } from '../../../contexts/NoResultContext';




// ================ COMPOSANT ================
export const Home = () => {
  const navigate = useNavigate();

  // ================ USESTATE ================
  const [preselectedGenres, setPreselectedGenres] = useState([])
  const [preselectedProviders, setPreselectedProviders] = useState();
  const [showRollGenre, setShowRollGenre] = useState(false);
  const [showRollProvider, setShowRollProvider] = useState(false);
  const [showRollDecade, setShowRollDecade] = useState(false);
  const [mobileVersion, setMobileVersion] = useState(false);
  const [goToMoviePage, setGoToMoviePage] = useState(false);





  // ================ IMPORT PROPS CONTEXTS ================
  const { selectedGenreFilters, removeGenreFilter } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters, removeProviderFilter } = useContext(SelectedProviderFiltersContext);
  const { selectedDecadeFilters, removeDecadeFilter } = useContext(SelectedDecadeFiltersContext);
  const { load, unload, isLoading } = useContext(LoadingContext);
  const { setCurrentMovieId } = useContext(CurrentMovieIdContext);
  const { handleNoResult, noResult } = useContext(NoResultContext);



  const coucou = preselectedProviders === undefined; // false

  // ================ USE EFFECT API ================
  useEffect(() => {
    load();
    setCurrentMovieId('');
    axios.get('https://deploy-back-kinomatch.herokuapp.com/genres')
      .then(({ data }) => setPreselectedGenres(data.genres))
      .catch((error) => console.error(error))
      .finally(() => unload());

    axios.get('https://deploy-back-kinomatch.herokuapp.com/providers')
      .then(({ data }) => {
        const filteredProviders = data.results
          .reduce((validProviders, currentProvider) => {
            if (
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
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => unload());

  }, []);


  //=================================

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();
    selectedGenreFilters.forEach((filter) => {
      searchParams.append('genreID', filter.id);
    });

    selectedProviderFilters.map((filter) => {
      searchParams.append('providerID', filter.provider_id);
    });

    selectedDecadeFilters.map((filter) => {
      searchParams.append('decade', filter);
    });

    navigate(`/films?${searchParams.toString()}`);
  };

  //======== USEWINDOWSIZE



  useEffect(() => {
    function handleResize() {

      if (window.innerWidth >= 900) {
        setMobileVersion(false)
        setShowRollGenre(true)
        setShowRollProvider(true)
        setShowRollDecade(true)

      }
      if (window.innerWidth < 900) {
        setMobileVersion(true)
        setShowRollGenre(false)
        setShowRollProvider(false)
        setShowRollDecade(false)
      }
    }

    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize 
    // et actualiser le state windowSize
    handleResize()
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, []);

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

  function handleRemoveGenre(event: React.MouseEvent<HTMLDivElement>): void {
    removeGenreFilter(event.currentTarget.dataset.id || '');
  }
  function handleRemoveProvider(event: React.MouseEvent<HTMLDivElement>): void {
    removeProviderFilter(event.currentTarget.dataset.id || '');
  }

  function handleRemoveDecade(event: React.MouseEvent<HTMLDivElement>): void {
    removeDecadeFilter(event.currentTarget.dataset.id || '');
  }


  if (goToMoviePage) {
    return <Navigate to="/films" />;
  }

  if (noResult) {
    setTimeout(function() {
      handleNoResult()
    }, 3000);
  }

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
{/*          
          <svg id="search-icon" class="search-icon" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        </svg> */}

          </button>
        </form>

      </div>

      {/* // ================ JSX : VERSION MOBILE ================ */}
      {/* // affichage des rolls en version mobile */}
      {((showRollGenre && mobileVersion) || (showRollProvider && mobileVersion) || (showRollDecade && mobileVersion) || !mobileVersion) &&

        <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}`}>
          <div className={`Home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}-backdropfilter`} onClick={handleClickOut}>
          </div>
          <FiltersRoll isLoading={coucou} preselectedGenres={preselectedGenres} preselectedProviders={preselectedProviders} showRollGenre={showRollGenre} showRollProvider={showRollProvider} showRollDecade={showRollDecade} mobileVersion={mobileVersion} handleClickOut={handleClickOut}/>
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
      {noResult && <NoResult/>}


    </div>
  )

  // ================ FERMETURE DU COMPOSANT ================
}

export default Home;

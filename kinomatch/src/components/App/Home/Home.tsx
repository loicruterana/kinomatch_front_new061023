// ================ IMPORT BIBLIOTHEQUES ================
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Genre, Provider } from '../../../utils/interfaces';

// ================ IMPORT SCSS ================
import './Home.scss';

// ================ IMPORT COMPOSANTS ================
import FiltersRoll from './Rolls/FiltersRoll';
import Loading from '../Loading/Loading';
import NoResult from '../NoResult/NoResult';
import Footer from '../Footer/Footer';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../contexts/SelectedDecadeFiltersContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { CurrentMovieIdContext } from '../../../contexts/CurrentMovieIdContext';
import { NoResultContext } from '../../../contexts/NoResultContext';

//* ================ COMPOSANT ================
export const Home: React.FC = () => {
  const navigate = useNavigate();

  // ================ INTERFACES ================

  interface ProviderFromAPI {
    display_priorities: {
      [countryCode: string]: number;
    };
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
  }

  // ================ USESTATE ================

  // liste des genres préselectionnés lors du fetch
  const [preselectedGenres, setPreselectedGenres] = useState<Genre[]>([]);
  // liste des providers préselectionnés lors du fetch
  const [preselectedProviders, setPreselectedProviders] = useState<Provider[]>(
    []
  );
  // usestate pour afficher ou masquer RollGenre
  const [showRollGenre, setShowRollGenre] = useState(false);
  // usestate pour afficher ou masquer RollProvider
  const [showRollProvider, setShowRollProvider] = useState(false);
  // usestate pour afficher ou masquer les décennies
  const [showRollDecade, setShowRollDecade] = useState(false);
  // usestate pour afficher ou masquer la version mobile
  const [mobileVersion, setMobileVersion] = useState(false);

  // ================ IMPORT PROPS CONTEXTS ================
  const { selectedGenreFilters, removeGenreFilter } = useContext(
    SelectedGenreFiltersContext
  );
  const { selectedProviderFilters, removeProviderFilter } = useContext(
    SelectedProviderFiltersContext
  );
  const { selectedDecadeFilters, removeDecadeFilter } = useContext(
    SelectedDecadeFiltersContext
  );
  const { load, unload, isLoading } = useContext(LoadingContext);
  const { setCurrentMovieId } = useContext(CurrentMovieIdContext);
  const { handleNoResult, noResult } = useContext(NoResultContext);

  // ================ UTILS ================

  // fonction utilitaire qui permet de faire un affichage temporaire en attendant le chargement des données (chargement des genres et des providers via TMDB)
  const preseletedFiltersAreLoading =
    (preselectedProviders || preselectedGenres) === undefined; // false

  // fonction qui renvoie vers la page NoResult si pas de de résultat
  if (noResult) {
    setTimeout(function () {
      handleNoResult();
    }, 5000);
  }

  // ================ USE EFFECT API ================
  useEffect(() => {
    // pour activer le loader
    load();
    // pour réinitialiser le film enregistré pour la MoviePage
    setCurrentMovieId('');
    axios
      // pour récupérer les genres
      .get('https://deploy-back-kinomatch.herokuapp.com/genres')
      // les genres sont stockés dans le state preselectedGenres
      .then(({ data }) => setPreselectedGenres(data.genres))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => console.error(error))
      .finally(() => unload());

    axios
      // pour récupérer les providers
      .get('https://deploy-back-kinomatch.herokuapp.com/providers')
      .then(({ data }) => {
        // pour filtrer les providers
        const filteredProviders: Provider[] = data.results.reduce(
          (validProviders: Provider[], currentProvider: ProviderFromAPI) => {
            if (
              //Cela garantit que la méthode est appelée de manière sûre, même si la propriété hasOwnProperty a été redéfinie sur l'objet obj.
              Object.prototype.hasOwnProperty.call(
                currentProvider.display_priorities,
                'FR'
              ) &&
              currentProvider.display_priorities['FR'] < 20 &&
              !validProviders.includes(currentProvider)
              // !validProviders.find((provider) => provider.provider_name === currentProvider.provider_name)
            ) {
              validProviders.push(currentProvider);
            }

            return validProviders;
          },
          []
        );
        // pour stocker les providers dans le state preselectedProviders
        setPreselectedProviders(
          Array.isArray(filteredProviders)
            ? filteredProviders
            : [filteredProviders]
        ); // array
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => unload());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //======== USEWINDOWSIZE

  // la taille de l'écran définit l'affichage des filtres
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setMobileVersion(false);
        setShowRollGenre(true);
        setShowRollProvider(true);
        setShowRollDecade(true);
      }
      if (window.innerWidth < 900) {
        setMobileVersion(true);
        setShowRollGenre(false);
        setShowRollProvider(false);
        setShowRollDecade(false);
      }
    }

    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, []);

  // ================ HANDLERS ================

  // handler pour enbvoyer les informations de filtres sélectionnés à la MoviePage
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const searchParams = new URLSearchParams();
    selectedGenreFilters.forEach((filter: { id: string }) => {
      searchParams.append('genreID', filter.id);
    });

    selectedProviderFilters.map((filter: { provider_id: string }) => {
      searchParams.append('providerID', filter.provider_id);
    });

    selectedDecadeFilters.map((filter: string) => {
      searchParams.append('decade', filter);
    });
    // pour naviguer vers la page films avec les filtres sélectionnés
    navigate(`/films?${searchParams.toString()}`);
  };

  // handler pour masquer les filtres
  function handleClickOut() {
    setShowRollGenre(false);
    setShowRollProvider(false);
    setShowRollDecade(false);
  }

  // handler pour toggler la modale de filtres genres
  function handleClickGenre() {
    setShowRollGenre(!showRollGenre);
  }
  // handler pour toggler la modale de filtres providers
  function handleClickProvider() {
    setShowRollProvider(!showRollProvider);
  }
  // handler pour toggler la modale de filtres décennies
  function handleClickDecade() {
    setShowRollDecade(!showRollDecade);
  }
  // handler pour supprimer un filtre parmis les filtres genre sélectionnés
  function handleRemoveGenre(event: React.MouseEvent<HTMLDivElement>): void {
    removeGenreFilter(event.currentTarget.dataset.id || '');
  }

  // handler pour supprimer un filtre parmis les filtres provider sélectionnés
  function handleRemoveProvider(event: React.MouseEvent<HTMLDivElement>): void {
    removeProviderFilter(event.currentTarget.dataset.id || '');
  }

  // handler pour supprimer la décennie selectionnée
  function handleRemoveDecade(): void {
    removeDecadeFilter();
  }

  // ================ JSX ================
  return (
    <div className='Home-container'>
      <div className='Home__filters-selector'>
        <div className='Home__filters-selector__containers'>
          <div className='Home__filters-selector__containers__filters-container'>
            {/* // affichage des filtres sélectionnés */}
            {selectedGenreFilters.map(
              (filter: { id: string; name: string }) => (
                <div
                  key={filter.id}
                  className='Home__filters-selector__containers__filters-container__filter'
                >
                  {filter.name}
                  <div
                    className='Home__filters-selector__containers__filters-container__filter__cross'
                    onClick={handleRemoveGenre}
                    data-id={filter.name}
                  >
                    <i
                      className='fa-solid fa-xmark'
                      data-id={filter.name}
                      onClick={handleRemoveGenre}
                    ></i>{' '}
                  </div>
                </div>
              )
            )}
            {selectedProviderFilters.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (filter: { provider_id: any; provider_name: any }) => (
                <div
                  key={filter.provider_id}
                  className='Home__filters-selector__containers__filters-container__filter'
                >
                  {filter.provider_name}
                  <div
                    className='Home__filters-selector__containers__filters-container__filter__cross'
                    onClick={handleRemoveProvider}
                    data-id={filter.provider_name}
                  >
                    <i
                      className='fa-solid fa-xmark'
                      data-id={filter.provider_name}
                      onClick={handleRemoveProvider}
                    ></i>
                  </div>
                </div>
              )
            )}
            {selectedDecadeFilters.map((filter: string) => (
              <div
                key={filter}
                className='Home__filters-selector__containers__filters-container__filter'
              >
                {filter}
                <div
                  className='Home__filters-selector__containers__filters-container__filter__cross'
                  onClick={handleRemoveDecade}
                  data-id={filter}
                >
                  <i
                    className='fa-solid fa-xmark'
                    data-id={filter}
                    onClick={handleRemoveDecade}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* // bouton validé */}
        <form onSubmit={handleFormSubmit}>
          <button type='submit'>
            {selectedGenreFilters.length +
              selectedProviderFilters.length +
              selectedDecadeFilters.length ===
            0
              ? 'Films tendances'
              : 'Valider mon choix'}
            {/*          
          <svg id="search-icon" class="search-icon" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
        </svg> */}
          </button>
        </form>
      </div>

      {/* // ================ JSX : VERSION MOBILE ================ */}
      {/* // affichage condionnel des rolls en fonction de si on se trouve en version mobile ( si l'un des rolls est activé) ou en version desktop */}
      {((showRollGenre && mobileVersion) ||
        (showRollProvider && mobileVersion) ||
        (showRollDecade && mobileVersion) ||
        !mobileVersion) && (
        <div
          className={`Home-container__roll-modale-${
            mobileVersion ? 'mobile-version' : 'desktop-version'
          }`}
        >
          <div
            className={`Home-container__roll-modale-${
              mobileVersion ? 'mobile-version' : 'desktop-version'
            }-backdropfilter`}
            onClick={handleClickOut}
          ></div>
          {/* composant Filters Rolls */}
          <FiltersRoll
            isLoading={preseletedFiltersAreLoading}
            preselectedGenres={preselectedGenres}
            preselectedProviders={preselectedProviders}
            showRollGenre={showRollGenre}
            showRollProvider={showRollProvider}
            showRollDecade={showRollDecade}
            mobileVersion={mobileVersion}
            handleClickOut={handleClickOut}
          />
        </div>
      )}

      {/* affichage des boutons en version mobile */}
      {mobileVersion && (
        <div className='Home-container__buttons'>
          <div
            className='Home-container__buttons__button'
            onClick={handleClickGenre}
          >
            Genre
          </div>

          <div
            className='Home-container__buttons__button'
            onClick={handleClickProvider}
          >
            Plateforme
          </div>

          <div
            className='Home-container__buttons__button'
            onClick={handleClickDecade}
          >
            Année
          </div>
        </div>
      )}
      {/* affichage du loader si la requête est en cours */}
      {isLoading && <Loading />}
      {/* affichage du composant NoResult */}
      {noResult && <NoResult />}
      {/* affichage du composant Footer selon la taille du device */}
      {!mobileVersion && <Footer />}
    </div>
  );

  //* ================ FERMETURE DU COMPOSANT ================
};

export default Home;

// ================ IMPORT BIBLIOTHEQUES ================
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Genre, ProviderHome } from '../../../utils/interfaces';
import API_BASE_URL from '../../../utils/config';

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
import { SelectedNotationFiltersContext } from '../../../contexts/SelectedNotationFiltersContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { CurrentMovieIdContext } from '../../../contexts/CurrentMovieIdContext';
import { NoResultContext } from '../../../contexts/NoResultContext';
// import { AuthContext } from '../../../contexts/AuthContext';

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
  const [preselectedProviders, setPreselectedProviders] = useState<
    ProviderHome[]
  >([]);
  // usestate pour afficher ou masquer RollGenre
  const [showRollGenre, setShowRollGenre] = useState(false);
  // usestate pour afficher ou masquer RollProvider
  const [showRollProvider, setShowRollProvider] = useState(false);
  // usestate pour afficher ou masquer les décennies
  const [showRollDecade, setShowRollDecade] = useState(false);
  // usestate pour afficher ou masquer RollNotation
  const [showRollNotation, setShowRollNotation] = useState(false);
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
  const { selectedNotationFilters, removeNotationFilter } = useContext(
    SelectedNotationFiltersContext
  );

  const { load, unload, isLoading } = useContext(LoadingContext);
  const { setCurrentMovieId } = useContext(CurrentMovieIdContext);
  const { handleNoResult, noResult } = useContext(NoResultContext);
  // const { addUserData, login } = useContext(AuthContext);

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
      .get(`${API_BASE_URL}/genres`)
      // les genres sont stockés dans le state preselectedGenres
      .then(({ data }) => setPreselectedGenres(data.genres))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => console.error(error))
      .finally(() => unload());

    axios
      // pour récupérer les providers
      .get(`${API_BASE_URL}/providers`)
      .then(({ data }) => {
        // pour filtrer les providers
        const filteredProviders: ProviderHome[] = data.results.reduce(
          (
            validProviders: ProviderHome[],
            currentProvider: ProviderFromAPI
          ) => {
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
        setShowRollNotation(true);
      }
      if (window.innerWidth < 900) {
        setMobileVersion(true);
        setShowRollGenre(false);
        setShowRollProvider(false);
        setShowRollDecade(false);
        setShowRollNotation(false);
      }
    }

    window.addEventListener('resize', handleResize);
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
    // on risque  d'enregistrer plusieurs écouteurs pour le même événement et créer des fuites mémoires
  }, []);

  // ================ HANDLERS ================

  // handler pour envoyer les informations de filtres sélectionnés à la MoviePage
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

    selectedNotationFilters.map((filter: string) => {
      searchParams.append('notation', filter);
    });

    // pour naviguer vers la page films avec les filtres sélectionnés
    navigate(`/films?${searchParams.toString()}`);
  };

  // handler pour gérer le slide de la page vers la gauche
  function handleClickSlideLeft() {
    console.log('click');
  }

  // handler pour masquer les filtres
  function handleClickOut() {
    setShowRollGenre(false);
    setShowRollProvider(false);
    setShowRollDecade(false);
    setShowRollNotation(false);
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
  // handler pour toggler la modale de filtres notations
  function handleClickNotation() {
    setShowRollNotation(!showRollNotation);
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

  // handler pour supprimer la note selectionnée
  function handleRemoveNotation(): void {
    removeNotationFilter();
  }

  console.log(selectedNotationFilters);
  console.log(selectedDecadeFilters);
  // ================ JSX ================
  return (
    <main className='home-container'>
      <div className='home__filters-selector'>
        <div className='home__filters-selector__containers'>
          <div className='home__filters-selector__containers__filters-container'>
            {/* // affichage des filtres sélectionnés */}
            {selectedGenreFilters.map(
              (filter: { id: string; name: string }) => (
                <div
                  key={filter.id}
                  className='home__filters-selector__containers__filters-container__filter'
                >
                  {filter.name}
                  <div
                    className='home__filters-selector__containers__filters-container__filter__cross'
                    onClick={handleRemoveGenre}
                    data-id={filter.name}
                    aria-label='Supprimer le filtre'
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
                  className='home__filters-selector__containers__filters-container__filter'
                >
                  {filter.provider_name}
                  <div
                    className='home__filters-selector__containers__filters-container__filter__cross'
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
                className='home__filters-selector__containers__filters-container__filter'
              >
                <span>{filter}</span>
                <div
                  className='home__filters-selector__containers__filters-container__filter__cross'
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
            {selectedNotationFilters.map((filter: string) => (
              <div
                key={filter}
                className='home__filters-selector__containers__filters-container__filter'
              >
                <span>{`> ${filter} %`}</span>
                <div
                  className='home__filters-selector__containers__filters-container__filter__cross'
                  onClick={handleRemoveNotation}
                  data-id={filter}
                >
                  <i
                    className='fa-solid fa-xmark'
                    data-id={filter}
                    onClick={handleRemoveNotation}
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
              selectedDecadeFilters.length +
              selectedNotationFilters.length ===
              0
              ? 'Films tendances'
              : 'Valider mon choix'}
          </button>
        </form>
      </div>

      {/* // ================ JSX : VERSION MOBILE ================ */}
      {/* // affichage condionnel des rolls en fonction de si on se trouve en version mobile ( si l'un des rolls est activé) ou en version desktop */}
      {((showRollGenre && mobileVersion) ||
        (showRollProvider && mobileVersion) ||
        (showRollNotation && mobileVersion) ||
        (showRollDecade && mobileVersion) ||
        !mobileVersion) && (
          <section
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }`}
          >

            <div
              className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
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
              showRollNotation={showRollNotation}
              mobileVersion={mobileVersion}
              handleClickOut={handleClickOut}
            />

            {/*Bouton pour slider la page vers la gauche*/}
            <div className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__button`}>
              <button className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'}__button--slideLeft`} onClick={handleClickSlideLeft}
              >
                <i className='fa-solid fa-chevron-left'></i>

              </button>
            </div>
          </section>
        )}

      {/* affichage des boutons en version mobile */}
      {mobileVersion && (
        <div className='home-container__buttons'>
          <button
            className='home-container__buttons__button'
            onClick={handleClickGenre}
          >
            <div className='home-container__buttons__button__image-container'>
              <img
                src='/images/tetepelloche.svg'
                alt="Description de l'image"
              />
              <div className='home-container__buttons__button__text'>GENRE</div>
            </div>

            {/* Genre */}
          </button>

          <button
            className='home-container__buttons__button'
            onClick={handleClickProvider}
          >
            <div className='home-container__buttons__button__image-container'>
              <img
                src='/images/tetepelloche.svg'
                alt="Description de l'image"
              />
              <div className='home-container__buttons__button__text'>
                PLATEFORME
              </div>
            </div>

            {/* Plateforme */}
          </button>

          <button
            className='home-container__buttons__button'
            onClick={handleClickDecade}
          >
            {/* Année */}
            <div className='home-container__buttons__button__image-container'>
              <img
                src='/images/tetepelloche.svg'
                alt="Description de l'image"
              />
              <div className='home-container__buttons__button__text'>
                DÉCENNIE
              </div>
            </div>

            {/* Décennie */}
          </button>

          <button
            className='home-container__buttons__button'
            onClick={handleClickNotation}
          >
            {/* Notation */}
            <div className='home-container__buttons__button__image-container'>
              <img
                src='/images/tetepelloche.svg'
                alt="Description de l'image"
              />
              <div className='home-container__buttons__button__text'>
                NOTATION
              </div>
            </div>


          </button>
        </div>
      )}
      {/* affichage du loader si la requête est en cours */}
      {isLoading && <Loading />}
      {/* affichage du composant NoResult */}
      {noResult && <NoResult />}
      {/* affichage du composant Footer selon la taille du device */}
      {!mobileVersion && <Footer />}
    </main>
  );

  //* ================ FERMETURE DU COMPOSANT ================
};

export default Home;

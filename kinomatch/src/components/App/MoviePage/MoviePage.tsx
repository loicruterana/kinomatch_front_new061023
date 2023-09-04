// Importation des librairies et des fichiers nécessaires
import { Key, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import React from 'react';
import axios from 'axios';

// ================ IMPORT COMPOSANTS ================
import ImageModal from './ImageModal/ImageModal';
import DetailsModal from './DetailsModal/DetailsModal';
import AddButton from './AddButtons/AddButtons';
import Providers from './Providers/Providers';
import OtherResults from './OtherResults/OtherResults';
import Footer from '../Footer/Footer';

// ================ IMPORT CONTEXTS ================
import { CurrentMovieIdContext } from '../../../contexts/CurrentMovieIdContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { SelectedGenreFiltersContext } from '../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../contexts/SelectedDecadeFiltersContext';
import { NoResultContext } from '../../../contexts/NoResultContext';
import Loading from '../Loading/Loading';

// ================ IMPORT INTERFACES ================

import { Movie, Credits } from '../../../utils/interfaces';
import API_BASE_URL from '../../../utils/config';

// ================ IMPORT JSON ================

// ici j'importe l'objet "genres" qui contient les genres de films et leurs id et le renommee "genresList" pour pouvoir l'utiliser dans le code
import { genres as genresListFile } from '../../../../public/genres.json';
import { results as providersListFile } from '../../../../public/providers.json';
// ================ IMPORT SCSS ================
import './style.scss';

// Fonction MoviePage permettant d'afficher la page d'un film
function MoviePage() {
  const effectRan = useRef(false);

  const navigate = useNavigate();

  //* ================= MODALE DETAILS ============================

  // Fonction permettant de manipuler la modale "showDetailsModal". Au click ==> passe de true à false et inversement
  const handleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  // Fonction permettant de manipuler la modale "showImageModal". Au click ==> passe de true à false et inversement
  const handleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  // Fonction permettant de manipuler la modale "showOtherResults". Au click ==> passe de true à false et inversement
  const handleOtherResults = () => {
    setShowOtherResults(!showOtherResults);
  };

  //* ================ USESTATES =================================

  // UseState qu définit l'id et le "fillValue" du film
  const [circle, setCircle] = useState<{ id: number; fillValue: number }>({
    id: 0,
    fillValue: 0,
  });

  // UseState chargement de page
  const [isLoading, setIsLoading] = useState(false);

  // UseState qui récupère un tableau de films filtrés sans l'id du film affiché en grand
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [movieArray, setMovieArray] = useState<any[]>([]);

  // UseState qui permet l'affichage de certains components suivant la largeur de fenêtre
  const [desktopVersion, setDesktopVersion] = useState(false);

  // UseState Modale "Résultats"
  const [showOtherResults, setShowOtherResults] = useState(false);

  // UseState Modale "Détails"
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // UseState Modale "Image"
  const [showImageModal, setShowImageModal] = useState(false);

  // UseState "videos"
  const [videos, setVideos] = useState([
    {
      type: '',
      key: '',
      name: '',
    },
  ]);

  // UseState route "Detail"
  const [movie, setMovie] = useState<Movie>({
    title: '',
    id: '',
    poster_path: '',
    vote_average: 0,
    vote_count: '',
    tagline: '',
    overview: '',
    genres: [],
    runtime: 0,
    release_date: '',
  });

  // UseState route "credits"
  const [credits, setCredits] = useState<Credits>({
    cast: [],
    crew: [],
    id: 0,
  });

  // UseState route "providers"
  /* Lors de l'utilisation de l'import de l'interface de Provider, le typage n'accepte pas ces données
  Je dois le redécomposer ici */
  const [providers, setProviders] = useState<{
    results: {
      FR: {
        flatrate: [];
        rent: [];
        buy: [];
        free: [];
        ads: [];
        link: string;
        provider_id: number;
        provider_name: string;
      };
    };
  }>({
    results: {
      FR: {
        flatrate: [],
        rent: [],
        buy: [],
        free: [],
        ads: [],
        link: '',
        provider_id: 0,
        provider_name: '',
      },
    },
  });

  // UseState qui récupère les genres sélectionnés par l'utilisateur
  const [genresList, setGenresList] = useState(['']);
  // UseState qui récupère les plateformes sélectionnées par l'utilisateur
  const [providersList, setProvidersList] = useState(['']);
  // UseState qui récupère les décennies sélectionnées par l'utilisateur
  const [decadeList, setDecadeList] = useState(['']);
  const { currentMovieId, setCurrentMovieId } = useContext(
    CurrentMovieIdContext
  );
  const { userData } = useContext(AuthContext);
  const { selectedGenreFilters } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters } = useContext(
    SelectedProviderFiltersContext
  );
  const { selectedDecadeFilters } = useContext(SelectedDecadeFiltersContext);
  const { handleNoResult } = useContext(NoResultContext);

  //* ==================== USESPRING ===============================

  // UseSpring permettant l'animation du cercle de chargement
  const circleAnimation = useSpring({
    from: { strokeDashoffset: 326.56 },
    to: { strokeDashoffset: 326.56 - (326.56 * circle.fillValue) / 100 },
  });

  //* =================== FONCTIONS DE CONVERSIONS ET DE RÉCUPÉRATION ===========================

  // DURÉE DU FILM EN HEURE

  function convertMinutesInHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  }

  // CONVERSION DATE

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  }

  // RECUPERATION DES RÉALISATEURS

  const directingCrewMembers = credits?.crew?.filter(
    (person: { job: string }) => person.job === 'Director'
  );
  const mappedDirectingCrewMembers = directingCrewMembers?.slice(0, 3);

  // RÉCUPÉRATION DES ACTEURS

  const actorCastMembers = credits?.cast?.filter(
    (person: { known_for_department: string }) =>
      person.known_for_department === 'Acting'
  );
  const mappedActorCastMembers = actorCastMembers?.slice(0, 3);

  // RÉCUPÉRATION DES TRAILERS
  const trailer = videos.find((video) => video.type.includes('Trailer'));
  const otherVideos = videos.filter((video) => !video.type.includes('Trailer'));

  //* ==================== USEEFFECT handleResize ===============================

  // UseEffect permettant l'affichage conditionnel suivant la largeur de fenêtre
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 900) {
        setDesktopVersion(true);
      }
      if (window.innerWidth < 900) {
        setDesktopVersion(false);
      }
    }
    window.addEventListener('resize', handleResize);

    /* ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
     et actualiser le state windowSize */

    handleResize();

    // un removeEventListener pour éviter les fuites de mémoire
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //? ============================ USEEFFECT SearchResults ============================ /

  // UseEffect récupérant l'URI permettant l'affichage des films trouvés via les filtres de la Home puis en sélectionne un aléatoirement pour l'afficher
  useEffect(() => {
    if (window.location.search.includes('filmID')) {
      setIsLoading(true);

      // Ici on récupère l'ID du film sélectionné en le séparant de l'URI
      const filmID = window.location.search.split('=')[1];

      setCurrentMovieId(filmID);

      const searchParams = new URLSearchParams();
      searchParams.append('movieID', currentMovieId);
      if (currentMovieId !== filmID) {
        return; // Sortir du useEffect si currentMovieId n'est pas défini
      }
      // On récupère les données du film sélectionné sur les routes "detail", "credits" et "providers"
      const requests = [
        // Route pour récupérer les détails du film
        axios.get(`${API_BASE_URL}/detail?${searchParams.toString()}`),
        // Route pour récupérer les crédits du film
        axios.get(`${API_BASE_URL}/credits?${searchParams.toString()}`),
        // Route pour récupérer les providers du film
        axios.get(`${API_BASE_URL}/provider?${searchParams.toString()}`),
        // Route pour récupérer les films recommandés
        axios.get(
          `${API_BASE_URL}/recommendedMovies?${searchParams.toString()}`
        ),
        // Route pour récupérer les vidéos du film
        axios.get(`${API_BASE_URL}/videos?${searchParams.toString()}`),
      ];

      Promise.all(requests)
        .then((responses) => {
          // On déstructure les réponses pour les récupérer dans l'ordre
          const [
            detailResponse,
            creditsResponse,
            providerResponse,
            movieArrayResponse,
            videosMovie,
          ] = responses;

          // On récupère les données des films pour les stocker dans des variables
          const movieData = detailResponse.data;
          const creditsData = creditsResponse.data;
          const providersData = providerResponse.data;
          const movieArrayData = movieArrayResponse.data;
          const videosMovieData = videosMovie.data;

          // On stocke les données dans le state
          setMovie(movieData);
          setCredits(creditsData);
          setProviders(providersData);
          setMovieArray(movieArrayData.results);
          setVideos(videosMovieData.results);
          setCircle({
            id: movieData.id,
            fillValue: movieData.vote_average * 10,
          });
        })

        .catch((error) => {
          // Gérer l'erreur ici
          console.error(
            "Une erreur s'est produite lors de la récupération des données :",
            error
          );
        })
        .finally(() => {
          setIsLoading(false);
        });

      // Sortir du useEffect pour éviter l'exécution du reste du code
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovieId]);

  //? ============================ USEEFFECT FilteredMovie ============================

  useEffect(() => {
    if (!window.location.search.includes('filmID')) {
      if (effectRan.current === true) {
        setIsLoading(true);

        //*  ON RÉCUÈRE LES PARAMÈTRES DE L'URL POUR AFFICHER LES FILTRES SELECTIONNES PAR L'UTILISATEUR

        const urlParams = new URLSearchParams(window.location.search);
        // On crée un tableau vide pour stocker les paramètres
        const paramsArray: { key: string; value: string }[] = [];
        // On boucle sur les paramètres de l'URL
        urlParams.forEach((value, key) => {
          paramsArray.push({ key, value });
        });

        // ==================== FILTRES GENRES ====================

        // On filtre les paramètres pour récupérer les genres
        const filteredGenres = paramsArray.filter(
          (genre) => genre.key === 'genreID'
        );

        console.log(filteredGenres);

        // On créer un tableau avec les valeurs des paramètres
        const genreValueArray = filteredGenres.map((obj) => obj.value);
        console.log(genreValueArray);
        // On recherche les id des genres dans le fichier json genres.json afin de récupérer les noms des genres
        const genreArray = genreValueArray.map((value) => {
          // On recherche les id des genres dans le fichier json genres.json afin de récupérer les noms des genres et on convertit la valeur en nombre
          const genre = genresListFile.find(
            (param: { id: number }) => param.id === Number(value)
          );
          // Si le genre existe on retourne son nom sinon on retourne ''
          return genre ? genre.name : '';
        });

        // On stocke les genres dans le state
        setGenresList(genreArray);
        console.log(paramsArray);

        // ==================== FILTRES PROVIDERS ====================

        // On filtre les paramètres pour récupérer les providers
        const filterProviders = paramsArray.filter(
          (provider) => provider.key === 'providerID'
        );

        // On créer un tableau avec les valeurs des paramètres
        const filterProvidersArray = filterProviders.map((obj) => obj.value);

        // On recherche les id des providers dans le fichier json providers.json afin de récupérer les noms des providers
        const providerArray = filterProvidersArray.map((value) => {
          // On recherche les id des providers dans le fichier json providers.json afin de récupérer les noms des providers et on convertit la valeur en nombre
          const provider = providersListFile.find(
            (param: { provider_id: number }) =>
              param.provider_id === Number(value)
          );
          // Si le provider existe on retourne son nom sinon on retourne ''
          return provider ? provider.provider_name : '';
        });

        setProvidersList(providerArray);

        console.log(filterProviders);
        console.log(filterProvidersArray);

        // ============================ FILTRE DECADES ============================

        // On filtre les paramètres pour récupérer la décennie
        const filteredDecade = paramsArray.filter(
          (decade) => decade.key === 'decade'
        );

        // On créer un tableau avec les valeurs des paramètres
        const decadeValueArray = filteredDecade.map((obj) => obj.value);
        console.log(decadeValueArray);

        // On stocke les décennies dans le state
        setDecadeList(decadeValueArray);
        console.log(filteredDecade);

        //* ON RECUPERE LES DONNEES DE LA PREMIERE PAGE DE RESULTATS AVEC LE NOMBRE DE PAGES !
        // On fait un console.log pour savoir combien de fois le useEffect est exécuté
        axios
          .get(`${API_BASE_URL}/films${window.location.search}`)
          .then(({ data }) => {
            // Renvoi la première page de résultats
            console.log(data);
            if (data.results.length === 0) {
              handleNoResult();
              navigate(`/`);
              return;
            }

            // On récupère le nombre de pages de résultats puis on en sélectionne une aléatoirement
            const numberOfPages = data.total_pages;
            let chosenPage = Math.floor(Math.random() * numberOfPages) + 1;
            if (chosenPage > 500) {
              chosenPage = Math.floor(Math.random() * 500) + 1;
            }

            //* ON RECUPERE LES DONNEES DE LA PAGE SELECTIONNEE ALEATOIREMENT !

            // On récupère les données de la page sélectionnée
            const searchParams1 = new URLSearchParams();
            searchParams1.append('randomPage', chosenPage.toString());
            console.log(searchParams1.toString());

            // Si aucun filtre n'est sélectionné, on affiche les films populaires sinon on affiche les films filtrés
            if (window.location.search === '') {
              return axios.get(`${API_BASE_URL}/randomFilms`);
            } else {
              // Sinon on affiche les films filtrés en ajoutant comme paramètre la page sélectionnée aléatoirement
              return axios.get(
                `${API_BASE_URL}/randomFilms${
                  window.location.search
                }&${searchParams1.toString()}`
              );
            }
          })
          //* ON SELECTIONNE UN FILM ALEATOIREMENT PARMI LES RESULTATS DE LA PAGE SELECTIONNEE, ON L'AFFICHE ET ON MET A JOUR LE STATE AVEC LES RESULTATS FILTRES !
          .then((response) => {
            // Renvoi les résultats de la page sélectionnée (entre 1 et 500)
            const data = response?.data;
            console.log(data);
            // Si la requête récupère des données, on sélectionne un film aléatoire parmi les résultats
            if (data) {
              const selectRandomID =
                data.results[Math.floor(Math.random() * data.results.length)]
                  .id;
              // On évite d'afficher le même film que celui qui est déjà affiché
              const filteredResults = data.results.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (result: { id: any }) => result.id !== selectRandomID
              );
              console.log(filteredResults);
              // Met à jour le state avec les résultats filtrés
              setMovieArray(filteredResults);
              console.log(currentMovieId);
              const searchParams = new URLSearchParams();
              // Si aucun filtre n'est sélectionné, on affiche les films populaires sinon on affiche les films filtrés
              searchParams.append(
                'movieID',
                movieArray.length === 0 ? selectRandomID : currentMovieId
              );

              // On récupère les données du film sélectionné aléatoirement sur les routes "detail", "credits", "providers" et "videos"
              const requests = [
                axios.get(`${API_BASE_URL}/detail?${searchParams.toString()}`),
                axios.get(`${API_BASE_URL}/credits?${searchParams.toString()}`),
                axios.get(
                  `${API_BASE_URL}/provider?${searchParams.toString()}`
                ),
                axios.get(`${API_BASE_URL}/videos?${searchParams.toString()}`),
              ];
              return Promise.all(requests);
            }
          })
          // Ensuite on récupère les données des films recommandés et on les stocke dans les states
          .then((responses) => {
            // Si les réponses sont un tableau, on les déstructure pour les récupérer dans l'ordre
            if (Array.isArray(responses)) {
              const [movieData, creditsData, providersData, videosMovie] =
                responses;
              // Si les données sont présentes, on les stocke dans les states
              if (movieData.data && creditsData.data && providersData.data) {
                setMovie(movieData.data);
                setCredits(creditsData.data);
                setProviders(providersData.data);
                setVideos(videosMovie.data.results);
                setCircle({
                  id: movieData.data.id,
                  fillValue: movieData.data.vote_average * 10,
                });
              }
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      return () => {
        effectRan.current = true;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovieId]);

  // Si le chargement est en cours, on affiche le composant Loading

  if (isLoading) {
    return <Loading />;
  }

  return (
    <article className='moviePage'>
      {/* Modale Image*/}
      {/* Si le state showImageModal est true, on affiche la modale ImageModal */}
      {showImageModal && (
        <ImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          movie={movie}
        />
      )}

      {/* Modale Details*/}
      {/* Si le state showDetailsModal est true, on affiche la modale DetailsModal */}
      {showDetailsModal && (
        <DetailsModal
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
          movie={movie}
          credits={credits}
          directingCrewMembers={directingCrewMembers}
          formatDate={formatDate}
          convertMinutesInHours={convertMinutesInHours}
        />
      )}

      {/* Page du film  */}
      <section className='movieFound'>
        {/* Page infos essentielles du film: titre, image, boutons, plateformes, note */}
        <section className='movieFound__essentiel'>
          {/* Div contenant le titre et les icons */}
          <div className='movieFound__essentiel-head'>
            {/* <h1 className='movieFound__essentiel-title'>{movie.title}</h1>
            {isLoggedIn && <AddButton movie={movie.id} />} */}
          </div>
          <div className='movieFound__essentiel-imageFrame'>
            {/* Si le film n'a pas d'image, on affiche une image par défaut sinon on affiche l'image récupérée*/}
            <img
              className='movieFound__essentiel-image'
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : '/images/testsample.jpg'
              }
              alt={`Image du film: ${movie.title}`}
              onClick={handleImageModal}
            />
          </div>
          <div className='movieFound__essentiel-body'>
            <div className='movieFound__essentiel-body--note'>
              <h4>Les utilisateurs de TMDB ont noté ce film</h4>

              <div className='circle-big'>
                <div className='text'>
                  {/* Si la note est un nombre entier, on affiche le nombre sinon on affiche le nombre avec une décimale */}
                  {Math.floor(movie.vote_average * 10) ===
                  movie.vote_average * 10
                    ? movie.vote_average * 10
                    : (movie.vote_average * 10).toFixed(1)}
                  %<div className='small'>{movie.vote_count} votes </div>
                </div>
                {/* On affiche le cercle de notation */}
                <svg>
                  <circle className='bg' cx='57' cy='57' r='52' />
                  <animated.circle
                    className='progress'
                    cx='57'
                    cy='57'
                    r='52'
                    style={circleAnimation}
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* On affiche le composant Providers qui contient les plateformes de streaming */}
          <Providers providers={providers} />
        </section>
        {/* Section détails du film: filtres, synopsis, réalisateur, acteurs date de sortie ...  */}
        <section className='movieDetails'>
          {/* Si l'URL ne contient pas de paramètre "filmID", on affiche les filtres */}
          {!window.location.search.includes('filmID') ? (
            <div className='movieDetails__filters-desktop'>
              <ul className='movieDetails__filters-desktop--filterElemList'>
                {/* Pour chaque filtre de "genre", on affiche les noms de genres */}
                <li>
                  {genresList.map((genre) => (
                    <p
                      key={genre}
                      className='movieDetails__filters-desktop--filterElem'
                    >
                      {genre}
                    </p>
                  ))}
                </li>
                {/* Pour chaque filtre de "plateforme", on affiche les noms de plateformes */}
                <li>
                  {providersList.map((provider) => (
                    <p
                      key={provider}
                      className='movieDetails__filters-desktop--filterElem'
                    >
                      {provider}
                    </p>
                  ))}
                </li>
                {/* Pour chaque filtre de "décennie", on affiche les noms de décennies */}
                <li>
                  {decadeList.map((decade) => (
                    <p
                      key={decade}
                      className='movieDetails__filters-desktop--filterElem'
                    >
                      {decade}
                    </p>
                  ))}
                </li>
              </ul>
            </div>
          ) : null}

          <h1 className='movieFound__essentiel-title'>{movie.title}</h1>
          {/* Si l'utilisateur est connecté, on affiche les boutons d'ajouts aux "favoris", "a voir" et "vu" */}
          {userData && <AddButton movie={movie.id} />}
          <div className='movieDetails__description'>
            {/* Affichage de la tag line */}
            <blockquote className='movieDetails__description-blockquote'>
              {/* Si le film a une tagline, on l'affiche sinon on affiche rien */}
              {movie.tagline ? (
                <cite className='movieDetails__description-blockquote--tagline'>{`"${movie.tagline}"`}</cite>
              ) : null}
            </blockquote>

            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>
              {/* Si le film a un synopsis, on l'affiche sinon on affiche "Synopsis non précisé" */}
              {movie.overview ? movie.overview : 'Synopsis non précisé'}
            </p>

            {/* Affichage des réalisateurs concernant le film affiché */}
            <ul className='movieDetails__description-directorsList'>
              {mappedDirectingCrewMembers?.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (director: any, index: number) => (
                  <li
                    key={director.id}
                    className='movieDetails__description-directorsList--director'
                  >
                    {/* Si l'index est égal à 0, on affiche "De" sinon on affiche rien */}
                    {/* Si l'index est différent de 0, on affiche une virgule sinon on affiche un espace */}
                    {/* On affiche le nom du réalisateur */}
                    {/* Si l'index est égal à la longueur du tableau des réalisateurs, on affiche "..." sinon on affiche rien */}
                    {index === 0 ? 'De ' : ''} {index !== 0 && ','}{' '}
                    {director.name}
                    {index === mappedDirectingCrewMembers.length && '...'}
                  </li>
                )
              )}
            </ul>
            {/* Affichage des acteurs concernant le film affiché */}
            <ul className='movieDetails__description-actorsList'>
              {mappedActorCastMembers?.map(
                (actor: { name: string; credit_id: string }, index: number) => (
                  <li
                    key={actor.credit_id}
                    className='movieDetails__description-actorsList--actors'
                  >
                    {/* Si l'index est égal à 0, on affiche "Avec" sinon on affiche rien */}
                    {/* Si l'index est différent de 0, on affiche une virgule sinon rien */}
                    {/* On affiche le nom de l'acteur */}
                    {/* Si l'index est égal à la longueur du tableau des acteurs, on affiche "..." sinon on affiche rien */}
                    {index === 0 ? 'Avec ' : ''} {index !== 0 && ','}{' '}
                    {actor.name}
                    {index === mappedActorCastMembers.length - 1 && '...'}
                  </li>
                )
              )}
            </ul>
            <ul className='movieDetails__description-genresList'>
              {/* Affichage des filtres concernant le film affiché */}
              {movie?.genres?.map(
                (
                  genre: { id: Key | null | undefined; name: string },
                  index: number
                ) => (
                  <li
                    key={genre.id}
                    className='movieDetails__description-genresList--genres'
                  >
                    {/* Si l'index est différent de 0, on affiche une virgule sinon rien */}
                    {/* On affiche le nom du genre */}
                    {index !== 0 && ','} {genre.name}{' '}
                  </li>
                )
              )}
            </ul>
            <p className='movieDetails__description-duration'>
              {/* Si le film a une durée, on l'affiche sinon on affiche "Durée non précisée" */}
              {movie.runtime
                ? convertMinutesInHours(movie.runtime)
                : 'Durée non précisée'}
            </p>
            <p className='movieDetails__description-date'>
              {/* Si le film a une date de sortie, on l'affiche sinon on affiche "Date de sortie non précisée" */}
              {movie.release_date
                ? formatDate(movie.release_date)
                : 'Date de sortie non précisée'}
            </p>
            {/* Au clic, on affiche la modal des détails */}
            <button
              className='movieDetails__description-details'
              onClick={handleDetailsModal}
            >
              + de détails
            </button>
            {/* Si le tableau "trailer" n'est pas vide, on affiche la vidéo, 
            si il est vide alors on passe à "otherVideos". 
            Si "otherVideos" n'est pas vide, alors on affiche une vidéo qui n'est pas un trailer,
            sinon, on affiche pas de vidéo */}
            {trailer?.key ? (
              <div className='movieDetails__videos'>
                <iframe
                  className='responsive-iframe'
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            ) : otherVideos.length > 0 ? (
              <div className='movieDetails__videos'>
                <iframe
                  className='responsive-iframe'
                  src={`https://www.youtube.com/embed/${otherVideos[0].key}`}
                  allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}

            <div className='movieDetails__filters'>
              {/* Si ce n'est pas la version deskTop, on affiche les filtres */}
              {!desktopVersion && (
                <React.Fragment>
                  <button
                    className='movieDetails__filters-otherResultsBtn'
                    onClick={handleOtherResults}
                  >
                    {/* Si showOtherResults est false, on affiche "Autres Résultats" sinon on affiche "Retour" */}
                    {!showOtherResults ? 'Autres Résultats' : 'Retour'}
                  </button>
                  {/* Affichage des filtres concernant le film affiché */}
                  <ul className='movieDetails__filters-mobile--filterElemList'>
                    <li>
                      {/* Pour chaque filtre de "genre", on affiche les noms de genres */}
                      {genresList.map((genre) => (
                        <p
                          key={genre}
                          className='movieDetails__filters-mobile--filterElem'
                        >
                          {genre}
                        </p>
                      ))}
                    </li>
                    <li>
                      {/* Pour chaque filtre de "provider", on affiche les noms de providers */}
                      {providersList.map((provider) => (
                        <p
                          key={provider}
                          className='movieDetails__filters-mobile--filterElem'
                        >
                          {provider}
                        </p>
                      ))}
                    </li>
                    <li>
                      {/* Pour chaque filtre de "decade", on affiche les noms de décennies */}
                      {decadeList.map((decade) => (
                        <p
                          key={decade}
                          className='movieDetails__filters-mobile--filterElem'
                        >
                          {decade}
                        </p>
                      ))}
                    </li>
                  </ul>
                </React.Fragment>
              )}
              {/* <p className='movieDetails__filters-filterElem--modifier'>Modifier</p> */}
            </div>
          </div>
        </section>
        {/* Si la version desktop est affichée, on affiche le composant "OtherResults". 
        Si c'est la version mobile et que la modal "showOtherResults" est activée alors on affiche le composant "OtherResults" */}
        {desktopVersion ? (
          <OtherResults
            movieArray={movieArray}
            setMovieArray={setMovieArray}
            showOtherResults={showOtherResults}
            setShowOtherResults={setShowOtherResults}
          />
        ) : (
          showOtherResults && (
            <OtherResults
              movieArray={movieArray}
              setMovieArray={setMovieArray}
              showOtherResults={showOtherResults}
              setShowOtherResults={setShowOtherResults}
            />
          )
        )}
      </section>
      {/* Si la version desktop est affichée, on affiche le composant "Footer" sinon on en l'affiche pas */}
      {desktopVersion && <Footer />}
    </article>
  );
}

export default MoviePage;

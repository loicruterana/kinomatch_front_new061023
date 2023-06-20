import { Key, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import React from 'react';
import axios from 'axios';

// ================ IMPORT COMPOSANTS ================
import ImageModal from './ImageModal/ImageModal';
import DetailsModal from './DetailsModal/DetailsModal';
// import CommentPost from './CommentPost/CommentPost';
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

// ================ IMPORT SCSS ================
import './style.scss';

// ================ INTERFACES ================

/* Interface Movie permettant de typer les données du film */
interface Movie {
  title: string;
  id: string;
  poster_path: string;
  vote_average: number;
  vote_count: string;
  tagline: string;
  overview: string;
  genres: [];
  runtime: number;
  release_date: string;
}

/* Interface Credits permettant de typer les données du casting */
interface Credits {
  cast: [];
  crew: [];
  id: number;
}

/* Interface Providers permettant de typer les données des plateformes */
interface Providers {
  results: {
    FR: {
      flatrate: [];
      rent: [];
      buy: [];
      free: [];
      ads: [];
      link: string;
    };
  };
}



// Fonction MoviePage permettant d'afficher la page d'un film 
function MoviePage() {

  const navigate = useNavigate();


  // ================= MODALE DETAILS ============================ 

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


  // ================ USESTATES ================================= 

  // UseState qu définit l'id et le "fillValue" du film
  const [circle, setCircle] = useState<{ id: number; fillValue: number }>({
    id: 0,
    fillValue: 0,
  });

  // UseState chargement de page 
  const [isLoading, setIsLoading] = useState(true);

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
  const [providers, setProviders] = useState<Providers>({
    results: {
      FR: {
        flatrate: [],
        rent: [],
        buy: [],
        free: [],
        ads: [],
        link: '',
      },
    },
  });


  // ================ USECONTEXT =================================

  const { currentMovieId } = useContext(CurrentMovieIdContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { selectedGenreFilters } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters } = useContext(SelectedProviderFiltersContext);
  const { selectedDecadeFilters } = useContext(SelectedDecadeFiltersContext);
  const { handleNoResult } = useContext(NoResultContext);


  // ==================== USESPRING ===============================

  // UseSpring permettant l'animation du cercle de chargement
  const circleAnimation = useSpring({
    from: { strokeDashoffset: 326.56 },
    to: { strokeDashoffset: 326.56 - (326.56 * circle.fillValue) / 100 },
  });

  // =================== FONCTIONS DE CONVERSIONS ET DE RÉCUPÉRATION ===========================

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
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month
      }/${year}`;
  }


  // RECUPERATION DES RÉALISATEURS

  const directingCrewMembers = credits.crew.filter(
    (person: { job: string }) => person.job === 'Director'
  );
  const mappedDirectingCrewMembers = directingCrewMembers.slice(0, 3);


  // RÉCUPÉRATION DES ACTEURS

  const actorCastMembers = credits.cast.filter(
    (person: { known_for_department: string }) =>
      person.known_for_department === 'Acting'
  );
  const mappedActorCastMembers = actorCastMembers.slice(0, 3);


  // ==================== USEEFFECT ===============================

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


  // UseEffect récupérant l'URI permettant l'affichage des films trouvés via les filtres de la Home puis en sélectionne un aléatoirement pour l'afficher
  useEffect(() => {
    setIsLoading(true);

    // Requête axios permettant de récupérer les données des films filtrés
    axios
      .get(
        `https://deploy-back-kinomatch.herokuapp.com/films${window.location.search}`
      )

      // Si la requête ne renvoie aucun résultat, on affiche la page d'accueil et on affiche une modale "aucun résultat"
      .then(({ data }) => {
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

        // On récupère les données de la page sélectionnée
        const searchParams1 = new URLSearchParams();
        searchParams1.append('randomPage', chosenPage.toString());

        // Si aucun filtre n'est sélectionné, on affiche les films populaires sinon on affiche les films filtrés
        if (window.location.search === '') {
          return axios.get(
            `https://deploy-back-kinomatch.herokuapp.com/randomFilms`
          );
        }
        return axios.get(
          `https://deploy-back-kinomatch.herokuapp.com/randomFilms${window.location.search}&${searchParams1.toString()}`
        );
      })

      // Si la promesse est résolue, on récupère les données de la page sélectionnée
      .then((response) => {
        const data = response?.data;

        // Si la requête récupère des données, on sélectionne un film aléatoire parmi les résultats
        if (data) {
          const selectRandomID =
            data.results[Math.floor(Math.random() * data.results.length)].id;

          // On évite d'afficher le même film que celui qui est déjà affiché
          const filteredResults = data.results.filter(
            (result: { id: string }) => result.id !== selectRandomID);

          // Si aucun film n'est affiché, on affiche le film sélectionné aléatoirement
          if (movieArray.length === 0) {
            setMovieArray(filteredResults);

            const searchParams = new URLSearchParams();
            searchParams.append('movieID', selectRandomID);

            // On récupère les données du film sélectionné aléatoirement sur les routes "detail", "credits" et "providers"
            const requests = [
              axios.get(
                `https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`
              ),
              axios.get(
                `https://deploy-back-kinomatch.herokuapp.com/credits?${searchParams.toString()}`
              ),
              axios.get(
                `https://deploy-back-kinomatch.herokuapp.com/provider?${searchParams.toString()}`
              ),
            ];
            return Promise.all(requests);

            // Sinon on affiche le film sélectionné par le User parmi les autres résultats filtrés
          } else {
            const searchParams = new URLSearchParams();
            searchParams.append('movieID', currentMovieId);

            // On récupère les données du film sélectionné par le User sur les routes "detail", "credits" et "providers"
            const requests = [
              axios.get(
                `https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`
              ),
              axios.get(
                `https://deploy-back-kinomatch.herokuapp.com/credits?${searchParams.toString()}`
              ),
              axios.get(
                `https://deploy-back-kinomatch.herokuapp.com/provider?${searchParams.toString()}`
              ),
            ];
            return Promise.all(requests);
          }
        }
      })

      // Puis on met à jour les states avec les données récupérées
      .then((responses) => {
        if (Array.isArray(responses)) {
          const [movieData, creditsData, providersData] = responses;

          // Si les données sont récupérées, on met à jour les states
          if (
            movieData.data &&
            creditsData.data &&
            providersData.data
          ) {
            setMovie(movieData.data);
            setCredits(creditsData.data);
            setProviders(providersData.data);

            // On met à jour le state du cercle de notation afin d'afficher la note du film
            setCircle({ id: movieData.data.id, fillValue: movieData.data.vote_average * 10 })
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });

    // On fait en sorte que le useEffect ne se lance que si le state currentMovieId change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovieId]);

  // Si le chargement est en cours, on affiche le composant Loading
  if (isLoading) {
    return <Loading />;
  }

  

  return (
    <div className='moviePage'>

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
            {' '}
            <cite className='movieFound__essentiel-title'>{movie.title}</cite>
            {isLoggedIn && <AddButton movie={movie.id} />}
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
                  {Math.floor(movie.vote_average * 10) === movie.vote_average * 10
                    ? movie.vote_average * 10
                    : (movie.vote_average * 10).toFixed(1)}%
                  <div className='small'>{movie.vote_count} votes </div>
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
          <div className='movieDetails__filters-desktop'>
            <ul className='movieDetails__filters-desktop--filterElemList'>
              {/* Pour chaque filtre de "genre", on affiche les noms de genres */}
              <li>
                {selectedGenreFilters.map(
                  (genre: { id: Key | null | undefined; name: string }) => (
                    <p
                      key={genre.id}
                      className='movieDetails__filters-desktop--filterElem'
                    >
                      {genre.name}
                    </p>
                  )
                )}
              </li>
              {/* Pour chaque filtre de "plateforme", on affiche les noms de plateformes */}
              <li>
                {selectedProviderFilters.map((provider) => (
                  <p
                    key={provider.id}
                    className='movieDetails__filters-desktop--filterElem'
                  >
                    {provider.provider_name}
                  </p>
                ))}
              </li>
              {/* Pour chaque filtre de "décennie", on affiche les noms de décennies */}
              <li>
                {selectedDecadeFilters.map((decade) => (
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
              {mappedDirectingCrewMembers.map(
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
              {mappedActorCastMembers.map((actor: { name: string; credit_id: string }, index: number) => (
                <li
                  key={actor.credit_id}
                  className='movieDetails__description-actorsList--actors'
                >
                  {/* Si l'index est égal à 0, on affiche "Avec" sinon on affiche rien */}
                  {/* Si l'index est différent de 0, on affiche une virgule sinon rien */}
                  {/* On affiche le nom de l'acteur */}
                  {/* Si l'index est égal à la longueur du tableau des acteurs, on affiche "..." sinon on affiche rien */}
                  {index === 0 ? 'Avec ' : ''} {index !== 0 && ','} {actor.name}
                  {index === mappedActorCastMembers.length - 1 && '...'}
                </li>
              ))}
            </ul>
            <ul className='movieDetails__description-genresList'>
              {/* Affichage des filtres concernant le film affiché */}
              {movie.genres.map(
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
                      {selectedGenreFilters.map(
                        (genre: { id: Key | null | undefined; name: string }) => (
                          <p
                            key={genre.id}
                            className='movieDetails__filters-mobile--filterElem'
                          >
                            {genre.name}
                          </p>
                        )
                      )}
                    </li>
                    <li>
                      {/* Pour chaque filtre de "provider", on affiche les noms de providers */}
                      {selectedProviderFilters.map((provider) => (
                        <p
                          key={provider.id}
                          className='movieDetails__filters-mobile--filterElem'
                        >
                          {provider.provider_name}
                        </p>
                      ))}
                    </li>
                    <li>
                      {/* Pour chaque filtre de "decade", on affiche les noms de décennies */}
                      {selectedDecadeFilters.map((decade) => (
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
      {
        desktopVersion &&
        <Footer />
      }
    </div>
  );
}

export default MoviePage;

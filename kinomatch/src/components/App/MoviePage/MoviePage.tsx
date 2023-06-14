import { Key, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

interface Credits {
  cast: [];
  crew: [];
  id: number;
}

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


function MoviePage() {
  const navigate = useNavigate();

  {
    /* ================= MODALE DETAILS ============================ */
  }

  const handleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  const handleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  {
    /* MODALE AUTRES RÉSULTATS */
  }

  const handleOtherResults = () => {
    setShowOtherResults(!showOtherResults);
  };

  {
    /* ================ USESTATES ================================= */
  }

  {
    /* UseState Modale "Résultats" */
  }
  const [showOtherResults, setShowOtherResults] = useState(false);

  {
    /* UseState Modale "Détails" */
  }
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  {
    /* UseState Modale "Image" */
  }
  const [showImageModal, setShowImageModal] = useState(false);

  {
    /* UseState route "Detail" */
  }
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

  {
    /* UseState route "credits" */
  }
  const [credits, setCredits] = useState<Credits>({
    cast: [],
    crew: [],
    id: 0,
  });

  {
    /* UseState route "providers" */
  }
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

  {
    /* UseState chargement de page */
  }
  const [isLoading, setIsLoading] = useState(true);

  {
    /* UseState qui récupère un tableau de films filtrés sans l'id du film affiché en grand  */
  }
  const [movieArray, setMovieArray] = useState([]);

  {
    /* UseState qui permet l'affichage de certains components suivant la largeur de fenêtre */
  }
  const [desktopVersion, setDesktopVersion] = useState(false);

  {
    /* ================ USECONTEXT ================================= */
  }

  {
    /* UseContext récupérant l'id courant du film sélectionné dans "autres résultats"  */
  }
  const { currentMovieId } = useContext(CurrentMovieIdContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { selectedGenreFilters } = useContext(SelectedGenreFiltersContext);
  const { selectedProviderFilters } = useContext(SelectedProviderFiltersContext);
  const { selectedDecadeFilters } = useContext(SelectedDecadeFiltersContext);
  const { handleNoResult } = useContext(NoResultContext);

  console.log(selectedGenreFilters);
  console.log(selectedProviderFilters);
  console.log(selectedDecadeFilters);

  {
    /* =============================================================== */
  }

  {
    /* UseEffect permettant l'affichage conditionnel suivant la largeur de fenêtre  */
  }
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
    // ajout d'une écoute de l'événement de redimensionnement de la fenêtre, ce qui va lancer handleResize
    // et actualiser le state windowSize
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, []);

  {
    /*UseEffect récupérant l'URI permettant l'affichage des films trouvés via les filtres de la Home puis en sélectionne un aléatoirement pour l'afficher */
  }
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://deploy-back-kinomatch.herokuapp.com/films${window.location.search}`
      )
      .then(({ data }) => {
        console.log(data, typeof data);
        if (data.results.length === 0) {
          handleNoResult();
          navigate(`/`);
          return;
        }
        const numberOfPages = data.total_pages;
        console.log(numberOfPages);
        let chosenPage = Math.floor(Math.random() * numberOfPages) + 1;
        if (chosenPage > 500) {
          chosenPage = Math.floor(Math.random() * 500) + 1;
        }
        const searchParams1 = new URLSearchParams();
        searchParams1.append('randomPage', chosenPage.toString());
        console.log(window.location.search);
        if (window.location.search === '') {
          console.log('ça passe ici');
          return axios.get(
            `https://deploy-back-kinomatch.herokuapp.com/randomFilms`
          );
        }
        return axios.get(
          `https://deploy-back-kinomatch.herokuapp.com/randomFilms${window.location.search}&${searchParams1.toString()}`
        );
      })
      .then((response) => {
        const data = response?.data;
        if (data) {
          console.log('data2', data);
          const selectRandomID =
            data.results[Math.floor(Math.random() * data.results.length)].id;

          const filteredResults = data.results.filter(
            (result: { id: string }) => result.id !== selectRandomID);

          if (movieArray.length === 0) {
            setMovieArray(filteredResults);
            console.log(data.results);
            const searchParams = new URLSearchParams();
            // if (currentMovieId) {
            //   searchParams.append('movieID', currentMovieId);
            // } else {
            searchParams.append('movieID', selectRandomID);
            // }
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
          } else {
            const searchParams = new URLSearchParams();
            searchParams.append('movieID', currentMovieId);
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
      .then((responses) => {
        if (Array.isArray(responses)) {
          const [movieData, creditsData, providersData] = responses;
          if (
            movieData.data &&
            creditsData.data &&
            providersData.data
          ) {
            setMovie(movieData.data);
            setCredits(creditsData.data);
            setProviders(providersData.data);
            console.log(movieData);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovieId]);

  console.log(movie);

  if (isLoading) {
    return <Loading />;
  }

  {
    /* DURÉE DU FILM EN HEURES*/
  }

  function convertMinutesInHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  }

  {
    /* CONVERSION DATE */
  }

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month
      }/${year}`;
  }

  {
    /* RECUPERATION RÉALISATEURS */
  }

  console.log(credits);

  const directingCrewMembers = credits.crew.filter(
    (person: { job: string }) => person.job === 'Director'
  );
  const mappedDirectingCrewMembers = directingCrewMembers.slice(0, 3);

  {
    /* RÉCUPÉRATION ACTEURS */
  }

  const actorCastMembers = credits.cast.filter(
    (person: { known_for_department: string }) =>
      person.known_for_department === 'Acting'
  );
  const mappedActorCastMembers = actorCastMembers.slice(0, 3);

  return (
    <div className='moviePage'>
      {/* MODALS*/}

      {/* Modale Image*/}
      {showImageModal && (
        <ImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          movie={movie}
        />
      )}

      {/* Modale Details*/}
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
            {/* RENOMMER LE CLASSNAME AVEC LE BEM */}
            <cite className='movieFound__essentiel-title'>{movie.title}</cite>
            {isLoggedIn && <AddButton movie={movie.id} />}
          </div>
          <div className='movieFound__essentiel-imageFrame'>
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
              <p className='movieFound__essentiel-body--note---noteNumber'>
                {Math.floor(movie.vote_average * 10) === movie.vote_average * 10
                  ? movie.vote_average * 10
                  : (movie.vote_average * 10).toFixed(1)}
                %
              </p>
              <p className='movieFound__essentiel-body--note---opinion'>
                {movie.vote_count} votes
              </p>
              {/* <a className='movieFound__essentiel-body--note---noteNumber' href='#movieDetails__comments'>{(Math.floor(movie.vote_average * 10) === movie.vote_average * 10) ? movie.vote_average * 10 : (movie.vote_average * 10).toFixed(1)}%</a>
              <a className='movieFound__essentiel-body--note---opinion' href='#movieDetails__comments'>{movie.vote_count} votes</a> */}
            </div>
          </div>

          <Providers providers={providers} />
        </section>
        {/* Section détails du film: filtres, synopsis, réalisateur, acteurs date de sortie ...  */}
        <section className='movieDetails'>
          <div className='movieDetails__filters-desktop'>
            <ul className='movieDetails__filters-desktop--filterElemList'>
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

            {/* <p className='movieDetails__filters-desktop--filterElem--modifier'>Modifier</p> */}
          </div>
          <div className='movieDetails__description'>
            {/* Affichage de la tag line */}
            <blockquote className='movieDetails__description-blockquote'>
              {movie.tagline ? (
                <cite className='movieDetails__description-blockquote--tagline'>{`"${movie.tagline}"`}</cite>
              ) : null}
            </blockquote>

            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>
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
                    {' '}
                    {index !== 0 && ','} {genre.name}{' '}
                  </li>
                )
              )}
            </ul>
            <p className='movieDetails__description-duration'>
              {movie.runtime
                ? convertMinutesInHours(movie.runtime)
                : 'Durée non précisée'}
            </p>
            <p className='movieDetails__description-date'>
              {movie.release_date
                ? formatDate(movie.release_date)
                : 'Date de sortie non précisée'}
            </p>
            <button
              className='movieDetails__description-details'
              onClick={handleDetailsModal}
            >
              + de détails
            </button>
            {/* <div className='movieDetails__description-writeComment'>
              <a className='movieDetails__description-commentShortCut' href="#movieDetails__description-comments-form--content">Laisser un commentaire</a>
            </div> */}

            {/* <CommentPost /> */}

            <div className='movieDetails__filters'>
              {!desktopVersion && (
                <React.Fragment>
                  <button
                    className='movieDetails__filters-otherResultsBtn'
                    onClick={handleOtherResults}
                  >
                    {!showOtherResults ? 'Autres Résultats' : 'Retour'}
                  </button>
                  {/* Affichage des filtres concernant le film affiché */}
                  <ul className='movieDetails__filters-mobile--filterElemList'>
                    <li>
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
        {desktopVersion ? (
          <OtherResults
            movieArray={movieArray}
            showOtherResults={showOtherResults}
            setShowOtherResults={setShowOtherResults}
          />
        ) : (
          showOtherResults && (
            <OtherResults
              movieArray={movieArray}
              showOtherResults={showOtherResults}
              setShowOtherResults={setShowOtherResults}
            />
          )
        )}
      </section>
      {
        desktopVersion &&
        <Footer />
      }
    </div>
  );
}

export default MoviePage;

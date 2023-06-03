import { Key, useContext, useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';

import ImageModal from './ImageModal/ImageModal';
import DetailsModal from './DetailsModal/DetailsModal';
import CommentPost from './CommentPost/CommentPost';
import AddButton from './AddButtons/AddButtons';
import Providers from './Providers/Providers';
import OtherResults from './OtherResults/OtherResults';
import { CurrentMovieIdContext } from './../../../contexts/CurrentMovieIdContext';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../Loading/Loading';


import './style.scss';


function MoviePage() {





  {/* ================= MODALE DETAILS ============================ */ }


  const handleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  const handleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  {/* MODALE AUTRES RÉSULTATS */ }

  const handleOtherResults = () => {
    setShowOtherResults(!showOtherResults);
  };


  {/* ================ USESTATES ================================= */ }

  {/* UseState Modale "Résultats" */ }
  const [showOtherResults, setShowOtherResults] = useState(false);

  {/* UseState Modale "Détails" */ }
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  {/* UseState Modale "Image" */ }
  const [showImageModal, setShowImageModal] = useState(false);

  {/* UseState route "Detail" */ }
  const [movie, setMovie] = useState(null);

  {/* UseState route "credits" */ }
  const [credits, setCredits] = useState(null);

  {/* UseState route "providers" */ }
  const [providers, setProviders] = useState(null);

  {/* UseState chargement de page */ }
  const [isLoading, setIsLoading] = useState(true);

  {/* UseState qui récupère un tableau de films filtrés sans l'id du film affiché en grand  */ }
  const [movieArray, setMovieArray] = useState([]);

  {/* UseState qui récupère un id de film aléatoire en parcourant le résultat de requête axios */ }
  const [randomID, setRandomID] = useState('');

  {/* UseState qui récupère l'id du film sélectionné par l'utilisateur */ }
  const [selectedId, setSelectedId] = useState('');

  {/* UseState qui permet l'affichage de certains components suivant la largeur de fenêtre */ }
  const [desktopVersion, setDesktopVersion] = useState(false);

  {/* ================ USECONTEXT ================================= */ }

  {/* UseContext récupérant l'id courant du film sélectionné dans "autres résultats"  */ }
  const { currentMovieId } = useContext(CurrentMovieIdContext);
  const { isLoggedIn } = useContext(AuthContext);

  console.log(selectedId);

  {/* UseEffect permettant l'affichage conditionnel suivant la largeur de fenêtre  */ }
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
    handleResize()
    return () => window.removeEventListener('resize', handleResize);
    // un removeEventListener pour éviter les fuites de mémoire
  }, []);


  {/*UseEffect récupérant l'URI permettant l'affichage des films trouvés via les filtres de la Home puis en sélectionne un aléatoirement pour l'afficher */ }
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`https://deploy-back-kinomatch.herokuapp.com/films${window.location.search}`)
      .then(({ data }) => {
        const numberOfPages = data.total_pages;
        console.log(numberOfPages);
        let chosenPage = Math.floor(Math.random() * numberOfPages) + 1;
        if (chosenPage > 500) {
          chosenPage = Math.floor(Math.random() * 500) + 1;
        }
        const searchParams1 = new URLSearchParams();
        searchParams1.append('randomPage', chosenPage.toString());
        console.log(window.location.search);
        if (window.location.search === "") {
          console.log('ça passe ici');
          return axios.get(`https://deploy-back-kinomatch.herokuapp.com/randomFilms`);
        }
        return axios.get(`https://deploy-back-kinomatch.herokuapp.com/randomFilms${window.location.search}&${searchParams1.toString()}`);
      })
      .then(({ data }) => {
        const randomID = data.results[Math.floor(Math.random() * data.results.length)].id;
        const filteredResults = data.results.filter((result) => result.id !== randomID);
        setMovieArray(filteredResults);
        console.log(data.results);
        const searchParams = new URLSearchParams();
        if (currentMovieId) {
          searchParams.append('movieID', currentMovieId);
        } else {
          searchParams.append('movieID', randomID);
          setRandomID(randomID);
        }
        const requests = [
          axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`),
          axios.get(`https://deploy-back-kinomatch.herokuapp.com/credits?${searchParams.toString()}`),
          axios.get(`https://deploy-back-kinomatch.herokuapp.com/provider?${searchParams.toString()}`)
        ];
        return Promise.all(requests);
      })
      .then(([movieData, creditsData, providersData]) => {
        if (movieData.data && creditsData.data && providersData.data) {
          setMovie(movieData.data);
          setCredits(creditsData.data);
          setProviders(providersData.data);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentMovieId]);



  console.log(movie);


  if (isLoading) {
    return (
      <Loading />
    )
  }

  {/* DURÉE DU FILM EN HEURES*/ }

  function convertMinutesInHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  }

  {/* CONVERSION DATE */ }

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  }

  {/* RECUPERATION RÉALISATEURS */ }

  console.log(credits)

  const directingCrewMembers = credits.crew.filter((person: { job: string; }) => person.job === "Director");
  const mappedDirectingCrewMembers = directingCrewMembers.slice(0, 3);

  {/* RÉCUPÉRATION ACTEURS */ }

  const actorCastMembers = credits.cast.filter((person: { known_for_department: string; }) => person.known_for_department === "Acting");
  const mappedActorCastMembers = actorCastMembers.slice(0, 3);



  return (

    <div className='moviePage'>
      {/* MODALS*/}

      {/* Modale Image*/}
      {
        showImageModal &&
        < ImageModal
          showImageModal={showImageModal}
          setShowImageModal={setShowImageModal}
          movie={movie}
        />
      }

      {/* Modale Details*/}
      {
        showDetailsModal &&
        < DetailsModal
          showDetailsModal={showDetailsModal}
          setShowDetailsModal={setShowDetailsModal}
          movie={movie}
          credits={credits}
          directingCrewMembers={directingCrewMembers}
          formatDate={formatDate}
          convertMinutesInHours={convertMinutesInHours}
        />
      }

      {/* Page du film  */}
      <section className='movieFound'>
        {/* Page infos essentielles du film: titre, image, boutons, plateformes, note */}
        <section className='movieFound__essentiel'>
          {/* Div contenant le titre et les icons */}
          <div className='movieFound__essentiel-head'> {/* RENOMMER LE CLASSNAME AVEC LE BEM */}
            <cite className='movieFound__essentiel-title'>{movie.title}</cite>
            {
              isLoggedIn &&
              <AddButton movie={movie.id} />
            }

          </div>
          <div className='movieFound__essentiel-imageFrame'>
            <img className='movieFound__essentiel-image' src={movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : '../../../../../../public/images/SamplePoster1.png'} alt='Image du film' onClick={handleImageModal} />
          </div>
          <div className='movieFound__essentiel-body'>
            <div className='movieFound__essentiel-body--note'>
              <a className='movieFound__essentiel-body--note---noteNumber' href='#movieDetails__comments'>{(Math.floor(movie.vote_average * 10) === movie.vote_average * 10) ? movie.vote_average * 10 : (movie.vote_average * 10).toFixed(1)}%</a>
              <a className='movieFound__essentiel-body--note---opinion' href='#movieDetails__comments'>{movie.vote_count} votes</a>
            </div>
          </div>

          <Providers providers={providers} />

        </section>
        {/* Section détails du film: filtres, synopsis, réalisateur, acteurs date de sortie ...  */}
        <section className='movieDetails'>
          <div className='movieDetails__filters-desktop'>

            {/* Affichage des filtres concernant le film affiché */}
            {
              movie.genres.map((genre: { id: Key | null | undefined; name: string }) => (
                <p key={genre.id} className='movieDetails__filters-desktop--filterElem'>{genre.name}</p>
              ))
            }

            <p className='movieDetails__filters-desktop--filterElem--modifier'>Modifier</p>
          </div>
          <div className='movieDetails__description'>

            {/* Affichage de la tag line */}
            <blockquote className='movieDetails__description-blockquote'>
              {
                movie.tagline ? <cite className='movieDetails__description-blockquote--tagline'>{`"${movie.tagline}"`}</cite> : null
              }
            </blockquote>

            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>{movie.overview ? movie.overview : 'Synopsis non précisé'}</p>

            {/* Affichage des réalisateurs concernant le film affiché */}
            <ul className='movieDetails__description-directorsList'>
              {
                mappedDirectingCrewMembers.map((director, index) => (
                  <li key={director.id} className='movieDetails__description-directorsList--director'>{index === 0 ? 'De ' : ''} {director.name}
                    {index !== mappedDirectingCrewMembers.length - 1 && ', '}{index === mappedDirectingCrewMembers.length && '...'}</li>
                ))
              }
            </ul>
            {/* Affichage des acteurs concernant le film affiché */}
            <ul className='movieDetails__description-actorsList'>
              {
                mappedActorCastMembers.map((actor, index) => (
                  <li key={actor.credit_id} className='movieDetails__description-actorsList--actors'>{index === 0 ? 'Avec ' : ''} {actor.name}
                    {index !== mappedActorCastMembers.length - 1 ? ', ' : '...'}</li>
                ))
              }
            </ul>
            {/* <p className='movieDetails__description-actors'>Avec Chris Pratt, Zoe Saldana ...</p> */}
            <p className='movieDetails__description-duration'>{movie.runtime ? convertMinutesInHours(movie.runtime) : 'Durée non précisée'}</p>
            <p className='movieDetails__description-date'>{movie.release_date ? formatDate(movie.release_date) : 'Date de sortie non précisée'}</p>
            <button className='movieDetails__description-details' onClick={handleDetailsModal}>+ de détails</button>
            <div className='movieDetails__description-writeComment'>
              <a className='movieDetails__description-commentShortCut' href="#movieDetails__description-comments-form--content">Laisser un commentaire</a>
            </div>

            <CommentPost />

            <div className='movieDetails__filters'>
              {!desktopVersion && (
                <React.Fragment>
                  <button
                    className='movieDetails__filters-otherResultsBtn'
                    onClick={handleOtherResults}
                  >
                    {!showOtherResults ? "Autres Résultats" : "Retour"}
                  </button>
                  {/* Affichage des filtres concernant le film affiché */}
                  {movie.genres.map((genre: { id: Key | null | undefined; name: string }) => (
                    <p key={genre.id} className='movieDetails__filters-mobile--filterElem'>
                      {genre.name}
                    </p>
                  ))}
                </React.Fragment>
              )}
              {/* <p className='movieDetails__filters-filterElem--modifier'>Modifier</p> */}
            </div>
          </div>
        </section>
        {
          desktopVersion
            ? <OtherResults
              movieArray={movieArray}
              showOtherResults={showOtherResults}
              setShowOtherResults={setShowOtherResults} />
            : showOtherResults &&
            <OtherResults
              movieArray={movieArray}
              showOtherResults={showOtherResults}
              setShowOtherResults={setShowOtherResults} />
        }
      </section >
    </div>
  )
}

export default MoviePage;
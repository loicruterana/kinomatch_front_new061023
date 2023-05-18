import { useEffect, useState } from 'react';
import axios from 'axios';

import ImageModal from './ImageModal/ImageModal';
import DetailsModal from './DetailsModal/DetailsModal';
import CommentPost from './CommentPost/CommentPost';
import AddButton from './/AddButtons/AddButtons';

import './style.scss';


function MoviePage() {


  //==================== MODALE IMAGE ==============================
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  //  ====================MODALE DETAILS============================
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  // ================ REQUETE DETAILS MOVIES ========================

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [providers, setProviders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('movieID', '483368');

    Promise.all([
      axios.get(`https://deploy-back-kinomatch.herokuapp.com/detail?${searchParams.toString()}`),
      axios.get(`https://deploy-back-kinomatch.herokuapp.com/credits?${searchParams.toString()}`),
      axios.get(`https://deploy-back-kinomatch.herokuapp.com/provider?${searchParams.toString()}`)
    ])
      .then(([movieData, creditsData, providersData]) => {
        if(movieData.data, creditsData.data, providersData.data !== null) {
        setMovie(movieData.data);
        setCredits(creditsData.data);
        setProviders(providersData.data);
        }
        console.log(movie);
        console.log(credits);
        console.log(providers);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div>chargement</div> //! IMPORTER LA PAGE LOADING
    )
  }

  // ===================== DUREE DU FILM EN HEURES ===================

  function convertMinutesInHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  }

  // ======================= CONVERSION DATE ===================

  // const date = movie?.release_date;
  // const parts = date.split("-");
  // const newDate = parts[2] + "/" + parts[1] + "/" + parts[0]; // "26/04/1954"


  // ======================= RECUPERATION DIRECTOR ===================

  const directingCrewMembers = credits.crew.filter(person => person.known_for_department === "Directing");
  const mappedDirectingCrewMembers = directingCrewMembers.slice(0,3);


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
          providers={providers}
          directingCrewMembers={directingCrewMembers}
        />
      }

      {/* Page du film  */}
      <article className='movieFound'>
        {/* Page infos essentielles du film: titre, image, boutons, plateformes, note */}
        <section className='movieFound__essentiel'>
          {/* Div contenant le titre et les icons */}
          <div className='movieFound__essentiel-head'> {/* RENOMMER LE CLASSNAME AVEC LE BEM */}
            <cite className='movieFound__essentiel-title'>{movie.title}</cite>
            <AddButton />
          </div>
          <div className='movieFound__essentiel-imageFrame'>
            <img className='movieFound__essentiel-image' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt='Image du film' onClick={handleImageModal} />
          </div>
          <div className='movieFound__essentiel-body'>
            <div className='movieFound__essentiel-body--note'>
              <a className='movieFound__essentiel-body--note---noteNumber' href='#movieDetails__comments'>{(movie.vote_average * 10).toFixed(1)}%</a>
              <a className='movieFound__essentiel-body--note---opinion' href='#movieDetails__comments'>{movie.vote_count} votes</a>
            </div>
            <ul className='movieFound__essentiel-disponibility'>
              <li><a className='movieFound__essentiel-disponibility--plateform' href='https://www.netflix.com/fr/' target='_blank'>Netflix</a></li>
              <li><a className='movieFound__essentiel-disponibility--plateform' href='https://www.primevideo.com/' target='_blank'>Prime Vidéo</a></li>
              <li><a className='movieFound__essentiel-disponibility--plateform' href='https://www.disneyplus.com/fr-fr' target='_blank'>Disney+</a></li>
              <li><a className='movieFound__essentiel-disponibility--plateform' href='https://video-a-la-demande.orange.fr/' target='_blank'>OrangeVOD</a></li>
            </ul>
          </div>
        </section>
        {/* Section détails du film: filtres, synopsis, réalisateur, acteurs date de sortie ...  */}
        <section className='movieDetails'>
          <div className='movieDetails__filters-desktop'>
            <button className='movieDetails__filters-desktop--otherResultsBtn'>Autres Résultats</button>

            {/* Affichage des filtres concernant le film affiché */}
            {
              movie.genres.map((element) => (
                <p key={element.id} className='movieDetails__filters-desktop--filterElem'>{element.name}</p>
              ))
            }

            <p className='movieDetails__filters-desktop--filterElem--modifier'>Modifier</p>
          </div>
          <div className='movieDetails__description'>
            {
              movie.tagline ? <h3 className='movieDetails__description-tagline'>"{movie.tagline}"</h3> : null

            }
            
            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>{movie?.overview}</p>

            {/* Affichage des réalisateurs concernant le film affiché */}
            {
              mappedDirectingCrewMembers.map((director) => (
                <p key={director.id} className='movieDetails__description-director'>De {director.name}</p>
              ))
            }
            <p className='movieDetails__description-actors'>Avec Chris Pratt, Zoe Saldana ...</p>
            <p className='movieDetails__description-duration'>{convertMinutesInHours(movie.runtime)}</p>
            <p className='movieDetails__description-date'>{movie.release_date}</p>
            <button className='movieDetails__description-details' onClick={handleDetailsModal}>+ de détails</button>
            <div className='movieDetails__description-writeComment'>
              <a className='movieDetails__description-commentShortCut' href="#movieDetails__description-comments-form--content">Laisser un commentaire</a>
            </div>
            <CommentPost />
            <div className='movieDetails__filters'>
              <button className='movieDetails__filters-otherResultsBtn'>Autres Résultats</button>
              <p className='movieDetails__filters-filterElem'>Science fiction</p>
              <p className='movieDetails__filters-filterElem'>Humour</p>
              <p className='movieDetails__filters-filterElem'>Action</p>
              <p className='movieDetails__filters-filterElem--modifier'>Modifier</p>
            </div>
          </div>
        </section>
      </article >
    </div>
  )
}

export default MoviePage;

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

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append('movieID', '447365');

    axios.get(`https://deploy-back-kinomatch.herokuapp.com/film?${searchParams.toString()}`)
      .then(({ data }) => setMovie(data))
      .catch((error) => console.error(error))
    console.log(movie);
    Array.isArray(movie);
  }, []);

  // ===================== DUREE DU FILM EN HEURES ===================

  function convertMinutesInHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }

  // =================================================================

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
        />
      }

      {/* Page du film  */}
      <article className='movieFound'>
        {/* Page infos essentielles du film: titre, image, boutons, plateformes, note */}
        <section className='movieFound__essentiel'>
          {/* Div contenant le titre et les icons */}
          <div className='movieFound__essentiel-head'> {/* RENOMMER LE CLASSNAME AVEC LE BEM */}
            <cite className='movieFound__essentiel-title'>{movie?.title}</cite>
            <AddButton />
          </div>
          <div className='movieFound__essentiel-imageFrame'>
            <img className='movieFound__essentiel-image' src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt='Image du film' onClick={handleImageModal} />
          </div>
          <div className='movieFound__essentiel-body'>
            <div className='movieFound__essentiel-body--note'>
              <a className='movieFound__essentiel-body--note---noteNumber' href='#movieDetails__comments'>{(movie?.vote_average * 10).toFixed(1)}%</a>
              <a className='movieFound__essentiel-body--note---opinion' href='#movieDetails__comments'>{movie?.vote_count} votes</a>
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
            {/* {
              movie.genres.map((element) => (
                <p className='movieDetails__filters-desktop--filterElem'>{element.name}</p>
              ))
            } */}
            <p className='movieDetails__filters-desktop--filterElem--modifier'>Modifier</p>
          </div>
          <div className='movieDetails__description'>
            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>{movie?.overview}</p>
            <p className='movieDetails__description-director'>De James Gunn</p>
            <p className='movieDetails__description-actors'>Avec Chris Pratt, Zoe Saldana ...</p>
            <p className='movieDetails__description-duration'>{convertMinutesInHours(movie?.runtime)}</p>
            <p className='movieDetails__description-date'>{movie?.release_date}</p>
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

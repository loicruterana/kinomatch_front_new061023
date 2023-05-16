import { useEffect, useState } from 'react';
import axios from 'axios';

import ImageModal from './ImageModal/ImageModal';
import DetailsModal from './DetailsModal/DetailsModal';
import CommentPost from './CommentPost/CommentPost';
import AddButton from './/AddButtons/AddButtons';

import './style.scss';



function MoviePage() {



  async function fetchMovieDetails() {
    const response = await axios.get('http://localhost:4000/film');
    console.log(response.data);
  }

  fetchMovieDetails();

  // MODALE IMAGE ================================================
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageModal = () => {
    setShowImageModal(!showImageModal);
  };

  // MODALE DETAILS ================================================
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleDetailsModal = () => {
    setShowDetailsModal(!showDetailsModal);
  };

  // REQUETE API MOVIE DETAILS ======================================
  // const [movie, setMovie] = useState(null);

  // useEffect(() => {

  //   axios.get('http://localhost:4000/film')
  //     .then(({ data }) => setMovie(data))
  //     .catch((error) => console.error(error))
  //   console.log(movie);
  // }, []);


  // =================================================================

  return (
    <div className='moviePage'>
      {/* MODALS*/}

      {/* Modale Image*/}
      {
        showImageModal &&
        < ImageModal showImageModal={showImageModal} setShowImageModal={setShowImageModal} />
      }

      {/* Modale Details*/}
      {
        showDetailsModal &&
        < DetailsModal showDetailsModal={showDetailsModal} setShowDetailsModal={setShowDetailsModal} />
      }

      {/* Page du film  */}
      <article className='movieFound'>
        {/* Page infos essentielles du film: titre, image, boutons, plateformes, note */}
        <section className='movieFound__essentiel'>
          {/* Div contenant le titre et les icons */}
          <div className='movieFound__essentiel-head'> {/* RENOMMER LE CLASSNAME AVEC LE BEM */}
            <cite className='movieFound__essentiel-title'>Les Gardiens De La Galaxie 3</cite>
            <AddButton />
          </div>
          <div className='movieFound__essentiel-imageFrame'>
            <img className='movieFound__essentiel-image' src='./images/les_gardiens.jpg' alt='Image du film' onClick={handleImageModal} />
          </div>
          <div className='movieFound__essentiel-body'>
            <div className='movieFound__essentiel-body--note'>
              <a className='movieFound__essentiel-body--note---noteNumber' href='#movieDetails__comments'>86%</a>
              <a className='movieFound__essentiel-body--note---opinion' href='#movieDetails__comments'>174 votes</a>
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
            <p className='movieDetails__filters-desktop--filterElem'>Science fiction</p>
            <p className='movieDetails__filters-desktop--filterElem'>Humour</p>
            <p className='movieDetails__filters-desktop--filterElem'>Action</p>
            <p className='movieDetails__filters-desktop--filterElem--modifier'>Modifier</p>
          </div>
          <div className='movieDetails__description'>
            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>Notre bande de marginaux favorite a quelque peu changé. Peter Quill, qui pleure toujours la perte de Gamora, doit rassembler son équipe pour défendre l’univers et protéger l’un des siens. En cas d’échec, cette mission pourrait bien marquer la fin des Gardiens tels que nous les connaissons.</p>
            <p className='movieDetails__description-director'>De James Gunn</p>
            <p className='movieDetails__description-actors'>Avec Chris Pratt, Zoe Saldana ...</p>
            <p className='movieDetails__description-duration'>Durée: 2h30 min</p>
            <p className='movieDetails__description-date'>Sortie: 03 mai 2023</p>
            <button className='movieDetails__description-details' onClick={handleDetailsModal}>+ de détails</button>
            <div className='movieDetails__description-writeComment'>
              <a className='movieDetails__description-commentShortCut' href="#movieDetails__description-comments-form--content">Laisser un commentaire</a>
            </div>
            <div className='movieDetails__comments' id='movieDetails__comments'>
              <h4 className='movieDetails__comments-pseudo'>65 | webcritic87</h4>
              <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
              <h4 className='movieDetails__comments-pseudo'>62 | toto_du_75</h4>
              <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
              <h4 className='movieDetails__comments-pseudo'>58 | tata_du_30</h4>
              <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
              <CommentPost />
            </div>
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

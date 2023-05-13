import { useState } from 'react';
import ImageModal from './ImageModal/ImageModal';
import DetailsModal from './DetailsModal/DetailsModal';

import './style.scss';

function MoviePage() {

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
          < DetailsModal showDetailsModal={showDetailsModal} setShowDetailsModal={setShowDetailsModal}/>
        }
      {/* Page du film  */}
      <article className='movieFound'>
        {/* Page infos essentielles du film: titre, image, boutons, plateformes, note */}
        <section className='movieFound__essentiel'>
          {/* Div contenant le titre et les icons */}
          <div className='movieFound__essentiel-head'> {/* RENOMMER LE CLASSNAME AVEC LE BEM */}
            <cite className='movieFound__essentiel-title'>Les Gardiens De La Galaxie 3</cite>
            <button type='submit' className='movieFound__essentiel-btn--addToLike'></button>
            <button type='submit' className='movieFound__essentiel-btn--addToFavorites'></button>
            <button type='submit' className='movieFound__essentiel-btn--addToViewed'></button>
          </div>
          <img className='movieFound__essentiel-image' src='./images/les_gardiens.jpg' alt='Image du film' onClick={handleImageModal} />

          <div className='movieFound__essentiel-body'>
            <div className='movieFound__essentiel-body--note'>
              <p className='movieFound__essentiel-body--note---noteNumber'>86%</p>
              <a className='movieFound__essentiel-body--note---opinion' href='#movieDetails__comments'>174 votes</a>
            </div>
            <div className='movieFound__essentiel-disponibility'>
              <a className='movieFound__essentiel-disponibility--plateform' href='https://www.netflix.com/fr/' target='_blank'>Netflix</a>
              <a className='movieFound__essentiel-disponibility--plateform' href='https://www.primevideo.com/' target='_blank'>Prime Vidéo</a>
              <a className='movieFound__essentiel-disponibility--plateform' href='https://www.disneyplus.com/fr-fr' target='_blank'>Disney+</a>
              <a className='movieFound__essentiel-disponibility--plateform' href='https://video-a-la-demande.orange.fr/' target='_blank'>OrangeVOD</a>
            </div>
          </div>
        </section>
        {/* Section détails du film: filtres, synopsis, réalisateur, acteurs date de sortie ...  */}
        <section className='movieDetails'>
          <div className='movieDetails__description'>
            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>Notre bande de marginaux favorite a quelque peu changé. Peter Quill, qui pleure toujours la perte de Gamora, doit rassembler son équipe pour défendre l’univers et protéger l’un des siens. En cas d’échec, cette mission pourrait bien marquer la fin des Gardiens tels que nous les connaissons.</p>
            <p className='movieDetails__description-director'>De James Gunn</p>
            <p className='movieDetails__description-actors'>Avec Chris Pratt, Zoe Saldana ...</p>
            <p className='movieDetails__description-duration'>Durée: 2h30 min</p>
            <p className='movieDetails__description-date'>Sortie: 03 mai 2023</p>
            <button className='movieDetails__description-details' onClick={handleDetailsModal}>+ de détails</button>
            <form className='movieDetails__description-comments' action="#" method="post">
              <div className='movieDetails__description-comments--content'>
                <textarea className='movieDetails__description-comments--textArea' name="comments" id="comments" placeholder='Laissez votre commentaire ici'>
                </textarea>
              </div>
              <input className='movieDetails__description-comments--input' type="submit" value="Envoyer" />
            </form>
            <div className='movieDetails__comments' id='movieDetails__comments'>
              <h3 className='movieDetails__comments-pseudo'>65 | webcritic87</h3>
              <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
              <h3 className='movieDetails__comments-pseudo'>62 | toto_du_75</h3>
              <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
              <h3 className='movieDetails__comments-pseudo'>58 | tata_du_30</h3>
              <p className='movieDetails__comments-comment'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
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
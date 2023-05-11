import './style.scss';

function MoviePage() {
  return (
    <div className='moviePage'>
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
          <img className='movieFound__essentiel-image' src='./images/les_gardiens.jpg' alt='Image du film' />
          <div className='movieFound__essentiel-body'>
            <div className='movieFound__essentiel-body--note'>
              <p className='movieFound__essentiel-body--note---noteNumber'>83%</p>
              <a className='movieFound__essentiel-body--note---opinion' href='#'>174 votes</a>
            </div>
            <div className='movieFound__essentiel-disponibility'>
              <a className='movieFound__essentiel-disponibility-plateform' href='#'>Netflix</a>
              <a className='movieFound__essentiel-disponibility-plateform' href='#'>Prime Vidéo</a>
              <a className='movieFound__essentiel-disponibility-plateform' href='#'>Disney</a>
            </div>
          </div>
          <textarea className='movieFound__essentiel-area' rows={5} cols={33} minLength={10} maxLength={4000} required placeholder='Laissez un commentaire'></textarea>
        </section>
        {/* Section détails du film: filtres, synopsis, réalisateur, acteurs date de sortie ...  */}
        <section className='movieDetails'>
          <div className='movieDetails__filters'>
            <button className='movieDetails__filters-otherDetailsBtn'>Autres Résultats</button>
            <p className='movieDetails__filters-filterElem'>Polar</p>
            <p className='movieDetails__filters-filterElem'>Espagnol</p>
            <p className='movieDetails__filters-filterElem'>Action</p>
            <p className='movieDetails__filters-filterElem--modifier'>Modifier</p>
          </div>
          <div className='movieDetails__description'>
            <h3>Synopsis</h3>
            <p>Un homme qui attend depuis ...</p>
            <p>De Paul Arévalo</p>
            <p>Avec Antonio de la Torre, Luis Callejo ...</p>
            <p>1h32 min</p>
            <p>26 avril 2017</p>
            <button>+ de détails</button>
            <div className='movieDetails__comments'>
              <h3>65 | webcritic87</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
            </div>
          </div>
        </section>
      </article >
    </div>
  )
}

export default MoviePage;
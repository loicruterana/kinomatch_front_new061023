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
              <a className='movieFound__essentiel-disponibility--plateform' href='#'>Netflix</a>
              <a className='movieFound__essentiel-disponibility--plateform' href='#'>Prime Vidéo</a>
              <a className='movieFound__essentiel-disponibility--plateform' href='#'>canalVOD</a>
              <a className='movieFound__essentiel-disponibility--plateform' href='#'>OrangeVOD</a>
            </div>
          </div>
        </section>
        {/* Section détails du film: filtres, synopsis, réalisateur, acteurs date de sortie ...  */}
        <section className='movieDetails'>
          <div className='movieDetails__description'>
            <h3 className='movieDetails__description-resumeTitle'>Synopsis</h3>
            <p className='movieDetails__description-resume'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa in deleniti nesciunt impedit obcaecati vitae repellat, perferendis aliquam vel architecto.</p>
            <p className='movieDetails__description-director'>De Paul Arévalo</p>
            <p className='movieDetails__description-actors'>Avec Antonio de la Torre, Luis Callejo ...</p>
            <p className='movieDetails__description-duration'>1h32 min</p>
            <p className='movieDetails__description-date'>26 avril 2017</p>
            <button className='movieDetails__description-details'>+ de détails</button>
            <form action=''className='movieDetails__description-form' method='post'>
              <input type='text' name='formComment' id='formComment' />
            </form>
            <div className='movieDetails__comments'>
              <h3>65 | webcritic87</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque vel exercitationem quasi unde reprehenderit maxime, dolores aut est sapiente provident molestiae, nesciunt architecto quod veritatis repellat inventore officiis optio! Corrupti?</p>
            </div>
            <div className='movieDetails__filters'>
              <button className='movieDetails__filters-otherDetailsBtn'>Autres Résultats</button>
              <p className='movieDetails__filters-filterElem'>Polar</p>
              <p className='movieDetails__filters-filterElem'>Espagnol</p>
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
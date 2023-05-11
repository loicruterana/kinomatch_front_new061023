import './style.scss';

function MoviePage() {
  return (
    <div className='moviePage'>
      <article className='movieFound'>
        <section className='movieFound__essentiel'>
          <cite className='movieFound__essentiel-title'>Titre du film</cite>
          <button className='movieFound__essentiel-btn'>
          <img className='movieFound__essentiel-img'src='#./images/ilusiones.webp' alt='addToLikeBtn' />
          </button>
          <button className='movieFound__essentiel-btn'>
          <img src='#' alt='addToFavoriteBtn' />
          </button>
          <button className='movieFound__essentiel-btn'>
          <img src='#' alt='addToView' />
          </button>
          <img className='movieFound__essentiel-image' src='#' alt='Image du film' />
          <p className='movieFound__essentiel-note'>Note</p>
          <div className='movieFound__essentiel-disponibility'>
            <a className='movieFound__essentiel-disponibility-plateform' href='#'>Netflix</a>
            <a className='movieFound__essentiel-disponibility-plateform' href='#'>Prime Vidéo</a>
            <a className='movieFound__essentiel-disponibility-plateform' href='#'>Disney</a>
          </div>
          <textarea className='movieFound__essentiel-area' rows={5} cols={33} minLength={10} maxLength={4000} required placeholder='Laissez un commentaire'></textarea>
        </section>
        <section className='movieDetails'>
          <div className='movieDetails__filters'>
            <p className='movieDetails__filters-filterElem'>Polar</p>
            <p className='movieDetails__filters-filterElem'>Espagnol</p>
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
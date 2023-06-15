// ================ IMPORT BIBLIOTHEQUES ================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

// ================ IMPORT SCSS ================

import './SearchResults.scss';
import Footer from '../Footer/Footer';

// ================ INTERFACES ================
  
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  vote_count: number;
}

interface Circle {
  id: number,
  fillValue: number
}

//* ================ COMPOSANT ================

export const SearchResults = () => {

// ================ USESTATE ================
 
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [circles, setCircles] = useState<Circle[]>([]);


// ================ UTILS ================

  const navigate = useNavigate();

  


// ================ INFINTE SCROLL ================
 
  const loadMoreData = async () => {
    try {
      const response = await fetch(
        `https://deploy-back-kinomatch.herokuapp.com/search?typedName=${query}&page=${page + 1}`
      );
      const newMovies = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...newMovies.results]);
      setPage((prevPage) => prevPage + 1);
      setCircles((prevCircles) => [
        ...prevCircles,
        ...newMovies.results.map((movie: { id: number; vote_average: number; }) => ({
          id: movie.id,
          fillValue: movie.vote_average * 10,
        })),
      ]);
      console.log(movies);
      console.log('onpasseici');
    } catch (error) {
      console.error(error);
    }
  };

// ================ HANDLERS ================

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length === 0) return;

    try {
      const response = await fetch(
        `https://deploy-back-kinomatch.herokuapp.com/search?typedName=${query}&page=1`
      );
      const data = await response.json();
      console.log(data.results);
      if (data.results.length === 0) {
        navigate('/noresult');
      }
      setMovies(data.results);
      setPage(1);
      setHasMore(true);
      setCircles(data.results.map((movie: { id: number; vote_average: number; }) => ({
        id: movie.id,
        fillValue: movie.vote_average * 10,
      })));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='searchresults-container'>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label' htmlFor='query'>
          Nom du film
        </label>
        <input
          className='input'
          type='text'
          name='query'
          placeholder='Ex: Jurassic Park'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='button' type='submit'>
          Rechercher
        </button>
      </form>
      <div className='searchresults-container-cardlist'>
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}>End of results</p>}
        >
{movies
  .filter((movie) => movie.poster_path)
  .map((movie) => {
    const circle = circles.find((circle) => circle.id === movie.id);
    if (!circle) {
      return null; 
    }
    return (
      <div className='searchresults-container-cardlist-card' key={movie.id}>
        <img
          className='searchresults-container-cardlist-card__image'
          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
          alt={movie.title + ' affiche'}
        />
        <section className='searchresults-container-cardlist-card__infos'>
          <div className='searchresults-container-cardlist-card__infos__content'>
            <h3 className='searchresults-container-cardlist-card__infos__title'>{movie.title}</h3>
            <p>
              <div className='searchresults-container-cardlist-card__infos__release'>Date de sortie : {movie.release_date}</div>
            </p>
            <div className="circle-big">
              <div className="text">
                {Math.floor(movie.vote_average * 10) === movie.vote_average * 10
                  ? movie.vote_average * 10
                  : (movie.vote_average * 10).toFixed(1)}
                %<div className="small">{movie.vote_count} votes </div>
              </div>
              <svg>
                <circle className="bg" cx="57" cy="57" r="52" />
                <circle
              className="progress"
              cx="57"
              cy="57"
              r="52"
              style={{
                strokeDashoffset: `${326.56 - (326.56 * circle.fillValue) / 100}px`,
                animation: circle.fillValue > 0 ? 'big 1s linear forwards' : 'none',
              }}
              
            />
              </svg>
            </div>
            <p className='searchresults-container-cardlist-card__infos__desc'>{movie.overview}</p>
          </div>
        </section>
      </div>
    );
  })}

        </InfiniteScroll>
      </div>
      <Footer />
    </div>
  );
//* ================ FERMETURE COMPOSANT ================

};

export default SearchResults;

import React, { useState } from 'react';
import './SearchMovies.scss';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  vote_count: number;
}

export const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loadMoreData = async () => {
    try {
      const response = await fetch(
        `https://deploy-back-kinomatch.herokuapp.com/search?typedName=${query}&page=${page + 1}`
      );
      const newMovies = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...newMovies.results]);
      setPage((prevPage) => prevPage + 1);
      console.log(movies);
      console.log('onpasseici');
    } catch (error) {
      console.error(error);
    }
  };

  const searchMovies = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='test'>
      <form className='form' onSubmit={searchMovies}>
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
      <div className='card-list'>
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}>End of results</p>}
        >
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <div className='card' key={movie.id}>
                <img
                  className='card--image'
                  src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                  alt={movie.title + ' affiche'}
                />
                <div className='card--content'>
                  <h3 className='card--title'>{movie.title}</h3>
                  <p>
                    <small>DATE DE SORTIE : {movie.release_date}</small>
                  </p>
                  <p>
                    <small>
                      NOTE :{' '}
                      {Math.floor(movie.vote_average * 10) === movie.vote_average * 10
                        ? movie.vote_average * 10
                        : (movie.vote_average * 10).toFixed(1)}
                      %
                    </small>
                  </p>
                  <p>
                    <small>Nombre de votes : {movie.vote_count}</small>
                  </p>
                  <p className='card--desc'>{movie.overview}</p>
                </div>
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SearchMovies;

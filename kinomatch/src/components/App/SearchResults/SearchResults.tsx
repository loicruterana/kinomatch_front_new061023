import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSpring, animated } from 'react-spring';
import MovieCard from './MovieCard/MovieCard';

import './SearchResults.scss';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';

// Interfaces
// interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
//   overview: string;
//   vote_average: number;
//   release_date: string;
//   vote_count: number;
// }

interface Circle {
  id: number;
  fillValue: number;
}

const SearchResults = () => {


  // State
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [circles, setCircles] = useState<Circle[]>([]);

  const moviesAreLoading = movies.length === 0; // true


  // Utilisation de la navigation
  const navigate = useNavigate();

  // Chargement des données supplémentaires pour le défilement infini
  const loadMoreData = async () => {
    try {
      const response = await fetch(
        `https://deploy-back-kinomatch.herokuapp.com/search?typedName=${query}&page=${page + 1}`
      );
      const newMovies = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...newMovies.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const queryString = window.location.search;

  // Gestion de la soumission du formulaire de recherche
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await fetch(
          `https://deploy-back-kinomatch.herokuapp.com/search${window.location.search}&page=1`
        );
        const data = await response.json();
        console.log(data)
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
  
    handleSubmit();
  }, [queryString]);

  useEffect(() => {
    const updatedCircles: Circle[] = movies.map((movie) => ({
      id: movie.id,
      fillValue: movie.vote_average * 10,
    }));
    setCircles(updatedCircles);
  }, [movies]);

  return (
    <div className='searchresults-container'>
      {/* <form className='form' onSubmit={handleSubmit}>
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
      </form> */}
      {moviesAreLoading ? <Loading /> :
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
              return <MovieCard movie={movie} circle={circle} key={movie.id} />;
            })}
        </InfiniteScroll>
      </div>
        }
      <Footer />
      
    </div>

  );
};

export default SearchResults;

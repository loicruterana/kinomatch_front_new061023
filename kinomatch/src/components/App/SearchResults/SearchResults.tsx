// ============ IMPORT BIBLIOTHEQUES ============

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import API_BASE_URL from '../../../utils/config';

// ============ IMPORT COMPOSANTS ============

import MovieCard from './MovieCard/MovieCard';
import Loading from '../Loading/Loading';

// ============ IMPORT SCSS ============

import './SearchResults.scss';
// import Footer from '../Footer/Footer';

// ============ INTERFACES ============
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
  id: number;
  fillValue: number;
}

//* ============ COMPOSANT ============

const SearchResults = () => {
  // ============ USESTATE ============
  // pour stocker les données de l'URL, données issues de SearchBar
  const [query, setQuery] = useState('');
  // pour stocker les données de l'API
  const [movies, setMovies] = useState<Movie[]>([]);
  // pour gérer le défilement infini, on commence à la page 1
  const [page, setPage] = useState(1);
  // pour gérer le défilement infini, on commence avec hasMore à true
  const [hasMore, setHasMore] = useState(true);
  // pour stocker les données des cercles
  const [circles, setCircles] = useState<Circle[]>([]);
  // pour stocker le nombre total de résultats
  const [totalResults, setTotalResults] = useState(0);

  // ============ UTILS ============
  // pour gérer l'affichage du loader
  const moviesAreLoading = movies.length === 0; // true
  // Utilisation de la navigation
  const navigate = useNavigate();
  // pour stocker la fin de URL de la page
  const queryString = window.location.search;

  // ============ FONCTION POUR INFINITE SCROLL ============

  // Chargement des données supplémentaires pour le défilement infini
  const loadMoreData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/search?typedName=${query}&page=${page + 1}`
      );
      const newMovies = await response.json();
      // mise à jour du state movies
      setMovies((prevMovies) => [...prevMovies, ...newMovies.results]);
      // mise à jour du state page
      setPage((prevPage) => prevPage + 1);
      // mise à jour du state hasMore
      setHasMore(newMovies.results.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  // ============ USEEFFECT POUR HANDLESUBMIT ============

  // useEffect pour gérer l'envoi des données du formulaire au back
  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/search${window.location.search}&page=1`
        );
        const data = response.data;
        if (data.results.length === 0) {
          navigate('/noresult');
          return;
        }
        // mise à jour du state movies
        setMovies(data.results);
        // mise à jour du state page
        setPage(1);
        // mise à jour du state hasMore
        setHasMore(true);
        // mise à jour du state totalResults
        setTotalResults(data.total_results);
        const searchParams = new URLSearchParams(window.location.search);
        const typedName = searchParams.get('typedName');
        // mise à jour du state query
        setQuery(typedName || '');
      } catch (error) {
        console.error(error);
      }
    };

    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);
  // ce useEffect s'exécute à chaque fois que queryString et donc que l'URL change

  // ============ USEEFFECT POUR DONNÉES ANIMATION ============

  // useEffect pour gérer les données de l'animation circle
  useEffect(() => {
    const updatedCircles: Circle[] = movies.map((movie) => ({
      id: movie.id,
      fillValue: movie.vote_average * 10,
    }));
    // on met à jour le state circles
    setCircles(updatedCircles);
  }, [movies]);
  // ce useEffect s'exécute à chaque fois que movies (data reçu de l'API) change

  // ============ JSX ============

  return (
    <main className='searchresults-container'>
      {/* affichage conditionnel du loader */}
      {moviesAreLoading ? (
        <Loading />
      ) : (
        <div className='searchresults-container-cardlist'>
          {/* composant infinite scroll de la bibliothèque react-infinite-scroll-component */}
          <InfiniteScroll
            dataLength={movies.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center' }}>End of results</p>}
            height={1080}
            scrollableTarget='scrollableDiv'
            scrollThreshold={1}
            // style={{ overflow: 'hidden', overflowY: 'auto' }}
          >
            <div className='searchresults-container-cardlist-queryresult'>
              {/* affichage du nombre de résultats pour la recherche effectuée */}
              <div className='searchresults-container-cardlist-queryresult-number'>
                {query}
              </div>
              <p> : {totalResults} résultats trouvés</p>
            </div>
            {movies
              .filter((movie) => movie.poster_path)
              // affichage des cercles
              // vérification de la présence du cercle dans le state circles
              .map((movie) => {
                const circle = circles.find((circle) => circle.id === movie.id);
                if (!circle) {
                  return null;
                }
                return (
                  // affichage des cartes
                  <MovieCard movie={movie} circle={circle} key={movie.id} />
                );
              })}
          </InfiniteScroll>
        </div>
      )}
      {/* <Footer /> */}
    </main>
  );
  //* ============ FERMETURE COMPOSANT ============
};

export default SearchResults;

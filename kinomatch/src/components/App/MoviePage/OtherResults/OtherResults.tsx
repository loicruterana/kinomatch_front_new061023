import { Key, useContext, useEffect, useState } from 'react';
import { CurrentMovieIdContext, CurrentMovieIdContextProps } from '../../../../contexts/CurrentMovieIdContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

import './OtherResults.scss';

// Interface OtherResultsModalProps permettant de typer les props du composant OtherResults
interface OtherResultsModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movieArray: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMovieArray: (movieArray: any) => void;
  showOtherResults: boolean;
  setShowOtherResults: (showOtherResults: boolean) => void;
}

interface PrevMovies {
  adult: string;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Symbol.iterator](): IterableIterator<[string, any]>;
}

// Function OtherResults permettant d'afficher les autres résultats de la recherche
function OtherResults(props: OtherResultsModalProps): JSX.Element {

  const { movieArray, setMovieArray, showOtherResults, setShowOtherResults } = props;

  // UseContext "addMovieData" permettant d'ajouter les données du film sélectionné dans le contexte
  const { addMovieData } = useContext(CurrentMovieIdContext) as CurrentMovieIdContextProps;

  // UseState "page" permettant de gérer la pagination
  const [page, setPage] = useState(1);

  // UseState "hasMore" permettant de gérer la pagination
  const [hasMore, setHasMore] = useState(true);

  const [hauteurEcran, setHauteurEcran] = useState(window.innerHeight);

  // Fonction loadMoreData permettant de charger plus de films
  const loadMoreData = async () => {
    try {
      const response = await axios.get(
        `https://deploy-back-kinomatch.herokuapp.com/randomFilms${window.location.search}&randomPage=${page}`
      );

      const newMovies = response.data;
      setMovieArray((prevMovies: PrevMovies[]) => {
        const updatedMovies: PrevMovies[] = [...prevMovies, ...newMovies.results];
        return updatedMovies;
      });

      setPage((prevPage) => prevPage + 1);
      setHasMore(newMovies.results.length > 0);
    } catch (error) {
      console.error(error);
    }
  };


useEffect(() => {
  function handleResize() {
  setHauteurEcran(window.innerHeight);
  }
  
  window.addEventListener('resize',handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, [hauteurEcran]);

  // Function handleClick permettant de gérer le clic sur un film de la liste des autres résultats
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    addMovieData(id || '');
    setShowOtherResults(!showOtherResults);

    // Condition permettant de remonter en haut de la page si l'utilisateur a scrollé
    if (window.pageYOffset > 100) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <aside className='otherResults-container'>
      <section className='otherResults-container--pellicule'>
        {/* Configuration de la pagination pour le InfinitScroll */}
        <InfiniteScroll
          dataLength={movieArray.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}>End of results</p>}
          height={hauteurEcran}
          scrollableTarget="scrollableDiv"
          scrollThreshold={1}
        >
          <div className='otherResults-container--scrollList'>
            {/* Pour chaque élément du tableau de films, afficher un bouton avec l'affiche et le titre */}
            {movieArray?.map((movieElem: { title: string; poster_path: string; id: Key }) => (
              <button
                key={movieElem.id}
                data-id={movieElem.id}
                onClick={handleClick}
              >
                {/* Afficher l'affiche du film s'il y en a une, sinon une affiche par défaut */}
                <img
                  className='otherResults-container--scrollList---images'
                  src={movieElem.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movieElem.poster_path}` : '/images/SamplePoster1.png'}
                  alt={`Affiche du film ${movieElem.title}`}
                />
                {/* Afficher le titre du film s'il y en a une, sinon rien */}
                {
                  movieElem.poster_path === null ?
                    <p className='otherResults-container--scrollList---movieTitle'>{movieElem.title}</p>
                    : null
                }
              </button>
            ))}
          </div>
        </InfiniteScroll>

      </section>
    </aside>
  )
}

export default OtherResults;

import React from 'react';
import { useSpring, animated } from 'react-spring';


interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
    vote_count: number;
  };
  circle: {
    id: number;
    fillValue: number;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, circle
  // , movies, setMovies, page, setPage 
}) => {

  // const [hasMore, setHasMore] = useState(true);

  // const loadMoreData = async () => {
  //   try {
  //     console.log("loadMoreData")
  //     const response = await fetch(
  //       `https://deploy-back-kinomatch.herokuapp.com/search?typedName=${query}&page=${page + 1}`
  //     );
  //     const newMovies = await response.json();
  //     setMovies((prevMovies) => [...prevMovies, ...newMovies.results]);
  //     setPage((prevPage) => prevPage + 1);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  {
    /* CONVERSION DATE */
  }

  function formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month
      }/${year}`;
  }
  const circleAnimation = useSpring({
    from: { strokeDashoffset: 326.56 },
    to: { strokeDashoffset: 326.56 - (326.56 * circle.fillValue) / 100 },
  });

  return (
    
    <div className='searchresults-container-cardlist-card'>
      <div className='searchresults-container-cardlist-card__imagecontainer'> 
      <img
        className='searchresults-container-cardlist-card__imagecontainer__image'
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` : '/images/testsample.jpg'}
        alt={movie.title + ' affiche'}
      />
      </div>
      <section className='searchresults-container-cardlist-card__infos'>
        <div className='searchresults-container-cardlist-card__infos__content'>
          <div className='searchresults-container-cardlist-card__infos__titlereleasecircle'>
          <div className='searchresults-container-cardlist-card__infos__titlereleasecircle__titlerelease'>

          <h3 className='searchresults-container-cardlist-card__infos__title'>{movie.title}</h3>
            <div className='searchresults-container-cardlist-card__infos__release'>
              Date de sortie :               {movie.release_date
                ? formatDate(movie.release_date)
                : 'Non précisée'}
            </div>
            </div>
          <div className='circle-big'>
            <div className='text'>
              {Math.floor(movie.vote_average * 10) === movie.vote_average * 10
                ? movie.vote_average * 10
                : (movie.vote_average * 10).toFixed(1)}
              %<div className='small'>{movie.vote_count} votes </div>
            </div>
            <svg>
              <circle className='bg' cx='57' cy='57' r='52' />
              <animated.circle
                className='progress'
                cx='57'
                cy='57'
                r='52'
                style={circleAnimation}
              />
            </svg>
          </div>
          </div>
          <p className='searchresults-container-cardlist-card__infos__desc'>{movie.overview}</p>
        </div>
      </section>
      <hr/>

    </div>

  );
};

export default MovieCard;

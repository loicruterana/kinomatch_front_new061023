import { Key, useContext, useEffect } from 'react';
import { CurrentMovieIdContext } from '../../../../contexts/CurrentMovieIdContext';


import './OtherResults.scss';

interface OtherResultsModalProps {
  movieArray: any | null;
  showOtherResults: boolean;
  setShowOtherResults: (showOtherResults: boolean) => void;
}

function OtherResults(props: OtherResultsModalProps) {
  const { movieArray, showOtherResults, setShowOtherResults } = props;

  const { currentMovieId, setCurrentMovieId, addMovieData } = useContext(CurrentMovieIdContext);

  // const otherResults = movieArray.movieID.filter((movie) => movie.id !== currentMovieId);
  // console.log(currentMovieId);
  // console.log(otherResults);

  // console.log(movieID);
  // console.log(movieID.randomID);
  // console.log(randomID);


  const handleClick = (event) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    addMovieData(id);
    setShowOtherResults(!showOtherResults);
    if (window.pageYOffset > 100) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }


  return (
    <aside className='otherResults-container'>
      {/* <h3 className='otherResults-container--title'>Autres résultats</h3> */}
      <div className='otherResults-container--pellicule'>
        <div className='otherResults-container--scrollList'>
          {movieArray.map((movieElem: { title: any; poster_path: any; id: Key }) => (

            <a
              key={movieElem.id}
              data-id={movieElem.id}
              onClick={handleClick}>
              <img
                className='otherResults-container--scrollList---images'
                src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movieElem.poster_path}`}
                alt={`Affiche du film ${movieElem.title}`}
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default OtherResults;


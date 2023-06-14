import { Key, useContext } from 'react';
import { CurrentMovieIdContext, CurrentMovieIdContextProps } from '../../../../contexts/CurrentMovieIdContext';

import './OtherResults.scss';

interface OtherResultsModalProps {
  movieArray: any[] | null;
  showOtherResults: boolean;
  setShowOtherResults: (showOtherResults: boolean) => void;
}

function OtherResults(props: OtherResultsModalProps): JSX.Element {
  const { movieArray, showOtherResults, setShowOtherResults } = props;
  const { addMovieData } = useContext(CurrentMovieIdContext) as CurrentMovieIdContextProps;

  const handleClick = (event: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    addMovieData(id || '');
    setShowOtherResults(!showOtherResults);
    if (window.pageYOffset > 100) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const movieArrayReload = () => {
    window.location.reload();
  }

  return (
    <aside className='otherResults-container'>
      <button
        className='otherResults-container--OtherResultsBtn'
        type='button'
        onClick={movieArrayReload} >Voir d'autres résultats
      </button>
      <div className='otherResults-container--pellicule'>
        <div className='otherResults-container--scrollList'>
          {movieArray?.map((movieElem: { title: string; poster_path: string; id: Key }) => (
            <button
              key={movieElem.id}
              data-id={movieElem.id}
              onClick={handleClick}
            >
              <img
                className='otherResults-container--scrollList---images'
                src={movieElem.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movieElem.poster_path}` : '/images/SamplePoster1.png'}
                alt={`Affiche du film ${movieElem.title}`}
              />
              {
                movieElem.poster_path === null ?
                  <p className='otherResults-container--scrollList---movieTitle'>{movieElem.title}</p>
                  : null
              }
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default OtherResults;

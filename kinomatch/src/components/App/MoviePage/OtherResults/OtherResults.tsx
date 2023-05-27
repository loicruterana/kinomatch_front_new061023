import { Key, useState, useContext } from 'react';
import './OtherResults.scss';
import { CurrentMovieIdContext } from '../../../../contexts/CurrentMovieIdContext';

function OtherResults(movieID, randomID, selectedId, setSelectedId) {

  const { currentMovieId, setCurrentMovieId, addMovieData } = useContext(CurrentMovieIdContext);

  const otherResults = movieID.movieID.filter((movie) => movie.id !== currentMovieId);
  console.log(currentMovieId);
  console.log(otherResults);

  // console.log(movieID);
  // console.log(movieID.randomID);
  // console.log(randomID);


  const handleClick = (event) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    // console.log(`Ligne 13 ${id}`)
    addMovieData(id);

  }

  return (
    <aside className='otherResults-container'>
      <div className='otherResults-container--scrollList'>
        <h3 className='otherResults-container--scrollList---title'>Autres résulats</h3>
        {otherResults.map((movieElem: { title: any; poster_path: any; id: Key }) => (

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
    </aside>
  )
}

export default OtherResults;


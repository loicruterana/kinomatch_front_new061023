import { Key, useState } from 'react';
import './OtherResults.scss';

function OtherResults(movieID, randomID) {
  console.log(movieID);
  console.log(movieID.randomID);
  console.log(randomID);


  const [selectedId, setSelectedId] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    setSelectedId(id);

  }
  console.log(selectedId);

  return (
    <aside className='otherResults-container'>
      <div className='otherResults-container--scrollList'>
        <h3 className='otherResults-container--scrollList---title'>Autres résultats</h3>
        {movieID.movieID.map((movieElem: { title: any; poster_path: any; id: Key }) => (

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


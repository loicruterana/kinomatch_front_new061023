import { Key, useContext } from 'react';
import { CurrentMovieIdContext, CurrentMovieIdContextProps } from '../../../../contexts/CurrentMovieIdContext';

import './OtherResults.scss';

/* Interface OtherResultsModalProps permettant de typer les props du composant OtherResults */
interface OtherResultsModalProps {
  movieArray: any[] | null;
  showOtherResults: boolean;
  setShowOtherResults: (showOtherResults: boolean) => void;
}

/* Function OtherResults permettant d'afficher les autres résultats de la recherche */
function OtherResults(props: OtherResultsModalProps): JSX.Element {
  const { movieArray, showOtherResults, setShowOtherResults } = props;

  /* Variable addMovieData permettant d'ajouter les données du film sélectionné dans le contexte */
  const { addMovieData } = useContext(CurrentMovieIdContext) as CurrentMovieIdContextProps;

  /* Function handleClick permettant de gérer le clic sur un film de la liste des autres résultats */
  const handleClick = (event: { preventDefault: () => void; currentTarget: { getAttribute: (arg0: string) => any; }; }) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    addMovieData(id || '');
    setShowOtherResults(!showOtherResults);

    /* Condition permettant de remonter en haut de la page si l'utilisateur a scrollé */
    if (window.pageYOffset > 100) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <aside className='otherResults-container'>
      <div className='otherResults-container--pellicule'>
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
      </div>
    </aside>
  )
}

export default OtherResults;

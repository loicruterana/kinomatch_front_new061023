import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import axios from 'axios';
import './AddButton.scss';

function AddButton(movieId: { movie: string; }) {
  {
    /* ========================== USESTATE =============================== */
  }
  const {
    userData,
    isLoggedIn,
    addBookmarked,
    deleteBookmarked,
    addToWatch,
    deleteToWatch,
    userDataToWatch,
    addWatched,
    deleteWatched,
    userDataWatched,
  } = useContext(AuthContext);
  // Coeur
  const [heartIsClicked, setHeartIsClicked] = useState(false);
  // Favoris
  const [bookmartIsClicked, setBookmarkIsClicked] = useState(false);
  // Check
  const [checkIsClicked, setCheckIsClicked] = useState(false);

  {
    /* ============================ HANDLERS ============================= */
  }

  // Coeur
    const handleHeartClick = () => {
  /* Met à jour l'état de "HeartIsClicked" en inversant sa valeur actuelle. */

      setHeartIsClicked(!heartIsClicked);
    
      if (!heartIsClicked) {
        addBookmarked(movieId);
        addWatched(movieId);
        setCheckIsClicked(true);
      } else {

      /* Si le coeur n'est pas remplit/clické alors ajoute l'id du film au bookmark sinon il le supprime */

        deleteBookmarked(movieId);
      }
    };
    

  // Favoris
  const handleBookMarkClick = () => {
    {
      /* Met à jour l'état de "BookmarkIsClicked" en inversant sa valeur actuelle. */
    }
    setBookmarkIsClicked(!bookmartIsClicked);

    {
      /* Si le marque page n'est pas remplit/clické alors ajoute l'id du film "à voir" sinon il le supprime */
    }
    bookmartIsClicked === false ? addToWatch(movieId) : deleteToWatch(movieId);
  };

  // Check
  const handleCheckClick = () => {
    setCheckIsClicked(!checkIsClicked);
  
    if (!checkIsClicked) {
      addWatched(movieId);
    } else {
      deleteWatched(movieId);
      deleteBookmarked(movieId);
      setHeartIsClicked(false);
    }
  };
  

  

  {
    /* ======================================= COEUR ====================================================== */
  }

  {
    /* Fonction qui récupère le tableau d'ids des films favoris du user et qui recherche si le film est déjà dans les favoris afin de colorer le bouton coeur en rouge */
  }
  useEffect(() => {
    const getUserBookmarked = () => {
      axios
        .get(
          `https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?userID=${userData.id}`
        )
        .then(function (response) {
          const responseData = response.data;
          const filmIds = responseData.map((item: { film_id: string; }) => item.film_id);

          if (filmIds.includes(movieId.movie.toString())) {
            setHeartIsClicked(true);
          } else {
            setHeartIsClicked(false);
          }
 
        });
    };
    {
      /* Condition qui éxecute getUserBookmarked uniquement si un user est connecté */
    }
    {
      isLoggedIn && getUserBookmarked();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  {
    /* ======================================= TO WATCH ====================================================== */
  }
  {
    /*  */
  }
  useEffect(() => {
    const getUserToWatch = () => {
      axios
        .get(
          `https://deploy-back-kinomatch.herokuapp.com/toWatchMovies?userID=${userDataToWatch.id}`
        )
        .then(function (response) {
          const responseData = response.data;
          const filmIds = responseData.map((item: { film_id: string}) => item.film_id);
          if (filmIds.includes(movieId.movie.toString())) {
            setBookmarkIsClicked(true);
          } else {
            setBookmarkIsClicked(false);
          }
          console.log(bookmartIsClicked);
        });
    };
    {
      /* Condition qui éxecute "getUserToWatch" uniquement si un user est connecté */
    }
    {
      isLoggedIn && getUserToWatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  {
    /* ======================================= WATCHED ====================================================== */
  }

  {
    /*  */
  }
  useEffect(() => {
    const getUserWatched = () => {
      axios
        .get(
          `https://deploy-back-kinomatch.herokuapp.com/watchedMovies?userID=${userDataWatched.id}`
        )
        .then(function (response) {
          const responseData = response.data;
          const filmIds = responseData.map((item: { film_id: string; }) => item.film_id);


          if (filmIds.includes(movieId.movie.toString())) {
            setCheckIsClicked(true);
          } else {
            setCheckIsClicked(false);
          }
        });
    };

    {
      /* Condition qui éxecute "getUserWatched" uniquement si un user est connecté */
    }
    {
      isLoggedIn && getUserWatched();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  {
    /* =================================================================== */
  }
  return (
    <div className='movieFound__essentiel-btn--container'>
      <button
        className='movieFound__essentiel-btn--addToLike'
        type='submit'
        onClick={handleHeartClick}
      >
        <i
          className={`fa-${heartIsClicked ? 'solid' : 'regular'} fa-heart ${
            heartIsClicked ? 'heartClicked' : ''
          }`}
          style={{ color: heartIsClicked ? '#D42121' : '' }}
        ></i>
      </button>
      <button
        className='movieFound__essentiel-btn--addToFavorites'
        type='submit'
        onClick={handleBookMarkClick}
      >
        <i
          className={`fa-sharp fa-${
            bookmartIsClicked ? 'solid' : 'regular'
          } fa-bookmark ${bookmartIsClicked ? 'bookMarkClicked' : ''}`}
          style={{ color: bookmartIsClicked ? '#FFF3B0' : '' }}
        ></i>
      </button>
      <button
        className='movieFound__essentiel-btn--addToViewed'
        type='submit'
        onClick={handleCheckClick}
      >
        <i
          className={`fa-sharp fa-solid fa-check ${
            checkIsClicked ? 'checkClicked' : ''
          }`}
          style={{ color: checkIsClicked ? '#7deb00' : '' }}
        ></i>
      </button>
    </div>
  );
}

export default AddButton;

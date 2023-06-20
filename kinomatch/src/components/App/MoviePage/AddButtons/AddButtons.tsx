import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import axios from 'axios';
import './AddButton.scss';

/* Fonction AddButton permettant d'afficher les boutons d'ajout aux listes */
function AddButton(movieId: { movie: string; }) {

  // ========================== USECONTEXT =============================== 

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

  // ========================== USESTATE =============================== 

  // Coeur
  const [heartIsClicked, setHeartIsClicked] = useState(false);
  //Bookmarked
  const [bookmartIsClicked, setBookmarkIsClicked] = useState(false);
  // Check
  const [checkIsClicked, setCheckIsClicked] = useState(false);


  // ============================ HANDLERS ============================= 


  // ============= COEUR =================== 

  // Fonction handleHeartClick permettant de gérer le clic sur le coeur
  const handleHeartClick = () => {

    // Met à jour l'état de "HeartIsClicked" en inversant sa valeur actuelle.
    setHeartIsClicked(!heartIsClicked);

    // Si le coeur n'est pas remplit/clické alors ajoute l'id du film au favoris sinon il le supprime
    if (!heartIsClicked) {
      addBookmarked(movieId);
      addWatched(movieId);
      setCheckIsClicked(true);
    } else {
      deleteBookmarked(movieId);
    }
  };

  // ============= Bookmarked ==================

  // Fonction handleBookMarkClick permettant de gérer le clic sur le marque page
  const handleBookMarkClick = () => {

    // Met à jour l'état de "BookmarkIsClicked" en inversant sa valeur actuelle.
    setBookmarkIsClicked(!bookmartIsClicked);

    // Si le marque page n'est pas remplit/clické alors ajoute l'id du film "à voir" sinon il le supprime
    bookmartIsClicked === false ? addToWatch(movieId) : deleteToWatch(movieId);
  };

  // ============= CHECKED =================== 

  // Fonction handleCheckClick permettant de gérer le clic sur le check
  const handleCheckClick = () => {
    setCheckIsClicked(!checkIsClicked);

    // Si le check n'est pas remplit/clické alors ajoute l'id du film "vu" sinon il le supprime de "vu", de "bookmarked" et passe "HeartIsClicked" à false
    if (!checkIsClicked) {
      addWatched(movieId);
    } else {
      deleteWatched(movieId);
      deleteBookmarked(movieId);
      setHeartIsClicked(false);
    }
  };


  // ======================================= COEUR ====================================================== 

  // Fonction qui récupère le tableau d'ids des films favoris du user et qui recherche si le film est déjà dans les favoris afin de colorer le bouton coeur en rouge
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
    // Condition qui éxecute getUserBookmarked uniquement si un user est connecté
    {
      isLoggedIn && getUserBookmarked();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======================================= TO WATCH ======================================================

  // Fonction qui récupère le tableau d'ids des films "à voir" du user et qui recherche si le film est déjà dans les "à voir" afin de colorer le bouton marque page en jaune
  useEffect(() => {
    const getUserToWatch = () => {
      axios
        .get(
          `https://deploy-back-kinomatch.herokuapp.com/toWatchMovies?userID=${userDataToWatch.id}`
        )
        .then(function (response) {
          const responseData = response.data;
          const filmIds = responseData.map((item: { film_id: string }) => item.film_id);
          if (filmIds.includes(movieId.movie.toString())) {
            setBookmarkIsClicked(true);
          } else {
            setBookmarkIsClicked(false);
          }
          console.log(bookmartIsClicked);
        });
    };
    // Condition qui éxecute "getUserToWatch" uniquement si un user est connecté
    {
      isLoggedIn && getUserToWatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // ======================================= WATCHED ======================================================

  // Fonction qui récupère le tableau d'ids des films "vu" du user et qui recherche si le film est déjà dans les "vu" afin de colorer le bouton check en vert
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

    // Condition qui éxecute "getUserWatched" uniquement si un user est connecté
    {
      isLoggedIn && getUserWatched();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===================================================================

  return (
    <div className='movieFound__essentiel-btn--container'>
      <button
        className='movieFound__essentiel-btn--addToLike'
        type='submit'
        onClick={handleHeartClick}
      >
        {/* Si le coeur est cliqué alors affiche le coeur plein sinon affiche le coeur vide */}
        <i
          className={`fa-${heartIsClicked ? 'solid' : 'regular'} fa-heart ${heartIsClicked ? 'heartClicked' : ''
            }`}
          style={{ color: heartIsClicked ? '#D42121' : '' }}
        ></i>
      </button>
      {/* Si le coeur est cliqué alors éxécute la fonction handleBookmarkedClick */}
      <button
        className='movieFound__essentiel-btn--addToFavorites'
        type='submit'
        onClick={handleBookMarkClick}
      >
        {/* Si le marque page est cliqué alors affiche le marque page plein sinon affiche le marque page vide */}
        <i
          className={`fa-sharp fa-${bookmartIsClicked ? 'solid' : 'regular'
            } fa-bookmark ${bookmartIsClicked ? 'bookMarkClicked' : ''}`}
          style={{ color: bookmartIsClicked ? '#FFF3B0' : '' }}
        ></i>
      </button>
      {/* Si le coeur est cliqué alors éxécute la fonction handleCheckClick */}
      <button
        className='movieFound__essentiel-btn--addToViewed'
        type='submit'
        onClick={handleCheckClick}
      >
        {/* Si le check est cliqué alors affiche le check plein sinon affiche le check vide */}
        <i
          className={`fa-sharp fa-solid fa-check ${checkIsClicked ? 'checkClicked' : ''
            }`}
          style={{ color: checkIsClicked ? '#7deb00' : '' }}
        ></i>
      </button>
    </div>
  );
}

export default AddButton;

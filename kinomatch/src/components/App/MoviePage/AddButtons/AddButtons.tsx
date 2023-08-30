import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import axios from 'axios';
import './AddButton.scss';
import API_BASE_URL from '../../../../utils/config';
import { to } from 'react-spring';

/* Fonction AddButton permettant d'afficher les boutons d'ajout aux listes */
function AddButton(movieId: { movie: string }) {
  // ========================== USECONTEXT ===============================

  const {
    userData,
    isLoggedIn,
    addFavorites,
    deleteFavorites,
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
  // ToWatch
  const [toWatchIsClicked, setToWatchIsClicked] = useState(false);
  // Watched
  const [watchedIsClicked, setWatchedIsClicked] = useState(false);
  // Bulle Ajouter aux favoris
  const [showHeartBubble, setShowHeartBubble] = useState(false);
  // Bulle Ajouter à voir
  const [showToWatchBubble, setShowToWatchBubble] = useState(false);
  // Bulle Ajouter vu
  const [showWatchedBubble, setShowWatchedBubble] = useState(false);

  // ============================ HANDLERS =============================

  // ============= COEUR ===================

  const handleHeartClick = () => {
    setHeartIsClicked(!heartIsClicked);

    if (!heartIsClicked) {
      addFavorites(movieId);
      addWatched(movieId);
      setWatchedIsClicked(true);
      setShowHeartBubble(true);
      setTimeout(() => {
        setShowHeartBubble(false)
      }, 2000);
    } else {
      deleteFavorites(movieId);
      setShowHeartBubble(true);
      setTimeout(() => {
        setShowHeartBubble(false)
      }, 2000);
    }
  };


  const handleToWatchClick = () => {
    setToWatchIsClicked(!toWatchIsClicked);

    if (toWatchIsClicked === false) {
      addToWatch(movieId);
      setShowToWatchBubble(true);
      setTimeout(() => {
        setShowToWatchBubble(false)
      }, 2000);
    } else {
      deleteToWatch(movieId);
      setShowToWatchBubble(true);
      setTimeout(() => {
        setShowToWatchBubble(false)
      }, 2000);
    }
  };


  const handleWatchedClick = () => {
    setWatchedIsClicked(!watchedIsClicked);

    if (!watchedIsClicked) {
      addWatched(movieId);
      setShowWatchedBubble(true);
      setTimeout(() => {
        setShowWatchedBubble(false)
      }, 2000);
    } else {
      deleteWatched(movieId);
      deleteFavorites(movieId);
      setHeartIsClicked(false);
      setShowWatchedBubble(true);
      setTimeout(() => {
        setShowWatchedBubble(false)
      }
        , 2000);
    }
  };

  // ======================================= COEUR ======================================================

  // Fonction qui récupère le tableau d'ids des films favoris du user et qui recherche si le film est déjà dans les favoris afin de colorer le bouton coeur en rouge
  useEffect(() => {
    const getUserFavorites = () => {
      axios
        .get(`${API_BASE_URL}/favoritesMovies?userID=${userData.id}`)
        .then(function (response) {
          const responseData = response.data;
          console.log(responseData);
          const filmIds = responseData.favoritesListTitles.map(
            (item: { film_id: string }) => item.film_id
          );

          if (filmIds.includes(movieId.movie.toString())) {
            setHeartIsClicked(true);
          } else {
            setHeartIsClicked(false);
          }
        });
    };
    // Condition qui éxecute getUserFavorites uniquement si un user est connecté
    {
      isLoggedIn && getUserFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======================================= TO WATCH ======================================================

  // Fonction qui récupère le tableau d'ids des films "à voir" du user et qui recherche si le film est déjà dans les "à voir" afin de colorer le bouton marque page en jaune
  useEffect(() => {
    const getUserToWatch = () => {
      axios
        .get(`${API_BASE_URL}/toWatchMovies?userID=${userDataToWatch.id}`)
        .then(function (response) {
          const responseData = response.data;
          console.log(responseData);
          const filmIds = responseData.toWatchListTitles.map(
            (item: { film_id: string }) => item.film_id
          );
          if (filmIds.includes(movieId.movie.toString())) {
            setToWatchIsClicked(true);
          } else {
            setToWatchIsClicked(false);
          }
          console.log(toWatchIsClicked);
        });
    };
    // Condition qui éxecute "getUserToWatch" uniquement si un user est connecté
    {
      isLoggedIn && getUserToWatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ======================================= WATCHED ======================================================

  // Fonction qui récupère le tableau d'ids des films "vu" du user et qui recherche si le film est déjà dans les "vu" afin de colorer le bouton Watched en vert
  useEffect(() => {
    const getUserWatched = () => {
      axios
        .get(`${API_BASE_URL}/watchedMovies?userID=${userDataWatched.id}`)
        .then(function (response) {
          const responseData = response.data;
          console.log(responseData);
          const filmIds = responseData.watchedListTitles.map(
            (item: { film_id: string }) => item.film_id
          );

          if (filmIds.includes(movieId.movie.toString())) {
            setWatchedIsClicked(true);
          } else {
            setWatchedIsClicked(false);
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
      {/* Condition qui affiche la bulle "film ajouté aux favoris"ou "Film supprimé des favoris"  si le coeur est cliqué */}
      {showHeartBubble && (
        <div className='movieFound__essentiel-btn--bubble'>
          {heartIsClicked === true ? (
            <p>Film ajouté aux favoris</p>) : (<p>Film supprimé des favoris</p>)}
        </div>
      )}
      {/* Condition qui affiche la bulle "film ajouté aux "à voir" ou "Film supprimé des "à voir"  si le marque page est cliqué */}
      {showToWatchBubble && (
        <div className='movieFound__essentiel-btn--bubble'>
          {toWatchIsClicked === true ? (
            <p>Film ajouté aux films à voir ou à revoir</p>) : (<p>Film supprimé des films à voir ou revoir</p>)}
        </div>
      )}
      {/* Condition qui affiche la bulle "film ajouté aux "vu" ou "Film supprimé des "vu"  si le bouton Watched est cliqué */}
      {showWatchedBubble && (
        <div className='movieFound__essentiel-btn--bubble'>
          {watchedIsClicked === true ? (
            <p>Film ajouté aux films vus</p>) : (<p>Film supprimé des films vus</p>)}
        </div>
      )}

      <button
        className='movieFound__essentiel-btn--addToLike'
        type='submit'
        onClick={handleHeartClick}
        aria-label={`J'aime le film${heartIsClicked ? ' : Déjà aimé' : ''}`}
      >
        {/* Si le coeur est cliqué alors affiche le coeur plein sinon affiche le coeur vide */}
        <i
          className={`fa-${heartIsClicked ? 'solid' : 'regular'} fa-heart ${heartIsClicked ? 'heartClicked' : ''
            }`}
          style={{ color: heartIsClicked ? '#D42121' : '' }}
        ></i>
      </button>

      {/* A REVOIR */}
      {/* Si le coeur est cliqué alors éxécute la fonction handleToWatchClick */}
      <button
        className='movieFound__essentiel-btn--addToWatch'
        type='submit'
        onClick={handleToWatchClick}
        aria-label={`Ajouter aux favoris${toWatchIsClicked ? ' : Déjà ajouté aux favoris' : ''
          }`}
      >
        {/* Si le marque page est cliqué alors affiche le marque page plein sinon affiche le marque page vide */}
        <i
          className={`fa-sharp fa-${toWatchIsClicked ? 'solid' : 'regular'
            } fa-bookmark ${toWatchIsClicked ? 'bookMarkClicked' : ''}`}
          style={{ color: toWatchIsClicked ? '#FFF3B0' : '' }}
        ></i>
      </button>

      {/* Si le coeur est cliqué alors éxécute la fonction handleWatchedClick */}
      <button
        className='movieFound__essentiel-btn--addToViewed'
        type='submit'
        onClick={handleWatchedClick}
        aria-label={`Marquer comme vu${watchedIsClicked ? ' : Déjà vu' : ''}`}
      >
        {/* Si le Watched est cliqué alors affiche le Watched plein sinon affiche le Watched vide */}
        <i
          className={`fa-sharp fa-solid fa-check ${watchedIsClicked ? 'checkClicked' : ''
            }`}
          style={{ color: watchedIsClicked ? '#7deb00' : '' }}
        ></i>
      </button>
    </div>
  );
}

export default AddButton;

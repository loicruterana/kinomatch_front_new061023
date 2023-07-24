import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import axios from 'axios';
import './AddButton.scss';
import API_BASE_URL from '../../../../utils/config';

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

  // ============================ HANDLERS =============================

  // ============= COEUR ===================

  // Fonction handleHeartClick permettant de gérer le clic sur le coeur
  const handleHeartClick = () => {
    // Met à jour l'état de "HeartIsClicked" en inversant sa valeur actuelle.
    setHeartIsClicked(!heartIsClicked);

    // Si le coeur n'est pas remplit/clické alors ajoute l'id du film au favoris sinon il le supprime
    if (!heartIsClicked) {
      addFavorites(movieId);
      addWatched(movieId);
      setWatchedIsClicked(true);
    } else {
      deleteFavorites(movieId);
    }
  };

  // ============= TOWATCH ==================

  // Fonction handleToWatchClick permettant de gérer le clic sur le marque page
  const handleToWatchClick = () => {
    // Met à jour l'état de "toWatchIsClicked" en inversant sa valeur actuelle.
    setToWatchIsClicked(!toWatchIsClicked);

    // Si le marque page n'est pas remplit/clické alors ajoute l'id du film "à voir" sinon il le supprime
    toWatchIsClicked === false ? addToWatch(movieId) : deleteToWatch(movieId);
  };

  // ============= WATCHED ===================

  // Fonction handleWatchedClick permettant de gérer le clic sur Watched
  const handleWatchedClick = () => {
    setWatchedIsClicked(!watchedIsClicked);

    // Si le Watched n'est pas remplit/clické alors ajoute l'id du film "vu" sinon il le supprime de "vu", de "toWatch" et passe "HeartIsClicked" à false
    if (!watchedIsClicked) {
      addWatched(movieId);
    } else {
      deleteWatched(movieId);
      deleteFavorites(movieId);
      setHeartIsClicked(false);
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
          const filmIds = responseData.map(
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
          const filmIds = responseData.map(
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
          const filmIds = responseData.map(
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
      <button
        className='movieFound__essentiel-btn--addToLike'
        type='submit'
        onClick={handleHeartClick}
        aria-label={`J'aime le film${heartIsClicked ? ' : Déjà aimé' : ''}`}
      >
        {/* Si le coeur est cliqué alors affiche le coeur plein sinon affiche le coeur vide */}
        <i
          className={`fa-${heartIsClicked ? 'solid' : 'regular'} fa-heart ${
            heartIsClicked ? 'heartClicked' : ''
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
        aria-label={`Ajouter aux favoris${
          toWatchIsClicked ? ' : Déjà ajouté aux favoris' : ''
        }`}
      >
        {/* Si le marque page est cliqué alors affiche le marque page plein sinon affiche le marque page vide */}
        <i
          className={`fa-sharp fa-${
            toWatchIsClicked ? 'solid' : 'regular'
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
          className={`fa-sharp fa-solid fa-check ${
            watchedIsClicked ? 'checkClicked' : ''
          }`}
          style={{ color: watchedIsClicked ? '#7deb00' : '' }}
        ></i>
      </button>
    </div>
  );
}

export default AddButton;

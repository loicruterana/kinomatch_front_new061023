import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import axios from 'axios';
import './AddButton.scss';
import API_BASE_URL from '../../../../utils/config';
import SendMovieModale from '../SendMovieModale/SendMovieModale';

// import { to } from 'react-spring';
/* Fonction AddButton permettant d'afficher les boutons d'ajout aux listes */
function AddButton(movieId: { movie: string }) {
  // ========================== USECONTEXT ===============================
  const {
    userData,
    // isLoggedIn,
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
  // Send Movie
  const [openSendMovieModale, setOpenSendMovieModale] = useState(false);

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
        setShowHeartBubble(false);
      }, 2000);
    } else {
      deleteFavorites(movieId);
      setShowHeartBubble(true);
      setTimeout(() => {
        setShowHeartBubble(false);
      }, 2000);
    }
  };
  const handleToWatchClick = () => {
    setToWatchIsClicked(!toWatchIsClicked);
    if (toWatchIsClicked === false) {
      addToWatch(movieId);
      setShowToWatchBubble(true);
      setTimeout(() => {
        setShowToWatchBubble(false);
      }, 2000);
    } else {
      deleteToWatch(movieId);
      setShowToWatchBubble(true);
      setTimeout(() => {
        setShowToWatchBubble(false);
      }, 2000);
    }
  };
  const handleWatchedClick = () => {
    setWatchedIsClicked(!watchedIsClicked);
    if (!watchedIsClicked) {
      addWatched(movieId);
      setShowWatchedBubble(true);
      setTimeout(() => {
        setShowWatchedBubble(false);
      }, 2000);
    } else {
      deleteWatched(movieId);
      deleteFavorites(movieId);
      setHeartIsClicked(false);
      setShowWatchedBubble(true);
      setTimeout(() => {
        setShowWatchedBubble(false);
      }, 2000);
    }
  };
  const handleSendMovie = () => {
    console.log('sendMovie');
    setOpenSendMovieModale(!openSendMovieModale);
  };

  // Ici on créer une fonction qui va renvoyer l'utilisateur sur la page de connexion lorsqu'il clique sur le coeur et qu'il n'est pas connecté
  const handleHeartRedirect = () => {
    window.location.href = '/login';
  };

  // ======================================= COEUR ======================================================
  // Fonction qui récupère le tableau d'ids des films favoris du user et qui recherche si le film est déjà dans les favoris afin de colorer le bouton coeur en rouge
  useEffect(() => {
    const getUserFavorites = () => {
      // Si l'utilisateur n'est pas connecté, alors on ne fait rien
      if (userData.id === '') {
        return;
      } else {
        axios
          .get(`${API_BASE_URL}/favoritesMovies?userID=${userData.id}`)
          .then(function (response) {
            const responseData = response.data;
            const filmIds = responseData.favoritesListTitles.map(
              (item: { film_id: string }) => item.film_id
            );
            if (filmIds.includes(movieId.movie.toString())) {
              setHeartIsClicked(true);
            } else {
              setHeartIsClicked(false);
            }
          });
      }
    };
    // Condition qui éxecute getUserFavorites uniquement si un user est connecté
    {
      userData && getUserFavorites();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ======================================= TO WATCH ======================================================
  // Fonction qui récupère le tableau d'ids des films "à voir" du user et qui recherche si le film est déjà dans les "à voir" afin de colorer le bouton marque page en jaune
  useEffect(() => {
    const getUserToWatch = () => {
      if (userData.id === '') {
        return;
      } else {
        axios
          .get(`${API_BASE_URL}/toWatchMovies?userID=${userDataToWatch.id}`)
          .then(function (response) {
            const responseData = response.data;
            const filmIds = responseData.toWatchListTitles.map(
              (item: { film_id: string }) => item.film_id
            );
            if (filmIds.includes(movieId.movie.toString())) {
              setToWatchIsClicked(true);
            } else {
              setToWatchIsClicked(false);
            }
          });
      }
    };
    // Condition qui éxecute "getUserToWatch" uniquement si un user est connecté
    {
      userData && getUserToWatch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ======================================= WATCHED ======================================================
  // Fonction qui récupère le tableau d'ids des films "vu" du user et qui recherche si le film est déjà dans les "vu" afin de colorer le bouton Watched en vert
  useEffect(() => {
    const getUserWatched = () => {
      if (userData.id === '') {
        return;
      } else {
        axios
          .get(`${API_BASE_URL}/watchedMovies?userID=${userDataWatched.id}`)
          .then(function (response) {
            const responseData = response.data;
            const filmIds = responseData.watchedListTitles.map(
              (item: { film_id: string }) => item.film_id
            );
            if (filmIds.includes(movieId.movie.toString())) {
              setWatchedIsClicked(true);
            } else {
              setWatchedIsClicked(false);
            }
          });
      }
    };
    // Condition qui éxecute "getUserWatched" uniquement si un user est connecté
    {
      userData && getUserWatched();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log(movieId.movie);
  // ===================================================================
  return (

    <div className='movieFound__essentiel-btn--container'>


    {openSendMovieModale && (
      <SendMovieModale
        movie={movieId.movie}
        closeModale={handleSendMovie}
      />
    )}
    
    {/*! ------------------------------------------------------------------------- */}

      {/* Condition qui affiche la bulle "film ajouté aux favoris"ou "Film supprimé des favoris"  si le coeur est cliqué */}
      {showHeartBubble && (
        <div className='movieFound__essentiel-btn--bubble'>
          {heartIsClicked === true ? (
            <p>Film ajouté aux favoris</p>
          ) : (
            <p>Film supprimé des favoris</p>
          )}
        </div>
      )}
      {/* Condition qui affiche la bulle "film ajouté aux "à voir" ou "Film supprimé des "à voir"  si le marque page est cliqué */}
      {showToWatchBubble && (
        <div className='movieFound__essentiel-btn--bubble'>
          {toWatchIsClicked === true ? (
            <p>Film ajouté aux films à voir ou à revoir</p>
          ) : (
            <p>Film supprimé des films à voir ou revoir</p>
          )}
        </div>
      )}
      {/* Condition qui affiche la bulle "film ajouté aux "vu" ou "Film supprimé des "vu"  si le bouton Watched est cliqué */}
      {showWatchedBubble && (
        <div className='movieFound__essentiel-btn--bubble'>
          {watchedIsClicked === true ? (
            <p>Film ajouté aux films vus</p>
          ) : (
            <p>Film supprimé des films vus</p>
          )}
        </div>
      )}

      {/*! ------------------------------------------------------------------------- */}


      {/* Si le userData est une string vide, alors le bouton coeur ne se colorera pas en rouge et renverra l'untilisateur sur la page de connexion */}
      <button
        className='movieFound__essentiel-btn--addToLike'
        type='submit'
        // Si le userData est une string vide, alors le bouton coeur ne se colorera pas en rouge et renverra l'untilisateur sur la page de connexion
        onClick={userData.id === '' ? handleHeartRedirect : handleHeartClick}
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
        // Si le userData est une string vide, alors le bouton marque page ne se colorera pas en rouge et renverra l'untilisateur sur la page de connexion
        onClick={userData.id === '' ? handleHeartRedirect : handleToWatchClick}
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
        // Si le userData est une string vide, alors le bouton "coche" ne se colorera pas en vert et renverra l'untilisateur sur la page de connexion
        onClick={userData.id === '' ? handleHeartRedirect : handleWatchedClick}
        aria-label={`Marquer comme vu${watchedIsClicked ? ' : Déjà vu' : ''}`}
      >
        {/* Si le Watched est cliqué alors affiche le Watched plein sinon affiche le Watched vide */}
        <i
          className={`fa-sharp fa-solid fa-check ${watchedIsClicked ? 'checkClicked' : ''
            }`}
          style={{ color: watchedIsClicked ? '#7DEB00' : '' }}
        ></i>
      </button>

      {/*! ------------------------------------------------------------------------- */}
      <button
        className='movieFound__essentiel-btn--sendMovie'
        type='submit'
        onClick={userData.id === '' ? handleHeartRedirect : handleSendMovie}
      // aria-label={`J'aime le film${heartIsClicked ? ' : Déjà aimé' : ''}`}
      >
        {/* Si l'avion est cliqué alors affiche l'avion plein sinon affiche l'avion vide */}
        <i
          className={`fa-${heartIsClicked ? 'sharp' : 'regular'} fa-regular fa-paper-plane ${heartIsClicked ? 'heartClicked' : ''}`}
          style={{ color: heartIsClicked ? '#D42121' : '' }}
        ></i>
      </button>
      {/*! ------------------------------------------------------------------------- */}
    </div>
  );
}
export default AddButton;

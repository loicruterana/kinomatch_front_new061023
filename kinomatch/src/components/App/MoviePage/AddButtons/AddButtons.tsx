import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import { CurrentMovieIdContext } from '../../../../contexts/CurrentMovieIdContext';

import axios from 'axios';

import './AddButton.scss';

function AddButton(movieId) {



  {/* ========================== USESTATE =============================== */ }
  const { userData, addUserEmail, addUserData, isLoggedIn, login, logout, addBookmarked, deleteBookmarked } = useContext(AuthContext);
  const { currentMovieId } = useContext(CurrentMovieIdContext);
  // Coeur
  const [heartIsClicked, setHeartIsClicked] = useState(false);

  // Favoris
  const [bookmartIsClicked, setBookmarkIsClicked] = useState(false);

  // Check
  const [checkIsClicked, setCheckIsClicked] = useState(false);

  {/* Fonction qui récupère le tableau d'ids des films favoris du user et qui recherche si le film est déjà dans les favoris afin de colorer le bouton coeur en rouge */ }
  useEffect(() => {
    const getUserBookmarked = () => {
      axios.get(`https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?userID=${userData.id}`)
        .then(function (response) {
          const responseData = response.data;
          const filmIds = responseData.map(item => item.film_id);
          console.log(filmIds);
          console.log(userData.id);
          
          console.log(movieId.movie.toString());

          if (filmIds.includes(movieId.movie.toString())) {
            setHeartIsClicked(true);
          } else {
            setHeartIsClicked(false);
          }
          console.log(heartIsClicked);

        })
    };

    {/* Condition qui éxecute getUserBookmarked uniquement si un user est connecté */ }
    {
      isLoggedIn &&
        getUserBookmarked()
    }
  }, [currentMovieId, heartIsClicked, isLoggedIn, movieId]);


  {/* ============================ HANDLERS ============================= */ }

  // Coeur
  const handleHeartClick = () => {

    {/* Met à jour l'état de "HeartIsClicked" en inversant sa valeur actuelle. */ }
    setHeartIsClicked(!heartIsClicked);

    {/* Si le coeur n'est pas remplit/clické alors ajoute l'id du film au bookmark sinon il le supprime */ }
    heartIsClicked === false ? addBookmarked(movieId) : deleteBookmarked(movieId);
  };

  // Favoris
  const handleBookMarkClick = () => {

    {/* Met à jour l'état de "BookmarkIsClicked" en inversant sa valeur actuelle. */ }
    setBookmarkIsClicked(!bookmartIsClicked);
  };

  // Check
  const handleCheckClick = () => {

    {/* Met à jour l'état de "sCheckIsClicked" en inversant sa valeur actuelle. */ }
    setCheckIsClicked(!checkIsClicked);
  };

  {/* =================================================================== */ }

  return (
    <>
      <button
        className='movieFound__essentiel-btn--addToLike'
        type='submit'
        onClick={handleHeartClick}>
        <i className={`fa-${heartIsClicked ? 'solid' : 'regular'} fa-heart ${heartIsClicked ? 'heartClicked' : ''}`}
          style={{ color: heartIsClicked ? '#D42121' : '' }}></i></button>
      <button
        className='movieFound__essentiel-btn--addToFavorites'
        type='submit'
        onClick={handleBookMarkClick}>
        <i className={`fa-sharp fa-${bookmartIsClicked ? 'solid' : 'regular'} fa-bookmark ${bookmartIsClicked ? 'bookMarkClicked' : ''}`}
          style={{ color: bookmartIsClicked ? '#fff3b0' : '' }}></i></button>
      <button
        className='movieFound__essentiel-btn--addToViewed'
        type='submit'
        onClick={handleCheckClick}>
        <i className={`fa-sharp fa-solid fa-check ${checkIsClicked ? 'checkClicked' : ''}`}
          style={{ color: checkIsClicked ? '#7deb00' : '' }}></i></button>
    </>
  )
}

export default AddButton;


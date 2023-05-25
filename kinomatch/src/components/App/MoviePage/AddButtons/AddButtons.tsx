import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import axios from 'axios';

import './AddButton.scss';

function AddButton(movieId) {



  {/* ========================== USESTATE =============================== */ }
  const { userData, addUserEmail, addUserData, isLoggedIn, login, logout, addBookmarked, deleteBookmarked } = useContext(AuthContext);

  // Coeur
  const [heartIsClicked, setHeartIsClicked] = useState(false);

  // Favoris
  const [bookmartIsClicked, setBookmarkIsClicked] = useState(false);

  // Check
  const [checkIsClicked, setCheckIsClicked] = useState(false);


  const getUserBookmarked = () => {
    axios.get('https://deploy-back-kinomatch.herokuapp.com/bookmarkedMovies?userID=4')
      .then(function (response) {
        const responseData = response.data;
        const filmIds = responseData.map(item => item.film_id);
        console.log(filmIds);

        const movieId = '829560';

        if (filmIds.includes(movieId)) {
          setHeartIsClicked(true);
        } else {
          setHeartIsClicked(false);
        }
      })
  };

  getUserBookmarked()

  {/* ============================ HANDLERS ============================= */ }

  // Coeur
  const handleHeartClick = () => {
    setHeartIsClicked(!heartIsClicked);
    heartIsClicked === false ? addBookmarked(movieId) : deleteBookmarked(movieId);
  };
  console.log(movieId);

  // Favoris
  const handleBookMarkClick = () => {
    setBookmarkIsClicked(!bookmartIsClicked);
  };

  // Check
  const handleCheckClick = () => {
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


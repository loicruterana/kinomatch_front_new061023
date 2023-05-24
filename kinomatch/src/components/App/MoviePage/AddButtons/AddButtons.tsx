import { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';

import './AddButton.scss';

function AddButton(movieId) {

    {/* ========================== USESTATE =============================== */ }
    const { userData, addUserEmail, addUserData, isLoggedIn, login, logout, addBookmarked } = useContext(AuthContext);

    // Coeur
    const [heartIsClicked, setHeartIsClicked] = useState(false);

    // Favoris
    const [bookmartIsClicked, setBookmarkIsClicked] = useState(false);

    // Check
    const [checkIsClicked, setCheckIsClicked] = useState(false);

    const [likedMovieId, setLikedMovieId] = useState('');



    {/* ============================ HANDLERS ============================= */ }

    // Coeur
    const handleHeartClick = () => {
        setHeartIsClicked(!heartIsClicked);

        // addBookmarked(movieId)
    };
    console.log(movieId);

    // Favoris
    const handleBookMarkClick = () => {
        setBookmarkIsClicked(!bookmartIsClicked);
        addBookmarked(movieId)
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


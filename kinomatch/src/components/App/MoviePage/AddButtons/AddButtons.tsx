import { useState } from 'react';
import './AddButton.scss';

function AddButton() {

    //* ========================== USESTATE ===============================

    // Coeur
    const [heartIsClicked, setHeartIsClicked] = useState(false);

    // Favoris
    const [bookmartIsClicked, setBookmarkIsClicked] = useState(false);

    // Check
    const [checkIsClicked, setCheckIsClicked] = useState(false);


    //* ============================ HANDLERS =============================

    // Coeur
    const handleHeartClick = () => {
        setHeartIsClicked(!heartIsClicked);
    };

    // Favoris
    const handleBookMartClick = () => {
        setBookmarkIsClicked(!bookmartIsClicked);
    };

    // Check
    const handleCheckClick = () => {
        setCheckIsClicked(!checkIsClicked);
    };

    //* ===================================================================

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
                onClick={handleBookMartClick}>
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


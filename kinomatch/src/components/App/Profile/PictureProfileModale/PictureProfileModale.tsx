import React, { useContext, useState } from 'react';

import './PictureProfileModale.scss';

import API_BASE_URL from '../../../../utils/config';

import axios from 'axios';

import { AuthContext } from '../../../../contexts/AuthContext';

const PictureProfileModale = ({
  setShowPictureProfileModale,
  showPictureProfileModale,
  // setUserData
}) => {
  const { userData, updateUserDataPicture } = useContext(AuthContext);

  function handleClickOut() {
    console.log('onpasseici3');
    setShowPictureProfileModale(!showPictureProfileModale);
  }

  function handleClick(event) {
    const searchParams = new URLSearchParams();
    searchParams.append('userID', userData.id);

    const imageElement = event.target;
    const profileData = imageElement.getAttribute('data-profile');
    console.log(profileData);
    const bodyData = {
      picture: profileData,
    };
    console.log('onpassela');

    axios
      .put(`${API_BASE_URL}/pictures?${searchParams}`, bodyData)
      .then((response) => {
        console.log('onpasseici');
        console.log('reponse', response);
        updateUserDataPicture(profileData);
      })
      .catch((error) => {
        console.log('onpasseerreur');
        console.log('error', error);
      });
    // setUserData({
    //   ...userData,
    //   picture: 'yodaprofile',
    // });
    console.log('onpasseici2');
  }

  return (
    <div className='pictureProfileModale'>
      <div>
        <img
          src='images/leonprofile.png'
          alt='leonprofile'
          onClick={handleClick}
          data-profile='leonprofile'
        />{' '}
        <img
          src='images/yodaprofile.png'
          alt='yodaprofile'
          onClick={handleClick}
          data-profile='yodaprofile'
        />{' '}
        <img
          src='images/leiaprofile.png'
          alt='leiaprofile'
          onClick={handleClick}
          data-profile='leiaprofile'
        />{' '}
        <img
          src='images/ghostfaceprofile.png'
          alt='ghostfaceprofile'
          onClick={handleClick}
          data-profile='ghostfaceprofile'
        />
      </div>
      <div className='pictureProfileModale__bottompart'>
        <button onClick={handleClickOut}>Retour</button>
      </div>
    </div>
  );
};

export default PictureProfileModale;
